import type { Metadata } from "next";
import { DEMO_SITE } from "@/data/content";
import { DEMO_LINKS } from "@/components/site-links";
import { SiteTheme } from "@/components/SitePage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "כניסה | חנוך המטפל (הדגמה)" };

export default function LoginPage() {
  return (
    <SiteTheme site={DEMO_SITE}>
      <Header site={DEMO_SITE} links={DEMO_LINKS} />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          title="כניסה למערכת"
          text="בחירת תפקיד (הורה / חנוך) תיבנה בשלב הבא של הפרויקט."
        />
      </main>
      <Footer site={DEMO_SITE} links={DEMO_LINKS} />
    </SiteTheme>
  );
}
