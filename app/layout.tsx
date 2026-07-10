import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Crimson_Text } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import AmbientBackground from "@/components/hero/AmbientBackground";

import RitualMotionConfig from "@/motion/RitualMotionConfig";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import { db } from "@/db";
import { siddhis } from "@/db/schema";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#c9985e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AstroKalki · The Living Archive",
  description:
    "A museum-quality archive of contemplative heritage — siddhis, manuscripts, cosmology and lineage, presented with scholarly restraint and a dual epistemological lens.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Self-heal: guarantee schema + seed corpus on every cold start.
  // Gracefully handle the case where the database is not available (e.g.,
  // during static generation at build time without DATABASE_URL set).
  let slugs: string[] = [];
  try {
    if (db) {
      await ensureArchiveSeeded();
      const allSiddhis = await db.select({ slug: siddhis.slug }).from(siddhis);
      slugs = allSiddhis.map((s) => s.slug).filter(Boolean) as string[];
    }
  } catch {
    // Database unavailable — the random button will be disabled
  }

  return (
    <html lang="en" className={`${cormorant.variable} ${crimson.variable}`} data-lens="scholar">
      <body className="min-h-screen font-body antialiased">
        <RitualMotionConfig>
          <AmbientBackground />
          <ServiceWorkerRegister />
          <SiteNav siddhiSlugs={slugs} />
          <main className="content-z relative">{children}</main>
          <Footer />
        </RitualMotionConfig>
      </body>
    </html>
  );
}
