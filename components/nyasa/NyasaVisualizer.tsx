'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Chakra {
  name: string;
  sanskrit: string;
  element: string;
  color: string;
  location: string;
  seed: string;
  petals: number;
  deity: string;
}

const CHAKRAS: Chakra[] = [
  {
    name: 'Muladhara',
    sanskrit: 'मूलाधार',
    element: 'Earth',
    color: '#8B4513',
    location: 'Base of spine',
    seed: 'LAM',
    petals: 4,
    deity: 'Ganesha',
  },
  {
    name: 'Svadhisthana',
    sanskrit: 'स्वाधिष्ठान',
    element: 'Water',
    color: '#FF6347',
    location: 'Lower abdomen',
    seed: 'VAM',
    petals: 6,
    deity: 'Brahma',
  },
  {
    name: 'Manipura',
    sanskrit: 'मणिपूर',
    element: 'Fire',
    color: '#FFD700',
    location: 'Solar plexus',
    seed: 'RAM',
    petals: 10,
    deity: 'Rudra',
  },
  {
    name: 'Anahata',
    sanskrit: 'अनाहत',
    element: 'Air',
    color: '#00CD00',
    location: 'Heart center',
    seed: 'YAM',
    petals: 12,
    deity: 'Ishana',
  },
  {
    name: 'Vishuddha',
    sanskrit: 'विशुद्ध',
    element: 'Ether',
    color: '#00BFFF',
    location: 'Throat',
    seed: 'HAM',
    petals: 16,
    deity: 'Sadashiva',
  },
  {
    name: 'Ajna',
    sanskrit: 'आज्ञा',
    element: 'Mind',
    color: '#9932CC',
    location: 'Third eye',
    seed: 'OM',
    petals: 2,
    deity: 'Ardhanarishvara',
  },
  {
    name: 'Sahasrara',
    sanskrit: 'सहस्रार',
    element: 'Consciousness',
    color: '#FFB6C1',
    location: 'Crown',
    seed: 'OM',
    petals: 1000,
    deity: 'Shiva',
  },
];

const NYASA_TYPES = [
  {
    name: 'Anga Nyasa',
    description: 'Installation in body limbs',
    focus: ['head', 'heart', 'navel', 'knees', 'feet'],
  },
  {
    name: 'Chakra Nyasa',
    description: 'Seed mantras in chakras',
    focus: ['all seven chakras'],
  },
  {
    name: 'Shadanga Nyasa',
    description: 'Six-point installation',
    focus: ['heart', 'right arm', 'left arm', 'navel', 'knees', 'feet'],
  },
];

