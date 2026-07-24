import { getDb } from "@/db";
import { siddhis, manuscripts } from "@/db/schema";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import { getSiteUrl } from "@/lib/seo";
import { READER_ENTRIES } from "@/lib/reader-data";
import type { MetadataRoute } from "next";

export const revalidate = 86400; // 24 hours

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
  "/reader",
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

  try {
    const db = getDb();
    await ensureArchiveSeeded();

    const [siddhiRows, manuscriptRows] = await Promise.all([
      db.select().from(siddhis),
      db.select().from(manuscripts),
    ]);

    for (const s of siddhiRows) {
      entries.push({
        url: `${BASE_URL}/siddhi/${s.slug}`,
        lastModified: s.createdAt ?? now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }

    for (const m of manuscriptRows) {
      entries.push({
        url: `${BASE_URL}/manuscripts/${m.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch (error) {
    console.error("Sitemap DB fallback:", error);
    // If DB fails, we still return the static and hardcoded dynamic routes
  }

  for (const slug of YANTRA_SLUGS) {
    entries.push({
      url: `${BASE_URL}/yantras/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const entry of READER_ENTRIES) {
    entries.push({
      url: `${BASE_URL}/reader/${entry.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
