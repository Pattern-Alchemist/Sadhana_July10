"use client";

import { useState, useEffect, useRef } from "react";
import { useVaultData, type JapaSession } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

export default function JapaMalaPage() {
  const { data: sessions, setData: setSessions } = useVaultData<JapaSession[]>("japa-sessions", []);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [siddhiName, setSiddhiName] = useState("");
  const [sessionActive, setSessionActive] = useState(false);

  const totalToday = sessions
    .filter((s) => s.date === new Date().toISOString().slice(0, 10))
    .reduce((sum, s) => sum + s.count, 0);
  const totalAllTime = sessions.reduce((sum, s) => sum + s.count, 0);

  function increment() {
    const next = count + 1;
    setCount(next);
    // Haptic feedback on mobile
    if (navigator.vibrate) navigator.vibrate(20);
    // Chime at 108
    if (next === 108) {
      playChime();
      if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
    }
    if (next >= target) {
      playChime();
    }
  }

  function playChime() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880; // A5
      osc.type = "sine";
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.5);
    } catch {
      // AudioContext not available
    }
  }

  function saveSession() {
    if (count === 0) return;
    const session: JapaSession = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      siddhiName: siddhiName || undefined,
      count,
      target,
      completed: count >= target,
    };
    setSessions((prev) => [session, ...prev]);
    setCount(0);
    setSessionActive(false);
  }

  function reset() {
    setCount(0);
    setSessionActive(false);
  }

  const progress = Math.min((count / target) * 100, 100);
  const beadAngle = (count % 108) * (360 / 108);

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Encrypted · Local Only
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Digital Japa Mālā
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Tap to count. Haptic feedback on mobile. Audio chime at 108.
        </p>
      </header>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-[var(--hairline)] bg-[var(--color-gold)]/15">
        <div className="bg-[var(--color-ink)] p-3 text-center sm:p-4">
          <p className="font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">{totalToday}</p>
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">Today</p>
        </div>
        <div className="bg-[var(--color-ink)] p-3 text-center sm:p-4">
          <p className="font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">{totalAllTime.toLocaleString()}</p>
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">All Time</p>
        </div>
        <div className="bg-[var(--color-ink)] p-3 text-center sm:p-4">
          <p className="font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">{sessions.length}</p>
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">Sessions</p>
        </div>
      </div>

      {/* Mālā counter */}
      <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6 text-center sm:p-8">
        {/* Visual mālā ring */}
        <div className="relative mx-auto mb-6 h-48 w-48 sm:h-56 sm:w-56">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
            {/* Outer ring */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.3" />
            {/* Progress arc */}
            <circle
              cx="100" cy="100" r="90" fill="none"
              stroke="var(--color-gold-bright)" strokeWidth="2"
              strokeDasharray={`${(progress / 100) * 565.5} 565.5`}
              strokeDashoffset="0"
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dasharray 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />
            {/* Meru bead (top) */}
            <circle cx="100" cy="10" r="6" fill="var(--color-gold-bright)" />
            {/* Current position indicator */}
            <g transform={`rotate(${beadAngle} 100 100)`}>
              <circle cx="100" cy="10" r="5" fill="var(--color-ivory)" opacity="0.9" />
            </g>
          </svg>
          {/* Count display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-display text-5xl text-[var(--color-ivory)] sm:text-6xl">{count}</p>
            <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]/70">/ {target}</p>
          </div>
        </div>

        {/* Tap button */}
        <button
          onClick={increment}
          className="mx-auto block h-32 w-32 rounded-full border-2 border-[var(--color-gold)] bg-gradient-to-b from-[var(--color-gold)]/20 to-[var(--color-gold-deep)]/10 text-center transition motion-safe:active:scale-95 sm:h-36 sm:w-36"
          style={{ transitionDuration: "var(--dur-instant)" }}
        >
          <span className="font-display text-2xl text-[var(--color-gold-bright)]">TAP</span>
          <br />
          <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">to count</span>
        </button>

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <select
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value))}
            className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)] px-3 py-1.5 text-xs text-[var(--color-bone)]"
          >
            <option value={108}>108 (1 mālā)</option>
            <option value={216}>216 (2 mālā)</option>
            <option value={324}>324 (3 mālā)</option>
            <option value={1008}>1008</option>
          </select>
          <input
            type="text"
            value={siddhiName}
            onChange={(e) => setSiddhiName(e.target.value)}
            placeholder="Practice name (optional)"
            className="w-40 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)] px-3 py-1.5 text-xs text-[var(--color-bone)]"
          />
          <button onClick={saveSession} className="btn-gold text-xs" disabled={count === 0}>
            Save Session
          </button>
          <button onClick={reset} className="btn-ghost text-xs" disabled={count === 0}>
            Reset
          </button>
        </div>
      </div>

      {/* Recent sessions */}
      {sessions.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-display text-lg text-[var(--color-gold-bright)]">Recent Sessions</h2>
          <div className="space-y-2">
            {sessions.slice(0, 10).map((s) => (
              <div key={s.id} className="flex items-center justify-between rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 px-4 py-2.5">
                <div>
                  <p className="text-sm text-[var(--color-ivory)]">{s.siddhiName ?? "Practice"}</p>
                  <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                    {new Date(s.date).toLocaleDateString()} · {s.count} japa
                  </p>
                </div>
                {s.completed && <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-sage)]">✓ Complete</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
