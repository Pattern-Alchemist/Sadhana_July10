import { db } from "@/db";
import { siddhis, evidenceSources } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import SiddhiFolio from "@/components/SiddhiFolio";
import { SiddhiJsonLd } from "@/components/SiddhiJsonLd";
import ViewTracker from "@/components/ViewTracker";

export const dynamic = "force-dynamic";

export default async function SiddhiPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await ensureArchiveSeeded();
  const { slug } = await params;

  const [row] = await db
    .select()
    .from(siddhis)
    .where(eq(siddhis.slug, slug))
    .limit(1);

  if (!row) notFound();

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
