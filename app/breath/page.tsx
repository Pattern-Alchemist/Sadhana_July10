"use client";

import { useState, useEffect, useRef } from "react";
import { OmGlyph } from "@/components/Symbols";

interface BreathPattern {
  id: string;
  name: string;
  sanskrit?: string;
  inhale: number; // seconds
  hold?: number;  // seconds (after inhale)
  exhale: number; // seconds
  holdAfter?: number; // seconds (after exhale)
  description: string;
}

const PATTERNS: BreathPattern[] = [
  {
    id: "kumbhaka-silence",
    name: "Kumbhaka of Silence",
    sanskrit: "कुम्भक",
    inhale: 6, hold: 12, exhale: 6,
    description: "Inhale 6s — Hold 12s — Exhale 6s. The longer you stay in stillness, the more the mind dissolves into silence.",
  },
  {
    id: "whisper-breath",
    name: "Whisper Breath",
    inhale: 8, exhale: 8,
    description: "Inhale as if sipping through a straw. Exhale with a gentle 'Hmmmm…'",
  },
  {
    id: "spine-flame",
    name: "Spine Flame Breath",
    inhale: 7, exhale: 7,
    description: "Visualize a flame rising along your spine as you inhale. As you exhale, feel it spread light through your body.",
  },
  {
    id: "shaman-triangle",
    name: "Shaman's Triangle",
    inhale: 3, hold: 3, exhale: 5,
    description: "Three sharp inhales through the nose. Hold and tap sternum. Exhale with sound.",
  },
  {
    id: "quantum-pause",
    name: "The Quantum Pause",
    inhale: 5, hold: 2, exhale: 5, holdAfter: 2,
    description: "Between inhale and exhale, pause. Do nothing. Let awareness rest in the pause.",
  },
  {
    id: "box-breathing",
    name: "Box Breathing",
    inhale: 4, hold: 4, exhale: 4, holdAfter: 4,
    description: "Equal four-count breath. Used by Navy SEALs for calm under pressure.",
  },
  {
    id: "nadi-shuddhi",
    name: "Nāḍī Śuddhi",
    sanskrit: "नाडी शुद्धि",
    inhale: 4, exhale: 4,
    description: "Alternate-nostril breath purification. Close right nostril, inhale left. Close left, exhale right. Alternate.",
  },
];

type Phase = "inhale" | "hold" | "exhale" | "holdAfter";

export default function BreathTimerPage() {
  const [pattern, setPattern] = useState<BreathPattern>(PATTERNS[0]);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [phaseTime, setPhaseTime] = useState(0);
  const [round, setRound] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const phaseDuration = pattern[phase] ?? 0;

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setPhaseTime((t) => {
        if (t + 1 >= phaseDuration) {
          // Move to next phase
          setPhase((prev) => {
            const phases: Phase[] = ["inhale", "hold", "exhale", "holdAfter"];
            const currentIdx = phases.indexOf(prev);
            // Skip phases with duration 0
            let nextIdx = (currentIdx + 1) % phases.length;
            while (pattern[phases[nextIdx]] === undefined || pattern[phases[nextIdx]] === 0) {
              if (nextIdx === currentIdx) break;
              nextIdx = (nextIdx + 1) % phases.length;
            }
            if (phases[nextIdx] === "inhale") {
              setRound((r) => r + 1);
            }
            return phases[nextIdx];
          });
          return 0;
        }
        return t + 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, phase, phaseDuration, pattern]);

  // Audio cue on phase change
  useEffect(() => {
    if (!running || !audioEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      // Different frequency for each phase
      const freq = phase === "inhale" ? 523.25 : phase === "exhale" ? 392.00 : 440.00;
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } catch {}
    // Vibrate on mobile
    if (navigator.vibrate) navigator.vibrate(30);
  }, [phase, running, audioEnabled]);

  function start() { setRunning(true); setPhase("inhale"); setPhaseTime(0); setRound(0); }
  function stop() { setRunning(false); setPhase("inhale"); setPhaseTime(0); setRound(0); }
  function pause() { setRunning(false); }

  const phaseLabel = phase === "inhale" ? "Inhale" : phase === "hold" ? "Hold" : phase === "exhale" ? "Exhale" : "Pause";
  const phaseColor = phase === "inhale" ? "var(--color-cyan-accent)" : phase === "hold" || phase === "holdAfter" ? "var(--color-gold-bright)" : "var(--color-rose-accent)";
  const progress = phaseDuration > 0 ? (phaseTime / phaseDuration) * 100 : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Prāṇāyāma · Breath Practice
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Breath Timer
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Guided breath patterns with visual ring, audio cues, and haptic feedback.
        </p>
      </header>

      {/* Pattern selector */}
      <div className="mb-6">
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Select Pattern</label>
        <select
          value={pattern.id}
          onChange={(e) => { setPattern(PATTERNS.find((p) => p.id === e.target.value)!); stop(); }}
          className="field mt-1 text-sm"
        >
          {PATTERNS.map((p) => (
            <option key={p.id} value={p.id}>{p.name}{p.sanskrit ? ` (${p.sanskrit})` : ""}</option>
          ))}
        </select>
      </div>

      {/* Timer display */}
      <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6 text-center sm:p-8">
        {/* Visual ring */}
        <div className="relative mx-auto mb-6 h-48 w-48 sm:h-56 sm:w-56">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.2" />
            <circle
              cx="100" cy="100" r="90" fill="none"
              stroke={phaseColor} strokeWidth="3"
              strokeDasharray={`${(progress / 100) * 565.5} 565.5`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dasharray 0.5s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[0.5rem] uppercase tracking-luxe" style={{ color: phaseColor }}>{phaseLabel}</p>
            <p className="font-display text-5xl text-[var(--color-ivory)] sm:text-6xl">
              {phaseDuration - phaseTime}
            </p>
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
              Round {round}
            </p>
          </div>
        </div>

        {/* Pattern description */}
        <p className="mx-auto max-w-md text-xs italic leading-relaxed text-[var(--color-bone)]/65">
          {pattern.description}
        </p>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {!running ? (
            <button onClick={start} className="btn-gold text-xs sm:text-sm">
              {round > 0 ? "Restart" : "Begin"}
            </button>
          ) : (
            <button onClick={pause} className="btn-ghost text-xs sm:text-sm">Pause</button>
          )}
          <button onClick={stop} className="btn-ghost text-xs sm:text-sm">Reset</button>
          <label className="flex items-center gap-2 text-xs text-[var(--color-bone)]/65">
            <input type="checkbox" checked={audioEnabled} onChange={(e) => setAudioEnabled(e.target.checked)} className="accent-[var(--color-gold)]" />
            Audio cues
          </label>
        </div>
      </div>

      {/* Pattern timing visualization */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[0.5rem] uppercase tracking-luxe">
        <span className="text-[var(--color-cyan-accent)]">Inhale {pattern.inhale}s</span>
        {pattern.hold ? <span className="text-[var(--color-gold-bright)]">· Hold {pattern.hold}s</span> : null}
        <span className="text-[var(--color-rose-accent)]">· Exhale {pattern.exhale}s</span>
        {pattern.holdAfter ? <span className="text-[var(--color-gold-bright)]">· Pause {pattern.holdAfter}s</span> : null}
      </div>
    </div>
  );
}
