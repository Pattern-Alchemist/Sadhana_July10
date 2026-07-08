import { db } from "@/db";
import { reflections, siddhis } from "@/db/schema";
import { desc, asc } from "drizzle-orm";
import { ensureArchiveSeeded } from "@/lib/bootstrap";
import PageHeader from "@/components/PageHeader";
import ReflectionComposer from "@/components/ReflectionComposer";
import ReadinessValidator from "@/components/ReadinessValidator";

export const dynamic = "force-dynamic";

const TONE_COLOR: Record<string, string> = {
  Curiosity: "var(--color-cyan-accent)",
  Reverence: "var(--color-gold-bright)",
  Commitment: "var(--color-purple-accent)",
  Accomplishment: "var(--color-sage)",
  "Honest doubt": "var(--color-rose-accent)",
};

export default async function JourneyPage() {
  await ensureArchiveSeeded();

  const [entries, siddhiRows] = await Promise.all([
    db.select().from(reflections).orderBy(desc(reflections.createdAt)),
    db.select({ slug: siddhis.slug, name: siddhis.name }).from(siddhis).orderBy(asc(siddhis.name)),
  ]);

  const siddhiMap = new Map(siddhiRows.map((s) => [s.slug, s.name]));

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Hall VI · The Inner Chronicle"
        title="Your Narrative Timeline"
        subtitle="The Archive keeps no record of you but the one you inscribe. Honesty is the first discipline — record what you noticed, not what you wished to feel."
      />

      <div className="mx-auto mt-12 max-w-6xl px-6 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Validator */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <ReadinessValidator />
          </aside>

          {/* Timeline + composer */}
          <div className="space-y-10">
            <ReflectionComposer siddhiOptions={siddhiRows} />

            <section>
              <h2 className="mb-6 font-display text-2xl text-[var(--color-ivory)]">
                The Chronicle
              </h2>
              {entries.length === 0 ? (
                <p className="rounded-sm border border-dashed border-[var(--hairline)] p-10 text-center text-sm text-[var(--color-bone)]/50">
                  The chronicle is empty. Inscribe your first reflection above.
                </p>
              ) : (
                <ol className="relative space-y-6 border-l border-[var(--hairline)] pl-6">
                  {entries.map((r) => (
                    <li key={r.id} className="relative">
                      <span className="absolute -left-[31px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-[var(--color-gold)] bg-[var(--color-obsidian)] text-[0.5rem] text-[var(--color-gold)]">
                        ◆
                      </span>
                      <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/50 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-display text-xl text-[var(--color-gold-bright)]">
                            {r.title}
                          </h3>
                          {r.tone && (
                            <span
                              className="badge"
                              style={{
                                color: TONE_COLOR[r.tone] ?? "var(--color-bone)",
                                borderColor: TONE_COLOR[r.tone] ?? "var(--color-bone)",
                              }}
                            >
                              {r.tone}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--color-bone)]/85">
                          {r.body}
                        </p>
                        <div className="mt-3 flex items-center gap-3 text-[0.6rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
                          <span>— {r.penName}</span>
                          {r.siddhiSlug && siddhiMap.get(r.siddhiSlug) && (
                            <>
                              <span className="text-[var(--color-gold)]/40">·</span>
                              <span>{siddhiMap.get(r.siddhiSlug) as string}</span>
                            </>
                          )}
                          {r.createdAt && (
                            <>
                              <span className="text-[var(--color-gold)]/40">·</span>
                              <span>
                                {new Date(r.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
