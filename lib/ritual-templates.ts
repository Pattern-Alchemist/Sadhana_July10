/**
 * Guided Ritual Template Engine
 * ==============================
 * Data-driven ritual definitions for reusable, configurable ritual flows.
 *
 * Templates support:
 * - Preparation (setup, centering)
 * - Invocation (calling in deity/energy)
 * - Offering (core ritual action)
 * - Japa (mantra repetition)
 * - Closure (completion, gratitude)
 *
 * Each template is immutable configuration — components render from it.
 * Future siddhi-specific variants can be added without UI changes.
 */

import type { RitualConfig, RitualStep, OfferingKind } from "./ritual-machine";

/**
 * Ritual phase types
 */
export type RitualPhaseType =
  | "preparation"
  | "invocation"
  | "offering"
  | "japa"
  | "closure";

/**
 * Ritual phase definition
 * Each phase has multiple steps
 */
export interface RitualPhase {
  id: string;
  type: RitualPhaseType;
  title: string;
  description?: string;
  steps: RitualStep[];
  /** Time estimate in seconds (for display) */
  estimatedDuration?: number;
}

/**
 * Full ritual template
 */
export interface RitualTemplate {
  id: string;
  title: string;
  /** Sanskrit name if applicable */
  sanskrit?: string;
  /** Deity or energy invoked */
  deity?: string;
  /** Description of the ritual's purpose */
  purpose: string;
  /** Associated siddhi or practice */
  siddhi?: string;
  /** Array of phases */
  phases: RitualPhase[];
  /** Theme/color (ritual | gentle | energetic | devotional) */
  theme: "ritual" | "gentle" | "energetic" | "devotional";
  /** Total estimated time in seconds */
  totalDuration: number;
}

/**
 * Convert RitualTemplate to RitualConfig (for state machine)
 */
export function templateToConfig(template: RitualTemplate): RitualConfig {
  // Flatten all phase steps into a single step array
  const allSteps: RitualStep[] = [];

  template.phases.forEach((phase) => {
    allSteps.push(...phase.steps);
  });

  return {
    id: template.id,
    title: template.title,
    sanskrit: template.sanskrit,
    description: template.purpose,
    deity: template.deity,
    steps: allSteps,
  };
}

/**
 * Predefined ritual templates
 */
export const RITUAL_TEMPLATES: Record<string, RitualTemplate> = {
  // ============ CORE RITUALS ============

  "daily-offering": {
    id: "daily-offering",
    title: "Daily Offering",
    sanskrit: "Nityápúja",
    deity: "Universal Grace",
    purpose: "A simple daily acknowledgment and gratitude ritual",
    theme: "devotional",
    totalDuration: 180,

    phases: [
      {
        id: "prep-daily",
        type: "preparation",
        title: "Centering",
        description: "Settle into stillness",
        estimatedDuration: 30,
        steps: [
          {
            id: "daily-prep-1",
            kind: "bell",
            title: "Sound the Opening",
            instruction: "Ring the bell three times to signal your intention",
            holdMs: 0,
            successLabel: "Opened",
            icon: "bell",
          },
        ],
      },
      {
        id: "offering-daily",
        type: "offering",
        title: "Offerings",
        estimatedDuration: 120,
        steps: [
          {
            id: "daily-offer-1",
            kind: "fire",
            title: "Illuminate",
            instruction: "Offer light to dispel darkness",
            holdMs: 2000,
            successLabel: "Light Offered",
            icon: "🔥",
          },
          {
            id: "daily-offer-2",
            kind: "water",
            title: "Purify",
            instruction: "Offer water to cleanse and refresh",
            holdMs: 1800,
            successLabel: "Water Offered",
            icon: "💧",
          },
          {
            id: "daily-offer-3",
            kind: "flower",
            title: "Grace",
            instruction: "Offer flowers for beauty and sweetness",
            holdMs: 1800,
            successLabel: "Flowers Offered",
            icon: "🌹",
          },
          {
            id: "daily-offer-4",
            kind: "incense",
            title: "Fragrance",
            instruction: "Offer incense to sanctify the space",
            holdMs: 2000,
            successLabel: "Incense Offered",
            icon: "💨",
          },
        ],
      },
      {
        id: "closure-daily",
        type: "closure",
        title: "Gratitude",
        description: "Seal the ritual",
        estimatedDuration: 30,
        steps: [
          {
            id: "daily-close-1",
            kind: "bell",
            title: "Chime of Completion",
            instruction: "Ring the bell to signal completion",
            holdMs: 0,
            successLabel: "Sealed",
            icon: "🔔",
          },
        ],
      },
    ],
  },

  "maha-mrityunjaya": {
    id: "maha-mrityunjaya",
    title: "Mahá Mṛtyuñjaya",
    sanskrit: "Mahá Mṛtyuñjaya",
    deity: "Maha Mrityunjaya",
    purpose:
      "Ancient mantra for health, vitality, and protection from adversity",
    theme: "ritual",
    totalDuration: 900,

    phases: [
      {
        id: "prep-mmj",
        type: "preparation",
        title: "Invocation",
        description: "Call forth the power",
        estimatedDuration: 120,
        steps: [
          {
            id: "mmj-prep-1",
            kind: "bell",
            title: "Opening Bell",
            instruction: "Sound the bell to call the sacred presence",
            holdMs: 0,
            successLabel: "Opened",
            icon: "🔔",
          },
        ],
      },
      {
        id: "japa-mmj",
        type: "japa",
        title: "Mantra Recitation",
        description: "108 repetitions of Maha Mrityunjaya",
        estimatedDuration: 600,
        steps: [
          {
            id: "mmj-japa-1",
            kind: "mantra",
            title: "Maha Mrityunjaya Japa",
            instruction:
              "Hold to recite the mantra. Target: 108 repetitions (mala)",
            holdMs: 300,
            successLabel: "Mantra Completed",
            icon: "🕉",
            mantraText: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्",
          },
        ],
      },
      {
        id: "close-mmj",
        type: "closure",
        title: "Completion",
        description: "Seal the mantra power",
        estimatedDuration: 60,
        steps: [
          {
            id: "mmj-close-1",
            kind: "bell",
            title: "Sealing Chime",
            instruction: "Sound the bell to seal the mantra's power",
            holdMs: 0,
            successLabel: "Sealed",
            icon: "🔔",
          },
        ],
      },
    ],
  },

  "gayatri": {
    id: "gayatri",
    title: "Gāyatrī Mantra",
    sanskrit: "Gāyatrī",
    deity: "Sun (Surya)",
    purpose: "Daily illumination and spiritual awakening",
    theme: "gentle",
    totalDuration: 300,

    phases: [
      {
        id: "prep-gayatri",
        type: "preparation",
        title: "Centering",
        estimatedDuration: 60,
        steps: [
          {
            id: "gayatri-prep-1",
            kind: "bell",
            title: "Attention",
            instruction: "Ring bell to attune",
            holdMs: 0,
            successLabel: "Ready",
            icon: "🔔",
          },
        ],
      },
      {
        id: "recite-gayatri",
        type: "japa",
        title: "Gayatri Recitation",
        estimatedDuration: 180,
        steps: [
          {
            id: "gayatri-mantra",
            kind: "mantra",
            title: "Gayatri Japa",
            instruction: "Hold steady and recite the solar mantra",
            holdMs: 2000,
            successLabel: "Illuminated",
            icon: "☀️",
            mantraText: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
          },
        ],
      },
      {
        id: "close-gayatri",
        type: "closure",
        title: "Gratitude",
        estimatedDuration: 30,
        steps: [
          {
            id: "gayatri-close",
            kind: "bell",
            title: "Completion",
            instruction: "Final chime",
            holdMs: 0,
            successLabel: "Complete",
            icon: "🔔",
          },
        ],
      },
    ],
  },
};