export default function NyasaVisualizer() {
  const [selectedChakra, setSelectedChakra] = useState<Chakra | null>(CHAKRAS[3]); // Heart default
  const [selectedNyasa, setSelectedNyasa] = useState(0);
  const [visualization, setVisualization] = useState('');
  const [isActivating, setIsActivating] = useState(false);

  const chakraVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    pulse: {
      scale: [1, 1.2, 1],
      boxShadow: [
        `0 0 0 0 rgba(212,175,55,0.7)`,
        `0 0 0 20px rgba(212,175,55,0)`,
      ],
    },
  };

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-2">Nyasa Visualization Engine</h1>
        <p className="text-sm text-[var(--color-bone)]/60">Sacred geometry & chakra installation practices</p>
      </div>

      {/* Nyasa Type Selector */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60">Nyasa Type</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {NYASA_TYPES.map((nyasa, i) => (
            <button
              key={i}
              onClick={() => setSelectedNyasa(i)}
              className={`rounded-lg border px-4 py-3 text-left transition ${
                selectedNyasa === i
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                  : 'border-[var(--hairline)] hover:border-[var(--color-gold)]/40'
              }`}
            >
              <p className="text-sm font-serif mb-1">{nyasa.name}</p>
              <p className="text-xs text-[var(--color-bone)]/60">{nyasa.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Body-Chakra Map */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Body Visualization */}
        <div className="flex justify-center items-start lg:col-span-1">
          <svg className="h-64 w-32" viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            {/* Head */}
            <circle cx="50" cy="25" r="12" fill="none" stroke="currentColor" strokeWidth="1" />

            {/* Chakra Points */}
            {CHAKRAS.map((chakra, i) => {
              const yPositions = [25, 45, 65, 85, 110, 30, 25];
              const y = yPositions[i];
              const isSelected = selectedChakra?.name === chakra.name;

              return (
                <g key={chakra.name}>
                  <motion.circle
                    cx="50"
                    cy={y}
                    r="8"
                    fill={chakra.color}
                    opacity={isSelected ? 1 : 0.4}
                    animate={isSelected && isActivating ? 'pulse' : 'visible'}
                    variants={chakraVariants}
                    onClick={() => setSelectedChakra(chakra)}
                    className="cursor-pointer"
                  />
                </g>
              );
            })}

            {/* Central Channel */}
            <line x1="50" y1="25" x2="50" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>

        {/* Chakra Details & Mantra Chanting */}
        {selectedChakra && (
          <motion.div
            key={selectedChakra.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 rounded-lg border border-[var(--hairline)] p-6 lg:col-span-2"
          >
            <div>
              <h3 className="text-2xl font-serif mb-1">{selectedChakra.name}</h3>
              <p className="text-sm text-[var(--color-bone)]/60">{selectedChakra.sanskrit}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-1">Element</p>
                <p className="font-serif">{selectedChakra.element}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-1">Location</p>
                <p className="font-serif">{selectedChakra.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-1">Seed Mantra</p>
                <p className="font-serif text-lg" style={{ color: selectedChakra.color }}>
                  {selectedChakra.seed}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-1">Petals</p>
                <p className="font-serif">{selectedChakra.petals}</p>
              </div>
            </div>

            <div className="border-t border-[var(--hairline)] pt-4">
              <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Deity Presiding</p>
              <p className="text-sm font-serif">{selectedChakra.deity}</p>
            </div>

            {/* Mantra Installation */}
            <div className="rounded-lg bg-[var(--color-bone)]/5 p-4">
              <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-3">Nyasa Installation</p>
              <div className="space-y-2">
                <p className="text-sm">
                  Touch this location and repeat: <span className="font-serif text-[var(--color-gold)]">{selectedChakra.seed}</span>
                </p>
                <p className="text-xs text-[var(--color-bone)]/60">
                  Visualize {selectedChakra.color} light at {selectedChakra.location.toLowerCase()}. Feel the mantra entering your body.
                </p>
              </div>
            </div>

            {/* Log Experience */}
            <textarea
              placeholder="What are you experiencing? Energy sensations, visions, feelings..."
              value={visualization}
              onChange={(e) => setVisualization(e.target.value)}
              className="w-full rounded border border-[var(--hairline)] bg-[var(--color-bone)]/5 px-3 py-2 text-sm"
              rows={3}
            />

            <button
              onClick={() => setIsActivating(!isActivating)}
              className="w-full rounded-lg bg-[var(--color-gold)] px-4 py-2 text-center text-sm font-serif uppercase tracking-luxe text-[var(--color-bone)] transition hover:bg-[var(--color-gold-bright)]"
            >
              {isActivating ? 'Stop Activation' : 'Begin Chakra Activation'}
            </button>
          </motion.div>
        )}
      </div>

      {/* Chakra Grid */}
      <div className="rounded-lg border border-[var(--hairline)] p-6">
        <h3 className="text-lg font-serif mb-4">All Chakras</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CHAKRAS.map((chakra) => (
            <button
              key={chakra.name}
              onClick={() => setSelectedChakra(chakra)}
              className={`rounded-lg border px-3 py-2 text-center text-xs transition ${
                selectedChakra?.name === chakra.name
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                  : 'border-[var(--hairline)] hover:border-[var(--color-gold)]/40'
              }`}
            >
              <div
                className="mx-auto mb-1 h-3 w-3 rounded-full"
                style={{ backgroundColor: chakra.color }}
              />
              <p className="text-xs font-serif">{chakra.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
