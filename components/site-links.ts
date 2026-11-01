// Where the buttons on a site page lead.
export type SiteLinks = {
  home: string; // base path of the site ("/" for the demo, "/slug" for a therapist)
  cta: string; // target of every "book" button
  showLogin: boolean; // the demo shows a link to the platform login
  showContact: boolean; // therapist pages have a contact section
};

export const DEMO_LINKS: SiteLinks = {
  home: "/",
  cta: "/book",
  showLogin: true,
  showContact: false,
};

export function therapistLinks(slug: string): SiteLinks {
  return {
    home: `/${slug}`,
    cta: `/${slug}#contact`,
    showLogin: false,
    showContact: true,
  };
}

export function sectionHref(links: SiteLinks, id: string) {
  return links.home === "/" ? `/#${id}` : `${links.home}#${id}`;
}
