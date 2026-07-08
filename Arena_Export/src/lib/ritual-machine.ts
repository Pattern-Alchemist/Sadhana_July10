/**
 * Ritual state machine — production-grade ritual engine contract.
 *
 * Formalizes the ritual lifecycle as a finite state machine with explicit
 * transitions, a shared RitualSession type, and an event enum. This is the
 * single source of truth that Shrine, Today dashboard, and future journey
 * flows all call — no duplicated gesture or completion logic.
 *
 * State chart:
 *   idle → pressing → charged → released → completed → (idle | next step)
 *                              ↘ cancelled → idle
 *   any → exited (on close or Escape)
 *
 * Refinements from v2.5.0:
 *   - Added "exited" as a distinct terminal state
 *   - Formalized transitions as a transition table
 *   - Added RitualSession type (shared contract)
 *   - Added RitualEvent enum
 *   - Added reducer function for deterministic state transitions
 *   - Added feature-detection flags (haptics, audio, reducedMotion)
 */

// ---------- Types ----------

export type OfferingKind = "fire" | "water" | "flower" | "incense" | "mantra" | "bell";

export type StepStatus =
  | "idle"
  | "pressing"
  | "charged"
  | "released"
  | "completed"
  | "cancelled"
  | "exited";

export interface RitualStep {
  id: string;
  kind: OfferingKind;
  title: string;
  instruction: string;
  holdMs: number;
  successLabel: string;
  icon: string;
  mantraText?: string;
}

export interface RitualConfig {
  id: string;
  title: string;
  sanskrit?: string;
  description: string;
  deity?: string;
  steps: RitualStep[];
}

/**
 * RitualSession — the shared contract between all entry points.
 * Shrine, Today dashboard, and Journeys all create/pass this object.
 */
export interface RitualSession {
  ritualId: string;
  ritual: RitualConfig;
  currentStepIndex: number;
  stepStatus: StepStatus;
  progress: number; // 0-1 for current step
  completedSteps: number[];
  isComplete: boolean;
  startedAt: string; // ISO timestamp
  completedAt?: string;
}

/**
 * RitualEvent — the event enum for the reducer.
 * Every state change is triggered by one of these events.
 */
export type RitualEvent =
  | { type: "START_PRESS" }
  | { type: "UPDATE_PROGRESS"; progress: number }
  | { type: "CHARGE_COMPLETE" }
  | { type: "RELEASE" }
  | { type: "ANIMATION_DONE" }
  | { type: "CANCEL" }
  | { type: "ADVANCE_STEP" }
  | { type: "RESET" }
  | { type: "EXIT" };

// ---------- Transition table ----------

/**
 * Deterministic state transitions. Given (currentStatus, event) → nextStatus.
 * Any (status, event) not in this table is a no-op (returns current status).
 */
const TRANSITIONS: Record<StepStatus, Partial<Record<RitualEvent["type"], StepStatus>>> = {
  idle: {
    START_PRESS: "pressing",
    EXIT: "exited",
  },
  pressing: {
    CHARGE_COMPLETE: "charged",
    UPDATE_PROGRESS: "pressing", // stays in pressing, updates progress
    CANCEL: "cancelled",
    RELEASE: "cancelled", // early release before charged
    EXIT: "exited",
  },
  charged: {
    RELEASE: "released",
    CANCEL: "cancelled",
    EXIT: "exited",
  },
  released: {
    ANIMATION_DONE: "completed",
    EXIT: "exited",
  },
  completed: {
    ADVANCE_STEP: "idle", // next step (or ritual complete — handled by RitualExperience)
    RESET: "idle",
    EXIT: "exited",
  },
  cancelled: {
    RESET: "idle", // auto-resets after 300-400ms
    EXIT: "exited",
  },
  exited: {
    RESET: "idle",
  },
};

/**
 * Reducer — pure function for deterministic state transitions.
 * Use this in a useReducer hook or call directly.
 */
export function ritualReducer(state: RitualSession, event: RitualEvent): RitualSession {
  const currentStatus = state.stepStatus;
  const transitions = TRANSITIONS[currentStatus];
  const nextStatus = transitions?.[event.type];

  // No-op if no valid transition
  if (!nextStatus) return state;

  let nextStepIndex = state.currentStepIndex;
  let completedSteps = state.completedSteps;
  let isComplete = state.isComplete;
  let completedAt = state.completedAt;

  switch (event.type) {
    case "ADVANCE_STEP": {
      // Mark current step as completed
      completedSteps = [...state.completedSteps, state.currentStepIndex];
      if (state.currentStepIndex + 1 >= state.ritual.steps.length) {
        // Ritual complete
        isComplete = true;
        completedAt = new Date().toISOString();
      } else {
        nextStepIndex = state.currentStepIndex + 1;
      }
      return {
        ...state,
        stepStatus: nextStatus,
        currentStepIndex: nextStepIndex,
        completedSteps,
        isComplete,
        completedAt,
        progress: 0,
      };
    }
    case "UPDATE_PROGRESS": {
      return { ...state, stepStatus: nextStatus, progress: event.progress };
    }
    case "RESET": {
      return { ...state, stepStatus: "idle", progress: 0 };
    }
    case "EXIT": {
      return { ...state, stepStatus: "exited" };
    }
    default:
      return { ...state, stepStatus: nextStatus };
  }
}

