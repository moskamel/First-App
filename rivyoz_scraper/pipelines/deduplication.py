"""
Deduplication pipeline.

Strategy:
1. Check source_id (pricena product slug) — exact match in scraper_url_map
2. Check brand + fuzzy name similarity against in-memory name cache
3. If duplicate found → return existing product_id and merge offers
4. If new → insert canonical product and return new id
"""

from __future__ import annotations

from typing import Optional

import structlog

from rivyoz_scraper.config import settings
from rivyoz_scraper.models import RawProduct
from rivyoz_scraper.utils.fuzzy_matcher import find_duplicate

log = structlog.get_logger()


class DeduplicationIndex:
    """
    Maintains an in-memory index of known products for this scrape session.
    For persistent cross-session dedup, the database pipeline checks source URLs.
    """

    def __init__(self) -> None:
        # product_id → (name_ar, brand)
        self._index: dict[str, tuple[str, str]] = {}
        # source_url → product_id
        self._url_map: dict[str, str] = {}

    def load_from_db(self, rows: list[dict]) -> None:
        """Seed the index from existing DB products on startup."""
        for row in rows:
            pid = row["id"]
            name = row.get("name_ar") or row.get("name") or ""
            brand = row.get("brand") or ""
            url = row.get("source_url") or ""
            self._index[pid] = (name, brand)
            if url:
                self._url_map[url] = pid

    def register(self, product_id: str, name: str, brand: str, source_url: str = "") -> None:
        self._index[product_id] = (name, brand)
        if source_url:
            self._url_map[source_url] = product_id

    def find(self, product: RawProduct) -> Optional[str]:
        """
        Return existing product_id if a duplicate is detected, else None.
        Priority:
          1. Exact source URL match
          2. Exact source_id match in URL map
          3. Brand + fuzzy name match
        """
        # 1. Source URL exact
        if product.source_url in self._url_map:
            return self._url_map[product.source_url]

        # 2. Restrict fuzzy search to products of the same brand
        candidate_name = product.name_ar or product.name or ""
        candidate_brand = (product.brand or "").lower()

        same_brand_ids = [
            pid
            for pid, (_, brand) in self._index.items()
            if not candidate_brand or brand.lower() == candidate_brand
        ]

        if not same_brand_ids:
            return None

        names = [self._index[pid][0] for pid in same_brand_ids]
        idx = find_duplicate(
            candidate_name,
            names,
            threshold=settings.fuzzy_match_threshold,
        )

        if idx is not None:
            matched_id = same_brand_ids[idx]
            log.info(
                "duplicate_detected",
                candidate=candidate_name[:40],
                matched=names[idx][:40],
                product_id=matched_id,
            )
            return matched_id

        return None
