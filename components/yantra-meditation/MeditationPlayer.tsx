'use client';

import { useState, useEffect, useRef } from 'react';
import type { YantraMeditationPath } from '@/lib/yantra-meditation-data';

interface Props {
  path: YantraMeditationPath;
  onComplete: () => void;
  onExit: () => void;
}

export default function MeditationPlayer({ path, onComplete, onExit }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const currentStep = path.steps[currentStepIndex];
  const totalDuration = path.steps.reduce((sum, step) => sum + step.duration, 0);

  // Calculate total elapsed time for all previous steps
  const stepStartTime = path.steps.slice(0, currentStepIndex).reduce((sum, step) => sum + step.duration, 0);
  const stepProgress = (elapsedTime / currentStep.duration) * 100;

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setElapsedTime((prev) => {
        const newTime = prev + 1;
        const stepTotalTime = stepStartTime + currentStep.duration;

        // Move to next step or complete
        if (newTime >= currentStep.duration) {
          if (currentStepIndex < path.steps.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return newTime;
          }
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentStepIndex, currentStep.duration, path.steps.length, stepStartTime]);

  const getBreathPattern = (pattern?: string) => {
    switch (pattern) {
      case '4-4-4':
        return 'Inhale 4 • Hold 4 • Exhale 4';
      case '4-7-8':
        return 'Inhale 4 • Hold 7 • Exhale 8';
      case '1-4-2':
        return 'Inhale 1 • Hold 4 • Exhale 2';
      default:
        return 'Breathe naturally';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleComplete = () => {
    setIsPlaying(false);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl max-w-2xl w-full max-h-96 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">{path.name}</h2>
          <p className="text-purple-100">Step {currentStepIndex + 1} of {path.steps.length}</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Main Instruction */}
          <div className="text-center">
            <p className="text-xl text-white leading-relaxed mb-4">{currentStep.instruction}</p>

            {/* Visualization */}
            {currentStep.visualization && (
              <div className="bg-slate-700/50 rounded-lg p-4 mb-4 border-l-4 border-purple-500">
                <p className="text-sm text-gray-300">
                  <strong>Visualization:</strong> {currentStep.visualization}
                </p>
              </div>
            )}

            {/* Breath Pattern */}
            <div className="bg-slate-700/50 rounded-lg p-3 inline-block text-sm text-purple-300 font-semibold">
              {getBreathPattern(currentStep.breathPattern)}
            </div>

            {/* Mantra */}
            {currentStep.mantra && (
              <div className="mt-4 text-3xl font-bold text-pink-400 animate-pulse">
                {currentStep.mantra}
              </div>
            )}
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            {/* Current Step Progress */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Current Step</span>
                <span>{formatTime(elapsedTime)} / {formatTime(currentStep.duration)}</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                  style={{ width: `${stepProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Overall Progress */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Total Progress</span>
                <span>{formatTime(stepStartTime + elapsedTime)} / {formatTime(totalDuration)}</span>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all"
                  style={{ width: `${((stepStartTime + elapsedTime) / totalDuration) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center pt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all"
            >
              {isPlaying ? '⏸ Pause' : '▶ Resume'}
            </button>

            {currentStepIndex < path.steps.length - 1 && (
              <button
                onClick={() => {
                  setCurrentStepIndex((prev) => prev + 1);
                  setElapsedTime(0);
                }}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
              >
                Skip Step →
              </button>
            )}

            {currentStepIndex === path.steps.length - 1 && (
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
              >
                ✓ Complete
              </button>
            )}

            <button
              onClick={onExit}
              className="px-6 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 font-semibold rounded-lg transition-all"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Completion Message */}
        {!isPlaying && currentStepIndex === path.steps.length - 1 && (
          <div className="bg-green-900/30 border-t border-green-700 p-4 text-center text-green-200">
            <p className="font-semibold">Meditation Complete! Namaste 🙏</p>
          </div>
        )}
      </div>
    </div>
  );
}
