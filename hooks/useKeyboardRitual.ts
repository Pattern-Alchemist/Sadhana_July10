"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  handleRitualKeyDown,
  handleRitualKeyUp,
  isRitualKeyboardEvent,
  announceToScreenReader,
  RITUAL_ANNOUNCEMENTS,
} from "@/lib/keyboard-a11y";

interface UseKeyboardRitualOptions {
  /**
   * Called when hold starts (Spacebar/Enter pressed)
   */
  onHoldStart?: () => void;

  /**
   * Called when hold is released (Spacebar/Enter released)
   */
  onHoldRelease?: () => void;

  /**
   * Called when user cancels (Escape pressed)
   */
  onCancel?: () => void;

  /**
   * Enable/disable keyboard handling
   */
  enabled?: boolean;

  /**
   * Announce state changes to screen readers
   */
  announceStates?: boolean;
}

/**
 * useKeyboardRitual
 * =================
 * Hook for keyboard-driven ritual interactions.
 *
 * Enables:
 * - Spacebar / Enter to start holding
 * - Spacebar / Enter release to release
 * - Escape to cancel
 * - Screen reader announcements
 *
 * Attach handlers to your button/element:
 *
 * const { isHoldingViaKeyboard } = useKeyboardRitual({
 *   onHoldStart: () => setState('charging'),
 *   onHoldRelease: () => setState('releasing'),
 *   onCancel: () => setState('cancelled'),
 * });
 *
 * <button
 *   {...keyboardHandlers}
 *   className={isHoldingViaKeyboard ? 'charging' : ''}
 * >
 *   Hold to offer
 * </button>
 */
export function useKeyboardRitual(options: UseKeyboardRitualOptions = {}) {
  const {
    onHoldStart,
    onHoldRelease,
    onCancel,
    enabled = true,
    announceStates = true,
  } = options;

  const [isHoldingViaKeyboard, setIsHoldingViaKeyboard] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);

  // Track which key is being held (to prevent issues with multiple key presses)
  const activeKeyRef = useRef<string | null>(null);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!enabled || !isRitualKeyboardEvent(event)) return;

      const handled = handleRitualKeyDown(event, {
        onHoldStart: () => {
          if (announceStates) {
            announceToScreenReader(RITUAL_ANNOUNCEMENTS.charging, "polite");
          }
          setIsHoldingViaKeyboard(true);
          holdStartTimeRef.current = Date.now();
          activeKeyRef.current = event.code;
          onHoldStart?.();
        },
        onCancel: () => {
          if (announceStates) {
            announceToScreenReader(RITUAL_ANNOUNCEMENTS.cancelled, "polite");
          }
          setIsHoldingViaKeyboard(false);
          activeKeyRef.current = null;
          onCancel?.();
        },
      });

      if (handled) {
        elementRef.current = event.currentTarget as HTMLElement;
      }
    },
    [enabled, announceStates, onHoldStart, onCancel],
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (!enabled || !isRitualKeyboardEvent(event)) return;

      // Only handle if the same key that started the hold is being released
      if (event.code !== activeKeyRef.current) return;

      const handled = handleRitualKeyUp(event, {
        onHoldRelease: () => {
          if (announceStates) {
            // Calculate hold duration for context
            const duration = holdStartTimeRef.current
              ? Date.now() - holdStartTimeRef.current
              : 0;
            const durationSec = Math.round(duration / 1000);
            announceToScreenReader(
              `${RITUAL_ANNOUNCEMENTS.completed} (held for ${durationSec} seconds)`,
              "assertive",
            );
          }
          setIsHoldingViaKeyboard(false);
          activeKeyRef.current = null;
          onHoldRelease?.();
        },
      });

      if (handled) {
        holdStartTimeRef.current = null;
      }
    },
    [enabled, announceStates, onHoldRelease],
  );

  // Auto-release if element loses focus while holding
  useEffect(() => {
    if (!isHoldingViaKeyboard) return;

    const handleBlur = () => {
      setIsHoldingViaKeyboard(false);
      activeKeyRef.current = null;
      onCancel?.();
    };

    const target = elementRef.current;
    if (target) {
      target.addEventListener("blur", handleBlur);
      return () => {
        target.removeEventListener("blur", handleBlur);
      };
    }
  }, [isHoldingViaKeyboard, onCancel]);

  return {
    keyboardHandlers: {
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    },
    isHoldingViaKeyboard,
  };
}
