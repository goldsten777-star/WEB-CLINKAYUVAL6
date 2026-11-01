import Link from "next/link";
import { Suspense } from "react";
import { Card, NotConfigured, PlatformHeader } from "@/components/platform/ui";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isGoogleEnabled } from "@/lib/supabase/providers";
import { AuthForm } from "./AuthForm";
import { GoogleButton } from "./GoogleButton";
import { OAuthError } from "./OAuthError";
import { signIn, signUp } from "./actions";

export async function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const google = await isGoogleEnabled();
  const signup = mode === "signup";
  return (
    <>
      <PlatformHeader homeHref="/">
        <Link href="/hanoch" className="text-base font-medium text-brand underline-offset-4 hover:underline">
          אתר לדוגמה
        </Link>
      </PlatformHeader>
      <main id="main" className="flex flex-1 items-start justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-center text-3xl font-bold text-brand">
            {signup ? "אתר משלך בשני משפטים" : "כניסה"}
          </h1>
          <p className="mb-8 text-center text-lg text-ink-soft">
            {signup
              ? "ההרשמה בחינם. מספרים על עצמכם בקצרה, ומקבלים אתר מוכן לעריכה."
              : "נכנסים לעריכת האתר ולצפייה בפניות."}
          </p>
          <Card>
            {!isSupabaseConfigured() ? (
              <NotConfigured />
            ) : (
              <>
                <Suspense>
                  <OAuthError />
                </Suspense>
                {google && <GoogleButton signup={signup} />}
                <AuthForm mode={mode} action={signup ? signUp : signIn} />
              </>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}
