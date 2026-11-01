import type { Metadata } from "next";
import { AuthPage } from "../AuthPage";

export const metadata: Metadata = { title: "כניסה | בונה האתרים למטפלים" };

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
