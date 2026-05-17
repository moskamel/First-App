"""Pydantic models that mirror the Rivyoz Supabase schema."""

from __future__ import annotations
from datetime import datetime
from decimal import Decimal
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, HttpUrl, field_validator


# ---------------------------------------------------------------------------
# Raw scraped data (pre-normalization) — not DB-bound
# ---------------------------------------------------------------------------

class RawOffer(BaseModel):
    store_name: str
    store_url: Optional[str] = None
    store_logo: Optional[str] = None
    price: Optional[Decimal] = None
    currency: str = "EGP"
    url: str
    in_stock: bool = True
    scraped_at: datetime = datetime.utcnow()


class RawProduct(BaseModel):
    source_url: str
    source_id: Optional[str] = None        # product slug / ID on pricena
    name_ar: Optional[str] = None
    name: Optional[str] = None
    brand: Optional[str] = None
    brand_ar: Optional[str] = None
    description_ar: Optional[str] = None
    description: Optional[str] = None
    category_path_ar: list[str] = []       # e.g. ["إلكترونيات", "هواتف"]
    category_path: list[str] = []          # e.g. ["Electronics", "Phones"]
    image_url: Optional[str] = None
    images: list[str] = []
    features: list[str] = []
    metadata: dict = {}
    offers: list[RawOffer] = []
    scraped_at: datetime = datetime.utcnow()

    @field_validator("name_ar", "name", mode="before")
    @classmethod
    def strip_whitespace(cls, v):
        return v.strip() if isinstance(v, str) else v


class RawCategory(BaseModel):
    name_ar: str
    name: str = ""
    slug: str
    parent_slug: Optional[str] = None
    level: int = 0
    url: str


class RawStore(BaseModel):
    name: str
    logo_url: Optional[str] = None
    website_url: Optional[str] = None
    country: str = "EG"


# ---------------------------------------------------------------------------
# DB insert/upsert payloads — match Supabase table columns exactly
# ---------------------------------------------------------------------------

class CategoryUpsert(BaseModel):
    slug: str
    name_ar: str
    name: str = ""
    icon: str = ""
    color: str = "#F5F5F5"
    parent_id: Optional[str] = None
    level: int = 0
    sort_order: int = 0


class StoreUpsert(BaseModel):
    name: str
    logo_url: Optional[str] = None
    website_url: Optional[str] = None
    is_active: bool = True
    sort_order: int = 0
    category: Optional[str] = None


class ProductUpsert(BaseModel):
    name: str
    name_ar: str
    brand: str = ""
    brand_ar: str = ""
    description: str = ""
    description_ar: str = ""
    category: str = ""
    category_id: Optional[str] = None
    subcategory_id: Optional[str] = None
    price_min: Decimal = Decimal("0")
    price_max: Decimal = Decimal("0")
    currency: str = "EGP"
    image_url: str = ""
    images: list[str] = []
    features: list[str] = []
    pros: list[str] = []
    cons: list[str] = []
    metadata: dict = {}


class BuyOptionUpsert(BaseModel):
    product_id: str
    store_name: str
    store_logo: Optional[str] = None
    price: Decimal
    currency: str = "EGP"
    url: str
    in_stock: bool = True
    store_id: Optional[str] = None


# ---------------------------------------------------------------------------
# Scrape tracking (stored in scraper_jobs / scraped_urls tables)
# ---------------------------------------------------------------------------

class ScrapeJobRecord(BaseModel):
    source: str = "pricena"
    status: str = "running"         # running | completed | failed
    started_at: datetime = datetime.utcnow()
    finished_at: Optional[datetime] = None
    products_found: int = 0
    products_created: int = 0
    products_updated: int = 0
    offers_upserted: int = 0
    errors: int = 0
    error_log: list[str] = []
