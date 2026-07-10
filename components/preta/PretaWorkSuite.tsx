'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PretaProtocol {
  name: string;
  description: string;
  ritual: string;
  mantras: string[];
  yantras: string[];
  duration: number;
  ethics: string[];
  warnings: string[];
}

const PRETA_PROTOCOLS: Record<string, PretaProtocol> = {
  samvada: {
    name: 'Preta-Samvada (Spirit Communication)',
    description: 'Ritual dialogue with ancestral or unresolved spirits for healing and liberation.',
    ritual: 'Krishna Paksha only. Midnight hours. Three-part ritual: invocation, dialogue, closure.',
    mantras: [
      'ॐ नमः पितृभ्यः (Om Namah Pitribhyah) - Salutation to ancestors',
      'ॐ ह्रीं क्लीं (Om Hreem Kleem) - Invoking the spirit',
      'ॐ शान्तिः शान्तिः (Om Shantih Shantih) - Peace for liberation',
    ],
    yantras: ['Preta Yantra (9x9 grid with central point)', 'Shava Yantra for death rites'],
    duration: 60,
    ethics: [
      'Only with ethical intention (healing, resolution)',
      'Never for manipulation or harm',
      'Respect the departed',
      'Seek liberation, not power',
    ],
    warnings: [
      'Requires guru guidance',
      'Only practice during Krishna Paksha',
      'Must have brahmacharya (celibacy)',
      'Protect your space with salt circle',
    ],
  },
  shuddhi: {
    name: 'Preta Shuddhi (Spirit Purification)',
    description: 'Rituals to purify and liberate stuck spirits, clearing karmic entanglement.',
    ritual: 'Fire ritual (havan) with specific mantras, yantras drawn in ash, mantra cycles.',
    mantras: [
      'ॐ यं रां लं वं शं सः (Chakra cleansing sequence)',
      'ॐ हूं फट् स्वाहा (Purification mantra)',
      'ॐ नमः शिवाय (Liberation through Shiva)',
    ],
    yantras: ['Trimurti Yantra', 'Chakra Shoddhana Yantra'],
    duration: 90,
    ethics: [
      'Act as a channel for divine grace',
      'Have compassion for stuck entities',
      'Seek their highest liberation',
    ],
    warnings: [
      'Very powerful practice',
      'Risk of attachment to spirit',
      'Requires strong energetic protection',
      'Follow protocol exactly',
    ],
  },
  chakra_dissolution: {
    name: 'Chakra Dissolution & Release',
    description: 'Guided practice to help spirits dissolve astral/chakra attachments before liberation.',
    ritual: 'Visualization-based practice. Guide spirit through chakras, releasing each level.',
    mantras: [
      'ॐ लं (Muladhara release)',
      'ॐ वं (Svadhisthana release)',
      'ॐ रं (Manipura release)',
      'ॐ यं (Anahata release)',
      'ॐ हं (Vishuddha release)',
      'ॐ ॐ (Ajna & Sahasrara merge)',
    ],
    yantras: ['Chakra Release Mandala'],
    duration: 45,
    ethics: ['Compassionate guidance', 'Respecting free will', 'Facilitating liberation'],
    warnings: ['May trigger emotional release', 'Intense spiritual work'],
  },
};

const FIELD_MANUAL = {
  intro:
    'Preta-work is the sacred duty of assisting spirits in transition. It requires ethical clarity, energetic protection, and unwavering compassion.',
  preparation: [
    'Cleanse space with salt, sage, or sound',
    'Set protective boundary (chakra, mantra, or visualization)',
    'Establish clear intention: "I help with liberation, not interference"',
    'Wear natural fibers (cotton, silk)',
    'Fast or eat light beforehand',
    'Practice grounding pranayama (Nadi Shodhana)',
  ],
  signs_of_presence: [
    'Temperature drop or unusual coldness',
    'Tingling or hair standing up',
    'Feeling of heaviness or pressure',
    'Spontaneous thoughts or emotions not your own',
    'Visual flashes or shadows',
  ],
  protection_techniques: [
    'Create protective circle with salt or chalk',
    'Visualize golden light surrounding you',
    'Chant protective mantras continuously',
    'Keep sacred water (Ganges water if possible) nearby',
    'Ground into earth through barefoot contact',
  ],
};

