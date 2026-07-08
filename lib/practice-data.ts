/**
 * Shared data for the 20 new practice features.
 */

// #10 — Deity of the day rotation (weekday-based)
export const DEITY_ROTATION = [
  { day: 0, name: "Sūrya", sanskrit: "सूर्य", role: "The Sun — vitality, health, illumination", color: "var(--color-gold-bright)" },
  { day: 1, name: "Śiva", sanskrit: "शिव", role: "The Auspicious One — consciousness, meditation, dissolution", color: "var(--color-cyan-accent)" },
  { day: 2, name: "Hanumān", sanskrit: "हनुमान्", role: "Strength, devotion, protection — the crisis-grounding deity", color: "var(--color-rose-accent)" },
  { day: 3, name: "Viṣṇu", sanskrit: "विष्णु", role: "The Preserver — dharma, protection, sustenance", color: "var(--color-sage)" },
  { day: 4, name: "Guru / Bṛhaspati", sanskrit: "गुरु", role: "The Teacher — wisdom, learning, transmission", color: "var(--color-gold)" },
  { day: 5, name: "Devī / Lakṣmī", sanskrit: "देवी", role: "The Goddess — abundance, beauty, Śrī Vidyā", color: "var(--color-purple-accent)" },
  { day: 6, name: "Śani / Bhairava", sanskrit: "शनि", role: "Saturn / The Fierce — discipline, threshold, dissolution of ego", color: "var(--color-gold-deep)" },
];

// #13 — Seasonal practice recommendations (Ayurvedic rtu)
export const SEASONS = [
  { id: "vasanta", name: "Vasanta (Spring)", months: "Mar-May", recommendation: "Detoxification, cooling practices, Kapha-balancing. Gāyatrī japa, Nāḍī Śuddhi.", element: "Kapha" },
  { id: "grishma", name: "Grīṣma (Summer)", months: "Jun-Jul", recommendation: "Calming, moon-focused, Pitta-balancing. Moon visualization, gentle Pranava Japa.", element: "Pitta" },
  { id: "varsha", name: "Varṣā (Monsoon)", months: "Aug-Sep", recommendation: "Grounding, Vata-balancing. Mūlādhāra dhāraṇā, Nāḍī Śuddhi, steady rhythms.", element: "Vāta" },
  { id: "sharad", name: "Śarad (Autumn)", months: "Oct-Nov", recommendation: "Balancing, equanimity. Trāṭaka, Mahāmṛtyuñjaya, equilibrium practices.", element: "Pitta" },
  { id: "hemanta", name: "Hemanta (Winter)", months: "Dec-Jan", recommendation: "Heating, fire practices, building. Agni-sādhana, Kumbhaka, Mahāvidyā fire rites.", element: "Kapha" },
  { id: "shishira", name: "Śiśira (Late Winter)", months: "Feb", recommendation: "Building, strengthening. Prāṇāyāma, Haṭha, physical practice with breath.", element: "Kapha" },
];

export function getCurrentSeason(): typeof SEASONS[0] {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return SEASONS[0]; // Mar-May
  if (month >= 5 && month <= 6) return SEASONS[1]; // Jun-Jul
  if (month >= 7 && month <= 8) return SEASONS[2]; // Aug-Sep
  if (month >= 9 && month <= 10) return SEASONS[3]; // Oct-Nov
  if (month >= 11 || month === 0) return SEASONS[4]; // Dec-Jan
  return SEASONS[5]; // Feb
}

