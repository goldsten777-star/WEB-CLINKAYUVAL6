"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Alert, Button, Input, Label } from "@/components/platform/ui";
import type { AuthState } from "./actions";

export function AuthForm({
  mode,
  action,
}: {
  mode: "login" | "signup";
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const signup = mode === "signup";

  if (state.message) return <Alert tone="success">{state.message}</Alert>;

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <Label htmlFor="email">מייל</Label>
        <Input id="email" name="email" type="email" dir="ltr" autoComplete="email" required defaultValue={state.email} />
      </div>
      <div>
        <Label htmlFor="password" hint={signup ? "8 תווים לפחות" : undefined}>
          סיסמה
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          dir="ltr"
          autoComplete={signup ? "new-password" : "current-password"}
          minLength={signup ? 8 : undefined}
          required
        />
      </div>

      {state.error && <Alert>{state.error}</Alert>}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "רגע..." : signup ? "יצירת חשבון" : "כניסה"}
      </Button>

      <p className="text-center text-base text-ink-soft">
        {signup ? (
          <>
            כבר יש לך חשבון?{" "}
            <Link href="/login" className="font-semibold text-brand underline-offset-4 hover:underline">
              כניסה
            </Link>
          </>
        ) : (
          <>
            עוד אין לך אתר?{" "}
            <Link href="/signup" className="font-semibold text-brand underline-offset-4 hover:underline">
              הרשמה
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
