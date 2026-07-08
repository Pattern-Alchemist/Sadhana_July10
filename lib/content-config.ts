/**
 * Content Configuration System
 * ============================
 * Centralized configuration for rituals, deities, practices, and app content.
 * Allows easy customization without code changes.
 */

export interface DeityConfig {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  attributes?: string[];
  mantras?: string[];
  correspondences?: {
    element?: string;
    season?: string;
    dayOfWeek?: string;
    color?: string;
  };
}

export interface RitualConfig {
  id: string;
  name: string;
  description: string;
  deity?: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  prerequisites?: string[];
}

export interface ContentLibrary {
  deities: Record<string, DeityConfig>;
  rituals: Record<string, RitualConfig>;
  practices: Record<string, { name: string; description: string }>;
  settings: {
    defaultLanguage: string;
    defaultTheme: string;
    appName: string;
    appVersion: string;
  };
}

const DEFAULT_DEITIES: Record<string, DeityConfig> = {
  shiva: {
    id: 'shiva',
    name: 'Shiva',
    sanskrit: 'शिव',
    description: 'The Destroyer and Transformer, consciousness itself',
    attributes: ['meditation', 'transformation', 'destruction', 'renewal'],
    mantras: ['ॐ नमः शिवाय', 'ॐ महेश्वराय', 'हर हर महादेव'],
    correspondences: {
      element: 'ether',
      color: 'blue',
    },
  },
  durga: {
    id: 'durga',
    name: 'Durga',
    sanskrit: 'दुर्गा',
    description: 'The Divine Mother, protector against all evils',
    attributes: ['protection', 'strength', 'power', 'courage'],
    mantras: ['ॐ दुं दुर्गायै नमः', 'या देवी सर्वभूतेषु', 'ॐ नमो भवनी'],
    correspondences: {
      element: 'fire',
      color: 'red',
    },
  },
  saraswati: {
    id: 'saraswati',
    name: 'Saraswati',
    sanskrit: 'सरस्वती',
    description: 'The Goddess of Wisdom, Arts, and Knowledge',
    attributes: ['wisdom', 'knowledge', 'arts', 'creativity'],
    mantras: ['ॐ एं ह्रीं श्रीं सरस्वत्यै नमः', 'या कुंडेन्दु तुषार हारधवला'],
    correspondences: {
      element: 'water',
      color: 'white',
    },
  },
  lakshmi: {
    id: 'lakshmi',
    name: 'Lakshmi',
    sanskrit: 'लक्ष्मी',
    description: 'The Goddess of Abundance, Prosperity, and Grace',
    attributes: ['abundance', 'prosperity', 'wealth', 'grace'],
    mantras: ['ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद'],
    correspondences: {
      element: 'earth',
      color: 'gold',
    },
  },
};

const DEFAULT_RITUALS: Record<string, RitualConfig> = {
  daily_offering: {
    id: 'daily_offering',
    name: 'Daily Offering',
    description: 'Begin your day with a simple ritual of gratitude',
    duration: 10,
    difficulty: 'beginner',
    tags: ['daily', 'gratitude', 'morning'],
  },
  meditation_practice: {
    id: 'meditation_practice',
    name: 'Meditation Practice',
    description: 'A guided meditation for inner peace',
    duration: 20,
    difficulty: 'beginner',
    tags: ['meditation', 'peace', 'mindfulness'],
  },
  mantra_japa: {
    id: 'mantra_japa',
    name: 'Mantra Japa',
    description: 'Repetition of sacred mantras with intention',
    duration: 30,
    difficulty: 'intermediate',
    tags: ['mantra', 'chanting', 'devotion'],
  },
  pranayama: {
    id: 'pranayama',
    name: 'Pranayama',
    description: 'Breath control and energy cultivation',
    duration: 15,
    difficulty: 'intermediate',
    tags: ['breathing', 'energy', 'vitality'],
    prerequisites: ['meditation_practice'],
  },
};

let contentLibrary: ContentLibrary = {
  deities: DEFAULT_DEITIES,
  rituals: DEFAULT_RITUALS,
  practices: {},
  settings: {
    defaultLanguage: 'en',
    defaultTheme: 'dark',
    appName: 'AstroKalki',
    appVersion: '1.0',
  },
};

/**
 * Get entire content library
 */
export function getContentLibrary(): ContentLibrary {
  return JSON.parse(JSON.stringify(contentLibrary));
}

/**
 * Get specific deity config
 */
export function getDeity(id: string): DeityConfig | null {
  return contentLibrary.deities[id] || null;
}

/**
 * Get all deities
 */
export function getAllDeities(): DeityConfig[] {
  return Object.values(contentLibrary.deities);
}

/**
 * Get specific ritual config
 */
export function getRitual(id: string): RitualConfig | null {
  return contentLibrary.rituals[id] || null;
}

/**
 * Get all rituals
 */
export function getAllRituals(): RitualConfig[] {
  return Object.values(contentLibrary.rituals);
}

/**
 * Find rituals by tag
 */
export function getRitualsByTag(tag: string): RitualConfig[] {
  return Object.values(contentLibrary.rituals).filter(r =>
    r.tags?.includes(tag)
  );
}

/**
 * Find rituals by difficulty
 */
export function getRitualsByDifficulty(
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): RitualConfig[] {
  return Object.values(contentLibrary.rituals).filter(
    r => r.difficulty === difficulty
  );
}

/**
 * Update deity config
 */
export function updateDeity(id: string, config: DeityConfig): void {
  contentLibrary.deities[id] = config;
}

/**
 * Update ritual config
 */
export function updateRitual(id: string, config: RitualConfig): void {
  contentLibrary.rituals[id] = config;
}

/**
 * Add custom deity
 */
export function addCustomDeity(config: DeityConfig): void {
  contentLibrary.deities[config.id] = config;
}

/**
 * Add custom ritual
 */
export function addCustomRitual(config: RitualConfig): void {
  contentLibrary.rituals[config.id] = config;
}

/**
 * Reset to default content
 */
export function resetToDefaults(): void {
  contentLibrary = {
    deities: JSON.parse(JSON.stringify(DEFAULT_DEITIES)),
    rituals: JSON.parse(JSON.stringify(DEFAULT_RITUALS)),
    practices: {},
    settings: {
      defaultLanguage: 'en',
      defaultTheme: 'dark',
      appName: 'AstroKalki',
      appVersion: '1.0',
    },
  };
}

/**
 * Export content library for backup/sharing
 */
export function exportContentLibrary(): string {
  return JSON.stringify(contentLibrary, null, 2);
}

/**
 * Import content library from JSON
 */
export function importContentLibrary(json: string): boolean {
  try {
    const imported = JSON.parse(json);
    contentLibrary = imported;
    return true;
  } catch {
    return false;
  }
}

/**
 * Get app settings
 */
export function getAppSettings() {
  return { ...contentLibrary.settings };
}

/**
 * Update app settings
 */
export function updateAppSettings(
  settings: Partial<ContentLibrary['settings']>
): void {
  contentLibrary.settings = {
    ...contentLibrary.settings,
    ...settings,
  };
}
