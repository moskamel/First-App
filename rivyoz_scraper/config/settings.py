from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import Optional


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="RIVYOZ_", extra="ignore")

    # Supabase
    supabase_url: str = Field(..., alias="SUPABASE_URL")
    supabase_key: str = Field(..., alias="SUPABASE_SERVICE_KEY")

    # Redis (optional — falls back to in-memory if not set)
    redis_url: Optional[str] = Field(default=None)

    # HTTP client
    request_timeout: int = 30
    max_retries: int = 4
    retry_backoff_base: float = 2.0         # seconds: 2, 4, 8, 16
    concurrent_requests: int = 5
    user_agent_rotate: bool = True

    # Rate limiting (requests per second per domain)
    rate_limit_pricena: float = 0.5         # 1 req / 2 sec — polite default

    # Deduplication
    fuzzy_match_threshold: int = 88         # rapidfuzz score 0-100
    min_name_length: int = 5

    # Scraping targets
    pricena_base_url: str = "https://eg.pricena.com/ar"
    pricena_country: str = "EG"
    pricena_currency: str = "EGP"

    # Crawl limits (0 = unlimited)
    max_categories: int = 0
    max_products_per_category: int = 0
    max_pages_per_category: int = 0

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        populate_by_name=True,
    )


settings = Settings()  # type: ignore[call-arg]
