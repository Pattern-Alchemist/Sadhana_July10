import PageHeader from "@/components/PageHeader";
import { lineages } from "@/lib/lineage";
import InteractiveLineageTree from "@/components/InteractiveLineageTree";

export const dynamic = "force-dynamic";

export default function LineagePage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Hall VIII · The Genealogy"
        title="Transmission Maps"
        subtitle="How teachings are said to have descended from teacher to teacher and text to text. The Archive records these as the tradition's own account of itself — a map of memory, not a forensic history. Click any node to expand or collapse its lineage."
      />
      <div className="mx-auto mt-12 max-w-3xl space-y-14 px-4 sm:px-8">
        {lineages.map((tree) => (
          <section key={tree.key}>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-display text-3xl text-[var(--color-gold)]/40">
                ❖
              </span>
              <div>
                <h2 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">
                  {tree.title}
                </h2>
                <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/50 sm:text-[0.6rem]">
                  {tree.region}
                </p>
              </div>
            </div>
            <ul className="space-y-2 sm:space-y-3">
              <InteractiveLineageTree node={tree.root} defaultExpanded={true} />
            </ul>
          </section>
        ))}
        <p className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-4 text-center text-xs italic leading-relaxed text-[var(--color-bone)]/60 sm:p-5">
          Dates before c. 800 CE are largely traditional attributions; the Archive
          treats them as part of the lineage&apos;s self-understanding rather than as
          settled chronology.
        </p>
      </div>
    </div>
  );
}
