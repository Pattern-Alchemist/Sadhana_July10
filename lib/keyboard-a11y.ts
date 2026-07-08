/**
 * Keyboard Accessibility Utilities
 * =================================
 * Provides keyboard event handlers and focus management for ritual workflows.
 *
 * Ritual keyboard interactions:
 * - Spacebar / Enter to start holding (maps to pointer press-and-hold)
 * - Spacebar / Enter release to release (maps to pointer release)
 * - Escape to cancel ritual
 * - Tab for standard focus management
 */

/**
 * Check if a keyboard event is a "press" trigger.
 * Returns true for Spacebar or Enter.
 */
export function isPressTrigger(event: React.KeyboardEvent): boolean {
  return event.code === "Space" || event.code === "Enter";
}

/**
 * Check if a keyboard event is a "cancel" trigger.
 * Returns true for Escape.
 */
export function isCancelTrigger(event: React.KeyboardEvent): boolean {
  return event.code === "Escape";
}

/**
 * Handle keyboard press-and-hold interaction for rituals.
 * Use this in onKeyDown to map keyboard input to ritual hold start.
 *
 * Returns true if event was handled, false otherwise.
 */
export function handleRitualKeyDown(
  event: React.KeyboardEvent,
  callbacks: {
    onHoldStart?: () => void;
    onCancel?: () => void;
  },
): boolean {
  if (isPressTrigger(event)) {
    event.preventDefault();
    callbacks.onHoldStart?.();
    return true;
  }

  if (isCancelTrigger(event)) {
    event.preventDefault();
    callbacks.onCancel?.();
    return true;
  }

  return false;
}

/**
 * Handle keyboard release interaction for rituals.
 * Use this in onKeyUp to map keyboard release to ritual hold release.
 *
 * Returns true if event was handled, false otherwise.
 */
export function handleRitualKeyUp(
  event: React.KeyboardEvent,
  callbacks: {
    onHoldRelease?: () => void;
  },
): boolean {
  if (isPressTrigger(event)) {
    event.preventDefault();
    callbacks.onHoldRelease?.();
    return true;
  }

  return false;
}

/**
 * Focus management helper — sets focus with optional visual indication.
 * Use to focus interactive ritual buttons/zones after interactions.
 */
export function setFocusWithAnnounce(
  element: HTMLElement | null,
  announcement?: string,
): void {
  if (!element) return;

  // Set focus
  element.focus();

  // Announce change if provided
  if (announcement) {
    announceToScreenReader(announcement);
  }
}

/**
 * Announce text to screen readers via aria-live region.
 * Use for ritual state changes, completion messages, etc.
 *
 * If no live region exists, creates one temporarily.
 */
export function announceToScreenReader(
  text: string,
  priority: "polite" | "assertive" = "polite",
): void {
  let region = document.querySelector(`[aria-live="${priority}"]`);

  if (!region) {
    region = document.createElement("div");
    region.setAttribute("aria-live", priority);
    region.setAttribute("aria-atomic", "true");
    region.className = "sr-only"; // Screen reader only
    document.body.appendChild(region);
  }

  region.textContent = text;
}

/**
 * Check if keyboard event should be captured by ritual.
 * Prevents capturing events from inputs, textareas, etc.
 */
export function isRitualKeyboardEvent(
  event: React.KeyboardEvent,
): boolean {
  const target = event.target as HTMLElement;

  // Don't capture if inside an input, textarea, or contenteditable
  if (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.contentEditable === "true"
  ) {
    return false;
  }

  return true;
}

/**
 * Setup focus trap for modal/overlay rituals.
 * Keeps keyboard focus within the ritual component.
 *
 * Returns cleanup function.
 */
export function setupFocusTrap(
  containerElement: HTMLElement,
  focusableSelector: string = "button, [tabindex]:not([tabindex='-1'])",
): () => void {
  const focusableElements = containerElement.querySelectorAll(focusableSelector) as NodeListOf<HTMLElement>;

  if (focusableElements.length === 0) return () => {};

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code !== "Tab") return;

    if (event.shiftKey) {
      // Shift+Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  containerElement.addEventListener("keydown", handleKeyDown);

  // Focus first element
  firstElement.focus();

  // Return cleanup
  return () => {
    containerElement.removeEventListener("keydown", handleKeyDown);
  };
}

/**
 * Keyboard navigation state hook info
 * For integration with React components:
 *
 * import { useKeyboardRitual } from "@/hooks/useKeyboardRitual";
 *
 * const { isHoldingViaKeyboard, startHold, releaseHold } = useKeyboardRitual({
 *   onComplete: () => { ... }
 * });
 *
 * Then attach handlers:
 * <button
 *   onKeyDown={(e) => handleRitualKeyDown(e, { onHoldStart: startHold })}
 *   onKeyUp={(e) => handleRitualKeyUp(e, { onHoldRelease: releaseHold })}
 * />
 */

/**
 * Accessibility label for keyboard instructions.
 * Use in aria-label or title attributes.
 */
export const KEYBOARD_INSTRUCTIONS = {
  ritualStart: "Press Spacebar or Enter to begin the ritual offering. Hold until complete.",
  ritualCancel: "Press Escape to cancel the ritual.",
  ritualFull: "Press Spacebar or Enter to hold and charge your offering. Release to complete. Press Escape to cancel.",
};

/**
 * ARIA announcements for common ritual events
 */
export const RITUAL_ANNOUNCEMENTS = {
  started: "Ritual started. Hold to charge your offering.",
  charging: "Charging offering. Release when ready.",
  charged: "Offering fully charged. Release to complete.",
  completed: "Offering completed successfully.",
  cancelled: "Ritual cancelled. Ready for next offering.",
};
