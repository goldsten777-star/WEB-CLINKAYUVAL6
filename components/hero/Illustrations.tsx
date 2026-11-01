export function Sun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <circle cx="100" cy="100" r="98" fill="#FFE9A8" opacity="0.45" />
      <circle cx="100" cy="100" r="68" fill="#FFE08A" opacity="0.8" />
      <circle cx="100" cy="100" r="46" fill="#FDB43A" />
    </svg>
  );
}

export function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} fill="#fff">
      <circle cx="62" cy="60" r="28" />
      <circle cx="98" cy="44" r="36" />
      <circle cx="138" cy="60" r="28" />
      <rect x="44" y="60" width="112" height="28" rx="14" />
    </svg>
  );
}

export function Bird({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <ellipse cx="38" cy="34" rx="24" ry="18" fill="#46AEE0" />
      <path d="M14 30 L2 22 L16 38 Z" fill="#1D5E8F" />
      <path d="M34 30 C 40 14, 56 14, 62 24 C 54 28, 44 32, 34 36 Z" fill="#1D5E8F" opacity="0.85" />
      <circle cx="54" cy="30" r="3" fill="#2F3A4A" />
      <path d="M60 34 L72 38 L60 41 Z" fill="#FDB43A" />
    </svg>
  );
}

export function HillsBack() {
  return (
    <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" className="h-full w-full" fill="none">
      <path d="M0 210 C 220 110, 470 120, 720 200 S 1210 290, 1440 150 L1440 400 L0 400 Z" fill="#CDEBDD" />
      <g>
        <rect x="190" y="150" width="10" height="34" rx="4" fill="#9B7B5A" />
        <circle cx="195" cy="138" r="26" fill="#A9DDBE" />
        <rect x="1130" y="190" width="10" height="34" rx="4" fill="#9B7B5A" />
        <circle cx="1135" cy="176" r="30" fill="#A9DDBE" />
      </g>
    </svg>
  );
}

export function HillsMid() {
  return (
    <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" className="h-full w-full" fill="none">
      <path d="M0 280 C 300 200, 560 240, 820 290 S 1250 330, 1440 250 L1440 400 L0 400 Z" fill="#B5E0C4" />
      <g>
        <rect x="330" y="210" width="12" height="44" rx="5" fill="#8A6B4B" />
        <circle cx="336" cy="196" r="34" fill="#7FC79A" />
        <circle cx="318" cy="214" r="22" fill="#8FD1A8" />
        <rect x="960" y="250" width="12" height="44" rx="5" fill="#8A6B4B" />
        <circle cx="966" cy="236" r="38" fill="#7FC79A" />
        <circle cx="986" cy="254" r="24" fill="#8FD1A8" />
        <circle cx="560" cy="268" r="9" fill="#FDB43A" />
        <circle cx="620" cy="282" r="7" fill="#F2635F" />
        <circle cx="1180" cy="290" r="8" fill="#FDB43A" />
      </g>
    </svg>
  );
}

export function HillsFront() {
  return (
    <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" className="h-full w-full" fill="none">
      <path d="M0 335 C 260 295, 520 325, 760 342 S 1200 325, 1440 305 L1440 400 L0 400 Z" fill="#98D3A8" />
      <g transform="translate(1090 268)">
        <ellipse cx="22" cy="-34" rx="8" ry="26" fill="#fff" transform="rotate(-8 22 -34)" />
        <ellipse cx="22" cy="-34" rx="3.5" ry="17" fill="#FFC9C2" transform="rotate(-8 22 -34)" />
        <ellipse cx="48" cy="-34" rx="8" ry="26" fill="#fff" transform="rotate(8 48 -34)" />
        <ellipse cx="48" cy="-34" rx="3.5" ry="17" fill="#FFC9C2" transform="rotate(8 48 -34)" />
        <ellipse cx="35" cy="44" rx="34" ry="28" fill="#fff" />
        <circle cx="35" cy="6" r="26" fill="#fff" />
        <circle cx="26" cy="2" r="3" fill="#2F3A4A" />
        <circle cx="44" cy="2" r="3" fill="#2F3A4A" />
        <ellipse cx="35" cy="11" rx="4" ry="3" fill="#F2635F" />
        <circle cx="16" cy="12" r="5" fill="#FFC9C2" opacity="0.7" />
        <circle cx="54" cy="12" r="5" fill="#FFC9C2" opacity="0.7" />
      </g>
      <g>
        <circle cx="250" cy="352" r="8" fill="#FDB43A" />
        <circle cx="300" cy="364" r="6" fill="#F2635F" />
        <circle cx="520" cy="358" r="7" fill="#fff" />
        <circle cx="820" cy="366" r="8" fill="#FDB43A" />
      </g>
    </svg>
  );
}
