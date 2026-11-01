import Link from "next/link";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";

// Shared look for the platform pages (login, dashboard), built on the
// same theme tokens as the demo site.

export function PlatformHeader({ children, homeHref = "/dashboard" }: { children?: ReactNode; homeHref?: string }) {
  return (
    <header className="sticky top-0 z-50 h-[4.5rem] bg-cream/95 shadow-[0_1px_0_rgb(47_58_74/0.06)]">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between gap-4 px-4">
        <Link
          href={homeHref}
          className="flex items-center gap-2"
          aria-label={homeHref === "/" ? "בונה האתרים, לדף הבית" : "בונה האתרים, ללוח הבקרה"}
        >
          <Image src="/default-logo.svg" alt="" width={44} height={44} unoptimized className="h-11 w-11 object-contain" />
          <span className="text-lg font-bold text-brand">בונה האתרים למטפלים</span>
        </Link>
        {children}
      </div>
    </header>
  );
}

export function PageTitle({ title, text }: { title: string; text?: ReactNode }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-brand md:text-4xl">{title}</h1>
      {text && <p className="mt-3 text-lg text-ink-soft">{text}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-card bg-white p-6 shadow-soft md:p-8 ${className}`}>{children}</div>;
}

export function Label({ htmlFor, children, hint }: { htmlFor: string; children: ReactNode; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-base font-medium text-ink">
      {children}
      {hint && <span className="ms-2 text-sm font-normal text-ink-soft">{hint}</span>}
    </label>
  );
}

const fieldClass =
  "w-full rounded-xl border-2 border-ink/15 bg-white px-4 py-2.5 text-base text-ink placeholder:text-ink-soft/60 focus:border-brand focus:outline-none";

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={`${fieldClass} min-h-12 ${props.className ?? ""}`} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} className={`${fieldClass} ${props.className ?? ""}`} />;
}

export function Select(props: ComponentProps<"select">) {
  return <select {...props} className={`${fieldClass} min-h-12 ${props.className ?? ""}`} />;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: "primary" | "secondary" | "ghost" }) {
  const styles = {
    primary: "bg-cta text-on-cta hover:bg-cta-hover",
    secondary: "border-2 border-brand/30 bg-white text-brand hover:bg-sky/40",
    ghost: "text-brand hover:bg-white",
  }[variant];
  return (
    <button
      {...props}
      className={`inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full px-6 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles} ${className}`}
    />
  );
}

export function Alert({ tone = "error", children }: { tone?: "error" | "success" | "info"; children: ReactNode }) {
  const styles = {
    error: "bg-peach text-ink",
    success: "bg-mint text-ink",
    info: "bg-sky text-ink",
  }[tone];
  return (
    <p role={tone === "error" ? "alert" : "status"} className={`rounded-xl px-4 py-3 text-base ${styles}`}>
      {children}
    </p>
  );
}

export function NotConfigured() {
  return (
    <Alert tone="info">
      החיבור למסד הנתונים עוד לא הוגדר (משתני הסביבה של Supabase חסרים). ההרשמה והעריכה יעבדו אחרי ההגדרה.
    </Alert>
  );
}
