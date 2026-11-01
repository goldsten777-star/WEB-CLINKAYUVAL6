import "server-only";
import { cacheLife } from "next/cache";
import { SUPABASE_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";

// Whether the Google provider is turned on in Supabase Auth.
// Checked every few minutes, so the button appears soon after it's enabled.
export async function isGoogleEnabled(): Promise<boolean> {
  "use cache";
  cacheLife("minutes");
  if (!isSupabaseConfigured()) return false;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: SUPABASE_KEY } });
    if (!res.ok) return false;
    const settings = (await res.json()) as { external?: Record<string, boolean> };
    return settings.external?.google === true;
  } catch {
    return false;
  }
}
