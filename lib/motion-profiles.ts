/**
 * Motion Profiles - Context-specific animation languages
 * Sprint 3: Product Integration
 * 
 * Different sections of the app have different motion personalities:
 * - Ritual: Sacred, meditative, intentional
 * - Dashboard: Data-focused, organized, efficient
 * - Shrine: Premium, immersive, devotional
 * - Analytics: Technical, informative, minimal
 */

export type MotionProfile = 'ritual' | 'dashboard' | 'shrine' | 'analytics';

export interface MotionDurations {
  instant: number; // 0ms
  fast: number; // 100-150ms
  base: number; // 200-300ms
  slow: number; // 400-600ms
  slowest: number; // 800-1000ms
}

export interface MotionEasings {
  // Standard easing curves
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;

  // Spring-based (for natural motion)
  spring: string;
  bounce: string;

  // Ritual-specific (slow, meditative)
  meditative: string;
  ritual: string;

  // Data-focused (quick, clear)
  quick: string;
  snap: string;
}

export interface MotionVariant {
  duration: number;
  easing: string;
  delay?: number;
  stagger?: number;
}

export interface MotionProfileConfig {
  name: MotionProfile;
  description: string;

  // Core durations
  durations: MotionDurations;
  easings: MotionEasings;

  // Component-level presets
  variants: {
    entrance: MotionVariant;
    exit: MotionVariant;
    focus: MotionVariant;
    hover: MotionVariant;
    press: MotionVariant;
    transition: MotionVariant;
    scroll: MotionVariant;
  };

  // Settings
  staggerDelay: number; // Delay between items in list
  layoutShift: boolean; // Animate layout changes
  enableHover: boolean; // Enable hover animations on desktop
}

// ============================================================================
// Ritual Profile - Sacred, intentional, meditative
// ============================================================================

