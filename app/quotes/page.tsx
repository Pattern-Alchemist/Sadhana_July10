import { QUOTES, getDailyQuote } from "@/lib/practice-data";
import { OmGlyph, FlourishDivider } from "@/components/Symbols";
import Link from "next/link";

export default function QuotesPage() {
  const daily = getDailyQuote();
  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Sacred-Text Quotes</h1>
      </header>
      <div className="mb-8 rounded-sm border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/5 p-6 text-center">
        <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Today's Quote</p>
        <blockquote className="mt-4 font-display text-lg italic leading-relaxed text-[var(--color-ivory)] sm:text-xl">"{daily.text}"</blockquote>
        <p className="mt-3 text-xs text-[var(--color-gold-bright)]">— {daily.source}</p>
        <Link href={daily.url} className="mt-3 inline-block text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45 transition hover:text-[var(--color-gold-bright)]">View source →</Link>
      </div>
      <FlourishDivider className="mb-8" />
      <div className="space-y-4">
        {QUOTES.map((q, i) => (
          <div key={i} className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-4">
            <blockquote className="text-sm italic leading-relaxed text-[var(--color-bone)]/80">"{q.text}"</blockquote>
            <p className="mt-2 text-xs text-[var(--color-gold-bright)]">— {q.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
