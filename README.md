# בונה אתרים למטפלים

Based on the "חנוך המטפל" demo site. A therapist signs up, describes themselves in two
sentences, Gemini fills in the whole site, and it is published at `/<slug>` with a lead form.

- `/` and `/hanoch`: the original demo site
- `/signup`, `/login`: Supabase Auth (email + password)
- `/dashboard/new`: two sentences → Gemini → editable form
- `/dashboard`: edit, save and publish; `/dashboard/leads`: incoming leads
- `/<slug>`: the published site with a contact form

## Where things live

- `lib/site.ts`: the list of editable fields (zod). Pages, database, Gemini and the form all use it.
- `data/content.ts`: the demo site's values.
- `lib/theme.ts`: per-site colors (overrides Tailwind theme variables).
- `lib/gemini.ts`: prompt + JSON schema sent to Gemini, validated with zod.
- `supabase/migrations/`: tables `therapists` and `leads`, RLS policies, storage bucket.

## Setup

1. Create a Supabase project and run the two files in `supabase/migrations/` (in order) in the SQL editor.
2. In Supabase Auth > URL Configuration, set the Site URL to the site address and add
   `https://<your-domain>/auth/callback` to the redirect URLs.
3. Copy `.env.example` to `.env.local` (and to the Vercel project's environment variables) and fill it in.
4. `npm install && npm run dev`