/**
 * Get a template by ID
 */
export function getTemplate(templateId: string): RitualTemplate | null {
  return RITUAL_TEMPLATES[templateId] ?? null;
}

/**
 * Get all available templates
 */
export function getAllTemplates(): RitualTemplate[] {
  return Object.values(RITUAL_TEMPLATES);
}

/**
 * Filter templates by theme
 */
export function getTemplatesByTheme(
  theme: "ritual" | "gentle" | "energetic" | "devotional",
): RitualTemplate[] {
  return Object.values(RITUAL_TEMPLATES).filter((t) => t.theme === theme);
}

/**
 * Create a custom ritual template
 * (Use this to build siddhi-specific rituals)
 */
export function createRitualTemplate(
  base: Omit<RitualTemplate, "totalDuration">,
): RitualTemplate {
  const totalDuration = base.phases.reduce(
    (sum, phase) => sum + (phase.estimatedDuration ?? 0),
    0,
  );

  return {
    ...base,
    totalDuration,
  };
}

/**
 * Ritual template registry for dynamic loading
 * (Useful for managing user-created or siddhi-specific rituals)
 */
export class RitualTemplateRegistry {
  private templates: Map<string, RitualTemplate> = new Map();

  constructor() {
    // Pre-populate with default templates
    Object.entries(RITUAL_TEMPLATES).forEach(([id, template]) => {
      this.templates.set(id, template);
    });
  }

  /**
   * Register a custom template
   */
  register(template: RitualTemplate) {
    this.templates.set(template.id, template);
  }

  /**
   * Get a template by ID
   */
  get(id: string): RitualTemplate | null {
    return this.templates.get(id) ?? null;
  }

  /**
   * List all registered template IDs
   */
  list(): string[] {
    return Array.from(this.templates.keys());
  }

  /**
   * Get all templates
   */
  all(): RitualTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Filter by theme
   */
  filterByTheme(theme: string): RitualTemplate[] {
    return Array.from(this.templates.values()).filter((t) => t.theme === theme);
  }
}

/**
 * Global template registry singleton
 */
let registryInstance: RitualTemplateRegistry | null = null;

export function getTemplateRegistry(): RitualTemplateRegistry {
  if (!registryInstance) {
    registryInstance = new RitualTemplateRegistry();
  }
  return registryInstance;
}
