import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PlatformHeader } from "@/components/platform/ui";
import { signOut } from "../(auth)/actions";

export const metadata: Metadata = { title: "לוח בקרה | בונה האתרים למטפלים" };

const NAV = [
  { href: "/dashboard", label: "האתר שלי" },
  { href: "/dashboard/leads", label: "פניות" },
  { href: "/dashboard/preview", label: "תצוגה מקדימה" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PlatformHeader>
        <nav aria-label="ניווט לוח הבקרה" className="flex items-center gap-1 sm:gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-base font-medium text-ink hover:bg-white hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
          <form action={signOut}>
            <button type="submit" className="min-h-11 cursor-pointer rounded-full px-3 text-base text-ink-soft hover:bg-white">
              יציאה
            </button>
          </form>
        </nav>
      </PlatformHeader>
      <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        {children}
      </main>
    </>
  );
}
