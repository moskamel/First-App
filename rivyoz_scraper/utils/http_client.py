"""Async HTTP client with retry, backoff, and polite rate limiting."""

from __future__ import annotations

import asyncio
import random
from typing import Optional

import aiohttp
import structlog
from tenacity import (
    AsyncRetrying,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from rivyoz_scraper.config import settings

log = structlog.get_logger()

_USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
]

_RETRYABLE = (
    aiohttp.ClientConnectionError,
    aiohttp.ServerTimeoutError,
    asyncio.TimeoutError,
)


class HttpClient:
    """Thin async HTTP wrapper used by all spiders."""

    def __init__(self) -> None:
        self._session: Optional[aiohttp.ClientSession] = None
        # Per-domain semaphore to cap concurrency
        self._semaphores: dict[str, asyncio.Semaphore] = {}

    async def __aenter__(self) -> "HttpClient":
        connector = aiohttp.TCPConnector(
            limit=settings.concurrent_requests * 4,
            ssl=False,
        )
        timeout = aiohttp.ClientTimeout(total=settings.request_timeout)
        self._session = aiohttp.ClientSession(
            connector=connector,
            timeout=timeout,
            headers={"Accept-Language": "ar,en;q=0.9"},
        )
        return self

    async def __aexit__(self, *_) -> None:
        if self._session:
            await self._session.close()

    # ------------------------------------------------------------------
    def _pick_ua(self) -> str:
        return random.choice(_USER_AGENTS) if settings.user_agent_rotate else _USER_AGENTS[0]

    def _semaphore_for(self, domain: str) -> asyncio.Semaphore:
        if domain not in self._semaphores:
            self._semaphores[domain] = asyncio.Semaphore(settings.concurrent_requests)
        return self._semaphores[domain]

    # ------------------------------------------------------------------
    async def get(self, url: str, **kwargs) -> str:
        """Fetch URL text with automatic retry + exponential backoff."""
        import tldextract

        extracted = tldextract.extract(url)
        domain = f"{extracted.domain}.{extracted.suffix}"
        sem = self._semaphore_for(domain)

        async with sem:
            async for attempt in AsyncRetrying(
                stop=stop_after_attempt(settings.max_retries),
                wait=wait_exponential(
                    multiplier=settings.retry_backoff_base, min=2, max=16
                ),
                retry=retry_if_exception_type(_RETRYABLE),
                reraise=True,
            ):
                with attempt:
                    headers = {"User-Agent": self._pick_ua(), **kwargs.pop("headers", {})}
                    async with self._session.get(  # type: ignore[union-attr]
                        url, headers=headers, **kwargs
                    ) as resp:
                        if resp.status == 429:
                            wait = int(resp.headers.get("Retry-After", 30))
                            log.warning("rate_limited", url=url, retry_after=wait)
                            await asyncio.sleep(wait)
                            raise aiohttp.ClientConnectionError("429 — backing off")

                        if resp.status >= 500:
                            log.warning("server_error", url=url, status=resp.status)
                            raise aiohttp.ClientConnectionError(f"HTTP {resp.status}")

                        resp.raise_for_status()
                        return await resp.text()

        raise RuntimeError(f"Failed to fetch {url} after {settings.max_retries} attempts")
