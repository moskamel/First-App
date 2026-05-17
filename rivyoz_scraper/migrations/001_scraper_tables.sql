-- Scrape job tracking: one row per crawl run
CREATE TABLE IF NOT EXISTS public.scraper_jobs (
    id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    source           text NOT NULL DEFAULT 'pricena',
    status           text NOT NULL DEFAULT 'running'
                       CHECK (status IN ('running','completed','completed_with_errors','failed')),
    started_at       timestamptz NOT NULL DEFAULT now(),
    finished_at      timestamptz,
    products_found   integer NOT NULL DEFAULT 0,
    products_created integer NOT NULL DEFAULT 0,
    products_updated integer NOT NULL DEFAULT 0,
    offers_upserted  integer NOT NULL DEFAULT 0,
    errors           integer NOT NULL DEFAULT 0,
    error_log        text[] NOT NULL DEFAULT '{}'::text[],
    created_at       timestamptz NOT NULL DEFAULT now()
);

-- Price history: every time a price changes it is recorded here
CREATE TABLE IF NOT EXISTS public.price_history (
    id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id     uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    store_id       uuid REFERENCES public.stores(id) ON DELETE SET NULL,
    store_name     text NOT NULL,
    price          numeric NOT NULL,
    currency       text NOT NULL DEFAULT 'EGP',
    recorded_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS price_history_product_store_idx
    ON public.price_history (product_id, store_name, recorded_at DESC);

-- Source URL → product_id mapping (enables cross-session dedup without fuzzy matching)
CREATE TABLE IF NOT EXISTS public.scraper_url_map (
    url        text PRIMARY KEY,
    product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    source     text NOT NULL DEFAULT 'pricena',
    first_seen timestamptz NOT NULL DEFAULT now(),
    last_seen  timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS (service role key bypasses RLS so the scraper can write)
ALTER TABLE public.scraper_jobs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraper_url_map ENABLE ROW LEVEL SECURITY;

-- Policies: block direct client access (scraper uses service key)
CREATE POLICY "no_public_access" ON public.scraper_jobs    FOR ALL TO anon, authenticated USING (false);
CREATE POLICY "no_public_access" ON public.price_history   FOR ALL TO anon, authenticated USING (false);
CREATE POLICY "no_public_access" ON public.scraper_url_map FOR ALL TO anon, authenticated USING (false);

-- Add source_url tracking to products.metadata (already a jsonb column)
-- The scraper writes: metadata->>'source_url', metadata->>'source', metadata->>'source_id'
-- No schema change needed — jsonb is schemaless.

-- Functional index on source_url for fast dedup lookups
CREATE INDEX IF NOT EXISTS products_source_url_idx
    ON public.products ((metadata->>'source_url'))
    WHERE metadata->>'source_url' IS NOT NULL;
