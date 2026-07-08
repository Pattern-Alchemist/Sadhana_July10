/**
 * Analytics System
 * ================
 * Track ritual practices, user engagement, and accessibility metrics.
 * All data is stored locally (no tracking external servers).
 */

export interface AnalyticsEvent {
  type: 'ritual_start' | 'ritual_complete' | 'ritual_abandon' | 'ritual_error' | 'accessibility_toggle' | 'app_error';
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface SessionMetrics {
  totalPractices: number;
  totalMinutes: number;
  longestStreak: number;
  lastPracticeTime: number;
  accessibilityMode: boolean;
  audioEnabled: boolean;
  hapticEnabled: boolean;
  errors: number;
}

const STORAGE_KEY = 'astrokalki_analytics';
const SESSION_KEY = 'astrokalki_session';

/**
 * Get current session metrics
 */
export function getSessionMetrics(): SessionMetrics {
  if (typeof window === 'undefined') {
    return {
      totalPractices: 0,
      totalMinutes: 0,
      longestStreak: 0,
      lastPracticeTime: 0,
      accessibilityMode: false,
      audioEnabled: true,
      hapticEnabled: true,
      errors: 0,
    };
  }

  const stored = localStorage.getItem(SESSION_KEY);
  if (!stored) {
    return {
      totalPractices: 0,
      totalMinutes: 0,
      longestStreak: 0,
      lastPracticeTime: 0,
      accessibilityMode:
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      audioEnabled: true,
      hapticEnabled: true,
      errors: 0,
    };
  }

  return JSON.parse(stored);
}

/**
 * Track a ritual event
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  const events = localStorage.getItem(STORAGE_KEY);
  const eventList: AnalyticsEvent[] = events ? JSON.parse(events) : [];
  
  eventList.push(event);
  
  // Keep only last 1000 events to prevent storage bloat
  if (eventList.length > 1000) {
    eventList.splice(0, eventList.length - 1000);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(eventList));
  
  // Update session metrics based on event type
  if (event.type === 'ritual_start' || event.type === 'ritual_complete') {
    updateSessionMetrics(event);
  }
}

/**
 * Update session metrics from event
 */
function updateSessionMetrics(event: AnalyticsEvent): void {
  const metrics = getSessionMetrics();
  
  if (event.type === 'ritual_complete') {
    metrics.totalPractices += 1;
    metrics.totalMinutes += event.metadata?.duration || 0;
    metrics.lastPracticeTime = event.timestamp;
  }
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(metrics));
}

/**
 * Record an error for debugging
 */
export function trackError(error: Error, context?: string): void {
  if (typeof window === 'undefined') return;

  trackEvent({
    type: 'app_error',
    timestamp: Date.now(),
    metadata: {
      message: error.message,
      stack: error.stack,
      context,
    },
  });
  
  const metrics = getSessionMetrics();
  metrics.errors += 1;
  localStorage.setItem(SESSION_KEY, JSON.stringify(metrics));
}

/**
 * Get analytics events for reporting
 */
export function getAnalyticsEvents(limit = 100): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];

  const events = localStorage.getItem(STORAGE_KEY);
  if (!events) return [];
  
  const eventList: AnalyticsEvent[] = JSON.parse(events);
  return eventList.slice(-limit);
}

/**
 * Clear all analytics (for privacy/debugging)
 */
export function clearAnalytics(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Get engagement score (0-100)
 */
export function getEngagementScore(): number {
  const metrics = getSessionMetrics();
  
  // Score based on: practices (30), total minutes (30), streak (20), no errors (20)
  let score = 0;
  
  // Max 30 points for practices (4+ = max)
  score += Math.min(30, (metrics.totalPractices / 4) * 30);
  
  // Max 30 points for minutes (120+ = max)
  score += Math.min(30, (metrics.totalMinutes / 120) * 30);
  
  // Max 20 points for streak
  score += Math.min(20, (metrics.longestStreak / 7) * 20);
  
  // Deduct 20 for errors
  score = Math.max(0, score - (metrics.errors * 5));
  
  return Math.min(100, Math.round(score));
}

/**
 * Export analytics as JSON
 */
export function exportAnalytics(): {
  metrics: SessionMetrics;
  events: AnalyticsEvent[];
  engagement: number;
  exportDate: string;
} {
  return {
    metrics: getSessionMetrics(),
    events: getAnalyticsEvents(1000),
    engagement: getEngagementScore(),
    exportDate: new Date().toISOString(),
  };
}
