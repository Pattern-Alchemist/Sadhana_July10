/**
 * Theme System - Time-of-day color palettes and theming
 * Sprint 3: Product Integration
 * 
 * Provides contextual color themes based on time of day and user preference,
 * respecting reduced-motion and accessibility constraints.
 */

import { CSSProperties } from 'react';

// ============================================================================
// Theme Types
// ============================================================================

export type TimeOfDay = 'dawn' | 'daylight' | 'dusk' | 'midnight';
export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeColors {
  // Base colors
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;

  // Accent colors
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;

  // Semantic colors
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  error: string;
  errorForeground: string;

  // Ritual specific
  sacred: string;
  sacredAccent: string;
  offering: string;
  completion: string;

  // Borders and dividers
  border: string;
  divider: string;
}

export interface ThemeConfig {
  name: TimeOfDay;
  colors: ThemeColors;
  transitionDuration: number; // ms
  reducedMotionDuration: number; // ms
  description: string;
  timeRange?: {
    start: number; // 0-23 hours
    end: number; // 0-23 hours
  };
}

export interface ThemeContextValue {
  currentTheme: ThemeConfig;
  timeOfDay: TimeOfDay;
  themeMode: ThemeMode;
  systemPrefersDark: boolean;
  prefersReducedMotion: boolean;
  setTheme: (theme: TimeOfDay) => void;
  setThemeMode: (mode: ThemeMode) => void;
  getThemeCSS: () => CSSProperties;
}

// ============================================================================
// Time-of-Day Theme Definitions
// ============================================================================

const DAWN_THEME: ThemeConfig = {
  name: 'dawn',
  description: 'Dawn - Awakening and new beginnings (5 AM - 8 AM)',
  timeRange: { start: 5, end: 8 },
  transitionDuration: 800,
  reducedMotionDuration: 200,
  colors: {
    // Soft pinks and golds transitioning from night
    background: '#faf8f3',
    foreground: '#2c2416',
    muted: '#f0ece7',
    mutedForeground: '#6b6158',

    // Pink-gold accent (sunrise)
    primary: '#e8a87c',
    primaryForeground: '#1a1410',
    secondary: '#f0d5b8',
    secondaryForeground: '#3a3028',

    // Semantic
    success: '#8bc34a',
    successForeground: '#1a1410',
    warning: '#ff9800',
    warningForeground: '#1a1410',
    error: '#f44336',
    errorForeground: '#ffffff',

    // Ritual
    sacred: '#e8a87c',
    sacredAccent: '#f0d5b8',
    offering: '#fff9e6',
    completion: '#8bc34a',

    // Borders
    border: '#e8dfd5',
    divider: '#ede6df',
  },
};

const DAYLIGHT_THEME: ThemeConfig = {
  name: 'daylight',
  description: 'Daylight - Active practice and clarity (8 AM - 5 PM)',
  timeRange: { start: 8, end: 17 },
  transitionDuration: 600,
  reducedMotionDuration: 150,
  colors: {
    // Clean, bright, energetic
    background: '#ffffff',
    foreground: '#1a1a1a',
    muted: '#f5f5f5',
    mutedForeground: '#666666',

    // Vibrant blue-gold
    primary: '#2563eb',
    primaryForeground: '#ffffff',
    secondary: '#fbbf24',
    secondaryForeground: '#1a1a1a',

    // Semantic
    success: '#22c55e',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
    error: '#ef4444',
    errorForeground: '#ffffff',

    // Ritual
    sacred: '#2563eb',
    sacredAccent: '#fbbf24',
    offering: '#fef3c7',
    completion: '#22c55e',

    // Borders
    border: '#e5e7eb',
    divider: '#f3f4f6',
  },
};

