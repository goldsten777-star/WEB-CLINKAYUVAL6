import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { therapistLinks } from "@/components/site-links";
import { SitePage } from "@/components/SitePage";
import { DEMO_SLUG, getPublishedSite } from "@/lib/sites";
import { Contact } from "./Contact";

type Props = { params: Promise<{ slug: string }> };

// Prerender the demo; every other address renders on first visit and
// stays cached until the owner saves.
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

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const { slug } = await params;
  const site = await getPublishedSite(slug);
  return { themeColor: site?.color_background ?? "#fff8f0" };
}

export default async function TherapistPage({ params }: Props) {
  const { slug } = await params;
  const site = await getPublishedSite(slug);
  if (!site) notFound();

  return <SitePage site={site} links={therapistLinks(slug)} contact={<Contact site={site} slug={slug} />} />;
}
