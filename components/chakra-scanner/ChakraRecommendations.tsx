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
      <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Overall Chakra Health</h3>
        <div className="flex items-end gap-4">
          <div className="text-5xl font-bold">{getOverallScore()}%</div>
          <div className="text-sm opacity-90 pb-2">
            Your chakra system is{' '}
            {getOverallScore() > 70 ? 'well-balanced' : getOverallScore() > 50 ? 'moderately aligned' : 'seeking attention'}
          </div>
        </div>
      </div>

      {/* Chakra Status Grid */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Chakra Status</h3>
        {CHAKRAS.map((chakra) => {
          const assessment = assessments[chakra.id];
          if (!assessment) return null;

          const status = getHealthStatus(assessment.energy, assessment.blockage);

          return (
            <div key={chakra.id} className="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: chakra.color }}
                ></div>
                <div>
                  <p className="font-semibold text-white text-sm">{chakra.name}</p>
                  <p className="text-xs text-gray-400">{chakra.sanskrit}</p>
                </div>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: status.color + '40', color: status.color }}
              >
                {status.status}
              </div>
            </div>
          );
        })}
      </div>

      {/* Personalized Recommendations */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Personalized Recommendations</h3>

        {CHAKRAS.map((chakra) => {
          const assessment = assessments[chakra.id];
          if (!assessment) return null;

          const recommendations = getRecommendations(chakra.id);
          if (recommendations.length === 0) return null;

          return (
            <div key={chakra.id} className="bg-slate-700 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: chakra.color }}
                ></span>
                {chakra.name}
              </h4>
              <ul className="space-y-2">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-gray-300 flex gap-2">
                    <span className="text-orange-400 flex-shrink-0">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Healing Resources */}
      <div className="bg-slate-700 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-3">Quick Healing Tips</h4>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex gap-2">
            <span className="text-orange-400 font-bold">🧘</span>
            <div>
              <p className="font-semibold">Daily Meditation</p>
              <p className="text-xs text-gray-400">Spend 10 minutes visualizing each chakra as a spinning wheel of light</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-orange-400 font-bold">🔊</span>
            <div>
              <p className="font-semibold">Mantra Chanting</p>
              <p className="text-xs text-gray-400">Chant the root mantra LAM (or appropriate chakra mantra) 108 times</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-orange-400 font-bold">🧘‍♀️</span>
            <div>
              <p className="font-semibold">Yoga Practice</p>
              <p className="text-xs text-gray-400">Practice asanas that target the most blocked chakras</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-orange-400 font-bold">🌿</span>
            <div>
              <p className="font-semibold">Nutrition</p>
              <p className="text-xs text-gray-400">Eat foods that correspond to each chakra&apos;s color</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
