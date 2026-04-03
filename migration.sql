-- Recipe Maker schema for Supabase SQL Editor
-- Paste this into Supabase SQL Editor and run once on a new project.

create extension if not exists pgcrypto;

-- 1) TABLES
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  user_id text,
-- Safe to paste into a fresh Supabase project.

create extension if not exists pgcrypto;

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 3 and 160),
  description text not null check (char_length(trim(description)) between 10 and 2000),
  image_url text not null check (image_url ~* '^https?://'),
  ingredients text[] not null check (coalesce(array_length(ingredients, 1), 0) > 0),
  steps text[] not null check (coalesce(array_length(steps, 1), 0) > 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  user_id text,
  rating integer not null check (rating between 1 and 5),
  comment text not null check (char_length(trim(comment)) between 3 and 1000),
  video_url text null check (video_url is null or video_url ~* '^https?://'),
  created_at timestamptz not null default timezone('utc', now())
);

-- Backward-compatible ALTERs for existing projects.
alter table public.recipes add column if not exists user_id text;
alter table public.reviews add column if not exists user_id text;
update public.recipes set user_id = coalesce(user_id, 'legacy-user') where user_id is null;
update public.reviews set user_id = coalesce(user_id, 'legacy-user') where user_id is null;
alter table public.recipes alter column user_id set not null;
alter table public.reviews alter column user_id set not null;

-- 2) INDEXES
create index if not exists recipes_created_at_idx on public.recipes (created_at desc);
create index if not exists recipes_updated_at_idx on public.recipes (updated_at desc);
create index if not exists recipes_user_id_idx on public.recipes (user_id);
create index if not exists reviews_recipe_id_idx on public.reviews (recipe_id);
create index if not exists reviews_created_at_idx on public.reviews (created_at desc);
create index if not exists reviews_user_id_idx on public.reviews (user_id);

-- 3) UPDATED_AT TRIGGER
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists recipes_set_updated_at on public.recipes;
create trigger recipes_set_updated_at
before update on public.recipes
for each row execute function public.set_updated_at();

-- 4) ROW LEVEL SECURITY
alter table public.recipes enable row level security;
alter table public.reviews enable row level security;

-- Public MVP read policies.
create index if not exists recipes_created_at_idx on public.recipes (created_at desc);
create index if not exists reviews_recipe_id_idx on public.reviews (recipe_id);
create index if not exists reviews_created_at_idx on public.reviews (created_at desc);

alter table public.recipes enable row level security;
alter table public.reviews enable row level security;

-- Public MVP policies for browsing and submitting recipes/reviews without auth.
drop policy if exists "Public can read recipes" on public.recipes;
create policy "Public can read recipes"
  on public.recipes
  for select
  using (true);

drop policy if exists "Public can read reviews" on public.reviews;
create policy "Public can read reviews"
  on public.reviews
  for select
  using (true);

-- Insert policies remain open for MVP because we use Clerk auth at API layer.
drop policy if exists "Public can insert recipes" on public.recipes;
create policy "Public can insert recipes"
  on public.recipes
  for insert
  with check (true);

drop policy if exists "Public can read reviews" on public.reviews;
create policy "Public can read reviews"
  on public.reviews
  for select
  using (true);

drop policy if exists "Public can insert reviews" on public.reviews;
create policy "Public can insert reviews"
  on public.reviews
  for insert
  with check (true);

-- 5) VIEW FOR CARD LISTING
create or replace view public.recipe_cards as
select
  r.id,
  r.user_id,
create or replace view public.recipe_cards as
select
  r.id,
  r.title,
  r.description,
  r.image_url,
  r.ingredients,
  r.steps,
  r.created_at,
  r.updated_at,
  coalesce(round(avg(rv.rating)::numeric, 1), 0) as average_rating,
  count(rv.id)::int as review_count
from public.recipes r
left join public.reviews rv on rv.recipe_id = r.id
group by r.id;

-- 6) GRANTS FOR SUPABASE FREE-TIER CLIENT USAGE
grant usage on schema public to anon, authenticated;
grant select, insert on public.recipes to anon, authenticated;
grant select, insert on public.reviews to anon, authenticated;
grant select on public.recipe_cards to anon, authenticated;

-- 7) DOCUMENTATION COMMENTS
comment on table public.recipes is 'Recipes shared by users in the Recipe Maker MVP.';
comment on table public.reviews is 'Ratings and review comments for recipes.';
comment on view public.recipe_cards is 'Convenience view for listing recipes with average ratings and review counts.';
comment on function public.set_updated_at() is 'Trigger helper to keep updated_at in UTC.';
comment on table public.recipes is 'Recipes shared by users in the Recipe Maker MVP.';
comment on table public.reviews is 'Ratings and review comments for recipes.';
comment on view public.recipe_cards is 'Convenience view for listing recipes with average ratings and review counts.';
