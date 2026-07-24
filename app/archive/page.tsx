import { getDb } from "@/db";
import { siddhis } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import PageHeader from "@/components/PageHeader";
import ArchiveBrowser from "@/components/ArchiveBrowser";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const db = getDb();
  await ensureArchiveSeeded();
  const items = await db.select().from(siddhis).orderBy(asc(siddhis.name));

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Hall I · The Great Archive"
        title="The Catalogued Siddhis"
        subtitle="Each folio separates the testimony of its source texts from later interpretation. Confidence is the Archive's editorial assessment, not a verdict on efficacy."
      />
      <div className="mx-auto mt-12 max-w-7xl px-6 sm:px-8">
        <ArchiveBrowser items={items} />
      </div>
    </div>
  );
}
