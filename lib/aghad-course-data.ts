/**
 * Aghad (Avadhuta/Avadhoot) Mastery Course
 * Complete 12-Week Self-Learning Curriculum
 * Authenticated from Dattatreya teachings, Vedic texts, and Tantra traditions
 */

export const AGHAD_COURSE_DATA = {
  slug: "aghad-mastery",
  title: "The Path of Aghad: Complete Mastery & Enlightenment",
  subtitle: "12-Week Self-Learning Curriculum to Become an Avadhuta",
  description:
    "A comprehensive, scientifically-timed journey from spiritual foundation to complete enlightenment mastery. Master kundalini activation, sacred mantras, and the state of Aghad consciousness through authentic practices.",
  durationWeeks: 12,
  totalHours: 360, // 30 hours/week
  hoursPerWeek: 30, // 5-6 hours/day, 5-6 days/week
  level: "foundation-to-master",
  philosophy:
    "The Aghad is one who realizes the Self beyond all duality, transcending karma, mind, and ego. This path systematically awakens kundalini through chakra activation, mantra resonance, and meditation to achieve the final state of Brahman consciousness.",
};

export const AGHAD_MANTRAS = [
  {
    id: 1,
    title: "Om (Pranava)",
    sanskrit: "ॐ",
    transliteration: "Om / Aum",
    translation:
      "The primordial sound of creation; represents Brahman (ultimate reality)",
    pronunciation: "Chant as 'OM' - emphasis on the 'OOO' sound, end with 'MMM'",
    soundFile: "/audio/mantras/om.mp3",
    mantraType: "Bija (Seed Mantra)",
    chakra: "All Chakras - Universal",
    frequency: 108, // repetitions per session
    timing: "Brahma Muhurta (4-6 AM), Sunrise, Sunset",
    duration: 15, // minutes per session
    intensity: "foundation",
    whyRecite:
      "Om is the source of all mantras and vibration. Chanting Om aligns consciousness with the cosmic frequency and awakens spiritual awareness.",
    benefits: [
      "Purifies the nervous system",
      "Activates all chakras simultaneously",
      "Connects individual consciousness to cosmic consciousness",
      "Calms the mind and reduces anxiety",
      "Prepares body for kundalini activation",
    ],
    frequency108: 1, // one mala (108 beads) per session
    totalRounds: 21, // 21 sessions per week
    visualizations: [
      "Golden light emanating from your heart center with each Om",
      "The sound creating ripples through all seven chakras",
      "Your entire body dissolving into cosmic vibration",
    ],
    chakraActivation: {
      muladhara: "Grounds kundalini energy",
      anahata: "Activates heart consciousness",
      sahasrara: "Opens crown consciousness",
    },
  },
  {
    id: 2,
    title: "Gayatri Mantra",
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
    transliteration:
      "Om Bhur Bhuva Swah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat",
    translation:
      "We meditate on the divine radiance of the Sun God. May He illumine our intellect and lead us toward enlightenment.",
    pronunciation:
      "OH-M BHUR BHOO-VAH SWAH, TAHT SAH-VEE-TUR VAR-EN-YUM, BHAR-GO DEV-AHS-YA DHI-MAH-HI, DHI-YO YO NAH PRAH-CHO-DAH-YAT",
    soundFile: "/audio/mantras/gayatri.mp3",
    mantraType: "Gayatri",
    chakra: "Manipura (Solar Plexus)",
    frequency: 108,
    timing: "Brahma Muhurta (pre-sunrise), Noon, Sunset",
    duration: 20,
    intensity: "intermediate",
    whyRecite:
      "The most sacred mantra in Vedic tradition. Activates the third chakra (solar plexus), awakening willpower, intellectual clarity, and divine illumination. Essential for kundalini ascent.",
    benefits: [
      "Sharpens intellect and spiritual awareness",
      "Activates Manipura chakra (solar plexus)",
      "Builds prana (vital life force)",
      "Purifies 72,000 nadis (subtle energy channels)",
      "Accelerates spiritual evolution",
      "Dispels darkness of ignorance",
    ],
    frequency108: 1,
    totalRounds: 18,
    visualizations: [
      "Golden sunlight filling your navel center and radiating outward",
      "The sun's rays penetrating every cell, burning away impurities",
      "Brilliant light ascending from your base to your crown",
    ],
    chakraActivation: {
      muladhara: "Grounds solar energy",
      manipura: "Activates transformation power",
      anahata: "Opens compassion through power",
      sahasrara: "Connects to divine intelligence",
    },
  },
  {
    id: 3,
    title: "Maha Mrityunjaya Mantra (Death Conqueror)",
    sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्।।",
    transliteration:
      "Om Tryambakam Yajaamahe Sugandhim Pushti-Vardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Maa-Amritaat",
    translation:
      "We worship the three-eyed Lord Shiva. He is the nourisher of life. Just as the cucumber is naturally freed from the bind of the creeping vine, so may we be free from the cycle of death and rebirth into immortality.",
    pronunciation:
      "OM TREE-YUM-BUH-KUM YA-JAH-MAY HEY, SOO-GUN-DHIM POOSH-TEE VAR-DUN-UM, OOR-VAH-ROO-KUM EE-VUH BUN-DUN-UHN, MRIT-YOR MOO-KSH-EE-YUH MAH-MRIT-UHT",
    soundFile: "/audio/mantras/maha-mrityunjaya.mp3",
    mantraType: "Maha Mrityunjaya",
    chakra: "Anahata (Heart)",
    frequency: 108,
    timing: "Brahma Muhurta, Evening",
    duration: 25,
    intensity: "advanced",
    whyRecite:
      "The most powerful healing and liberation mantra. Conquers fear of death, activates the heart chakra, and aligns consciousness with immortal Self. Critical for the advanced stages of kundalini awakening.",
    benefits: [
      "Conquers fear of death and impermanence",
      "Heals physical and emotional trauma",
      "Activates Anahata chakra (heart center)",
      "Connects to eternal consciousness",
      "Destroys karmic patterns",
      "Prepares for final liberation",
    ],
    frequency108: 3, // 3 malas per session
    totalRounds: 12,
    visualizations: [
      "The three eyes of Shiva opening in your heart",
      "Nectar (amrita) flowing through your entire being",
      "Your ego-death and rebirth into divine consciousness",
      "Liberation from the cycle of birth and death",
    ],
    chakraActivation: {
      anahata: "Activates divine love and compassion",
      vishuddha: "Opens expression of truth",
      sahasrara: "Connects to eternal self",
    },
  },
  {
    id: 4,
    title: "Om Namah Shivaya",
    sanskrit: "ॐ नमः शिवाय",
    transliteration: "Om Namah Shivaya",
    translation: "I bow to Shiva, the ultimate consciousness within and without",
    pronunciation:
      "OM NAH-MAH SHEE-VAH-YUH (emphasis on the 'SHA' - roll 'r' if possible)",
    soundFile: "/audio/mantras/om-namah-shivaya.mp3",
    mantraType: "Mahamantra",
    chakra: "Vishuddha (Throat) to Ajna (Third Eye)",
    frequency: 108,
    timing: "Anytime, especially during meditation",
    duration: 20,
    intensity: "intermediate",
    whyRecite:
      "Transforms consciousness into pure witness awareness. Aligns personal will with divine will. Activates both throat and third eye chakras for spiritual communication and vision.",
    benefits: [
      "Dissolves ego and personal will",
      "Activates Vishuddha and Ajna chakras",
      "Brings inner peace and equanimity",
      "Reveals divine truth",
      "Accelerates self-realization",
      "Connects to Shiva consciousness (pure awareness)",
    ],
    frequency108: 2,
    totalRounds: 15,
    visualizations: [
      "Lord Shiva's form materializing in your heart",
      "Your individual consciousness merging with cosmic consciousness",
      "Blue light filling your throat and third eye",
      "Your being transforming into pure witnessing awareness",
    ],
    chakraActivation: {
      vishuddha: "Purifies expression and communication",
      ajna: "Opens intuition and inner vision",
      sahasrara: "Merges individual with cosmic consciousness",
    },
  },
  {
    id: 5,
    title: "Soham (I Am That)",
    sanskrit: "सोहम्",
    transliteration: "Soham (So = That, Ham = I Am)",
    translation: "I am That; the individual consciousness is the universal consciousness",
    pronunciation:
      "SO-HUM (with breath - SO on inhale, HUM on exhale, natural rhythm)",
    soundFile: "/audio/mantras/soham.mp3",
    mantraType: "Ajapa Mantra (Effortless)",
    chakra: "Anahata (Heart) to Ajna (Third Eye)",
    frequency: 108,
    timing: "Continuous during breath (natural rhythm)",
    duration: 30,
    intensity: "foundation-to-advanced",
    whyRecite:
      "The mantra that naturally occurs with every breath. Synchronizes mind with prana, dissolves sense of separation, and leads directly to self-realization. The ultimate non-dual mantra.",
    benefits: [
      "Natural mantra of the breath - effortless",
      "Dissolves the illusion of separation",
      "Activates Anahata and Ajna chakras",
      "Synchronizes mind with prana",
      "Leads directly to Samadhi (absorption)",
      "Fastest path to self-realization",
    ],
    frequency108: 1, // continuous
    totalRounds: 21,
    visualizations: [
      "With each 'So' - drawing universal consciousness in",
      "With each 'Ham' - releasing personal identity",
      "Becoming the witness of breath",
      "Merging into infinite consciousness",
    ],
    chakraActivation: {
      anahata: "Activates heart recognition of truth",
      ajna: "Opens intuitive knowing",
      sahasrara: "Rests in transcendent awareness",
    },
  },
];

