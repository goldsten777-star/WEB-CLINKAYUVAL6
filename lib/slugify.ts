// Rough Hebrew-to-Latin transliteration for a default site address.
const HEBREW: Record<string, string> = {
  א: "a", ב: "b", ג: "g", ד: "d", ה: "h", ו: "v", ז: "z", ח: "ch", ט: "t", י: "y",
  כ: "k", ך: "ch", ל: "l", מ: "m", ם: "m", נ: "n", ן: "n", ס: "s", ע: "a", פ: "p",
  ף: "f", צ: "tz", ץ: "tz", ק: "k", ר: "r", ש: "sh", ת: "t",
};

export function slugify(text: string) {
  const latin = [...text.toLowerCase()].map((c) => HEBREW[c] ?? c).join("");
  const slug = latin
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
  return slug.length >= 3 ? slug : `site-${slug || Math.random().toString(36).slice(2, 7)}`;
}
