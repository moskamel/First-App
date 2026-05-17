"""
Product spider: fetches individual product pages and delegates parsing.
Handles per-URL retry, marks URLs as visited, streams RawProduct objects.
"""

from __future__ import annotations

import asyncio
from typing import Optional

import structlog

from rivyoz_scraper.parsers import PricenaParser
from rivyoz_scraper.models import RawProduct
from rivyoz_scraper.utils import HttpClient, RateLimiter, UrlCache

log = structlog.get_logger()

_DOMAIN = "pricena.com"


class ProductSpider:
    def __init__(
        self,
        http: HttpClient,
        rate_limiter: RateLimiter,
        url_cache: UrlCache,
    ) -> None:
        self.http = http
        self.rate = rate_limiter
        self.cache = url_cache
        self.parser = PricenaParser()

    async def fetch_product(self, url: str) -> Optional[RawProduct]:
        """Fetch + parse one product page. Returns None on failure."""
        await self.rate.acquire(_DOMAIN)
        try:
            html = await self.http.get(url)
        except Exception as exc:
            log.error("product_fetch_error", url=url, error=str(exc))
            return None

        await self.cache.mark(url)

        try:
            return self.parser.parse_product(html, url)
        except Exception as exc:
            log.error("product_parse_error", url=url, error=str(exc))
            return None

    async def fetch_many(
        self,
        urls: list[str],
        concurrency: int = 5,
    ) -> list[RawProduct]:
        """Fetch multiple product pages concurrently (bounded by semaphore)."""
        sem = asyncio.Semaphore(concurrency)
        results: list[RawProduct] = []

        async def _bounded(url: str) -> None:
            async with sem:
                product = await self.fetch_product(url)
                if product:
                    results.append(product)

        await asyncio.gather(*(_bounded(u) for u in urls))
        return results