const RITUAL_PROFILE: MotionProfileConfig = {
  name: 'ritual',
  description:
    'Sacred, meditative motion for ritual experiences. Slow, intentional, spacious.',

  durations: {
    instant: 0,
    fast: 200,
    base: 400,
    slow: 800,
    slowest: 1200,
  },

  easings: {
    ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    meditative: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Slow, smooth
    ritual: 'cubic-bezier(0.17, 0.67, 0.12, 0.95)', // Intentional, ceremonial
  },

  variants: {
    entrance: { duration: 600, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
    exit: { duration: 600, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
    focus: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    hover: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    press: { duration: 150, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
    transition: { duration: 600, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
    scroll: { duration: 0, easing: 'linear' },
  },

  staggerDelay: 100,
  layoutShift: true,
  enableHover: true,
};

// ============================================================================
// Dashboard Profile - Data-focused, organized, efficient
// ============================================================================

const DASHBOARD_PROFILE: MotionProfileConfig = {
  name: 'dashboard',
  description: 'Data-focused motion for dashboards. Quick, organized, minimal.',

  durations: {
    instant: 0,
    fast: 100,
    base: 200,
    slow: 400,
    slowest: 600,
  },

  easings: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    meditative: 'cubic-bezier(0.4, 0, 0.2, 1)',
    ritual: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  variants: {
    entrance: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    exit: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    focus: { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    hover: { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    press: { duration: 100, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    transition: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    scroll: { duration: 0, easing: 'linear' },
  },

  staggerDelay: 30,
  layoutShift: true,
  enableHover: true,
};

// ============================================================================
// Shrine Profile - Premium, immersive, devotional
// ============================================================================

const SHRINE_PROFILE: MotionProfileConfig = {
  name: 'shrine',
  description:
    'Premium, immersive motion for shrine experiences. Elaborate, spacious, ceremonial.',

  durations: {
    instant: 0,
    fast: 300,
    base: 600,
    slow: 1000,
    slowest: 1500,
  },

  easings: {
    ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    meditative: 'cubic-bezier(0.15, 0.3, 0.25, 1)',
    ritual: 'cubic-bezier(0.12, 0.74, 0.58, 1)',
  },

  variants: {
    entrance: { duration: 800, easing: 'cubic-bezier(0.15, 0.3, 0.25, 1)' },
    exit: { duration: 600, easing: 'cubic-bezier(0.15, 0.3, 0.25, 1)' },
    focus: { duration: 600, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    hover: { duration: 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    press: { duration: 200, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
    transition: { duration: 800, easing: 'cubic-bezier(0.15, 0.3, 0.25, 1)' },
    scroll: { duration: 0, easing: 'linear' },
  },

  staggerDelay: 150,
  layoutShift: true,
  enableHover: true,
};

// ============================================================================
// Analytics Profile - Technical, informative, minimal
// ============================================================================

const ANALYTICS_PROFILE: MotionProfileConfig = {
  name: 'analytics',
  description: 'Technical, minimal motion for analytics. Fast, focused, sparse.',

  durations: {
    instant: 0,
    fast: 80,
    base: 150,
    slow: 300,
    slowest: 400,
  },

  easings: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    meditative: 'cubic-bezier(0.4, 0, 0.2, 1)',
    ritual: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  variants: {
    entrance: { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    exit: { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    focus: { duration: 100, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    hover: { duration: 100, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    press: { duration: 80, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    transition: { duration: 150, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    scroll: { duration: 0, easing: 'linear' },
  },

  staggerDelay: 20,
  layoutShift: false,
  enableHover: false,
};

// ============================================================================
// Registry
// ============================================================================

const MOTION_PROFILE_REGISTRY: Record<MotionProfile, MotionProfileConfig> = {
  ritual: RITUAL_PROFILE,
  dashboard: DASHBOARD_PROFILE,
  shrine: SHRINE_PROFILE,
  analytics: ANALYTICS_PROFILE,
};

// ============================================================================
// Public API
// ============================================================================

/**
 * Get motion profile configuration
 */
export function getMotionProfile(profile: MotionProfile): MotionProfileConfig {
  return MOTION_PROFILE_REGISTRY[profile];
}

/**
 * Get all motion profiles
 */
export function getAllMotionProfiles(): MotionProfileConfig[] {
  return Object.values(MOTION_PROFILE_REGISTRY);
}

/**
 * Get motion variant for a specific context
 */
export function getMotionVariant(
  profile: MotionProfile,
  variant: keyof MotionProfileConfig['variants']
): MotionVariant {
  const profileConfig = getMotionProfile(profile);
  return profileConfig.variants[variant];
}

/**
 * Apply reduced-motion settings to a profile
 */
export function applyReducedMotion(
  profile: MotionProfileConfig,
  factor: number = 0.4
): MotionProfileConfig {
  return {
    ...profile,
    durations: {
      instant: 0,
      fast: Math.round(profile.durations.fast * factor),
      base: Math.round(profile.durations.base * factor),
      slow: Math.round(profile.durations.slow * factor),
      slowest: Math.round(profile.durations.slowest * factor),
    },
    variants: {
      ...profile.variants,
      entrance: {
        ...profile.variants.entrance,
        duration: Math.round(profile.variants.entrance.duration * factor),
      },
      exit: {
        ...profile.variants.exit,
        duration: Math.round(profile.variants.exit.duration * factor),
      },
      focus: {
        ...profile.variants.focus,
        duration: Math.round(profile.variants.focus.duration * factor),
      },
      hover: {
        ...profile.variants.hover,
        duration: Math.round(profile.variants.hover.duration * factor),
      },
      press: {
        ...profile.variants.press,
        duration: Math.round(profile.variants.press.duration * factor),
      },
      transition: {
        ...profile.variants.transition,
        duration: Math.round(profile.variants.transition.duration * factor),
      },
      scroll: profile.variants.scroll,
    },
  };
}

/**
 * Get CSS transition property
 */
export function getMotionTransitionCSS(
  variant: MotionVariant,
  properties: string[] = ['all']
): string {
  const { duration, easing, delay = 0 } = variant;
  const delayCSS = delay > 0 ? ` ${delay}ms` : '';
  return properties
    .map((prop) => `${prop} ${duration}ms ${easing}${delayCSS}`)
    .join(', ');
}

/**
 * Create stagger effect for list animations
 */
export function createStaggerAnimation(
  profile: MotionProfileConfig,
  itemCount: number,
  baseDelay: number = 0
): (index: number) => number {
  return (index: number) =>
    baseDelay + index * profile.staggerDelay;
}

/**
 * Get profile recommendation based on context
 */
export function getProfileForContext(context: string): MotionProfile {
  if (context.includes('ritual')) return 'ritual';
  if (context.includes('shrine')) return 'shrine';
  if (context.includes('analytics') || context.includes('data')) {
    return 'analytics';
  }
  return 'dashboard';
}

/**
 * Motion profile statistics
 */
export function getMotionProfileStats() {
  return {
    totalProfiles: Object.keys(MOTION_PROFILE_REGISTRY).length,
    profiles: Object.keys(MOTION_PROFILE_REGISTRY),
    avgDuration: {
      ritual: RITUAL_PROFILE.durations.base,
      dashboard: DASHBOARD_PROFILE.durations.base,
      shrine: SHRINE_PROFILE.durations.base,
      analytics: ANALYTICS_PROFILE.durations.base,
    },
  };
}

/**
 * Compare two motion profiles
 */
export function compareMotionProfiles(
  profile1: MotionProfile,
  profile2: MotionProfile
): {
  speedRatio: number;
  profile1IsFaster: boolean;
} {
  const p1 = getMotionProfile(profile1);
  const p2 = getMotionProfile(profile2);

  const speedRatio = p1.durations.base / p2.durations.base;
  const profile1IsFaster = speedRatio < 1;

  return { speedRatio: Math.round(speedRatio * 100) / 100, profile1IsFaster };
}

/**
 * Get optimal profile based on device performance
 */
export function getOptimalProfile(
  prefersReducedMotion: boolean,
  isLowPerformance: boolean
): MotionProfile {
  if (prefersReducedMotion || isLowPerformance) {
    return 'analytics'; // Minimal motion
  }
  return 'dashboard'; // Balanced
}
