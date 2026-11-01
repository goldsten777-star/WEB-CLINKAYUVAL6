import { redirect } from "next/navigation";
import { Suspense } from "react";
import { NotConfigured } from "@/components/platform/ui";
import { therapistLinks } from "@/components/site-links";
import { SitePage } from "@/components/SitePage";
import { getMySite } from "@/lib/sites";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { Contact } from "@/app/[slug]/Contact";

export default function PreviewPage() {
  if (!isSupabaseConfigured()) return <NotConfigured />;
  return (
    <Suspense fallback={<p className="text-lg text-ink-soft">טוען תצוגה מקדימה...</p>}>
      <Preview />
    </Suspense>
  );
}

// The saved version of the owner's site, published or not.
async function Preview() {
  const mine = await getMySite();
  if (!mine) redirect("/dashboard/new");
  return (
    <div className="-mx-4 -my-10 overflow-hidden rounded-card shadow-soft">
      <p className="bg-ink px-4 py-2 text-center text-sm text-white">
        תצוגה מקדימה{mine.published ? "" : " (האתר עוד לא פורסם)"}. טופס הפנייה לא שולח כאן.
      </p>
      <SitePage site={mine.site} links={therapistLinks(mine.slug)} contact={<Contact site={mine.site} slug={mine.slug} preview />} />
    </div>
  );
}