const DUSK_THEME: ThemeConfig = {
  name: 'dusk',
  description: 'Dusk - Evening reflection and gratitude (5 PM - 8 PM)',
  timeRange: { start: 17, end: 20 },
  transitionDuration: 1000,
  reducedMotionDuration: 250,
  colors: {
    // Deep purples and oranges
    background: '#1f1b2e',
    foreground: '#f5f1ff',
    muted: '#2a2543',
    mutedForeground: '#b8afd1',

    // Orange and deep purple
    primary: '#f97316',
    primaryForeground: '#ffffff',
    secondary: '#c084fc',
    secondaryForeground: '#ffffff',

    // Semantic
    success: '#86efac',
    successForeground: '#1a1a1a',
    warning: '#fbbf24',
    warningForeground: '#1a1a1a',
    error: '#fca5a5',
    errorForeground: '#1a1a1a',

    // Ritual
    sacred: '#f97316',
    sacredAccent: '#c084fc',
    offering: '#fed7aa',
    completion: '#86efac',

    // Borders
    border: '#3a3250',
    divider: '#2d2543',
  },
};

const MIDNIGHT_THEME: ThemeConfig = {
  name: 'midnight',
  description: 'Midnight - Deep meditation and renewal (8 PM - 5 AM)',
  timeRange: { start: 20, end: 5 },
  transitionDuration: 1200,
  reducedMotionDuration: 300,
  colors: {
    // Deep navy and stars
    background: '#0f172a',
    foreground: '#f1f5f9',
    muted: '#1e293b',
    mutedForeground: '#cbd5e1',

    // Deep blue and silver
    primary: '#0ea5e9',
    primaryForeground: '#ffffff',
    secondary: '#e0e7ff',
    secondaryForeground: '#0f172a',

    // Semantic
    success: '#4ade80',
    successForeground: '#0f172a',
    warning: '#facc15',
    warningForeground: '#0f172a',
    error: '#f87171',
    errorForeground: '#0f172a',

    // Ritual
    sacred: '#0ea5e9',
    sacredAccent: '#e0e7ff',
    offering: '#dbeafe',
    completion: '#4ade80',

    // Borders
    border: '#1e293b',
    divider: '#0f172a',
  },
};

// ============================================================================
// Theme Registry
// ============================================================================

const THEME_REGISTRY: Record<TimeOfDay, ThemeConfig> = {
  dawn: DAWN_THEME,
  daylight: DAYLIGHT_THEME,
  dusk: DUSK_THEME,
  midnight: MIDNIGHT_THEME,
};

// ============================================================================
// Public API
// ============================================================================

/**
 * Get current time of day based on system time
 */
export function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 8) return 'dawn';
  if (hour >= 8 && hour < 17) return 'daylight';
  if (hour >= 17 && hour < 20) return 'dusk';
  return 'midnight';
}

/**
 * Get theme configuration for a specific time of day
 */
export function getThemeConfig(timeOfDay: TimeOfDay): ThemeConfig {
  return THEME_REGISTRY[timeOfDay];
}

/**
 * Get all available themes
 */
export function getAllThemes(): ThemeConfig[] {
  return Object.values(THEME_REGISTRY);
}

/**
 * Convert theme colors to CSS variables
 */
export function themeToCSS(theme: ThemeConfig): Record<string, string> {
  return {
    '--background': theme.colors.background,
    '--foreground': theme.colors.foreground,
    '--muted': theme.colors.muted,
    '--muted-foreground': theme.colors.mutedForeground,

    '--primary': theme.colors.primary,
    '--primary-foreground': theme.colors.primaryForeground,
    '--secondary': theme.colors.secondary,
    '--secondary-foreground': theme.colors.secondaryForeground,

    '--success': theme.colors.success,
    '--success-foreground': theme.colors.successForeground,
    '--warning': theme.colors.warning,
    '--warning-foreground': theme.colors.warningForeground,
    '--error': theme.colors.error,
    '--error-foreground': theme.colors.errorForeground,

    '--sacred': theme.colors.sacred,
    '--sacred-accent': theme.colors.sacredAccent,
    '--offering': theme.colors.offering,
    '--completion': theme.colors.completion,

    '--border': theme.colors.border,
    '--divider': theme.colors.divider,
  };
}

