/**
 * Sanskrit morphological analyzer — sandhi-aware stemmer.
 *
 * This is a RULE-BASED morphological analyzer (not a dictionary-based one).
 * It recognizes common Sanskrit morphological endings:
 *   - Verb conjugations (present tense endings: -ti, -anti, -āmi, -āmaḥ, -asi, -atha, -āvahe, -mahe, -dhve, -ate, -ante)
 *   - Noun declensions (case endings: -ḥ, -m, -ena, -āya, -āt, -e, -au, -ās, -ī, -yā, -bhiḥ, -bhyaḥ, -su)
 *   - Common suffixes (-tva, -tā, -ka, -in, -imat, -vat, -maya, -ācārya, -sūtra)
 *   - Compounds (sandhi at morpheme boundaries)
 *
 * The analyzer reduces a word to its likely stem, then expands the stem to
 * all known inflected forms for FTS5 MATCH query construction.
 *
 * This is NOT a full Sanskrit parser — it's a fuzzy morphological search
 * aid. It will produce both false positives (irrelevant matches) and false
 * negatives (missed inflections). The goal is recall improvement over
 * plain substring search.
 *
 * Reference: Whitney's "Sanskrit Grammar" (1879) for the conjugational
 * and declensional endings; Apte's "Sanskrit-English Dictionary" for
 * the stem-formation rules.
 */

// ---------- Sandhi resolution ----------
// Map common sandhi-merged forms back to their components.
const SANDHI_SPLIT: Record<string, string[]> = {
  // Vowel sandhi
  "o": ["aḥ", "as"],   // so 'ham → saḥ aham
  "e": ["aḥ", "as"],   // devo 'ham → devaḥ aham
  "āu": ["aḥ", "as"],
  "ai": ["āḥ", "ās"],
  // Visarga sandhi
  "o'": ["aḥ a", "as a"],
  "o-": ["aḥ a", "as a"],
};

// ---------- Verb conjugational endings (present system) ----------
// Parasmaipada (active) and ātmanepada (middle) endings for the present tense.
const VERB_ENDINGS_PARASMAIPADA = [
  "ti", "anti",       // 3rd sg / 3rd pl
  "si", "tha",        // 2nd sg / 2nd pl
  "mi", "maḥ", "vas", "mas",  // 1st sg / 1st pl / 1st dual / 1st pl (alt)
  "vaḥ",              // 1st dual
];

const VERB_ENDINGS_ATMANEPADA = [
  "te", "ante", "āte", "rate",  // 3rd
  "se", "dhve",                 // 2nd
  "e", "mahe", "vahe", "āmahe", // 1st
];

// Optative, imperative, and other mood endings (common)
const VERB_ENDINGS_MOOD = [
  "yāt", "yāmaḥ", "yāt",  // optative
  "tu", "tantu", "tām",   // imperative
  "t", "an",              // aorist
];

// ---------- Noun case endings ----------
// Common endings across all three genders, all eight cases, singular/plural.
// (Not exhaustive — covers the most frequent forms.)
const NOUN_ENDINGS = [
  // Nominative
  "ḥ", "au", "as",
  // Accusative
  "m", "au", "as",
  // Instrumental
  "ā", "bhyām", "bhiḥ",
  // Dative
  "e", "bhyām", "bhyaḥ",
  // Ablative
  "as", "āt", "bhyām", "bhyaḥ",
  // Genitive
  "as", "os", "ām", "nām",
  // Locative
  "i", "os", "su",
  // Vocative
  "s", "au", "as",
];

// ---------- Common derivational suffixes ----------
const DERIVATIONAL_SUFFIXES = [
  // Abstract nouns
  "tva", "tā", "yatā",
  // Agent nouns
  "ka", "in", "imat", "vat", "tṛ", "aka",
  // Adjectives of material
  "maya", "mayaḥ",
  // Scholastic
  "ācārya", "sūtra", "śāstra", "vidyā", "vid", "vādin",
  // Feminine markers
  "ī", "ā", "nī",
  // Comparative / superlative
  "tara", "tama",
];

// ---------- Prefixes (upasarga) and preverbs ----------
const PREFIXES = [
  "pra", "ati", "anu", "ava", "ā", "ni", "vi", "sam", "ut", "upa",
  "apa", "pari", "abhi", "prati", "su", "dur", "a", "an",
];

// ---------- Common stems that should not be further reduced ----------
// (Dictionary headword forms that are already stems)
const STOP_STEMS = new Set([
  "om", "aum", "śiva", "viṣṇu", "devī", "kālī", "gāyatrī",
  "tantra", "mantra", "yantra", "veda", "yoga", "dharma", "karma",
  "siddhi", "mokṣa", "ātman", "brahman",
]);

// ---------- The analyzer ----------

export interface MorphAnalysis {
  /** The original input word */
  input: string;
  /** The reduced stem(s) — may be multiple if ambiguous */
  stems: string[];
  /** The morphological analyses (which endings were stripped) */
  analyses: { stem: string; ending: string; type: string }[];
}

/**
 * Analyze a Sanskrit word and reduce it to its likely stem(s).
 *
 * Strategy:
 *   1. If the word is in STOP_STEMS, return it as-is.
 *   2. Strip known verb endings → candidate stems.
 *   3. Strip known noun endings → candidate stems.
 *   4. Strip derivational suffixes → candidate stems.
 *   5. For each candidate stem, also check if it's a prefixed form.
 *   6. Deduplicate.
 */
