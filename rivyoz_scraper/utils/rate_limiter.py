"""Token-bucket rate limiter — one instance per domain."""

from __future__ import annotations

import asyncio
import time
from collections import defaultdict

import structlog

log = structlog.get_logger()


class RateLimiter:
    """Async token-bucket: enforces a minimum delay between requests per domain."""

    def __init__(self, rps_map: dict[str, float]) -> None:
        """
        rps_map: domain → requests-per-second limit
        e.g. {"pricena.com": 0.5}  means one request every 2 seconds
        """
        self._rps: dict[str, float] = {**rps_map}
        self._last_request: dict[str, float] = defaultdict(float)
        self._locks: dict[str, asyncio.Lock] = defaultdict(asyncio.Lock)

    def _delay_for(self, domain: str) -> float:
        rps = self._rps.get(domain, 1.0)
        return 1.0 / max(rps, 0.01)

    async def acquire(self, domain: str) -> None:
        async with self._locks[domain]:
            delay = self._delay_for(domain)
            elapsed = time.monotonic() - self._last_request[domain]
            wait = delay - elapsed
            if wait > 0:
                log.debug("rate_limiting", domain=domain, wait_s=round(wait, 2))
                await asyncio.sleep(wait)
            self._last_request[domain] = time.monotonic()
