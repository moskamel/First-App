"""
Normalization pipeline: cleans raw scraped data before dedup + DB insert.

Rules applied:
- Whitespace / unicode normalization
- Brand name standardization against a known-brands registry
- Currency unification → EGP
- Category path cleaning
- Store name normalization
"""

from __future__ import annotations

import re
import unicodedata

from rivyoz_scraper.models import RawOffer, RawProduct, RawStore

# ---------------------------------------------------------------------------
# Known-brand overrides: scraped variation → canonical name
# ---------------------------------------------------------------------------
_BRAND_ALIASES: dict[str, str] = {
    "apple inc": "Apple",
    "ابل": "Apple",
    "سامسونج": "Samsung",
    "samsung electronics": "Samsung",
    "xiaomi inc": "Xiaomi",
    "شاومي": "Xiaomi",
    "هواوي": "Huawei",
    "huawei technologies": "Huawei",
    "ال جي": "LG",
    "lg electronics": "LG",
    "سوني": "Sony",
    "سوني إريكسون": "Sony",
    "كانون": "Canon",
    "نايك": "Nike",
    "أديداس": "Adidas",
    "adidas ag": "Adidas",
}

# Known store name overrides
_STORE_ALIASES: dict[str, str] = {
    "امازون مصر": "Amazon Egypt",
    "amazon.eg": "Amazon Egypt",
    "amazon egypt": "Amazon Egypt",
    "جوميا": "Jumia Egypt",
    "jumia": "Jumia Egypt",
    "نون": "Noon Egypt",
    "noon.com": "Noon Egypt",
    "كارفور": "Carrefour Egypt",
    "carrefour": "Carrefour Egypt",
    "بي تك": "B.Tech",
    "b tech": "B.Tech",
    "رانيا": "Rania",
}


def _strip(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def _remove_diacritics(text: str) -> str:
    return re.sub(r"[ؐ-ًؚ-ٟ]", "", text)


def normalize_text(text: str) -> str:
    text = _strip(_remove_diacritics(text))
    return unicodedata.normalize("NFC", text)


def normalize_brand(raw: str) -> str:
    key = _strip(raw).lower()
    return _BRAND_ALIASES.get(key, _strip(raw)) if raw else ""


def normalize_store_name(raw: str) -> str:
    key = _strip(raw).lower()
    return _STORE_ALIASES.get(key, _strip(raw).title()) if raw else ""


def normalize_currency(raw: str) -> str:
    mapping = {
        "ج.م": "EGP",
        "جنيه": "EGP",
        "egp": "EGP",
        "sar": "SAR",
        "ر.س": "SAR",
        "usd": "USD",
        "$": "USD",
        "€": "EUR",
    }
    return mapping.get(raw.strip().lower(), raw.upper().strip()) if raw else "EGP"


def normalize_product(product: RawProduct) -> RawProduct:
    product.name_ar = normalize_text(product.name_ar or "")
    product.name = normalize_text(product.name or "")
    product.brand_ar = normalize_text(product.brand_ar or "")
    product.brand = normalize_brand(product.brand or product.brand_ar or "")
    product.description_ar = normalize_text(product.description_ar or "")
    product.description = normalize_text(product.description or "")

    # Clean category path
    product.category_path_ar = [
        normalize_text(c) for c in product.category_path_ar if c.strip()
    ]
    product.category_path = [
        normalize_text(c) for c in product.category_path if c.strip()
    ]

    # Normalize offers
    product.offers = [normalize_offer(o) for o in product.offers]

    return product


def normalize_offer(offer: RawOffer) -> RawOffer:
    offer.store_name = normalize_store_name(offer.store_name)
    offer.currency = normalize_currency(offer.currency)
    return offer


def normalize_store(store: RawStore) -> RawStore:
    store.name = normalize_store_name(store.name)
    return store
