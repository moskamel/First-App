"""
Main Pricena orchestrator spider.

Crawl flow:
  1. Discover categories from home page
  2. For each category → paginate product listing
  3. For each product URL → fetch + parse product detail
  4. Normalize → deduplicate → persist to Supabase
"""

from __future__ import annotations

import asyncio
from datetime import datetime
from typing import Optional

import structlog
from supabase import Client, create_client

from rivyoz_scraper.config import settings
from rivyoz_scraper.models import ScrapeJobRecord
from rivyoz_scraper.pipelines import DatabasePipeline, normalize_product
from rivyoz_scraper.scrapers.pricena.category_spider import CategorySpider
from rivyoz_scraper.scrapers.pricena.product_spider import ProductSpider
from rivyoz_scraper.utils import HttpClient, RateLimiter, UrlCache

log = structlog.get_logger()


class PricenaSpider:
    """Top-level orchestrator — owns the crawl lifecycle."""

    def __init__(self) -> None:
        self.db_client: Optional[Client] = None
        self.db_pipeline: Optional[DatabasePipeline] = None

    # ------------------------------------------------------------------

    async def run(self, clear_cache: bool = False) -> ScrapeJobRecord:
        job = ScrapeJobRecord(source="pricena", status="running")

        # Initialize Supabase client (sync SDK wrapped in executor)
        self.db_client = create_client(
            settings.supabase_url,
            settings.supabase_key,
        )
        self.db_pipeline = DatabasePipeline(self.db_client)

        # Warm dedup index from existing DB data
        await self.db_pipeline.warm_up()

        # Create job record in DB (best-effort — scraper_jobs table optional)
        job_id: Optional[str] = None
        try:
            job_id = await self.db_pipeline.create_job(job)
        except Exception:
            pass  # table may not exist yet; don't block scraping

        rate_limiter = RateLimiter({"pricena.com": settings.rate_limit_pricena})
        url_cache = UrlCache(redis_url=settings.redis_url)

        if clear_cache:
            await url_cache.clear()

        async with HttpClient() as http:
            cat_spider = CategorySpider(http, rate_limiter, url_cache)
            prod_spider = ProductSpider(http, rate_limiter, url_cache)

            # 1. Discover categories
            try:
                categories = await cat_spider.discover_categories()
            except Exception as exc:
                log.error("category_discovery_failed", error=str(exc))
                job.status = "failed"
                job.error_log.append(f"category_discovery: {exc}")
                return job

            # 2. Crawl each category
            for category in categories:
                log.info("crawling_category", name=category.name_ar, url=category.url)

                # Collect product URLs from all pages in this category
                product_urls: list[str] = []
                async for url in cat_spider.iter_product_urls(category):
                    product_urls.append(url)

                if not product_urls:
                    continue

                # 3. Fetch products in batches (respect concurrency limit)
                batch_size = settings.concurrent_requests * 2
                for i in range(0, len(product_urls), batch_size):
                    batch = product_urls[i : i + batch_size]
                    raw_products = await prod_spider.fetch_many(
                        batch, concurrency=settings.concurrent_requests
                    )

                    # 4. Normalize + persist each product
                    for raw in raw_products:
                        try:
                            raw = normalize_product(raw)
                            # Attach category from breadcrumb if missing
                            if not raw.category_path_ar and category.name_ar:
                                raw.category_path_ar = [category.name_ar]

                            await self.db_pipeline.process_product(raw, job)
                        except Exception as exc:
                            log.error(
                                "product_pipeline_error",
                                url=raw.source_url,
                                error=str(exc),
                            )
                            job.errors += 1
                            job.error_log.append(f"{raw.source_url}: {exc}")

                log.info(
                    "category_done",
                    category=category.name_ar,
                    products=len(product_urls),
                )

        # 5. Finalize job
        job.status = "completed" if job.errors == 0 else "completed_with_errors"
        job.finished_at = datetime.utcnow()

        if job_id:
            try:
                await self.db_pipeline.finish_job(job_id, job)
            except Exception:
                pass

        log.info(
            "crawl_complete",
            source="pricena",
            products_created=job.products_created,
            products_updated=job.products_updated,
            offers_upserted=job.offers_upserted,
            errors=job.errors,
            duration_s=(job.finished_at - job.started_at).total_seconds(),
        )

        return job
