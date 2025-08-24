
-- Enable pgcrypto for gen_random_uuid if needed
create extension if not exists "pgcrypto";

-- Problems table
create table if not exists public.problems (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  question text not null,
  options jsonb not null,
  answer int not null,
  explanation text,
  category text,
  difficulty int2,
  tags text[] default '{}',
  created_by_email text,
  created_at timestamptz default now()
);

-- Solutions table
create table if not exists public.solutions (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid references public.problems(id) on delete cascade,
  user_id uuid, -- optional, if you wire auth
  selected int not null,
  correct boolean not null,
  created_at timestamptz default now()
);

alter table public.problems enable row level security;
alter table public.solutions enable row level security;

-- RLS policies: allow read to everyone; writes only via service key (admin server actions)
drop policy if exists problems_read_all on public.problems;
create policy problems_read_all on public.problems for select using (true);

drop policy if exists solutions_read_all on public.solutions;
create policy solutions_read_all on public.solutions for select using (true);

drop policy if exists solutions_insert_all on public.solutions;
create policy solutions_insert_all on public.solutions for insert with check (true);

-- Helper function for dashboard
create or replace function public.problem_counts_by_category()
returns table(category text, count bigint)
language sql security definer
as $$
  select coalesce(category, 'Uncategorized') as category, count(*)::bigint
  from public.problems
  group by 1
  order by 2 desc;
$$;
