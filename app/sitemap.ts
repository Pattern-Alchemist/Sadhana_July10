import { getDb } from "@/db";
import { siddhis, manuscripts } from "@/db/schema";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import { getSiteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

/**
 * AstroKalki sitemap.
 *
 * Generates sitemap.xml with all dynamic routes:
 *   - 35 siddhi folios
 *   - 11 manuscripts
 *   - 18 yantras
 *   - 1 knowledge archive
 *   - 9 static pages
 *
 * Total: ~74 URLs.
 */

export const dynamic = "force-dynamic";

const BASE_URL = getSiteUrl();

const STATIC_ROUTES = [
  "",
  "/archive",
  "/archivist",
  "/comparative",
  "/cosmos",
  "/journey",
  "/knowledge",
  "/lineage",
  "/manuscripts",
  "/safety",
  "/schools",
  "/yantras",
];

const YANTRA_SLUGS = [
  "sri-cakra",
  "dakshina-kali",
  "guhyakali",
  "tara-ugra",
  "tripura-bhairavi",
  "bhuvaneshvari",
  "kamala",
  "dhumavati",
  "matangi",
  "smasana-bhairavi",
  "preta-sandhi",
  "sudarshana",
  "bala-tripurasundari",
  "bagalamukhi",
  "pratyangira",
  "vajrayogini",
  "lakulisha-linga",
  "nath-cakra",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = getDb();
  await ensureArchiveSeeded();

  const [siddhiRows, manuscriptRows] = await Promise.all([
    db.select().from(siddhis),
    db.select().from(manuscripts),
  ]);

  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Static routes — monthly refresh
  for (const path of STATIC_ROUTES) {
    entries.push({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: path === "" ? 1.0 : 0.8,
    });
  }

  // Siddhi folios — weekly refresh (corpus is stable but evidence accumulates)
  for (const s of siddhiRows) {
    entries.push({
      url: `${BASE_URL}/siddhi/${s.slug}`,
      lastModified: s.createdAt ?? now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Manuscripts — monthly refresh (stable catalogue)
  for (const m of manuscriptRows) {
    entries.push({
      url: `${BASE_URL}/manuscripts/${m.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Yantra deep-view routes — monthly refresh (stable renderings)
  for (const slug of YANTRA_SLUGS) {
    entries.push({
      url: `${BASE_URL}/yantras/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
