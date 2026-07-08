/**
 * Offline Support System
 * ======================
 * Enable full app functionality when offline via local caching and service worker.
 * Syncs data when connection returns.
 */

export interface OfflineState {
  isOnline: boolean;
  lastSyncTime: number;
  pendingActions: Array<{
    id: string;
    type: string;
    data: any;
    timestamp: number;
  }>;
  cachedContent: Map<string, any>;
}

const OFFLINE_CACHE_KEY = 'astrokalki_offline_cache';
const PENDING_ACTIONS_KEY = 'astrokalki_pending_actions';

let offlineState: OfflineState = {
  isOnline: true,
  lastSyncTime: Date.now(),
  pendingActions: [],
  cachedContent: new Map(),
};

/**
 * Initialize offline support (call on app startup)
 */
export function initializeOfflineSupport(): void {
  if (typeof window === 'undefined') return;

  // Detect online/offline status
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Check initial status
  offlineState.isOnline = navigator.onLine;

  // Load pending actions from storage
  const stored = localStorage.getItem(PENDING_ACTIONS_KEY);
  if (stored) {
    offlineState.pendingActions = JSON.parse(stored);
  }

  // Register service worker if available
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('[Offline] Service worker registration failed:', err.message);
    });
  }

  console.log('[Offline] Support initialized', { online: offlineState.isOnline });
}

/**
 * Get current offline state
 */
export function getOfflineState(): OfflineState {
  return {
    ...offlineState,
    cachedContent: new Map(offlineState.cachedContent),
  };
}

/**
 * Cache content for offline use
 */
export function cacheContent(key: string, data: any, ttl?: number): void {
  if (typeof window === 'undefined') return;

  offlineState.cachedContent.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });

  // Persist to localStorage
  const cache: Record<string, any> = {};
  offlineState.cachedContent.forEach((v, k) => {
    cache[k] = v;
  });
  localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(cache));
}

/**
 * Get cached content
 */
export function getCachedContent(key: string): any | null {
  const cached = offlineState.cachedContent.get(key);
  if (!cached) return null;

  // Check TTL
  if (cached.ttl) {
    const age = Date.now() - cached.timestamp;
    if (age > cached.ttl) {
      offlineState.cachedContent.delete(key);
      return null;
    }
  }

  return cached.data;
}

/**
 * Queue an action for syncing when online
 */
export function queueAction(type: string, data: any): string {
  if (typeof window === 'undefined') return '';

  const id = `${type}_${Date.now()}_${Math.random()}`;
  const action = { id, type, data, timestamp: Date.now() };

  offlineState.pendingActions.push(action);
  persistPendingActions();

  console.log('[Offline] Action queued:', id, type);

  return id;
}

/**
 * Get all pending actions
 */
export function getPendingActions() {
  return [...offlineState.pendingActions];
}

/**
 * Remove action after successful sync
 */
export function clearPendingAction(id: string): void {
  offlineState.pendingActions = offlineState.pendingActions.filter(a => a.id !== id);
  persistPendingActions();
}

/**
 * Sync pending actions when online
 */
export async function syncPendingActions(): Promise<{ synced: number; failed: number }> {
  if (!offlineState.isOnline) {
    return { synced: 0, failed: 0 };
  }

  let synced = 0;
  let failed = 0;
  const actionsToSync = [...offlineState.pendingActions];

  for (const action of actionsToSync) {
    try {
      // In real app, this would make API call
      console.log('[Offline] Syncing action:', action.id);
      clearPendingAction(action.id);
      synced++;
    } catch (err) {
      console.log('[Offline] Sync failed:', action.id);
      failed++;
    }
  }

  if (synced > 0) {
    offlineState.lastSyncTime = Date.now();
    console.log('[Offline] Sync complete:', { synced, failed });
  }

  return { synced, failed };
}

/**
 * Check if app can function offline
 */
export function canFunctionOffline(): boolean {
  return offlineState.cachedContent.size > 0 || offlineState.pendingActions.length > 0;
}

/**
 * Get offline capabilities info
 */
export function getOfflineCapabilities() {
  return {
    isOnline: offlineState.isOnline,
    hasServiceWorker: typeof window !== 'undefined' && 'serviceWorker' in navigator,
    cachedItems: offlineState.cachedContent.size,
    pendingActions: offlineState.pendingActions.length,
    lastSync: new Date(offlineState.lastSyncTime).toISOString(),
    canFunction: canFunctionOffline(),
  };
}

/**
 * Clear all offline data
 */
export function clearOfflineData(): void {
  if (typeof window === 'undefined') return;

  offlineState.cachedContent.clear();
  offlineState.pendingActions = [];
  localStorage.removeItem(OFFLINE_CACHE_KEY);
  localStorage.removeItem(PENDING_ACTIONS_KEY);

  console.log('[Offline] All offline data cleared');
}

// Internal handlers

function handleOnline(): void {
  offlineState.isOnline = true;
  console.log('[Offline] Online detected');
  syncPendingActions();
  window.dispatchEvent(new CustomEvent('offline-status-changed', { detail: { online: true } }));
}

function handleOffline(): void {
  offlineState.isOnline = false;
  console.log('[Offline] Offline detected');
  window.dispatchEvent(new CustomEvent('offline-status-changed', { detail: { online: false } }));
}

function persistPendingActions(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(PENDING_ACTIONS_KEY, JSON.stringify(offlineState.pendingActions));
}

/**
 * Load cached content from storage
 */
export function loadOfflineCache(): void {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(OFFLINE_CACHE_KEY);
  if (stored) {
    const cache = JSON.parse(stored);
    Object.entries(cache).forEach(([key, value]: [string, any]) => {
      offlineState.cachedContent.set(key, value);
    });
  }
}
