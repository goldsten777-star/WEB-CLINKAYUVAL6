import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/sections/Footer";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "כניסה | חנוך המטפל (הדגמה)" };

export default function LoginPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          title="כניסה למערכת"
          text="בחירת תפקיד (הורה / חנוך) תיבנה בשלב הבא של הפרויקט."
        />
      </main>
      <Footer />
    </>
  );
}
