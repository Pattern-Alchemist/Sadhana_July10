import { getDb, type Database } from "@/db";
import { sql } from "drizzle-orm";
import {
  siddhis,
  manuscripts,
  schools,
  evidenceSources,
  reflections,
} from "@/db/schema";
import {
  SIDDHI_SEED,
  MANUSCRIPT_SEED,
  SCHOOL_SEED,
  EVIDENCE_SEED,
  REFLECTION_SEED,
} from "@/lib/archive-data";

/**
 * Self-healing schema. Mirrors db/schema.ts as idempotent DDL so the
 * application functions even against a freshly created / reset database.
 * (drizzle-kit push is the primary path; this is the safety net.)
 */
async function ensureSchema(database: Database) {
  await database.execute(sql`
    CREATE TABLE IF NOT EXISTS siddhis (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      sanskrit TEXT,
      category TEXT,
      tradition TEXT,
      level TEXT,
      duration_hours INTEGER,
      days INTEGER,
      authenticity_score INTEGER,
      summary TEXT,
      description TEXT,
      primary_mantra TEXT,
      benefits JSONB,
      warnings JSONB,
      lineage TEXT,
      pre_sadhna JSONB,
      procedure JSONB,
      yantra JSONB,
      faq JSONB,
      view_count INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  await database.execute(sql`
    CREATE TABLE IF NOT EXISTS manuscripts (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      original_title TEXT,
      tradition TEXT,
      century TEXT,
      catalog_number TEXT,
      language TEXT,
      description TEXT,
      condition_rating TEXT,
      folios INTEGER,
      source_url TEXT
    );
  `);
  await database.execute(sql`
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      focus TEXT,
      description TEXT,
      order_index INTEGER
    );
  `);
  await database.execute(sql`
    CREATE TABLE IF NOT EXISTS evidence_sources (
      id SERIAL PRIMARY KEY,
      siddhi_slug TEXT,
      kind TEXT,
      citation TEXT,
      url TEXT,
      notes TEXT,
      confidence TEXT
    );
  `);
  await database.execute(sql`
    CREATE TABLE IF NOT EXISTS reflections (
      id SERIAL PRIMARY KEY,
      pen_name TEXT,
      siddhi_slug TEXT,
      title TEXT,
      body TEXT,
      tone TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  await database.execute(sql`
    CREATE INDEX IF NOT EXISTS evidence_siddhi_idx ON evidence_sources (siddhi_slug);
  `);
  await database.execute(sql`
    CREATE INDEX IF NOT EXISTS siddhis_fts_idx ON siddhis USING GIN (
      (setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
       setweight(to_tsvector('english', coalesce(primary_mantra, '')), 'A') ||
       setweight(to_tsvector('english', coalesce(category, '')), 'B') ||
       setweight(to_tsvector('english', coalesce(tradition, '')), 'B') ||
       setweight(to_tsvector('english', coalesce(sanskrit, '')), 'C') ||
       setweight(to_tsvector('english', coalesce(summary, '')), 'C') ||
       setweight(to_tsvector('english', coalesce(description, '')), 'D'))
    );
  `);
  await database.execute(sql`
    CREATE INDEX IF NOT EXISTS manuscripts_fts_idx ON manuscripts USING GIN (
      (setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
       setweight(to_tsvector('english', coalesce(tradition, '')), 'B') ||
       setweight(to_tsvector('english', coalesce(original_title, '')), 'C') ||
       setweight(to_tsvector('english', coalesce(description, '')), 'D'))
    );
  `);
}

async function ensureSeed(database: Database) {
  const raw = await database.execute(sql`SELECT count(*)::int AS c FROM siddhis`);
  const rows = raw.rows as { c?: number | string }[];
  const siddhiRows = Number(rows[0]?.c ?? 0);
  if (siddhiRows === 0) {
    await database
      .insert(siddhis)
      .values(
        SIDDHI_SEED.map((s) => ({
          slug: s.slug,
          name: s.name,
          sanskrit: s.sanskrit,
          category: s.category,
          tradition: s.tradition,
          level: s.level,
          durationHours: s.durationHours,
          days: s.days,
          authenticityScore: s.authenticityScore,
          summary: s.summary,
          description: s.description,
          primaryMantra: s.primaryMantra,
          benefits: s.benefits,
          warnings: s.warnings,
          lineage: s.lineage,
          preSadhna: s.preSadhna,
          procedure: s.procedure,
          yantra: s.yantra ?? null,
          faq: s.faq,
          viewCount: 0,
        }))
      )
      .onConflictDoNothing({ target: siddhis.slug });

    await database
      .insert(manuscripts)
      .values(
        MANUSCRIPT_SEED.map((m) => ({
          slug: m.slug,
          title: m.title,
          originalTitle: m.originalTitle,
          tradition: m.tradition,
          century: m.century,
          catalogNumber: m.catalogNumber,
          language: m.language,
          description: m.description,
          conditionRating: m.conditionRating,
          folios: m.folios,
          sourceUrl: m.sourceUrl,
        }))
      )
      .onConflictDoNothing({ target: manuscripts.slug });

    await database
      .insert(schools)
      .values(
        SCHOOL_SEED.map((s) => ({
          slug: s.slug,
          name: s.name,
          focus: s.focus,
          description: s.description,
          orderIndex: s.orderIndex,
        }))
      )
      .onConflictDoNothing({ target: schools.slug });

    await database
      .insert(evidenceSources)
      .values(
        EVIDENCE_SEED.map((e) => ({
          siddhiSlug: e.siddhiSlug,
          kind: e.kind,
          citation: e.citation,
          url: e.url,
          notes: e.notes,
          confidence: e.confidence,
        }))
      )
      .onConflictDoNothing();

    await database
      .insert(reflections)
      .values(
        REFLECTION_SEED.map((r) => ({
          penName: r.penName,
          siddhiSlug: r.siddhiSlug,
          title: r.title,
          body: r.body,
          tone: r.tone,
        }))
      )
      .onConflictDoNothing();
  }
}

async function runArchiveBootstrap() {
  const database = getDb();
  await ensureSchema(database);
  await ensureSeed(database);
}

let bootstrapped = false;
let bootstrapPromise: Promise<void> | null = null;

export function ensureArchiveSeeded(): Promise<void> {
  if (bootstrapped) return Promise.resolve();

  bootstrapPromise ??= runArchiveBootstrap()
    .then(() => {
      bootstrapped = true;
    })
    .catch((err: unknown) => {
      bootstrapPromise = null;
      console.error("[AstroKalki] bootstrap error:", err);
    });

  return bootstrapPromise;
}
