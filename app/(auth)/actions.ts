"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string; email?: string };

const credentials = z.object({
  email: z.email("כתובת מייל לא תקינה"),
  password: z.string().min(8, "סיסמה של 8 תווים לפחות"),
});

function readCredentials(formData: FormData) {
  return credentials.safeParse({
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  });
}

export async function signUp(_: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: "המערכת עוד לא מחוברת למסד נתונים." };
  const parsed = readCredentials(formData);
  if (!parsed.success) return { error: parsed.error.issues[0].message, email: String(formData.get("email") ?? "") };

  const origin = (await headers()).get("origin") ?? "";
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    ...parsed.data,
    options: { emailRedirectTo: `${origin}/auth/callback?next=/dashboard/new` },
  });
  if (error) return { error: translateAuthError(error.message), email: parsed.data.email };

  // With email confirmation on, there is no session yet.
  if (!data.session) {
    return { message: "שלחנו לך מייל עם קישור לאישור החשבון. אחרי האישור אפשר להמשיך ליצירת האתר." };
  }
  redirect("/dashboard/new");
}

export async function signIn(_: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return { error: "המערכת עוד לא מחוברת למסד נתונים." };
  const parsed = readCredentials(formData);
  if (!parsed.success) return { error: "מייל או סיסמה לא נכונים.", email: String(formData.get("email") ?? "") };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: translateAuthError(error.message), email: parsed.data.email };
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}

function translateAuthError(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "מייל או סיסמה לא נכונים.";
  if (m.includes("email not confirmed")) return "צריך לאשר קודם את המייל (בדקו את תיבת הדואר).";
  if (m.includes("already registered")) return "המייל הזה כבר רשום. אפשר להתחבר.";
  if (m.includes("rate limit")) return "יותר מדי ניסיונות. נסו שוב בעוד כמה דקות.";
  if (m.includes("password")) return "הסיסמה חלשה מדי. נסו סיסמה ארוכה יותר.";
  return "משהו השתבש. נסו שוב.";
}
