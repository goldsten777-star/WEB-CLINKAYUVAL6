import { DEMO_SITE } from "@/data/content";
import { DEMO_LINKS } from "@/components/site-links";
import { SitePage } from "@/components/SitePage";

export default function Home() {
  return <SitePage site={DEMO_SITE} links={DEMO_LINKS} />;
}
