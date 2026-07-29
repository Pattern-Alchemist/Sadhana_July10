import {
  pgTable,
  serial,
  text,
  integer,
  jsonb,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

/**
 * AstroKalki — The Living Archive
 * Canonical schema — source of truth for drizzle-kit and runtime queries.
 * Source of truth for all relational content.
 * NOTE: bootstrap.ts mirrors these definitions as `CREATE TABLE IF NOT EXISTS`
 * so the app self-heals against a fresh or reset database.
 */

export const siddhis = pgTable("siddhis", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  sanskrit: text("sanskrit"),
  category: text("category"),
  tradition: text("tradition"),
  level: text("level"),
  durationHours: integer("duration_hours"),
  days: integer("days"),
  authenticityScore: integer("authenticity_score"),
  summary: text("summary"),
  description: text("description"),
  primaryMantra: text("primary_mantra"),
  benefits: jsonb("benefits").$type<string[]>(),
  warnings: jsonb("warnings").$type<string[]>(),
  lineage: text("lineage"),
  preSadhna: jsonb("pre_sadhna"),
  procedure: jsonb("procedure"),
  yantra: jsonb("yantra"),
  faq: jsonb("faq"),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const manuscripts = pgTable("manuscripts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  originalTitle: text("original_title"),
  tradition: text("tradition"),
  century: text("century"),
  catalogNumber: text("catalog_number"),
  language: text("language"),
  description: text("description"),
  conditionRating: text("condition_rating"),
  folios: integer("folios"),
  sourceUrl: text("source_url"),
});

export const schools = pgTable("schools", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  focus: text("focus"),
  description: text("description"),
  orderIndex: integer("order_index"),
});

export const evidenceSources = pgTable(
  "evidence_sources",
  {
    id: serial("id").primaryKey(),
    siddhiSlug: text("siddhi_slug"),
    kind: text("kind"),
    citation: text("citation"),
    url: text("url"),
    notes: text("notes"),
    confidence: text("confidence"),
  },
  (t) => [index("evidence_siddhi_idx").on(t.siddhiSlug)]
);

export const reflections = pgTable("reflections", {
  id: serial("id").primaryKey(),
  penName: text("pen_name"),
  siddhiSlug: text("siddhi_slug"),
  title: text("title"),
  body: text("body"),
  tone: text("tone"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Aghad Mastery Course Schema
export const aaghadCourses = pgTable("aghad_courses", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  durationWeeks: integer("duration_weeks"),
  totalHours: integer("total_hours"),
  hoursPerWeek: integer("hours_per_week"),
  chakraFocus: text("chakra_focus"),
  level: text("level"), // "foundation", "intermediate", "advanced"
  philosophy: text("philosophy"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const aaghadModules = pgTable(
  "aghad_modules",
  {
    id: serial("id").primaryKey(),
    courseSlug: text("course_slug").notNull(),
    moduleNumber: integer("module_number").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    description: text("description"),
    chakra: text("chakra"), // "Root", "Sacral", "Solar Plexus", etc.
    durationHours: integer("duration_hours"),
    weekNumber: integer("week_number"),
    learningOutcomes: jsonb("learning_outcomes").$type<string[]>(),
    prerequisites: jsonb("prerequisites").$type<string[]>(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("aghad_modules_course_idx").on(t.courseSlug)]
);

export const aaghadPractices = pgTable(
  "aghad_practices",
  {
    id: serial("id").primaryKey(),
    moduleId: integer("module_id").notNull(),
    practiceNumber: integer("practice_number").notNull(),
    title: text("title").notNull(),
    sanskrit: text("sanskrit"),
    category: text("category"), // "asana", "pranayama", "mantra", "mudra", "meditation", "visualization"
    description: text("description"),
    benefits: jsonb("benefits").$type<string[]>(),
    precautions: jsonb("precautions").$type<string[]>(),
    durationMinutes: integer("duration_minutes"),
    frequency: text("frequency"), // "daily", "3-4x/week", "on-demand"
    timing: text("timing"), // "Brahma Muhurta", "Morning", "Evening", etc.
    intensity: text("intensity"), // "beginner", "intermediate", "advanced"
    detailedSteps: jsonb("detailed_steps").$type<string[]>(),
    modifications: jsonb("modifications").$type<Record<string, string>[]>(),
    expectedResults: text("expected_results"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("aghad_practices_module_idx").on(t.moduleId)]
);

export const aaghadMantras = pgTable(
  "aghad_mantras",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    sanskrit: text("sanskrit").notNull(),
    transliteration: text("transliteration"),
    translation: text("translation"),
    pronunciation: text("pronunciation"), // phonetic guide
    soundFile: text("sound_file"), // URL to audio file
    mantraType: text("mantra_type"), // "Mahamantra", "Bija", "Gayatri", "Maha Mrityunjaya", etc.
    chakra: text("chakra"),
    frequency: integer("frequency"), // mala rounds or repetitions
    timing: text("timing"), // "Brahma Muhurta", "specific hours", etc.
    duration: integer("duration"), // minutes
    intensity: text("intensity"), // "foundation", "intensive", "master"
    whyRecite: text("why_recite"),
    benefits: jsonb("benefits").$type<string[]>(),
    frequency108: integer("frequency_108"), // number of 108s per session
    totalRounds: integer("total_rounds"), // total weekly rounds
    visualizations: jsonb("visualizations").$type<string[]>(),
    chakraActivation: jsonb("chakra_activation").$type<Record<string, string>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  }
);

export const aaghadUserProgress = pgTable(
  "aghad_user_progress",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    courseSlug: text("course_slug").notNull(),
    currentModuleId: integer("current_module_id"),
    completedModules: jsonb("completed_modules").$type<number[]>(),
    totalHoursCompleted: integer("total_hours_completed").default(0),
    currentStreak: integer("current_streak").default(0),
    longestStreak: integer("longest_streak").default(0),
    lastPracticeDate: timestamp("last_practice_date", { withTimezone: true }),
    chakraActivation: jsonb("chakra_activation").$type<Record<string, number>>(),
    mantrasCompleted: jsonb("mantras_completed").$type<number[]>(),
    practiceHistory: jsonb("practice_history").$type<Array<{ practiceId: number; date: string; duration: number; rating: number }>>(),
    enlightenmentProgress: integer("enlightenment_progress").default(0), // 0-100%
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [
    index("aghad_user_progress_user_idx").on(t.userId),
    index("aghad_user_progress_course_idx").on(t.courseSlug),
  ]
);

export const aaghadVoiceLogs = pgTable(
  "aghad_voice_logs",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    command: text("command"),
    transcript: text("transcript"),
    guruResponse: text("guru_response"),
    practiceContext: text("practice_context"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("aghad_voice_logs_user_idx").on(t.userId)]
);

export type Siddhi = typeof siddhis.$inferSelect;
export type Manuscript = typeof manuscripts.$inferSelect;
export type School = typeof schools.$inferSelect;
export type EvidenceSource = typeof evidenceSources.$inferSelect;
export type Reflection = typeof reflections.$inferSelect;
export type AaghadCourse = typeof aaghadCourses.$inferSelect;
export type AaghadModule = typeof aaghadModules.$inferSelect;
export type AaghadPractice = typeof aaghadPractices.$inferSelect;
export type AaghadMantra = typeof aaghadMantras.$inferSelect;
export type AaghadUserProgress = typeof aaghadUserProgress.$inferSelect;
export type AaghadVoiceLog = typeof aaghadVoiceLogs.$inferSelect;
