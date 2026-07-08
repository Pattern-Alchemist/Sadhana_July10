/**
 * Motion Policy Layer
 * ====================
 * Applies motion behavior based on user preferences, device capabilities, and screen context.
 *
 * Treats reduced-motion as a DUAL mode:
 * 1. Accessibility: User prefers minimal motion (prefers-reduced-motion: reduce)
 * 2. Performance: Lower-end device or weak network (applied via same layer)
 *
 * This unified approach ensures both accessibility and performance are handled
 * through a single system without duplicating logic.
 */

import type { InteractionMode } from "@/lib/ritual-machine";
import type { Transition, Variants } from "motion/react";
import { durations, easings, springs } from "./tokens";

/**
 * MotionPolicy — determines which animations/transitions are applied.
 * Computed once at mount based on capabilities.
 */
export interface MotionPolicy {
  // Mode determined by reduced-motion + capability detection
  interactionMode: InteractionMode;
  reducedMotion: boolean;
  supportsSpring: boolean;

  // Applied to all transitions by default
  defaultTransition: Transition;
  // For fast interactions (press, hover)
  quickTransition: Transition;
  // For ritual moments (charging, release, completion)
  ritualTransition: Transition;
  // For hero/entrance (cinematic moments)
  entranceTransition: Transition;

  // Motion profile for current screen
  // "ritual" = charged animations, ceremonial pacing
  // "analytical" = calmer, clarity-focused
  motionProfile: "ritual" | "analytical";
}

/**
 * Create a motion policy based on capabilities.
 * This is the single function that determines how motion behaves app-wide.
 */
export function createMotionPolicy(options: {
  prefersReducedMotion: boolean;
  canVibrate: boolean;
  canPlayAudio: boolean;
  isLowPerformance?: boolean; // Set true if FCP is slow, device is low-end, etc.
  motionProfile?: "ritual" | "analytical";
}): MotionPolicy {
  // If reduced motion preference OR low performance, apply reduced motion policy
  const shouldReduceMotion = options.prefersReducedMotion || options.isLowPerformance;
  const isRitualProfile = options.motionProfile === "ritual";

  return {
    interactionMode: shouldReduceMotion ? "reduced" : "full",
    reducedMotion: shouldReduceMotion,
    supportsSpring: !shouldReduceMotion,

    // Default transition — used for most UI updates
    defaultTransition: shouldReduceMotion
      ? { duration: durations.fast, ease: easings.standard as any }
      : { duration: durations.ui, ease: easings.standard as any },

    // Quick transition — for press/hover/immediate feedback
    quickTransition: shouldReduceMotion
      ? { duration: durations.instant, ease: easings.standard as any }
      : { duration: durations.fast, ease: easings.standard as any },

    // Ritual transition — for offering charge/release/completion
    // In reduced motion, this is a fade rather than scale + glow
    ritualTransition: shouldReduceMotion
      ? { duration: durations.ui, ease: easings.standard as any }
      : isRitualProfile
        ? { duration: durations.ritual, ease: easings.ritual as any }
        : { duration: durations.emphasis, ease: easings.standard as any },

    // Entrance transition — for hero and section reveals
    entranceTransition: shouldReduceMotion
      ? { duration: durations.ui, ease: easings.standard as any }
      : { duration: durations.ceremonial, ease: easings.ritual as any },

    motionProfile: options.motionProfile || "ritual",
  };
}

/**
 * Apply motion policy to a transition object.
 * Use this when you need to override transition timing based on policy.
 */
export function applyMotionPolicy(
  baseTransition: Transition,
  policy: MotionPolicy,
): Transition {
  if (!policy.reducedMotion) return baseTransition;

  // In reduced motion, simplify to standard fast transition
  return { duration: durations.fast, ease: easings.standard as any };
}

/**
 * Reduced-motion variant wrapper.
 * Takes a full variant and a reduced-motion variant, returns the appropriate one.
 */
export function reduceMotionVariant(
  fullVariant: Variants,
  reducedVariant: Variants,
  shouldReduce: boolean,
): Variants {
  return shouldReduce ? reducedVariant : fullVariant;
}

/**
 * Create a ritual animation variant that responds to motion policy.
 * If reduced motion, returns opacity-only fade. Otherwise, full scale + glow.
 */
export function ritualAnimationVariant(policy: MotionPolicy): {
  idle: object;
  charging: object;
  charged: object;
  releasing: object;
} {
  if (policy.reducedMotion) {
    // Reduced motion: simple opacity fade
    return {
      idle: { opacity: 0.7, filter: "brightness(1)" },
      charging: { opacity: 0.85, filter: "brightness(1.1)" },
      charged: { opacity: 1, filter: "brightness(1.2)" },
      releasing: { opacity: 0.5, filter: "brightness(0.8)" },
    };
  }

  // Full ritual animation
  return {
    idle: { scale: 1, opacity: 0.7, filter: "brightness(1)" },
    charging: { scale: 1.03, opacity: 0.9, filter: "brightness(1.15)" },
    charged: { scale: 1.08, opacity: 1, filter: "brightness(1.35)", boxShadow: "0 0 40px rgba(230,192,137,0.6)" },
    releasing: { scale: 1.2, opacity: 0.5, filter: "brightness(0.8)", boxShadow: "0 0 20px rgba(230,192,137,0.2)" },
  };
}

/**
 * Check if an element should be animated at all.
 * Returns false if motion is reduced OR if element is off-screen (optional perf optimization).
 */
export function shouldAnimate(policy: MotionPolicy, isVisible?: boolean): boolean {
  if (policy.reducedMotion) return false;
  if (isVisible === false) return false;
  return true;
}

/**
 * Get stagger timing based on policy.
 * In reduced motion, stagger is minimal or disabled.
 */
export function getStaggerTiming(
  policy: MotionPolicy,
  itemCount: number,
): { staggerChildren: number; delayChildren: number } {
  if (policy.reducedMotion) {
    return { staggerChildren: 0, delayChildren: 0 };
  }
  // Standard stagger: slower for ritual profile
  const baseStagger = policy.motionProfile === "ritual" ? 0.1 : 0.06;
  return { staggerChildren: baseStagger, delayChildren: 0.05 };
}
