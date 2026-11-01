-- Therapist sites and the leads they receive.
-- Field list mirrors lib/site.ts (siteSchema).

create table public.therapists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  slug text not null unique
    check (slug ~ '^[a-z0-9-]{3,40}$')
    check (slug not in ('api','auth','book','dashboard','login','logout','signup','admin','public','static','hanoch')),
  published boolean not null default false,

  -- identity and SEO
  therapist_name text not null check (char_length(therapist_name) between 1 and 40),
  clinic_name text not null check (char_length(clinic_name) between 1 and 60),
  tagline text not null check (char_length(tagline) between 1 and 80),
  meta_description text not null check (char_length(meta_description) between 1 and 200),

  -- hero
  hero_title text not null check (char_length(hero_title) between 1 and 60),
  hero_subtitle text not null check (char_length(hero_subtitle) between 1 and 200),
  cta_label text not null check (char_length(cta_label) between 1 and 24),

  -- services: [{title, text, icon, tone}]
  services_title text not null check (char_length(services_title) between 1 and 60),
  services_subtitle text not null check (char_length(services_subtitle) between 1 and 200),
  services jsonb not null
    check (jsonb_typeof(services) = 'array' and jsonb_array_length(services) between 1 and 4),

  -- about
  about_title text not null check (char_length(about_title) between 1 and 60),
  about_paragraphs jsonb not null
    check (jsonb_typeof(about_paragraphs) = 'array' and jsonb_array_length(about_paragraphs) between 1 and 2),
  "values" jsonb not null
    check (jsonb_typeof("values") = 'array' and jsonb_array_length("values") between 1 and 4),
  about_image_url text not null check (char_length(about_image_url) <= 500),
  about_image_alt text not null check (char_length(about_image_alt) between 1 and 150),

  -- testimonials: [{name, role, text}]
  testimonials_title text not null check (char_length(testimonials_title) between 1 and 60),
  testimonials jsonb not null default '[]'
    check (jsonb_typeof(testimonials) = 'array' and jsonb_array_length(testimonials) <= 6),

  -- images and colors
  logo_url text not null check (char_length(logo_url) <= 500),
  color_brand text not null check (color_brand ~ '^#[0-9a-f]{6}$'),
  color_cta text not null check (color_cta ~ '^#[0-9a-f]{6}$'),
  color_background text not null check (color_background ~ '^#[0-9a-f]{6}$'),

  -- contact (optional)
  phone text not null default '' check (char_length(phone) <= 20),
  whatsapp text not null default '' check (char_length(whatsapp) <= 20),
  email text not null default '' check (char_length(email) <= 120),
  area text not null default '' check (char_length(area) <= 60),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  therapist_id uuid not null references public.therapists (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  phone text not null check (char_length(phone) between 6 and 20),
  email text not null default '' check (char_length(email) <= 120),
  message text not null default '' check (char_length(message) <= 1000),
  consent boolean not null check (consent),
  created_at timestamptz not null default now()
);

create index leads_therapist_id_created_at_idx on public.leads (therapist_id, created_at desc);

-- keep updated_at current
create function public.set_updated_at() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger therapists_set_updated_at
before update on public.therapists
for each row execute function public.set_updated_at();

-- Row Level Security ---------------------------------------------------------

alter table public.therapists enable row level security;
alter table public.leads enable row level security;

-- Anyone can read a published site.
create policy "Published sites are public"
on public.therapists for select
to anon, authenticated
using (published);

-- Owners can read, create and edit only their own row.
create policy "Owners read their site"
on public.therapists for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Owners create their site"
on public.therapists for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Owners update their site"
on public.therapists for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Owners delete their site"
on public.therapists for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Visitors can leave a lead, only on a published site.
create policy "Anyone can send a lead to a published site"
on public.leads for insert
to anon, authenticated
with check (
  exists (
    select 1 from public.therapists t
    where t.id = therapist_id and t.published
  )
);

-- Only the site owner reads its leads. No update for anyone.
create policy "Owners read their leads"
on public.leads for select
to authenticated
using (
  exists (
    select 1 from public.therapists t
    where t.id = therapist_id and t.user_id = (select auth.uid())
  )
);

create policy "Owners delete their leads"
on public.leads for delete
to authenticated
using (
  exists (
    select 1 from public.therapists t
    where t.id = therapist_id and t.user_id = (select auth.uid())
  )
);

-- Column privileges: user_id, id and timestamps are never written by clients
-- beyond what the policies allow; leads are insert-only for visitors.
revoke all on public.leads from anon;
grant insert (therapist_id, name, phone, email, message, consent) on public.leads to anon;

-- Visitors only need to read site content: hide user_id from them,
-- and give them no write access to sites at all.
revoke all on public.therapists from anon;
grant select (
  id, slug, published,
  therapist_name, clinic_name, tagline, meta_description,
  hero_title, hero_subtitle, cta_label,
  services_title, services_subtitle, services,
  about_title, about_paragraphs, "values", about_image_url, about_image_alt,
  testimonials_title, testimonials,
  logo_url, color_brand, color_cta, color_background,
  phone, whatsapp, email, area,
  updated_at
) on public.therapists to anon;
