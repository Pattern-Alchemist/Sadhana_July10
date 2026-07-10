// Yantra-based meditation pathways

export interface MeditationStep {
  duration: number; // seconds
  instruction: string;
  breathPattern?: 'natural' | '4-4-4' | '4-7-8' | '1-4-2';
  visualization?: string;
  mantra?: string;
}

export interface YantraMeditationPath {
  id: string;
  name: string;
  yantraId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalDuration: number; // minutes
  description: string;
  benefits: string[];
  chakraFocus: string;
  steps: MeditationStep[];
}

export const YANTRA_MEDITATION_PATHS: YantraMeditationPath[] = [
  {
    id: 'sri-yantra-foundation',
    name: 'Sri Yantra Foundation',
    yantraId: 'sri-yantra',
    difficulty: 'beginner',
    totalDuration: 15,
    description: 'Begin your journey with the cosmic blueprint. This gentle meditation uses the Sri Yantra to establish spiritual foundation.',
    benefits: ['Grounding', 'Clarity', 'Connection to divine', 'Mental peace'],
    chakraFocus: 'All chakras',
    steps: [
      {
        duration: 60,
        instruction: 'Find a comfortable seated position. Close your eyes gently. Take three deep breaths.',
        breathPattern: 'natural',
      },
      {
        duration: 120,
        instruction: 'Visualize the outer triangle of the Sri Yantra. See it as a protective boundary around you.',
        breathPattern: 'natural',
        visualization: 'Golden protective triangle surrounding your entire body',
      },
      {
        duration: 180,
        instruction: 'Move your awareness to the central point (bindu). This is the seat of pure consciousness.',
        breathPattern: '4-4-4',
        visualization: 'A brilliant white or golden point of light at the center of all existence',
        mantra: 'OM',
      },
      {
        duration: 240,
        instruction: 'Trace the interlocking triangles with your inner vision. Feel the balance of masculine and feminine energy.',
        breathPattern: '4-4-4',
        visualization: 'Ascending and descending triangles weaving together in perfect harmony',
      },
      {
        duration: 180,
        instruction: 'Rest in the awareness of the whole yantra. Let any insights arise naturally.',
        breathPattern: 'natural',
      },
      {
        duration: 60,
        instruction: 'Slowly bring awareness back to your body. Wiggle fingers and toes. Open eyes.',
        breathPattern: 'natural',
      },
    ],
  },
  {
    id: 'chakra-journey',
    name: 'Chakra Journey Through Yantras',
    yantraId: 'chakra-mandala',
    difficulty: 'intermediate',
    totalDuration: 25,
    description: 'Journey through your energy centers using sacred geometric patterns aligned with each chakra.',
    benefits: ['Energy alignment', 'Spiritual awakening', 'Inner balance', 'Chakra activation'],
    chakraFocus: 'Root to Crown',
    steps: [
      {
        duration: 120,
        instruction: 'Ground yourself at the base of the spine. Visualize the red square of Muladhara yantra.',
        breathPattern: '4-4-4',
        visualization: 'Red square with a yellow triangle inside, representing earth element',
        mantra: 'LAM',
      },
      {
        duration: 120,
        instruction: 'Move to the sacral center. See the orange circle with triangles of Svadhisthana.',
        breathPattern: '4-4-4',
        visualization: 'Orange flowing circle with white triangles',
        mantra: 'VAM',
      },
      {
        duration: 120,
        instruction: 'Ascend to the solar plexus. Observe the golden triangle of Manipura.',
        breathPattern: '4-4-4',
        visualization: 'Red triangle pointing upward on a yellow background',
        mantra: 'RAM',
      },
      {
        duration: 120,
        instruction: 'Arrive at the heart. Feel the green hexagon of Anahata yantra.',
        breathPattern: '4-4-4',
        visualization: 'Green hexagon formed by two interlocking triangles',
        mantra: 'YAM',
      },
      {
        duration: 120,
        instruction: 'Reach the throat. Witness the silver circle of Vishuddha.',
        breathPattern: '4-4-4',
        visualization: 'Blue circle with a white triangle',
        mantra: 'HAM',
      },
      {
        duration: 120,
        instruction: 'Unfold the third eye. Observe the Ajna yantra - two triangles in a circle.',
        breathPattern: '4-4-4',
        visualization: 'Indigo circle with two triangles - one pointing up, one pointing down',
        mantra: 'OM',
      },
      {
        duration: 120,
        instruction: 'Crown opening. Rest in the thousand-petaled lotus of Sahasrara.',
        breathPattern: '4-4-4',
        visualization: 'Violet or white lotus with infinite petals radiating light',
        mantra: 'OM AH',
      },
      {
        duration: 180,
        instruction: 'Integrate all chakras. See them as a unified column of light from root to crown.',
        breathPattern: 'natural',
      },
      {
        duration: 60,
        instruction: 'Gently return. Appreciate the flow of prana through your being.',
        breathPattern: 'natural',
      },
    ],
  },
  {
    id: 'yantra-mandala-spiral',
    name: 'Mandala Spiral Ascension',
    yantraId: 'mandala',
    difficulty: 'advanced',
    totalDuration: 30,
    description: 'Advanced meditation spiraling through sacred geometry toward ultimate enlightenment consciousness.',
    benefits: ['Deep meditation', 'Kundalini activation', 'Samadhi approach', 'Transcendence'],
    chakraFocus: 'Kundalini activation',
    steps: [
      {
        duration: 180,
        instruction: 'Establish your center. Set the intention for this sacred journey.',
        breathPattern: '4-7-8',
      },
      {
        duration: 240,
        instruction: 'Begin at the outer mandala circle. Trace spirals moving inward with each breath.',
        breathPattern: '4-7-8',
        visualization: 'Spiraling inward through concentric circles of the mandala',
      },
      {
        duration: 300,
        instruction: 'Enter the geometric layers. Each layer represents a deeper level of consciousness.',
        breathPattern: '4-7-8',
        visualization: 'Geometric patterns becoming increasingly refined and luminous',
        mantra: 'OM NAMAH SHIVAYA',
      },
      {
        duration: 240,
        instruction: 'Approach the center bindu. This is the gateway to pure awareness.',
        breathPattern: '4-7-8',
        visualization: 'A brilliant, infinite point of light containing all of creation',
      },
      {
        duration: 300,
        instruction: 'Merge with the center. Experience unity consciousness.',
        breathPattern: 'natural',
      },
      {
        duration: 180,
        instruction: 'Return through the mandala layers, bringing this light back to your body.',
        breathPattern: 'natural',
      },
      {
        duration: 120,
        instruction: 'Ground and integrate. Feel your connection to the earth and the cosmos.',
        breathPattern: 'natural',
      },
    ],
  },
];

