"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "@/data/content";

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  const total = TESTIMONIALS.length;
  const autoplay = !reduce && !paused && !stopped;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), 7000);
    return () => window.clearInterval(id);
  }, [autoplay, total]);

  const go = (delta: number) => setIndex((i) => (i + delta + total) % total);
  const item = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="scroll-mt-20 px-4 py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="testimonials-title" className="text-3xl font-bold text-brand md:text-4xl">
          מה הורים מספרים
        </h2>

        <div
          role="group"
          aria-roledescription="קרוסלה"
          aria-label="המלצות מהורים"
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            aria-live={autoplay ? "off" : "polite"}
            className="relative min-h-[15rem] rounded-card bg-lavender/60 p-8 shadow-soft md:p-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                role="group"
                aria-roledescription="שקופית"
                aria-label={`${index + 1} מתוך ${total}`}
                initial={!reduce && { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <blockquote className="text-xl leading-relaxed text-ink md:text-2xl">
                  “{item.text}”
                </blockquote>
                <figcaption className="mt-6 text-base font-semibold text-brand">
                  {item.name}, {item.role}
                  <span className="ms-2 rounded-full bg-white/80 px-2 py-0.5 text-xs font-normal text-ink-soft">
                    המלצה לדוגמה
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="ההמלצה הבאה"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white text-brand shadow-sm transition-colors hover:bg-peach"
            >
              <span aria-hidden="true">→</span>
            </button>
            <div className="flex items-center gap-2" role="group" aria-label="בחירת המלצה">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`המלצה ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="grid h-11 w-6 cursor-pointer place-items-center"
                >
                  <span
                    className={`block h-3 rounded-full transition-all ${i === index ? "w-6 bg-brand" : "w-3 bg-brand/30"}`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="ההמלצה הקודמת"
              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white text-brand shadow-sm transition-colors hover:bg-peach"
            >
              <span aria-hidden="true">←</span>
            </button>
          </div>

          {!reduce && (
            <button
              type="button"
              onClick={() => setStopped((s) => !s)}
              className="mt-3 min-h-11 cursor-pointer rounded-full px-4 text-sm text-ink-soft underline-offset-4 hover:underline"
            >
              {stopped ? "הפעלת החלפה אוטומטית" : "עצירת החלפה אוטומטית"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
