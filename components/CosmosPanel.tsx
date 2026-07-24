"use client";

import { useEffect, useMemo, useState } from "react";
import { computeCosmos, degMin, type PlanetPosition } from "@/lib/cosmology";
import { BinduSun } from "./Symbols";

export default function CosmosPanel() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setNow(new Date()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const cosmos = useMemo(
    () => (now ? computeCosmos(now) : null),
    [now]
  );

  if (!now || !cosmos) {
    return (
      <div className="grid h-64 place-items-center text-[var(--color-bone)]/40">
        <span className="pulse-glow">consulting the heavens…</span>
      </div>
    );
  }

  const all: PlanetPosition[] = [...cosmos.planets, cosmos.moonNode];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 px-5 py-3">
        <div>
          <span className="text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/50">
            Snapshot · UTC
          </span>
          <p className="font-display text-base text-[var(--color-ivory)]">
            {now.toUTCString().slice(0, 25)}
          </p>
        </div>
        <button
          onClick={() => setNow(new Date())}
          className="btn-ghost px-4 py-2 text-xs"
        >
          ↻ Recompute
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Sky wheel */}
        <div className="flex items-center justify-center">
          <SkyWheel positions={all} />
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-sm border border-[var(--hairline)]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--hairline)] bg-[var(--color-ink)]/60 text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
                <th className="px-4 py-2.5">Graha</th>
                <th className="px-4 py-2.5">Rāśi (sidereal)</th>
                <th className="px-4 py-2.5 hidden sm:table-cell">Deg</th>
                <th className="px-4 py-2.5 text-right">State</th>
              </tr>
            </thead>
            <tbody>
              {all.map((p) => (
                <tr
                  key={p.name}
                  className="border-b border-[var(--hairline)]/50 transition hover:bg-[var(--color-gold)]/5"
                >
                  <td className="px-4 py-2.5">
                    <span className="mr-2 text-base text-[var(--color-gold-bright)]">
                      {p.symbol}
                    </span>
                    <span className="font-display text-[0.95rem] text-[var(--color-ivory)]">
                      {p.sanskrit}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="mr-1.5 text-[var(--color-purple-accent)]">
                      {p.sign.symbol}
                    </span>
                    <span className="text-sm text-[var(--color-bone)]/85">
                      {p.sign.vedic}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 hidden text-sm text-[var(--color-bone)]/65 sm:table-cell">
                    {degMin(p.sidereal)}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    {p.retrograde ? (
                      <span className="badge text-[var(--color-rose-accent)]" style={{ borderColor: "var(--color-rose-accent)" }}>
                        ℞ Rx
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--color-sage)]">direct</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-sm border border-[var(--hairline)] p-4 text-sm leading-relaxed text-[var(--color-bone)]/75">
          <span className="text-[0.58rem] uppercase tracking-luxe text-[var(--color-gold)]">
            Lahiri Ayanamsa
          </span>
          <p className="mt-1 font-display text-lg text-[var(--color-ivory)]">
            {cosmos.ayanamsa.toFixed(3)}°
          </p>
          <p className="mt-1 text-xs text-[var(--color-bone)]/55">
            The offset subtracted from tropical longitude to yield the sidereal
            (Vedic) zodiac used here.
          </p>
        </div>
        <div className="rounded-sm border border-[var(--color-rose-accent)]/25 bg-[var(--color-rose-accent)]/5 p-4 text-xs leading-relaxed text-[var(--color-bone)]/70">
          <span className="text-[0.58rem] uppercase tracking-luxe text-[var(--color-rose-accent)]">
            Editorial note
          </span>
          <p className="mt-1.5">
            Positions are computed by a simplified Keplerian model (Schlyter,
            J2000) for contemplative study — they are <em>not</em> ephemeris-grade
            and may differ by a degree or two from professional software. The
            Archive presents the cosmos as a mirror of contemplative rhythm, not
            as an instrument of prediction.
          </p>
        </div>
      </div>
    </div>
  );
}

function SkyWheel({ positions }: { positions: PlanetPosition[] }) {
  const R = 150;
  const center = 170;
  const toXY = (lon: number, r: number) => {
    const rad = (lon - 90) * (Math.PI / 180);
    return { x: center + r * Math.cos(rad), y: center + r * Math.sin(rad) };
  };

  return (
    <svg viewBox={`0 0 ${center * 2} ${center * 2}`} className="w-full max-w-[340px]">
      {/* zodiac ring */}
      <circle cx={center} cy={center} r={R} fill="none" stroke="var(--color-gold)" strokeWidth={0.8} opacity={0.6} />
      <circle cx={center} cy={center} r={R - 24} fill="none" stroke="var(--color-gold)" strokeWidth={0.4} opacity={0.3} />
      <circle cx={center} cy={center} r={R - 70} fill="none" stroke="var(--color-gold)" strokeWidth={0.4} opacity={0.2} />

      {/* 12 sign dividers + glyphs */}
      {Array.from({ length: 12 }).map((_, i) => {
        const lon = i * 30;
        const a = (lon - 90) * (Math.PI / 180);
        const inner = toXY(lon, R - 24);
        const outer = toXY(lon, R);
        const label = toXY(lon + 15, R - 11);
        const signs = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
        return (
          <g key={i}>
            <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="var(--color-gold)" strokeWidth={0.5} opacity={0.5} />
            <text x={label.x} y={label.y} fontSize={11} fill="var(--color-bone)" opacity={0.7} textAnchor="middle" dominantBaseline="central">
              {signs[i]}
            </text>
            <line
              x1={center + (R - 24) * Math.cos(a)}
              y1={center + (R - 24) * Math.sin(a)}
              x2={center + (R - 70) * Math.cos(a)}
              y2={center + (R - 70) * Math.sin(a)}
              stroke="var(--color-gold)"
              strokeWidth={0.3}
              opacity={0.25}
            />
          </g>
        );
      })}

      {/* center */}
      <foreignObject x={center - 22} y={center - 22} width={44} height={44}>
        <div className="flex h-full w-full items-center justify-center text-[var(--color-gold-bright)]">
          <BinduSun size={30} />
        </div>
      </foreignObject>

      {/* planets */}
      {positions.map((p) => {
        const pt = toXY(p.sidereal, R - 46);
        return (
          <g key={p.name}>
            <line x1={center} y1={center} x2={pt.x} y2={pt.y} stroke="var(--color-gold)" strokeWidth={0.4} opacity={0.18} />
            <circle cx={pt.x} cy={pt.y} r={11} fill="var(--color-ink)" stroke="var(--color-gold-bright)" strokeWidth={0.6} />
            <text x={pt.x} y={pt.y} fontSize={11} fill="var(--color-gold-bright)" textAnchor="middle" dominantBaseline="central">
              {p.symbol}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
