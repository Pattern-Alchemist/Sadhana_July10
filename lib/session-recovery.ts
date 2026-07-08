/**
 * Session Recovery System
 * =======================
 * Save and restore ritual progress, user preferences, and app state.
 * Enables seamless recovery from page reloads or unexpected errors.
 */

export interface RitualSession {
  id: string;
  ritualId: string;
  startTime: number;
  currentStep: number;
  totalSteps: number;
  paused: boolean;
  pausedAt?: number;
  metadata?: Record<string, any>;
}

export interface AppState {
  vault?: {
    encryptionKey?: string;
    createdAt: number;
  };
  preferences?: {
    audioEnabled: boolean;
    hapticEnabled: boolean;
    theme?: string;
    language?: string;
  };
  lastRoute?: string;
}

const RITUAL_SESSION_KEY = 'astrokalki_ritual_session';
const APP_STATE_KEY = 'astrokalki_app_state';
const BACKUP_KEY = 'astrokalki_state_backup';

/**
 * Save current ritual session
 */
export function saveRitualSession(session: RitualSession): void {
  if (typeof window === 'undefined') return;

  // Create backup before saving
  const existing = localStorage.getItem(RITUAL_SESSION_KEY);
  if (existing) {
    localStorage.setItem(BACKUP_KEY, existing);
  }

  localStorage.setItem(RITUAL_SESSION_KEY, JSON.stringify(session));
}

/**
 * Get active ritual session (if any)
 */
export function getActiveRitualSession(): RitualSession | null {
  if (typeof window === 'undefined') return null;

  const session = localStorage.getItem(RITUAL_SESSION_KEY);
  if (!session) return null;

  const parsed: RitualSession = JSON.parse(session);
  
  // Session expires after 24 hours of inactivity
  const dayInMs = 24 * 60 * 60 * 1000;
  if (Date.now() - parsed.pausedAt! > dayInMs) {
    clearRitualSession();
    return null;
  }

  return parsed;
}

/**
 * Update ritual session progress
 */
export function updateRitualProgress(
  step: number,
  totalSteps: number,
  paused: boolean = false,
): void {
  const session = getActiveRitualSession();
  if (!session) return;

  session.currentStep = step;
  session.totalSteps = totalSteps;
  session.paused = paused;
  if (paused) {
    session.pausedAt = Date.now();
  }

  saveRitualSession(session);
}

/**
 * Clear current ritual session (after completion)
 */
export function clearRitualSession(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(RITUAL_SESSION_KEY);
}

/**
 * Restore session from backup (if main session corrupted)
 */
export function restoreFromBackup(): RitualSession | null {
  if (typeof window === 'undefined') return null;

  const backup = localStorage.getItem(BACKUP_KEY);
  if (!backup) return null;

  try {
    const session: RitualSession = JSON.parse(backup);
    saveRitualSession(session);
    return session;
  } catch {
    localStorage.removeItem(BACKUP_KEY);
    return null;
  }
}

/**
 * Save app preferences
 */
export function saveAppState(state: AppState): void {
  if (typeof window === 'undefined') return;

  // Create backup
  const existing = localStorage.getItem(APP_STATE_KEY);
  if (existing) {
    localStorage.setItem(BACKUP_KEY, existing);
  }

  localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

/**
 * Get saved app state
 */
export function getAppState(): AppState {
  if (typeof window === 'undefined') {
    return {
      preferences: {
        audioEnabled: true,
        hapticEnabled: true,
      },
    };
  }

  const state = localStorage.getItem(APP_STATE_KEY);
  if (!state) {
    return {
      preferences: {
        audioEnabled: true,
        hapticEnabled: true,
      },
    };
  }

  return JSON.parse(state);
}

/**
 * Update specific app preference
 */
export function updatePreference(
  key: keyof AppState['preferences'],
  value: any,
): void {
  const state = getAppState();
  if (!state.preferences) {
    state.preferences = {
      audioEnabled: true,
      hapticEnabled: true,
    };
  }
  (state.preferences as any)[key] = value;
  saveAppState(state);
}

/**
 * Get recovery info (for debug UI)
 */
export function getRecoveryInfo() {
  return {
    hasActiveSession: getActiveRitualSession() !== null,
    hasBackup: typeof window !== 'undefined' && localStorage.getItem(BACKUP_KEY) !== null,
    appState: getAppState(),
    recoveryAvailable: getActiveRitualSession() !== null,
  };
}

/**
 * Clear all saved state (for logout or reset)
 */
export function clearAllState(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(RITUAL_SESSION_KEY);
  localStorage.removeItem(APP_STATE_KEY);
  localStorage.removeItem(BACKUP_KEY);
}

/**
 * Export session state for debugging
 */
export function exportSessionState() {
  return {
    activeSession: getActiveRitualSession(),
    appState: getAppState(),
    recoveryInfo: getRecoveryInfo(),
    exportTime: new Date().toISOString(),
  };
}
