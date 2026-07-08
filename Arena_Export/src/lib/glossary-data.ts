/**
 * Sanskrit glossary — curated key terms for the AstroKalki archive.
 * Each entry: Devanagari, IAST, English gloss, etymology, category, related siddhis.
 */

export interface GlossaryEntry {
  iast: string;
  devanagari: string;
  english: string;
  etymology: string;
  category: "philosophy" | "practice" | "deity" | "text" | "cosmology" | "ritual" | "anatomy";
  related?: string[];
}

export const GLOSSARY: GlossaryEntry[] = [
  // Philosophy
  { iast: "siddhi", devanagari: "सिद्धि", english: "Attainment; contemplative accomplishment; a specific power or faculty arising from sustained practice.", etymology: "sidh — to succeed, accomplish", category: "philosophy" },
  { iast: "turīya", devanagari: "तुरीय", english: "The fourth state of consciousness — beyond waking, dream, and deep sleep; the witnessing awareness.", etymology: "turīya — the fourth", category: "philosophy", related: ["yoga-nidra", "pranava-japa"] },
  { iast: "mokṣa", devanagari: "मोक्ष", english: "Liberation; release from the cycle of birth and death.", etymology: "muc — to free, release", category: "philosophy" },
  { iast: "brahman", devanagari: "ब्रह्मन्", english: "The Absolute; the ultimate reality in Vedānta.", etymology: "bṛh — to expand, grow", category: "philosophy" },
  { iast: "ātman", devanagari: "आत्मन्", english: "The Self; the innermost witnessing consciousness.", etymology: "an — to breathe", category: "philosophy" },
  { iast: "pratyabhijñā", devanagari: "प्रत्यभिज्ञा", english: "Recognition; the direct recognition of one's own nature as Śiva — central to Kashmir Śaiva non-dualism.", etymology: "prati + abhijñā — to recognise", category: "philosophy" },
  { iast: "abheda", devanagari: "अभेद", english: "Non-difference; the recognition that Śiva and Śakti, jīva and brahman, are one.", etymology: "a + bheda — non-division", category: "philosophy" },
  { iast: "māyā", devanagari: "माया", english: "The creative power of consciousness that produces the appearance of differentiation.", etymology: "mā — to measure, form", category: "philosophy" },

  // Practice
  { iast: "japa", devanagari: "जप", english: "Repetition of a mantra — aloud (vācika), whispered (upāṁśu), or mental (mānasika).", etymology: "jap — to mutter, whisper", category: "practice", related: ["pranava-japa", "manasika-japa"] },
  { iast: "dhyāna", devanagari: "ध्यान", english: "Meditation; sustained unbroken contemplation.", etymology: "dhyai — to contemplate", category: "practice" },
  { iast: "dhāraṇā", devanagari: "धारणा", english: "Concentration; the holding of attention on a single object.", etymology: "dhṛ — to hold", category: "practice", related: ["trataka", "chakra-dharana"] },
  { iast: "prāṇāyāma", devanagari: "प्राणायाम", english: "Breath regulation; the fourth limb of aṣṭāṅga yoga.", etymology: "prāṇa + āyāma — breath + extension", category: "practice", related: ["nadi-shuddhi", "kumbhaka"] },
  { iast: "kumbhaka", devanagari: "कुम्भक", english: "Breath retention; the suspension of breath after inhalation (pūraka) or exhalation (recaka).", etymology: "kumbha — pot", category: "practice" },
  { iast: "pratyāhāra", devanagari: "प्रत्याहार", english: "Withdrawal of the senses from their objects; the fifth limb of aṣṭāṅga yoga.", etymology: "prati + ā-hṛ — to draw back", category: "practice" },
  { iast: "saṅkalpa", devanagari: "सङ्कल्प", english: "Intention; a formulated will or purpose, often spoken at the start of a practice.", etymology: "saṁ + kalp — to resolve", category: "practice" },
  { iast: "yoga-nidrā", devanagari: "योगनिद्रा", english: "Yogic sleep; the state between waking and sleep where awareness is retained.", etymology: "yoga + nidrā", category: "practice", related: ["yoga-nidra"] },

  // Deity
  { iast: "Kālī", devanagari: "काली", english: "The first Mahāvidyā; the fierce form of the Goddess, consort of Śiva, associated with time, death, and transformation.", etymology: "kāla — time", category: "deity", related: ["dakshina-kali-sadhana", "guhyakali-sadhana"] },
  { iast: "Tripurasundarī", devanagari: "त्रिपुरसुन्दरी", english: "The beautiful Goddess of the three cities; central deity of Śrī Vidyā.", etymology: "tri-pura + sundarī", category: "deity", related: ["shodashi-tripurasundari-sadhana", "bala-tripurasundari-sadhana"] },
  { iast: "Bhairava", devanagari: "भैरव", english: "The fierce form of Śiva; the terrifying aspect of the divine.", etymology: "bhaira — terrible", category: "deity", related: ["kala-bhairava-sadhana"] },
  { iast: "Bhairavī", devanagari: "भैरवी", english: "The fierce form of the Goddess; consort of Bhairava.", etymology: "feminine of Bhairava", category: "deity", related: ["bhairavi-proper-sadhana", "tripura-bhairavi-sadhana"] },
  { iast: "Mahāvidyā", devanagari: "महाविद्या", english: "Great knowledge; one of the ten forms of the Goddess in the Śākta tantric canon.", etymology: "mahā + vidyā", category: "deity" },
  { iast: "Vajravārāhī", devanagari: "वज्रवाराही", english: "The Adamantine Sow; the principal female deity of the Buddhist Cakrasaṃvara cycle.", etymology: "vajra + vārāhī", category: "deity", related: ["vajrayogini-sadhana"] },
  { iast: "Sudarśana", devanagari: "सुदर्शन", english: "The discus of Viṣṇu; the protective instrument of dharma in Pāñcarātra.", etymology: "su + darśana — beautiful to see", category: "deity", related: ["sudarshana-chakra-sadhana"] },

  // Text
  { iast: "Tantra", devanagari: "तन्त्र", english: "A class of Śaiva-Śākta scriptures; literally 'loom' or 'framework'.", etymology: "tan — to weave, extend", category: "text" },
  { iast: "Āgama", devanagari: "आगम", english: "A class of Śaiva canonical scriptures; that which has come down.", etymology: "ā + gam — to come", category: "text" },
  { iast: "Upaniṣad", devanagari: "उपनिषद्", english: "Vedic philosophical texts; literally 'sitting down near' the teacher.", etymology: "upa + ni + ṣad — to sit near", category: "text" },
  { iast: "Veda", devanagari: "वेद", english: "The four foundational scriptures of Vedic tradition: Ṛg, Yajur, Sāma, Atharva.", etymology: "vid — to know", category: "text" },
  { iast: "Purāṇa", devanagari: "पुराण", english: "Ancient lore; a class of post-Vedic encyclopedic texts.", etymology: "purā — ancient", category: "text" },
  { iast: "Sūtra", devanagari: "सूत्र", english: "Aphorism; a terse verse form that encodes a teaching in minimal syllables.", etymology: "siv — to sew", category: "text" },

  // Cosmology
  { iast: "cakra", devanagari: "चक्र", english: "Wheel; a centre of energy in the subtle body; also a deity's discus weapon.", etymology: "car — to move", category: "cosmology", related: ["chakra-dharana", "sudarshana-chakra-sadhana"] },
  { iast: "nāḍī", devanagari: "नाडी", english: "A channel in the subtle body through which prāṇa flows; 72,000 in number, with iḍā, piṅgalā, suṣumṇā primary.", etymology: "nad — to flow", category: "cosmology", related: ["nadi-shuddhi"] },
  { iast: "kuṇḍalinī", devanagari: "कुण्डलिनी", english: "The serpent power; the dormant energy at the base of the spine that ascends through the cakras.", etymology: "kuṇḍala — coiled", category: "cosmology" },
  { iast: "bindu", devanagari: "बिन्दु", english: "The point; the dimensionless source from which manifestation arises.", etymology: "bindu — a drop, point", category: "cosmology" },
  { iast: "bhuvana", devanagari: "भुवन", english: "A world or plane of existence; fourteen in the Indic cosmological framework.", etymology: "bhū — to be", category: "cosmology", related: ["bhuvaneshvari-sadhana"] },
  { iast: "loka", devanagari: "लोक", english: "A realm or plane; the manifest world.", etymology: "lok — to perceive", category: "cosmology" },
  { iast: "ayanāṁśa", devanagari: "अयनांश", english: "The precessional offset between tropical and sidereal zodiacs; Lahiri (24° approx) is the standard in Vedic astrology.", etymology: "ayana + aṁśa", category: "cosmology" },

  // Ritual
  { iast: "yantra", devanagari: "यन्त्र", english: "A geometric instrument of contemplation; a two-dimensional maṇḍala encoding a deity's form.", etymology: "yam — to restrain, control", category: "ritual" },
  { iast: "maṇḍala", devanagari: "मण्डल", english: "A circular sacred diagram; a ritual field or cosmic map.", etymology: "maṇḍa — essence + la — container", category: "ritual" },
  { iast: "mūla-mantra", devanagari: "मूलमन्त्र", english: "The root mantra of a deity; the core sound-form, often dīkṣā-restricted.", etymology: "mūla — root", category: "ritual" },
  { iast: "bīja", devanagari: "बीज", english: "Seed; a single-syllable sound that condenses a deity's power (e.g. hrīṁ, klīṁ, hūṃ).", etymology: "bīja — seed", category: "ritual" },
  { iast: "nyāsa", devanagari: "न्यास", english: "The ritual installation of mantras or deities on the body, attaching them to specific locations.", etymology: "ni + as — to place", category: "ritual" },
  { iast: "pūjā", devanagari: "पूजा", english: "Ritual worship; the structured offering of services to a deity.", etymology: "pūj — to honour", category: "ritual" },
  { iast: "homa", devanagari: "होम", english: "Fire ritual; the offering of oblations into a consecrated fire.", etymology: "hu — to offer", category: "ritual" },
  { iast: "dīkṣā", devanagari: "दीक्षा", english: "Initiation; the formal transmission of a mantra or practice from guru to disciple.", etymology: "dā + iṣ — to give + to send", category: "ritual" },
  { iast: "śmaśāna", devanagari: "श्मशान", english: "Cremation ground; the liminal space where the dissolution of form is most visible — a prescribed setting for certain Śākta rites.", etymology: "śma — corpse + śāna — lying", category: "ritual", related: ["smasana-bhairavi-sadhana"] },
  { iast: "prāṇa-pratiṣṭhā", devanagari: "प्राणप्रतिष्ठा", english: "The rite of installing life-force into a yantra or image, activating it for worship.", etymology: "prāṇa + pratiṣṭhā — life + installation", category: "ritual" },
  { iast: "ṣaṭ-karma", devanagari: "षट्कर्म", english: "The six ritual acts of tantric tradition: śānti, vaśīkaraṇa, stambhana, vidveṣaṇa, uccāṭana, māraṇa.", etymology: "ṣaṭ + karma — six + acts", category: "ritual" },
  { iast: "abhicāra", devanagari: "अभिचार", english: "Hostile rite; the application of tantric procedure toward an adversary — a category within the ṣaṭ-karma framework.", etymology: "abhi + car — to go against", category: "ritual" },

  // Subtle anatomy
  { iast: "prāṇa", devanagari: "प्राण", english: "Life-force; the vital energy that animates the body and flows through the nāḍīs.", etymology: "prāṇa — breath, life", category: "anatomy", related: ["nadi-shuddhi", "kumbhaka"] },
  { iast: "mūlādhāra", devanagari: "मूलाधार", english: "The root cakra at the base of the spine; four-petalled; the seat of Kuṇḍalinī.", etymology: "mūla + ādhāra — root + support", category: "anatomy" },
  { iast: "sahasrāra", devanagari: "सहस्रार", english: "The thousand-petalled cakra at the crown; the destination of the awakened Kuṇḍalinī.", etymology: "sahasra + āra — thousand + spoke", category: "anatomy" },
  { iast: "suṣumṇā", devanagari: "सुषुम्णा", english: "The central nāḍī, running from mūlādhāra to sahasrāra; the path of Kuṇḍalinī's ascent.", etymology: "suṣumṇā — very gracious", category: "anatomy" },
  { iast: "iḍā", devanagari: "इडा", english: "The lunar nāḍī on the left side; cooling, parasympathetic.", etymology: "iḍā — refreshment", category: "anatomy" },
  { iast: "piṅgalā", devanagari: "पिङ्गला", english: "The solar nāḍī on the right side; heating, sympathetic.", etymology: "piṅgala — tawny, brownish", category: "anatomy" },
  { iast: "mātṛkā", devanagari: "मातृका", english: "The matrix of Sanskrit phonemes; the fifty letters from which manifestation is held to arise.", etymology: "mātṛ — mother", category: "anatomy" },

  // Additional philosophy
  { iast: "karma", devanagari: "कर्म", english: "Action and its consequences; the law of cause and effect across births.", etymology: "kṛ — to do", category: "philosophy" },
  { iast: "dharma", devanagari: "धर्म", english: "Duty; right conduct; the natural order that sustains the cosmos.", etymology: "dhṛ — to hold, bear", category: "philosophy" },
  { iast: "saṃsāra", devanagari: "संसार", english: "The cycle of birth, death, and rebirth from which mokṣa releases.", etymology: "saṁ + sṛ — to wander", category: "philosophy" },
  { iast: "guṇa", devanagari: "गुण", english: "Quality; one of the three constituents of prakṛti — sattva (lucidity), rajas (activity), tamas (inertia).", etymology: "guṇa — strand, quality", category: "philosophy" },
  { iast: "prakṛti", devanagari: "प्रकृति", english: "Nature; the primary matrix from which the manifest world arises; composed of the three guṇas.", etymology: "pra + kṛ — to make before", category: "philosophy" },
  { iast: "puruṣa", devanagari: "पुरुष", english: "The conscious witness; the pure awareness that observes prakṛti.", etymology: "puruṣa — person", category: "philosophy" },

  // Additional practice
  { iast: "trāṭaka", devanagari: "त्राटक", english: "Steady gazing; the practice of fixing the eyes on a single point (typically a candle flame).", etymology: "trāṭ — to look steadily", category: "practice", related: ["trataka"] },
  { iast: "nāda", devanagari: "नाद", english: "Inner sound; the subtle sound-current that the practitioner traces inward in laya yoga.", etymology: "nad — to sound", category: "practice" },
  { iast: "mudrā", devanagari: "मुद्रा", english: "A seal or gesture; a specific positioning of the body (especially hands) that seals energy.", etymology: "mud — to delight", category: "practice" },
  { iast: "bandha", devanagari: "बन्ध", english: "A lock; a muscular contraction that seals prāṇa within the subtle body (mūla, jālandhara, uḍḍiyāna).", etymology: "bandh — to bind", category: "practice" },
  { iast: "śauca", devanagari: "शौच", english: "Purification; the first niyama of aṣṭāṅga yoga — both outer (cleanliness) and inner (clarity).", etymology: "śuc — to shine", category: "practice" },
  { iast: "bhūta-śuddhi", devanagari: "भूतशुद्धि", english: "Purification of the elements; a preliminary rite that cleanses the body's five bhūtas before tantric practice.", etymology: "bhūta + śuddhi", category: "practice", related: ["preta-siddhi"] },

  // Additional deity
  { iast: "Śiva", devanagari: "शिव", english: "The auspicious one; the transcendent aspect of the divine in Śaiva tradition.", etymology: "śiv — auspicious", category: "deity" },
  { iast: "Śakti", devanagari: "शक्ति", english: "Power; the active, dynamic aspect of the divine — the Goddess in Śākta tradition.", etymology: "śak — to be able", category: "deity" },
  { iast: "Gaṇeśa", devanagari: "गणेश", english: "The elephant-headed god; the remover of obstacles, invoked at the start of every rite.", etymology: "gaṇa + īśa — lord of hosts", category: "deity" },
  { iast: "Viṣṇu", devanagari: "विष्णु", english: "The preserver; the cosmic-sustainer aspect of the divine in Vaiṣṇava tradition.", etymology: "viṣ — to pervade", category: "deity" },
  { iast: "Narasiṃha", devanagari: "नरसिंह", english: "The man-lion avatāra of Viṣṇu; the fierce protective form.", etymology: "nara + siṃha — man + lion", category: "deity", related: ["pratyangira-devi-sadhana"] },

  // Additional ritual
  { iast: "kalāśa", devanagari: "कलश", english: "A ritual pot; a vessel consecrated as a receptacle of the deity's presence.", etymology: "kalāśa — pot", category: "ritual" },
  { iast: "bali", devanagari: "बलि", english: "An offering; a ritual oblation to a deity or spirit.", etymology: "bal — strength", category: "ritual" },
  { iast: "piṇḍa", devanagari: "पिण्ड", english: "A rice-ball offering to ancestors; the central rite of ancestral śrāddha.", etymology: "piṇḍa — ball, lump", category: "ritual" },
  { iast: "rakṣā-sūtra", devanagari: "रक्षासूत्र", english: "A protection thread; tied on the wrist as a protective mantle before certain rites.", etymology: "rakṣā + sūtra", category: "ritual", related: ["preta-siddhi"] },
  { iast: "vibhūti", devanagari: "विभूति", english: "Sacred ash; the ash from a sacred fire applied as a tilaka, especially in Śaiva tradition.", etymology: "vibhūti — power, manifestation", category: "ritual" },
];

export const GLOSSARY_CATEGORIES: Record<GlossaryEntry["category"], string> = {
  philosophy: "Philosophy",
  practice: "Practice",
  deity: "Deity",
  text: "Text & Scripture",
  cosmology: "Cosmology",
  ritual: "Ritual",
  anatomy: "Subtle Anatomy",
};
