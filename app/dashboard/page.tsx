import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Card, NotConfigured, PageTitle } from "@/components/platform/ui";
import { getMySite } from "@/lib/sites";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { PublishToggle } from "./PublishToggle";
import { SiteEditor } from "./SiteEditor";
import { siteOrigin } from "./request";

export default function DashboardPage() {
  if (!isSupabaseConfigured()) return <NotConfigured />;
  return (
    <Suspense fallback={<p className="text-lg text-ink-soft">טוען את האתר...</p>}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const mine = await getMySite();
  if (!mine) redirect("/dashboard/new");
  const origin = await siteOrigin();
  const url = `${origin}/${mine.slug}`;

  return (
    <>
      <PageTitle title={`שלום ${mine.site.therapist_name}`} text="כאן עורכים את האתר ומפרסמים אותו." />

      <Card className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-base text-ink-soft">{mine.published ? "האתר באוויר:" : "האתר עוד לא פורסם. הכתובת שלו תהיה:"}</p>
          <p className="mt-1 text-lg font-semibold text-brand" dir="ltr">
            {mine.published ? (
              <a href={url} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                {url}
              </a>
            ) : (
              url
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/new"
            className="inline-flex min-h-12 items-center rounded-full border-2 border-brand/30 bg-white px-5 text-base font-semibold text-brand hover:bg-sky/40"
          >
            יצירה מחדש עם Gemini
          </Link>
          <PublishToggle published={mine.published} />
        </div>
      </Card>

      <SiteEditor initialSite={mine.site} initialSlug={mine.slug} isNew={false} origin={origin} />
    </>
  );
}
