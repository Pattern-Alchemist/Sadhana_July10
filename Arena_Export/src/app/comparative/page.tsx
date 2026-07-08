import PageHeader from "@/components/PageHeader";
import { traditions, matrix } from "@/lib/comparative";

const ACCENT: Record<string, string> = {
  gold: "var(--color-gold-bright)",
  cyan: "var(--color-cyan-accent)",
  purple: "var(--color-purple-accent)",
  rose: "var(--color-rose-accent)",
  sage: "var(--color-sage)",
};

export const dynamic = "force-dynamic";

export default function ComparativePage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Hall VII · The Laboratory"
        title="The Comparative Matrix"
        subtitle="Five traditions read against a single set of concepts. Resemblance is not identity — the Archive notes convergences without collapsing one teaching into another."
      />

      <div className="mx-auto mt-12 max-w-7xl px-6 sm:px-8">
        {/* Legend */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          {traditions.map((t) => (
            <div key={t.key} className="flex items-center gap-2">
              <span className="font-display text-lg" style={{ color: ACCENT[t.accent] }}>
                {t.glyph.trim()}
              </span>
              <span className="text-xs tracking-wide-sm text-[var(--color-bone)]/70">
                {t.name}
              </span>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-sm border border-[var(--hairline)]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-[var(--color-ink)] px-4 py-4 align-bottom text-[0.58rem] uppercase tracking-luxe text-[var(--color-gold)]">
                  Concept
                </th>
                {traditions.map((t) => (
                  <th
                    key={t.key}
                    className="min-w-[180px] px-4 py-4 align-bottom"
                  >
                    <span className="block font-display text-lg" style={{ color: ACCENT[t.accent] }}>
                      {t.short}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.concept} className="border-t border-[var(--hairline)]">
                  <td className="sticky left-0 z-10 bg-[var(--color-charcoal)] px-4 py-4 align-top">
                    <span className="block font-display text-base text-[var(--color-ivory)]">
                      {row.concept}
                    </span>
                    <span className="mt-1 block max-w-[180px] text-xs leading-relaxed text-[var(--color-bone)]/55">
                      {row.gloss}
                    </span>
                  </td>
                  {traditions.map((t) => {
                    const cell = row.cells[t.key];
                    if (!cell) return <td key={t.key} className="px-4 py-4" />;
                    return (
                      <td key={t.key} className="border-l border-[var(--hairline)]/50 px-4 py-4 align-top">
                        <span
                          className="block font-display text-sm"
                          style={{ color: ACCENT[t.accent] }}
                        >
                          {cell.term}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-[var(--color-bone)]/70">
                          {cell.note}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-5 text-center text-xs italic leading-relaxed text-[var(--color-bone)]/60">
          The rightmost column (Contemporary Neuroscience) is offered as a
          present-day explanatory frame, not as a reduction of the others to it.
          Each tradition is heard in its own voice first.
        </p>
      </div>
    </div>
  );
}
