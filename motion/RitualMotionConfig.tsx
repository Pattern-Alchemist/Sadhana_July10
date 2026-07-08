"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * RitualMotionConfig — top-level provider for the Motion system.
 *
 * Wraps the entire app with <MotionConfig reducedMotion="user"> so that
 * all Motion components automatically respect the user's system-level
 * prefers-reduced-motion setting.
 *
 * Also provides a context with the capabilities object so child
 * components can check reducedMotion, canVibrate, etc. without
 * re-running matchMedia on every render.
 */

interface MotionContextValue {
  prefersReducedMotion: boolean;
  canVibrate: boolean;
  canPlayAudio: boolean;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function useMotionContext(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    // Fallback — should not happen in normal use
    return {
      prefersReducedMotion: false,
      canVibrate: false,
      canPlayAudio: false,
    };
  }
  return ctx;
}

export default function RitualMotionConfig({ children }: { children: ReactNode }) {
  // Detect capabilities once at mount
  const value = useMemo<MotionContextValue>(() => {
    return {
      prefersReducedMotion:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      canVibrate:
        typeof navigator !== "undefined" && "vibrate" in navigator,
      canPlayAudio:
        typeof window !== "undefined" &&
        !!(window.AudioContext || (window as any).webkitAudioContext),
    };
  }, []);

  return (
    <MotionContext.Provider value={value}>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.24 }}>
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}
