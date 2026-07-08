"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import {
  transitionStandard,
  transitionRitual,
  fadeUp,
  completionPulse,
} from "@/motion/variants";
import { durations, opacity } from "@/motion/tokens";
import { useKeyboardRitual } from "@/hooks/useKeyboardRitual";
import { tapHaptic, chargeHaptic, successHaptic } from "@/lib/haptic-manager";
import { getAudioManager } from "@/lib/audio-manager";

interface JapaCounterProps {
  /** Target count (usually 108 for mala) */
  targetCount?: number;
  /** Mantra text for display */
  mantraText?: string;
  /** Called when target is reached */
  onComplete?: () => void;
  /** Reduced motion preference */
  prefersReducedMotion?: boolean;
}

/**
 * JapaCounter
 * ===========
 * Mantra repetition counter with:
 * - Touch-friendly tap interface
 * - Keyboard support (Spacebar/Enter)
 * - Haptic feedback for each count
 * - Audio confirmation
 * - Progress visualization
 * - Reduced-motion support
 *
 * Mobile thumb use: Large tap area, bottom-positioned
 */
export function JapaCounter({
  targetCount = 108,
  mantraText,
  onComplete,
  prefersReducedMotion = false,
}: JapaCounterProps) {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioManager = React.useRef(getAudioManager());

  const progress = count / targetCount;
  const isComplete = count >= targetCount;

  const incrementCount = useCallback(async () => {
    if (isComplete) return;

    setIsAnimating(true);

    // Haptic feedback
    await tapHaptic();

    // Audio feedback
    audioManager.current?.playSound("bell-tap");

    setCount((prev) => {
      const newCount = prev + 1;

      // Check if completed
      if (newCount >= targetCount) {
        setRounds((r) => r + 1);
        setTimeout(() => onComplete?.(), 300);
      }

      return newCount;
    });

    setTimeout(() => setIsAnimating(false), 100);
  }, [isComplete, targetCount, onComplete]);

  const resetCounter = useCallback(() => {
    setCount(0);
    setRounds(0);
  }, []);

  const skipToEnd = useCallback(() => {
    setCount(targetCount);
    setRounds((r) => r + 1);
    successHaptic();
    audioManager.current?.playSound("chime-complete");
    onComplete?.();
  }, [targetCount, onComplete]);

  // Keyboard support via hook
  const { keyboardHandlers, isHoldingViaKeyboard } = useKeyboardRitual({
    onHoldStart: incrementCount,
    onCancel: resetCounter,
    announceStates: true,
  });

  // Pre-announce instructions
  useEffect(() => {
    const announcement = `Japa counter. Target: ${targetCount} repetitions. Press Spacebar or tap to increment. Current count: ${count}.`;
    if (typeof window !== "undefined") {
      const region = document.querySelector('[aria-live]');
      if (!region) {
        const div = document.createElement("div");
        div.setAttribute("aria-live", "polite");
        div.className = "sr-only";
        document.body.appendChild(div);
      }
    }
  }, [targetCount]);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col items-center justify-center min-h-screen bg-background px-4 pb-12"
    >
      {/* Mantra display */}
      {mantraText && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: durations.emphasis,
            ease: "easeOut",
          }}
          className="mb-8 text-center max-w-2xl"
        >
          <p className="text-sm uppercase tracking-luxe text-foreground/60 mb-2">
            Mantra
          </p>
          <p className="text-lg font-serif text-foreground/80 leading-relaxed">
            {mantraText}
          </p>
        </motion.div>
      )}

      {/* Progress ring */}
      <motion.div
        className="relative w-40 h-40 mb-8"
        animate={{ rotate: isAnimating ? 360 : 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: "easeInOut",
        }}
      >
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/10"
          />

          {/* Progress circle */}
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 70}`}
            strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress)}`}
            strokeLinecap="round"
            className="text-accent origin-center -rotate-90"
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: "easeOut",
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={count}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { scale: 0.5, opacity: 0 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            transition={transitionRitual}
            className="text-4xl font-serif font-bold text-accent"
          >
            {count}
          </motion.div>
          <p className="text-sm text-foreground/60 mt-1">
            of {targetCount}
          </p>
        </div>
      </motion.div>

      {/* Status and rounds */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: durations.ui,
          delay: 0.2,
        }}
      >
        {isComplete ? (
          <motion.div
            variants={completionPulse}
            initial="hidden"
            animate="visible"
            className="text-accent"
          >
            <p className="text-2xl font-serif mb-2">✨ Complete!</p>
            <p className="text-sm text-foreground/70">
              {rounds} round{rounds !== 1 ? "s" : ""} of {targetCount}
            </p>
          </motion.div>
        ) : (
          <div>
            <p className="text-base text-foreground/70">
              {progress > 0 && (
                <span>
                  {Math.round(progress * 100)}% complete
                </span>
              )}
            </p>
            <p className="text-xs text-foreground/50 mt-1">
              Round {rounds + 1}
            </p>
          </div>
        )}
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col gap-4 w-full max-w-xs mb-8">
        {/* Main counter button */}
        <motion.button
          {...keyboardHandlers}
          onClick={incrementCount}
          disabled={isComplete}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          className={`
            relative py-6 px-8 rounded-lg font-serif text-lg
            transition-all duration-200
            ${
              isComplete
                ? "bg-accent/30 text-accent/50 cursor-not-allowed"
                : "bg-accent text-accent-foreground hover:bg-accent/90 active:scale-95"
            }
            ${isHoldingViaKeyboard ? "ring-2 ring-accent ring-offset-2" : ""}
          `}
          aria-label={`Increment counter. Current count: ${count} of ${targetCount}`}
        >
          <span className="absolute inset-0 flex items-center justify-center">
            {isComplete ? "Complete" : isAnimating ? "✓" : "Tap to Count"}
          </span>
        </motion.button>

        {/* Secondary actions */}
        {isComplete ? (
          <motion.button
            onClick={resetCounter}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="py-3 px-6 border border-foreground/20 rounded-lg text-sm
              hover:border-foreground/40 hover:bg-foreground/5 transition-colors"
          >
            Reset Counter
          </motion.button>
        ) : (
          <motion.button
            onClick={skipToEnd}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            className="py-3 px-6 border border-foreground/20 rounded-lg text-sm text-foreground/60
              hover:border-foreground/40 hover:bg-foreground/5 transition-colors"
          >
            Skip to End
          </motion.button>
        )}
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: durations.ui,
          delay: 0.4,
        }}
        className="text-center text-xs text-foreground/50 space-y-1"
      >
        <p>Tap the button or press Spacebar to increment</p>
        <p>Press Escape to reset</p>
      </motion.div>
    </motion.div>
  );
}

export default JapaCounter;
