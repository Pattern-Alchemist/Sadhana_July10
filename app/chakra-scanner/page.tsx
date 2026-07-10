'use client';

import { useState } from 'react';
import ChakraRadialVisualization from '@/components/chakra-scanner/ChakraRadialVisualization';
import ChakraAssessmentForm from '@/components/chakra-scanner/ChakraAssessmentForm';
import ChakraRecommendations from '@/components/chakra-scanner/ChakraRecommendations';
import ChakraHistory from '@/components/chakra-scanner/ChakraHistory';
import { useChakraState } from '@/hooks/useChakraState';

export default function ChakraScannerPage() {
  const [activeView, setActiveView] = useState<'scan' | 'visualize' | 'history'>('scan');
  const { assessments, history, loading, updateChakraAssessment, saveAssessment, getRecommendations } =
    useChakraState();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading your chakra data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2">
            Chakra Balancing Scanner
          </h1>
          <p className="text-gray-300 text-lg">
            Assess your energy centers and receive personalized recommendations for balance
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {(['scan', 'visualize', 'history'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeView === view
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {view === 'scan' && 'Assessment'}
              {view === 'visualize' && 'Visualization'}
              {view === 'history' && 'History'}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeView === 'scan' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <ChakraAssessmentForm
              assessments={assessments}
              onUpdate={updateChakraAssessment}
              onSave={saveAssessment}
            />
            <ChakraRecommendations assessments={assessments} getRecommendations={getRecommendations} />
          </div>
        )}

        {activeView === 'visualize' && <ChakraRadialVisualization assessments={assessments} />}

        {activeView === 'history' && <ChakraHistory history={history} />}
      </div>
    </div>
  );
}
