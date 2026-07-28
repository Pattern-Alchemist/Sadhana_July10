import { getDb, isDatabaseAvailable } from "@/db";
import { schools } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const dynamic = "force-dynamic";

const GLYPHS = ["ॐ", "✶", "☥", "☾", "♃", "✦", "◆"];

export default async function SchoolsPage() {
  if (!isDatabaseAvailable()) {
    return (
      <div className="pb-24">
        <PageHeader
          eyebrow="Hall III · The University"
          title="Seven Schools of Mastery"
          subtitle="Database configuration required"
        />
        <div className="mx-auto mt-12 max-w-7xl px-6 sm:px-8">
          <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Database Not Connected</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The schools require a database connection to display the curriculum. 
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
    const items = await db.select().from(schools).orderBy(asc(schools.orderIndex));

    return (
      <div className="pb-24">
        <PageHeader
          eyebrow="Hall III · The University"
          title="Seven Schools of Mastery"
          subtitle="The curriculum is arranged not by belief but by domain of inquiry — each school a distinct lens upon a single body of contemplative heritage."
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3 sm:px-8">
          {items.map((s, i) => (
            <div
              key={s.slug}
              className="folio-card group relative flex flex-col rounded-sm p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl text-[var(--color-gold)]/50 transition group-hover:text-[var(--color-gold-bright)]">
                  {GLYPHS[i % GLYPHS.length]}
                </span>
                <span className="font-display text-sm text-[var(--color-bone)]/40">
                  {String(s.orderIndex).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-[var(--color-ivory)]">
                {s.name}
              </h3>
              <p className="mt-1 text-[0.62rem] uppercase tracking-luxe text-[var(--color-gold)]">
                {s.focus}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-bone)]/75">
                {s.description}
              </p>
              <Link
                href="/archive"
                className="mt-5 text-xs tracking-wide-sm text-[var(--color-cyan-accent)] hover:text-[var(--color-gold-bright)]"
              >
                Explore related folios →
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="pb-24">
        <PageHeader
          eyebrow="Hall III · The University"
          title="Seven Schools of Mastery"
          subtitle="Schools temporarily unavailable"
        />
        <div className="mx-auto mt-12 max-w-7xl px-6 sm:px-8">
          <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">Schools Error</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The schools are temporarily unavailable. Please try again later.
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