/**
 * Convert theme to inline styles (for React component)
 */
export function themeToStyles(theme: ThemeConfig): CSSProperties {
  const css = themeToCSS(theme);
  return css as any;
}

/**
 * Get theme-appropriate transition duration
 */
export function getThemeTransitionDuration(
  theme: ThemeConfig,
  prefersReducedMotion: boolean
): number {
  return prefersReducedMotion
    ? theme.reducedMotionDuration
    : theme.transitionDuration;
}

/**
 * Check if specific time falls within theme range
 */
export function isTimeInThemeRange(
  hour: number,
  theme: ThemeConfig
): boolean {
  if (!theme.timeRange) return false;

  const { start, end } = theme.timeRange;

  // Handle overnight ranges (e.g., midnight theme: 20-5)
  if (start > end) {
    return hour >= start || hour < end;
  }

  return hour >= start && hour < end;
}

/**
 * Get appropriate theme for a specific date and time
 */
export function getThemeForTime(date: Date = new Date()): ThemeConfig {
  const timeOfDay = getCurrentTimeOfDay();
  return getThemeConfig(timeOfDay);
}

/**
 * Theme presets for rapid customization
 */
export const THEME_PRESETS = {
  highContrast: (baseTheme: ThemeConfig): ThemeConfig => ({
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      foreground: '#000000',
      background: '#ffffff',
      primary: '#0000ff',
      secondary: '#ff0000',
    },
  }),

  lowContrast: (baseTheme: ThemeConfig): ThemeConfig => ({
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      muted: baseTheme.colors.background,
      mutedForeground: baseTheme.colors.foreground,
    },
  }),

  // For users with color blindness
  deuteranopia: (baseTheme: ThemeConfig): ThemeConfig => ({
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#0173b2',
      secondary: '#de8f05',
      success: '#cc78bc',
      error: '#ca9161',
    },
  }),

  protanopia: (baseTheme: ThemeConfig): ThemeConfig => ({
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#0173b2',
      secondary: '#de8f05',
      success: '#cc78bc',
      error: '#db6d00',
    },
  }),

  tritanopia: (baseTheme: ThemeConfig): ThemeConfig => ({
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#ca9161',
      secondary: '#0173b2',
      success: '#ca9161',
      error: '#de8f05',
    },
  }),
};

/**
 * Apply theme preset to a theme
 */
export function applyThemePreset(
  theme: ThemeConfig,
  preset: (theme: ThemeConfig) => ThemeConfig
): ThemeConfig {
  return preset(theme);
}

// ============================================================================
// Theme Transitions
// ============================================================================

/**
 * Get CSS transition property for theme changes
 */
export function getThemeTransitionCSS(
  duration: number,
  properties: string[] = ['background-color', 'color', 'border-color']
): string {
  return properties
    .map((prop) => `${prop} ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`)
    .join(', ');
}

/**
 * Create smooth theme transition styles
 */
export function createThemeTransitionStyles(
  duration: number,
  easing: string = 'cubic-bezier(0.4, 0, 0.2, 1)'
): CSSProperties {
  return {
    transition: `
      background-color ${duration}ms ${easing},
      color ${duration}ms ${easing},
      border-color ${duration}ms ${easing},
      box-shadow ${duration}ms ${easing}
    `.trim(),
  };
}

// ============================================================================
// Theme Statistics
// ============================================================================

/**
 * Get usage statistics for theme system
 */
export function getThemeStats() {
  return {
    totalThemes: Object.keys(THEME_REGISTRY).length,
    themes: Object.keys(THEME_REGISTRY),
    colorTokensPerTheme: Object.keys(DAWN_THEME.colors).length,
    presets: Object.keys(THEME_PRESETS).length,
  };
}
