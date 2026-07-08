import { db } from "@/db";
import { manuscripts } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import PageHeader from "@/components/PageHeader";
import CodexExplorer from "@/components/CodexExplorer";

export const dynamic = "force-dynamic";

export default async function ManuscriptsPage() {
  await ensureArchiveSeeded();
  const items = await db
    .select()
    .from(manuscripts)
    .orderBy(asc(manuscripts.catalogNumber));

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Hall II · The Codex Library"
        title="Primary Source Manuscripts"
        subtitle="The Archive holds its texts as a museum holds its objects — catalogued, attributed, and rated for condition. Provenance precedes interpretation."
      />
      <div className="mx-auto mt-12 max-w-4xl px-6 sm:px-8">
        <CodexExplorer items={items} />
      </div>
    </div>
  );
}
