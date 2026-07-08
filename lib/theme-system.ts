/**
 * Theme System
 * ============
 * Provides time-of-day responsive theming for ritual experiences.
 * Automatically cycles through Dawn, Daylight, Dusk, and Midnight color palettes.
 *
 * Treats reduced-motion as accessibility + performance optimization.
 */

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

export type TimeOfDay = 'dawn' | 'daylight' | 'dusk' | 'midnight';

const THEMES: Record<TimeOfDay, ThemeConfig> = {
  dawn: {
    primary: '#C5A572', // Soft gold
    secondary: '#9B8B7E', // Warm gray
    accent: '#D4A574', // Light amber
    background: '#1a1a1a', // Deep dark
    text: '#E8DCC8', // Cream
    border: '#3A3A3A',
  },
  daylight: {
    primary: '#E8C547', // Bright gold
    secondary: '#B8956A', // Brown
    accent: '#F4D03F', // Vibrant amber
    background: '#0F0F0F', // Black
    text: '#F5F5F5', // White
    border: '#2A2A2A',
  },
  dusk: {
    primary: '#E07A3F', // Deep orange
    secondary: '#C97C4C', // Rust
    accent: '#D6785F', // Coral
    background: '#1A0F0A', // Deep brown
    text: '#FDE8D4', // Light peach
    border: '#3A2A25',
  },
  midnight: {
    primary: '#5B8DBE', // Cool blue
    secondary: '#4A7BA7', // Slate
    accent: '#7EB3D4', // Light cyan
    background: '#0A0F1A', // Navy
    text: '#D4E4F0', // Light blue-white
    border: '#1A2A3A',
  },
};

/**
 * Get current time of day
 */
function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 9) return 'dawn';
  if (hour >= 9 && hour < 17) return 'daylight';
  if (hour >= 17 && hour < 21) return 'dusk';
  return 'midnight';
}

/**
 * Get theme for current time
 */
export function getThemeForTime(): ThemeConfig {
  return THEMES[getCurrentTimeOfDay()];
}

/**
 * Get specific theme by time
 */
export function getTheme(timeOfDay: TimeOfDay): ThemeConfig {
  return THEMES[timeOfDay];
}

/**
 * Get all available themes
 */
export function getAllThemes(): Record<TimeOfDay, ThemeConfig> {
  return THEMES;
}

/**
 * Watch theme changes (for re-renders)
 */
export function useThemeWatch(callback: (theme: ThemeConfig) => void): () => void {
  let currentTime = getCurrentTimeOfDay();
  
  const interval = setInterval(() => {
    const newTime = getCurrentTimeOfDay();
    if (newTime !== currentTime) {
      currentTime = newTime;
      callback(THEMES[newTime]);
    }
  }, 60000); // Check every minute
  
  return () => clearInterval(interval);
}
