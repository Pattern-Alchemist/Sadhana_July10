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
        return 'bg-sage/15 text-sage border border-sage/40';
      case 'intermediate':
        return 'bg-gold-bright/15 text-gold-bright border border-gold-bright/40';
      case 'advanced':
        return 'bg-rose-accent/15 text-rose-accent border border-rose-accent/40';
      default:
        return 'bg-gold/15 text-gold border border-gold/40';
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Start Sequences */}
      <div>
        <h3 className="text-2xl font-display text-yellow-300 tracking-wide mb-6">Quick Start Sequences</h3>
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
              className="folio-card group relative rounded-lg p-5 bg-gradient-to-br from-slate-700/50 to-gray-700/50 border border-amber-600/20 hover:border-amber-600/50 transition-all duration-300 hover:shadow-xl text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="relative">
                <h3 className="font-display text-yellow-300 font-semibold mb-2">{seq.name}</h3>
                <p className="text-sm text-amber-50/70 mb-4 leading-relaxed">{seq.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-amber-600/10">
                  <span className="text-sm font-display text-amber-600">{seq.totalDuration} minutes</span>
                  <span className="text-lg text-amber-600/60 group-hover:text-amber-600 transition-colors">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* All Available Paths */}
      <div>
        <h3 className="text-2xl font-display text-yellow-300 tracking-wide mb-6">All Meditation Paths</h3>
        <div className="grid gap-4">
          {YANTRA_MEDITATION_PATHS.map((path) => (
            <div
              key={path.id}
              className={`folio-card group relative rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                selectedPathId === path.id
                  ? 'bg-gradient-to-br from-amber-600/20 to-amber-700/10 border-amber-600/60 ring-1 ring-amber-600/40'
                  : 'bg-gradient-to-br from-slate-700/40 to-gray-700/40 border-amber-600/20 hover:border-amber-600/50'
              }`}
              onClick={() => onSelectPath(path.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-amber-600/5 opacity-0 ${selectedPathId === path.id ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500 rounded-lg`} />
              <div className="relative flex items-start justify-between mb-3">
                <div>
                  <h3 className={`text-lg font-display font-semibold ${selectedPathId === path.id ? 'text-yellow-300' : 'text-amber-50'}`}>
                    {path.name}
                  </h3>
                  <p className={`text-sm mt-1 ${selectedPathId === path.id ? 'text-amber-600/80' : 'text-amber-50/60'}`}>
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
