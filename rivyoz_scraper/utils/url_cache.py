"""Visited-URL cache — Redis when available, in-memory set as fallback."""

from __future__ import annotations

from typing import Optional

import structlog

log = structlog.get_logger()

_REDIS_KEY = "rivyoz:visited_urls"
_TTL = 60 * 60 * 48  # 48 h


class UrlCache:
    def __init__(self, redis_url: Optional[str] = None) -> None:
        self._redis = None
        self._memory: set[str] = set()

        if redis_url:
            try:
                import redis.asyncio as aioredis

                self._redis = aioredis.from_url(redis_url, decode_responses=True)
                log.info("url_cache", backend="redis", url=redis_url)
            except Exception as exc:
                log.warning("url_cache_redis_fail", error=str(exc))

        if not self._redis:
            log.info("url_cache", backend="in_memory")

    async def seen(self, url: str) -> bool:
        if self._redis:
            return bool(await self._redis.sismember(_REDIS_KEY, url))
        return url in self._memory

    async def mark(self, url: str) -> None:
        if self._redis:
            pipe = self._redis.pipeline()
            await pipe.sadd(_REDIS_KEY, url)
            await pipe.expire(_REDIS_KEY, _TTL)
            await pipe.execute()
        else:
            self._memory.add(url)

    async def size(self) -> int:
        if self._redis:
            return await self._redis.scard(_REDIS_KEY)
        return len(self._memory)

    async def clear(self) -> None:
        if self._redis:
            await self._redis.delete(_REDIS_KEY)
        self._memory.clear()
