import Image from "next/image";
import { VALUES } from "@/data/content";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-20 bg-butter/50 px-4 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div aria-hidden="true" className="absolute inset-4 rounded-[3rem] bg-lavender/70" />
          <div aria-hidden="true" className="absolute -top-3 start-6 h-16 w-16 rounded-full bg-peach" />
          <div aria-hidden="true" className="absolute -bottom-3 end-8 h-20 w-20 rounded-full bg-mint" />
          <Image
            src="/logo.webp"
            alt="איור של חנוך יושב בין שני ילדים צוחקים"
            width={640}
            height={640}
            className="relative mx-auto h-auto w-full rounded-[2.5rem] bg-white p-4 shadow-soft"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 id="about-title" className="text-3xl font-bold text-brand md:text-4xl">
            הכירו את חנוך
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            חנוך מלווה ילדים והוריהם בדרך אל יחסים רגועים ומחוברים יותר. הגישה שלו משלבת משחק, שיחה
            והדרכה מעשית להורים, תמיד בקצב של הילד ובכבוד לעולם שלו.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            בקליניקה הילד לא &quot;מטופל&quot;, הוא שותף. וההורים מקבלים הבנה וכלים שממשיכים לעבוד גם
            אחרי שיוצאים מהדלת.
          </p>
          <ul className="mt-6 flex flex-wrap gap-3" aria-label="עקרונות הגישה הטיפולית">
            {VALUES.map((v) => (
              <li key={v} className="rounded-full bg-white px-5 py-2 text-base font-medium text-brand shadow-sm">
                {v}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft/80">טקסט הדגמה לצורכי לימוד בלבד.</p>
        </Reveal>
      </div>
    </section>
  );
}
