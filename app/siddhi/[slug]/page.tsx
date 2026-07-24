import { getDb } from "@/db";
import { siddhis, evidenceSources } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import { absoluteUrl, truncateDescription } from "@/lib/seo";
import SiddhiFolio from "@/components/SiddhiFolio";
import { SiddhiJsonLd } from "@/components/SiddhiJsonLd";
import ViewTracker from "@/components/ViewTracker";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type SiddhiPageParams = {
  params: Promise<{ slug: string }>;
};

async function getSiddhiBySlug(slug: string) {
  const db = getDb();
  await ensureArchiveSeeded();
  const [row] = await db
    .select()
    .from(siddhis)
    .where(eq(siddhis.slug, slug))
    .limit(1);

  return row ?? null;
}

export async function generateMetadata({ params }: SiddhiPageParams): Promise<Metadata> {
  const { slug } = await params;
  const row = await getSiddhiBySlug(slug);

  if (!row) {
    return {
      title: "Siddhi folio not found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${row.name} · Siddhi Folio`;
  const description =
    truncateDescription(row.summary ?? row.description) ||
    "A catalogued AstroKalki siddhi folio with source-aware notes, cautions, and lineage context.";
  const url = absoluteUrl(`/siddhi/${row.slug}`);
  const imageUrl = absoluteUrl(`/siddhi/${row.slug}/opengraph-image`);
  const imageAlt = `${row.name} — AstroKalki siddhi folio`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      siteName: "AstroKalki",
      title: `${row.name} · AstroKalki`,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${row.name} · AstroKalki`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SiddhiPage({ params }: SiddhiPageParams) {
  const { slug } = await params;
  const row = await getSiddhiBySlug(slug);

  if (!row) notFound();

  const db = getDb();
  const evidence = await db
    .select()
    .from(evidenceSources)
    .where(eq(evidenceSources.siddhiSlug, slug));

  // Increment view count, fire-and-forget.
  db.update(siddhis)
    .set({ viewCount: sql`${siddhis.viewCount} + 1` })
    .where(eq(siddhis.slug, slug))
    .then(() => {}, () => {});

  return (
    <>
      <SiddhiJsonLd siddhi={row} evidence={evidence} />
      <ViewTracker slug={slug} />
      <SiddhiFolio siddhi={row} evidence={evidence} />
    </>
  );
}
