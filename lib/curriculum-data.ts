/**
 * Reading curriculum — structured paths through the siddhi corpus.
 *
 * Each path is a curated sequence of siddhis, designed to take the
 * practitioner from foundation to advanced practice in a specific
 * tradition or theme.
 */

export interface CurriculumPath {
  id: string;
  title: string;
  sanskrit?: string;
  description: string;
  level: "foundation" | "intermediate" | "advanced";
  tradition: string;
  siddhis: { slug: string; name: string; note: string }[];
}

export const CURRICULUM_PATHS: CurriculumPath[] = [
  {
    id: "vedic-foundations",
    title: "The Vedic Foundations",
    sanskrit: "वैदिक मूल",
    description: "Begin here. The three foundational Vedic practices that every contemplative path builds upon. No dīkṣā required — these are universal heritage.",
    level: "foundation",
    tradition: "Vedic",
    siddhis: [
      { slug: "pranava-japa", name: "Pranava Japa (Oṃ)", note: "The primal sound. The Māṇḍūkya Upaniṣad's acoustic map of consciousness. Start here." },
      { slug: "gayatri-mantra", name: "Gāyatrī Mantra", note: "The most widely recited Vedic verse. Petitions Savitṛ for the illumination of contemplative thought." },
      { slug: "mahamrityunjaya", name: "Mahāmṛtyuñjaya Mantra", note: "The death-conquering verse. The cucumber-from-vine simile — willing release, not violent severance." },
    ],
  },
  {
    id: "breath-path",
    title: "The Breath Path",
    sanskrit: "प्राण मार्ग",
    description: "Progressive breath practices from foundation to advanced. The body is the instrument; the breath is the bowstring.",
    level: "foundation",
    tradition: "Yoga / Haṭha",
    siddhis: [
      { slug: "nadi-shuddhi", name: "Nāḍī Śuddhi", note: "Alternate-nostril breath purification. The foundation — balances the autonomic state." },
      { slug: "kumbhaka", name: "Kumbhaka", note: "Breath retention. Patañjali says it 'thins the veil.' The heart of prāṇāyāma." },
      { slug: "soham-dhyana", name: "So'ham Dhyāna", note: "The breath-mantra 'I am That.' The inhale is 'sa,' the exhale is 'ham.'" },
      { slug: "yoga-nidra", name: "Yoga Nidrā", note: "Conscious sleep. The body rests while awareness remains luminous." },
    ],
  },
  {
    id: "sri-vidya-graduation",
    title: "The Śrī Vidyā Graduation",
    sanskrit: "श्री विद्या क्रम",
    description: "The graduated path of Śrī Vidyā — from the gentle entry-level Bālā to the full pañcadaśākṣarī to the fierce culmination. Requires dīkṣā at each stage.",
    level: "advanced",
    tradition: "Śrī Vidyā",
    siddhis: [
      { slug: "bala-tripurasundari-sadhana", name: "Bālā Tripurasundarī", note: "The girl-form. The entry-level Śrī Vidyā practice using the 3-syllable bīja. The gentle foundation." },
      { slug: "shodashi-tripurasundari-sadhana", name: "Ṣoḍaśī / Tripurasundarī", note: "The full 15-syllable pañcadaśākṣarī. The central practice of Śrī Vidyā. Requires sustained Bālā foundation." },
      { slug: "tripura-bhairavi-sadhana", name: "Tripura Bhairavī", note: "The fierce form — the Kundalinī-force in its awakened, ascendant mode. The fierce culmination." },
    ],
  },
  {
    id: "mahavidya-cycle",
    title: "The Mahāvidyā Cycle",
    sanskrit: "दश महाविद्या",
    description: "All ten Mahāvidyās in canonical order — from Kālī (first) to Kamalā (tenth). Each represents a distinct form of the Goddess. HIGH CAUTION — most require dīkṣā.",
    level: "advanced",
    tradition: "Śākta",
    siddhis: [
      { slug: "dakshina-kali-sadhana", name: "1. Dakṣiṇa Kālī", note: "The primary Mahāvidyā. The foundation of all Kālī practice." },
      { slug: "tara-ugra-sadhana", name: "2. Tārā (Ugra)", note: "The fierce Hindu Tārā — distinct from Tibetan Buddhist Tārā." },
      { slug: "shodashi-tripurasundari-sadhana", name: "3. Tripurasundarī (Ṣoḍaśī)", note: "The beautiful sixteen-year-old form. Also the central Śrī Vidyā practice." },
      { slug: "bhuvaneshvari-sadhana", name: "4. Bhuvaneśvarī", note: "The Queen of the Universe. The sovereign creative form." },
      { slug: "bhairavi-proper-sadhana", name: "5. Bhairavī", note: "The teacher Goddess. The Guru aspect of the divine feminine." },
      { slug: "tripura-bhairavi-sadhana", name: "6. Tripura Bhairavī", note: "The fierce form of Tripurasundarī. The awakened Kundalinī." },
      { slug: "dhumavati-sadhana", name: "7. Dhūmāvatī", note: "The smoke-clad widow. The deliberately inauspicious form." },
      { slug: "bagalamukhi-sadhana", name: "8. Bagalāmukhī", note: "The paralyser. The power of stambhana." },
      { slug: "matangi-sadhana", name: "9. Mātaṅgī", note: "The leftover Goddess. The transgressive, Ucchiṣṭa form." },
      { slug: "kamala-sadhana", name: "10. Kamalā", note: "The lotus Goddess. The benevolent, Lakṣmī-like culmination." },
    ],
  },
  {
    id: "shat-karma-framework",
    title: "The Ṣaṭ-Karma Framework",
    sanskrit: "षट्कर्म",
    description: "The six ritual acts of tantric tradition — from the gentle pacification to the most severe transformation. HIGH CAUTION — the fierce four require dīkṣā and supervision.",
    level: "advanced",
    tradition: "Śākta / Ṣaṭ-karma",
    siddhis: [
      { slug: "shanti-karma", name: "1. Śānti (Pacification)", note: "The only saumya (gentle) ṣaṭ-karma. Calming hostile forces. Clay kalāśa." },
      { slug: "vashikarana-karma", name: "2. Vaśīkaraṇa (Subjugation)", note: "Bringing under influence. Crystal kalāśa." },
      { slug: "stambhana-karma", name: "3. Stambhana (Immobilization)", note: "Arresting motion, speech, or intent. Stone kalāśa. Bagalāmukhī presides." },
      { slug: "vidveshana-karma", name: "4. Vidveṣaṇa (Discord)", note: "Creating division between enemies. Iron kalāśa." },
      { slug: "uccatana-karma", name: "5. Uccāṭana (Driving Away)", note: "Forcing departure. Copper kalāśa." },
      { slug: "marana-karma", name: "6. Māraṇa (Transformation)", note: "The most severe. The severing of a hostile force. Skull-bowl kalāśa." },
    ],
  },
  {
    id: "concentration-path",
    title: "The Concentration Path",
    sanskrit: "धारणा मार्ग",
    description: "Progressive concentration practices from the Yoga tradition. Each builds the capacity for sustained attention that the higher practices require.",
    level: "intermediate",
    tradition: "Yoga / Tantra",
    siddhis: [
      { slug: "trataka", name: "Trāṭaka", note: "Steady gazing on a candle flame. The entry point to dhāraṇā." },
      { slug: "chakra-dharana", name: "Cakra Dhāraṇā", note: "Concentration on the six cakras. The Śaṭ-Cakra-Nirūpaṇa framework." },
      { slug: "sri-yantra-dhyana", name: "Śrī Yantra Dhyāna", note: "Contemplation of the Śrī Cakra geometry. The most advanced visual concentration." },
    ],
  },
];
