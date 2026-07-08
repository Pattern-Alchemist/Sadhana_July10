/**
 * Haptic Feedback Manager
 * =======================
 * Android-friendly vibration feedback with Web-safe fallbacks.
 *
 * Provides:
 * - Tap/click feedback (10ms short pulse)
 * - Hold charging feedback (progressive pulses)
 * - Release feedback (satisfying final burst)
 * - Error feedback (warning pattern)
 *
 * Features:
 * - Browser native (Vibration API only, no external library)
 * - Graceful fallback when unsupported
 * - Never required for ritual completion (optional enhancement)
 * - Respects user preference and device capability
 * - Mobile-first (Android/iOS support)
 */

/**
 * Check if haptic feedback is supported.
 * Modern Android browsers and some iOS browsers support the Vibration API.
 */
export function canVibrate(): boolean {
  if (typeof navigator === "undefined") return false;

  // navigator.vibrate exists on both Android and some iOS browsers
  // On iOS, it may be a no-op but doesn't throw
  return "vibrate" in navigator;
}

/**
 * Haptic pattern types
 */
export type HapticPattern =
  | "tap"
  | "tap-light"
  | "tap-strong"
  | "double-tap"
  | "charge-build"
  | "charge-peak"
  | "release-light"
  | "release-burst"
  | "error"
  | "success";

/**
 * Haptic settings
 */
export interface HapticSettings {
  /** Enable haptics (default: true if supported) */
  enabled: boolean;
  /** Reduce intensity for accessibility (default: false) */
  reduceIntensity: boolean;
  /** Master intensity multiplier (0-1, default: 1) */
  intensity: number;
}

/**
 * Default haptic settings
 */
export const DEFAULT_HAPTIC_SETTINGS: HapticSettings = {
  enabled: canVibrate(),
  reduceIntensity: false,
  intensity: 1,
};

/**
 * Haptic pattern definitions (in milliseconds)
 *
 * Usage:
 * - Single number: vibrate for that duration
 * - Array: [vibrate, pause, vibrate, pause, ...]
 *
 * Example: [10, 20, 10] = 10ms vibrate, 20ms pause, 10ms vibrate
 */
const HAPTIC_PATTERNS: Record<HapticPattern, number | number[]> = {
  // Basic feedback
  tap: 10,
  "tap-light": 5,
  "tap-strong": 15,
  "double-tap": [10, 50, 10],

  // Charging feedback (progressive builds)
  "charge-build": [5, 30, 8, 30, 12, 30], // 5ms, 8ms, 12ms (building)
  "charge-peak": [15, 10, 15], // Double peak

  // Release feedback
  "release-light": [8, 15, 8], // Gentle release
  "release-burst": [30, 20, 20, 20, 20], // Satisfying burst

  // Status feedback
  error: [100, 50, 100, 50, 100], // Warning pattern (three pulses)
  success: [20, 30, 20], // Confirmation pattern
};

/**
 * HapticManager — handles all vibration feedback.
 * Safely handles unsupported devices (silent no-op).
 */
export class HapticManager {
  private settings: HapticSettings;
  private currentVibration: number | null = null;

  constructor(initialSettings: Partial<HapticSettings> = {}) {
    this.settings = { ...DEFAULT_HAPTIC_SETTINGS, ...initialSettings };
  }

  /**
   * Enable/disable haptics
   */
  setEnabled(enabled: boolean) {
    this.settings.enabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  /**
   * Set intensity (0-1)
   */
  setIntensity(intensity: number) {
    this.settings.intensity = Math.max(0, Math.min(1, intensity));
  }

  /**
   * Toggle reduce-intensity mode (for accessibility)
   */
  setReduceIntensity(reduce: boolean) {
    this.settings.reduceIntensity = reduce;
  }

  /**
   * Play a haptic pattern
   */
  async playPattern(pattern: HapticPattern): Promise<void> {
    if (!this.settings.enabled || !canVibrate()) return;

    const vibrationPattern = HAPTIC_PATTERNS[pattern];
    if (!vibrationPattern) return;

    // Apply intensity and reduce-intensity adjustments
    const adjustedPattern = this.adjustPattern(vibrationPattern);

    try {
      navigator.vibrate(adjustedPattern);
      this.currentVibration = Date.now();
    } catch (e) {
      console.error("[HapticManager] Error playing haptic:", e);
    }
  }

  /**
   * Adjust pattern based on intensity and accessibility settings
   */
  private adjustPattern(
    pattern: number | number[],
  ): number | number[] {
    if (typeof pattern === "number") {
      return this.adjustDuration(pattern);
    }

    // Array pattern: adjust vibration durations, keep pauses
    return pattern.map((value, index) => {
      // Even indices are vibration, odd indices are pauses
      if (index % 2 === 0) {
        return this.adjustDuration(value);
      }
      return value; // Keep pause duration
    });
  }

  /**
   * Adjust vibration duration based on settings
   */
  private adjustDuration(duration: number): number {
    let adjusted = duration * this.settings.intensity;

    // Reduce intensity mode: halve the duration
    if (this.settings.reduceIntensity) {
      adjusted *= 0.5;
    }

    return Math.round(adjusted);
  }

  /**
   * Stop current vibration
   */
  stop() {
    try {
      navigator.vibrate(0);
    } catch {
      // No-op on unsupported devices
    }
    this.currentVibration = null;
  }

  /**
   * Play a custom pattern (array of durations)
   * Example: playCustom([10, 20, 10, 20, 30])
   */
  async playCustom(pattern: number[]): Promise<void> {
    if (!this.settings.enabled || !canVibrate()) return;

    try {
      const adjusted = pattern.map((value, index) => {
        // Adjust vibration only, not pauses
        if (index % 2 === 0) {
          return this.adjustDuration(value);
        }
        return value;
      });

      navigator.vibrate(adjusted);
      this.currentVibration = Date.now();
    } catch (e) {
      console.error("[HapticManager] Error playing custom haptic:", e);
    }
  }

  /**
   * Vibration for ritual charging (building intensity)
   * Use during press-and-hold to provide progressive feedback
   */
  async vibrationForChargingProgress(progress: number): Promise<void> {
    if (!this.settings.enabled || !canVibrate()) return;

    // 0-1 progress -> play different patterns
    if (progress < 0.25) {
      await this.playPattern("charge-build");
    } else if (progress < 0.75) {
      await this.playPattern("charge-peak");
    } else {
      // Near completion
      await this.playPattern("charge-peak");
      // Quick follow-up for final boost
      setTimeout(() => this.playPattern("tap-strong"), 150);
    }
  }
}

/**
 * Singleton instance
 */
let hapticManagerInstance: HapticManager | null = null;

/**
 * Get the haptic manager singleton
 */
export function getHapticManager(
  initialSettings?: Partial<HapticSettings>,
): HapticManager {
  if (!hapticManagerInstance) {
    hapticManagerInstance = new HapticManager(initialSettings);
  }
  return hapticManagerInstance;
}

/**
 * Quick haptic feedback functions (use getHapticManager() for full control)
 */
export async function tapHaptic() {
  getHapticManager().playPattern("tap");
}

export async function chargeHaptic(progress: number) {
  getHapticManager().vibrationForChargingProgress(progress);
}

export async function releaseHaptic() {
  getHapticManager().playPattern("release-burst");
}

export async function errorHaptic() {
  getHapticManager().playPattern("error");
}

export async function successHaptic() {
  getHapticManager().playPattern("success");
}
