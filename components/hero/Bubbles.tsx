import type { CSSProperties } from "react";

type Bubble = {
  size: number;
  top: string;
  start: string;
  color: string;
  dur: number;
  delay: number;
  float: "float-a" | "float-b";
};

const BUBBLES: Bubble[] = [
  { size: 120, top: "8%", start: "6%", color: "#FFD9C9", dur: 15, delay: 0, float: "float-a" },
  { size: 72, top: "20%", start: "24%", color: "#CDEBDD", dur: 12, delay: -3, float: "float-b" },
  { size: 168, top: "4%", start: "62%", color: "#E3DAF5", dur: 18, delay: -6, float: "float-a" },
  { size: 56, top: "34%", start: "80%", color: "#FFF1B8", dur: 11, delay: -2, float: "float-b" },
  { size: 96, top: "46%", start: "4%", color: "#CFE6F5", dur: 16, delay: -8, float: "float-b" },
  { size: 44, top: "14%", start: "46%", color: "#FFF1B8", dur: 10, delay: -4, float: "float-a" },
  { size: 140, top: "38%", start: "88%", color: "#CDEBDD", dur: 17, delay: -5, float: "float-a" },
  { size: 64, top: "52%", start: "30%", color: "#FFD9C9", dur: 13, delay: -1, float: "float-b" },
  { size: 84, top: "26%", start: "92%", color: "#E3DAF5", dur: 14, delay: -9, float: "float-b" },
  { size: 52, top: "58%", start: "68%", color: "#CFE6F5", dur: 12, delay: -7, float: "float-a" },
];

export function Bubbles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bubble absolute rounded-full opacity-80"
          style={
            {
              width: b.size,
              height: b.size,
              top: b.top,
              insetInlineStart: b.start,
              background: `radial-gradient(circle at 30% 30%, #ffffffcc, ${b.color} 62%)`,
              "--dur": `${b.dur}s`,
              "--delay": `${b.delay}s`,
              "--float": b.float,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
