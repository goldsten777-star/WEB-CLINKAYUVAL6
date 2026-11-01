"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteLead } from "../actions";

export function DeleteLeadButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm("למחוק את הפנייה?")) return;
        startTransition(async () => {
          await deleteLead(id);
          router.refresh();
        });
      }}
      className="min-h-11 cursor-pointer rounded-full px-3 text-sm text-ink-soft underline-offset-4 hover:underline disabled:opacity-60"
    >
      {pending ? "מוחק..." : "מחיקה"}
    </button>
  );
}
