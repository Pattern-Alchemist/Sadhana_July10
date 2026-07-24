/**
 * IAST → ASCII diacritic folding (Roadmap T-002).
 * ================================================
 *
 * Single source of truth for folding International Alphabet of Sanskrit
 * Transliteration characters down to ASCII. Used by:
 *
 *  - `app/api/archivist/route.ts` — folds both the query and candidate field
 *    values in the JS scoring fallback so "Siva" matches "Śiva" and "Om"
 *    matches "Oṃ".
 *  - `app/api/knowledge/route.ts` companions — slug generation parity with
 *    `scripts/build_knowledge_archive.py` (which folds the same way).
 *  - `tests/unit/iast-fold.test.ts`.
 *
 * The Postgres full-text tier folds with the `unaccent` extension instead
 * (see the archivist route); this module is the application-side mirror.
 */

export const IAST_FOLD: Readonly<Record<string, string>> = {
  ā: "a", á: "a", à: "a", â: "a", Ā: "A", Á: "A", À: "A", Â: "A",
  ī: "i", í: "i", ì: "i", î: "i", Ī: "I", Í: "I", Ì: "I", Î: "I",
  ū: "u", ú: "u", ù: "u", û: "u", Ū: "U", Ú: "U", Ù: "U", Û: "U",
  ṛ: "r", ṝ: "r", ṙ: "r", Ṛ: "R", Ṝ: "R", Ṙ: "R",
  ṅ: "n", ñ: "n", ṇ: "n", Ṅ: "N", Ñ: "N", Ṇ: "N",
  ṭ: "t", ḍ: "d", Ṭ: "T", Ḍ: "D",
  ś: "s", ṣ: "s", Ś: "S", Ṣ: "S",
  ḥ: "h", ṃ: "m", ṁ: "m", Ḥ: "H", Ṃ: "M", Ṁ: "M",
  "—": "-", "–": "-",
  "’": "", "‘": "",
  "“": '"', "”": '"',
} as const;

/**
 * Fold every known IAST/diacritic character to its ASCII equivalent,
 * passing unknown characters through unchanged.
 */
export function foldDiacritics(s: string): string {
  return Array.from(s)
    .map((c) => IAST_FOLD[c] ?? c)
    .join("");
}

/** Lowercase ASCII slug — mirrors scripts/build_knowledge_archive.py. */
export function slugify(name: string): string {
  const folded = foldDiacritics(name).toLowerCase();
  return folded.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
