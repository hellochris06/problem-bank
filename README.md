
# Problem Bank (Next.js + Supabase)

A minimal, production-ready problem bank you can deploy on Vercel in minutes.

## Features
- Create / edit / delete problems (admin)
- Browse, filter, and solve problems
- Quiz mode (10 random problems)
- Supabase Postgres + RLS
- Clean Tailwind UI

## 1) Create Supabase project
- Go to https://supabase.com/ and create a new project.
- In SQL editor, run: [`supabase/schema.sql`](supabase/schema.sql).

## 2) Configure env
Create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
ADMIN_EMAILS=you@example.com,other@example.com
```

> The `SUPABASE_SERVICE_ROLE_KEY` **must stay server-only**. Next.js will keep it on the server when used in server actions.

## 3) Run locally
```bash
pnpm install
pnpm dev
```

## 4) Deploy to Vercel
- Import the repo into Vercel, set the same env vars in Project Settings → Environment Variables, and deploy.
- Point a domain if you want.

## Admin Access
For simplicity, server actions use the service role key and an `ADMIN_EMAILS` allowlist. 
You can wire Supabase Auth UI to verify the current user's email and check against `ADMIN_EMAILS` before allowing actions.

## Data Model
- `problems(id, title, question, options JSONB, answer INT, explanation, category, difficulty, tags[], created_by_email, created_at)`
- `solutions(id, problem_id, user_id, selected, correct, created_at)`

---

Generated: 2025-08-24T20:16:25.136664Z


## Admin Login
Set `ADMIN_SECRET` in env (any strong string). After deploy, visit `/admin/login` and enter the same secret.
This sets an `admin` cookie so only you can create/edit/delete problems.
