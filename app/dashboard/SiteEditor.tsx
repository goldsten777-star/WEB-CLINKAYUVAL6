"use client";

import Link from "next/link";
import { useActionState, useState, type ReactNode } from "react";
import {
  DEFAULT_IMAGE,
  SERVICE_ICONS,
  TONES,
  type Service,
  type SiteData,
  type Testimonial,
} from "@/lib/site";
import { Alert, Button, Card, Input, Label, Select, Textarea } from "@/components/platform/ui";
import { type SaveState, saveSite } from "./actions";

const ICON_LABELS: Record<(typeof SERVICE_ICONS)[number], string> = {
  heart: "לב",
  people: "אנשים",
  compass: "מצפן",
};
const TONE_LABELS: Record<(typeof TONES)[number], string> = {
  mint: "מנטה",
  peach: "אפרסק",
  sky: "תכלת",
  lavender: "לבנדר",
  butter: "חמאה",
};
const TONE_SWATCH: Record<(typeof TONES)[number], string> = {
  mint: "bg-mint",
  peach: "bg-peach",
  sky: "bg-sky",
  lavender: "bg-lavender",
  butter: "bg-butter",
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <fieldset className="space-y-5">
        <legend className="mb-2 text-2xl font-bold text-brand">{title}</legend>
        {children}
      </fieldset>
    </Card>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  max,
  multiline,
  hint,
  dir,
  required = true,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  max: number;
  multiline?: boolean;
  hint?: string;
  dir?: "ltr";
  required?: boolean;
}) {
  const counter = `${value.length}/${max}`;
  return (
    <div>
      <Label htmlFor={id} hint={hint ?? counter}>
        {label}
      </Label>
      {multiline ? (
        <Textarea id={id} value={value} maxLength={max} rows={3} required={required} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input id={id} value={value} maxLength={max} dir={dir} required={required} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function ImageField({
  id,
  label,
  current,
  fileName,
  resetName,
}: {
  id: string;
  label: string;
  current: string;
  fileName: string;
  resetName: string;
}) {
  const [reset, setReset] = useState(false);
  return (
    <div>
      <Label htmlFor={id} hint="PNG, JPG או WEBP, עד 2MB">
        {label}
      </Label>
      <div className="flex flex-wrap items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reset ? DEFAULT_IMAGE : current}
          alt=""
          className="h-20 w-20 rounded-2xl bg-cream object-contain p-1 shadow-sm"
        />
        <input
          id={id}
          name={fileName}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="text-base text-ink file:me-3 file:min-h-11 file:cursor-pointer file:rounded-full file:border-0 file:bg-sky file:px-4 file:font-medium file:text-brand"
        />
        {current !== DEFAULT_IMAGE && (
          <label className="flex items-center gap-2 text-base text-ink-soft">
            <input type="checkbox" name={resetName} value="1" checked={reset} onChange={(e) => setReset(e.target.checked)} />
            חזרה לאיור ברירת המחדל
          </label>
        )}
      </div>
    </div>
  );
}

function ColorField({ id, label, hint, value, onChange }: { id: string; label: string; hint: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-16 cursor-pointer rounded-xl border-2 border-ink/15 bg-white p-1"
        />
        <Input
          aria-label={`${label} (קוד)`}
          value={value}
          dir="ltr"
          maxLength={7}
          pattern="#[0-9a-fA-F]{6}"
          className="max-w-36 font-mono"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export function SiteEditor({
  initialSite,
  initialSlug,
  isNew,
  origin,
}: {
  initialSite: SiteData;
  initialSlug: string;
  isNew: boolean;
  origin: string;
}) {
  const [site, setSite] = useState<SiteData>(initialSite);
  const [slug, setSlug] = useState(initialSlug);
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveSite, {});

  // After a save, take the uploaded image URLs into the form state.
  const [handled, setHandled] = useState(state);
  if (state !== handled) {
    setHandled(state);
    if (state.images) setSite((s) => ({ ...s, ...state.images }));
  }

  const set = <K extends keyof SiteData>(key: K, value: SiteData[K]) => setSite((s) => ({ ...s, [key]: value }));

  const setService = (i: number, patch: Partial<Service>) =>
    set("services", site.services.map((s, j) => (j === i ? { ...s, ...patch } : s)));
  const setTestimonial = (i: number, patch: Partial<Testimonial>) =>
    set("testimonials", site.testimonials.map((t, j) => (j === i ? { ...t, ...patch } : t)));
  const setListItem = (key: "about_paragraphs" | "values", i: number, value: string) =>
    set(key, site[key].map((v, j) => (j === i ? value : v)));
  const removeAt = <K extends "services" | "testimonials" | "about_paragraphs" | "values">(key: K, i: number) =>
    set(key, site[key].filter((_, j) => j !== i) as SiteData[K]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="site" value={JSON.stringify(site)} />

      <Section title="כתובת האתר">
        <div>
          <Label htmlFor="slug" hint="אותיות באנגלית, ספרות ומקף">
            הכתובת
          </Label>
          <div className="flex items-center gap-2" dir="ltr">
            <span className="text-base text-ink-soft">{origin}/</span>
            <Input
              id="slug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase())}
              pattern="[a-z0-9\-]{3,40}"
              required
              className="max-w-xs"
            />
          </div>
        </div>
      </Section>

      <Section title="פרטים כלליים">
        <div className="grid gap-5 md:grid-cols-2">
          <TextField id="therapist_name" label="שם פרטי" value={site.therapist_name} max={40} onChange={(v) => set("therapist_name", v)} />
          <TextField id="clinic_name" label="שם הקליניקה (בכותרת העליונה)" value={site.clinic_name} max={60} onChange={(v) => set("clinic_name", v)} />
        </div>
        <TextField id="tagline" label="תיאור קצר (בלשונית הדפדפן)" value={site.tagline} max={80} onChange={(v) => set("tagline", v)} />
        <TextField id="meta_description" label="תיאור לגוגל" value={site.meta_description} max={200} multiline onChange={(v) => set("meta_description", v)} />
        <ImageField key={site.logo_url} id="logo_file" label="לוגו" current={site.logo_url} fileName="logo_file" resetName="reset_logo" />
      </Section>

      <Section title="פתיח">
        <TextField id="hero_title" label="כותרת ראשית" value={site.hero_title} max={60} onChange={(v) => set("hero_title", v)} />
        <TextField id="hero_subtitle" label="משפט משנה" value={site.hero_subtitle} max={200} multiline onChange={(v) => set("hero_subtitle", v)} />
        <TextField id="cta_label" label="טקסט הכפתור" value={site.cta_label} max={24} onChange={(v) => set("cta_label", v)} />
      </Section>

      <Section title="שירותים">
        <TextField id="services_title" label="כותרת" value={site.services_title} max={60} onChange={(v) => set("services_title", v)} />
        <TextField id="services_subtitle" label="משפט פתיחה" value={site.services_subtitle} max={200} onChange={(v) => set("services_subtitle", v)} />
        {site.services.map((s, i) => (
          <div key={i} className={`space-y-4 rounded-2xl p-5 ${TONE_SWATCH[s.tone]}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">שירות {i + 1}</h3>
              {site.services.length > 1 && (
                <Button type="button" variant="ghost" onClick={() => removeAt("services", i)}>
                  הסרה
                </Button>
              )}
            </div>
            <TextField id={`service-${i}-title`} label="שם השירות" value={s.title} max={40} onChange={(v) => setService(i, { title: v })} />
            <TextField id={`service-${i}-text`} label="תיאור" value={s.text} max={220} multiline onChange={(v) => setService(i, { text: v })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={`service-${i}-icon`}>אייקון</Label>
                <Select id={`service-${i}-icon`} value={s.icon} onChange={(e) => setService(i, { icon: e.target.value as Service["icon"] })}>
                  {SERVICE_ICONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {ICON_LABELS[icon]}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor={`service-${i}-tone`}>צבע הכרטיס</Label>
                <Select id={`service-${i}-tone`} value={s.tone} onChange={(e) => setService(i, { tone: e.target.value as Service["tone"] })}>
                  {TONES.map((tone) => (
                    <option key={tone} value={tone}>
                      {TONE_LABELS[tone]}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        ))}
        {site.services.length < 4 && (
          <Button
            type="button"
            variant="secondary"
            onClick={() => set("services", [...site.services, { title: "", text: "", icon: "heart", tone: TONES[site.services.length % TONES.length] }])}
          >
            + הוספת שירות
          </Button>
        )}
      </Section>

      <Section title="אודות">
        <TextField id="about_title" label="כותרת" value={site.about_title} max={60} onChange={(v) => set("about_title", v)} />
        {site.about_paragraphs.map((p, i) => (
          <div key={i} className="space-y-2">
            <TextField id={`about-${i}`} label={`פסקה ${i + 1}`} value={p} max={600} multiline onChange={(v) => setListItem("about_paragraphs", i, v)} />
            {site.about_paragraphs.length > 1 && (
              <Button type="button" variant="ghost" onClick={() => removeAt("about_paragraphs", i)}>
                הסרת הפסקה
              </Button>
            )}
          </div>
        ))}
        {site.about_paragraphs.length < 2 && (
          <Button type="button" variant="secondary" onClick={() => set("about_paragraphs", [...site.about_paragraphs, ""])}>
            + הוספת פסקה
          </Button>
        )}

        <div>
          <p className="mb-2 text-base font-medium text-ink">עקרונות הגישה (עד 4)</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {site.values.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input aria-label={`עיקרון ${i + 1}`} value={v} maxLength={30} required onChange={(e) => setListItem("values", i, e.target.value)} />
                {site.values.length > 1 && (
                  <Button type="button" variant="ghost" aria-label={`הסרת עיקרון ${i + 1}`} onClick={() => removeAt("values", i)}>
                    ✕
                  </Button>
                )}
              </div>
            ))}
          </div>
          {site.values.length < 4 && (
            <Button type="button" variant="secondary" className="mt-3" onClick={() => set("values", [...site.values, ""])}>
              + הוספת עיקרון
            </Button>
          )}
        </div>

        <ImageField key={site.about_image_url} id="about_image_file" label="תמונה" current={site.about_image_url} fileName="about_image_file" resetName="reset_about_image" />
        <TextField id="about_image_alt" label="תיאור התמונה (לקוראי מסך)" value={site.about_image_alt} max={150} onChange={(v) => set("about_image_alt", v)} />
      </Section>

      <Section title="המלצות">
        <Alert tone="info">ההמלצות מסומנות באתר כ&quot;המלצה לדוגמה&quot;. אפשר להחליף אותן בהמלצות אמיתיות (באישור הכותבים) או למחוק.</Alert>
        <TextField id="testimonials_title" label="כותרת" value={site.testimonials_title} max={60} onChange={(v) => set("testimonials_title", v)} />
        {site.testimonials.map((t, i) => (
          <div key={i} className="space-y-4 rounded-2xl bg-lavender/60 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">המלצה {i + 1}</h3>
              <Button type="button" variant="ghost" onClick={() => removeAt("testimonials", i)}>
                הסרה
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField id={`t-${i}-name`} label="שם" value={t.name} max={30} onChange={(v) => setTestimonial(i, { name: v })} />
              <TextField id={`t-${i}-role`} label="מי זה" hint="למשל: אמא של נועם" value={t.role} max={50} onChange={(v) => setTestimonial(i, { role: v })} />
            </div>
            <TextField id={`t-${i}-text`} label="ההמלצה" value={t.text} max={300} multiline onChange={(v) => setTestimonial(i, { text: v })} />
          </div>
        ))}
        {site.testimonials.length < 6 && (
          <Button type="button" variant="secondary" onClick={() => set("testimonials", [...site.testimonials, { name: "", role: "", text: "" }])}>
            + הוספת המלצה
          </Button>
        )}
      </Section>

      <Section title="צבעים">
        <div className="grid gap-5 md:grid-cols-3">
          <ColorField id="color_brand" label="צבע ראשי" hint="כותרות ותחתית" value={site.color_brand} onChange={(v) => set("color_brand", v)} />
          <ColorField id="color_cta" label="צבע הכפתורים" hint="קבעו תור" value={site.color_cta} onChange={(v) => set("color_cta", v)} />
          <ColorField id="color_background" label="צבע הרקע" hint="בהיר מאוד" value={site.color_background} onChange={(v) => set("color_background", v)} />
        </div>
      </Section>

      <Section title="פרטי קשר">
        <p className="text-base text-ink-soft">מופיעים באתר ליד טופס הפנייה. כל השדות לא חובה.</p>
        <div className="grid gap-5 md:grid-cols-2">
          <TextField id="phone" label="טלפון" value={site.phone} max={20} dir="ltr" required={false} hint="" onChange={(v) => set("phone", v)} />
          <TextField id="whatsapp" label="וואטסאפ" value={site.whatsapp} max={20} dir="ltr" required={false} hint="" onChange={(v) => set("whatsapp", v)} />
          <TextField id="email" label="מייל" value={site.email} max={120} dir="ltr" required={false} hint="" onChange={(v) => set("email", v)} />
          <TextField id="area" label="אזור / עיר" value={site.area} max={60} required={false} hint="" onChange={(v) => set("area", v)} />
        </div>
      </Section>

      <div className="sticky bottom-0 z-40 -mx-4 flex flex-wrap items-center gap-4 border-t border-ink/10 bg-cream/95 px-4 py-4">
        <Button type="submit" disabled={pending}>
          {pending ? "שומר..." : isNew ? "שמירה ויצירת האתר" : "שמירת השינויים"}
        </Button>
        {state.saved && !pending && (
          <span role="status" className="text-base text-ink">
            נשמר.{" "}
            <Link href="/dashboard/preview" className="font-semibold text-brand underline-offset-4 hover:underline">
              לתצוגה מקדימה
            </Link>
            {isNew && (
              <>
                {" · "}
                <Link href="/dashboard" className="font-semibold text-brand underline-offset-4 hover:underline">
                  ללוח הבקרה ולפרסום
                </Link>
              </>
            )}
          </span>
        )}
        {state.error && !pending && <Alert>{state.error}</Alert>}
      </div>
    </form>
  );
}
