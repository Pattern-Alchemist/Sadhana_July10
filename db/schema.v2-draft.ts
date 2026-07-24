/**
 * UNWIRED DRAFT SCHEMA.
 *
 * The live AstroKalki schema is `db/schema.ts`, and `drizzle.config.json`
 * intentionally points there. This file sketches a broader v2 practice/session
 * model but is not used by runtime code, bootstrap SQL, or migrations yet.
 * Do not import it until a migration plan promotes it to the canonical schema.
 */
import { pgTable, text, serial, timestamp, boolean, integer, jsonb, varchar } from 'drizzle-orm/pg-core';

// Core Siddhi Table (55+ practices)
export const siddhisV2 = pgTable('siddhis_v2', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 128 }).notNull().unique(),
  title: varchar('title', { length: 256 }).notNull(),
  sanskrit: varchar('sanskrit', { length: 256 }),
  category: varchar('category', { length: 64 }).notNull(), // 'mantra', 'pranayama', 'nyasa', 'breath-magic', 'preta-work', 'tantra', etc.
  subcategory: varchar('subcategory', { length: 64 }), // e.g., 'Mahavidya', 'Shatkarma', 'Pranayama', etc.
  description: text('description'),
  fullGuide: text('full_guide'), // Detailed instructions
  duration: integer('duration'), // minutes
  difficulty: varchar('difficulty', { length: 32 }), // 'beginner', 'intermediate', 'advanced', 'expert'
  benefits: jsonb('benefits'), // Array of benefit strings
  warnings: jsonb('warnings'), // Array of contraindications
  bestTithi: jsonb('best_tithi'), // Array of auspicious tithis
  season: varchar('season', { length: 64 }), // Ayurvedic season
  dosha: jsonb('doshas'), // Which doshas it balances
  chakras: jsonb('chakras'), // Activated chakras
  mantras: jsonb('mantras'), // Associated mantras with Sanskrit/phonetic
  audioUrl: varchar('audio_url', { length: 512 }), // MP3 of mantra or guidance
  yantras: jsonb('yantras'), // Associated yantra descriptions
  tradition: varchar('tradition', { length: 64 }), // 'vedanta', 'hathayoga', 'tantra', 'ayurveda'
  sourceText: varchar('source_text', { length: 256 }), // Hatha Yoga Pradipika, etc.
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Practice Sessions Table
export const practiceSessions = pgTable('practice_sessions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  siddhiId: integer('siddhi_id').notNull(),
  siddhiSlug: varchar('siddhi_slug', { length: 128 }),
  sessionDate: timestamp('session_date').notNull(),
  duration: integer('duration'), // minutes
  mantrasCompleted: integer('mantras_completed'), // For japa counting
  intention: text('intention'),
  experience: text('experience'), // How it felt
  signsObserved: jsonb('signs_observed'), // Siddhi signs
  syncStatus: varchar('sync_status', { length: 32 }).default('local'), // 'local' | 'synced'
  isOffline: boolean('is_offline').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Preta-Work Sessions (Spirit communication & death rites)
export const pretaSessions = pgTable('preta_sessions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  sessionDate: timestamp('session_date').notNull(),
  spiritName: varchar('spirit_name', { length: 256 }),
  ritual: varchar('ritual', { length: 128 }), // Type of preta-work
  protocol: varchar('protocol', { length: 256 }), // Which field manual protocol
  mantraCycles: integer('mantra_cycles'),
  yangtraDiagram: text('yantra_diagram'), // SVG of drawn yantra
  observations: text('observations'),
  followUpNeeded: boolean('follow_up_needed').default(false),
  followUpDate: timestamp('follow_up_date'),
  syncStatus: varchar('sync_status', { length: 32 }).default('local'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Nyasa Visualization Sessions (Chakra mapping & body-based practice)
export const nyasaSessions = pgTable('nyasa_sessions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  sessionDate: timestamp('session_date').notNull(),
  nysaType: varchar('nyasa_type', { length: 128 }), // 'anga', 'shadanga', 'samput', etc.
  chakrasFocused: jsonb('chakras_focused'), // Array of chakra names
  visualization: text('visualization'), // What was visualized
  mantraUsed: varchar('mantra_used', { length: 512 }),
  bodySensations: jsonb('body_sensations'), // Mapped to locations
  energyFelt: text('energy_felt'), // Description of energy movement
  syncStatus: varchar('sync_status', { length: 32 }).default('local'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Breath Magic Lab Sessions
export const breathSessions = pgTable('breath_sessions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  sessionDate: timestamp('session_date').notNull(),
  technique: varchar('technique', { length: 128 }), // '4-7-8', 'bhastrika', 'nadi-shodhana', etc.
  cycles: integer('cycles'),
  totalDuration: integer('total_duration'), // seconds
  heartRate: integer('heart_rate'),
  mentalState: varchar('mental_state', { length: 64 }), // 'calm', 'energized', etc.
  insights: text('insights'),
  hapticFeedback: boolean('haptic_feedback').default(false),
  audioGuidance: boolean('audio_guidance').default(false),
  syncStatus: varchar('sync_status', { length: 32 }).default('local'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Yantra Builder Sessions
export const yantraSessions = pgTable('yantra_sessions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  createdDate: timestamp('created_date').notNull(),
  yanthaName: varchar('yantra_name', { length: 256 }),
  svgContent: text('svg_content'), // Full SVG XML
  proportion: jsonb('proportion'), // Sacred geometry ratios
  validatedGeometry: boolean('validated_geometry').default(false),
  exportFormats: jsonb('export_formats'), // 'png', 'svg', 'pdf'
  purposeText: varchar('purpose_text', { length: 256 }), // Why this yantra
  associatedDeity: varchar('associated_deity', { length: 128 }),
  syncStatus: varchar('sync_status', { length: 32 }).default('local'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Journal Entries (Enhanced)
export const journalEntries = pgTable('journal_entries', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  entryDate: timestamp('entry_date').notNull(),
  content: text('content'),
  entryType: varchar('entry_type', { length: 64 }), // 'practice', 'experience', 'dream', 'sign'
  category: varchar('category', { length: 64 }),
  tithiInfo: jsonb('tithi_info'), // Tithi when written
  isEncrypted: boolean('is_encrypted').default(false),
  tags: jsonb('tags'), // Array of tags
  linkedSiddhis: jsonb('linked_siddhis'), // Related practices
  mood: varchar('mood', { length: 32 }), // emotional state
  syncStatus: varchar('sync_status', { length: 32 }).default('local'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Cycles (Moon, menstrual, seasonal)
export const cycles = pgTable('cycles', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  cycleDate: timestamp('cycle_date').notNull(),
  cycleType: varchar('cycle_type', { length: 64 }), // 'lunar', 'menstrual', 'seasonal'
  phase: varchar('phase', { length: 64 }), // 'new-moon', 'waxing', 'full-moon', 'waning', etc.
  energy: varchar('energy', { length: 128 }),
  recommendations: jsonb('recommendations'), // Array of practice suggestions
  symptoms: jsonb('symptoms'), // Health tracking
  syncStatus: varchar('sync_status', { length: 32 }).default('local'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Sankalpas (Intentions)
export const sankalpas = pgTable('sankalpas', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  text: text('text').notNull(),
  intent: varchar('intent', { length: 128 }), // 'health', 'prosperity', 'liberation', etc.
  isActive: boolean('is_active').default(true),
  isPinned: boolean('is_pinned').default(false),
  createdDate: timestamp('created_date').notNull(),
  targetDate: timestamp('target_date'),
  achievedDate: timestamp('achieved_date'),
  linkedSiddhi: varchar('linked_siddhi', { length: 128 }), // Associated practice
  syncStatus: varchar('sync_status', { length: 32 }).default('local'),
  createdAt: timestamp('created_at').defaultNow(),
});

// User Preferences
export const userPrefs = pgTable('user_prefs', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull().unique(),
  tradition: varchar('tradition', { length: 64 }), // 'vedanta', 'tantra', 'hathayoga', 'ayurveda'
  theme: varchar('theme', { length: 32 }), // 'scholar', 'practitioner'
  language: varchar('language', { length: 32 }).default('en'),
  hasSeenOnboarding: boolean('has_seen_onboarding').default(false),
  lastActiveSession: timestamp('last_active_session'),
  createdAt: timestamp('created_at').defaultNow(),
});
