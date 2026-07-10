'use client';

import { YANTRA_MEDITATION_PATHS, SUGGESTED_SEQUENCES } from '@/lib/yantra-meditation-data';

interface Props {
  selectedPathId: string | null;
  onSelectPath: (pathId: string) => void;
  onStartMeditation: () => void;
}

export default function YantraMeditationSelector({ selectedPathId, onSelectPath, onStartMeditation }: Props) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-900 text-green-200';
      case 'intermediate':
        return 'bg-yellow-900 text-yellow-200';
      case 'advanced':
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Start Sequences */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Start Sequences</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {SUGGESTED_SEQUENCES.map((seq) => (
            <button
              key={seq.id}
              onClick={() => {
                if (seq.paths.length === 1) {
                  onSelectPath(seq.paths[0]);
                  onStartMeditation();
                }
              }}
              className="bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 rounded-lg p-4 text-left transition-all hover:shadow-lg"
            >
              <h3 className="font-semibold text-white mb-2">{seq.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{seq.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-400">{seq.totalDuration} min</span>
                <span className="text-lg">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Available Paths */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">All Meditation Paths</h2>
        <div className="grid gap-4">
          {YANTRA_MEDITATION_PATHS.map((path) => (
            <div
              key={path.id}
              className={`rounded-lg p-5 cursor-pointer transition-all ${
                selectedPathId === path.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 ring-2 ring-purple-400'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              onClick={() => onSelectPath(path.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className={`text-lg font-semibold ${selectedPathId === path.id ? 'text-white' : 'text-white'}`}>
                    {path.name}
                  </h3>
                  <p className={`text-sm ${selectedPathId === path.id ? 'text-purple-100' : 'text-gray-400'}`}>
                    {path.chakraFocus}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)}
                  </span>
                  <span className={`text-sm font-bold ${selectedPathId === path.id ? 'text-white' : 'text-purple-400'}`}>
                    {path.totalDuration} min
                  </span>
                </div>
              </div>

              <p className={`text-sm mb-3 ${selectedPathId === path.id ? 'text-purple-100' : 'text-gray-400'}`}>
                {path.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {path.benefits.map((benefit, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 text-xs rounded ${
                      selectedPathId === path.id
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-600 text-gray-300'
                    }`}
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      {selectedPathId && (
        <div className="flex gap-4">
          <button
            onClick={() => {
              onStartMeditation();
            }}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg"
          >
            Begin Meditation
          </button>
          <button
            onClick={() => onSelectPath('')}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-gray-300 font-semibold rounded-lg transition-all"
          >
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
}
