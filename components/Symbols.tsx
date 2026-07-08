import type { CSSProperties } from "react";

/**
 * Sacred-geometry iconography rendered as inline SVG.
 * Crisp at any scale, themeable via currentColor.
 */

export function SriYantraGlyph({
  className = "",
  size = 220,
}: {
  className?: string;
  size?: number;
}) {
  const cx = 100;
  // 9 interlocking triangles, stylised.
  const up = (h: number, w: number) =>
    `${cx - w},${50 + h} ${cx + w},${50 + h} ${cx},${50 + h - h * 1.4}`;
  const down = (h: number, w: number) =>
    `${cx - w},${50 - h * 0.4} ${cx + w},${50 - h * 0.4} ${cx},${50 - h * 0.4 + h * 1.4}`;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.6}
    >
      <circle cx="100" cy="100" r="96" opacity={0.5} />
      <circle cx="100" cy="100" r="84" opacity={0.35} />
      <g>
        <polygon points={up(46, 50)} />
        <polygon points={up(40, 42)} />
        <polygon points={up(34, 34)} />
        <polygon points={up(28, 26)} />
        <polygon points={down(50, 44)} />
        <polygon points={down(44, 36)} />
        <polygon points={down(38, 28)} />
        <polygon points={down(32, 20)} />
        <polygon points={down(26, 12)} />
      </g>
      <circle cx="100" cy="100" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LotusGlyph({
  className = "",
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
    >
      {petals.map((a) => (
        <ellipse
          key={a}
          cx="50"
          cy="30"
          rx="9"
          ry="24"
          transform={`rotate(${a} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" opacity={0.85} />
    </svg>
  );
}

export function BinduSun({
  className = "",
  size = 36,
  spin = false,
}: {
  className?: string;
  size?: number;
  spin?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`${className} ${spin ? "spin-slow" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <circle cx="50" cy="50" r="9" fill="currentColor" stroke="none" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + Math.cos(a) * 16}
            y1={50 + Math.sin(a) * 16}
            x2={50 + Math.cos(a) * 30}
            y2={50 + Math.sin(a) * 30}
          />
        );
      })}
      <circle cx="50" cy="50" r="40" opacity={0.4} />
    </svg>
  );
}

export function Trikona({
  className = "",
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth={1.6}>
      <polygon points="50,8 92,84 8,84" />
      <polygon points="50,26 78,76 22,76" opacity={0.5} />
      <circle cx="50" cy="62" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OmGlyph({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`font-display ${className}`}
      style={style}
      aria-hidden
    >
      ॐ
    </span>
  );
}

/** A horizontal flourish divider: line — diamond — line. */
export function FlourishDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-gold)]/60 sm:w-28" />
      <span className="text-[var(--color-gold)] text-xs rotate-45 inline-block">◆</span>
      <span className="text-[var(--color-gold-bright)] text-lg">✦</span>
      <span className="text-[var(--color-gold)] text-xs rotate-45 inline-block">◆</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-gold)]/60 sm:w-28" />
    </div>
  );
}

/** Category → glyph map for compact use in cards. */
export function CategoryGlyph({ category }: { category: string }) {
  const c = category.toLowerCase();
  let glyph = "✦";
  if (c.includes("mantra")) glyph = "ॐ";
  else if (c.includes("yantra")) glyph = "✶";
  else if (c.includes("ritual")) glyph = "☥";
  else if (c.includes("meditat")) glyph = "☉";
  else if (c.includes("prāṇ") || c.includes("pran")) glyph = "≈";
  else if (c.includes("dhāra") || c.includes("dhara")) glyph = "◎";
  return (
    <span className="font-display text-2xl text-[var(--color-gold-bright)]" aria-hidden>
      {glyph}
    </span>
  );
}
