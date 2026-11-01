import Link from "next/link";
import { CLINIC_NAME } from "@/data/content";

export function Footer() {
  return (
    <footer className="mt-auto bg-brand text-white">
      <div className="bg-brand-yellow px-4 py-2 text-center text-sm font-medium text-ink">
        אתר הדגמה לצורכי לימוד, כל הנתונים בדויים. לא לשימוש עם נתוני מטופלים אמיתיים.
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-lg font-bold">{CLINIC_NAME}</p>
        <nav aria-label="קישורים בתחתית העמוד" className="flex gap-6 text-base">
          <Link href="/book" className="underline-offset-4 hover:underline">
            קביעת תור
          </Link>
          <Link href="/login" className="underline-offset-4 hover:underline">
            כניסה למערכת
          </Link>
        </nav>
      </div>
    </footer>
  );
}
