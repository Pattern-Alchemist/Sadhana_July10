/**
 * Cosmic Alignment Algorithm
 *
 * Calculates a weighted score for each Siddhi based on current cosmic conditions:
 * - Lunar phase (tithi) alignment
 * - Dosha balance of the current moment
 * - Seasonal resonance
 * - User progress tracking
 * - Difficulty progression
 *
 * The Dice (🎲) uses this to select the most cosmically aligned Siddhi for the learner.
 */

interface CosmicScore {
  slug: string;
  title: string;
  score: number;
  alignment: {
    lunar: number;
    dosha: number;
    seasonal: number;
    difficulty: number;
    recency: number;
  };
  reason: string;
  percentage: number;
}

interface UserProgress {
  completedSiddhis: string[];
  recentlyRecommended: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

/**
 * Get current lunar tithi (1-30)
 * Simplified calculation based on lunar days
 */
function getCurrentTithi(): number {
  const now = new Date();
  const lunarCycle = 29.53; // days
  const knownNewMoon = new Date(2024, 0, 11); // Reference new moon
  const daysSinceNewMoon = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const tithi = Math.floor((daysSinceNewMoon % lunarCycle) / lunarCycle * 30) + 1;
  return Math.max(1, Math.min(30, tithi));
}

/**
 * Determine current dosha dominance based on time and season
 * Vata: 6-10am, 2-6pm (dry, moving energy)
 * Pitta: 10am-2pm, 6-10pm (warm, transformative)
 * Kapha: 10pm-6am (heavy, stable)
 */
function getCurrentDosha(): string {
  const hour = new Date().getHours();
  
  if ((hour >= 6 && hour < 10) || (hour >= 14 && hour < 18)) return 'vata';
  if ((hour >= 10 && hour < 14) || (hour >= 18 && hour < 22)) return 'pitta';
  return 'kapha';
}

/**
 * Get current season (Northern India convention)
 * Varsha (monsoon): Jun-Aug
 * Sharad (autumn): Sep-Oct
 * Hemanta (early winter): Nov-Dec
 * Shishira (late winter): Jan-Feb
 * Vasanta (spring): Mar-Apr
 * Grishma (summer): May
 */
function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  
  if (month >= 6 && month <= 8) return 'varsha';
  if (month === 9 || month === 10) return 'sharad';
  if (month === 11 || month === 12) return 'hemanta';
  if (month === 1 || month === 2) return 'shishira';
  if (month === 3 || month === 4) return 'vasanta';
  return 'grishma';
}

/**
 * Calculate lunar alignment score (0-1)
 * Returns 0.8 if siddhi's bestTithi matches current tithi
 * Returns 0.4 if in same phase (waxing/waning)
 */
function calculateLunarAlignment(bestTithis: number[]): number {
  const currentTithi = getCurrentTithi();
  
  // Perfect match
  if (bestTithis.includes(currentTithi)) return 0.8;
  
  // Same phase: waxing (1-15) or waning (16-30)
  const currentPhase = currentTithi <= 15 ? 'waxing' : 'waning';
  const bestPhase = bestTithis.some(t => t <= 15) ? 'waxing' : 'waning';
  
  if (currentPhase === bestPhase) return 0.4;
  
  return 0.1; // Misaligned
}

/**
 * Calculate dosha alignment score (0-1)
 * Returns 0.5 if siddhi's dosha matches current dosha
 */
function calculateDoshaAlignment(siddhiDoshas: string[]): number {
  const currentDosha = getCurrentDosha();
  return siddhiDoshas.includes(currentDosha) ? 0.5 : 0.2;
}

/**
 * Calculate seasonal alignment score (0-1)
 * Returns 0.4 if siddhi's season matches current season
 */
function calculateSeasonalAlignment(siddhiSeason: string): number {
  const currentSeason = getCurrentSeason();
  return siddhiSeason.toLowerCase() === currentSeason ? 0.4 : 0.15;
}

/**
 * Calculate difficulty progression score (0-1)
 * Recommend next level based on user progress
 */
function calculateDifficultyScore(
  siddhiDifficulty: 'beginner' | 'intermediate' | 'advanced',
  userProgress: UserProgress
): number {
  // Beginners should get beginner siddhis (0.9)
  if (userProgress.difficulty === 'beginner') {
    if (siddhiDifficulty === 'beginner') return 0.9;
    if (siddhiDifficulty === 'intermediate') return 0.3;
    return 0.05;
  }
  
  // Intermediate: bias toward intermediate, allow some advanced
  if (userProgress.difficulty === 'intermediate') {
    if (siddhiDifficulty === 'intermediate') return 0.85;
    if (siddhiDifficulty === 'advanced') return 0.4;
    return 0.2; // Can revisit beginner
  }
  
  // Advanced: all levels acceptable
  return 0.7;
}

