import { z } from "zod";

// One schema for every editable part of a therapist site.
// Used by the components, the database row, the Gemini output and the edit form.

export const SERVICE_ICONS = ["heart", "people", "compass"] as const;
export const TONES = ["mint", "peach", "sky", "lavender", "butter"] as const;

export const RESERVED_SLUGS = [
  "api",
  "auth",
  "book",
  "dashboard",
  "login",
  "logout",
  "signup",
  "admin",
  "_next",
  "public",
  "static",
  "icon.svg",
  "logo.webp",
] as const;

const text = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) => z.string().trim().max(max).default("");
const hexColor = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^#[0-9a-f]{6}$/, "צבע בפורמט ‎#rrggbb");
const imageUrl = z
  .string()
  .trim()
  .max(500)
  .regex(/^(\/[\w./-]+|https:\/\/\S+)$/, "כתובת תמונה לא תקינה");
const phone = z
  .string()
  .trim()
  .max(20)
  .regex(/^[\d+\-\s()]*$/, "מספר טלפון לא תקין")
  .default("");

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9-]{3,40}$/, "3 עד 40 תווים: אותיות באנגלית, ספרות ומקף")
  .refine((s) => !(RESERVED_SLUGS as readonly string[]).includes(s), "הכתובת הזו שמורה");

export const serviceSchema = z.object({
  title: text(40),
  text: text(220),
  icon: z.enum(SERVICE_ICONS),
  tone: z.enum(TONES),
});

export const testimonialSchema = z.object({
  name: text(30),
  role: text(50),
  text: text(300),
});

// The fields Gemini fills and the therapist edits.
export const siteContentSchema = z.object({
  therapist_name: text(40),
  clinic_name: text(60),
  tagline: text(80),
  meta_description: text(200),

  hero_title: text(60),
  hero_subtitle: text(200),
  cta_label: text(24),

  services_title: text(60),
  services_subtitle: text(200),
  services: z.array(serviceSchema).min(1).max(4),

  about_title: text(60),
  about_paragraphs: z.array(text(600)).min(1).max(2),
  values: z.array(text(30)).min(1).max(4),
  about_image_alt: text(150),

  testimonials_title: text(60),
  testimonials: z.array(testimonialSchema).max(6),

  color_brand: hexColor,
  color_cta: hexColor,
  color_background: hexColor,
});

// Fields the therapist sets by hand (not generated).
export const siteExtrasSchema = z.object({
  logo_url: imageUrl,
  about_image_url: imageUrl,
  phone,
  whatsapp: phone,
  email: z.union([z.literal(""), z.email("כתובת מייל לא תקינה").max(120)]).default(""),
  area: optionalText(60),
});

export const siteSchema = siteContentSchema.extend(siteExtrasSchema.shape);

export type SiteContent = z.infer<typeof siteContentSchema>;
export type SiteData = z.infer<typeof siteSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type ServiceIcon = (typeof SERVICE_ICONS)[number];
export type Tone = (typeof TONES)[number];

export const DEFAULT_IMAGE = "/logo.webp";
