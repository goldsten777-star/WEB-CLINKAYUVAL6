import type { SiteData } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "./LeadForm";

function whatsappLink(number: string) {
  let digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = `972${digits.slice(1)}`;
  return `https://wa.me/${digits}`;
}

// "Contact" section on a therapist's page: details + lead form.
export function Contact({ site, slug, preview }: { site: SiteData; slug: string; preview?: boolean }) {
  const details = [
    site.phone && { label: "טלפון", value: site.phone, href: `tel:${site.phone.replace(/[^\d+]/g, "")}`, ltr: true },
    site.whatsapp && { label: "וואטסאפ", value: "שליחת הודעה", href: whatsappLink(site.whatsapp) },
    site.email && { label: "מייל", value: site.email, href: `mailto:${site.email}`, ltr: true },
    site.area && { label: "אזור", value: site.area },
  ].filter(Boolean) as { label: string; value: string; href?: string; ltr?: boolean }[];

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-sky/40 px-4 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <h2 id="contact-title" className="text-3xl font-bold text-brand md:text-4xl">
            {site.cta_label}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            השאירו פרטים ונחזור אליכם לשיחת היכרות קצרה.
          </p>
          {details.length > 0 && (
            <dl className="mt-8 space-y-4">
              {details.map((d) => (
                <div key={d.label} className="flex flex-wrap items-baseline gap-x-3">
                  <dt className="text-base font-medium text-ink-soft">{d.label}:</dt>
                  <dd className="text-lg font-semibold text-brand" dir={d.ltr ? "ltr" : undefined}>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="underline-offset-4 hover:underline"
                        {...(d.href.startsWith("https") ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {d.value}
                      </a>
                    ) : (
                      d.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
        <Reveal delay={0.1} className="relative rounded-card bg-white p-6 shadow-soft md:p-8">
          <LeadForm slug={slug} ctaLabel={site.cta_label} preview={preview} />
        </Reveal>
      </div>
    </section>
  );
}
