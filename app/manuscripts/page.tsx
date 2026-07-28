import { getDb, isDatabaseAvailable } from "@/db";
import { manuscripts } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import PageHeader from "@/components/PageHeader";
import CodexExplorer from "@/components/CodexExplorer";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ManuscriptsPage() {
  if (!isDatabaseAvailable()) {
    return (
      <div className="pb-24">
        <PageHeader
          eyebrow="Hall II · The Codex Library"
          title="Primary Source Manuscripts"
          subtitle="Database configuration required"
        />
        <div className="mx-auto mt-12 max-w-4xl px-6 sm:px-8">
          <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Database Not Connected</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The manuscript catalog requires a database connection to display primary sources. 
              Please deploy this application with DATABASE_URL configured.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  try {
    const db = getDb();
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
  } catch (error) {
    return (
      <div className="pb-24">
        <PageHeader
          eyebrow="Hall II · The Codex Library"
          title="Primary Source Manuscripts"
          subtitle="Catalog temporarily unavailable"
        />
        <div className="mx-auto mt-12 max-w-4xl px-6 sm:px-8">
          <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Catalog Error</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The manuscript catalog is temporarily unavailable. Please try again later.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Return to home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
