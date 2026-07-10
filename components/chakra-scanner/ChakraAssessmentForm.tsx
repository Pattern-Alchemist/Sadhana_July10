'use client';

import { useState } from 'react';
import type { ChakraAssessment } from '@/lib/chakra-data';
import { CHAKRAS } from '@/lib/chakra-data';

interface Props {
  assessments: Record<string, ChakraAssessment>;
  onUpdate: (chakraId: string, assessment: ChakraAssessment) => void;
  onSave: (notes: string) => void;
}

export default function ChakraAssessmentForm({ assessments, onUpdate, onSave }: Props) {
  const [expandedChakra, setExpandedChakra] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleEnergyChange = (chakraId: string, value: number) => {
    const current = assessments[chakraId] || { name: '', energy: 50, blockage: 0, symptoms: [], recommendations: [] };
    onUpdate(chakraId, { ...current, energy: value });
  };

  const handleBlockageChange = (chakraId: string, value: number) => {
    const current = assessments[chakraId] || { name: '', energy: 50, blockage: 0, symptoms: [], recommendations: [] };
    onUpdate(chakraId, { ...current, blockage: value });
  };

  const toggleSymptom = (chakraId: string, symptom: string) => {
    const current = assessments[chakraId] || { name: '', energy: 50, blockage: 0, symptoms: [], recommendations: [] };
    const symptoms = current.symptoms.includes(symptom)
      ? current.symptoms.filter((s) => s !== symptom)
      : [...current.symptoms, symptom];
    onUpdate(chakraId, { ...current, symptoms });
  };

  const handleSave = () => {
    onSave(notes);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="space-y-4">
      {CHAKRAS.map((chakra) => {
        const assessment = assessments[chakra.id] || {
          name: chakra.name,
          energy: 50,
          blockage: 0,
          symptoms: [],
          recommendations: [],
        };

        return (
          <div key={chakra.id} className="bg-slate-700 rounded-lg overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setExpandedChakra(expandedChakra === chakra.id ? null : chakra.id)}
              className="w-full p-4 flex items-center gap-4 hover:bg-slate-600 transition-colors"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: chakra.color }}
              ></div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-white">{chakra.name}</h3>
                <p className="text-sm text-gray-400">{chakra.location}</p>
              </div>
              <div className="text-sm font-bold text-orange-400">
                E: {assessment.energy}% | B: {assessment.blockage}%
              </div>
              <span className="text-xl text-gray-400">{expandedChakra === chakra.id ? '−' : '+'}</span>
            </button>

            {/* Expanded Content */}
            {expandedChakra === chakra.id && (
              <div className="p-4 bg-slate-750 border-t border-slate-600 space-y-4">
                {/* Energy Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Energy Level: {assessment.energy}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={assessment.energy}
                    onChange={(e) => handleEnergyChange(chakra.id, parseInt(e.target.value))}
                    className="w-full accent-orange-400"
                  />
                </div>

                {/* Blockage Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Blockage Level: {assessment.blockage}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={assessment.blockage}
                    onChange={(e) => handleBlockageChange(chakra.id, parseInt(e.target.value))}
                    className="w-full accent-red-500"
                  />
                </div>

                {/* Symptoms */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Symptoms (select all that apply):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {chakra.imbalanceSymptoms.blocked.map((symptom) => (
                      <label key={symptom} className="flex items-center gap-2 text-sm text-gray-300">
                        <input
                          type="checkbox"
                          checked={assessment.symptoms.includes(symptom)}
                          onChange={() => toggleSymptom(chakra.id, symptom)}
                          className="rounded"
                        />
                        {symptom}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-slate-800 p-3 rounded text-sm text-gray-400 space-y-1">
                  <p>
                    <strong>Mantra:</strong> {chakra.mantra}
                  </p>
                  <p>
                    <strong>Deity:</strong> {chakra.deity}
                  </p>
                  <p>
                    <strong>Element:</strong> {chakra.element}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Notes Section */}
      <div className="bg-slate-700 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">Assessment Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record any additional observations about your energy state..."
          className="w-full bg-slate-800 border border-slate-600 rounded px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-orange-400"
          rows={3}
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all"
      >
        Save Assessment
      </button>

      {savedMessage && (
        <div className="bg-green-900 text-green-200 p-3 rounded-lg">
          Assessment saved successfully!
        </div>
      )}
    </div>
  );
}
