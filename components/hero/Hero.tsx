"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Bubbles } from "./Bubbles";
import { Bird, Cloud, HillsBack, HillsFront, HillsMid, Sun } from "./Illustrations";

const TITLE = "כל ילד מקבל מקום להרגיש";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const k = reduce ? 0 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const ySky = useTransform(scrollYProgress, [0, 1], [0, 170 * k]);
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 110 * k]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 60 * k]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 18 * k]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -50 * k]);

  const enter = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 48 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: "easeOut" as const },
        };

  const words = TITLE.split(" ");

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate h-[calc(90svh-4.5rem)] min-h-[600px] overflow-hidden bg-[linear-gradient(180deg,#cfe6f5_0%,#e9f1f4_38%,#fff8f0_70%,#ffe9dc_100%)] md:h-[calc(100svh-4.5rem)]"
    >
      <Bubbles />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div style={{ y: ySky }} className="absolute inset-0">
          <motion.div {...enter(0.1)} className="absolute inset-0">
            <Sun className="absolute top-[2%] end-[3%] w-16 md:top-[7%] md:end-[9%] md:w-40" />
            <Cloud className="absolute top-[8%] start-[3%] w-20 opacity-95 md:top-[14%] md:start-[8%] md:w-44" />
            <Cloud className="absolute top-[30%] end-[26%] hidden w-20 opacity-90 sm:block md:w-32" />
            <Cloud className="absolute top-[22%] start-[44%] hidden w-24 opacity-80 md:block" />
            <Bird className="bob absolute top-[40%] start-[18%] hidden w-12 sm:block md:w-16" />
          </motion.div>
        </motion.div>
        <motion.div style={{ y: yBack }} className="absolute inset-x-0 bottom-0 h-[52%]">
          <motion.div {...enter(0.25)} className="h-full">
            <HillsBack />
          </motion.div>
        </motion.div>
        <motion.div style={{ y: yMid }} className="absolute inset-x-0 bottom-0 h-[44%]">
          <motion.div {...enter(0.4)} className="h-full">
            <HillsMid />
          </motion.div>
        </motion.div>
        <motion.div style={{ y: yFront }} className="absolute inset-x-0 bottom-0 h-[34%]">
          <motion.div {...enter(0.55)} className="h-full">
            <HillsFront />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ y: yText }}
        className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center px-5 pt-24 text-center md:pt-20"
      >
        <h1 id="hero-title" className="text-4xl font-bold leading-tight text-brand sm:text-5xl md:text-6xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              {...(reduce
                ? { initial: false }
                : {
                    initial: { opacity: 0, y: 18 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.6, delay: 0.15 + i * 0.1, ease: "easeOut" },
                  })}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-5 max-w-xl text-lg text-ink-soft md:text-xl"
          {...(reduce
            ? { initial: false }
            : {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.75 },
              })}
        >
          טיפול רגשי לילדים והדרכה להורים, בחום, בסבלנות ובשפה שילדים מבינים.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          {...(reduce
            ? { initial: false }
            : {
                initial: { opacity: 0, y: 14 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.95 },
              })}
        >
          <Link
            href="/book"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-cta px-9 text-lg font-semibold text-ink shadow-soft transition duration-200 hover:-translate-y-0.5 hover:bg-cta-hover hover:shadow-lg active:translate-y-0 motion-reduce:transform-none"
          >
            קבעו תור
          </Link>
          <a
            href="#about"
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-brand/30 bg-white/60 px-7 text-base font-medium text-brand transition duration-200 hover:bg-white"
          >
            הכירו את חנוך
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
