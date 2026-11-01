// Where the buttons on a site page lead.
export type SiteLinks = {
  home: string; // base path of the site ("/slug")
  cta: string; // target of every "book" button
  showContact: boolean; // therapist pages have a contact section
};

export function therapistLinks(slug: string): SiteLinks {
  return {
    home: `/${slug}`,
    cta: `/${slug}#contact`,
    showContact: true,
  };
}

export function sectionHref(links: SiteLinks, id: string) {
  return links.home === "/" ? `/#${id}` : `${links.home}#${id}`;
}
