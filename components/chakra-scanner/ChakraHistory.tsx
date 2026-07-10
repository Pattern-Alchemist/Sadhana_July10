'use client';

import type { UserChakraAssessment } from '@/lib/chakra-data';
import { CHAKRAS } from '@/lib/chakra-data';

interface Props {
  history: UserChakraAssessment[];
}

export default function ChakraHistory({ history }: Props) {
  if (history.length === 0) {
    return (
      <div className="bg-slate-700 rounded-lg p-8 text-center">
        <p className="text-gray-400 mb-4">No assessment history yet. Complete an assessment to get started!</p>
        <p className="text-sm text-gray-500">Your past assessments will appear here for tracking progress over time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {history.slice().reverse().map((entry, idx) => {
          const date = new Date(entry.date);
          const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          });

          const avgEnergy =
            Object.values(entry.assessments).reduce((sum, a) => sum + a.energy, 0) / Object.keys(entry.assessments).length;
          const avgBlockage =
            Object.values(entry.assessments).reduce((sum, a) => sum + a.blockage, 0) / Object.keys(entry.assessments).length;

          return (
            <div key={idx} className="bg-slate-700 rounded-lg overflow-hidden hover:bg-slate-650 transition-colors">
              {/* Header */}
              <div className="p-4 bg-slate-800 border-b border-slate-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">
                      {formattedDate} at {formattedTime}
                    </h3>
                    {entry.notes && <p className="text-sm text-gray-400 mt-1">Notes: {entry.notes}</p>}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-400">
                      {Math.round((avgEnergy + (100 - avgBlockage)) / 2)}%
                    </div>
                    <div className="text-xs text-gray-400">Health Score</div>
                  </div>
                </div>
              </div>

              {/* Chakra Grid */}
              <div className="p-4 grid grid-cols-4 gap-2">
                {CHAKRAS.map((chakra) => {
                  const assessment = entry.assessments[chakra.id];
                  if (!assessment) return null;

                  const getColor = () => {
                    const score = assessment.energy - assessment.blockage;
                    if (score > 40) return 'bg-green-900';
                    if (score > 0) return 'bg-yellow-900';
                    return 'bg-red-900';
                  };

                  return (
                    <div key={chakra.id} className="text-center">
                      <div
                        className={`w-full aspect-square rounded-lg flex items-center justify-center cursor-help group relative ${getColor()}`}
                        style={{ opacity: 0.7 + (assessment.energy / 200) }}
                      >
                        <div className="text-2xl">{chakra.name.charAt(0)}</div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          {chakra.name}
                          <br />E: {assessment.energy}% B: {assessment.blockage}%
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{chakra.name.split(' ')[0]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Statistics */}
      <div className="bg-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Trends</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded p-3 text-center">
            <p className="text-sm text-gray-400">Total Assessments</p>
            <p className="text-2xl font-bold text-orange-400">{history.length}</p>
          </div>
          <div className="bg-slate-800 rounded p-3 text-center">
            <p className="text-sm text-gray-400">Average Energy</p>
            <p className="text-2xl font-bold text-green-400">
              {Math.round(
                history.reduce((sum, entry) => {
                  const avg = Object.values(entry.assessments).reduce((s, a) => s + a.energy, 0) / Object.keys(entry.assessments).length;
                  return sum + avg;
                }, 0) / history.length
              )}
              %
            </p>
          </div>
          <div className="bg-slate-800 rounded p-3 text-center">
            <p className="text-sm text-gray-400">Average Blockage</p>
            <p className="text-2xl font-bold text-red-400">
              {Math.round(
                history.reduce((sum, entry) => {
                  const avg = Object.values(entry.assessments).reduce((s, a) => s + a.blockage, 0) / Object.keys(entry.assessments).length;
                  return sum + avg;
                }, 0) / history.length
              )}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
