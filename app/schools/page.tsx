import { getDb } from "@/db";
import { schools } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const dynamic = "force-dynamic";

const GLYPHS = ["ॐ", "✶", "☥", "☾", "♃", "✦", "◆"];

export default async function SchoolsPage() {
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
}
