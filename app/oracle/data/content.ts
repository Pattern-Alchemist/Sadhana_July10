export interface Principle {
  title: string;
  body: string;
}

export const PRINCIPLES: Principle[] = [
  {
    title: "The Law of Cause & Effect",
    body: "Every action, word, and thought plants a seed that will one day bear fruit. Nothing is lost; everything returns.",
  },
  {
    title: "No Debt Is Permanent",
    body: "Karma is not a sentence but a balance seeking restoration. Through awareness and right action, every scale can settle.",
  },
  {
    title: "The Mirror of Relationship",
    body: "Others reflect the unresolved within us. The people who provoke you most are often your greatest teachers.",
  },
  {
    title: "Cycles Seek Resolution",
    body: "Patterns repeat not as punishment, but as patient instruction — returning gently until the lesson is finally learned.",
  },
  {
    title: "Justice & Mercy Are One",
    body: "Karma is neither cruel nor kind. It is balance itself, moving always toward harmony and offering grace to those who grow.",
  },
  {
    title: "You Are the Weaver",
    body: "Fate is co-created. Conscious choice is the loom upon which destiny is woven, and the future is never fully fixed.",
  },
];

export interface Step {
  n: string;
  title: string;
  body: string;
}

export const HOW_TO_USE: Step[] = [
  {
    n: "01",
    title: "Set Your Intention",
    body: "Ground yourself with a few slow breaths. Focus on seeking truth and clarity about a karmic influence, and phrase one clear question to hold in your heart.",
  },
  {
    n: "02",
    title: "Shuffle & Draw",
    body: "Hold the question in mind. Tap to shuffle and draw a single card for quick insight, or lay a full spread to read the karmic currents in depth.",
  },
  {
    n: "03",
    title: "Read the Layers",
    body: "Move from the Core Message through the Challenge and into the Guidance. Notice which layer speaks loudest — that is where the reading lives.",
  },
  {
    n: "04",
    title: "Reflect & Decode",
    body: "Sit with the card's reflection prompt and write freely. Then tap “Decode the Reflection” to unveil the deeper truth, a three-step pathway, and one key action — turning the question into a real solution.",
  },
  {
    n: "05",
    title: "Heal & Act",
    body: "Oracle cards are mirrors, not verdicts. Choose one small, conscious action to plant better karma today, and let the reading become a living practice.",
  },
];

export interface Spread {
  name: string;
  cards: number;
  intent: string;
  positions: string[];
}

export const SPREADS: Spread[] = [
  {
    name: "The Daily Pulse",
    cards: 1,
    intent: "A single card to carry the day's karmic energy.",
    positions: ["What karmic lesson or energy should I walk with today?"],
  },
  {
    name: "The Three Roots",
    cards: 3,
    intent: "Trace a single situation from seed to harvest.",
    positions: ["The Seed — past cause", "The Bloom — present effect", "The Fruit — future harvest"],
  },
  {
    name: "The Karmic Insight",
    cards: 5,
    intent: "The signature reading of the deck — a full map of karmic forces.",
    positions: [
      "Current Karmic Situation",
      "Karmic Justice or Consequence",
      "The Lesson to Learn",
      "Path to Healing or Redemption",
      "Outcome / Future Influence",
    ],
  },
  {
    name: "The Ancestral Mirror",
    cards: 4,
    intent: "Untangle the inherited threads of family karma.",
    positions: [
      "The Inherited Pattern",
      "The Lesson It Bears",
      "How to Break the Cycle",
      "The Blessing Waiting Beyond",
    ],
  },
];

export interface Tip {
  title: string;
  body: string;
}

export const READER_TIPS: Tip[] = [
  {
    title: "Lead with Compassion",
    body: "Karma is about learning, not punishment. Frame every challenge as a doorway, never a doom.",
  },
  {
    title: "Speak of Growth",
    body: "Replace 'punishment' with 'consequence' and 'fate' with 'pattern.' Language shapes how the soul receives the message.",
  },
  {
    title: "Trust Intuition",
    body: "Let the querent's gut lead over rigid keywords. The card that feels charged is always the true card.",
  },
  {
    title: "End with Action",
    body: "Close every reading with one empowering, concrete step. Insight without action simply waits to return.",
  },
  {
    title: "Hold Space Gently",
    body: "Ancestral and past-life themes can surface deep emotion. Move slowly, validate what arises, and never push.",
  },
  {
    title: "Honor Free Will",
    body: "Karma shows the tendency, not the verdict. Remind the seeker that the future remains theirs to weave.",
  },
];

export interface KarmaType {
  name: string;
  glyph: string;
  body: string;
}

export const KARMA_TYPES: KarmaType[] = [
  {
    name: "Personal Karma",
    glyph: "✦",
    body: "The cause and effect born of your own choices in this life — the most immediate karma you can change.",
  },
  {
    name: "Generational Karma",
    glyph: "❦",
    body: "Patterns, gifts and wounds passed down through your bloodline, waiting to be healed or claimed.",
  },
  {
    name: "Land Karma",
    glyph: "⛰",
    body: "The memory held by place and earth — debts and blessings tied to where you stand and how you tend it.",
  },
  {
    name: "Soul Karma",
    glyph: "☉",
    body: "Contracts made before birth and lessons spanning lifetimes, woven into the long arc of your evolution.",
  },
  {
    name: "Spiritual Karma",
    glyph: "☾",
    body: "The soul's deeper debts to the divine and to growth — the karma of consciousness itself.",
  },
];

export interface PaletteSwatch {
  name: string;
  hex: string;
  note: string;
}

export const PALETTE: PaletteSwatch[] = [
  { name: "Void Indigo", hex: "#0b0918", note: "The mystery from which all arises" },
  { name: "Deep Violet", hex: "#2c1466", note: "Spiritual depth and the unseen" },
  { name: "Antique Gold", hex: "#d4af37", note: "Illumination, value, and law" },
  { name: "Ember Crimson", hex: "#4a1320", note: "Justice, consequence, and passion" },
  { name: "Earth Emerald", hex: "#13352a", note: "Ancestral roots and living land" },
  { name: "Starlight", hex: "#f2e7cf", note: "Truth revealed and clarity" },
];

export const SYMBOLS = [
  "Scales of impartial balance",
  "Chains of binding consequence",
  "Mirrors of self-revelation",
  "Spirals of ascending growth",
  "Roots of ancestral lineage",
  "The all-seeing eye of witness",
  "The ouroboros of eternal return",
  "Celestial stars and the guiding moon",
];
