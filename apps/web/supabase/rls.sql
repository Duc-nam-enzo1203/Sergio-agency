-- Sergio Agency — Supabase Row Level Security
-- Run in Supabase SQL Editor (or: psql "$DIRECT_URL" -f supabase/rls.sql)
--
-- Goal: deny-by-default for PostgREST roles (anon / authenticated).
-- Prisma uses the database owner / pooler role and typically BYPASSES RLS
-- unless FORCE ROW LEVEL SECURITY is enabled for that role.
--
-- This script:
-- 1) Enables RLS on all app tables
-- 2) Allows public SELECT of published content only
-- 3) Blocks anon/authenticated writes
-- 4) Blocks anon/authenticated access to User, Lead, SiteSettings, AuthEvent
--
-- After running, verify with the anon key that unpublished rows are hidden.

-- ── Enable RLS ──────────────────────────────────────────────
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Post" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Service" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SiteSettings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AuthEvent" ENABLE ROW LEVEL SECURITY;

-- Drop old policies if re-running
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT policyname, tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('User','Post','Project','Service','Lead','SiteSettings','AuthEvent')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- ── Public read: published content only ───────────────────
CREATE POLICY "public_read_published_posts"
  ON "Post" FOR SELECT
  TO anon, authenticated
  USING ("published" = true);

CREATE POLICY "public_read_published_projects"
  ON "Project" FOR SELECT
  TO anon, authenticated
  USING ("published" = true);

CREATE POLICY "public_read_published_services"
  ON "Service" FOR SELECT
  TO anon, authenticated
  USING ("published" = true);

-- ── Explicit deny writes for API roles ────────────────────
-- (No INSERT/UPDATE/DELETE policies = denied by default when RLS is on)

-- ── Sensitive tables: no policies for anon/authenticated ──
-- User, Lead, SiteSettings, AuthEvent remain inaccessible via PostgREST.

-- Optional hardening: force RLS even for table owner (breaks Prisma unless
-- you grant a bypass role). Keep commented unless you create a dedicated
-- app role with BYPASSRLS or matching policies.
-- ALTER TABLE "User" FORCE ROW LEVEL SECURITY;
-- ALTER TABLE "Post" FORCE ROW LEVEL SECURITY;
-- ALTER TABLE "Project" FORCE ROW LEVEL SECURITY;
-- ALTER TABLE "Service" FORCE ROW LEVEL SECURITY;
-- ALTER TABLE "Lead" FORCE ROW LEVEL SECURITY;
-- ALTER TABLE "SiteSettings" FORCE ROW LEVEL SECURITY;
-- ALTER TABLE "AuthEvent" FORCE ROW LEVEL SECURITY;

COMMENT ON TABLE "AuthEvent" IS 'Security audit trail for login and auth events';
