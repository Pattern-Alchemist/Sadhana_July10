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

export type Siddhi = typeof siddhis.$inferSelect;
export type Manuscript = typeof manuscripts.$inferSelect;
export type School = typeof schools.$inferSelect;
export type EvidenceSource = typeof evidenceSources.$inferSelect;
export type Reflection = typeof reflections.$inferSelect;
