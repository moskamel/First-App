"""
Rivyoz Scraping System — CLI entry point.

Usage:
  python -m rivyoz_scraper.main scrape pricena
  python -m rivyoz_scraper.main scrape pricena --clear-cache
  python -m rivyoz_scraper.main migrate
"""

from __future__ import annotations

import asyncio
import sys

import click
import structlog

structlog.configure(
    processors=[
        structlog.stdlib.add_log_level,
        structlog.dev.ConsoleRenderer(),
    ]
)

log = structlog.get_logger()


@click.group()
def cli() -> None:
    """Rivyoz web scraping & ingestion system."""


# ---------------------------------------------------------------------------
# migrate
# ---------------------------------------------------------------------------

@cli.command()
def migrate() -> None:
    """Apply database migrations to Supabase."""
    from pathlib import Path
    from supabase import create_client
    from rivyoz_scraper.config import settings

    migration_dir = Path(__file__).parent / "migrations"
    client = create_client(settings.supabase_url, settings.supabase_key)

    for sql_file in sorted(migration_dir.glob("*.sql")):
        click.echo(f"Applying {sql_file.name}...")
        sql = sql_file.read_text()
        try:
            client.rpc("exec_sql", {"sql": sql}).execute()
            click.echo(f"  ✓ {sql_file.name}")
        except Exception as exc:
            # Supabase doesn't expose raw SQL exec via REST — use execute_sql MCP
            # or run migrations directly in the Supabase SQL editor.
            click.echo(f"  ✗ {sql_file.name}: {exc}")
            click.echo("  → Apply this SQL manually in the Supabase SQL editor.")


# ---------------------------------------------------------------------------
# scrape
# ---------------------------------------------------------------------------

@cli.command()
@click.argument("source", type=click.Choice(["pricena"]))
@click.option("--clear-cache", is_flag=True, default=False, help="Clear visited URL cache before starting.")
@click.option("--max-categories", default=0, help="Limit categories (0=all).")
@click.option("--max-products", default=0, help="Limit products per category (0=all).")
@click.option("--output", default=None, help="Write scraped data to this JSON Lines file instead of Supabase.")
def scrape(source: str, clear_cache: bool, max_categories: int, max_products: int, output: str | None) -> None:
    """Run the scraper for the given SOURCE."""
    from rivyoz_scraper.config import settings

    # Allow CLI overrides
    if max_categories:
        settings.max_categories = max_categories
    if max_products:
        settings.max_products_per_category = max_products

    click.echo(f"Starting {source} scraper...")

    if source == "pricena":
        from rivyoz_scraper.scrapers.pricena import PricenaSpider

        spider = PricenaSpider()
        job = asyncio.run(spider.run(clear_cache=clear_cache, output_file=output))

        click.echo("\n=== Scrape Summary ===")
        click.echo(f"Status          : {job.status}")
        click.echo(f"Products found  : {job.products_found}")
        click.echo(f"Products created: {job.products_created}")
        click.echo(f"Products updated: {job.products_updated}")
        click.echo(f"Offers upserted : {job.offers_upserted}")
        click.echo(f"Errors          : {job.errors}")

        if job.error_log:
            click.echo("\nFirst 10 errors:")
            for err in job.error_log[:10]:
                click.echo(f"  {err}")

        sys.exit(0 if job.errors == 0 else 1)


if __name__ == "__main__":
    cli()
