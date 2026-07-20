-- ============================================================================
-- Pak Motors Bahawalpur — Supabase Database Schema
-- Run this in Supabase Dashboard > SQL Editor (or via `supabase db push`)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. PROFILES  (extends auth.users, holds role — "admin" or "staff")
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'staff');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 2. CARS
-- ---------------------------------------------------------------------------
create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  brand text not null,
  model text,
  year int not null,
  price numeric not null,               -- PKR, stored as plain number
  mileage_km int not null default 0,
  fuel_type text not null default 'Petrol' check (fuel_type in ('Petrol','Diesel','Hybrid','Electric','CNG')),
  transmission text not null default 'Automatic' check (transmission in ('Automatic','Manual')),
  city text not null default 'Bahawalpur',
  category text not null default 'Sedan' check (category in ('Sedan','SUV','Hatchback','Imported','Luxury','Van','Truck')),
  tag text,                             -- e.g. "IMPORTED · JAPAN", "BRAND NEW", "FEATURED"
  description text,
  image_url text,
  gallery_urls text[] default '{}',
  is_available boolean not null default true,
  is_featured boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cars_brand_idx on public.cars (brand);
create index if not exists cars_category_idx on public.cars (category);
create index if not exists cars_city_idx on public.cars (city);
create index if not exists cars_price_idx on public.cars (price);
create index if not exists cars_available_idx on public.cars (is_available);

alter table public.cars enable row level security;

create policy "Anyone can view available cars"
  on public.cars for select
  using (is_available = true);

create policy "Admins can view all cars"
  on public.cars for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can insert cars"
  on public.cars for insert
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can update cars"
  on public.cars for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can delete cars"
  on public.cars for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists cars_set_updated_at on public.cars;
create trigger cars_set_updated_at
  before update on public.cars
  for each row execute procedure public.set_updated_at();

-- ---------------------------------------------------------------------------
-- 3. INQUIRIES  (contact form / sell-your-car / buy-inquiry submissions)
-- ---------------------------------------------------------------------------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  inquiry_type text not null default 'buy' check (inquiry_type in ('buy','sell','finance','import')),
  message text,
  car_id uuid references public.cars(id) on delete set null,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "Anyone can submit an inquiry"
  on public.inquiries for insert
  with check (true);

create policy "Admins can view inquiries"
  on public.inquiries for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can update inquiries"
  on public.inquiries for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can delete inquiries"
  on public.inquiries for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ---------------------------------------------------------------------------
-- 4. REVIEWS
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  reviewer_city text,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "Anyone can view approved reviews"
  on public.reviews for select
  using (is_approved = true);

create policy "Admins can view all reviews"
  on public.reviews for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Anyone can submit a review"
  on public.reviews for insert
  with check (true);

create policy "Admins can update reviews"
  on public.reviews for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "Admins can delete reviews"
  on public.reviews for delete
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- ---------------------------------------------------------------------------
-- 5. Seed a few sample cars (safe to re-run)
-- ---------------------------------------------------------------------------
insert into public.cars (title, brand, model, year, price, mileage_km, fuel_type, transmission, city, category, tag, description, is_featured)
select * from (values
  ('Toyota Land Cruiser V8', 'Toyota', 'Land Cruiser V8', 2021, 26500000, 38000, 'Petrol', 'Automatic', 'Bahawalpur', 'Imported', 'IMPORTED · JAPAN', 'Fully loaded Land Cruiser V8, Japan-imported, single owner.', true),
  ('Honda Civic Turbo Oriel', 'Honda', 'Civic Turbo Oriel', 2022, 7850000, 21000, 'Petrol', 'Automatic', 'Multan', 'Sedan', 'FEATURED', 'Civic Turbo Oriel in excellent condition, full option.', true),
  ('Suzuki Alto VXL AGS', 'Suzuki', 'Alto VXL AGS', 2023, 3290000, 9200, 'Petrol', 'Automatic', 'Bahawalpur', 'Hatchback', 'BRAND NEW', 'Almost brand new Alto VXL AGS, under warranty.', false),
  ('KIA Sportage AWD', 'KIA', 'Sportage AWD', 2022, 9500000, 17500, 'Petrol', 'Automatic', 'Lahore', 'SUV', 'SUV', 'KIA Sportage AWD, well maintained, all documents clear.', false),
  ('Mercedes-Benz C200', 'Mercedes-Benz', 'C200', 2020, 18500000, 29000, 'Petrol', 'Automatic', 'Bahawalpur', 'Luxury', 'IMPORTED · UK', 'UK-imported Mercedes C200, showroom condition.', false),
  ('Toyota Corolla Altis', 'Toyota', 'Corolla Altis', 2021, 6100000, 33400, 'Petrol', 'Automatic', 'Karachi', 'Imported', 'IMPORTED · JAPAN', 'Japan-imported Corolla Altis, accident free.', false)
) as v(title, brand, model, year, price, mileage_km, fuel_type, transmission, city, category, tag, description, is_featured)
where not exists (select 1 from public.cars);

-- ---------------------------------------------------------------------------
-- 6. Make yourself an admin (run manually after you sign up once):
--    update public.profiles set role = 'admin' where id = '<your-auth-user-uuid>';
-- ---------------------------------------------------------------------------
