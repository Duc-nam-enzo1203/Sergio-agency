# Sergio Agency

Website agency (Next.js) + Admin Dashboard — thiết kế website & landing page.

**Repo:** [Duc-nam-enzo1203/Sergio-agency](https://github.com/Duc-nam-enzo1203/Sergio-agency)

## Stack

- **Frontend / Admin:** Next.js 16 (App Router) + Tailwind CSS + Framer Motion
- **Auth:** NextAuth v5 (Credentials)
- **Database:** PostgreSQL trên [Supabase](https://supabase.com) (Prisma ORM)
- **Deploy:** Vercel

## Cấu trúc

```
apps/web/          # Next.js app (public site + /dashboard)
  prisma/          # Schema + seed
  app/             # Routes
  components/
```

## Setup Supabase

1. Tạo project tại [supabase.com](https://supabase.com)
2. Vào **Project Settings → Database → Connection string**
3. Copy 2 URI:
   - **Transaction** (port `6543`, có `pgbouncer=true`) → `DATABASE_URL`
   - **Session / Direct** (port `5432`) → `DIRECT_URL`
4. Copy `apps/web/.env.example` → `apps/web/.env` và điền giá trị

```env
DATABASE_URL="postgresql://postgres.xxx:PASSWORD@aws-0-....pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxx:PASSWORD@aws-0-....pooler.supabase.com:5432/postgres"
AUTH_SECRET="..."   # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
ALLOW_PUBLIC_REGISTER="false"
```

5. Chạy migrate + seed:

```bash
cd apps/web
npm install
npm run db:setup
```

Admin mặc định sau seed:

- Email: `admin@sergioagency.com`
- Password: `admin123` *(đổi ngay sau khi deploy)*

## Chạy local

```bash
cd apps/web
npm run dev
```

Mở http://localhost:3000 — Dashboard: http://localhost:3000/dashboard

## Deploy Vercel

1. Import repo GitHub vào Vercel
2. **Root Directory:** `apps/web`
3. Thêm Environment Variables (Production + Preview):

| Key | Value |
|-----|--------|
| `DATABASE_URL` | Supabase Transaction URI |
| `DIRECT_URL` | Supabase Session/Direct URI |
| `AUTH_SECRET` | Random secret |
| `AUTH_TRUST_HOST` | `true` |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` |
| `ALLOW_PUBLIC_REGISTER` | `false` |

4. Deploy — build sẽ chạy `prisma db push` rồi `next build`
5. (Tuỳ chọn) Seed production một lần:

```bash
cd apps/web
# set DATABASE_URL + DIRECT_URL trỏ production
npm run db:seed
```

## Scripts

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Dev server |
| `npm run build` | Generate + db push + build |
| `npm run db:setup` | Generate + push schema + seed |
| `npm run db:seed` | Seed data |
| `npm run db:studio` | Prisma Studio |

## Bảo mật

- Đăng ký công khai tắt mặc định
- Rate limit form liên hệ
- Honeypot chống spam
- Security headers (CSP, X-Frame-Options, …)
- Dashboard bảo vệ bằng NextAuth middleware
