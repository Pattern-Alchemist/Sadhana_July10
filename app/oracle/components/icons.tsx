import type { ReactElement } from "react";

interface IconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

const S = (strokeWidth = 1.4) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const ICONS: Record<string, (sw: number) => ReactElement> = {
  ripple: (sw) => (
    <>
      <circle cx="24" cy="24" r="4" {...S(sw)} />
      <circle cx="24" cy="24" r="10" {...S(sw)} opacity={0.8} />
      <circle cx="24" cy="24" r="16" {...S(sw)} opacity={0.5} />
      <circle cx="24" cy="24" r="21" {...S(sw)} opacity={0.25} />
    </>
  ),
  scales: (sw) => (
    <>
      <path d="M24 6v33" {...S(sw)} />
      <path d="M14 39h20" {...S(sw)} />
      <path d="M10 12h28" {...S(sw)} />
      <path d="M24 8 13 12M24 8l11 4" {...S(sw)} />
      <path d="M11 13 6 26h10L11 13Z" {...S(sw)} />
      <path d="M37 13l-5 13h10L37 13Z" {...S(sw)} />
    </>
  ),
  chains: (sw) => (
    <>
      <ellipse cx="14" cy="16" rx="6" ry="4" transform="rotate(-45 14 16)" {...S(sw)} />
      <ellipse cx="24" cy="24" rx="6" ry="4" transform="rotate(45 24 24)" {...S(sw)} />
      <ellipse cx="34" cy="32" rx="6" ry="4" transform="rotate(-45 34 32)" {...S(sw)} />
    </>
  ),
  crossroads: (sw) => (
    <>
      <circle cx="24" cy="10" r="2.5" {...S(sw)} />
      <path d="M24 12 11 38M24 12l13 26M24 12v26" {...S(sw)} />
      <path d="M24 30v8" {...S(sw)} opacity={0.5} />
    </>
  ),
  threads: (sw) => (
    <>
      <path d="M6 10 42 38" {...S(sw)} />
      <path d="M42 10 6 38" {...S(sw)} />
      <path d="M24 4v40" {...S(sw)} opacity={0.6} />
      <path d="M4 24h40" {...S(sw)} opacity={0.6} />
      <circle cx="24" cy="24" r="3" {...S(sw)} />
    </>
  ),
  spiral: (sw) => (
    <path
      d="M24 24a3 3 0 1 1 3 3 6 6 0 1 1-6-6 9 9 0 1 1 9 9 12 12 0 1 1-12-12 15 15 0 1 1 15 15"
      {...S(sw)}
    />
  ),
  ouroboros: (sw) => (
    <>
      <circle cx="24" cy="24" r="14" {...S(sw)} opacity={0.45} />
      <path
        d="M30 11a14 14 0 1 0 8 9"
        {...S(sw)}
      />
      <path d="M30 11l5-3-2 6" {...S(sw)} />
      <circle cx="33" cy="14" r="1.2" fill="currentColor" />
    </>
  ),
  eye: (sw) => (
    <>
      <path d="M3 24s7-11 21-11 21 11 21 11-7 11-21 11S3 24 3 24Z" {...S(sw)} />
      <circle cx="24" cy="24" r="6" {...S(sw)} />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </>
  ),
  mirror: (sw) => (
    <>
      <path d="M24 8a12 12 0 0 1 0 24 12 12 0 0 1 0-24Z" {...S(sw)} />
      <path d="M24 8a12 12 0 0 0 0 24" {...S(sw)} opacity={0.5} />
      <path d="M24 32v8M18 40h12" {...S(sw)} />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" opacity={0.6} />
    </>
  ),
  flame: (sw) => (
    <>
      <path
        d="M24 6c4 6 9 9 9 17a9 9 0 0 1-18 0c0-4 2-7 4-9 1 3 3 4 5 4-2-5 0-9 0-12Z"
        {...S(sw)}
      />
      <path d="M24 30a3 3 0 0 1-3-3c0-2 3-3 3-6 0 0 3 3 3 6a3 3 0 0 1-3 3Z" {...S(sw)} opacity={0.6} />
    </>
  ),
  tree: (sw) => (
    <>
      <path d="M24 26v16" {...S(sw)} />
      <path d="M24 22 16 14M24 22l8-8M24 18l-5-6M24 18l5-6M24 14v-6" {...S(sw)} />
      <path d="M24 26 16 34M24 26l8 8M24 30l-6 8M24 30l6 8" {...S(sw)} opacity={0.55} />
      <circle cx="24" cy="12" r="2" fill="currentColor" />
    </>
  ),
  mountain: (sw) => (
    <>
      <path d="M4 38 16 18l7 10 5-6 12 16H4Z" {...S(sw)} />
      <circle cx="34" cy="12" r="3" {...S(sw)} />
      <path d="M12 28l4-3 3 2" {...S(sw)} opacity={0.6} />
    </>
  ),
  scroll: (sw) => (
    <>
      <path d="M12 10h22a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V13" {...S(sw)} />
      <path d="M9 13a3 3 0 0 1 6 0v22a3 3 0 0 0-6 0V13Z" {...S(sw)} />
      <path d="M19 18h12M19 24h12M19 30h8" {...S(sw)} opacity={0.7} />
    </>
  ),
  hourglass: (sw) => (
    <>
      <path d="M12 6h24M12 42h24" {...S(sw)} />
      <path d="M13 6c0 9 11 11 11 18s-11 9-11 18M35 6c0 9-11 11-11 18s11 9 11 18" {...S(sw)} />
      <path d="M18 36h12" {...S(sw)} opacity={0.5} />
    </>
  ),
  key: (sw) => (
    <>
      <circle cx="15" cy="15" r="7" {...S(sw)} />
      <circle cx="15" cy="15" r="2.5" {...S(sw)} />
      <path d="M20 20 40 40M33 33l4-4M38 38l3-3" {...S(sw)} />
    </>
  ),
  hand: (sw) => (
    <>
      <path d="M14 42V24l4-3V12a2 2 0 0 1 4 0v9M22 21V9a2 2 0 0 1 4 0v12M26 21V11a2 2 0 0 1 4 0v12M30 23v-7a2 2 0 0 1 4 0v12c0 8-4 14-10 14h-2c-4 0-7-2-9-5l-3-5" {...S(sw)} />
    </>
  ),
  lotus: (sw) => (
    <>
      <path d="M24 8c3 5 3 11 0 16-3-5-3-11 0-16Z" {...S(sw)} />
      <path d="M24 24c-4-3-10-3-15 0 5 6 11 6 15 0Z" {...S(sw)} />
      <path d="M24 24c4-3 10-3 15 0-5 6-11 6-15 0Z" {...S(sw)} />
      <path d="M24 24c-5 1-9 5-11 11 7 1 11-3 11-11Z" {...S(sw)} opacity={0.7} />
      <path d="M24 24c5 1 9 5 11 11-7 1-11-3-11-11Z" {...S(sw)} opacity={0.7} />
    </>
  ),
  wheel: (sw) => (
    <>
      <circle cx="24" cy="24" r="16" {...S(sw)} />
      <circle cx="24" cy="24" r="4" {...S(sw)} />
      <path d="M24 8v8M24 32v8M8 24h8M32 24h8M13 13l6 6M29 29l6 6M35 13l-6 6M19 29l-6 6" {...S(sw)} />
    </>
  ),
  orb: (sw) => (
    <>
      <circle cx="24" cy="24" r="9" {...S(sw)} />
      <circle cx="24" cy="24" r="4" {...S(sw)} opacity={0.6} />
      <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4" {...S(sw)} opacity={0.7} />
    </>
  ),
  star: (sw) => (
    <>
      <path d="M24 4l4 14 14 4-14 4-4 14-4-14-14-4 14-4 4-14Z" {...S(sw)} />
      <path d="M24 18v12M18 24h12" {...S(sw)} opacity={0.4} />
    </>
  ),
  gate: (sw) => (
    <>
      <path d="M10 42V18a14 14 0 0 1 28 0v24" {...S(sw)} />
      <path d="M10 42V20M38 42V20" {...S(sw)} />
      <path d="M16 42V24a8 8 0 0 1 16 0v18" {...S(sw)} opacity={0.6} />
      <path d="M6 14 24 4l18 10" {...S(sw)} />
      <circle cx="24" cy="14" r="2" fill="currentColor" />
    </>
  ),
  seed: (sw) => (
    <>
      <path d="M24 26v14M24 26c-2-6 0-12 6-16-1 8-3 12-6 16ZM24 26c2-6 6-9 12-10-3 7-7 10-12 10Z" {...S(sw)} />
      <path d="M8 40h32" {...S(sw)} opacity={0.5} />
    </>
  ),
  web: (sw) => (
    <>
      <circle cx="24" cy="24" r="18" {...S(sw)} opacity={0.3} />
      <circle cx="24" cy="24" r="12" {...S(sw)} opacity={0.5} />
      <circle cx="24" cy="24" r="6" {...S(sw)} opacity={0.7} />
      <path d="M24 6v36M6 24h36M11 11l26 26M37 11 11 37" {...S(sw)} />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />
    </>
  ),
  heart: (sw) => (
    <>
      <path d="M24 40S6 28 6 17a8 8 0 0 1 15-3 8 8 0 0 1 15 3c0 11-12 23-12 23Z" {...S(sw)} />
      <path d="M14 22h4l2-4 3 7 2-5 2 2h5" {...S(sw)} opacity={0.7} />
    </>
  ),
};

export function KarmaIcon({ name, className, strokeWidth = 1.4 }: IconProps) {
  const draw = ICONS[name] ?? ICONS.orb;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {draw(strokeWidth)}
    </svg>
  );
}

export const ICON_NAMES = Object.keys(ICONS);
