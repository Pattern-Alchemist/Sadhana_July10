import type { KarmaCard } from "../data/cards";
import { CATEGORY_MAP, toRoman } from "../data/cards";
import { KarmaIcon } from "./icons";

/* ── Decorative pieces ─────────────────────────────────────────── */

function Mandala({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke={color} strokeLinecap="round">
        <circle cx="100" cy="100" r="94" strokeWidth="0.8" opacity="0.18" />
        <circle cx="100" cy="100" r="80" strokeWidth="0.8" strokeDasharray="2 5" opacity="0.4" />
        <circle cx="100" cy="100" r="60" strokeWidth="0.6" opacity="0.25" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 80}
              y1={100 + Math.sin(a) * 80}
              x2={100 + Math.cos(a) * 90}
              y2={100 + Math.sin(a) * 90}
              strokeWidth="0.8"
              opacity="0.5"
            />
          );
        })}
        <circle cx="100" cy="100" r="46" strokeWidth="0.7" opacity="0.3" />
        <circle cx="100" cy="100" r="6" strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
}

function Flourish({ className = "", color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round">
        <path d="M3 37 Q3 3 37 3" opacity="0.85" />
        <path d="M9 37 Q9 9 37 9" opacity="0.5" />
        <circle cx="6" cy="34" r="1.4" fill={color} stroke="none" />
      </g>
    </svg>
  );
}

/* ── Card face ─────────────────────────────────────────────────── */

interface FaceProps {
  card: KarmaCard;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export function OracleFace({ card, interactive, className = "", onClick }: FaceProps) {
  const cat = CATEGORY_MAP[card.category];
  return (
    <div
      onClick={onClick}
      className={`group relative aspect-[5/7] w-full select-none ${
        interactive ? "cursor-pointer transition-transform duration-500 hover:-translate-y-2" : ""
      } ${className}`}
    >
      {/* Gold frame */}
      <div className="absolute inset-0 rounded-[1.15rem] bg-gradient-to-br from-gold-200 via-gold-500 to-gold-700 p-[1.6px] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)] transition-shadow duration-500 group-hover:shadow-[0_28px_70px_-12px_rgba(0,0,0,0.9)]">
        <div
          className="relative h-full w-full overflow-hidden rounded-[1rem]"
          style={{ background: `linear-gradient(155deg, ${cat.from} 0%, ${cat.to} 100%)` }}
        >
          {/* accent glow */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 36%, ${cat.accent}55 0%, transparent 58%)`,
            }}
          />
          {/* inner hairline frame */}
          <div className="absolute inset-[6px] rounded-[0.7rem] border border-gold-500/25" />
          {/* grain */}
          <div className="grain absolute inset-0 opacity-[0.05] mix-blend-overlay" />

          {/* corner flourishes */}
          <Flourish className="absolute left-2 top-2 h-7 w-7" color={cat.accent} />
          <Flourish className="absolute right-2 top-2 h-7 w-7 -scale-x-100" color={cat.accent} />
          <Flourish className="absolute bottom-2 left-2 h-7 w-7 -scale-y-100" color={cat.accent} />
          <Flourish className="absolute bottom-2 right-2 h-7 w-7 -scale-100" color={cat.accent} />

          {/* Numeral */}
          <div className="absolute inset-x-0 top-3 flex flex-col items-center">
            <span
              className="font-display text-[0.62rem] font-semibold tracking-[0.35em]"
              style={{ color: cat.accent }}
            >
              {toRoman(card.id)}
            </span>
            <span className="mt-0.5 h-px w-7" style={{ background: `${cat.accent}88` }} />
          </div>

          {/* Center: mandala + icon */}
          <div className="absolute inset-x-0 top-[16%] flex justify-center">
            <div className="relative h-[46%] w-[78%]">
              <div className="animate-spin-slow absolute inset-0 opacity-70">
                <Mandala color={cat.accent} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-gold-200 [filter:drop-shadow(0_0_10px_rgba(230,198,108,0.5))]">
                <KarmaIcon
                  name={card.icon}
                  className="h-1/2 w-1/2"
                  strokeWidth={1.3}
                />
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="absolute inset-x-0 bottom-0 px-3 pb-4 text-center">
            <div className="mb-1 flex items-center justify-center gap-2" style={{ color: cat.accent }}>
              <span className="h-px w-5" style={{ background: `${cat.accent}aa` }} />
              <span className="text-[0.5rem]">✦</span>
              <span className="h-px w-5" style={{ background: `${cat.accent}aa` }} />
            </div>
            <h3 className="font-display text-[0.8rem] leading-tight text-parchment drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] sm:text-[0.92rem]">
              {card.name}
            </h3>
            <p
              className="mt-1 text-[0.45rem] font-medium uppercase tracking-[0.28em]"
              style={{ color: `${cat.accent}cc` }}
            >
              {cat.name}
            </p>
          </div>

          {/* interactive sheen */}
          {interactive && (
            <div className="pointer-events-none absolute inset-0 rounded-[1rem] bg-gradient-to-tr from-transparent via-white/0 to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Card back ─────────────────────────────────────────────────── */

export function OracleBack({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[5/7] w-full select-none overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-gold-200 via-gold-500 to-gold-700 p-[1.6px] ${className}`}>
      <div
        className="relative h-full w-full overflow-hidden rounded-[1rem]"
        style={{ background: "linear-gradient(155deg,#1a1340 0%,#0a0716 100%)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,77,255,0.35),transparent_60%)]" />
        <div className="grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />

        {/* mandala back */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin-rev h-[80%] w-[80%] opacity-80">
            <Mandala color="#e6c66c" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 48 48" className="h-10 w-10 text-gold-300">
            <circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <path d="M30 11a14 14 0 1 0 8 9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M30 11l5-3-2 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="33" cy="14" r="1.2" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute inset-x-0 top-5 text-center">
          <p className="font-display text-sm font-semibold tracking-[0.5em] text-gold-200">KARMA</p>
        </div>
        <div className="absolute inset-x-0 bottom-5 text-center">
          <p className="text-[0.45rem] uppercase tracking-[0.45em] text-gold-300/70">Oracle Deck</p>
        </div>
      </div>
    </div>
  );
}