/**
 * Calculate recency penalty (0-1)
 * Avoid recommending siddhis from last 30 days
 */
function calculateRecencyScore(
  slug: string,
  userProgress: UserProgress
): number {
  if (userProgress.recentlyRecommended.includes(slug)) {
    return 0.1; // Heavy penalty
  }
  return 0.9;
}

/**
 * Main scoring function
 * Weights:
 * - Lunar: 30%
 * - Dosha: 25%
 * - Difficulty: 20%
 * - Seasonal: 15%
 * - Recency: 10%
 */
export function calculateCosmicScore(
  siddhi: any,
  userProgress: UserProgress
): CosmicScore {
  const lunar = calculateLunarAlignment(siddhi.bestTithi || []);
  const dosha = calculateDoshaAlignment(siddhi.dosha || []);
  const seasonal = calculateSeasonalAlignment(siddhi.season || '');
  const difficulty = calculateDifficultyScore(siddhi.difficulty || 'beginner', userProgress);
  const recency = calculateRecencyScore(siddhi.slug, userProgress);
  
  const score =
    lunar * 0.3 +
    dosha * 0.25 +
    difficulty * 0.2 +
    seasonal * 0.15 +
    recency * 0.1;
  
  // Generate explanation
  const reasons: string[] = [];
  if (lunar > 0.6) reasons.push('Perfect lunar alignment');
  else if (lunar > 0.3) reasons.push('Good lunar phase');
  
  if (dosha > 0.4) reasons.push(`Balances ${getCurrentDosha()} dosha`);
  
  const season = getCurrentSeason();
  if (seasonal > 0.3) reasons.push(`Resonates with ${season} season`);
  
  if (difficulty > 0.7) reasons.push('Suited to your level');
  
  const reason = reasons.length > 0 
    ? reasons.join(' • ')
    : 'The universe guides your path';
  
  return {
    slug: siddhi.slug,
    title: siddhi.title,
    score,
    alignment: { lunar, dosha, seasonal, difficulty, recency },
    reason,
    percentage: Math.round(score * 100),
  };
}

/**
 * Select best Siddhi from list using cosmic alignment
 */
export function selectCosmicallyAlignedSiddhi(
  siddhis: any[],
  userProgress?: Partial<UserProgress>
): CosmicScore {
  const progress: UserProgress = {
    completedSiddhis: userProgress?.completedSiddhis || [],
    recentlyRecommended: userProgress?.recentlyRecommended || [],
    difficulty: userProgress?.difficulty || 'beginner',
  };
  
  const scores = siddhis.map(s => calculateCosmicScore(s, progress));
  
  // Sort by score, add some randomness to prevent always picking top
  scores.sort((a, b) => b.score - a.score);
  
  // Weighted random: pick from top 3-5 candidates
  const topCount = Math.min(5, Math.max(3, Math.floor(siddhis.length * 0.1)));
  const candidates = scores.slice(0, topCount);
  
  // Higher scored items have higher probability
  const totalScore = candidates.reduce((sum, c) => sum + c.score, 0);
  let random = Math.random() * totalScore;
  
  for (const candidate of candidates) {
    random -= candidate.score;
    if (random <= 0) return candidate;
  }
  
  return candidates[0];
}

/**
 * Get top N siddhis by cosmic alignment
 */
export function getTopCosmicallyAlignedSiddhis(
  siddhis: any[],
  count: number = 3,
  userProgress?: Partial<UserProgress>
): CosmicScore[] {
  const progress: UserProgress = {
    completedSiddhis: userProgress?.completedSiddhis || [],
    recentlyRecommended: userProgress?.recentlyRecommended || [],
    difficulty: userProgress?.difficulty || 'beginner',
  };
  
  return siddhis
    .map(s => calculateCosmicScore(s, progress))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

/**
 * Get current cosmic conditions
 */
export function getCurrentCosmicConditions() {
  return {
    tithi: getCurrentTithi(),
    dosha: getCurrentDosha(),
    season: getCurrentSeason(),
    timestamp: new Date().toISOString(),
  };
}
