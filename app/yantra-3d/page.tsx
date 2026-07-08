"use client";
import { useState, useEffect } from "react";
import { YANTRAS } from "@/lib/yantra-data";
import { OmGlyph } from "@/components/Symbols";

export default function Yantra3DPage() {
  const [slug, setSlug] = useState(YANTRAS[0].slug);
  const [rotating, setRotating] = useState(true);
  const [angle, setAngle] = useState(0);
  const yantra = YANTRAS.find((y) => y.slug === slug)!;

  useEffect(() => {
    if (!rotating) return;
    const id = setInterval(() => setAngle((a) => (a + 0.3) % 360), 30);
    return () => clearInterval(id);
  }, [rotating]);

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6 text-center">
      <header className="fade-up mb-6">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">3D Yantra Viewer</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Slow rotation for meditative viewing.</p>
      </header>
      <select value={slug} onChange={(e) => setSlug(e.target.value)} className="field text-sm mb-6">
        {YANTRAS.map((y) => <option key={y.slug} value={y.slug}>{y.title}</option>)}
      </select>
      <div className="relative h-80 w-80 mx-auto" style={{ perspective: "800px" }}>
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d", transform: `rotateY(${angle}deg) rotateX(15deg)` }}>
          {/* Layered planes at different z-depths */}
          <div className="absolute" style={{ transform: "translateZ(0px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={yantra.file} alt={yantra.title} className="w-64 h-64 opacity-30" style={{ filter: "blur(2px)" }} />
          </div>
          <div className="absolute" style={{ transform: "translateZ(20px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={yantra.file} alt={yantra.title} className="w-64 h-64 opacity-50" />
          </div>
          <div className="absolute" style={{ transform: "translateZ(40px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={yantra.file} alt={yantra.title} className="w-64 h-64 opacity-80" />
          </div>
          <div className="absolute" style={{ transform: "translateZ(60px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={yantra.file} alt={yantra.title} className="w-64 h-64 opacity-100" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <button onClick={() => setRotating(!rotating)} className="btn-ghost text-xs">{rotating ? "Pause" : "Rotate"}</button>
      </div>
      <p className="mt-3 text-xs italic text-[var(--color-bone)]/55">{yantra.title} · {yantra.sanskrit}</p>
    </div>
  );
}
