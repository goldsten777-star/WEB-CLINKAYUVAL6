import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PlatformHeader } from "@/components/platform/ui";
import { Reveal } from "@/components/Reveal";
import { Bubbles } from "@/components/hero/Bubbles";
import { Cloud, HillsBack, HillsMid, Sun } from "@/components/hero/Illustrations";

export const metadata: Metadata = {
  title: "בונה אתרים למטפלים | אתר מקצועי משני משפטים (הדגמה)",
  description:
    "הרשמה בחינם. מספרים בשני משפטים מי אתם ועם מי אתם עובדים, ומקבלים אתר מעוצב בעברית עם טופס פניות. עורכים כל מילה ומפרסמים בכתובת משלכם.",
  openGraph: {
    title: "בונה אתרים למטפלים",
    description: "אתר מקצועי למטפלים, משני משפטים. ההרשמה בחינם.",
    locale: "he_IL",
    type: "website",
  },
};

const SIGNUP = "/signup";
const EXAMPLE = "/hanoch";

const ctaPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-cta px-8 text-lg font-semibold text-on-cta shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-lg motion-reduce:transform-none";
const ctaSecondary =
  "inline-flex min-h-12 items-center justify-center rounded-full border-2 border-brand/30 bg-white/70 px-7 text-base font-medium text-brand transition-colors hover:bg-white";

const STEPS = [
  {
    title: "נרשמים בחינם",
    text: "מייל וסיסמה, וזהו. ההרשמה בחינם, בלי כרטיס אשראי ובלי התקנות.",
  },
  {
    title: "מספרים בשני משפטים",
    text: "מי אתם, במה אתם מטפלים ועם מי אתם עובדים. הבינה המלאכותית של Gemini כותבת מזה את כל האתר.",
  },
  {
    title: "עורכים ומפרסמים",
    text: "משנים כל מילה, צבע ותמונה, בוחרים כתובת, ולוחצים על פרסום. הפניות מגיעות ישר ללוח הבקרה.",
  },
];

const FEATURES: { title: string; text: string; tone: string; icon: ReactNode }[] = [
  {
    title: "אתר בעברית, מותאם לנייד",
    text: "עיצוב רך ונגיש שנראה טוב בטלפון ובמחשב, עם כותרות, שירותים, אודות והמלצות.",
    tone: "bg-sky",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 stroke-brand" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="14" y="6" width="20" height="36" rx="4" fill="#46aee0" fillOpacity="0.25" />
        <path d="M21 36 L27 36" />
      </svg>
    ),
  },
  {
    title: "טופס פניות מובנה",
    text: "מטופלים משאירים שם וטלפון, והפנייה נשמרת אצלכם בלוח הבקרה, עם הגנה בסיסית מספאם.",
    tone: "bg-peach",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 stroke-brand" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="12" width="36" height="26" rx="4" fill="#f2635f" fillOpacity="0.2" />
        <path d="M8 15 L24 27 L40 15" />
      </svg>
    ),
  },
  {
    title: "שליטה מלאה בתוכן",
    text: "כל טקסט, שירות, המלצה וצבע ניתנים לעריכה. אפשר להעלות לוגו ותמונה משלכם.",
    tone: "bg-mint",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 stroke-brand" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 38 L12 30 L32 10 L38 16 L18 36 Z" fill="#3f8f68" fillOpacity="0.2" />
        <path d="M28 14 L34 20" />
      </svg>
    ),
  },
  {
    title: "כתובת משלכם",
    text: "האתר מתפרסם בכתובת קצרה עם השם שלכם, שאפשר לשלוח בוואטסאפ או לשים בכרטיס ביקור.",
    tone: "bg-lavender",
    icon: (
      <svg viewBox="0 0 48 48" className="h-12 w-12 stroke-brand" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="24" cy="24" r="17" fill="#8b7ec8" fillOpacity="0.2" />
        <path d="M7 24 L41 24 M24 7 C 16 16, 16 32, 24 41 M24 7 C 32 16, 32 32, 24 41" />
      </svg>
    ),
  },
];

