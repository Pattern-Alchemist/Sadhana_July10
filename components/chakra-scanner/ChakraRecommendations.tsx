'use client';

import type { ChakraAssessment } from '@/lib/chakra-data';
import { CHAKRAS } from '@/lib/chakra-data';

interface Props {
  assessments: Record<string, ChakraAssessment>;
  getRecommendations: (chakraId: string) => string[];
}

export default function ChakraRecommendations({ assessments, getRecommendations }: Props) {
  const getHealthStatus = (energy: number, blockage: number): { status: string; color: string; icon: string } => {
    if (blockage > 60) return { status: 'Blocked', color: '#ef4444', icon: '🔴' };
    if (energy < 40) return { status: 'Depleted', color: '#f97316', icon: '🟠' };
    if (energy > 70 && blockage < 30) return { status: 'Balanced', color: '#22c55e', icon: '🟢' };
    return { status: 'Moderate', color: '#eab308', icon: '🟡' };
  };

  const getOverallScore = (): number => {
    const scores = CHAKRAS.map((c) => {
      const assessment = assessments[c.id];
      if (!assessment) return 50;
      return (assessment.energy + (100 - assessment.blockage)) / 2;
    });
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  return (
    <div className="space-y-4">
      {/* Overall Health Score */}
      <div className="folio-card group overflow-hidden rounded-lg p-6 bg-gradient-to-br from-stone-700 via-gray-700 to-slate-900 border border-amber-600/20">
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <h3 className="text-lg font-display text-yellow-300 tracking-wide mb-4">Chakra System Health</h3>
          <div className="flex items-end gap-6">
            <div className="text-6xl font-display text-yellow-300 font-semibold">{getOverallScore()}%</div>
            <div className="text-sm text-amber-50/80 pb-3 leading-relaxed">
              Your chakra system is{' '}
              <span className="text-yellow-300 font-semibold">
                {getOverallScore() > 70 ? 'well-balanced' : getOverallScore() > 50 ? 'moderately aligned' : 'seeking attention'}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold/10 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none" />
      </div>

      {/* Chakra Status Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-display text-yellow-300 tracking-wide">Chakra Status</h3>
        {CHAKRAS.map((chakra) => {
          const assessment = assessments[chakra.id];
          if (!assessment) return null;

          const status = getHealthStatus(assessment.energy, assessment.blockage);

          return (
            <div key={chakra.id} className="folio-card group relative rounded-lg p-4 bg-gradient-to-r from-slate-700/40 to-gray-700/40 border border-amber-600/15 hover:border-amber-600/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/0 via-amber-600/5 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full ring-2 ring-offset-1 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: chakra.color }}
                  ></div>
                  <div>
                    <p className="font-display text-amber-50 font-semibold text-sm">{chakra.name}</p>
                    <p className="text-xs text-amber-600/60">{chakra.sanskrit}</p>
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm transition-all"
                  style={{ backgroundColor: status.color + '20', color: status.color, borderColor: status.color + '40' }}
                >
                  {status.icon} {status.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Personalized Recommendations */}
      <div className="space-y-3">
        <h3 className="text-lg font-display text-yellow-300 tracking-wide">Personalized Recommendations</h3>

        {CHAKRAS.map((chakra) => {
          const assessment = assessments[chakra.id];
          if (!assessment) return null;

          const recommendations = getRecommendations(chakra.id);
          if (recommendations.length === 0) return null;

          return (
            <div key={chakra.id} className="folio-card group relative rounded-lg p-5 bg-gradient-to-br from-slate-700/30 to-gray-700/30 border border-amber-600/15 hover:border-amber-600/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-transparent to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              <div className="relative">
                <h4 className="font-display text-amber-50 mb-3 flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full ring-1 ring-offset-1"
                    style={{ backgroundColor: chakra.color }}
                  ></span>
                  <span className="text-yellow-300">{chakra.name}</span>
                </h4>
                <ul className="space-y-2">
                  {recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-amber-50/75 flex gap-2 leading-relaxed">
                      <span className="text-amber-600/80 flex-shrink-0 font-display">✦</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Healing Resources */}
      <div className="folio-card group relative rounded-lg p-6 bg-gradient-to-br from-slate-700/40 via-gray-700/30 to-slate-900/40 border border-amber-600/20 hover:border-amber-600/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/8 via-transparent to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        <div className="relative">
          <h4 className="font-display text-yellow-300 tracking-wide mb-4 flex items-center gap-2">
            <span className="text-2xl">✨</span> Healing Practices
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3 p-2.5 rounded-md bg-amber-600/5 border border-amber-600/10 hover:bg-amber-600/10 hover:border-amber-600/20 transition-colors">
              <span className="text-xl flex-shrink-0">🧘</span>
              <div>
                <p className="font-display text-amber-50 font-semibold">Daily Meditation</p>
                <p className="text-xs text-amber-50/60 mt-1">Visualize each chakra as a spinning wheel of light for 10 minutes</p>
              </div>
            </div>
            <div className="flex gap-3 p-2.5 rounded-md bg-amber-600/5 border border-amber-600/10 hover:bg-amber-600/10 hover:border-amber-600/20 transition-colors">
              <span className="text-xl flex-shrink-0">🔊</span>
              <div>
                <p className="font-display text-amber-50 font-semibold">Mantra Chanting</p>
                <p className="text-xs text-amber-50/60 mt-1">Chant chakra mantras 108 times with full presence and intention</p>
              </div>
            </div>
            <div className="flex gap-3 p-2.5 rounded-md bg-amber-600/5 border border-amber-600/10 hover:bg-amber-600/10 hover:border-amber-600/20 transition-colors">
              <span className="text-xl flex-shrink-0">🧘‍♀️</span>
              <div>
                <p className="font-display text-amber-50 font-semibold">Yoga Practice</p>
                <p className="text-xs text-amber-50/60 mt-1">Practice asanas targeting the most blocked chakras for liberation</p>
              </div>
            </div>
            <div className="flex gap-3 p-2.5 rounded-md bg-amber-600/5 border border-amber-600/10 hover:bg-amber-600/10 hover:border-amber-600/20 transition-colors">
              <span className="text-xl flex-shrink-0">🌿</span>
              <div>
                <p className="font-display text-amber-50 font-semibold">Nutrition</p>
                <p className="text-xs text-amber-50/60 mt-1">Consume foods aligned with each chakra&apos;s color and element</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
