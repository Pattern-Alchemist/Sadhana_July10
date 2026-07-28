/**
 * Sacred Locations Guide
 *
 * Curated database of spiritually potent pilgrimage sites in India
 * for authentic sadhana practice and spiritual transformation.
 */

export interface SacredLocation {
  id: string;
  name: string;
  sanskrit: string;
  region: string;
  country: string;
  coords: { lat: number; lng: number };
  
  // Spiritual dimensions
  deity: string[];
  mahavidya?: string[];
  element: 'earth' | 'water' | 'fire' | 'air' | 'ether';
  
  // Practice alignment
  bestFor: string[]; // "tantra", "bhakti", "hatha", "jnana", "kundalini"
  season: string[]; // "varsha", "sharad", "hemanta", "shishira", "vasanta", "grishma"
  dosha: string[]; // "vata", "pitta", "kapha"
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // Practical details
  history: string;
  practices: string[]; // specific practices to do here
  mainTemple?: string;
  accessibility: 'very-easy' | 'easy' | 'moderate' | 'challenging';
  elevation: number; // meters
  
  // Travel
  accessibleFrom: string[]; // nearby major cities
  bestMonths: number[]; // 1-12
  estimatedStay: string; // "3 days", "1 week", etc.
  accommodationOptions: string[];
  
  // Spiritual significance
  significance: string;
  yogaPath: string;
  warnings?: string[];
}

