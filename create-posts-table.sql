-- ================================
-- CREATE POSTS TABLE & RLS SETUP
-- ================================
-- Execute this in Supabase Dashboard → SQL Editor

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  author text,
  slug text not null unique,
  content text not null,
  cover_image text,
  read_time integer default 15,
  date timestamp default now(),
  published boolean default true,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Enable RLS
alter table posts enable row level security;

-- Drop existing policies if any
drop policy if exists "Posts readable" on posts;
drop policy if exists "Admin only" on posts;
drop policy if exists "Posts are readable by all" on posts;
drop policy if exists "Only admins can modify posts" on posts;

-- Create RLS policies
create policy "Posts readable" on posts
  for select using (true);

create policy "Admin only" on posts
  for all using (
    coalesce(
      (auth.jwt() ->> 'user_metadata')::jsonb ->> 'is_admin' = 'true',
      false
    )
  );
