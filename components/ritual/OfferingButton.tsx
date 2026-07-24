"use client";

import { useRef, useState, useEffect } from "react";
import { useOfferingPress } from "./useOfferingPress";
import RitualSymbol from "./RitualSymbol";
import type { RitualStep, OfferingKind, InteractionMode } from "@/lib/ritual-machine";

/**
 * OfferingButton — the core ritual interaction component.
 *
 * v2.5.3 refinements:
 *   - Uses native <button> element (built-in keyboard/focus semantics)
 *   - ARIA labels for screen readers: aria-label, aria-live status region
 *   - Mode labels refined: "Full" / "Reduced motion" / "Tap mode"
 *   - Keyboard hint text explicitly differs from pointer hint
 *   - Focus ring always visible (CSS :focus-visible)
 *
 * Per-kind visual effects:
 *   fire:     flame grows during hold, spark wave on release
 *   water:    bowl fills during hold, ripple on release
 *   flower:   petals gather during hold, float on release
 *   incense:  ember glows during hold, smoke trail on release
 *   mantra:   pulse ring + particle halo during hold
 *   bell:     rapid pulse ring on tap
 */
export default function OfferingButton({
  step,
  onComplete,
  mode = "full",
  onModeToggle,
}: {
  step: RitualStep;
  onComplete: () => void;
  mode?: InteractionMode;
  onModeToggle?: (mode: InteractionMode) => void;
}) {
  const { progress, status, bind, reducedMotion } = useOfferingPress({ holdMs: step.holdMs, mode });
  const completedRef = useRef(false);

  // Trigger onComplete when status reaches "completed"
  useEffect(() => {
    if (status === "completed" && !completedRef.current) {
      completedRef.current = true;
      const timer = window.setTimeout(onComplete, 300);
      return () => window.clearTimeout(timer);
    }

    if (status === "idle" && completedRef.current) {
      completedRef.current = false;
    }
  }, [status, onComplete]);

  const isCharged = status === "charged" || status === "released" || status === "completed";
  const isReleased = status === "released" || status === "completed";
  const isCancelled = status === "cancelled";

  // ARIA-friendly status text for screen readers.
  // Per bati-itao: announce state transitions only, NOT every progress
  // percentage — frequent changes in polite live regions create a poor
  // screen reader experience. Announce: start of charging, charged,
  // completion, cancellation. Do NOT announce intermediate percentages.
  const ariaStatus = status === "idle" ? step.instruction
    : status === "pressing" ? "Charging offering."
    : status === "charged" ? "Offering charged. Release to offer."
    : status === "released" ? step.successLabel
    : status === "completed" ? `${step.successLabel}. Step complete.`
    : status === "cancelled" ? "Offering cancelled. Try again."
    : "";

  // Instruction text — separates ritual instruction from keyboard shortcut.
  // Per MDN: visible instruction should not imply required press-and-hold
  // for keyboard users who are using Enter/Space as a shortcut.
  const instructionText = mode === "tap"
    ? "Tap to offer."
    : `${step.instruction} Keyboard: press Enter or Space to offer immediately.`;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Progress ring + offering icon */}
      <div className="relative h-40 w-40 sm:h-48 sm:w-48">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* Background ring */}
          <circle cx="100" cy="100" r="85" fill="none" stroke="var(--color-gold)" strokeWidth="1.5" opacity="0.15" />

          {/* Progress arc */}
          <circle
            cx="100" cy="100" r="85" fill="none"
            stroke={getKindColor(step.kind)}
            strokeWidth="3"
            strokeDasharray={`${progress * 534.07} 534.07`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{ transition: status === "pressing" ? "none" : "stroke-dasharray 0.4s cubic-bezier(0.16,1,0.3,1)" }}
          />

          {/* Charged halo */}
          {isCharged && (
            <circle
              cx="100" cy="100" r="95"
              fill="none"
              stroke={getKindColor(step.kind)}
              strokeWidth="0.5"
              opacity="0.4"
              className="offering-halo"
            />
          )}

          {/* Released burst ring */}
          {isReleased && (
            <circle
              cx="100" cy="100" r="70"
              fill="none"
              stroke={getKindColor(step.kind)}
              strokeWidth="2"
              className="offering-burst"
            />
          )}
        </svg>

        {/* Native <button> — built-in keyboard/focus semantics.
            Uses `disabled` (not just aria-disabled) so the button is truly
            non-interactive when completed. Per kittygiraudel/digitala11y:
            use `disabled` when the button must not be activated. */}
        <button
          {...bind}
          disabled={status === "completed"}
          className="absolute inset-0 m-auto grid h-24 w-24 place-items-center rounded-full transition motion-safe:active:scale-95 sm:h-28 sm:w-28 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-bright)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-obsidian)]"
          style={{
            background: status === "pressing"
              ? `radial-gradient(circle, ${getKindColor(step.kind)}30 0%, transparent 70%)`
              : isCharged
              ? `radial-gradient(circle, ${getKindColor(step.kind)}25 0%, transparent 70%)`
              : "radial-gradient(circle, rgba(201,152,94,0.1) 0%, transparent 70%)",
            border: `1px solid ${getKindColor(step.kind)}40`,
            cursor: status === "completed" ? "default" : "pointer",
            transform: status === "pressing" ? "scale(0.97)" : isCharged ? "scale(1.02)" : "scale(1)",
            transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
            touchAction: "none",
          }}
          aria-label={`${step.title}: ${step.instruction}`}
        >
          {/* Ritual symbol — inline SVG + Motion animation per offering type */}
          <RitualSymbol kind={step.kind} progress={progress} status={status} icon={step.icon} />
        </button>
      </div>

      {/* aria-live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {ariaStatus}
      </div>

      {/* Instruction text */}
      <div className="text-center" aria-hidden="true">
        {status === "idle" && (
          <p className="text-sm text-[var(--color-bone)]/70">{instructionText}</p>
        )}
        {status === "pressing" && (
          <p className="text-xs uppercase tracking-luxe text-[var(--color-gold)]/70 animate-pulse">
            {reducedMotion ? "Charging…" : `Charging… ${Math.round(progress * 100)}%`}
          </p>
        )}
        {status === "charged" && (
          <p className="text-xs uppercase tracking-luxe text-[var(--color-gold-bright)]">
            {mode === "tap" ? "✦ Offering…" : "✦ Ready — Release to offer"}
          </p>
        )}
        {status === "released" && (
          <p className="text-sm text-[var(--color-gold-bright)]">
            {step.successLabel} ✦
          </p>
        )}
        {status === "completed" && (
          <p className="text-sm text-[var(--color-sage)]">
            ✓ {step.successLabel}
          </p>
        )}
        {status === "cancelled" && (
          <p className="text-xs text-[var(--color-bone)]/40">Released too early — try again</p>
        )}
      </div>

      {/* Interaction mode toggle — always visible, clear labels */}
      {onModeToggle && (
        <div className="mt-2 flex items-center justify-center gap-2" role="group" aria-label="Interaction mode">
          <button
            onClick={() => onModeToggle("full")}
            aria-pressed={mode === "full"}
            className={`text-[0.5rem] uppercase tracking-luxe transition ${
              mode === "full" ? "text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/30 hover:text-[var(--color-gold)]/60"
            }`}
          >
            Full
          </button>
          <span className="text-[var(--color-bone)]/20" aria-hidden="true">·</span>
          <button
            onClick={() => onModeToggle("reduced")}
            aria-pressed={mode === "reduced"}
            className={`text-[0.5rem] uppercase tracking-luxe transition ${
              mode === "reduced" ? "text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/30 hover:text-[var(--color-gold)]/60"
            }`}
          >
            Reduced motion
          </button>
          <span className="text-[var(--color-bone)]/20" aria-hidden="true">·</span>
          <button
            onClick={() => onModeToggle("tap")}
            aria-pressed={mode === "tap"}
            className={`text-[0.5rem] uppercase tracking-luxe transition ${
              mode === "tap" ? "text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/30 hover:text-[var(--color-gold)]/60"
            }`}
          >
            Tap mode
          </button>
        </div>
      )}

      {/* Mantra text (for mantra offerings) */}
      {step.mantraText && (status === "pressing" || status === "charged") && (
        <p className="font-display text-xl text-[var(--color-gold-bright)] tracking-wide animate-pulse" aria-hidden="true">
          {step.mantraText}
        </p>
      )}
    </div>
  );
}

