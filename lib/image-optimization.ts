/**
 * Image Optimization Utilities
 * ============================
 * Lazy loading, responsive images, format detection, and caching strategies.
 */

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export interface OptimizedImage {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'sync' | 'auto';
}

/**
 * Generate responsive image srcset
 */
export function generateSrcSet(
  basePath: string,
  widths: number[] = [320, 640, 1280, 1920]
): string {
  return widths
    .map(w => `${basePath}?w=${w} ${w}w`)
    .join(', ');
}

/**
 * Generate sizes string for responsive images
 */
export function generateSizes(
  mobile: string = '100vw',
  tablet: string = '50vw',
  desktop: string = '33vw'
): string {
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
}

/**
 * Optimize image config
 */
export function optimizeImage(config: ImageConfig): OptimizedImage {
  const widths = config.width ? [config.width / 2, config.width, config.width * 2] : [320, 640, 1280];
  
  return {
    src: config.src,
    srcSet: generateSrcSet(config.src, widths),
    sizes: config.sizes || generateSizes(),
    alt: config.alt,
    loading: config.priority ? 'eager' : 'lazy',
    decoding: config.priority ? 'sync' : 'async',
  };
}

/**
 * Detect image format support
 */
export function supportedFormats(): {
  webp: boolean;
  avif: boolean;
} {
  if (typeof window === 'undefined') {
    return { webp: false, avif: false };
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  const webp =
    canvas.toDataURL('image/webp').indexOf('image/webp') === 5;

  // AVIF detection
  const avif = (canvas.toDataURL('image/avif').indexOf('image/avif') === 5) || false;

  return { webp, avif };
}

/**
 * Generate picture element markup
 */
export function generatePictureMarkup(
  basePath: string,
  alt: string,
  formats: ('avif' | 'webp' | 'jpg')[] = ['avif', 'webp', 'jpg']
): string {
  const sources = formats
    .map(format => {
      const ext = format === 'jpg' ? 'jpg' : format;
      return `<source type="image/${format}" srcset="${generateSrcSet(`${basePath}`, [320, 640, 1280])}" sizes="${generateSizes()}">`;
    })
    .join('\n  ');

  return `<picture>\n  ${sources}\n  <img src="${basePath}.jpg" alt="${alt}" loading="lazy" decoding="async" />\n</picture>`;
}

/**
 * Cache buster (for updates)
 */
export function addCacheBuster(src: string, version?: string): string {
  const bust = version || Math.floor(Date.now() / (1000 * 60 * 60)); // Hourly
  return `${src}?v=${bust}`;
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): void {
  if (typeof window === 'undefined' || !document.head) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Prefetch images (non-critical)
 */
export function prefetchImage(src: string): void {
  if (typeof window === 'undefined' || !document.head) return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = src;
  document.head.appendChild(link);
}

/**
 * Image lazy loading with intersection observer
 */
export function setupLazyLoading(): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll('img[data-lazy]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.lazy || '';
        img.removeAttribute('data-lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => observer.observe(img));
}

/**
 * Responsive image helper component config
 */
export function createResponsiveImageProps(
  src: string,
  alt: string,
  priority = false
) {
  return {
    src,
    alt,
    srcSet: generateSrcSet(src, [320, 640, 1280, 1920]),
    sizes: generateSizes(),
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    decoding: (priority ? 'sync' : 'async') as 'async' | 'sync' | 'auto',
  };
}

/**
 * Image size presets for common use cases
 */
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
  fullscreen: { width: 2560, height: 1440 },
};

/**
 * Get optimal image size for device
 */
export function getOptimalImageSize(baseSize: 'small' | 'medium' | 'large' | 'hero'): number {
  if (typeof window === 'undefined') return 1280;

  const width = window.innerWidth;
  
  if (width < 640) return 320;
  if (width < 1024) return 640;
  if (width < 1536) return 1280;
  return 1920;
}

/**
 * Estimate image loading time
 */
export function estimateLoadTime(
  sizeBytes: number,
  connectionMbps: number = 10
): number {
  const megabytes = sizeBytes / (1024 * 1024);
  const seconds = (megabytes / connectionMbps) * 8;
  return Math.round(seconds * 1000); // Return ms
}