export default function PretaWorkSuite() {
  const [selectedProtocol, setSelectedProtocol] = useState('samvada');
  const [hasEthicalAgree, setHasEthicalAgree] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [spiritName, setSpiritName] = useState('');
  const [mantraCount, setMantraCount] = useState(0);
  const [notes, setNotes] = useState('');

  const protocol = PRETA_PROTOCOLS[selectedProtocol];

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-2">Preta-Work Suite</h1>
        <p className="text-sm text-[var(--color-bone)]/60">Ancestral healing & spirit liberation protocols</p>
      </div>

      {/* Ethical Agreement */}
      {!hasEthicalAgree && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-red-900/40 bg-red-900/10 p-6"
        >
          <h3 className="text-lg font-serif mb-3 text-red-200">Ethical Foundations Required</h3>
          <div className="space-y-2 mb-4 text-sm text-[var(--color-bone)]/70">
            <p>Preta-work is sacred. By continuing, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              {FIELD_MANUAL.preparation.map((item, i) => (
                <li key={i} className="text-xs">{item}</li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setHasEthicalAgree(true)}
              className="flex-1 rounded-lg bg-[var(--color-gold)] px-4 py-2 text-sm font-serif text-[var(--color-bone)] transition hover:bg-[var(--color-gold-bright)]"
            >
              I Understand & Agree
            </button>
            <button className="flex-1 rounded-lg border border-[var(--hairline)] px-4 py-2 text-sm font-serif text-[var(--color-bone)]/70 transition hover:border-[var(--color-gold)]/40">
              Learn More
            </button>
          </div>
        </motion.div>
      )}

      {hasEthicalAgree && (
        <>
          {/* Protocol Selector */}
          <div className="space-y-3">
            <label className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60">Select Protocol</label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {Object.entries(PRETA_PROTOCOLS).map(([key, proto]) => (
                <button
                  key={key}
                  onClick={() => !sessionStarted && setSelectedProtocol(key)}
                  disabled={sessionStarted}
                  className={`rounded-lg border px-4 py-3 text-left transition ${
                    selectedProtocol === key
                      ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                      : 'border-[var(--hairline)] hover:border-[var(--color-gold)]/40'
                  }`}
                >
                  <p className="text-sm font-serif mb-1">{proto.name.split(' (')[0]}</p>
                  <p className="text-xs text-[var(--color-bone)]/60">{proto.duration} min</p>
                </button>
              ))}
            </div>
          </div>

          {/* Protocol Details */}
          <div className="rounded-lg border border-[var(--hairline)] p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-serif mb-2">{protocol.name}</h3>
              <p className="text-sm text-[var(--color-bone)]/70 mb-4">{protocol.description}</p>

              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Ritual Overview</p>
                  <p className="text-sm bg-[var(--color-bone)]/5 p-3 rounded">{protocol.ritual}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Sacred Mantras</p>
                  <div className="space-y-2">
                    {protocol.mantras.map((mantra, i) => (
                      <p key={i} className="text-sm font-serif text-[var(--color-gold)]">
                        {mantra}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Warnings</p>
                  <ul className="space-y-1 text-xs text-red-200/80">
                    {protocol.warnings.map((warning, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-red-400">⚠</span>
                        <span>{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Session Input */}
            {!sessionStarted && (
              <div className="border-t border-[var(--hairline)] pt-6 space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2 block">
                    Spirit/Ancestor Name (optional)
                  </label>
                  <input
                    type="text"
                    value={spiritName}
                    onChange={(e) => setSpiritName(e.target.value)}
                    placeholder="Enter name to establish connection..."
                    className="w-full rounded border border-[var(--hairline)] bg-[var(--color-bone)]/5 px-3 py-2 text-sm"
                  />
                </div>

                <button
                  onClick={() => setSessionStarted(true)}
                  className="w-full rounded-lg bg-[var(--color-gold)] px-4 py-3 text-sm font-serif uppercase tracking-luxe text-[var(--color-bone)] transition hover:bg-[var(--color-gold-bright)]"
                >
                  Begin Preta-Work Session
                </button>
              </div>
            )}

            {/* Active Session */}
            {sessionStarted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-t border-[var(--hairline)] pt-6 space-y-4">
                <div className="rounded-lg bg-[var(--color-bone)]/5 p-4">
                  <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Active Session</p>
                  <p className="text-sm font-serif mb-3">
                    {spiritName ? `Working with: ${spiritName}` : 'Connection established'}
                  </p>

                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-[var(--color-bone)]/60">Mantra Cycles: {mantraCount}</p>
                    <input
                      type="range"
                      min="0"
                      max="108"
                      value={mantraCount}
                      onChange={(e) => setMantraCount(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Log observations, insights, energy sensations..."
                    className="w-full rounded border border-[var(--hairline)] bg-[var(--color-bone)]/5 px-3 py-2 text-sm mb-3"
                    rows={4}
                  />

                  <button
                    onClick={() => setSessionStarted(false)}
                    className="w-full rounded-lg bg-red-900/30 px-4 py-2 text-sm font-serif text-red-200 transition hover:bg-red-900/50"
                  >
                    Close Session & Save
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Field Manual */}
          <div className="rounded-lg border border-[var(--hairline)] p-6 space-y-4">
            <h3 className="text-lg font-serif">Field Manual</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Core Principle</p>
                <p className="text-[var(--color-bone)]/70">{FIELD_MANUAL.intro}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Signs of Spirit Presence</p>
                <ul className="space-y-1 list-disc list-inside text-[var(--color-bone)]/70">
                  {FIELD_MANUAL.signs_of_presence.map((sign, i) => (
                    <li key={i}>{sign}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Protection Techniques</p>
                <ul className="space-y-1 list-disc list-inside text-[var(--color-bone)]/70">
                  {FIELD_MANUAL.protection_techniques.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
