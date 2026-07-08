/**
 * Motion Profiles
 * ===============
 * Separate motion languages for different UI contexts.
 * Each profile respects the motion policy (reduced-motion, accessibility, performance).
 */

import type { MotionPolicy } from "@/motion/motion-policy";
import type { Transition } from "motion/react";

export type MotionProfile = 'hero' | 'shrine' | 'dashboard' | 'ritual' | 'meditation';

export interface MotionProfileConfig {
  name: MotionProfile;
  description: string;
  durations: {
    entrance: number;
    exit: number;
    interaction: number;
    sustained: number;
  };
  easings: {
    standard: string;
    emphasized: string;
    decelerate: string;
  };
  staggerDelay: number;
  intensity: 'minimal' | 'moderate' | 'intense';
}

const MOTION_PROFILES: Record<MotionProfile, MotionProfileConfig> = {
  hero: {
    name: 'hero',
    description: 'Opening/closing sequences (slow, contemplative)',
    durations: {
      entrance: 800,
      exit: 600,
      interaction: 300,
      sustained: 1200,
    },
    easings: {
      standard: 'cubic-bezier(0.35, 0, 0.65, 1)',
      emphasized: 'cubic-bezier(0.2, 0.9, 0.6, 1)',
      decelerate: 'cubic-bezier(0, 0.9, 0.1, 1)',
    },
    staggerDelay: 120,
    intensity: 'intense',
  },
  
  shrine: {
    name: 'shrine',
    description: 'Sacred ritual spaces (deliberate, reverent)',
    durations: {
      entrance: 600,
      exit: 400,
      interaction: 250,
      sustained: 1000,
    },
    easings: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      emphasized: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      decelerate: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
    },
    staggerDelay: 100,
    intensity: 'moderate',
  },
  
  dashboard: {
    name: 'dashboard',
    description: 'Information display (quick, clear)',
    durations: {
      entrance: 300,
      exit: 200,
      interaction: 150,
      sustained: 400,
    },
    easings: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      emphasized: 'cubic-bezier(0.4, 0, 0.6, 1)',
      decelerate: 'cubic-bezier(0.3, 0.7, 0.4, 1)',
    },
    staggerDelay: 50,
    intensity: 'minimal',
  },
  
  ritual: {
    name: 'ritual',
    description: 'Active practice (responsive, tactile)',
    durations: {
      entrance: 400,
      exit: 300,
      interaction: 200,
      sustained: 600,
    },
    easings: {
      standard: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      emphasized: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      decelerate: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    staggerDelay: 75,
    intensity: 'moderate',
  },
  
  meditation: {
    name: 'meditation',
    description: 'Sustained focus (minimal, calming)',
    durations: {
      entrance: 500,
      exit: 500,
      interaction: 0,
      sustained: 2000,
    },
    easings: {
      standard: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      emphasized: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      decelerate: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    staggerDelay: 150,
    intensity: 'minimal',
  },
};

/**
 * Get motion profile by name
 */
export function getMotionProfile(name: MotionProfile): MotionProfileConfig {
  return MOTION_PROFILES[name];
}

/**
 * Apply motion policy to a profile's transitions
 * If reduced-motion, speeds up all durations significantly
 */
export function applyPolicyToProfile(
  profile: MotionProfileConfig,
  policy: MotionPolicy,
): MotionProfileConfig {
  if (!policy.reducedMotion) {
    return profile;
  }

  // In reduced-motion mode, speed everything up
  return {
    ...profile,
    durations: {
      entrance: Math.max(100, profile.durations.entrance * 0.3),
      exit: Math.max(50, profile.durations.exit * 0.3),
      interaction: 0,
      sustained: Math.max(200, profile.durations.sustained * 0.3),
    },
    staggerDelay: 0,
    intensity: 'minimal',
  };
}

/**
 * Create a transition from profile settings
 */
export function createTransitionFromProfile(
  profile: MotionProfileConfig,
  key: keyof MotionProfileConfig['durations'],
): Transition {
  return {
    duration: profile.durations[key] / 1000, // Convert ms to seconds for Motion
    ease: profile.easings.standard as any,
  };
}

/**
 * Get stagger settings for profile
 */
export function getStaggerSettings(
  profile: MotionProfileConfig,
  itemCount: number,
): { staggerChildren: number; delayChildren: number } {
  if (profile.staggerDelay === 0) {
    return { staggerChildren: 0, delayChildren: 0 };
  }
  
  return {
    staggerChildren: profile.staggerDelay / 1000,
    delayChildren: 0,
  };
}

/**
 * Get all available profiles
 */
export function getAllMotionProfiles(): Record<MotionProfile, MotionProfileConfig> {
  return MOTION_PROFILES;
}