/**
 * Create a new RitualSession from a RitualConfig.
 */
export function createSession(ritual: RitualConfig): RitualSession {
  return {
    ritualId: ritual.id,
    ritual,
    currentStepIndex: 0,
    stepStatus: "idle",
    progress: 0,
    completedSteps: [],
    isComplete: false,
    startedAt: new Date().toISOString(),
  };
}

// ---------- Feature detection ----------

/**
 * RitualCapabilities — the capabilities object passed to all ritual components.
 * Detected once at mount and passed downward — never checked per-interaction.
 *
 * Per MDN: Vibration API is hardware/browser-dependent (mobile-first, not
 * guaranteed on desktop). Lack of vibration does NOT mean the user can't
 * hold — visual feedback is always the primary layer.
 */
export interface RitualCapabilities {
  canVibrate: boolean;
  canPlayAudio: boolean;
  prefersReducedMotion: boolean;
  pointerType: "mouse" | "touch" | "pen" | "unknown";
}

export function detectCapabilities(): RitualCapabilities {
  return {
    canVibrate: typeof navigator !== "undefined" && "vibrate" in navigator,
    canPlayAudio: typeof window !== "undefined" && !!(window.AudioContext || (window as any).webkitAudioContext),
    prefersReducedMotion: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    pointerType: "unknown",
  };
}

/**
 * Interaction mode — three distinct modes:
 *
 *   "full"  — hold interaction + visual feedback, with optional haptics/audio
 *             when available. The default mode. Lack of haptics does NOT
 *             force tap mode — visual feedback is always primary.
 *
 *   "reduced" — same ritual logic as full, but motion simplified under
 *             prefers-reduced-motion. Animations replaced with quick fades.
 *             Still uses hold interaction — just faster, simpler visuals.
 *
 *   "tap"    — user-selected accessibility fallback. One tap = one offering.
 *             For users who cannot hold (motor impairment) or prefer speed.
 *             NOT auto-activated by missing haptics — only by user choice
 *             or explicit accessibility need.
 */
export type InteractionMode = "full" | "reduced" | "tap";

export function getDefaultInteractionMode(): InteractionMode {
  if (prefersReducedMotion()) return "reduced";
  return "full";
}

