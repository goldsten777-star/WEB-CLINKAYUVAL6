import type { CSSProperties } from "react";
import type { SiteData } from "./site";

function toRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex(rgb: number[]) {
  return "#" + rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("");
}

// Mix a color with white. amount 0 = unchanged, 1 = white.
export function lighten(hex: string, amount: number) {
  return toHex(toRgb(hex).map((c) => c + (255 - c) * amount));
}

function luminance(hex: string) {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const INK = "#2f3a4a";

// Dark ink or white, whichever has more contrast on this color.
export function readableOn(hex: string) {
  const l = luminance(hex);
  const vsWhite = 1.05 / (l + 0.05);
  const vsInk = (l + 0.05) / (luminance(INK) + 0.05);
  return vsInk >= vsWhite ? INK : "#ffffff";
}

// Overrides the Tailwind theme variables for one therapist's page.
export function themeStyle(site: Pick<SiteData, "color_brand" | "color_cta" | "color_background">) {
  return {
    "--color-brand": site.color_brand,
    "--color-on-brand": readableOn(site.color_brand),
    "--color-cta": site.color_cta,
    "--color-cta-hover": lighten(site.color_cta, 0.18),
    "--color-on-cta": readableOn(site.color_cta),
    "--color-cream": site.color_background,
  } as CSSProperties;
}
