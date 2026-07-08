/**
 * Ritual Motion System OSS — Motion Variants
 * ===========================================
 * Reusable Motion (framer-motion) variants for the entire product.
 * Every variant uses the centralized tokens — no hardcoded values.
 *
 * Usage:
 *   import { fadeUp, staggerContainer } from "@/motion/variants";
 *   motion.div with variants={fadeUp} initial="hidden" animate="visible"
 *   motion.div with variants={staggerContainer} for staggered children
 */

import { durations, easings, scale, opacity, shadows, stagger } from "./tokens";
import type { Variants, Transition } from "motion/react";

// ---------- Transition presets ----------

export const transitionStandard: Transition = {
  duration: durations.ui,
  ease: easings.standard as any,
};

export const transitionExit: Transition = {
  duration: durations.fast,
  ease: easings.exit as any,
};

export const transitionRitual: Transition = {
  duration: durations.ritual,
  ease: easings.ritual as any,
};

export const transitionEmphasis: Transition = {
  duration: durations.emphasis,
  ease: easings.standard as any,
};

// ---------- Entrance variants ----------

/** fadeIn — simple opacity reveal */
export const fadeIn: Variants = {
  hidden: { opacity: opacity.hidden },
  visible: { opacity: opacity.visible, transition: transitionStandard },
  exit: { opacity: opacity.hidden, transition: transitionExit },
};

/** fadeUp — opacity + translateY (small, non-layout-shifting) */
export const fadeUp: Variants = {
  hidden: { opacity: opacity.hidden, y: 16 },
  visible: { opacity: opacity.visible, y: 0, transition: transitionEmphasis },
  exit: { opacity: opacity.hidden, y: 8, transition: transitionExit },
};

/** heroReveal — cinematic entrance with blur-to-clear */
export const heroReveal: Variants = {
  hidden: {
    opacity: opacity.hidden,
    y: 24,
    filter: "blur(8px) brightness(0.6)",
    scale: 0.98,
  },
  visible: {
    opacity: opacity.visible,
    y: 0,
    filter: "blur(0px) brightness(1)",
    scale: 1,
    transition: {
      duration: durations.ceremonial,
      ease: easings.ritual as any,
    },
  },
  exit: {
    opacity: opacity.hidden,
    filter: "blur(4px)",
    transition: transitionExit,
  },
};

// ---------- Container variants ----------

/** staggerContainer — parent that staggers children */
export const staggerContainer: Variants = {
  hidden: { opacity: opacity.hidden },
  visible: {
    opacity: opacity.visible,
    transition: {
      ...stagger.standard,
      delayChildren: 0.05,
    },
  },
};

/** staggerRitual — slower stagger for ceremonial sequences */
export const staggerRitual: Variants = {
  hidden: { opacity: opacity.hidden },
  visible: {
    opacity: opacity.visible,
    transition: {
      ...stagger.ritual,
      delayChildren: 0.1,
    },
  },
};

/** staggerHero — for word-by-word hero text reveals */
export const staggerHero: Variants = {
  hidden: { opacity: opacity.hidden },
  visible: {
    opacity: opacity.visible,
    transition: {
      ...stagger.hero,
      delayChildren: 0.2,
    },
  },
};

// ---------- Overlay / Modal variants ----------

/** overlayBackdrop — for modal/drawer background dim */
export const overlayBackdrop: Variants = {
  hidden: { opacity: opacity.hidden },
  visible: { opacity: opacity.backdrop, transition: transitionStandard },
  exit: { opacity: opacity.hidden, transition: transitionExit },
};

/** modalEnter — for modal content (scale + opacity + translateY) */
export const modalEnter: Variants = {
  hidden: {
    opacity: opacity.hidden,
    scale: 0.96,
    y: 20,
  },
  visible: {
    opacity: opacity.visible,
    scale: 1,
    y: 0,
    transition: {
      duration: durations.emphasis,
      ease: easings.standard as any,
    },
  },
  exit: {
    opacity: opacity.hidden,
    scale: 0.98,
    y: 10,
    transition: transitionExit,
  },
};

