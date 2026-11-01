import Link from "next/link";
import type { SiteData } from "@/lib/site";
import type { SiteLinks } from "@/components/site-links";

export function Footer({ site, links }: { site: SiteData; links: SiteLinks }) {
  return (
    <footer className="mt-auto bg-brand text-on-brand">
      <div className="bg-brand-yellow px-4 py-2 text-center text-sm font-medium text-ink">
        אתר הדגמה לצורכי לימוד, כל הנתונים בדויים. לא לשימוש עם נתוני מטופלים אמיתיים.
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-lg font-bold">{site.clinic_name}</p>
        <nav aria-label="קישורים בתחתית העמוד" className="flex gap-6 text-base">
          <Link href={links.cta} className="underline-offset-4 hover:underline">
            {site.cta_label}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
