"""
Database pipeline: maps normalized RawProduct → Supabase tables.

Tables written:
  categories   (upsert by slug)
  stores       (upsert by name)
  products     (upsert by source_url stored in metadata)
  buy_options  (upsert by product_id + store_name)

Tracks scrape jobs in:
  scraper_jobs  (insert on start, update on finish)
  scraper_url_map (url → product_id for cross-session dedup)
"""

from __future__ import annotations

import asyncio
from datetime import datetime
from decimal import Decimal
from typing import Optional

import structlog
from supabase import Client

from rivyoz_scraper.models import (
    BuyOptionUpsert,
    CategoryUpsert,
    ProductUpsert,
    RawCategory,
    RawProduct,
    ScrapeJobRecord,
    StoreUpsert,
)
from rivyoz_scraper.pipelines.deduplication import DeduplicationIndex

log = structlog.get_logger()

_BATCH_SIZE = 50


class DatabasePipeline:
    def __init__(self, client: Client) -> None:
        self.db = client
        self.dedup = DeduplicationIndex()
        # category slug → UUID
        self._category_cache: dict[str, str] = {}
        # store name (normalized) → UUID
        self._store_cache: dict[str, str] = {}

    # ------------------------------------------------------------------
    # Startup: load existing data into dedup index
    # ------------------------------------------------------------------

    async def warm_up(self) -> None:
        loop = asyncio.get_event_loop()

        # Load products into dedup index
        res = await loop.run_in_executor(
            None,
            lambda: self.db.table("products")
            .select("id, name_ar, name, brand, metadata")
            .execute(),
        )
        rows = res.data or []
        enriched = [
            {
                **r,
                "source_url": (r.get("metadata") or {}).get("source_url", ""),
            }
            for r in rows
        ]
        self.dedup.load_from_db(enriched)
        log.info("dedup_warmed", products=len(rows))

        # Load categories
        cat_res = await loop.run_in_executor(
            None,
            lambda: self.db.table("categories").select("id, slug").execute(),
        )
        self._category_cache = {r["slug"]: r["id"] for r in (cat_res.data or [])}

        # Load stores
        store_res = await loop.run_in_executor(
            None,
            lambda: self.db.table("stores").select("id, name").execute(),
        )
        self._store_cache = {r["name"]: r["id"] for r in (store_res.data or [])}

    # ------------------------------------------------------------------
    # Categories
    # ------------------------------------------------------------------

    async def upsert_category(self, cat: RawCategory) -> Optional[str]:
        if cat.slug in self._category_cache:
            return self._category_cache[cat.slug]

        payload = CategoryUpsert(
            slug=cat.slug,
            name_ar=cat.name_ar,
            name=cat.name,
            level=cat.level,
        )

        loop = asyncio.get_event_loop()
        res = await loop.run_in_executor(
            None,
            lambda: self.db.table("categories")
            .upsert(payload.model_dump(), on_conflict="slug")
            .execute(),
        )
        row = (res.data or [{}])[0]
        cid = row.get("id")
        if cid:
            self._category_cache[cat.slug] = cid
        return cid

    # ------------------------------------------------------------------
    # Stores
    # ------------------------------------------------------------------

    async def upsert_store(self, store_name: str, logo_url: Optional[str] = None, website_url: Optional[str] = None) -> Optional[str]:
        if store_name in self._store_cache:
            return self._store_cache[store_name]

        payload = StoreUpsert(
            name=store_name,
            logo_url=logo_url,
            website_url=website_url,
        )

        loop = asyncio.get_event_loop()
        res = await loop.run_in_executor(
            None,
            lambda: self.db.table("stores")
            .upsert(payload.model_dump(exclude_none=True), on_conflict="name")
            .execute(),
        )
        row = (res.data or [{}])[0]
        sid = row.get("id")
        if sid:
            self._store_cache[store_name] = sid
        return sid

    # ------------------------------------------------------------------
    # Products + buy_options
    # ------------------------------------------------------------------

    async def process_product(
        self, raw: RawProduct, job: ScrapeJobRecord
    ) -> Optional[str]:
        """
        Upsert one product (and its buy_options) into the database.
        Returns the product_id (new or existing).
        """
        # 1. Deduplication check
        existing_id = self.dedup.find(raw)

        # 2. Resolve category IDs
        category_id = None
        subcategory_id = None
        if raw.category_path_ar:
            top_cat = RawCategory(
                name_ar=raw.category_path_ar[0],
                name=raw.category_path[0] if raw.category_path else "",
                slug=raw.category_path_ar[0].replace(" ", "-").lower(),
                level=0,
                url="",
            )
            category_id = await self.upsert_category(top_cat)

        if len(raw.category_path_ar) > 1:
            sub_cat = RawCategory(
                name_ar=raw.category_path_ar[1],
                name=raw.category_path[1] if len(raw.category_path) > 1 else "",
                slug=raw.category_path_ar[1].replace(" ", "-").lower(),
                level=1,
                url="",
                parent_slug=raw.category_path_ar[0].replace(" ", "-").lower(),
            )
            subcategory_id = await self.upsert_category(sub_cat)

        # 3. Calculate price range from offers
        prices = [o.price for o in raw.offers if o.price is not None]
        price_min = min(prices) if prices else Decimal("0")
        price_max = max(prices) if prices else Decimal("0")

        payload = ProductUpsert(
            name=raw.name or raw.name_ar,
            name_ar=raw.name_ar or raw.name,
            brand=raw.brand or "",
            brand_ar=raw.brand_ar or "",
            description=raw.description or "",
            description_ar=raw.description_ar or "",
            category=raw.category_path_ar[0] if raw.category_path_ar else "",
            category_id=category_id,
            subcategory_id=subcategory_id,
            price_min=price_min,
            price_max=price_max,
            currency="EGP",
            image_url=raw.image_url or "",
            images=raw.images,
            features=raw.features,
            metadata={
                **raw.metadata,
                "source_url": raw.source_url,
                "source": "pricena",
                "source_id": raw.source_id,
            },
        )

        loop = asyncio.get_event_loop()

        if existing_id:
            # Update only changed fields
            update_data = {
                "price_min": str(price_min),
                "price_max": str(price_max),
                "updated_at": datetime.utcnow().isoformat(),
            }
            if raw.images:
                update_data["images"] = raw.images
            if raw.image_url:
                update_data["image_url"] = raw.image_url

            await loop.run_in_executor(
                None,
                lambda: self.db.table("products")
                .update(update_data)
                .eq("id", existing_id)
                .execute(),
            )
            product_id = existing_id
            job.products_updated += 1
        else:
            res = await loop.run_in_executor(
                None,
                lambda: self.db.table("products")
                .insert(payload.model_dump(exclude_none=True))
                .execute(),
            )
            product_id = (res.data or [{}])[0].get("id")
            if product_id:
                self.dedup.register(
                    product_id,
                    raw.name_ar or "",
                    raw.brand or "",
                    raw.source_url,
                )
                job.products_created += 1
            job.products_found += 1

        if not product_id:
            log.error("product_insert_failed", url=raw.source_url)
            job.errors += 1
            return None

        # 4. Upsert buy_options
        await self._upsert_buy_options(product_id, raw, job)
        return product_id

    async def _upsert_buy_options(
        self, product_id: str, raw: RawProduct, job: ScrapeJobRecord
    ) -> None:
        loop = asyncio.get_event_loop()

        for offer in raw.offers:
            if offer.price is None:
                continue

            store_id = await self.upsert_store(
                offer.store_name,
                logo_url=offer.store_logo,
                website_url=offer.store_url,
            )

            # Delete stale offer for this product+store before reinserting
            # so we always have fresh data without duplicates
            await loop.run_in_executor(
                None,
                lambda: self.db.table("buy_options")
                .delete()
                .eq("product_id", product_id)
                .eq("store_name", offer.store_name)
                .execute(),
            )

            bo = BuyOptionUpsert(
                product_id=product_id,
                store_name=offer.store_name,
                store_logo=offer.store_logo,
                price=offer.price,
                currency=offer.currency,
                url=offer.url,
                in_stock=offer.in_stock,
                store_id=store_id,
            )

            await loop.run_in_executor(
                None,
                lambda: self.db.table("buy_options")
                .insert(bo.model_dump(exclude_none=True))
                .execute(),
            )
            job.offers_upserted += 1

    # ------------------------------------------------------------------
    # Scrape job tracking
    # ------------------------------------------------------------------

    async def create_job(self, job: ScrapeJobRecord) -> Optional[str]:
        loop = asyncio.get_event_loop()
        res = await loop.run_in_executor(
            None,
            lambda: self.db.table("scraper_jobs")
            .insert(
                {
                    "source": job.source,
                    "status": job.status,
                    "started_at": job.started_at.isoformat(),
                }
            )
            .execute(),
        )
        return (res.data or [{}])[0].get("id")

    async def finish_job(self, job_id: str, job: ScrapeJobRecord) -> None:
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(
            None,
            lambda: self.db.table("scraper_jobs")
            .update(
                {
                    "status": job.status,
                    "finished_at": (job.finished_at or datetime.utcnow()).isoformat(),
                    "products_found": job.products_found,
                    "products_created": job.products_created,
                    "products_updated": job.products_updated,
                    "offers_upserted": job.offers_upserted,
                    "errors": job.errors,
                    "error_log": job.error_log[-100:],  # keep last 100 errors
                }
            )
            .eq("id", job_id)
            .execute(),
        )
