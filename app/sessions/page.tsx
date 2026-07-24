"use client";
import { useState, useEffect, useRef } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";
import { STEP_TYPES, type SessionStep } from "@/lib/practice-data";

interface SavedSession { id: string; name: string; steps: SessionStep[]; }

export default function SessionsPage() {
  const { data: saved, setData: setSaved } = useVaultData<SavedSession[]>("saved-sessions", []);
  const [steps, setSteps] = useState<SessionStep[]>([]);
  const [name, setName] = useState("");
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepElapsed, setStepElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  function addStep(type: string) {
    const st = STEP_TYPES.find((s) => s.type === type)!;
    setSteps((p) => [...p, { id: crypto.randomUUID(), type: st.type as any, name: st.label, duration: st.defaultDuration }]);
  }
  function removeStep(id: string) { setSteps((p) => p.filter((s) => s.id !== id)); }
  function moveStep(idx: number, dir: number) {
    setSteps((p) => { const n = [...p]; const t = idx + dir; if (t < 0 || t >= n.length) return n; [n[idx], n[t]] = [n[t], n[idx]]; return n; });
  }
  function saveSession() { if (!name || steps.length === 0) return; setSaved((p) => [...p, { id: crypto.randomUUID(), name, steps }]); setName(""); }
  function loadSession(s: SavedSession) { setSteps(s.steps); setName(s.name); }

  function playBell() { try { const ctx = new (window.AudioContext||(window as any).webkitAudioContext)(); const o=ctx.createOscillator(); const g=ctx.createGain(); o.connect(g); g.connect(ctx.destination); o.frequency.value=523.25; o.type="sine"; g.gain.setValueAtTime(0.15,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+2); o.start(); o.stop(ctx.currentTime+2);} catch{} if(navigator.vibrate) navigator.vibrate(100); }

  const totalMin = steps.reduce((s, st) => s + st.duration, 0);

  useEffect(() => {
    if (!running) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setStepElapsed((e) => {
        const next = e + 1;
        const current = steps[currentStep];
        if (current && next >= current.duration * 60) {
          playBell();
          if (currentStep + 1 < steps.length) { setCurrentStep((c) => c + 1); return 0; }
          else { setRunning(false); setCurrentStep(0); playBell(); setTimeout(playBell, 1500); return 0; }
        }
        return next;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running, steps, currentStep]);

  const current = steps[currentStep];
  const remaining = current ? current.duration * 60 - stepElapsed : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Practice Session Builder</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Compose multi-step sessions. Auto-transitions with bell.</p>
      </header>

      {running && current ? (
        <div className="rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-6 text-center">
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Step {currentStep + 1} of {steps.length}</p>
          <p className="mt-2 font-display text-2xl text-[var(--color-gold-bright)]">{current.name}</p>
          <p className="mt-4 font-display text-5xl text-[var(--color-ivory)] tabular-nums">{Math.floor(remaining/60)}:{String(remaining%60).padStart(2,"0")}</p>
          <button onClick={() => { setRunning(false); setCurrentStep(0); setStepElapsed(0); }} className="mt-4 btn-ghost text-xs">Stop</button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-2">
            {STEP_TYPES.map((st) => (
              <button key={st.type} onClick={() => addStep(st.type)} className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-[var(--color-bone)]/65 transition hover:border-[var(--color-gold)]/60 hover:text-[var(--color-gold-bright)]">
                {st.icon} {st.label}
              </button>
            ))}
          </div>
          {steps.length === 0 ? (
            <p className="text-center text-sm text-[var(--color-bone)]/50 py-8">Add steps above to build your session.</p>
          ) : (
            <div className="space-y-2 mb-4">
              {steps.map((st, i) => (
                <div key={st.id} className="flex items-center gap-2 rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-3">
                  <span className="text-[0.5rem] text-[var(--color-bone)]/40 w-4">{i + 1}</span>
                  <span className="flex-1 text-sm text-[var(--color-ivory)]">{st.name}</span>
                  <input type="number" value={st.duration} onChange={(e) => setSteps((p) => p.map((s, j) => j === i ? { ...s, duration: parseInt(e.target.value) || 1 } : s))} className="w-12 rounded-sm border border-[var(--hairline)] bg-[var(--color-obsidian)] px-1 text-xs text-[var(--color-bone)] text-center" />
                  <span className="text-[0.5rem] text-[var(--color-bone)]/40">min</span>
                  <button onClick={() => moveStep(i, -1)} className="text-xs text-[var(--color-bone)]/40 hover:text-[var(--color-gold-bright)]">↑</button>
                  <button onClick={() => moveStep(i, 1)} className="text-xs text-[var(--color-bone)]/40 hover:text-[var(--color-gold-bright)]">↓</button>
                  <button onClick={() => removeStep(st.id)} className="text-xs text-[var(--color-rose-accent)]/60 hover:text-[var(--color-rose-accent)]">✕</button>
                </div>
              ))}
            </div>
          )}
          {steps.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--color-bone)]/55">Total: {totalMin} min</span>
              <button onClick={() => { setRunning(true); setCurrentStep(0); setStepElapsed(0); }} className="btn-gold text-xs">Begin Session</button>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Session name" className="flex-1 rounded-sm border border-[var(--hairline)] bg-[var(--color-obsidian)] px-2 py-1 text-xs text-[var(--color-bone)]" />
              <button onClick={saveSession} className="btn-ghost text-xs">Save</button>
            </div>
          )}
          {saved.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 font-display text-sm text-[var(--color-gold-bright)]">Saved Sessions</h2>
              {saved.map((s) => (
                <button key={s.id} onClick={() => loadSession(s)} className="block w-full rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/30 p-3 text-left transition hover:border-[var(--color-gold)]/40">
                  <span className="text-sm text-[var(--color-ivory)]">{s.name}</span>
                  <span className="ml-2 text-[0.5rem] text-[var(--color-bone)]/40">{s.steps.length} steps · {s.steps.reduce((a, st) => a + st.duration, 0)} min</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
