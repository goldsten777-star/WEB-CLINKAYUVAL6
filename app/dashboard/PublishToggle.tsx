"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/platform/ui";
import { setPublished } from "./actions";

export function PublishToggle({ published }: { published: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant={published ? "secondary" : "primary"}
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const result = await setPublished(!published);
            setError(result.error);
            router.refresh();
          })
        }
      >
        {pending ? "רגע..." : published ? "הסרה מהאוויר" : "פרסום האתר"}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-ink">
          {error}
        </p>
      )}
    </div>
  );
}
