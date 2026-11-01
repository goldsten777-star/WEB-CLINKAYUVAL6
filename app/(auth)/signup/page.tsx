import type { Metadata } from "next";
import { AuthPage } from "../AuthPage";

export const metadata: Metadata = { title: "הרשמה | בונה האתרים למטפלים" };

export default function SignupPage() {
  return <AuthPage mode="signup" />;
}
