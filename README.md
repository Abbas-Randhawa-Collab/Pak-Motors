# Pak Motors Bahawalpur — Next.js + Supabase

A full-stack car dealership website: public marketing site, live inventory,
finance calculator, contact/sell forms, and an authenticated admin dashboard
for managing cars, inquiries, and reviews.

**Stack:** Next.js 14 (App Router, TypeScript) · Tailwind CSS · Supabase
(Postgres + Auth + Row Level Security).

## 1. Prerequisites

- Node.js 18.18+ (Node 20 recommended)
- A free [Supabase](https://supabase.com) project
- VS Code (or any editor)

## 2. Install

```bash
npm install
```

## 3. Set up Supabase

1. Create a project at supabase.com.
2. Go to **SQL Editor** and run the entire contents of `supabase/schema.sql`.
   This creates the `profiles`, `cars`, `inquiries`, and `reviews` tables,
   enables Row Level Security, sets up policies, and seeds 6 sample cars.
3. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key
4. Copy `.env.local.example` to `.env.local` and paste them in:

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 4. Create your admin account

1. Run the app (`npm run dev`) and go to `/login`.
2. Supabase Auth needs a user to exist first — the quickest way is:
   **Supabase Dashboard → Authentication → Users → Add user** (set an email
   + password). This also creates a row in `public.profiles` automatically
   (role defaults to `staff`).
3. Promote yourself to admin — in the SQL Editor run:

```sql
update public.profiles set role = 'admin' where id = '<your-user-uuid>';
```

   (Find the UUID in Authentication → Users.)

4. Log in at `/login` with that email/password — you'll land on `/admin`.

## 5. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 6. Project structure

```
src/
  app/
    page.tsx                  Home page (hero, inventory, finance calc, etc.)
    cars/page.tsx              Full inventory with filters
    cars/[id]/page.tsx         Single car detail + inquiry form
    sell/page.tsx               "Sell your car" form
    contact/page.tsx            Contact page + map
    login/page.tsx              Admin login (Supabase Auth)
    admin/                       Authenticated dashboard
      layout.tsx                 Sidebar + role check
      page.tsx                   Overview / stats
      cars/                      List, add, edit listings
      inquiries/page.tsx         View & update inquiry status
      reviews/page.tsx           Approve / delete reviews
    api/
      cars/route.ts               GET (public list), POST (admin create)
      cars/[id]/route.ts           GET/PUT/DELETE
      inquiries/route.ts           POST (public), GET (admin list)
      inquiries/[id]/route.ts      PUT/DELETE (admin)
      reviews/route.ts             GET (public), POST (public submit)
      reviews/[id]/route.ts        PUT/DELETE (admin)
  components/                    Shared UI (Header, Footer, CarCard, etc.)
  lib/
    supabase/client.ts            Browser Supabase client
    supabase/server.ts            Server Supabase client (cookies-based)
    supabase/middleware.ts        Session refresh + route protection
    types.ts                      Shared TypeScript types
  middleware.ts                  Protects /admin/* and redirects /login
supabase/schema.sql              Full DB schema, RLS policies, seed data
```

## 7. How auth & authorization work

- Supabase Auth issues a session cookie on login.
- `src/middleware.ts` runs on every request, refreshes the session, and
  redirects unauthenticated users away from `/admin/*` to `/login`.
- `src/app/admin/layout.tsx` double-checks the user's `role` in `profiles`
  server-side before rendering any admin page.
- Row Level Security policies in `supabase/schema.sql` enforce the same
  rules directly in the database — so even a direct API call can't bypass
  them.

## 8. Deploying

- Push this repo to GitHub.
- Import it into [Vercel](https://vercel.com) (or any Next.js host).
- Add the two `NEXT_PUBLIC_SUPABASE_*` environment variables in your
  hosting provider's dashboard.
- Deploy.

## 9. Optional: seed more demo cars

```bash
npm install --save-dev dotenv
# add SUPABASE_SERVICE_ROLE_KEY to .env.local (Project Settings > API)
npm run seed
```