export interface MeditationSequence {
  id: string;
  name: string;
  paths: string[];
  totalDuration: number;
  description: string;
}

export const SUGGESTED_SEQUENCES: MeditationSequence[] = [
  {
    id: 'daily-practice',
    name: 'Daily Foundation Practice',
    paths: ['sri-yantra-foundation'],
    totalDuration: 15,
    description: 'Perfect for morning practice to establish spiritual foundation and clarity for the day.',
  },
  {
    id: 'chakra-exploration',
    name: 'Weekly Chakra Exploration',
    paths: ['chakra-journey'],
    totalDuration: 25,
    description: 'Deepen your connection with your energy centers. Ideal for mid-week practice.',
  },
  {
    id: 'advanced-journey',
    name: 'Advanced Consciousness Expansion',
    paths: ['sri-yantra-foundation', 'yantra-mandala-spiral'],
    totalDuration: 45,
    description: 'For experienced practitioners seeking deep meditation and spiritual advancement.',
  },
];

export function getPathById(id: string): YantraMeditationPath | undefined {
  return YANTRA_MEDITATION_PATHS.find((p) => p.id === id);
}

export function getSequenceById(id: string): MeditationSequence | undefined {
  return SUGGESTED_SEQUENCES.find((s) => s.id === id);
}
