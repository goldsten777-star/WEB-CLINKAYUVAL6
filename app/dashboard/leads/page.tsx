import Link from "next/link";
import { Suspense } from "react";
import { Card, NotConfigured, PageTitle } from "@/components/platform/ui";
import { getMySite } from "@/lib/sites";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteLeadButton } from "./DeleteLeadButton";

export default function LeadsPage() {
  if (!isSupabaseConfigured()) return <NotConfigured />;
  return (
    <>
      <PageTitle title="פניות" text="כל מי שהשאיר פרטים בטופס באתר שלך." />
      <Suspense fallback={<p className="text-lg text-ink-soft">טוען פניות...</p>}>
        <Leads />
      </Suspense>
    </>
  );
}

const dateFormat = new Intl.DateTimeFormat("he-IL", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Asia/Jerusalem",
});

async function Leads() {
  const mine = await getMySite();
  if (!mine) {
    return (
      <Card>
        <p className="text-lg">
          עוד אין לך אתר.{" "}
          <Link href="/dashboard/new" className="font-semibold text-brand underline-offset-4 hover:underline">
            ליצירת אתר
          </Link>
        </p>
      </Card>
    );
  }

  const supabase = await createSupabaseServerClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, name, phone, email, message, created_at")
    .eq("therapist_id", mine.id)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) throw new Error(`Loading leads failed: ${error.message}`);
  if (!leads?.length) {
    return (
      <Card>
        <p className="text-lg text-ink-soft">
          עוד אין פניות.{!mine.published && " האתר עוד לא פורסם, ולכן אי אפשר לשלוח בו פניות."}
        </p>
      </Card>
    );
  }

  return (
    <ul className="space-y-4">
      {leads.map((lead) => (
        <li key={lead.id}>
          <Card className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xl font-bold text-ink">{lead.name}</p>
              <p className="text-sm text-ink-soft">{dateFormat.format(new Date(lead.created_at))}</p>
            </div>
            <p className="flex flex-wrap gap-x-6 gap-y-1 text-base" dir="ltr">
              <a href={`tel:${lead.phone}`} className="font-medium text-brand underline-offset-4 hover:underline">
                {lead.phone}
              </a>
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="font-medium text-brand underline-offset-4 hover:underline">
                  {lead.email}
                </a>
              )}
            </p>
            {lead.message && <p className="whitespace-pre-line text-base text-ink-soft">{lead.message}</p>}
            <DeleteLeadButton id={lead.id} />
          </Card>
        </li>
      ))}
    </ul>
  );
}
