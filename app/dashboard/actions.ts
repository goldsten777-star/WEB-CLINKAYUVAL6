"use server";

import { updateTag } from "next/cache";
import { z } from "zod";
import { GeminiError, generateSiteContent } from "@/lib/gemini";
import { DEFAULT_IMAGE, type SiteContent, type SiteData, siteSchema, slugSchema } from "@/lib/site";
import { siteTag } from "@/lib/sites";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub as string | undefined;
  if (!userId) throw new Error("Not signed in");
  return { supabase, userId };
}

// --- Step 3: two sentences -> site content ----------------------------------

export type GenerateState = { error?: string; content?: SiteContent; slug?: string; description?: string };

const descriptionSchema = z
  .string()
  .trim()
  .min(20, "כתבו קצת יותר, משפט או שניים על מי אתם ועם מי אתם עובדים.")
  .max(800, "עד 800 תווים, בבקשה.");

export async function generateSite(_: GenerateState, formData: FormData): Promise<GenerateState> {
  await requireUser();
  const raw = String(formData.get("description") ?? "");
  const parsed = descriptionSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0].message, description: raw };

  try {
    const content = await generateSiteContent(parsed.data);
    return { content, description: raw };
  } catch (e) {
    console.error("Gemini generation failed", e);
    const message = e instanceof GeminiError ? e.message : "יצירת האתר נכשלה. נסו שוב בעוד רגע.";
    return { error: message, description: raw };
  }
}

// --- Save the edited site ---------------------------------------------------

export type SaveState = {
  error?: string;
  saved?: boolean;
  slug?: string;
  // Final image URLs after uploads, so the form can pick them up.
  images?: Pick<SiteData, "logo_url" | "about_image_url">;
};

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp" };

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string,
  file: FormDataEntryValue | null,
  name: string,
): Promise<string | null | { error: string }> {
  if (!(file instanceof File) || file.size === 0) return null;
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return { error: "אפשר להעלות רק תמונות PNG, JPG או WEBP." };
  if (file.size > MAX_IMAGE_BYTES) return { error: "התמונה גדולה מדי (עד 2MB)." };

  const path = `${userId}/${name}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage
    .from("therapist-assets")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { error: "העלאת התמונה נכשלה." };
  return supabase.storage.from("therapist-assets").getPublicUrl(path).data.publicUrl;
}

export async function saveSite(_: SaveState, formData: FormData): Promise<SaveState> {
  const { supabase, userId } = await requireUser();

  let site: SiteData;
  try {
    const parsed = siteSchema.safeParse(JSON.parse(String(formData.get("site") ?? "{}")));
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return { error: `שדה לא תקין (${issue.path.join(" › ")}): ${issue.message}` };
    }
    site = parsed.data;
  } catch {
    return { error: "הנתונים לא נקראו. רעננו את הדף ונסו שוב." };
  }

  const slug = slugSchema.safeParse(formData.get("slug"));
  if (!slug.success) return { error: `כתובת האתר: ${slug.error.issues[0].message}` };

  for (const [field, name] of [
    ["logo_file", "logo"],
    ["about_image_file", "about"],
  ] as const) {
    const url = await uploadImage(supabase, userId, formData.get(field), name);
    if (url && typeof url === "object") return url;
    if (url) site[field === "logo_file" ? "logo_url" : "about_image_url"] = url;
  }
  if (formData.get("reset_logo") === "1") site.logo_url = DEFAULT_IMAGE;
  if (formData.get("reset_about_image") === "1") site.about_image_url = DEFAULT_IMAGE;

  const { data: existing } = await supabase.from("therapists").select("slug").eq("user_id", userId).maybeSingle();

  const row = { ...site, slug: slug.data, user_id: userId };
  const { error } = existing
    ? await supabase.from("therapists").update(row).eq("user_id", userId)
    : await supabase.from("therapists").insert(row);

  if (error) {
    if (error.code === "23505" && error.message.includes("slug")) {
      return { error: "הכתובת הזו כבר תפוסה. בחרו כתובת אחרת." };
    }
    console.error("Saving site failed", error);
    return { error: "השמירה נכשלה. נסו שוב." };
  }

  updateTag(siteTag(slug.data));
  if (existing && existing.slug !== slug.data) updateTag(siteTag(existing.slug));
  return { saved: true, slug: slug.data, images: { logo_url: site.logo_url, about_image_url: site.about_image_url } };
}

// --- Publish / unpublish ----------------------------------------------------

export async function setPublished(published: boolean): Promise<{ error?: string }> {
  const { supabase, userId } = await requireUser();
  const { data, error } = await supabase
    .from("therapists")
    .update({ published })
    .eq("user_id", userId)
    .select("slug")
    .maybeSingle();
  if (error || !data) return { error: "העדכון נכשל. שמרו את האתר קודם ונסו שוב." };
  updateTag(siteTag(data.slug));
  return {};
}

// --- Leads ------------------------------------------------------------------

export async function deleteLead(id: string): Promise<void> {
  const { supabase } = await requireUser();
  await supabase.from("leads").delete().eq("id", z.uuid().parse(id));
}
