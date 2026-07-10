'use client';

import { useCallback, useState, useEffect } from 'react';
import type { ChakraAssessment, UserChakraAssessment } from '@/lib/chakra-data';
import { CHAKRAS } from '@/lib/chakra-data';

const STORAGE_KEY = 'sadhana_chakra_assessments';

export function useChakraState() {
  const [assessments, setAssessments] = useState<Record<string, ChakraAssessment>>({});
  const [history, setHistory] = useState<UserChakraAssessment[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
        if (parsed.length > 0) {
          setAssessments(parsed[parsed.length - 1].assessments);
        }
      }
    } catch (e) {
      console.error('[v0] Failed to load chakra assessments:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateChakraAssessment = useCallback(
    (chakraId: string, assessment: ChakraAssessment) => {
      setAssessments((prev) => ({
        ...prev,
        [chakraId]: assessment,
      }));
    },
    []
  );

  const saveAssessment = useCallback(
    (notes: string = '') => {
      const newEntry: UserChakraAssessment = {
        date: new Date().toISOString(),
        assessments,
        notes,
      };

      const updated = [...history, newEntry];
      setHistory(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return newEntry;
    },
    [assessments, history]
  );

  const getRecommendations = useCallback(
    (chakraId: string): string[] => {
      const chakra = CHAKRAS.find((c) => c.id === chakraId);
      const assessment = assessments[chakraId];

      if (!chakra || !assessment) return [];

      const recommendations: string[] = [];

      // Blocked recommendations
      if (assessment.blockage > 60) {
        recommendations.push(`Chant the ${chakra.sanskrit} mantra (${chakra.mantra}) for 10 minutes daily`);
        recommendations.push(`Practice ${chakra.healingRecommendations.asanas[0]} to open this chakra`);
        recommendations.push(`Meditate on the ${chakra.color} light at the ${chakra.location}`);
      }

      // Low energy recommendations
      if (assessment.energy < 40) {
        recommendations.push(`Increase ${chakra.healingRecommendations.foods[0]} in your diet`);
        recommendations.push(`Wear or carry ${chakra.healingRecommendations.crystals[0]}`);
      }

      // Symptom-based recommendations
      if (assessment.symptoms.length > 0) {
        recommendations.push(`Address these symptoms: ${assessment.symptoms.join(', ')}`);
      }

      return recommendations.slice(0, 5);
    },
    [assessments]
  );

  const getOverallHealthScore = useCallback((): number => {
    const energies = CHAKRAS.map((c) => assessments[c.id]?.energy ?? 50);
    const blockages = CHAKRAS.map((c) => assessments[c.id]?.blockage ?? 0);

    const energyScore = energies.reduce((a, b) => a + b, 0) / energies.length;
    const blockageScore = 100 - (blockages.reduce((a, b) => a + b, 0) / blockages.length);

    return Math.round((energyScore + blockageScore) / 2);
  }, [assessments]);

  return {
    assessments,
    history,
    loading,
    updateChakraAssessment,
    saveAssessment,
    getRecommendations,
    getOverallHealthScore,
  };
}