// Keep these for backward compatibility with existing imports
export function supportsHaptics(): boolean {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ---------- Lifecycle callbacks ----------

/**
 * Lifecycle callbacks for instrumentation and analytics.
 * These are the right place to measure abandonment during hold,
 * successful completion by mode, and whether reduced-motion or
 * tap-only users finish at different rates.
 */
export interface RitualLifecycleCallbacks {
  onStepStart?: (stepIndex: number, step: RitualStep) => void;
  onStepCompleted?: (stepIndex: number, step: RitualStep, mode: InteractionMode) => void;
  onRitualComplete?: (ritualId: string, durationMs: number, mode: InteractionMode) => void;
  onStepCancelled?: (stepIndex: number, step: RitualStep) => void;
  onModeChanged?: (from: InteractionMode, to: InteractionMode) => void;
}

// ---------- Ritual configs ----------

export const RITUALS: RitualConfig[] = [
  {
    id: "ganapati-basic",
    title: "Gaṇapati Pūjā",
    sanskrit: "गणपति पूजा",
    description: "A foundational offering sequence to Gaṇeśa — the remover of obstacles. Begin every practice here.",
    deity: "Gaṇeśa",
    steps: [
      { id: "deepa", kind: "fire", title: "Offer Light", instruction: "Press and hold to awaken the flame.", holdMs: 1400, successLabel: "Light offered", icon: "🪔" },
      { id: "jala", kind: "water", title: "Offer Water", instruction: "Hold steadily to fill the kalasha.", holdMs: 1200, successLabel: "Water offered", icon: "💧" },
      { id: "pushpa", kind: "flower", title: "Offer Flower", instruction: "Gather intention, then release the flower.", holdMs: 1000, successLabel: "Flower offered", icon: "🌸" },
      { id: "dhupa", kind: "incense", title: "Offer Incense", instruction: "Hold to kindle the ember.", holdMs: 1300, successLabel: "Incense offered", icon: "🔥" },
      { id: "mantra", kind: "mantra", title: "Offer Mantra", instruction: "Om Gam Ganapataye Namaha", holdMs: 2000, successLabel: "Mantra offered", icon: "🕉️", mantraText: "ॐ गं गणपतये नमः" },
    ],
  },
  {
    id: "shiva-abhisheka",
    title: "Śiva Abhiṣeka",
    sanskrit: "शिव अभिषेक",
    description: "A bathing offering to Śiva Liṅga — water, milk, and bilva leaves.",
    deity: "Śiva",
    steps: [
      { id: "jala", kind: "water", title: "Bathe with Water", instruction: "Pour pure water over the Liṅga.", holdMs: 1500, successLabel: "Water ablution complete", icon: "💧" },
      { id: "kshira", kind: "water", title: "Bathe with Milk", instruction: "Pour milk as abhiṣeka.", holdMs: 1500, successLabel: "Milk ablution complete", icon: "🥛" },
      { id: "bilva", kind: "flower", title: "Offer Bilva Leaves", instruction: "Place three bilva leaves with devotion.", holdMs: 1200, successLabel: "Bilva offered", icon: "🌿" },
      { id: "dhupa", kind: "incense", title: "Offer Incense", instruction: "Light dhupa for the Lord.", holdMs: 1300, successLabel: "Incense offered", icon: "🔥" },
      { id: "mantra", kind: "mantra", title: "Om Namah Shivaya", instruction: "Chant the pañcākṣara.", holdMs: 2500, successLabel: "Mantra offered", icon: "🕉️", mantraText: "ॐ नमः शिवाय" },
    ],
  },
  {
    id: "devi-archana",
    title: "Devī Arcana",
    sanskrit: "देवी अर्चना",
    description: "A sixteen-offering worship sequence to the Goddess.",
    deity: "Devī",
    steps: [
      { id: "deepa", kind: "fire", title: "Āvāhana — Awaken the Flame", instruction: "Light the dīpa to invoke her presence.", holdMs: 1500, successLabel: "Presence invoked", icon: "🪔" },
      { id: "jala", kind: "water", title: "Pādya — Offer Water for Feet", instruction: "Pour water for her feet.", holdMs: 1200, successLabel: "Pādya offered", icon: "💧" },
      { id: "arghya", kind: "water", title: "Arghya — Offer Arghya", instruction: "Offer arghya water at her heart.", holdMs: 1200, successLabel: "Arghya offered", icon: "💧" },
      { id: "pushpa", kind: "flower", title: "Pushpa — Offer Flowers", instruction: "Place red flowers at her feet.", holdMs: 1400, successLabel: "Flowers offered", icon: "🌺" },
      { id: "dhupa", kind: "incense", title: "Dhūpa — Offer Incense", instruction: "Wave incense in circular offering.", holdMs: 1300, successLabel: "Incense offered", icon: "🔥" },
      { id: "dipa", kind: "fire", title: "Dīpa — Offer Light", instruction: "Circle the lamp before her form.", holdMs: 1500, successLabel: "Light offered", icon: "🪔" },
      { id: "naivedya", kind: "flower", title: "Naivedya — Offer Food", instruction: "Place the offering of fruit.", holdMs: 1200, successLabel: "Naivedya offered", icon: "🍎" },
      { id: "mantra", kind: "mantra", title: "Mantra — Offer the Bīja", instruction: "Hrīṁ — her seed-syllable.", holdMs: 2500, successLabel: "Bīja offered", icon: "🕉️", mantraText: "ह्रीं" },
    ],
  },
  {
    id: "kali-tarpana",
    title: "Kālī Tarpaṇa",
    sanskrit: "काली तर्पण",
    description: "An offering to Kālī — fire, red flowers, and the Kālī bīja.",
    deity: "Kālī",
    steps: [
      { id: "deepa", kind: "fire", title: "Light the Mustard-Oil Lamp", instruction: "Hold to kindle the flame for Kālī.", holdMs: 1500, successLabel: "Flame lit", icon: "🪔" },
      { id: "pushpa", kind: "flower", title: "Offer Red Hibiscus", instruction: "Place red hibiscus at her feet.", holdMs: 1300, successLabel: "Hibiscus offered", icon: "🌺" },
      { id: "jala", kind: "water", title: "Offer Water + Black Sesame", instruction: "Pour water mixed with black sesame.", holdMs: 1500, successLabel: "Tarpaṇa offered", icon: "💧" },
      { id: "mantra", kind: "mantra", title: "Kālī Bīja Mantra", instruction: "Krīṁ — the Kālī seed-syllable.", holdMs: 3000, successLabel: "Bīja offered", icon: "🕉️", mantraText: "क्रीं" },
    ],
  },
  {
    id: "simple-meditation",
    title: "Meditation Offering",
    sanskrit: "ध्यान",
    description: "A simple ritual to open a meditation session — light, incense, bell, and intention.",
    steps: [
      { id: "bell", kind: "bell", title: "Ring the Bell", instruction: "Strike the bell to open the space.", holdMs: 800, successLabel: "Space opened", icon: "🔔" },
      { id: "deepa", kind: "fire", title: "Light the Candle", instruction: "Press and hold to kindle the flame.", holdMs: 1200, successLabel: "Light offered", icon: "🪔" },
      { id: "dhupa", kind: "incense", title: "Light the Incense", instruction: "Hold to kindle the ember.", holdMs: 1200, successLabel: "Incense offered", icon: "🔥" },
      { id: "mantra", kind: "mantra", title: "Set Your Intention", instruction: "Om — the primordial sound.", holdMs: 2000, successLabel: "Intention set", icon: "🕉️", mantraText: "ॐ" },
    ],
  },
];

export function getRitualById(id: string): RitualConfig | undefined {
  return RITUALS.find((r) => r.id === id);
}
