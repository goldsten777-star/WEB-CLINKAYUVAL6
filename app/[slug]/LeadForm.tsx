"use client";

import { useActionState, useEffect, useRef } from "react";
import { type LeadState, sendLead } from "./actions";

const field =
  "w-full rounded-xl border-2 border-ink/15 bg-white px-4 py-2.5 text-base text-ink focus:border-brand focus:outline-none";

export function LeadForm({ slug, ctaLabel, preview }: { slug: string; ctaLabel: string; preview?: boolean }) {
  const [state, formAction, pending] = useActionState<LeadState, FormData>(sendLead.bind(null, slug), {});
  // When the visitor started filling the form (set in the browser only).
  const startedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  if (state.ok) {
    return (
      <div role="status" className="rounded-card bg-mint p-8 text-center">
        <p className="text-2xl font-bold text-ink">תודה! הפרטים התקבלו.</p>
        <p className="mt-2 text-lg text-ink-soft">נחזור אליכם בהקדם.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input ref={startedAt} type="hidden" name="started_at" defaultValue="" />
      {/* Honeypot: hidden from people, bots fill it in. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">אתר</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-base font-medium text-ink">
            שם
          </label>
          <input id="lead-name" name="name" required maxLength={80} autoComplete="name" defaultValue={state.fields?.name} className={`${field} min-h-12`} />
        </div>
        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-base font-medium text-ink">
            טלפון
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            dir="ltr"
            required
            maxLength={20}
            autoComplete="tel"
            defaultValue={state.fields?.phone}
            className={`${field} min-h-12 text-right`}
          />
        </div>
      </div>
      <div>
        <label htmlFor="lead-email" className="mb-1.5 block text-base font-medium text-ink">
          מייל <span className="text-sm font-normal text-ink-soft">(לא חובה)</span>
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          dir="ltr"
          maxLength={120}
          autoComplete="email"
          defaultValue={state.fields?.email}
          className={`${field} min-h-12 text-right`}
        />
      </div>
      <div>
        <label htmlFor="lead-message" className="mb-1.5 block text-base font-medium text-ink">
          במה אפשר לעזור? <span className="text-sm font-normal text-ink-soft">(לא חובה)</span>
        </label>
        <textarea id="lead-message" name="message" rows={4} maxLength={1000} defaultValue={state.fields?.message} className={field} />
      </div>
      <label className="flex items-start gap-3 text-base text-ink">
        <input type="checkbox" name="consent" required className="mt-1.5 h-5 w-5 accent-brand" />
        <span>אני מאשר/ת שיחזרו אליי לגבי הפנייה, ושהפרטים יישמרו לצורך זה בלבד.</span>
      </label>

      {state.error && (
        <p role="alert" className="rounded-xl bg-peach px-4 py-3 text-base text-ink">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || preview}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-cta px-9 text-lg font-semibold text-on-cta shadow-soft transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "שולח..." : ctaLabel}
      </button>
    </form>
  );
}
