"""
Category spider: discovers all category URLs from the Pricena home page
and iterates paginated product listing pages within each category.
"""

from __future__ import annotations

import asyncio
from typing import AsyncIterator, Optional

import structlog

from rivyoz_scraper.config import settings
from rivyoz_scraper.models import RawCategory
from rivyoz_scraper.parsers import PricenaParser
from rivyoz_scraper.utils import HttpClient, RateLimiter, UrlCache

log = structlog.get_logger()

_DOMAIN = "pricena.com"


class CategorySpider:
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

    # ------------------------------------------------------------------

    async def discover_categories(self) -> list[RawCategory]:
        """Fetch the home / categories page and extract all category links."""
        await self.rate.acquire(_DOMAIN)
        html = await self.http.get(settings.pricena_base_url)
        categories = self.parser.parse_category_listing(html, settings.pricena_base_url)

        if settings.max_categories > 0:
            categories = categories[: settings.max_categories]

        log.info("categories_discovered", count=len(categories))
        return categories

    # ------------------------------------------------------------------

    async def iter_product_urls(
        self, category: RawCategory
    ) -> AsyncIterator[str]:
        """
        Yield product URLs from all paginated listing pages in a category.
        Respects max_pages_per_category and max_products_per_category.
        """
        page_url: Optional[str] = category.url
        page_num = 0
        total_yielded = 0

        while page_url:
            if await self.cache.seen(page_url):
                log.debug("listing_page_already_seen", url=page_url)
                break

            await self.rate.acquire(_DOMAIN)
            try:
                html = await self.http.get(page_url)
            except Exception as exc:
                log.error("listing_fetch_error", url=page_url, error=str(exc))
                break

            await self.cache.mark(page_url)
            product_urls, next_url = self.parser.parse_product_listing(html, page_url)

            for url in product_urls:
                if await self.cache.seen(url):
                    continue
                yield url
                total_yielded += 1

                if (
                    settings.max_products_per_category > 0
                    and total_yielded >= settings.max_products_per_category
                ):
                    return

            page_num += 1
            if (
                settings.max_pages_per_category > 0
                and page_num >= settings.max_pages_per_category
            ):
                break

            page_url = next_url