const FAQ = [
  {
    q: "כמה זה עולה?",
    a: "ההרשמה בחינם, וגם יצירת האתר, העריכה והפרסום.",
  },
  {
    q: "צריך לדעת לבנות אתרים?",
    a: "לא. כותבים שני משפטים, מקבלים אתר מוכן, ומתקנים בטופס פשוט. אין קוד ואין גרירת רכיבים.",
  },
  {
    q: "מה אם הטקסט שנוצר לא מדויק?",
    a: "כל שדה ניתן לעריכה לפני הפרסום ואחריו. Gemini מתבקש לכתוב רק לפי מה שסיפרתם, בלי להמציא תארים או ניסיון, וכדאי לעבור על הכול לפני הפרסום.",
  },
  {
    q: "איפה נשמרות הפניות ממטופלים?",
    a: "במסד נתונים מאובטח, וכל מטפל רואה רק את הפניות שלו. זהו אתר הדגמה, ולכן לא כדאי להשתמש בו עם פרטים רגישים אמיתיים.",
  },
];

function SectionTitle({ id, title, text }: { id: string; title: string; text?: string }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <h2 id={id} className="text-3xl font-bold text-brand md:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-3 text-lg text-ink-soft">{text}</p>}
    </Reveal>
  );
}

export default function LandingPage() {
  return (
    <>
      <PlatformHeader homeHref="/">
        <nav aria-label="ניווט ראשי" className="flex items-center gap-1 sm:gap-3">
          <a href="#how" className="hidden rounded-full px-3 py-2 text-base font-medium text-ink hover:bg-white hover:text-brand md:inline-flex">
            איך זה עובד
          </a>
          <Link href={EXAMPLE} className="hidden rounded-full px-3 py-2 text-base font-medium text-ink hover:bg-white hover:text-brand md:inline-flex">
            אתר לדוגמה
          </Link>
          <Link href="/login" className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-brand hover:bg-white sm:px-4">
            כניסה
          </Link>
          <Link
            href={SIGNUP}
            className="inline-flex min-h-11 items-center rounded-full bg-cta px-5 text-base font-semibold text-on-cta transition-colors hover:bg-cta-hover"
          >
            הרשמה בחינם
          </Link>
        </nav>
      </PlatformHeader>

      <main id="main">
        {/* Hero */}
        <section
          aria-labelledby="hero-title"
          className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#cfe6f5_0%,#e9f1f4_45%,#fff8f0_80%)] px-4 pb-40 pt-16 md:pb-48 md:pt-24"
        >
          <Bubbles />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <Sun className="absolute top-[4%] end-[4%] w-16 md:end-[8%] md:w-32" />
            <Cloud className="absolute top-[10%] start-[4%] w-20 opacity-95 md:start-[8%] md:w-36" />
            <div className="absolute inset-x-0 bottom-0 h-40 md:h-52">
              <HillsBack />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-28 md:h-36">
              <HillsMid />
            </div>
          </div>

          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <Reveal className="text-center lg:text-start">
              <p className="mb-4 inline-flex rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-brand">
                למטפלים, פסיכולוגים ומטפלים רגשיים
              </p>
              <h1 id="hero-title" className="text-balance text-4xl font-bold leading-tight text-brand sm:text-5xl md:text-6xl">
                אתר מקצועי, משני משפטים
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft md:text-xl lg:mx-0">
                מספרים בקצרה מי אתם ועם מי אתם עובדים, ומקבלים אתר מעוצב בעברית עם טופס פניות. עורכים כל מילה ומפרסמים בכתובת משלכם.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link href={SIGNUP} className={ctaPrimary}>
                  הרשמה בחינם
                </Link>
                <Link href={EXAMPLE} className={ctaSecondary}>
                  לצפייה באתר לדוגמה
                </Link>
              </div>
              <p className="mt-3 text-sm text-ink-soft">בלי כרטיס אשראי.</p>
            </Reveal>

            {/* Two sentences -> a site */}
            <Reveal delay={0.15} className="relative mx-auto w-full max-w-xl">
              <div className="rounded-card bg-white p-5 shadow-soft">
                <p className="text-sm font-medium text-ink-soft">על עצמי</p>
                <p className="mt-2 rounded-xl border-2 border-ink/10 bg-cream px-4 py-3 text-base leading-relaxed text-ink">
                  אני חנוך, מטפל רגשי לילדים. אני עובד דרך משחק ושיחה, ומלווה גם את ההורים בהדרכה.
                </p>
              </div>
              <div aria-hidden="true" className="my-3 text-center text-3xl text-brand">
                ↓
              </div>
              <Link
                href={EXAMPLE}
                className="block overflow-hidden rounded-card bg-white shadow-soft ring-1 ring-ink/5 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none"
                aria-label="האתר שנוצר: אתר ההדגמה של חנוך המטפל"
              >
                <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-ink/10 bg-cream px-4 py-2.5" dir="ltr">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-coral/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-green/60" />
                  <span className="ms-3 truncate rounded-full bg-white px-3 py-0.5 text-xs text-ink-soft">hanoch-clinic.vercel.app/hanoch</span>
                </div>
                <Image
                  src="/example-site.webp"
                  alt="צילום מסך של אתר ההדגמה: הכותרת 'כל ילד מקבל מקום להרגיש' על רקע גבעות ושמש"
                  width={1280}
                  height={800}
                  priority
                  className="h-auto w-full"
                />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* How it works */}
        <section id="how" aria-labelledby="how-title" className="relative z-10 -mt-8 scroll-mt-20 rounded-t-[2.5rem] bg-cream px-4 pb-20 pt-24">
          <div className="mx-auto max-w-6xl">
            <SectionTitle id="how-title" title="איך זה עובד" text="שלושה צעדים, ופחות מעשר דקות." />
            <ol className="grid gap-6 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <Reveal delay={i * 0.12} className="h-full">
                    <div className="flex h-full flex-col rounded-card bg-white p-8 shadow-soft">
                      <span
                        aria-hidden="true"
                        className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-butter text-xl font-bold text-brand"
                      >
                        {i + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-ink">{step.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-ink-soft">{step.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Features */}
        <section aria-labelledby="features-title" className="bg-butter/50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle id="features-title" title="מה מקבלים" />
            <ul className="grid gap-6 md:grid-cols-2">
              {FEATURES.map((f, i) => (
                <li key={f.title}>
                  <Reveal delay={(i % 2) * 0.1} className="h-full">
                    <div className={`${f.tone} flex h-full gap-5 rounded-card p-7 shadow-soft`}>
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/70">{f.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-ink">{f.title}</h3>
                        <p className="mt-2 text-base leading-relaxed text-ink-soft">{f.text}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <SectionTitle id="faq-title" title="שאלות נפוצות" />
            <div className="space-y-4">
              {FAQ.map((item) => (
                <details key={item.q} className="group rounded-card bg-white p-6 shadow-soft">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink">
                    {item.q}
                    <span aria-hidden="true" className="text-2xl text-brand transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final call to action */}
        <section aria-labelledby="cta-title" className="px-4 pb-24">
          <Reveal className="mx-auto max-w-4xl rounded-[2.5rem] bg-brand px-6 py-14 text-center text-on-brand shadow-soft md:px-12">
            <h2 id="cta-title" className="text-3xl font-bold md:text-4xl">
              מוכנים לאתר משלכם?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
              שני משפטים עליכם, וכמה דקות של עריכה. האתר שלכם יכול להיות באוויר עוד היום.
            </p>
            <Link href={SIGNUP} className={`${ctaPrimary} mt-8`}>
              הרשמה בחינם
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="mt-auto bg-brand text-on-brand">
        <div className="bg-brand-yellow px-4 py-2 text-center text-sm font-medium text-ink">
          אתר הדגמה לצורכי לימוד. לא לשימוש עם נתוני מטופלים אמיתיים.
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
          <p className="text-lg font-bold">בונה האתרים למטפלים</p>
          <nav aria-label="קישורים בתחתית העמוד" className="flex gap-6 text-base">
            <Link href={SIGNUP} className="underline-offset-4 hover:underline">
              הרשמה בחינם
            </Link>
            <Link href="/login" className="underline-offset-4 hover:underline">
              כניסה
            </Link>
            <Link href={EXAMPLE} className="underline-offset-4 hover:underline">
              אתר לדוגמה
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
