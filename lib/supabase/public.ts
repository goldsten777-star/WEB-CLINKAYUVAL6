import "server-only";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./env";

// Anonymous client, no cookies. Safe inside "use cache": it only sees
// what RLS allows visitors to see (published sites) and can send leads.
export function createSupabasePublicClient() {
  return createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