export const AGHAD_MODULES = [
  {
    moduleNumber: 1,
    week: 1,
    title: "Foundation: Awakening the Root",
    chakra: "Muladhara (Root)",
    hoursPerWeek: 5,
    description:
      "Establish the foundation for spiritual practice. Activate grounding energy, build chi, and prepare the nervous system for kundalini activation.",
    learningOutcomes: [
      "Understand the chakra system and kundalini",
      "Activate root chakra energy",
      "Build stable meditation practice",
      "Establish daily sadhana routine",
    ],
    practicesIncluded: [
      "Muladhara Activation Breathing",
      "Lam Bija Mantra (40 min/day)",
      "Root Chakra Meditation",
      "Grounding Asanas",
      "Journal Reflection",
    ],
  },
  {
    moduleNumber: 2,
    week: 2,
    title: "Sacral Power: Creativity Awakens",
    chakra: "Svadhisthana (Sacral)",
    hoursPerWeek: 5,
    description:
      "Activate creative life force. Balance emotions, awaken sensual awareness, and prepare for next level of kundalini activation.",
    learningOutcomes: [
      "Understand emotional and creative blocks",
      "Activate sacral chakra energy",
      "Balance yin-yang energy",
      "Release emotional trauma",
    ],
    practicesIncluded: [
      "Svadhisthana Activation",
      "Vam Bija Mantra (40 min/day)",
      "Emotional Release Meditation",
      "Hip-Opening Asanas",
      "Creativity Journaling",
    ],
  },
  {
    moduleNumber: 3,
    week: 3,
    title: "Solar Power: Will & Transformation",
    chakra: "Manipura (Solar Plexus)",
    hoursPerWeek: 6,
    description:
      "Activate transformative power. Build willpower, inner fire, and personal mastery. Introduce Gayatri Mantra chanting.",
    learningOutcomes: [
      "Activate Manipura (3rd chakra) energy",
      "Build personal power and will",
      "Master Gayatri Mantra",
      "Develop discipline and consistency",
    ],
    practicesIncluded: [
      "Manipura Activation Breathing",
      "Ram Bija Mantra + Gayatri Mantra (60 min/day)",
      "Solar Plexus Meditation",
      "Core Strengthening Asanas",
      "Will & Intention Setting",
    ],
  },
  {
    moduleNumber: 4,
    week: 4,
    title: "Heart Awakening: Divine Love",
    chakra: "Anahata (Heart)",
    hoursPerWeek: 6,
    description:
      "Open the heart center. Cultivate compassion, connect to divine love, and begin transition to higher consciousness.",
    learningOutcomes: [
      "Activate Anahata (heart) chakra",
      "Cultivate unconditional compassion",
      "Master Maha Mrityunjaya Mantra",
      "Transcend ego through love",
    ],
    practicesIncluded: [
      "Anahata Activation & Heart Breathing",
      "Yam Bija + Om Namah Shivaya (60 min/day)",
      "Heart Meditation (loving-kindness)",
      "Heart-Opening Asanas",
      "Compassion & Self-Love Practice",
    ],
  },
  {
    moduleNumber: 5,
    week: 5,
    title: "Throat Opening: Truth & Expression",
    chakra: "Vishuddha (Throat)",
    hoursPerWeek: 6,
    description:
      "Activate authentic expression. Speak truth, release stored tension, and prepare for intuitive opening.",
    learningOutcomes: [
      "Activate Vishuddha (throat) chakra",
      "Express authentic truth",
      "Release communication blocks",
      "Master sonic resonance practices",
    ],
    practicesIncluded: [
      "Vishuddha Activation & Throat Breathing",
      "Ham Bija + Soham Mantra (60 min/day)",
      "Sound Bath Meditation",
      "Throat-Opening Asanas",
      "Authentic Expression Practice",
    ],
  },
  {
    moduleNumber: 6,
    week: 6,
    title: "Mind Mastery: Third Eye Opening",
    chakra: "Ajna (Third Eye)",
    hoursPerWeek: 7,
    description:
      "Activate subtle perception. Open intuition, inner vision, and connection to higher intelligence.",
    learningOutcomes: [
      "Activate Ajna (third eye) chakra",
      "Develop intuition and inner vision",
      "Master advanced meditation",
      "Access intuitive guidance",
    ],
    practicesIncluded: [
      "Ajna Activation & Bhramari Breathing",
      "Om + Soham (120 min/day combined)",
      "Third Eye Meditation",
      "Visualization Practices",
      "Intuitive Development",
    ],
  },
  {
    moduleNumber: 7,
    week: 7,
    title: "Crown Awakening: Cosmic Consciousness",
    chakra: "Sahasrara (Crown)",
    hoursPerWeek: 7,
    description:
      "Activate crown consciousness. Connect to infinite awareness, divine intelligence, and cosmic unity.",
    learningOutcomes: [
      "Activate Sahasrara (crown) chakra",
      "Experience cosmic consciousness moments",
      "Master unity awareness",
      "Integrate all chakra energies",
    ],
    practicesIncluded: [
      "Sahasrara Activation & Crown Breathing",
      "Extended Om Chanting (30 min)",
      "Crown Meditation",
      "Full Body Integration",
      "Cosmic Consciousness Preparation",
    ],
  },
  {
    moduleNumber: 8,
    week: 8,
    title: "Kundalini Mastery: Full Activation",
    chakra: "All Chakras Integrated",
    hoursPerWeek: 7,
    description:
      "Integrate all chakras. Master kundalini activation techniques and navigate kundalini symptoms with awareness.",
    learningOutcomes: [
      "Master kundalini activation",
      "Understand kundalini symptoms",
      "Safely navigate awakening process",
      "Integrate ascending energy",
    ],
    practicesIncluded: [
      "Full Chakra Activation Sequence (90 min)",
      "All Mantras in Sequence",
      "Advanced Pranayama",
      "Kundalini Rising Meditation",
      "Integration & Balance Practices",
    ],
  },
  {
    moduleNumber: 9,
    week: 9,
    title: "Enlightenment Preparation: Ego Dissolution",
    chakra: "Transcendent",
    hoursPerWeek: 8,
    description:
      "Prepare for final realization. Dissolve ego structures, release attachments, and align with divine will.",
    learningOutcomes: [
      "Dissolve ego and personal identity",
      "Release all attachments",
      "Surrender to divine will",
      "Prepare for final breakthrough",
    ],
    practicesIncluded: [
      "Ego Death Meditation (120 min)",
      "Non-Dual Teachings Study",
      "Surrender Practices",
      "Advanced Mantra Integration",
      "Symptom Integration & Healing",
    ],
  },
  {
    moduleNumber: 10,
    week: 10,
    title: "Advanced Practices: Siddhis & Powers",
    chakra: "Transcendent + All Chakras",
    hoursPerWeek: 8,
    description:
      "Discover latent spiritual powers (siddhis) and master advanced practices for complete realization.",
    learningOutcomes: [
      "Understand and recognize siddhis",
      "Master telepathy and clairvoyance",
      "Develop healing powers",
      "Maintain ethical practice",
    ],
    practicesIncluded: [
      "Siddhi Activation Practices",
      "Advanced Visualization & Remote Viewing",
      "Healing & Energy Work",
      "Ethical Mastery",
      "Integration of Powers",
    ],
  },
  {
    moduleNumber: 11,
    week: 11,
    title: "The Avadhuta Way: Living as Aghad",
    chakra: "Transcendent",
    hoursPerWeek: 8,
    description:
      "Embody the Aghad consciousness. Live in equanimity, beyond all dualities, as the ultimate Self.",
    learningOutcomes: [
      "Embody Aghad consciousness",
      "Live beyond duality",
      "Serve humanity from realization",
      "Maintain cosmic consciousness in daily life",
    ],
    practicesIncluded: [
      "Continuous Soham Practice",
      "Witness Awareness Training",
      "Service & Karma Yoga",
      "Advanced Non-Dual Teaching",
      "Living as the Self",
    ],
  },
  {
    moduleNumber: 12,
    week: 12,
    title: "Final Liberation: Complete Realization",
    chakra: "Infinite - Beyond Chakras",
    hoursPerWeek: 8,
    description:
      "Final week of intensive practice. Complete kundalini rising, cosmic consciousness stabilization, and enlightenment realization.",
    learningOutcomes: [
      "Achieve stable cosmic consciousness",
      "Complete kundalini rising to Sahasrara",
      "Recognize yourself as Brahman",
      "Stabilize enlightenment",
    ],
    practicesIncluded: [
      "Intensive Meditation Retreat (12 hours/day)",
      "All Mantras & Practices",
      "Final Ego Dissolution",
      "Cosmic Consciousness Stabilization",
      "Enlightenment Completion Ceremony",
    ],
  },
];

