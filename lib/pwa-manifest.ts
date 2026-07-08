import type { MetadataRoute, Viewport } from "next";

/**
 * PWA manifest — AstroKalki as an installable web app.
 *
 * Allows visitors to "Add to Home Screen" on mobile / "Install" on desktop.
 * Combined with the service worker (public/sw.js), this enables offline
 * reading of the entire siddhi corpus.
 */
export const manifest: MetadataRoute.Manifest = {
  name: "AstroKalki · The Living Archive",
  short_name: "AstroKalki",
  description:
    "A museum-quality archive of contemplative heritage — siddhis, manuscripts, cosmology and lineage, presented with scholarly restraint.",
  start_url: "/",
  display: "standalone",
  background_color: "#0a0908",
  theme_color: "#c9985e",
  orientation: "portrait-primary",
  categories: ["education", "books", "lifestyle"],
  lang: "en",
  dir: "ltr",
  icons: [
    {
      src: "/icon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any",
    },
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "maskable",
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
  shortcuts: [
    {
      name: "Browse Archive",
      short_name: "Archive",
      url: "/archive",
    },
    {
      name: "Yantra Gallery",
      short_name: "Yantras",
      url: "/yantras",
    },
    {
      name: "Sanskrit Reader",
      short_name: "Reader",
      url: "/reader",
    },
    {
      name: "Glossary",
      short_name: "Glossary",
      url: "/glossary",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#c9985e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
