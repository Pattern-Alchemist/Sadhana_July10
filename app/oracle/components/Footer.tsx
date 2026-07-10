export default function Footer() {
  return (
    <footer className="relative border-t border-gold-700/25 px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold-600/50 bg-gradient-to-br from-gold-500/15 to-transparent">
          <svg viewBox="0 0 48 48" className="h-6 w-6 text-gold-300">
            <circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
            <path d="M29 12a13 13 0 1 0 7 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M29 12l4-3-2 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-2xl font-semibold text-gold-gradient">The Karma Oracle</p>
        <p className="mx-auto mt-3 max-w-xl font-serif text-lg italic leading-relaxed text-mist">
          “What you send out returns, multiplied. Walk gently, choose consciously, and let every
          ending become a kinder beginning.”
        </p>

        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 text-[0.6rem] uppercase tracking-[0.3em] text-mist/60">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-700/40" />
          <span>77 Cards · 6 Realms · Cause &amp; Effect</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-700/40" />
        </div>

        <p className="mt-6 text-xs text-mist/50">
          A conceptual oracle deck · crafted for reflection, healing &amp; karmic insight
        </p>
      </div>
    </footer>
  );
}
