"""
File sink pipeline: writes scraped products to a JSON Lines file
instead of Supabase. Used when direct DB access is unavailable.
The output file can then be ingested via the MCP execute_sql tool.
"""

from __future__ import annotations

import json
from datetime import datetime
from decimal import Decimal
from pathlib import Path
from typing import Optional

import structlog

from rivyoz_scraper.models import RawProduct, ScrapeJobRecord
from rivyoz_scraper.pipelines.normalization import normalize_product

log = structlog.get_logger()


def _serialize(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"Not serializable: {type(obj)}")


class FileSinkPipeline:
    """Writes one JSON object per line to an output file."""

    def __init__(self, output_path: str) -> None:
        self.path = Path(output_path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._file = None

    def open(self) -> None:
        self._file = self.path.open("w", encoding="utf-8")
        log.info("file_sink_open", path=str(self.path))

    def close(self) -> None:
        if self._file:
            self._file.close()
            log.info("file_sink_closed", path=str(self.path))

    async def process_product(
        self, raw: RawProduct, job: ScrapeJobRecord
    ) -> Optional[str]:
        if not self._file:
            raise RuntimeError("FileSinkPipeline not opened")

        record = {
            "source_url": raw.source_url,
            "source_id": raw.source_id,
            "name": raw.name or raw.name_ar,
            "name_ar": raw.name_ar or raw.name,
            "brand": raw.brand or "",
            "brand_ar": raw.brand_ar or "",
            "description": raw.description or "",
            "description_ar": raw.description_ar or "",
            "category_path_ar": raw.category_path_ar,
            "category_path": raw.category_path,
            "image_url": raw.image_url or "",
            "images": raw.images,
            "features": raw.features,
            "metadata": {
                **raw.metadata,
                "source_url": raw.source_url,
                "source": "pricena",
                "source_id": raw.source_id,
            },
            "offers": [
                {
                    "store_name": o.store_name,
                    "store_logo": o.store_logo,
                    "store_url": o.store_url,
                    "price": float(o.price) if o.price is not None else None,
                    "currency": o.currency,
                    "url": o.url,
                    "in_stock": o.in_stock,
                }
                for o in raw.offers
            ],
            "scraped_at": datetime.utcnow().isoformat(),
        }

        self._file.write(json.dumps(record, ensure_ascii=False, default=_serialize) + "\n")
        self._file.flush()

        job.products_found += 1
        job.offers_upserted += len(raw.offers)
        return raw.source_id
