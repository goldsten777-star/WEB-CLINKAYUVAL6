import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "קביעת תור | חנוך המטפל (הדגמה)" };

export default function BookPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          title="קביעת תור"
          text="מערכת קביעת התורים תיבנה בשלב הבא של הפרויקט (יומן, זמינות ואישור תור)."
        />
      </main>
      <Footer />
    </>
  );
}
