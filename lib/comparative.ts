/**
 * Comparative Knowledge Engine
 * Cross-tradition overlap matrix. Static scholarly synthesis,
 * framed to separate historical fact from interpretive claim.
 */

export interface Tradition {
  key: string;
  name: string;
  short: string;
  glyph: string;
  accent: string;
}

export const traditions: Tradition[] = [
  { key: "tantra", name: "Hindu Tantra & Yoga", short: "Tantra", glyph: "☸", accent: "gold" },
  { key: "vajrayana", name: "Vajrayāna Buddhism", short: "Vajrayāna", glyph: " dorje", accent: "cyan" },
  { key: "hermetic", name: "Hermeticism", short: "Hermetic", glyph: "✶", accent: "purple" },
  { key: "christian", name: "Christian Mysticism", short: "Christian", glyph: "✝", accent: "rose" },
  { key: "neuro", name: "Contemporary Neuroscience", short: "Neuroscience", glyph: "◎", accent: "sage" },
];

export interface ConceptRow {
  concept: string;
  gloss: string;
  /** overlap notes keyed by tradition key */
  cells: Record<string, { term: string; note: string }>;
}

export const matrix: ConceptRow[] = [
  {
    concept: "Subtle Body & Channels",
    gloss:
      "An unseen anatomy of vital currents (prāṇa) flowing through conduits (nāḍī) that converge at centers (cakra).",
    cells: {
      tantra: { term: "Nāḍī · Cakra · Prāṇa", note: "72,000 nāḍī; iḍā, piṅgalā, suṣumṇā." },
      vajrayana: { term: "Tsa · Lung · Tigle", note: "Channels (nāḍī), winds (prāṇa), drops." },
      hermetic: { term: "Astral Body · Aether", note: "Vehicle of the soul traversing spheres." },
      christian: { term: "Spiritual Senses", note: "'Inner senses' of the contemplative heart." },
      neuro: { term: "Autonomic Networks", note: "Vagal tone, interoception, CNS arousal." },
    },
  },
  {
    concept: "Sacred Sound & Vibration",
    gloss:
      "The doctrine that formulated sound can reorder consciousness — and, in some claims, matter.",
    cells: {
      tantra: { term: "Mantra · Bīja", note: "Seed-syllables as sonic form (Śabda)." },
      vajrayana: { term: "Mantra · OṂ", note: "Speech as one of three vajra gates." },
      hermetic: { term: "Logos · Verbum", note: "Creative Word structuring creation." },
      christian: { term: "Jesus Prayer", note: "Ceaseless invocation of the Name." },
      neuro: { term: "Vocalization & Mantra", note: "Repetition modulates default-mode activity." },
    },
  },
  {
    concept: "Awakening & Liberation",
    gloss:
      "The endpoint of the path: release from ordinary identification into a recognized prior freedom.",
    cells: {
      tantra: { term: "Mokṣa · Jīvanmukti", note: "Liberation while living, recognition (pratyabhijñā)." },
      vajrayana: { term: "Buddhahood", note: "Awakening of mind's innate luminosity." },
      hermetic: { term: "Gnosis", note: "Direct knowledge reuniting soul to the One." },
      christian: { term: "Theosis", note: "Participation in divine life (deification)." },
      neuro: { term: "Self-Model Collapse", note: "Loosened narrative self; 'ego-dissolution'." },
    },
  },
  {
    concept: "Sacred Diagram",
    gloss:
      "A geometric instrument used to anchor, generate, or contemplate a deity or principle.",
    cells: {
      tantra: { term: "Yantra · Śrī Cakra", note: "Interlocking triangles; dwelling of the goddess." },
      vajrayana: { term: "Maṇḍala", note: "Mapped palace of awakened mandala-deities." },
      hermetic: { term: "Magic Circle", note: "Boundary of operation and protection." },
      christian: { term: "Mandorla · Rose", note: "Vesica of glory; cathedral rose windows." },
      neuro: { term: "Symmetry & Pattern", note: "Symmetric imagery recruits reward/attention." },
    },
  },
  {
    concept: "Ethical Prerequisite",
    gloss:
      "A moral or behavioral foundation held to precede — and protect — deeper practice.",
    cells: {
      tantra: { term: "Yama · Niyama", note: "Restraints & observances (Patañjali, Aṣṭāṅga)." },
      vajrayana: { term: "Bodhicitta · Śīla", note: "Compassion-vow and ethics as ground." },
      hermetic: { term: "Purification", note: "Moral cleansing before theurgy." },
      christian: { term: "Humility · Charity", note: "Virtues guarding contemplation." },
      neuro: { term: "Set & Setting", note: "Intention & context shape practice outcomes." },
    },
  },
];