export const SACRED_LOCATIONS: SacredLocation[] = [
  {
    id: "kashi",
    name: "Varanasi",
    sanskrit: "काशी (Kāśī) - Śiva's Eternal City",
    region: "Uttar Pradesh",
    country: "India",
    coords: { lat: 25.3244, lng: 83.0108 },
    
    deity: ["Shiva", "Annapurna"],
    mahavidya: ["Kali"],
    element: "fire",
    
    bestFor: ["tantra", "death-practice", "liberation", "shakti"],
    season: ["sharad", "hemanta", "vasanta"],
    dosha: ["vata"],
    difficulty: "advanced",
    
    history: "The holiest of all Hindu pilgrimage sites. Shiva's abode. Tens of thousands have attained moksha (liberation) here. The Ganga flows through this city of liberation.",
    practices: ["Ghat meditation", "Arati ceremony", "Death contemplation", "Kali sadhana", "Mantra japa on Ghat", "Cremation ground practice"],
    mainTemple: "Kashi Vishwanath Temple",
    accessibility: "easy",
    elevation: 79,
    
    accessibleFrom: ["Lucknow", "Delhi"],
    bestMonths: [9, 10, 11, 12, 2, 3],
    estimatedStay: "7-14 days",
    accommodationOptions: ["Ashrams", "Pilgrimage hostels", "Budget hotels", "Houseboat rentals"],
    
    significance: "The eternal city where the past, present, and future coexist. Death here is liberation. The place where Shiva first performed Tandava (cosmic dance).",
    yogaPath: "Tantra Yoga + Kundalini Yoga + Moksha Path",
    warnings: ["Intense energy, not for weak-hearted", "Polluted air and water", "Crowded", "Requires spiritual maturity"]
  },

  {
    id: "ujjain",
    name: "Ujjain",
    sanskrit: "उज्जैन (Ujjain) - City of Mahakal",
    region: "Madhya Pradesh",
    country: "India",
    coords: { lat: 23.1815, lng: 75.7733 },
    
    deity: ["Shiva", "Mahakal"],
    element: "fire",
    
    bestFor: ["tantra", "shiva-sadhana", "ritual", "mantra"],
    season: ["varsha", "hemanta", "vasanta"],
    dosha: ["pitta"],
    difficulty: "intermediate",
    
    history: "One of four sites of Kumbh Mela. Mahakal temple is one of 12 Jyotirlingas (luminous Shiva forms). Center of Somayaji rituals (soma sacrifice). Astronomical observation center (Prime Meridian of ancient India).",
    practices: ["Somayaji ritual observation", "Mahakal darshan", "Triveni Sangam bath", "Midnight mantras", "Ritual performance"],
    mainTemple: "Mahakaleshwar Temple",
    accessibility: "easy",
    elevation: 494,
    
    accessibleFrom: ["Indore", "Bhopal"],
    bestMonths: [10, 11, 12, 1, 3, 4],
    estimatedStay: "3-7 days",
    accommodationOptions: ["Ashrams", "Temples", "Hotels"],
    
    significance: "An astronomical and ritual center. Where Shiva manifests as time itself (Kala = time). Center of tantric knowledge and Vedic sciences.",
    yogaPath: "Tantra Yoga + Vedic Ritual + Kundalini",
  },

  {
    id: "tarapeeth",
    name: "Tarapeeth",
    sanskrit: "तारापीठ (Tārapīth) - Tara Mahavidya Temple",
    region: "West Bengal",
    country: "India",
    coords: { lat: 24.9228, lng: 87.7833 },
    
    deity: ["Tara", "Kali"],
    mahavidya: ["Tara"],
    element: "ether",
    
    bestFor: ["tantra", "mahavidya-worship", "shakti-sadhana"],
    season: ["sharad", "hemanta"],
    dosha: ["vata", "kapha"],
    difficulty: "advanced",
    
    history: "One of the 51 Shakti Peeths (sacred seats of the Divine Feminine). The 10th Mahavidya Tara's primary pilgrimage. Center of tantra practice in Bengal. Associated with Bamakhepa, a celebrated tantric saint.",
    practices: ["Tara mantra chanting", "Mahavidya meditation", "Kali puja observation", "Tantra rituals", "Shakti visualization"],
    mainTemple: "Tara Mahavidya Temple",
    accessibility: "moderate",
    elevation: 28,
    
    accessibleFrom: ["Kolkata", "Birbhum"],
    bestMonths: [9, 10, 11, 12],
    estimatedStay: "3-7 days",
    accommodationOptions: ["Ashrams", "Guest houses", "Basic hotels"],
    
    significance: "Direct seat of Tara Mahavidya. Starry night practices and star gazing hold special significance. Portal for accessing universal knowledge.",
    yogaPath: "Tantra Yoga + Mahavidya Path + Shakti Sadhana",
    warnings: ["Remote location", "Limited amenities", "Requires devotion and commitment"]
  },

  {
    id: "haridwar",
    name: "Haridwar",
    sanskrit: "हरिद्वार (Haridvār) - Gateway of Hari (Vishnu)",
    region: "Uttarakhand",
    country: "India",
    coords: { lat: 29.9457, lng: 78.1642 },
    
    deity: ["Vishnu", "Ganga", "Shiva"],
    element: "water",
    
    bestFor: ["bhakti", "purification", "hatha-yoga", "pranayama"],
    season: ["vasanta", "grishma"],
    dosha: ["all"],
    difficulty: "beginner",
    
    history: "Gateway to the Himalayas. Ganga enters the plains here. One of four Kumbh Mela sites. Revered for its purifying power. Where the nectar of immortality fell during Devas vs Asuras battle.",
    practices: ["Ghat meditation", "Yoga training", "Ashram studies", "Ganga ritual", "Pilgrimage walks"],
    mainTemple: "Har-ki-Pauri (Footsteps of God)",
    accessibility: "very-easy",
    elevation: 340,
    
    accessibleFrom: ["Delhi", "Dehradun"],
    bestMonths: [3, 4, 5, 10, 11],
    estimatedStay: "3-5 days",
    accommodationOptions: ["Ashrams", "Yoga centers", "Hotels", "Guesthouses"],
    
    significance: "Gateway to spiritual exploration. The Ganga's first point of descent into human lands. Perfect for those beginning spiritual practice.",
    yogaPath: "Bhakti Yoga + Hatha Yoga + Karma Yoga",
  },

  {
    id: "rishikesh",
    name: "Rishikesh",
    sanskrit: "ऋषिकेश (Ṛṣikeś) - City of Sages",
    region: "Uttarakhand",
    country: "India",
    coords: { lat: 30.1267, lng: 78.4406 },
    
    deity: ["Shiva", "Vishnu", "Ganga"],
    element: "water",
    
    bestFor: ["hatha-yoga", "pranayama", "meditation", "ashram-training"],
    season: ["vasanta", "grishma"],
    dosha: ["all"],
    difficulty: "beginner",
    
    history: "Yoga capital of the world. Thousands of ashrams. Where Adi Shankara established his lineage. Modern yoga movement began here. The Beatles meditated here in the 1960s.",
    practices: ["Daily yoga practice", "Asana training", "Pranayama", "Meditation", "Chanting", "Ghat arati"],
    mainTemple: "Multiple temples and ashrams",
    accessibility: "very-easy",
    elevation: 339,
    
    accessibleFrom: ["Delhi", "Haridwar"],
    bestMonths: [3, 4, 5, 10, 11],
    estimatedStay: "7-30 days",
    accommodationOptions: ["Ashrams", "Yoga centers", "Hotels", "Resorts"],
    
    significance: "Modern center of yoga teaching and transmission. Gateway to Himalayan wisdom traditions. Ideal for learning classical yoga systems.",
    yogaPath: "Hatha Yoga + Raja Yoga + Bhakti Yoga",
  },

  {
    id: "chidambaram",
    name: "Chidambaram",
    sanskrit: "चिदम्बरम् (Cidambaram) - Temple of Consciousness",
    region: "Tamil Nadu",
    country: "India",
    coords: { lat: 11.3923, lng: 79.6975 },
    
    deity: ["Shiva-Nataraja", "Shivakami"],
    element: "ether",
    
    bestFor: ["dance-yoga", "natya-shastra", "cosmic-rhythm"],
    season: ["sharad", "hemanta", "vasanta"],
    dosha: ["pitta"],
    difficulty: "intermediate",
    
    history: "One of five Elemental Temples of Shiva (space element here). Nataraja, the cosmic dancer. Center of classical arts and sacred geometry. Dance is meditation here.",
    practices: ["Dance meditation", "Cosmic rhythm study", "Temple geometry study", "Natya Shastra learning"],
    mainTemple: "Nataraja Temple",
    accessibility: "easy",
    elevation: 7,
    
    accessibleFrom: ["Chennai", "Cuddalore"],
    bestMonths: [10, 11, 12, 2, 3],
    estimatedStay: "3-5 days",
    accommodationOptions: ["Temples", "Pilgrimage centers", "Hotels"],
    
    significance: "Shiva as cosmic dancer. The void (akasha) manifest as the eternal dance of creation. Dance as spiritual practice.",
    yogaPath: "Natya Yoga + Kundalini + Meditation",
  },

  {
    id: "srirangam",
    name: "Srirangam",
    sanskrit: "श्रीरंगम् (Śrīraṅgam) - Island Temple of Ranganatha",
    region: "Tamil Nadu",
    country: "India",
    coords: { lat: 11.0087, lng: 79.8460 },
    
    deity: ["Vishnu-Ranganatha", "Lakshmi"],
    element: "water",
    
    bestFor: ["bhakti", "vaishnavism", "devotion"],
    season: ["all"],
    dosha: ["pitta"],
    difficulty: "beginner",
    
    history: "Largest temple in the world by area. Island surrounded by Kaveri river. 7 concentric walls. 21 towers. Center of Sri Vaishnava philosophy. Ramanuja's primary seat of learning.",
    practices: ["Bhakti chanting", "Temple rituals", "Mantra japa", "Darshan meditation"],
    mainTemple: "Ranganathaswamy Temple",
    accessibility: "easy",
    elevation: 67,
    
    accessibleFrom: ["Trichy", "Bangalore"],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    estimatedStay: "2-3 days",
    accommodationOptions: ["Temple rest houses", "Pilgrimage hostels", "Hotels"],
    
    significance: "Island of devotion. Vishnu in recline. The perfect form of temple architecture. Bhakti as highest path.",
    yogaPath: "Bhakti Yoga + Karma Yoga",
  },

  {
    id: "tirupati",
    name: "Tirupati",
    sanskrit: "तिरुपति (Tirupati) - Sacred Hill of Venkateshwara",
    region: "Andhra Pradesh",
    country: "India",
    coords: { lat: 13.1939, lng: 79.5941 },
    
    deity: ["Vishnu-Venkateshwara", "Lakshmi", "Padmavati"],
    element: "earth",
    
    bestFor: ["bhakti", "prayer", "surrender", "grace"],
    season: ["all"],
    dosha: ["all"],
    difficulty: "beginner",
    
    history: "Most visited temple in the world. 2000+ year old temple. Perched on 3,200ft hill. Where prayers are answered. Lord of the Seven Hills. Mountains are considered the body of Shiva.",
    practices: ["Darshan", "Circumambulation", "Hill climb meditation", "Prayer", "Chanting"],
    mainTemple: "Venkateswara Temple",
    accessibility: "easy",
    elevation: 853,
    
    accessibleFrom: ["Chennai", "Bangalore"],
    bestMonths: [10, 11, 12, 1, 2],
    estimatedStay: "1-2 days",
    accommodationOptions: ["Temple accommodations", "Hotels", "Pilgrim lodges"],
    
    significance: "The grace that answers prayers. Cosmic love and compassion. Most powerful blessing center in South India.",
    yogaPath: "Bhakti Yoga + Surrender + Prayer",
  },

  {
    id: "kanyakumari",
    name: "Kanyakumari",
    sanskrit: "कन्याकुमारी (Kanyakumāri) - Virgin Goddess at Earth's Tip",
    region: "Tamil Nadu",
    country: "India",
    coords: { lat: 8.0883, lng: 77.5385 },
    
    deity: ["Devi-Kanya Kumari", "Shakti"],
    element: "water",
    
    bestFor: ["shakti-worship", "pilgrimage-completion", "ocean-meditation"],
    season: ["all"],
    dosha: ["kapha"],
    difficulty: "beginner",
    
    history: "Southernmost tip of India. Where three oceans meet. Temple of the Virgin Goddess. Vivekananda meditated on the rocks offshore. Chakra point of transformation.",
    practices: ["Temple darshan", "Ocean meditation", "Vivekananda rock visit", "Tri-ocean ritual"],
    mainTemple: "Kanya Kumari Temple",
    accessibility: "very-easy",
    elevation: 0,
    
    accessibleFrom: ["Trivandrum", "Kochi"],
    bestMonths: [10, 11, 12, 1, 2],
    estimatedStay: "2-3 days",
    accommodationOptions: ["Temples", "Hotels", "Beach resorts"],
    
    significance: "The culmination point. Where earth, sea, and sky merge. The beginning of pilgrimage for many. Fierce feminine energy.",
    yogaPath: "Shakti Yoga + Pilgrimage + Ocean Meditation",
  },

  {
    id: "kolkata-kalighat",
    name: "Kolkata (Kalighat)",
    sanskrit: "कोलकाता (Kolkatā) - Kali's Temple",
    region: "West Bengal",
    country: "India",
    coords: { lat: 22.5431, lng: 88.3622 },
    
    deity: ["Kali", "Shiva"],
    mahavidya: ["Kali"],
    element: "fire",
    
    bestFor: ["tantra", "kali-worship", "transformation"],
    season: ["sharad", "hemanta"],
    dosha: ["pitta"],
    difficulty: "advanced",
    
    history: "Kalighat temple is one of 51 Shakti Peeths. Heart of Bengal tantra. Center of philosophical and spiritual thought. Ramakrishna Paramahamsa's ashram nearby. Temple where Kali's toe fell.",
    practices: ["Kali puja", "Tantra rituals", "Ashram studies", "Mantra initiation"],
    mainTemple: "Kalighat Kali Temple",
    accessibility: "easy",
    elevation: 9,
    
    accessibleFrom: ["Kolkata airport"],
    bestMonths: [9, 10, 11, 12],
    estimatedStay: "3-7 days",
    accommodationOptions: ["Ashrams", "Guest houses", "Hotels"],
    
    significance: "Mother Kali's primary manifestation. Fierce compassion. Transformation through dissolution. Death and rebirth.",
    yogaPath: "Tantra Yoga + Kali Sadhana + Shakti Path",
    warnings: ["Intense energy", "Crowded during festivals", "Requires spiritual preparation"]
  },

  {
    id: "kamakhya",
    name: "Kamakhya",
    sanskrit: "कामाख्या (Kāmākhyā) - Temple of Divine Feminine",
    region: "Assam",
    country: "India",
    coords: { lat: 26.1925, lng: 91.7368 },
    
    deity: ["Devi", "Shakti", "Kali"],
    mahavidya: ["All 10 Mahavidyas"],
    element: "water",
    
    bestFor: ["tantra", "mahavidya-worship", "shakti-sadhana"],
    season: ["varsha", "sharad"],
    dosha: ["pitta"],
    difficulty: "advanced",
    
    history: "Primary seat of all 10 Mahavidyas. One of the oldest shakti peeths. Where Sati's womb fell. Pilgrimage center for tantric practitioners. Temple on Nilachal Hill.",
    practices: ["Mahavidya rituals", "Tantra initiation", "Sacred sexuality study", "Kundalini awakening"],
    mainTemple: "Kamakhya Temple",
    accessibility: "moderate",
    elevation: 60,
    
    accessibleFrom: ["Guwahati"],
    bestMonths: [6, 7, 8, 9, 10],
    estimatedStay: "3-7 days",
    accommodationOptions: ["Ashrams", "Temples", "Guest houses"],
    
    significance: "Complete expression of Divine Feminine. All wisdom traditions converge here. Ultimate Shakti center.",
    yogaPath: "Tantra Yoga + All Mahavidya Paths + Kundalini",
    warnings: ["Very advanced practice location", "Requires guru guidance", "Intense tantric energy"]
  }
];

