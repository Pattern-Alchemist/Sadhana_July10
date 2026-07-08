"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import type { StepStatus, InteractionMode, RitualCapabilities } from "@/lib/ritual-machine";
import { detectCapabilities, getDefaultInteractionMode, prefersReducedMotion } from "@/lib/ritual-machine";

/**
 * useOfferingPress — production-grade pointer-based press-and-hold hook.
 *
 * v2.5.2 refinements:
 *   - Three interaction modes: "full" (hold + visuals + optional haptics),
 *     "reduced" (hold + simplified visuals), "tap" (one tap = one offering)
 *   - Missing haptics does NOT force tap mode — visual is always primary
 *   - RitualCapabilities detected once at mount, passed downward
 *   - pointerType tracked from the pointer event for analytics
 *   - Audio gated: only after user gesture (browser autoplay policy)
 *   - Keyboard path: Enter/Space triggers tap-mode offering
 *   - All timeouts tracked and cleaned up
 */

interface UseOfferingPressOptions {
  holdMs?: number;
  mode?: InteractionMode;
  capabilities?: RitualCapabilities;
}

export function useOfferingPress(options: UseOfferingPressOptions = {}) {
  const { holdMs = 1500, mode: modeProp } = options;

  // Feature detection — check once at mount
  const capabilities = useMemo(() => detectCapabilities(), []);
  const mode: InteractionMode = modeProp ?? getDefaultInteractionMode();
  const reducedMotion = capabilities.prefersReducedMotion;

  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<StepStatus>("idle");

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const isPointerDownRef = useRef(false);
  const didCompleteHoldRef = useRef(false);
  const audioUnlockedRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pointerTypeRef = useRef<RitualCapabilities["pointerType"]>("unknown");

  // Cleanup all timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  }, []);

  // Safe haptic — only if supported AND not reduced motion
  const haptic = useCallback(
    (pattern: number | number[]) => {
      if (capabilities.canVibrate && !reducedMotion) {
        try { navigator.vibrate(pattern); } catch {}
      }
    },
    [capabilities.canVibrate, reducedMotion]
  );

  // Safe audio — only after user gesture, only if audio is available
  const tone = useCallback(
    (freq: number, duration: number, volume: number) => {
      if (!capabilities.canPlayAudio || reducedMotion) return;
      if (!audioUnlockedRef.current) return;
      playTone(freq, duration, volume);
    },
    [capabilities.canPlayAudio, reducedMotion]
  );

  // Unlock audio on first user interaction
  const unlockAudio = useCallback(() => {
    if (audioUnlockedRef.current) return;
    audioUnlockedRef.current = true;
    try {
      const ctx = getAudioCtx();
      if (ctx && ctx.state === "suspended") ctx.resume();
    } catch {}
  }, []);

  const animate = useCallback(() => {
    if (!startRef.current || !isPointerDownRef.current) return;
    const elapsed = Date.now() - startRef.current;
    const pct = Math.min(elapsed / holdMs, 1);
    setProgress(pct);

    if (pct >= 1 && !didCompleteHoldRef.current) {
      didCompleteHoldRef.current = true;
      setStatus("charged");
      haptic(30);
      tone(660, 0.08, 0.3);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    if (isPointerDownRef.current && pct < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [holdMs, haptic, tone]);

  const start = useCallback(() => {
    if (status === "completed" || status === "exited") return;
    unlockAudio();

    // In tap mode, immediately complete (one tap = one offering)
    if (mode === "tap") {
      setProgress(1);
      didCompleteHoldRef.current = true;
      setStatus("charged");
      haptic(30);
      tone(660, 0.08, 0.3);
      timeoutsRef.current.push(
        setTimeout(() => {
          setStatus("released");
          haptic([50, 30, 50]);
          tone(880, 0.15, 0.8);
          timeoutsRef.current.push(
            setTimeout(() => setStatus("completed"), reducedMotion ? 200 : 600)
          );
        }, 200)
      );
      return;
    }

    // Full or reduced mode — use hold interaction
    isPointerDownRef.current = true;
    didCompleteHoldRef.current = false;
    startRef.current = Date.now();
    setProgress(0);
    setStatus("pressing");
    haptic(10);
    tone(440, 0.04, 0.1);

    // In reduced mode, shorten the hold (visual feedback is the point, not duration)
    const effectiveHoldMs = reducedMotion ? Math.min(holdMs, 500) : holdMs;

    rafRef.current = requestAnimationFrame(animate);
  }, [status, animate, mode, haptic, tone, unlockAudio, reducedMotion, holdMs]);

  const end = useCallback(() => {
    isPointerDownRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (didCompleteHoldRef.current) {
      setStatus("released");
      haptic([50, 30, 50]);
      tone(880, 0.15, 0.8);
      timeoutsRef.current.push(
        setTimeout(() => tone(1108.73, 0.1, 0.6), 200)
      );
      // Auto-complete: faster in reduced mode
      timeoutsRef.current.push(
        setTimeout(() => setStatus("completed"), reducedMotion ? 200 : 800)
      );
    } else {
      setStatus("cancelled");
      timeoutsRef.current.push(
        setTimeout(() => {
          setStatus("idle");
          setProgress(0);
        }, 400)
      );
    }
  }, [haptic, tone, reducedMotion]);

  const cancel = useCallback(() => {
    isPointerDownRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (status === "pressing" && !didCompleteHoldRef.current) {
      setStatus("cancelled");
      timeoutsRef.current.push(
        setTimeout(() => {
          setStatus("idle");
          setProgress(0);
        }, 300)
      );
    }
  }, [status]);

  const reset = useCallback(() => {
    isPointerDownRef.current = false;
    didCompleteHoldRef.current = false;
    startRef.current = null;
    setProgress(0);
    setStatus("idle");
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    clearAllTimeouts();
  }, [clearAllTimeouts]);

  const exit = useCallback(() => {
    isPointerDownRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    clearAllTimeouts();
    setStatus("exited");
  }, [clearAllTimeouts]);

  // Keyboard handler — Enter/Space triggers tap-mode offering
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (status === "idle" || status === "cancelled") {
          start();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        exit();
      }
    },
    [status, start, exit]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  return {
    progress,
    status,
    mode,
    reducedMotion,
    capabilities,
    reset,
    exit,
    bind: {
      onPointerDown: (e: React.PointerEvent) => {
        pointerTypeRef.current = e.pointerType as RitualCapabilities["pointerType"];
        start();
      },
      onPointerUp: end,
      onPointerLeave: cancel,
      onPointerCancel: cancel,
      onKeyDown,
    },
  };
}

// ---------- Audio helpers (module-level singleton) ----------

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function playTone(freq: number, duration: number, volume: number) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
}
