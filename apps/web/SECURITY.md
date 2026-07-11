# Security hardening notes — Sergio Agency

## Applied in code
- NextAuth JWT + bcrypt; role refresh; AUTH_SECRET guard
- `requireStaff` (ADMIN|EDITOR) vs `requireAdmin` (ADMIN only)
- Zod validation, honeypot, sanitize, upload magic-bytes
- Rate limit: Upstash when configured, else in-memory fallback
- AuthEvent audit table + structured `[security]` logs
- Optional Sentry via `SENTRY_DSN`
- Security headers (HSTS, CSP, …) in `next.config.ts`

## You must run / configure

### 1. Apply Supabase RLS
In Supabase SQL Editor, run:

`apps/web/supabase/rls.sql`

This denies PostgREST (`anon` / `authenticated`) access to sensitive tables
and only allows SELECT of published content.

Prisma continues to use `DATABASE_URL` (privileged). Do **not** expose
`SERVICE_ROLE_KEY` or DB password to the browser.

### 2. Upstash Redis (recommended on Vercel)
Create a Redis database at https://upstash.com and set:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

Without these, rate limits fall back to per-instance memory.

### 3. Sentry (optional)
Set `SENTRY_DSN` (and optionally `NEXT_PUBLIC_SENTRY_DSN`) on Vercel.

### 4. Rotate secrets
Keep `AUTH_SECRET` ≥ 32 chars. Never commit `.env`.