// ---------- Per-offering-kind visuals ----------

function OfferingVisual({
  kind,
  progress,
  status,
  icon,
}: {
  kind: OfferingKind;
  progress: number;
  status: string;
  icon: string;
}) {
  const isCharged = status === "charged" || status === "released" || status === "completed";

  return (
    <div className="relative grid place-items-center">
      {/* Base icon */}
      <span
        className="text-4xl transition-all duration-300"
        style={{
          filter: status === "pressing"
            ? `brightness(${0.5 + progress * 0.5}) drop-shadow(0 0 ${progress * 12}px ${getKindColor(kind)})`
            : isCharged
            ? `brightness(1.3) drop-shadow(0 0 16px ${getKindColor(kind)})`
            : "brightness(0.7)",
          transform: status === "pressing" ? `scale(${0.8 + progress * 0.2})` : isCharged ? "scale(1.15)" : "scale(1)",
        }}
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Kind-specific particle effects during press */}
      {status === "pressing" && progress > 0.1 && (
        <KindParticles kind={kind} progress={progress} />
      )}

      {/* Released effect */}
      {isCharged && (
        <KindReleaseEffect kind={kind} />
      )}
    </div>
  );
}

function KindParticles({ kind, progress }: { kind: OfferingKind; progress: number }) {
  const color = getKindColor(kind);
  const count = Math.floor(progress * 6);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const dist = 20 + progress * 30;
        return (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`,
              backgroundColor: color,
              opacity: progress * 0.8,
              transition: "transform 0.2s ease-out, opacity 0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
}

function KindReleaseEffect({ kind }: { kind: OfferingKind }) {
  const color = getKindColor(kind);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Expanding ring */}
      <span
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          borderColor: color,
          animation: "offering-expand 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      />
    </div>
  );
}

function getKindColor(kind: OfferingKind): string {
  switch (kind) {
    case "fire": return "var(--color-gold-bright)";
    case "water": return "var(--color-cyan-accent)";
    case "flower": return "var(--color-rose-accent)";
    case "incense": return "var(--color-purple-accent)";
    case "mantra": return "var(--color-gold)";
    case "bell": return "var(--color-sage)";
    default: return "var(--color-gold)";
  }
}
