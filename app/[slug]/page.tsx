import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { therapistLinks } from "@/components/site-links";
import { SitePage } from "@/components/SitePage";
import { DEMO_SLUG, getPublishedSite } from "@/lib/sites";
import { Contact } from "./Contact";

type Props = { params: Promise<{ slug: string }> };

// Prerender the demo; every other address renders on first visit and
// stays cached until the owner saves or publishes.
export async function generateStaticParams() {
  return [{ slug: DEMO_SLUG }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await getPublishedSite(slug);
  if (!site) return { title: "האתר לא נמצא" };
  return {
    title: `${site.clinic_name} | ${site.tagline} (אתר הדגמה)`,
    description: site.meta_description,
    openGraph: { title: site.clinic_name, description: site.tagline, locale: "he_IL", type: "website" },
  };
}

export default function TherapistPage({ params }: Props) {
  // The address is read inside the boundary so the page shell can be
  // served instantly while the site loads.
  return (
    <Suspense fallback={<div aria-busy="true" className="min-h-svh flex-1 bg-cream" />}>
      <TherapistSite params={params} />
    </Suspense>
  );
}

async function TherapistSite({ params }: Props) {
  const { slug } = await params;
  const site = await getPublishedSite(slug);
  if (!site) notFound();

  return <SitePage site={site} links={therapistLinks(slug)} contact={<Contact site={site} slug={slug} />} />;
}
