// Chakra system with correspondences to Vedic deities, mantras, and siddhis

export interface ChakraAssessment {
  name: string;
  energy: number; // 0-100
  blockage: number; // 0-100
  symptoms: string[];
  recommendations: string[];
}

export interface ChakraData {
  id: string;
  name: string;
  sanskrit: string;
  location: string;
  color: string;
  element: string;
  mantra: string;
  deity: string;
  siddhi: string;
  gland: string;
  frequency: number; // Hz
  affirmation: string;
  associations: {
    emotions: string[];
    bodyParts: string[];
    behaviours: string[];
  };
  imbalanceSymptoms: {
    blocked: string[];
    overactive: string[];
  };
  healingRecommendations: {
    mantras: string[];
    yantras: string[];
    asanas: string[];
    foods: string[];
    crystals: string[];
  };
}

export const CHAKRAS: ChakraData[] = [
  {
    id: "muladhara",
    name: "Root Chakra",
    sanskrit: "मूलाधार (Muladhara)",
    location: "Base of spine",
    color: "#DC143C",
    element: "Earth",
    mantra: "LAM",
    deity: "Ganesha",
    siddhi: "Stability & Grounding",
    gland: "Adrenal Glands",
    frequency: 396,
    affirmation: "I am safe, secure, and grounded in the earth.",
    associations: {
      emotions: ["Safety", "Stability", "Survival", "Security"],
      bodyParts: ["Legs", "Feet", "Bones", "Base of spine"],
      behaviours: ["Trust", "Practicality", "Confidence", "Presence"],
    },
    imbalanceSymptoms: {
      blocked: ["Fear", "Anxiety", "Insecurity", "Disconnection from body"],
      overactive: ["Greed", "Materialism", "Rigidity", "Excessive attachment"],
    },
    healingRecommendations: {
      mantras: ["LAM", "OM", "Ganesha Mantra"],
      yantras: ["Muladhara Yantra"],
      asanas: ["Mountain Pose", "Tree Pose", "Warrior I", "Child's Pose"],
      foods: ["Red root vegetables", "Beets", "Carrots", "Meat", "Beans"],
      crystals: ["Red Jasper", "Black Tourmaline", "Hematite"],
    },
  },
  {
    id: "svadhisthana",
    name: "Sacral Chakra",
    sanskrit: "स्वाधिष्ठान (Svadhisthana)",
    location: "Lower abdomen (2 inches below navel)",
    color: "#FF8C00",
    element: "Water",
    mantra: "VAM",
    deity: "Brahma",
    siddhi: "Creativity & Flow",
    gland: "Sacral Plexus",
    frequency: 417,
    affirmation: "I embrace my creativity and allow pleasure to flow through me.",
    associations: {
      emotions: ["Creativity", "Sexuality", "Pleasure", "Passion"],
      bodyParts: ["Reproductive organs", "Lower abdomen", "Hips", "Sacrum"],
      behaviours: ["Adaptability", "Sensuality", "Flexibility", "Joy"],
    },
    imbalanceSymptoms: {
      blocked: ["Creative blocks", "Low libido", "Emotional numbness", "Rigidity"],
      overactive: ["Sexual obsession", "Emotional instability", "Addiction"],
    },
    healingRecommendations: {
      mantras: ["VAM", "OM", "Brahma Mantra"],
      yantras: ["Svadhisthana Yantra"],
      asanas: ["Hip openers", "Pigeon Pose", "Goddess Pose", "Pelvic circles"],
      foods: ["Orange foods", "Oranges", "Mangoes", "Coconut", "Cinnamon"],
      crystals: ["Carnelian", "Orange Calcite", "Sunstone"],
    },
  },
  {
    id: "manipura",
    name: "Solar Plexus Chakra",
    sanskrit: "मणिपूर (Manipura)",
    location: "Upper abdomen (below the ribs)",
    color: "#FFD700",
    element: "Fire",
    mantra: "RAM",
    deity: "Agni",
    siddhi: "Power & Will",
    gland: "Pancreas",
    frequency: 528,
    affirmation: "I am powerful, confident, and in control of my life.",
    associations: {
      emotions: ["Confidence", "Will power", "Self-esteem", "Motivation"],
      bodyParts: ["Stomach", "Pancreas", "Liver", "Digestive organs"],
      behaviours: ["Discipline", "Strength", "Determination", "Leadership"],
    },
    imbalanceSymptoms: {
      blocked: ["Low self-esteem", "Lack of motivation", "Digestive issues", "Powerlessness"],
      overactive: ["Aggression", "Domination", "Excessive control", "Arrogance"],
    },
    healingRecommendations: {
      mantras: ["RAM", "OM", "Agni Mantra"],
      yantras: ["Manipura Yantra"],
      asanas: ["Core strengthening", "Plank", "Boat Pose", "Sun salutation"],
      foods: ["Yellow foods", "Bananas", "Corn", "Pineapple", "Ginger"],
      crystals: ["Citrine", "Yellow Tourmaline", "Golden Healer"],
    },
  },
  {
    id: "anahata",
    name: "Heart Chakra",
    sanskrit: "अनाहत (Anahata)",
    location: "Center of chest",
    color: "#00CC44",
    element: "Air",
    mantra: "YAM",
    deity: "Ishvara",
    siddhi: "Love & Compassion",
    gland: "Thymus",
    frequency: 639,
    affirmation: "I am worthy of love, and I radiate compassion to all beings.",
    associations: {
      emotions: ["Love", "Compassion", "Joy", "Peace", "Forgiveness"],
      bodyParts: ["Heart", "Lungs", "Shoulders", "Arms", "Hands"],
      behaviours: ["Kindness", "Connection", "Gratitude", "Healing"],
    },
    imbalanceSymptoms: {
      blocked: ["Loneliness", "Resentment", "Jealousy", "Isolation", "Heartache"],
      overactive: ["Codependency", "Boundary issues", "Over-giving", "Heartbreak"],
    },
    healingRecommendations: {
      mantras: ["YAM", "OM MANI PADME HUM", "Ishvara Mantra"],
      yantras: ["Anahata Yantra"],
      asanas: ["Heart openers", "Backbends", "Camel Pose", "Fish Pose"],
      foods: ["Green foods", "Broccoli", "Kale", "Green tea", "Matcha"],
      crystals: ["Rose Quartz", "Green Aventurine", "Emerald"],
    },
  },
  {
    id: "vishuddha",
    name: "Throat Chakra",
    sanskrit: "विशुद्ध (Vishuddha)",
    location: "Center of throat",
    color: "#00CED1",
    element: "Ether (Akasha)",
    mantra: "HAM",
    deity: "Sadashiva",
    siddhi: "Communication & Truth",
    gland: "Thyroid",
    frequency: 741,
    affirmation: "I speak my truth with clarity, authenticity, and ease.",
    associations: {
      emotions: ["Communication", "Expression", "Authenticity", "Truth"],
      bodyParts: ["Throat", "Neck", "Mouth", "Ears", "Thyroid"],
      behaviours: ["Listening", "Speaking", "Creativity", "Inner voice"],
    },
    imbalanceSymptoms: {
      blocked: ["Difficulty expressing", "Shyness", "Fear of speaking", "Throat issues"],
      overactive: ["Over-talking", "Gossip", "Lies", "Arrogance"],
    },
    healingRecommendations: {
      mantras: ["HAM", "OM", "Sadashiva Mantra"],
      yantras: ["Vishuddha Yantra"],
      asanas: ["Lion's Breath", "Shoulder stand", "Neck rolls", "Fish Pose"],
      foods: ["Blue foods", "Blueberries", "Fish", "Honey", "Sea vegetables"],
      crystals: ["Aquamarine", "Turquoise", "Blue Lace Agate"],
    },
  },
  {
    id: "ajna",
    name: "Third Eye Chakra",
    sanskrit: "आज्ञा (Ajna)",
    location: "Between the eyebrows",
    color: "#4B0082",
    element: "Light",
    mantra: "OM",
    deity: "Shiva",
    siddhi: "Intuition & Vision",
    gland: "Pineal Gland",
    frequency: 852,
    affirmation: "I trust my intuition and inner wisdom to guide me.",
    associations: {
      emotions: ["Intuition", "Insight", "Imagination", "Vision"],
      bodyParts: ["Forehead", "Eyes", "Brain", "Pineal gland"],
      behaviours: ["Inner knowing", "Clarity", "Perception", "Visualization"],
    },
    imbalanceSymptoms: {
      blocked: ["Confusion", "Poor intuition", "Illusion", "Nightmares"],
      overactive: ["Obsession", "Overthinking", "Detachment", "Headaches"],
    },
    healingRecommendations: {
      mantras: ["OM", "Shiva Mantra", "So Hum"],
      yantras: ["Ajna Yantra"],
      asanas: ["Child's Pose", "Forward folds", "Meditation", "Balasana"],
      foods: ["Purple foods", "Grapes", "Dark chocolate", "Acai berries"],
      crystals: ["Amethyst", "Lapis Lazuli", "Labradorite"],
    },
  },
  {
    id: "sahasrara",
    name: "Crown Chakra",
    sanskrit: "सहस्रार (Sahasrara)",
    location: "Top of head",
    color: "#FFFFFF",
    element: "Consciousness",
    mantra: "OM AH",
    deity: "Brahman",
    siddhi: "Enlightenment & Unity",
    gland: "Cerebral cortex",
    frequency: 963,
    affirmation: "I am connected to the divine consciousness and infinite wisdom.",
    associations: {
      emotions: ["Transcendence", "Bliss", "Unity", "Spirituality"],
      bodyParts: ["Crown of head", "Central nervous system", "Brain stem"],
      behaviours: ["Spiritual connection", "Understanding", "Wisdom", "Peace"],
    },
    imbalanceSymptoms: {
      blocked: ["Disconnection", "Depression", "Lack of purpose", "Confusion"],
      overactive: ["Spiritual bypassing", "Dissociation", "Confusion"],
    },
    healingRecommendations: {
      mantras: ["OM AH", "Brahman Mantra", "AUM"],
      yantras: ["Sahasrara Yantra"],
      asanas: ["Meditation", "Inversions", "Headstand", "Corpse Pose"],
      foods: ["White/clear foods", "Coconut", "Milk", "Fasting"],
      crystals: ["Clear Quartz", "Selenite", "White Tourmaline"],
    },
  },
];

export function getChakraById(id: string): ChakraData | undefined {
  return CHAKRAS.find((c) => c.id === id);
}

export function getChakraIndex(id: string): number {
  return CHAKRAS.findIndex((c) => c.id === id);
}

export interface UserChakraAssessment {
  date: string;
  assessments: Record<string, ChakraAssessment>;
  notes: string;
}