/**
 * Filter locations by criteria
 */
export function filterLocations(
  criteria: {
    bestFor?: string[];
    difficulty?: string;
    region?: string;
    season?: number;
    deity?: string;
  }
): SacredLocation[] {
  return SACRED_LOCATIONS.filter(loc => {
    if (criteria.bestFor && !criteria.bestFor.some(bf => loc.bestFor.includes(bf))) return false;
    if (criteria.difficulty && loc.difficulty !== criteria.difficulty) return false;
    if (criteria.region && loc.region !== criteria.region) return false;
    if (criteria.season && !loc.bestMonths.includes(criteria.season)) return false;
    if (criteria.deity && !loc.deity.includes(criteria.deity)) return false;
    return true;
  });
}

/**
 * Get locations recommended for a specific siddhi
 */
export function recommendLocationsForSiddhi(
  siddhi: any
): SacredLocation[] {
  const criteria: any = {};
  
  // Match by difficulty
  if (siddhi.difficulty) criteria.difficulty = siddhi.difficulty;
  
  // Match by deity if available
  if (siddhi.deity) criteria.deity = siddhi.deity;
  
  return filterLocations(criteria);
}

/**
 * Get top locations by current season
 */
export function getLocationsByCurrentSeason(): SacredLocation[] {
  const month = new Date().getMonth() + 1;
  return filterLocations({ season: month });
}

/**
 * Get all unique regions
 */
export function getRegions(): string[] {
  return [...new Set(SACRED_LOCATIONS.map(l => l.region))].sort();
}

/**
 * Get all practice types
 */
export function getPracticeTypes(): string[] {
  const types = new Set<string>();
  SACRED_LOCATIONS.forEach(loc => {
    loc.bestFor.forEach(practice => types.add(practice));
  });
  return [...types].sort();
}
