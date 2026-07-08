"use client";
import { useState, useEffect, useRef } from "react";
import { OmGlyph } from "@/components/Symbols";

export default function MetronomePage() {
  const [bpm, setBpm] = useState(60);
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(0);
  const [audioOn, setAudioOn] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!running) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    const ms = 60000 / bpm;
    intervalRef.current = setInterval(() => {
      setBeat((b) => b + 1);
      if (audioOn) { try { const ctx = new (window.AudioContext||(window as any).webkitAudioContext)(); const o=ctx.createOscillator(); const g=ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value=880; o.type="sine"; g.gain.setValueAtTime(0.1,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.1); o.start(); o.stop(ctx.currentTime+0.1);} catch{} }
      if (navigator.vibrate) navigator.vibrate(20);
    }, ms);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, bpm, audioOn]);

  const swing = beat % 2 === 0 ? "left" : "right";

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6 text-center">
      <header className="fade-up mb-6">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Mantra Speed Metronome</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Maintain consistent recitation rhythm.</p>
      </header>
      <div className="relative mx-auto mb-6 h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-gold)" strokeWidth="0.5" opacity="0.3" />
          <line x1="50" y1="50" x2={swing === "left" ? "20" : "80"} y2={swing === "left" ? "25" : "25"} stroke="var(--color-gold-bright)" strokeWidth="2" strokeLinecap="round" style={{ transition: "all 0.1s ease" }} />
          <circle cx="50" cy="50" r="4" fill="var(--color-gold)" />
        </svg>
      </div>
      <p className="font-display text-4xl text-[var(--color-ivory)] mb-4">{bpm} <span className="text-sm text-[var(--color-bone)]/50">BPM</span></p>
      <input type="range" min={30} max={180} value={bpm} onChange={(e) => setBpm(parseInt(e.target.value))} className="w-full accent-[var(--color-gold)] mb-4" />
      <div className="flex justify-center gap-3">
        <button onClick={() => setRunning((r) => !r)} className="btn-gold text-xs">{running ? "Stop" : "Start"}</button>
        <label className="flex items-center gap-2 text-xs text-[var(--color-bone)]/65"><input type="checkbox" checked={audioOn} onChange={(e)=>setAudioOn(e.target.checked)} className="accent-[var(--color-gold)]" /> Audio</label>
      </div>
    </div>
  );
}
