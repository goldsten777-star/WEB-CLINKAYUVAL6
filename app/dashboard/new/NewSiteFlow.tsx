"use client";

import { useActionState, useState } from "react";
import { DEMO_SITE } from "@/data/content";
import { DEFAULT_ABOUT_ALT, DEFAULT_ABOUT_IMAGE, DEFAULT_LOGO, type SiteData } from "@/lib/site";
import { slugify } from "@/lib/slugify";
import { Alert, Button, Card, Label, Textarea } from "@/components/platform/ui";
import { type GenerateState, generateSite } from "../actions";
import { SiteEditor } from "../SiteEditor";

const EXAMPLE =
  "אני דנה, מטפלת רגשית בהבעה ויצירה לילדים בגילאי 5 עד 12 בקריית אונו. אני עובדת דרך ציור, חימר ומשחק, ומלווה גם את ההורים בהדרכה.";

type Images = Pick<SiteData, "logo_url" | "about_image_url">;
type Contact = Pick<SiteData, "phone" | "whatsapp" | "email" | "area">;

export function NewSiteFlow({
  geminiReady,
  existingSlug,
  existingImages,
  existingContact,
  origin,
}: {
  geminiReady: boolean;
  existingSlug?: string;
  existingImages?: Images;
  existingContact?: Contact;
  origin: string;
}) {
  const [state, formAction, pending] = useActionState<GenerateState, FormData>(generateSite, {});
  const [manual, setManual] = useState(false);

  // Generated (or demo) content goes into the editor, keeping the
  // therapist's own images, contact details and address if they have a site.
  const base: SiteData = {
    ...DEMO_SITE,
    logo_url: DEFAULT_LOGO,
    about_image_url: DEFAULT_ABOUT_IMAGE,
    about_image_alt: DEFAULT_ABOUT_ALT,
    ...existingImages,
    ...existingContact,
  };
  if (state.content || manual) {
    const site: SiteData = { ...base, ...(state.content ?? {}) };
    return (
      <div className="space-y-6">
        <Alert tone="success">
          {state.content ? "האתר מוכן. עברו על הטקסטים, תקנו מה שצריך ושמרו." : "מתחילים מאתר ההדגמה. ערכו ושמרו."}
        </Alert>
        <SiteEditor
          initialSite={site}
          initialSlug={existingSlug ?? slugify(site.therapist_name)}
          isNew={!existingSlug}
          origin={origin}
        />
      </div>
    );
  }

  return (
    <Card>
      <form action={formAction} className="space-y-5">
        {existingSlug && (
          <Alert tone="info">
            כבר יש לך אתר. יצירה מחדש תחליף את הטקסטים והצבעים אחרי שתשמרו. התמונות, פרטי הקשר והכתובת יישארו.
          </Alert>
        )}
        <div>
          <Label htmlFor="description" hint="עד 800 תווים">
            על עצמי
          </Label>
          <Textarea
            id="description"
            name="description"
            rows={5}
            maxLength={800}
            required
            defaultValue={state.description}
            placeholder={EXAMPLE}
          />
        </div>

        {!geminiReady && <Alert tone="info">Gemini עוד לא מחובר בשרת (חסר GEMINI_API_KEY). אפשר להתחיל מאתר ההדגמה ולערוך ידנית.</Alert>}
        {state.error && <Alert>{state.error}</Alert>}

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={pending || !geminiReady}>
            {pending ? "כותבים לך אתר... (כ-20 שניות)" : "צרו לי אתר"}
          </Button>
          <Button type="button" variant="ghost" disabled={pending} onClick={() => setManual(true)}>
            או התחילו מאתר ההדגמה
          </Button>
        </div>
      </form>
    </Card>
  );
}
