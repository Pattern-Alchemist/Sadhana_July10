import { db } from "@/db";
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
 * Self-healing schema. Mirrors src/db/schema.ts as idempotent DDL so the
 * application functions even against a freshly created / reset database.
 * (drizzle-kit push is the primary path; this is the safety net.)
 */
async function ensureSchema() {
  await db.execute(sql`
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
  await db.execute(sql`
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
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS schools (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      focus TEXT,
      description TEXT,
      order_index INTEGER
    );
  `);
  await db.execute(sql`
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
  await db.execute(sql`
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
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS evidence_siddhi_idx ON evidence_sources (siddhi_slug);
  `);
}

async function ensureSeed() {
  const raw = await db.execute(sql`SELECT count(*)::int AS c FROM siddhis`);
  const arr = ((raw as { rows?: unknown[] }).rows ?? []) as { c: number }[];
  const siddhiRows = Number(arr[0]?.c ?? 0);
  if (siddhiRows === 0) {
    await db
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

    await db
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

    await db
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

    await db
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

    await db
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

let bootstrapped = false;

export async function ensureArchiveSeeded() {
  if (bootstrapped) return;
  try {
    await ensureSchema();
    await ensureSeed();
    bootstrapped = true;
  } catch (err) {
    console.error("[AstroKalki] bootstrap error:", err);
  }
}
