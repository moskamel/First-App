"""
Pricena Egypt (eg.pricena.com/ar) HTML parser.

Selectors are written against Pricena's Arabic front-end as of 2025.
If the site structure changes, update the CSS selectors in the
_SELECTORS dict below — the logic stays the same.
"""

from __future__ import annotations

import re
from decimal import Decimal, InvalidOperation
from typing import Optional
from urllib.parse import urljoin, urlparse

import structlog
from selectolax.parser import HTMLParser, Node

from rivyoz_scraper.models import RawCategory, RawOffer, RawProduct

log = structlog.get_logger()

BASE_URL = "https://eg.pricena.com"

# ---------------------------------------------------------------------------
# CSS selector map — single source of truth for all HTML targets
# ---------------------------------------------------------------------------
_SEL = {
    # Category listing page
    "category_links": "a.category-item, .categories-list a, ul.category-list a",
    "category_name": ".category-name, h3.cat-title, .cat-name",

    # Product listing page
    "product_card_link": "a.product-item, .products-grid .product-card a, "
                         ".product-list-item a[href*='/products/'], "
                         "a[href*='/product/'], .product-name a",
    "next_page": "a[rel='next'], a.next-page, li.next a, .pagination .next a",

    # Product detail page
    "product_name_ar": "h1.product-title, h1[itemprop='name'], .product-name h1",
    "product_brand": ".product-brand a, [itemprop='brand'] [itemprop='name'], "
                     ".brand-name, a.brand-link",
    "product_desc_ar": ".product-description, [itemprop='description'], .desc-text",
    "product_images": "img.product-image[src], .product-gallery img[src], "
                      ".swiper-slide img[src], [itemprop='image']",
    "breadcrumb_items": "ol.breadcrumb li a, .breadcrumb-item a, "
                        "nav[aria-label='breadcrumb'] a",
    "product_features": ".product-specs tr, .specs-table tr, "
                        ".product-features li, .features-list li",

    # Price offers (comparison section)
    "offer_row": ".stores-table tr, .offers-table tr, .price-row, "
                 ".store-item, .merchant-row",
    "offer_store_name": ".store-name, td.merchant-name, .retailer-name, "
                        ".store-title",
    "offer_store_logo": "img.store-logo, .merchant-logo img",
    "offer_price": ".price, td.product-price, .offer-price, [itemprop='price']",
    "offer_link": "a.buy-button, a.go-to-store, td.buy-btn a, .store-link",
    "offer_availability": ".availability, .in-stock, .out-of-stock, .stock-status",
}


def _abs(url: str, base: str = BASE_URL) -> str:
    return urljoin(base, url) if url.startswith("/") else url


def _clean_price(raw: str) -> Optional[Decimal]:
    """Strip currency symbols / commas and return Decimal or None."""
    cleaned = re.sub(r"[^\d.,]", "", raw.replace(",", "")).strip(".")
    try:
        return Decimal(cleaned) if cleaned else None
    except InvalidOperation:
        return None


def _text(node: Optional[Node]) -> str:
    return node.text(strip=True) if node else ""


def _attr(node: Optional[Node], attr: str) -> str:
    return (node.attrs.get(attr) or "") if node else ""


# ---------------------------------------------------------------------------

