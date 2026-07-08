"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";
import OfferingButton from "./OfferingButton";
import { useVaultData, type JournalEntry } from "@/components/useVaultData";
import type { RitualConfig, InteractionMode, RitualLifecycleCallbacks } from "@/lib/ritual-machine";
import { getDefaultInteractionMode } from "@/lib/ritual-machine";

/**
 * RitualExperience — top-level client container for a guided ritual.
 *
 * v2.5.1 refinements:
 *   - Manages interaction mode (hold/tap) at the session level
 *   - Handles Escape key → exit ritual
 *   - Passes reduced-motion and mode flags down to OfferingButton
 *   - Tap mode toggle always visible on each step
 */
export default function RitualExperience({ ritual, onExit, callbacks }: { ritual: RitualConfig; onExit?: () => void; callbacks?: RitualLifecycleCallbacks }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mode, setMode] = useState<InteractionMode>(getDefaultInteractionMode());
  const { setData: setJournal } = useVaultData<JournalEntry[]>("journal", []);
  const startTimeRef = useRef<string>(new Date().toISOString());

  // Escape key → exit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onExit]);

  const setModeWithCallback = useCallback((newMode: InteractionMode) => {
    setMode((prev) => {
      if (prev !== newMode) {
        callbacks?.onModeChanged?.(prev, newMode);
      }
      return newMode;
    });
  }, [callbacks]);

  const step = ritual.steps[currentStep];
  const isLastStep = currentStep === ritual.steps.length - 1;
  const progressPct = Math.round((currentStep / ritual.steps.length) * 100);

  const handleStepComplete = useCallback(() => {
    // Fire lifecycle callback
    callbacks?.onStepCompleted?.(currentStep, step, mode);

    if (isLastStep) {
      setCompleted(true);
      // Fire ritual-complete callback
      const durationMs = Date.now() - new Date(startTimeRef.current).getTime();
      callbacks?.onRitualComplete?.(ritual.id, durationMs, mode);

      // Auto-log to journal
      const today = new Date().toISOString().slice(0, 10);
      setJournal((prev) => [{
        id: crypto.randomUUID(),
        date: today,
        siddhiName: ritual.title,
        duration: Math.round(ritual.steps.reduce((s, st) => s + st.holdMs, 0) / 60000),
        insights: `Completed ${ritual.title} ritual (${ritual.steps.length} offerings)`,
        createdAt: new Date().toISOString(),
      }, ...prev]);
    } else {
      // Advance after brief pause
      setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        // Fire step-start callback for the next step
        callbacks?.onStepStart?.(nextStep, ritual.steps[nextStep]);
      }, 600);
    }
  }, [isLastStep, ritual, setJournal, currentStep, step, mode, callbacks]);

  if (completed) {
    return (
      <div className="mx-auto max-w-md px-4 pb-20 pt-8 text-center sm:px-6">
        <div className="mb-6 text-[var(--color-gold)]/70">
          <OmGlyph style={{ fontSize: "2.5rem" }} />
        </div>
        <div className="rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-8">
          <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">Ritual Complete</p>
          <h2 className="mt-3 font-display text-2xl text-[var(--color-gold-bright)]">{ritual.title}</h2>
          {ritual.sanskrit && (
            <p className="mt-1 font-display text-base italic text-[var(--color-gold)]/70">{ritual.sanskrit}</p>
          )}
          <p className="mt-4 text-sm text-[var(--color-bone)]/70">
            All {ritual.steps.length} offerings have been made.
            The ritual has been logged to your practice journal.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => { setCurrentStep(0); setCompleted(false); }}
              className="btn-ghost text-xs"
            >
              Repeat Ritual
            </button>
            <a href="/journal" className="btn-gold text-xs">View Journal</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.6rem" }} />
        </div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">{ritual.title}</h1>
        {ritual.sanskrit && (
          <p className="mt-0.5 font-display text-sm italic text-[var(--color-gold)]/70">{ritual.sanskrit}</p>
        )}
        {ritual.deity && (
          <p className="mt-1 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">For {ritual.deity}</p>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between">
          <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
            Step {currentStep + 1} of {ritual.steps.length}
          </span>
          <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]/60">
            {progressPct}% complete
          </span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[var(--color-obsidian)]">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-gold-deep)] to-[var(--color-gold-bright)] transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Step title */}
      <div className="mb-6 text-center">
        <h2 className="font-display text-lg text-[var(--color-gold-bright)]">{step.title}</h2>
      </div>

      {/* Offering button */}
      <OfferingButton key={step.id} step={step} onComplete={handleStepComplete} mode={mode} onModeToggle={setModeWithCallback} />

      {/* Instruction hint for first step */}
      {currentStep === 0 && (
        <p className="mt-6 text-center text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/35">
          {mode === "tap"
            ? "Tap the icon to make each offering"
            : "Press and hold the icon until the ring completes, then release"}
        </p>
      )}

      {/* Step indicators */}
      <div className="mt-8 flex justify-center gap-1.5">
        {ritual.steps.map((s, i) => (
          <div
            key={s.id}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              i < currentStep
                ? "bg-[var(--color-sage)]"
                : i === currentStep
                ? "bg-[var(--color-gold-bright)] w-4"
                : "bg-[var(--color-bone)]/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
