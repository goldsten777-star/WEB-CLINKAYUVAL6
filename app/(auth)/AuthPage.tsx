import Link from "next/link";
import { Card, NotConfigured, PlatformHeader } from "@/components/platform/ui";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { AuthForm } from "./AuthForm";
import { signIn, signUp } from "./actions";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  return (
    <>
      <PlatformHeader>
        <Link href="/" className="text-base font-medium text-brand underline-offset-4 hover:underline">
          לאתר ההדגמה
        </Link>
      </PlatformHeader>
      <main id="main" className="flex flex-1 items-start justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-center text-3xl font-bold text-brand">
            {signup ? "אתר משלך בשני משפטים" : "כניסה"}
          </h1>
          <p className="mb-8 text-center text-lg text-ink-soft">
            {signup
              ? "נרשמים, מספרים על עצמכם בקצרה, ומקבלים אתר מוכן לעריכה."
              : "נכנסים לעריכת האתר ולצפייה בפניות."}
          </p>
          <Card>
            {!isSupabaseConfigured() ? <NotConfigured /> : <AuthForm mode={mode} action={signup ? signUp : signIn} />}
          </Card>
        </div>
      </main>
    </>
  );
}
