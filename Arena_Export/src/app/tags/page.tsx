import Link from "next/link";
import { db } from "@/db";
import { siddhis, manuscripts } from "@/db/schema";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import PageHeader from "@/components/PageHeader";
import { OmGlyph } from "@/components/Symbols";

export const dynamic = "force-dynamic";

interface TagCount {
  tag: string;
  count: number;
  siddhis: { slug: string; name: string; category: string | null }[];
}

export default async function TagsPage() {
  await ensureArchiveSeeded();

  const [siddhiRows, manuscriptRows] = await Promise.all([
    db.select().from(siddhis),
    db.select().from(manuscripts),
  ]);

  // Extract tags from category, tradition, and any tag-like fields
  // For siddhis: use category + tradition as the primary facets
  const tagMap = new Map<string, TagCount>();

  function addTag(tag: string, siddhi: { slug: string; name: string; category: string | null }) {
    const normalized = tag.trim();
    if (!normalized) return;
    const existing = tagMap.get(normalized) ?? { tag: normalized, count: 0, siddhis: [] };
    existing.count += 1;
    if (!existing.siddhis.find((s) => s.slug === siddhi.slug)) {
      existing.siddhis.push({ slug: siddhi.slug, name: siddhi.name, category: siddhi.category });
    }
    tagMap.set(normalized, existing);
  }

  for (const s of siddhiRows) {
    if (s.category) addTag(s.category, s);
    if (s.tradition) addTag(s.tradition, s);
  }

  // Group tags into facets
  const allTags = Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
  const categories = allTags.filter((t) =>
    ["Mantra", "Yantra", "Tantra", "Meditation", "Prāṇāyāma", "Dhāraṇā", "Ritual", "Yoga"].includes(t.tag)
  );
  const traditions = allTags.filter((t) => !categories.includes(t));

  return (
    <div>
      <section className="border-b border-[var(--hairline)] bg-[var(--color-ink)]/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-8">
          <div className="mb-6 text-[var(--color-gold)]/70">
            <OmGlyph style={{ fontSize: "2rem" }} />
          </div>
          <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
            Cross-Cutting Facets
          </span>
          <h1 className="mt-3 font-display text-[2rem] font-medium leading-tight text-balance text-[var(--color-ivory)] sm:text-4xl lg:text-5xl">
            Browse by Tag
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-bone)]/75 sm:text-base">
            The archive cuts across categories and traditions. Every siddhi belongs to a category (Mantra, Yantra, Tantra, etc.) and a tradition (Vedic, Śākta, Śaiva, etc.). Browse by either facet.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        {/* Categories facet */}
        <div className="mb-16">
          <h2 className="mb-6 font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">
            By Category
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((t) => (
              <TagCard key={t.tag} tag={t} />
            ))}
          </div>
        </div>

        {/* Traditions facet */}
        <div>
          <h2 className="mb-6 font-display text-xl text-[var(--color-gold-bright)] sm:text-2xl">
            By Tradition
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {traditions.map((t) => (
              <TagCard key={t.tag} tag={t} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TagCard({ tag }: { tag: TagCount }) {
  return (
    <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition motion-safe motion-reduce:transition-none">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg text-[var(--color-ivory)]">{tag.tag}</h3>
        <span className="badge badge-gold">{tag.count}</span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {tag.siddhis.slice(0, 6).map((s) => (
          <li key={s.slug}>
            <Link
              href={`/siddhi/${s.slug}`}
              className="block truncate text-sm text-[var(--color-bone)]/70 transition motion-safe hover:text-[var(--color-gold-bright)]"
            >
              → {s.name}
            </Link>
          </li>
        ))}
        {tag.siddhis.length > 6 && (
          <li className="text-[0.6rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
            + {tag.siddhis.length - 6} more
          </li>
        )}
      </ul>
    </div>
  );
}
