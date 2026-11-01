"use server";

import { z } from "zod";
import { DEMO_SLUG, getPublishedSiteId } from "@/lib/sites";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export type LeadState = { ok?: boolean; error?: string; fields?: Record<string, string> };

const leadSchema = z.object({
  name: z.string().trim().min(1, "נא למלא שם").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[\d+\-\s()]{9,20}$/, "מספר טלפון לא תקין"),
  email: z.union([z.literal(""), z.email("כתובת מייל לא תקינה").max(120)]),
  message: z.string().trim().max(1000, "עד 1000 תווים"),
  consent: z.literal("on", { error: "צריך לאשר כדי שנוכל לחזור אליך" }),
});

// Forms sent faster than this are almost certainly bots.
const MIN_FILL_MS = 2500;

export async function sendLead(slug: string, _: LeadState, formData: FormData): Promise<LeadState> {
  const fields = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot and timing checks: pretend success so bots don't retry.
  const startedAt = Number(formData.get("started_at"));
  if (formData.get("website") || !startedAt || Date.now() - startedAt < MIN_FILL_MS) return { ok: true };

  const parsed = leadSchema.safeParse({ ...fields, consent: formData.get("consent") });
  if (!parsed.success) return { error: parsed.error.issues[0].message, fields };

  // The demo site has no database row; show the flow without saving.
  if (slug === DEMO_SLUG) return { ok: true };

  const therapistId = await getPublishedSiteId(slug);
  if (!therapistId) return { error: "האתר הזה לא מקבל פניות כרגע.", fields };

  const { name, phone, email, message } = parsed.data;
  const { error } = await createSupabasePublicClient()
    .from("leads")
    .insert({ therapist_id: therapistId, name, phone, email, message, consent: true });
  if (error) {
    console.error("Saving lead failed", error);
    return { error: "השליחה נכשלה. נסו שוב או התקשרו.", fields };
  }
  return { ok: true };
}
