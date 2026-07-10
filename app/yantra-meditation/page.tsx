'use client';

import { useState } from 'react';
import YantraMeditationSelector from '@/components/yantra-meditation/YantraMeditationSelector';
import MeditationPlayer from '@/components/yantra-meditation/MeditationPlayer';
import { YANTRA_MEDITATION_PATHS } from '@/lib/yantra-meditation-data';

export default function YantraMeditationPage() {
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedPath = selectedPathId ? YANTRA_MEDITATION_PATHS.find((p) => p.id === selectedPathId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
            Yantra Meditation Pathways
          </h1>
          <p className="text-gray-300 text-lg">
            Journey through sacred geometry to deeper states of consciousness
          </p>
        </div>

        {isPlaying && selectedPath ? (
          /* Active Meditation Mode */
          <div className="max-w-4xl mx-auto">
            <MeditationPlayer
              path={selectedPath}
              onComplete={() => {
                setIsPlaying(false);
                setSelectedPathId(null);
              }}
              onExit={() => setIsPlaying(false)}
            />
          </div>
        ) : (
          /* Selection Mode */
          <YantraMeditationSelector
            selectedPathId={selectedPathId}
            onSelectPath={setSelectedPathId}
            onStartMeditation={() => setIsPlaying(true)}
          />
        )}
      </div>
    </div>
  );
}
