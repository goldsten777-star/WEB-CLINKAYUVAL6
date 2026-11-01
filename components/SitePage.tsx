import type { ReactNode } from "react";
import type { SiteData } from "@/lib/site";
import { themeStyle } from "@/lib/theme";
import type { SiteLinks } from "@/components/site-links";
import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/sections/Footer";

// Applies a site's colors to everything inside it.
export function SiteTheme({ site, children }: { site: SiteData; children: ReactNode }) {
  return (
    <div style={themeStyle(site)} className="flex flex-1 flex-col bg-cream text-ink">
      {children}
    </div>
  );
}

// A full therapist site. `contact` is the extra section shown on therapist pages.
export function SitePage({
  site,
  links,
  contact,
}: {
  site: SiteData;
  links: SiteLinks;
  contact?: ReactNode;
}) {
  return (
    <SiteTheme site={site}>
      <Header site={site} links={links} />
      <main id="main">
        <Hero site={site} links={links} />
        <Services site={site} links={links} />
        <About site={site} />
        <Testimonials site={site} />
        {contact}
      </main>
      <Footer site={site} links={links} />
    </SiteTheme>
  );
}
