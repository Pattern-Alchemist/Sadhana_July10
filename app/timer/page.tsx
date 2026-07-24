"use client";

import { useState, useEffect, useRef } from "react";
import { useVaultData, type JournalEntry } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

export default function TimerPage() {
  const [duration, setDuration] = useState(20); // minutes
  const [intervalBell, setIntervalBell] = useState(10); // minutes, 0 = off
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const [siddhiName, setSiddhiName] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { setData: setJournal } = useVaultData<JournalEntry[]>("journal", []);

  function playBell(freq: number) {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 3);
    } catch {}
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  }

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        // Interval bell
        if (intervalBell > 0 && next > 0 && next % (intervalBell * 60) === 0 && next < duration * 60) {
          playBell(440);
        }
        // End bell
        if (next >= duration * 60) {
          playBell(660);
          setTimeout(() => playBell(523.25), 1500);
          setRunning(false);
          // Auto-log to journal
          const today = new Date().toISOString().slice(0, 10);
          setJournal((prev) => [{
            id: crypto.randomUUID(),
            date: today,
            siddhiName: siddhiName || "Meditation",
            duration: duration,
            createdAt: new Date().toISOString(),
          }, ...prev]);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, duration, intervalBell, siddhiName, setJournal]);

  const totalSec = duration * 60;
  const progress = (elapsed / totalSec) * 100;
  const remaining = totalSec - elapsed;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;

  function start() { setRunning(true); }
  function pause() { setRunning(false); }
  function reset() { setRunning(false); setElapsed(0); }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Meditation Timer · Auto-logs to Journal
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Practice Timer
        </h1>
      </header>

      <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-6 text-center sm:p-8">
        {/* Timer display */}
        <div className="relative mx-auto mb-6 h-48 w-48 sm:h-56 sm:w-56">
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.2" />
            <circle
              cx="100" cy="100" r="90" fill="none"
              stroke="var(--color-gold-bright)" strokeWidth="3"
              strokeDasharray={`${(progress / 100) * 565.5} 565.5`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dasharray 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-display text-5xl text-[var(--color-ivory)] sm:text-6xl tabular-nums">
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </p>
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
              of {duration} min
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {!running ? (
            <button onClick={start} className="btn-gold text-xs sm:text-sm">
              {elapsed > 0 ? "Resume" : "Begin"}
            </button>
          ) : (
            <button onClick={pause} className="btn-ghost text-xs sm:text-sm">Pause</button>
          )}
          <button onClick={reset} className="btn-ghost text-xs sm:text-sm">Reset</button>
        </div>

        {/* Settings */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Duration (min)</label>
            <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} disabled={running} className="field mt-1 text-sm">
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={45}>45</option>
              <option value={60}>60</option>
            </select>
          </div>
          <div>
            <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Interval Bell (min)</label>
            <select value={intervalBell} onChange={(e) => setIntervalBell(parseInt(e.target.value))} disabled={running} className="field mt-1 text-sm">
              <option value={0}>Off</option>
              <option value={5}>Every 5</option>
              <option value={10}>Every 10</option>
              <option value={15}>Every 15</option>
              <option value={20}>Every 20</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <input
            type="text"
            value={siddhiName}
            onChange={(e) => setSiddhiName(e.target.value)}
            placeholder="Practice name (optional — auto-logged to journal)"
            className="field text-sm"
          />
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--color-bone)]/45">
        Bell sounds: start (no bell), interval (A4), end (E5 → C5). Auto-logs session to journal on completion.
      </p>
    </div>
  );
}