// #14 — Sacred-text quotes
export const QUOTES = [
  { text: "Truth is one; the wise call it by many names.", source: "Ṛgveda I.164.46", url: "/manuscripts" },
  { text: "That which is invisible, ungraspable, without lineage, without color, without eye or ear, without hand or foot — eternal, all-pervading, omnipresent, exceedingly subtle — that is the undecaying which the wise perceive as the source of all.", source: "Muṇḍaka Upaniṣad I.1.6", url: "/reader/mahamrityunjaya-verse" },
  { text: "Yoga is the cessation of the modifications of the mind.", source: "Yoga Sūtras I.2", url: "/siddhi/kumbhaka" },
  { text: "When the breath wanders, the mind is unsteady; when the breath is still, the mind is still.", source: "Haṭha Yoga Pradīpikā II.2", url: "/siddhi/nadi-shuddhi" },
  { text: "The Self is not born, nor does it die. Unborn, eternal, ever-existing, primeval — it is not slain when the body is slain.", source: "Bhagavad Gītā II.20", url: "/siddhi/mahamrityunjaya" },
  { text: "Whatever is here, that is there; what is there, that is here. Whoever sees difference here, goes from death to death.", source: "Kaṭha Upaniṣad II.1.10", url: "/reader" },
  { text: "The syllable Oṃ is all this. All that is, was, and will be is Oṃ. And whatever transcends past, present, and future — that also is Oṃ.", source: "Māṇḍūkya Upaniṣad I", url: "/siddhi/pranava-japa" },
  { text: "Where there is pleasure, there is no freedom from pain; where there is pain, there is no pleasure. The wise one seeks neither.", source: "Vijñāna Bhairava Tantra v. 18", url: "/siddhi/ajapa-japa" },
  { text: "As a cucumber severed from its bondage to the vine, may I be liberated from death — not from immortality.", source: "Ṛgveda VII.59.12", url: "/reader/mahamrityunjaya-verse" },
  { text: "The Goddess is the power of consciousness. By her, all this is known. She is the knower, the knowing, and the known.", source: "Śaṭ-Cakra-Nirūpaṇa v. 1", url: "/siddhi/chakra-dharana" },
  { text: "When the mind is absorbed, the breath is absorbed. When the breath is absorbed, the mind is absorbed.", source: "Haṭha Yoga Pradīpikā II.2", url: "/siddhi/kumbhaka" },
  { text: "From the unreal, lead me to the real. From darkness, lead me to light. From death, lead me to immortality.", source: "Bṛhadāraṇyaka Upaniṣad I.3.28", url: "/reader" },
  { text: "The fire of yoga burns all karma. The fire of knowledge burns all karma.", source: "Bhagavad Gītā IV.37", url: "/siddhi/manasika-japa" },
  { text: "He who sees the Self in all beings, and all beings in the Self — he sees truly.", source: "Īśā Upaniṣad 6", url: "/siddhi/soham-dhyana" },
  { text: "Sound is Śiva; Śiva is sound. The entire universe is the play of sound.", source: "Kālī Tantra", url: "/siddhi/dakshina-kali-sadhana" },
];

export function getDailyQuote(): typeof QUOTES[0] {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return QUOTES[dayOfYear % QUOTES.length];
}

// #1 — Session builder step types
export interface SessionStep {
  id: string;
  type: "asana" | "pranayama" | "japa" | "dhyanā" | "yantra" | "breath" | "rest";
  name: string;
  duration: number; // minutes
}

export const STEP_TYPES = [
  { type: "asana", label: "Āsana", icon: "🧘", defaultDuration: 5 },
  { type: "pranayama", label: "Prāṇāyāma", icon: "🌬️", defaultDuration: 10 },
  { type: "japa", label: "Japa", icon: "📿", defaultDuration: 15 },
  { type: "dhyanā", label: "Dhyāna", icon: "🕉️", defaultDuration: 10 },
  { type: "yantra", label: "Yantra Dhyāna", icon: "🔺", defaultDuration: 10 },
  { type: "breath", label: "Breath Practice", icon: "💨", defaultDuration: 8 },
  { type: "rest", label: "Rest / Śavāsana", icon: "😴", defaultDuration: 5 },
];

// #7 — Practice dependencies
export const DEPENDENCIES = [
  { siddhi: "shodashi-tripurasundari-sadhana", requires: ["bala-tripurasundari-sadhana"], label: "Bālā Tripurasundarī" },
  { siddhi: "tripura-bhairavi-sadhana", requires: ["shodashi-tripurasundari-sadhana"], label: "Ṣoḍaśī / Tripurasundarī" },
  { siddhi: "guhyakali-sadhana", requires: ["dakshina-kali-sadhana"], label: "Dakṣiṇa Kālī" },
  { siddhi: "preta-siddhi", requires: ["kala-bhairava-sadhana"], label: "Kāla Bhairava (protective foundation)" },
  { siddhi: "smasana-bhairavi-sadhana", requires: ["dakshina-kali-sadhana"], label: "Dakṣiṇa Kālī (Kālī foundation)" },
  { siddhi: "kumbhaka", requires: ["nadi-shuddhi"], label: "Nāḍī Śuddhi (breath foundation)" },
  { siddhi: "chakra-dharana", requires: ["trataka"], label: "Trāṭaka (concentration foundation)" },
  { siddhi: "sri-yantra-dhyana", requires: ["chakra-dharana"], label: "Cakra Dhāraṇā (intermediate concentration)" },
];

// #15 — Protection checklist items
export const PROTECTION_CHECKLIST = [
  { id: "raksha-sutra", label: "Rakṣā-sūtra tied on right wrist", required: true },
  { id: "tripundra", label: "Tripuṇḍra (vibhūti) applied on forehead", required: true },
  { id: "agni-jala", label: "Agnī-jāla Rakṣā chanted 21×", required: true },
  { id: "direction", label: "Correct direction faced (per source text)", required: true },
  { id: "diet", label: "Dietary restraint observed (no meat/alcohol/onion/garlic)", required: true },
  { id: "mantle", label: "Protective mantle visualized (golden aura)", required: true },
  { id: "mala", label: "Rudrākṣa mālā in right hand", required: false },
  { id: "ground", label: "Ground prepared (śaṭkoṇa / maṇḍala / yantra in place)", required: true },
];
