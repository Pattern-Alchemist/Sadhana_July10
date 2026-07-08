/**
 * Parallel-Sanskrit reader data.
 * Each entry is a primary-source verse with:
 *   - Devanagari
 *   - IAST transliteration
 *   - English translation
 *   - Word-by-word parsing (word → analysis)
 *   - Source citation
 */

export interface SanskritWord {
  devanagari: string;
  iast: string;
  analysis: string;
}

export interface ReaderEntry {
  slug: string;
  title: string;
  tradition: string;
  century: string;
  source: string;
  sourceUrl?: string;
  devanagari: string;
  iast: string;
  english: string;
  wordByWord: SanskritWord[];
  commentary: string;
}

export const READER_ENTRIES: ReaderEntry[] = [
  {
    slug: "mahamrityunjaya-verse",
    title: "Mahāmṛtyuñjaya Mantra",
    tradition: "Vedic (Ṛgveda)",
    century: "c. 1500 BCE",
    source: "Ṛgveda Saṃhitā 7.59.12 (also Taittirīya Saṃhitā 1.8.6.i; Vājasaneyi Saṃhitā 3.60)",
    sourceUrl: "https://www.wisdomlib.org/hinduism/compilation/rig-veda",
    devanagari: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥",
    iast: "oṃ tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam | urvārukam iva bandhanān mṛtyor mukṣīya māmṛtāt ||",
    english: "Om. We worship the Three-eyed One (Tryambaka), the fragrant, the increaser of nourishment. Like a cucumber severed from its bondage to the vine, may I be liberated from death — not from immortality.",
    wordByWord: [
      { devanagari: "ॐ", iast: "oṃ", analysis: "The primordial syllable; the sonic signature of the Absolute." },
      { devanagari: "त्र्यम्बकम्", iast: "tryambakam", analysis: "Three-eyed (tri + ambaka); an epithet of Śiva-Rudra." },
      { devanagari: "यजामहे", iast: "yajāmahe", analysis: "We worship (1st person plural, middle voice of yaj)." },
      { devanagari: "सुगन्धिम्", iast: "sugandhim", analysis: "Fragrant (su + gandha); acc. sg. — the one of good fragrance." },
      { devanagari: "पुष्टिवर्धनम्", iast: "puṣṭivardhanam", analysis: "Increasing nourishment (puṣṭi + vardhana); acc. sg." },
      { devanagari: "उर्वारुकम्", iast: "urvārukam", analysis: "Cucumber / gourd (urvāruka); acc. sg. — the simile vehicle." },
      { devanagari: "इव", iast: "iva", analysis: "Like, as — the comparative particle introducing the simile." },
      { devanagari: "बन्धनात्", iast: "bandhanāt", analysis: "From bondage (bandhana + ablative); from its tether to the vine." },
      { devanagari: "मृत्योः", iast: "mṛtyoḥ", analysis: "From death (mṛtyu + ablative)." },
      { devanagari: "मुक्षीय", iast: "mukṣīya", analysis: "May I be liberated (optative, 1st person singular of muc)." },
      { devanagari: "मा", iast: "mā", analysis: "Not — the prohibitive particle." },
      { devanagari: "अमृतात्", iast: "amṛtāt", analysis: "From immortality (a-mṛta + ablative) — 'not from immortality'." },
    ],
    commentary: "The verse is addressed to Tryambaka ('the Three-eyed'), an epithet of Śiva-Rudra. Its central image — release 'like a cucumber severed from its bondage to the vine' rather than torn from the stalk — is a study in how a single simile carries a theology of conscious, gentle liberation rather than violent severance. The cucumber (urvāruka) is held to detach from its vine when fully ripe; the verse petitions a similar willing release from mortality, not a premature tearing-away. The double negative mā + amṛtāt ('not from immortality') is grammatically striking — it specifies that the release sought is from death, not from the death-transcending state. The verse is among the most widely recited in the tradition for healing and at the hour of death.",
  },
  {
    slug: "gayatri-verse",
    title: "Gāyatrī Mantra",
    tradition: "Vedic (Ṛgveda)",
    century: "c. 1500 BCE",
    source: "Ṛgveda Saṃhitā 3.62.10",
    sourceUrl: "https://www.wisdomlib.org/hinduism/compilation/rig-veda",
    devanagari: "ॐ भूर्भुवः स्वः। तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि। धियो यो नः प्रचोदयात्॥",
    iast: "oṃ bhūr bhuvaḥ svaḥ | tat savitur vareṇyaṃ bhargo devasya dhīmahi | dhiyo yo naḥ pracodayāt ||",
    english: "Om. Earth, atmosphere, heaven. That desirable splendor of Savitṛ, the divine, we contemplate. May he inspire our thoughts.",
    wordByWord: [
      { devanagari: "ॐ", iast: "oṃ", analysis: "The primordial syllable." },
      { devanagari: "भूः", iast: "bhūḥ", analysis: "Earth (the first of the three vyāhṛtis)." },
      { devanagari: "भुवः", iast: "bhuvaḥ", analysis: "Atmosphere / the mid-region (second vyāhṛti)." },
      { devanagari: "स्वः", iast: "svaḥ", analysis: "Heaven / the celestial realm (third vyāhṛti)." },
      { devanagari: "तत्", iast: "tat", analysis: "That — pointing to the transcendent splendor." },
      { devanagari: "सवितुः", iast: "savituḥ", analysis: "Of Savitṛ, the impeller — a solar deity (genitive)." },
      { devanagari: "वरेण्यम्", iast: "vareṇyam", analysis: "Desirable, to be chosen (acc. sg.)." },
      { devanagari: "भर्ग", iast: "bhargo", analysis: "Splendor, radiance (acc. sg.)." },
      { devanagari: "देवस्य", iast: "devasya", analysis: "Of the divine / of the shining one (genitive)." },
      { devanagari: "धीमहि", iast: "dhīmahi", analysis: "We contemplate / meditate upon (1st person plural middle of dhā)." },
      { devanagari: "धियः", iast: "dhiyaḥ", analysis: "Thoughts, contemplations (acc. pl. of dhī)." },
      { devanagari: "यः", iast: "yaḥ", analysis: "Who — relative pronoun referring to Savitṛ." },
      { devanagari: "नः", iast: "naḥ", analysis: "Our (enclitic pronoun)." },
      { devanagari: "प्रचोदयात्", iast: "pracodayāt", analysis: "May he inspire / impel (optative, 3rd person singular of pracod)." },
    ],
    commentary: "The Gāyatrī is the most widely recited Vedic mantra, addressed to Savitṛ (the solar 'impeller' deity) and petitioning the illumination of contemplative thought. The three vyāhṛtis (bhūḥ, bhuvaḥ, svaḥ) name the three cosmological realms — earth, atmosphere, heaven — and frame the verse as a cosmological act of contemplation. The grammar is precise: dhīmahi is first-person plural middle ('we contemplate'), and pracodayāt is third-person singular optative ('may he inspire'). The verse is the seed of the sandhyā-vandana (the thrice-daily Vedic contemplative rite) and is held to be the most compact expression of the Vedic contemplative impulse.",
  },
  {
    slug: "pranava-om",
    title: "Praṇava (Oṃ)",
    tradition: "Vedic / Upaniṣadic",
    century: "pre-common era",
    source: "Māṇḍūkya Upaniṣad vv. 1-12",
    sourceUrl: "https://www.wisdomlib.org/hinduism/book/mandukya-upanishad",
    devanagari: "ॐ",
    iast: "oṃ",
    english: "The syllable Oṃ — the acoustic map of consciousness. The Māṇḍūkya parses its three phonemes (A-U-M) into the three states of waking, dream, and deep sleep, with the ensuing silence as the fourth — turīya.",
    wordByWord: [
      { devanagari: "अ", iast: "a", analysis: "The first phoneme — corresponds to the waking state (jāgrat / vaiśvānara)." },
      { devanagari: "उ", iast: "u", analysis: "The second phoneme — corresponds to the dream state (svapna / taijasa)." },
      { devanagari: "म्", iast: "m", analysis: "The third phoneme — corresponds to deep sleep (suṣupti / prājña)." },
      { devanagari: "(शान्तम्)", iast: "(śāntam)", analysis: "The silence after the syllable — the fourth state (turīya), the witnessing awareness." },
    ],
    commentary: "The Māṇḍūkya Upaniṣad — the shortest of the major Upaniṣads, twelve verses in total — is entirely devoted to the analysis of the single syllable Oṃ. The syllable is treated not as a mere word but as an acoustic map of consciousness itself: the three phonemes (A-U-M) are mapped to the three states of waking, dream, and deep sleep, and the silence that follows — the attenuation of the sound into stillness — is identified as turīya, the fourth state, the witnessing awareness that is the ground of the other three. This analysis is the philosophical foundation of pranava-japa (the contemplative repetition of Oṃ) and is among the most influential contemplative frameworks in the entire Indic tradition.",
  },
];

export function getReaderEntry(slug: string): ReaderEntry | undefined {
  return READER_ENTRIES.find((e) => e.slug === slug);
}
