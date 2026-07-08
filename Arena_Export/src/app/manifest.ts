import type { MetadataRoute } from "next";

/**
 * PWA manifest route — /manifest.webmanifest
 *
 * Served by Next.js as /manifest.webmanifest. Combined with the service
 * worker (public/sw.js), this enables offline reading and "Add to Home
 * Screen" installation.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
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
    ],
    shortcuts: [
      { name: "Browse Archive", short_name: "Archive", url: "/archive" },
      { name: "Yantra Gallery", short_name: "Yantras", url: "/yantras" },
      { name: "Sanskrit Reader", short_name: "Reader", url: "/reader" },
      { name: "Glossary", short_name: "Glossary", url: "/glossary" },
    ],
  };
}
