import Link from "next/link";
import { SERVICES } from "@/data/content";
import { Reveal } from "@/components/Reveal";

function Icon({ name }: { name: (typeof SERVICES)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 48 48",
    className: "h-12 w-12",
    fill: "none",
    stroke: "#1d5e8f",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "heart") {
    return (
      <svg {...common}>
        <path d="M24 41 C 8 30, 6 20, 10 14 C 14 8, 22 9, 24 16 C 26 9, 34 8, 38 14 C 42 20, 40 30, 24 41 Z" fill="#f2635f" fillOpacity="0.35" />
      </svg>
    );
  }
  if (name === "people") {
    return (
      <svg {...common}>
        <circle cx="16" cy="16" r="6" fill="#fdb43a" fillOpacity="0.5" />
        <circle cx="34" cy="20" r="5" fill="#46aee0" fillOpacity="0.5" />
        <path d="M5 40 C 5 30, 27 30, 27 40" />
        <path d="M28 40 C 28 33, 43 33, 43 40" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="24" cy="24" r="17" fill="#46aee0" fillOpacity="0.3" />
      <path d="M30 18 L26 26 L18 30 L22 22 Z" fill="#fdb43a" fillOpacity="0.7" />
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative z-10 -mt-8 scroll-mt-20 rounded-t-[2.5rem] bg-cream px-4 pb-20 pt-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <h2 id="services-title" className="text-3xl font-bold text-brand md:text-4xl">
            איך אפשר לעזור
          </h2>
          <p className="mt-3 text-lg text-ink-soft">
            שלוש דרכים להתחיל, בהתאם למה שהילד והמשפחה צריכים עכשיו.
          </p>
        </Reveal>

        <ul className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={i * 0.12} className="h-full">
                <article
                  className={`${s.tone} flex h-full flex-col rounded-card p-8 shadow-soft transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none`}
                >
                  <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/70">
                    <Icon name={s.icon} />
                  </div>
                  <h3 className="text-2xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">{s.text}</p>
                  <Link
                    href="/book"
                    className="mt-6 inline-flex min-h-11 items-center self-start rounded-full bg-white/80 px-5 text-base font-semibold text-brand transition-colors hover:bg-white"
                  >
                    קבעו תור
                    <span aria-hidden="true" className="ms-2">
                      ←
                    </span>
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