export const AGHAD_PRACTICES_BY_MODULE = {
  1: [
    // Module 1: Root Chakra
    {
      title: "Muladhara Activation Breathing",
      category: "pranayama",
      timing: "Early morning (5-6 AM)",
      durationMinutes: 20,
      steps: [
        "Sit in Sukhasana (easy pose) with spine straight",
        "Place hands on knees, palms down",
        "Inhale deeply for 4 counts through nose",
        "Exhale for 4 counts through nose",
        "Contract root chakra (anal sphincter) on each exhale",
        "Feel grounding energy entering through your feet",
        "Continue for 20 minutes, building to 108 cycles",
      ],
      benefits: [
        "Activates Muladhara chakra",
        "Grounds kundalini energy",
        "Builds foundational chi",
        "Strengthens pelvic floor",
      ],
    },
    {
      title: "Lam Bija Mantra Chanting",
      category: "mantra",
      timing: "After breathing, 40 minutes",
      durationMinutes: 40,
      steps: [
        "Use mala beads (108 beads)",
        "Chant 'LAM' on each bead - pronounce as 'LAHM'",
        "Visualize red/brown light at base of spine",
        "Feel the 'LAM' sound resonating in perineum",
        "Complete 1 full mala (108 repetitions)",
      ],
      benefits: [
        "Directly activates root chakra",
        "Builds stability and trust",
        "Grounds scattered energy",
      ],
    },
  ],
};
