import { Suspense } from "react";
import { NotConfigured, PageTitle } from "@/components/platform/ui";
import { isGeminiConfigured } from "@/lib/gemini";
import { getMySite } from "@/lib/sites";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { siteOrigin } from "../request";
import { NewSiteFlow } from "./NewSiteFlow";

// Generating a site with Gemini can take a while.
export const maxDuration = 60;

export default function NewSitePage() {
  if (!isSupabaseConfigured()) return <NotConfigured />;
  return (
    <>
      <PageTitle
        title="ספרו על עצמכם בשני משפטים"
        text="מי אתם, במה אתם מטפלים ועם מי אתם עובדים. Gemini יכתוב מזה את כל האתר, ואחר כך אפשר לערוך כל מילה."
      />
      <Suspense fallback={<p className="text-lg text-ink-soft">טוען...</p>}>
        <NewSite />
      </Suspense>
    </>
  );
}

async function NewSite() {
  const [mine, origin] = await Promise.all([getMySite(), siteOrigin()]);
  return (
    <NewSiteFlow
      geminiReady={isGeminiConfigured()}
      existingSlug={mine?.slug}
      existingImages={mine ? { logo_url: mine.site.logo_url, about_image_url: mine.site.about_image_url } : undefined}
      existingContact={
        mine ? { phone: mine.site.phone, whatsapp: mine.site.whatsapp, email: mine.site.email, area: mine.site.area } : undefined
      }
      origin={origin}
    />
  );
}
