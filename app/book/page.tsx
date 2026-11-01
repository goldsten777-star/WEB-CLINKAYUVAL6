import type { Metadata } from "next";
import { DEMO_SITE } from "@/data/content";
import { DEMO_LINKS } from "@/components/site-links";
import { SiteTheme } from "@/components/SitePage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "קביעת תור | חנוך המטפל (הדגמה)" };

export default function BookPage() {
  return (
    <SiteTheme site={DEMO_SITE}>
      <Header site={DEMO_SITE} links={DEMO_LINKS} />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          title="קביעת תור"
          text="מערכת קביעת התורים תיבנה בשלב הבא של הפרויקט (יומן, זמינות ואישור תור)."
        />
      </main>
      <Footer site={DEMO_SITE} links={DEMO_LINKS} />
    </SiteTheme>
  );
}
