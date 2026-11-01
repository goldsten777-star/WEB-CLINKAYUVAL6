import type { Metadata, Viewport } from "next";
import "@fontsource-variable/rubik";
import "./globals.css";

export const metadata: Metadata = {
  title: "חנוך המטפל | טיפול בילדים והדרכת הורים (אתר הדגמה)",
  description:
    "אתר הדגמה לקליניקה של חנוך המטפל: טיפול בילדים, הדרכת הורים ואבחון ראשוני. לצורכי לימוד בלבד, כל הנתונים בדויים.",
  openGraph: {
    title: "חנוך המטפל",
    description: "טיפול בילדים והדרכת הורים (אתר הדגמה)",
    locale: "he_IL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff8f0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100] focus:rounded-xl focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          דלגו לתוכן הראשי
        </a>
        {children}
      </body>
    </html>
  );
}
