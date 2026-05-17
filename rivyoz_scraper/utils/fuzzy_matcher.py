"""Fuzzy product deduplication using rapidfuzz."""

from __future__ import annotations

import re
import unicodedata
from typing import Optional

from rapidfuzz import fuzz, process

from rivyoz_scraper.config import settings


def _normalize(text: str) -> str:
    """Lowercase, strip diacritics, collapse whitespace."""
    text = text.lower().strip()
    # Remove Arabic diacritics (tashkeel)
    text = re.sub(r"[ؐ-ًؚ-ٟ]", "", text)
    # Normalize unicode
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r"\s+", " ", text)
    return text


def similarity(a: str, b: str) -> int:
    """Token-set ratio so word order doesn't matter (0-100)."""
    return fuzz.token_set_ratio(_normalize(a), _normalize(b))


def find_duplicate(
    candidate_name: str,
    existing_names: list[str],
    threshold: Optional[int] = None,
) -> Optional[int]:
    """
    Return the index in existing_names of the best match above threshold,
    or None if no duplicate found.
    """
    threshold = threshold or settings.fuzzy_match_threshold
    if not existing_names:
        return None

    normalized_candidate = _normalize(candidate_name)
    normalized_existing = [_normalize(n) for n in existing_names]

    result = process.extractOne(
        normalized_candidate,
        normalized_existing,
        scorer=fuzz.token_set_ratio,
        score_cutoff=threshold,
    )
    if result is None:
        return None

    _, score, idx = result
    return idx


def is_same_brand(a: str, b: str) -> bool:
    return similarity(a, b) >= 90
