import { getDb, isDatabaseAvailable } from "@/db";
import { siddhis } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import PageHeader from "@/components/PageHeader";
import ArchiveBrowser from "@/components/ArchiveBrowser";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  if (!isDatabaseAvailable()) {
    return (
      <div className="pb-24">
        <PageHeader
          eyebrow="Hall I · The Great Archive"
          title="The Catalogued Siddhis"
          subtitle="Database configuration required"
        />
        <div className="mx-auto mt-12 max-w-7xl px-6 sm:px-8">
          <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Database Not Connected</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The archive requires a database connection to display the complete catalog of siddhis. 
              Please deploy this application with DATABASE_URL configured to access the full archive.
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
  } catch (error) {
    return (
      <div className="pb-24">
        <PageHeader
          eyebrow="Hall I · The Great Archive"
          title="The Catalogued Siddhis"
          subtitle="Archive temporarily unavailable"
        />
        <div className="mx-auto mt-12 max-w-7xl px-6 sm:px-8">
          <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Archive Error</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The archive is temporarily unavailable. Please try again later or check the deployment configuration.
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
