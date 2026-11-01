import Link from "next/link";
import type { SiteData } from "@/lib/site";
import { SiteImage } from "@/components/SiteImage";
import { type SiteLinks, sectionHref } from "@/components/site-links";

export function Header({ site, links }: { site: SiteData; links: SiteLinks }) {
  const nav = [
    { id: "services", label: "שירותים" },
    { id: "about", label: "אודות" },
    ...(site.testimonials.length > 0 ? [{ id: "testimonials", label: "המלצות" }] : []),
    ...(links.showContact ? [{ id: "contact", label: "צור קשר" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 h-[4.5rem] bg-cream/95 shadow-[0_1px_0_rgb(47_58_74/0.06)]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href={links.home} className="flex items-center gap-2" aria-label={`${site.clinic_name}, לדף הבית`}>
          <SiteImage
            src={site.logo_url}
            alt=""
            width={56}
            height={56}
            priority
            className="h-14 w-14 object-contain mix-blend-multiply"
          />
          <span className="hidden text-xl font-bold text-brand sm:inline">{site.clinic_name}</span>
        </Link>

        <nav aria-label="ניווט ראשי" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={sectionHref(links, item.id)}
              className="text-base font-medium text-ink transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {links.showLogin && (
            <Link
              href="/login"
              className="hidden min-h-11 items-center rounded-full px-4 text-sm font-medium text-brand hover:bg-white sm:inline-flex"
            >
              כניסה
            </Link>
          )}
          <Link
            href={links.cta}
            className="inline-flex min-h-11 items-center rounded-full bg-cta px-5 text-base font-semibold text-on-cta transition-colors hover:bg-cta-hover"
          >
            {site.cta_label}
          </Link>
        </div>
      </div>
    </header>
  );
}
