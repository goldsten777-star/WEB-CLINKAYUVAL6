import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { DEMO_SITE } from "@/data/content";
import { type SiteData, siteSchema } from "./site";
import { isSupabaseConfigured } from "./supabase/env";
import { createSupabasePublicClient } from "./supabase/public";
import { createSupabaseServerClient } from "./supabase/server";

export const DEMO_SLUG = "hanoch";

// Columns visitors may read (user_id is hidden from them by the database).
export const PUBLIC_COLUMNS = [
  "id",
  "slug",
  "published",
  ...Object.keys(siteSchema.shape),
].join(",");

export type StoredSite = {
  id: string;
  slug: string;
  published: boolean;
  site: SiteData;
};

export const siteTag = (slug: string) => `site:${slug}`;

function toStoredSite(row: Record<string, unknown>): StoredSite | null {
  const parsed = siteSchema.safeParse(row);
  if (!parsed.success) {
    console.error("Invalid site row", row.slug, parsed.error.issues);
    return null;
  }
  return {
    id: String(row.id),
    slug: String(row.slug),
    published: Boolean(row.published),
    site: parsed.data,
  };
}

// A published site for the public page. Cached until the owner saves
// (the save action calls updateTag(siteTag(slug))).
export async function getPublishedSite(slug: string): Promise<SiteData | null> {
  if (slug === DEMO_SLUG) return DEMO_SITE;
  if (!isSupabaseConfigured()) return null;
  return fetchPublishedSite(slug);
}

async function fetchPublishedSite(slug: string): Promise<SiteData | null> {
  "use cache";
  cacheTag(siteTag(slug));
  cacheLife("days");

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("therapists")
    .select(PUBLIC_COLUMNS)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error(`Loading site "${slug}" failed: ${error.message}`);
  return data ? (toStoredSite(data as unknown as Record<string, unknown>)?.site ?? null) : null;
}

// The site id behind a published slug (used when a visitor sends a lead).
export async function getPublishedSiteId(slug: string): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createSupabasePublicClient();
  const { data } = await supabase
    .from("therapists")
    .select("id")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data?.id ?? null;
}

// The signed-in therapist's own site (published or not), or null.
export async function getMySite(): Promise<StoredSite | null> {
  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getClaims();
  const userId = auth?.claims?.sub;
  if (!userId) return null;

  const { data, error } = await supabase
    .from("therapists")
    .select(PUBLIC_COLUMNS)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`Loading your site failed: ${error.message}`);
  return data ? toStoredSite(data as unknown as Record<string, unknown>) : null;
}
