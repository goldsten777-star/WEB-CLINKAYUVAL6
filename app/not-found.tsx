import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-brand md:text-4xl">הדף לא נמצא</h1>
      <p className="mt-4 text-lg text-ink-soft">ייתכן שהכתובת שגויה, או שהאתר עוד לא פורסם.</p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-cta px-8 text-lg font-semibold text-on-cta hover:bg-cta-hover"
      >
        לדף הבית
      </Link>
    </main>
  );
}
