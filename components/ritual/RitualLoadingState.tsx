"use client";

import React from "react";
import { motion } from "motion/react";
import { durations, easings, opacity } from "@/motion/tokens";

interface RitualLoadingStateProps {
  /** The ritual name or phase being prepared */
  label?: string;
  /** Whether reduced motion is enabled */
  prefersReducedMotion?: boolean;
  /** Custom message */
  message?: string;
}

/**
 * RitualLoadingState
 * ==================
 * Calm, contemplative loading screen for ritual preparation.
 *
 * In reduced-motion mode, shows a simple pulsing dot.
 * Otherwise, shows a gentle spiral or glow animation.
 */
export function RitualLoadingState({
  label = "Preparing ritual",
  prefersReducedMotion = false,
  message = "Gathering offerings...",
}: RitualLoadingStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: durations.ui, ease: easings.standard as any }}
      className="min-h-screen flex items-center justify-center bg-background px-4"
    >
      <div className="text-center max-w-sm">
        {/* Loading animation */}
        <div className="mb-8 h-20 flex items-center justify-center">
          {prefersReducedMotion ? (
            /* Reduced motion: simple pulsing dot */
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              className="w-4 h-4 rounded-full bg-accent"
            />
          ) : (
            /* Full motion: spiral glow */
            <div className="relative w-16 h-16">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="absolute inset-0 border-2 border-transparent border-t-accent border-r-accent rounded-full"
              />

              {/* Inner pulsing glow */}
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="absolute inset-2 rounded-full bg-accent/20"
              />

              {/* Center dot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>
            </div>
          )}
        </div>

        {/* Label */}
        {label && (
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: durations.emphasis,
              ease: easings.standard as any,
              delay: 0.1,
            }}
            className="text-xl font-serif text-foreground mb-2"
          >
            {label}
          </motion.h2>
        )}

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: durations.emphasis,
              ease: easings.standard as any,
              delay: 0.2,
            }}
            className="text-foreground/60 text-sm"
          >
            {message}
          </motion.p>
        )}

        {/* Loading dots animation (optional secondary indicator) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: durations.emphasis,
            ease: easings.standard as any,
            delay: 0.3,
          }}
          className="mt-6 flex justify-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1 h-1 rounded-full bg-accent/60"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * Skeleton loading state for ritual content
 * Use when loading ritual details but UI layout is known
 */
export function RitualContentSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: durations.ui }}
      className="space-y-4"
    >
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="h-12 bg-foreground/10 rounded"
        />
      ))}
    </motion.div>
  );
}

export default RitualLoadingState;