export function analyzeWord(word: string): MorphAnalysis {
  const input = word.trim().toLowerCase().replace(/\.$/, "");
  const stems = new Set<string>();
  const analyses: { stem: string; ending: string; type: string }[] = [];

  // 1. Stop stems
  if (STOP_STEMS.has(input)) {
    stems.add(input);
    analyses.push({ stem: input, ending: "", type: "stop-stem" });
    return { input, stems: [input], analyses };
  }

  // 2. Verb endings
  for (const ending of [...VERB_ENDINGS_PARASMAIPADA, ...VERB_ENDINGS_ATMANEPADA, ...VERB_ENDINGS_MOOD]) {
    if (input.length > ending.length + 2 && input.endsWith(ending)) {
      const stem = input.slice(0, input.length - ending.length);
      // Sanity: stems should be at least 2 chars
      if (stem.length >= 2) {
        stems.add(stem);
        analyses.push({ stem, ending, type: "verb-ending" });
        // Also add the root without a possible thematic vowel
        if (stem.endsWith("a")) {
          stems.add(stem.slice(0, -1));
          analyses.push({ stem: stem.slice(0, -1), ending: stem.endsWith("a") ? "a" + ending : ending, type: "verb-root" });
        }
      }
    }
  }

  // 3. Noun endings
  for (const ending of NOUN_ENDINGS) {
    if (input.length > ending.length + 2 && input.endsWith(ending)) {
      const stem = input.slice(0, input.length - ending.length);
      if (stem.length >= 2) {
        stems.add(stem);
        analyses.push({ stem, ending, type: "noun-ending" });
        // Stem might be a thematic a-stem
        if (stem.endsWith("a")) {
          stems.add(stem.slice(0, -1));
        }
      }
    }
  }

  // 4. Derivational suffixes
  for (const suffix of DERIVATIONAL_SUFFIXES) {
    if (input.length > suffix.length + 2 && input.endsWith(suffix)) {
      const stem = input.slice(0, input.length - suffix.length);
      if (stem.length >= 2) {
        stems.add(stem);
        analyses.push({ stem, ending: suffix, type: "derivational-suffix" });
      }
    }
  }

  // 5. Prefix stripping
  for (const prefix of PREFIXES) {
    if (input.length > prefix.length + 2 && input.startsWith(prefix)) {
      const remainder = input.slice(prefix.length);
      // If the remainder itself looks like a known stem, add the unprefixed form
      if (remainder.length >= 2 && !PREFIXES.includes(remainder)) {
        stems.add(remainder);
        analyses.push({ stem: remainder, ending: prefix, type: "prefix-stripped" });
      }
    }
  }

  // Always include the original word as a candidate (it might already be a stem)
  stems.add(input);
  analyses.push({ stem: input, ending: "", type: "as-is" });

  return {
    input,
    stems: Array.from(stems),
    analyses,
  };
}

/**
 * Given a query word, generate the FTS5 MATCH query terms that will match
 * the word AND all its likely inflected forms.
 *
 * The approach: analyze the word, take all candidate stems, and for each
 * stem generate a prefix-match that will catch inflections.
 *
 * Returns a string suitable for FTS5 MATCH, e.g.:
 *   "japa" OR "jap*" OR "japati" OR "japanti"
 */
export function expandQueryForMorphology(query: string): string {
  const words = query
    .trim()
    .toLowerCase()
    .split(/[\s,;:]+/)
    .filter((w) => w.length > 1);

  if (words.length === 0) return "";

  const expandedTerms: string[] = [];

  for (const word of words) {
    const analysis = analyzeWord(word);
    // For each stem, generate a prefix-match (japa → "japa*" via FTS5 prefix syntax)
    // Plus the original word
    for (const stem of analysis.stems.slice(0, 5)) {  // limit to 5 stems per word
      if (stem.length >= 3) {
        expandedTerms.push(`"${stem}"`);
        // Also add a prefix form to catch inflections
        // FTS5 prefix: "japa" matches "japa", "japati", "japanti" etc.
        expandedTerms.push(`"${stem}"*`);
      }
    }
    // Always include the original word
    expandedTerms.push(`"${word}"`);
  }

  // Deduplicate
  const unique = Array.from(new Set(expandedTerms));

  // Join with OR (FTS5 syntax)
  return unique.join(" OR ");
}

/**
 * Generate a human-readable explanation of the morphological analysis
 * for display in the search UI.
 */
export function explainAnalysis(query: string): {
  word: string;
  stems: string[];
  analysis: string;
}[] {
  const words = query
    .trim()
    .toLowerCase()
    .split(/[\s,;:]+/)
    .filter((w) => w.length > 1);

  return words.map((word) => {
    const analysis = analyzeWord(word);
    const typeCounts: Record<string, number> = {};
    for (const a of analysis.analyses) {
      typeCounts[a.type] = (typeCounts[a.type] || 0) + 1;
    }
    const types = Object.keys(typeCounts).join(", ");
    return {
      word,
      stems: analysis.stems.slice(0, 5),
      analysis: types,
    };
  });
}
