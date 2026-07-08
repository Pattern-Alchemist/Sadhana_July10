/**
 * Performance Measurement System
 * =============================
 * Track Web Vitals and custom performance metrics for optimization.
 * All measurements are local (no external reporting required).
 */

export interface WebVitals {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  inp?: number; // Interaction to Next Paint
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export interface PerformanceMetrics {
  timestamp: number;
  navigation: {
    dns: number;
    tcp: number;
    ttfb: number;
    domLoad: number;
    pageLoad: number;
  };
  vitals: WebVitals;
  resources: {
    totalCount: number;
    totalSize: number;
    jsSize: number;
    cssSize: number;
  };
  memory?: {
    used: number;
    limit: number;
  };
}

const METRICS_KEY = 'astrokalki_performance_metrics';

/**
 * Measure navigation timing
 */
export function measureNavigation(): PerformanceMetrics['navigation'] {
  if (typeof window === 'undefined' || !window.performance) {
    return { dns: 0, tcp: 0, ttfb: 0, domLoad: 0, pageLoad: 0 };
  }

  const timing = window.performance.timing;

  return {
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    tcp: timing.connectEnd - timing.connectStart,
    ttfb: timing.responseStart - timing.navigationStart,
    domLoad: timing.domContentLoadedEventEnd - timing.navigationStart,
    pageLoad: timing.loadEventEnd - timing.navigationStart,
  };
}

/**
 * Measure resource loading
 */
export function measureResources(): PerformanceMetrics['resources'] {
  if (typeof window === 'undefined' || !window.performance) {
    return { totalCount: 0, totalSize: 0, jsSize: 0, cssSize: 0 };
  }

  let totalSize = 0;
  let jsSize = 0;
  let cssSize = 0;

  const resources = window.performance.getEntriesByType('resource') as any[];

  resources.forEach(resource => {
    const size = resource.transferSize || 0;
    totalSize += size;

    if (resource.name.endsWith('.js')) {
      jsSize += size;
    } else if (resource.name.endsWith('.css')) {
      cssSize += size;
    }
  });

  return {
    totalCount: resources.length,
    totalSize,
    jsSize,
    cssSize,
  };
}

/**
 * Measure memory usage (if available)
 */
export function measureMemory(): PerformanceMetrics['memory'] | undefined {
  if (typeof window === 'undefined' || !(window.performance as any).memory) {
    return undefined;
  }

  const memory = (window.performance as any).memory;
  return {
    used: memory.usedJSHeapSize,
    limit: memory.jsHeapSizeLimit,
  };
}

/**
 * Collect all performance metrics
 */
export function collectMetrics(): PerformanceMetrics {
  const vitals = getWebVitals();

  return {
    timestamp: Date.now(),
    navigation: measureNavigation(),
    vitals,
    resources: measureResources(),
    memory: measureMemory(),
  };
}

/**
 * Get Web Vitals (CLS, LCP, INP, FCP)
 */
function getWebVitals(): WebVitals {
  const vitals: WebVitals = {};

  if (typeof window === 'undefined') return vitals;

  // Gather Web Vitals if available
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if ((entry as any).name === 'first-contentful-paint') {
        vitals.fcp = (entry as any).startTime;
      }
      if ((entry as any).entryType === 'largest-contentful-paint') {
        vitals.lcp = (entry as any).renderTime || (entry as any).loadTime;
      }
      if ((entry as any).entryType === 'first-input') {
        vitals.inp = (entry as any).processingDuration;
      }
      if ((entry as any).entryType === 'layout-shift') {
        vitals.cls = (vitals.cls || 0) + (entry as any).value;
      }
    }
  });

  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });

  return vitals;
}

/**
 * Store metrics for analysis
 */
export function storeMetrics(metrics: PerformanceMetrics): void {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem(METRICS_KEY);
  const list: PerformanceMetrics[] = stored ? JSON.parse(stored) : [];

  list.push(metrics);

  // Keep only last 50 measurements
  if (list.length > 50) {
    list.splice(0, list.length - 50);
  }

  localStorage.setItem(METRICS_KEY, JSON.stringify(list));
}

/**
 * Get average metrics over time
 */
export function getAverageMetrics(): Partial<PerformanceMetrics> {
  if (typeof window === 'undefined') return {};

  const stored = localStorage.getItem(METRICS_KEY);
  if (!stored) return {};

  const list: PerformanceMetrics[] = JSON.parse(stored);
  if (list.length === 0) return {};

  // Calculate averages
  const avg: any = {
    timestamp: Date.now(),
    navigation: { dns: 0, tcp: 0, ttfb: 0, domLoad: 0, pageLoad: 0 },
    vitals: {},
    resources: { totalCount: 0, totalSize: 0, jsSize: 0, cssSize: 0 },
  };

  list.forEach(m => {
    Object.keys(m.navigation).forEach(key => {
      avg.navigation[key] += m.navigation[key as keyof typeof m.navigation];
    });
    Object.keys(m.resources).forEach(key => {
      avg.resources[key] += m.resources[key as keyof typeof m.resources];
    });
  });

  Object.keys(avg.navigation).forEach(key => {
    avg.navigation[key] /= list.length;
  });
  Object.keys(avg.resources).forEach(key => {
    avg.resources[key] /= list.length;
  });

  return avg;
}

/**
 * Measure specific function execution time
 */
export function measureExecutionTime(fn: () => void, label: string): number {
  const start = performance.now();
  fn();
  const end = performance.now();
  const duration = end - start;
  console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
  return duration;
}

/**
 * Mark performance checkpoint
 */
export function markCheckpoint(name: string): void {
  if (typeof window !== 'undefined' && window.performance?.mark) {
    window.performance.mark(name);
  }
}

/**
 * Measure between checkpoints
 */
export function measureCheckpoint(name: string, startName: string, endName: string): number {
  if (typeof window === 'undefined' || !window.performance?.measure) return 0;

  try {
    window.performance.measure(name, startName, endName);
    const measure = window.performance.getEntriesByName(name)[0] as any;
    return measure?.duration || 0;
  } catch {
    return 0;
  }
}

/**
 * Get bundle size estimate
 */
export function estimateBundleSize(): { js: number; css: number; total: number } {
  const resources = measureResources();
  return {
    js: resources.jsSize,
    css: resources.cssSize,
    total: resources.totalSize,
  };
}

/**
 * Clear stored metrics
 */
export function clearMetrics(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(METRICS_KEY);
}

/**
 * Export metrics for analysis
 */
export function exportMetrics() {
  const stored = localStorage.getItem(METRICS_KEY);
  return {
    metrics: stored ? JSON.parse(stored) : [],
    average: getAverageMetrics(),
    current: collectMetrics(),
    exportTime: new Date().toISOString(),
  };
}