/** sheetSlideUp — for bottom sheets, drawers */
export const sheetSlideUp: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: durations.emphasis,
      ease: easings.standard as any,
    },
  },
  exit: {
    y: "100%",
    transition: {
      duration: durations.fast,
      ease: easings.exit as any,
    },
  },
};

/** drawerSlideRight — for right-side drawers */
export const drawerSlideRight: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: {
      duration: durations.emphasis,
      ease: easings.standard as any,
    },
  },
  exit: {
    x: "100%",
    transition: transitionExit,
  },
};

// ---------- Interaction variants ----------

/** cardHover — hover state for folio cards */
export const cardHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: shadows.resting,
    transition: { duration: durations.instant },
  },
  hover: {
    scale: scale.hover,
    boxShadow: shadows.hover,
    transition: { duration: durations.fast, ease: easings.standard as any },
  },
  pressed: {
    scale: scale.press,
    boxShadow: shadows.press,
    transition: { duration: durations.instant },
  },
};

/** buttonPress — for primary buttons (whileHover + whileTap) */
export const buttonPress: Variants = {
  rest: { scale: 1 },
  hover: { scale: scale.hover, transition: { duration: durations.instant } },
  tap: { scale: scale.press, transition: { duration: durations.instant } },
};

// ---------- Ritual variants ----------

/** ritualCharge — the offering button during press-and-hold */
export const ritualCharge: Variants = {
  idle: {
    scale: 1,
    boxShadow: shadows.resting,
    filter: "brightness(0.7)",
    transition: { duration: durations.fast },
  },
  pressing: {
    scale: scale.ritualPress,
    filter: "brightness(1)",
    transition: { duration: durations.instant },
  },
  charged: {
    scale: scale.ritualCharge,
    boxShadow: shadows.ritualCharged,
    filter: "brightness(1.3)",
    transition: {
      duration: durations.emphasis,
      ease: easings.ritual as any,
    },
  },
};

/** ritualRelease — the offering burst on release */
export const ritualRelease: Variants = {
  released: {
    scale: scale.completion,
    boxShadow: shadows.completion,
    filter: "brightness(1.4)",
    transition: {
      duration: durations.ritual,
      ease: easings.ritual as any,
    },
  },
  completed: {
    scale: 1,
    boxShadow: shadows.resting,
    filter: "brightness(1)",
    opacity: opacity.subtle,
    transition: {
      duration: durations.emphasis,
      ease: easings.standard as any,
    },
  },
};

/** completionPulse — ceremonial glow on step/ritual completion */
export const completionPulse: Variants = {
  hidden: { opacity: opacity.hidden, scale: 0.5 },
  visible: {
    opacity: [0, opacity.visible, opacity.hidden],
    scale: [0.5, 1.5, 2],
    transition: {
      duration: durations.ritual,
      ease: easings.ritual as any,
      times: [0, 0.3, 1],
    },
  },
};

// ---------- Section variants ----------

/** sectionReveal — scroll-triggered section entrance (clip-path, no translateY) */
export const sectionReveal: Variants = {
  hidden: {
    opacity: opacity.hidden,
    clipPath: "inset(20% 0 20% 0)",
    filter: "blur(6px) brightness(0.6)",
  },
  visible: {
    opacity: opacity.visible,
    clipPath: "inset(0% 0% 0% 0%)",
    filter: "blur(0px) brightness(1)",
    transition: {
      duration: durations.emphasis,
      ease: easings.standard as any,
    },
  },
};

/** dividerGrow — animated gold line separator */
export const dividerGrow: Variants = {
  hidden: { scaleX: 0, opacity: opacity.hidden },
  visible: {
    scaleX: 1,
    opacity: opacity.visible,
    transition: {
      duration: durations.ceremonial,
      ease: easings.ritual as any,
    },
  },
};