class PricenaParser:
    """Stateless parser: each method receives raw HTML, returns typed objects."""

    # ------------------------------------------------------------------
    # Category listing page
    # ------------------------------------------------------------------

    def parse_category_listing(self, html: str, page_url: str) -> list[RawCategory]:
        tree = HTMLParser(html)
        categories: list[RawCategory] = []

        for a in tree.css(_SEL["category_links"]):
            href = _attr(a, "href")
            if not href or href in ("#", "/"):
                continue

            # Try to find a name node inside the <a>
            name_node = a.css_first(_SEL["category_name"]) or a
            name_ar = name_node.text(strip=True)
            if not name_ar:
                continue

            slug = href.rstrip("/").rsplit("/", 1)[-1]
            url = _abs(href)

            categories.append(
                RawCategory(
                    name_ar=name_ar,
                    name="",            # EN translation filled by normalization pipeline
                    slug=slug,
                    url=url,
                    level=0,
                )
            )

        log.info("categories_parsed", count=len(categories), page=page_url)
        return categories

    # ------------------------------------------------------------------
    # Product listing / search page — extracts product URLs + next-page URL
    # ------------------------------------------------------------------

    def parse_product_listing(
        self, html: str, page_url: str
    ) -> tuple[list[str], Optional[str]]:
        """Returns (product_urls, next_page_url)."""
        tree = HTMLParser(html)
        urls: list[str] = []

        for a in tree.css(_SEL["product_card_link"]):
            href = _attr(a, "href")
            if href and ("/product" in href or "/p/" in href):
                urls.append(_abs(href))

        next_href = _attr(tree.css_first(_SEL["next_page"]), "href")
        next_url = _abs(next_href) if next_href else None

        log.info("listing_parsed", products=len(urls), next=next_url, page=page_url)
        return list(dict.fromkeys(urls)), next_url   # deduplicate preserving order

    # ------------------------------------------------------------------
    # Product detail page
    # ------------------------------------------------------------------

    def parse_product(self, html: str, url: str) -> Optional[RawProduct]:
        tree = HTMLParser(html)

        name_ar = _text(tree.css_first(_SEL["product_name_ar"]))
        if not name_ar:
            log.warning("product_name_missing", url=url)
            return None

        brand_node = tree.css_first(_SEL["product_brand"])
        brand_ar = _text(brand_node)

        desc_ar = _text(tree.css_first(_SEL["product_desc_ar"]))

        # Breadcrumb → category hierarchy
        breadcrumbs = [
            _text(n)
            for n in tree.css(_SEL["breadcrumb_items"])
            if _text(n) not in ("", "الرئيسية", "Home")
        ]

        # Images
        images: list[str] = []
        for img in tree.css(_SEL["product_images"]):
            src = _attr(img, "src") or _attr(img, "data-src") or _attr(img, "content")
            if src and not src.endswith((".svg", "placeholder")):
                images.append(_abs(src))
        images = list(dict.fromkeys(images))  # deduplicate

        # Features / specs
        features: list[str] = []
        for row in tree.css(_SEL["product_features"]):
            text = row.text(strip=True, separator=" | ")
            if text and len(text) > 3:
                features.append(text)

        # Source product ID from URL slug
        parsed = urlparse(url)
        source_id = parsed.path.rstrip("/").rsplit("/", 1)[-1]

        # Structured metadata from JSON-LD if present
        metadata = self._extract_json_ld(tree)

        offers = self._parse_offers(tree, url)

        product = RawProduct(
            source_url=url,
            source_id=source_id,
            name_ar=name_ar,
            name=metadata.get("name", ""),
            brand_ar=brand_ar,
            brand=metadata.get("brand", brand_ar),
            description_ar=desc_ar,
            description=metadata.get("description", ""),
            category_path_ar=breadcrumbs,
            image_url=images[0] if images else metadata.get("image", ""),
            images=images,
            features=features,
            metadata=metadata,
            offers=offers,
        )

        log.info(
            "product_parsed",
            name=name_ar[:40],
            offers=len(offers),
            images=len(images),
            url=url,
        )
        return product

    # ------------------------------------------------------------------
    # Price offers (comparison table inside a product page)
    # ------------------------------------------------------------------

    def _parse_offers(self, tree: HTMLParser, page_url: str) -> list[RawOffer]:
        offers: list[RawOffer] = []

        for row in tree.css(_SEL["offer_row"]):
            store_node = row.css_first(_SEL["offer_store_name"])
            price_node = row.css_first(_SEL["offer_price"])
            link_node = row.css_first(_SEL["offer_link"])
            logo_node = row.css_first(_SEL["offer_store_logo"])
            avail_node = row.css_first(_SEL["offer_availability"])

            store_name = _text(store_node)
            raw_price = _text(price_node)
            offer_url = _attr(link_node, "href")

            if not store_name or not offer_url:
                continue

            price = _clean_price(raw_price)
            store_logo = _attr(logo_node, "src") or _attr(logo_node, "data-src")
            avail_text = _text(avail_node).lower()
            in_stock = "out" not in avail_text and "نفد" not in avail_text

            offers.append(
                RawOffer(
                    store_name=store_name,
                    store_url=None,         # resolved later from offer_url domain
                    store_logo=_abs(store_logo) if store_logo else None,
                    price=price,
                    currency="EGP",
                    url=_abs(offer_url),
                    in_stock=in_stock,
                )
            )

        return offers

    # ------------------------------------------------------------------
    # JSON-LD structured data (extra metadata, optional)
    # ------------------------------------------------------------------

    def _extract_json_ld(self, tree: HTMLParser) -> dict:
        import json

        for script in tree.css("script[type='application/ld+json']"):
            try:
                data = json.loads(script.text())
                if isinstance(data, list):
                    data = data[0]
                if data.get("@type") in ("Product", "ItemPage"):
                    return {
                        "name": data.get("name", ""),
                        "description": data.get("description", ""),
                        "brand": (data.get("brand") or {}).get("name", ""),
                        "image": (
                            data.get("image", [""])[0]
                            if isinstance(data.get("image"), list)
                            else data.get("image", "")
                        ),
                        "sku": data.get("sku", ""),
                        "gtin": data.get("gtin13", data.get("gtin", "")),
                    }
            except (json.JSONDecodeError, (AttributeError, TypeError, KeyError)):
                continue
        return {}
