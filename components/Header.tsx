import Image from "next/image";
import Link from "next/link";
import { CLINIC_NAME } from "@/data/content";

const NAV = [
  { href: "/#services", label: "שירותים" },
  { href: "/#about", label: "אודות" },
  { href: "/#testimonials", label: "המלצות" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-[4.5rem] bg-cream/95 shadow-[0_1px_0_rgb(47_58_74/0.06)]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${CLINIC_NAME}, לדף הבית`}>
          <Image
            src="/logo.webp"
            alt=""
            width={56}
            height={56}
            priority
            className="h-14 w-14 object-contain mix-blend-multiply"
          />
          <span className="hidden text-xl font-bold text-brand sm:inline">{CLINIC_NAME}</span>
        </Link>

        <nav aria-label="ניווט ראשי" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-ink transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden min-h-11 items-center rounded-full px-4 text-sm font-medium text-brand hover:bg-white sm:inline-flex"
          >
            כניסה
          </Link>
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center rounded-full bg-cta px-5 text-base font-semibold text-ink transition-colors hover:bg-cta-hover"
          >
            קבעו תור
          </Link>
        </div>
      </div>
    </header>
  );
}
