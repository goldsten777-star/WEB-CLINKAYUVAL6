"use client";

import { useSearchParams } from "next/navigation";
import { Alert } from "@/components/platform/ui";

// Shown when the Google sign-in round trip fails (?error=oauth).
export function OAuthError() {
  const params = useSearchParams();
  if (params.get("error") !== "oauth") return null;
  return (
    <div className="mb-5">
      <Alert>הכניסה עם Google לא הצליחה. נסו שוב, או היכנסו עם מייל וסיסמה.</Alert>
    </div>
  );
}
