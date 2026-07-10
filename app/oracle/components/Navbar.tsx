import { useEffect, useState } from "react";

const LINKS = [
  { href: "#realms", label: "Realms" },
  { href: "#draw", label: "Sacred Draw" },
  { href: "#deck", label: "The Deck" },
  { href: "#guidebook", label: "Guidebook" },
  { href: "#vision", label: "Vision" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-gold-700/30 bg-void/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-600/50 bg-gradient-to-br from-gold-500/20 to-transparent">
            <svg viewBox="0 0 48 48" className="h-5 w-5 text-gold-300">
              <circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
              <path d="M29 12a13 13 0 1 0 7 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M29 12l4-3-2 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="leading-none">
            <p className="font-display text-sm font-semibold tracking-[0.3em] text-parchment">KARMA</p>
            <p className="text-[0.55rem] uppercase tracking-[0.4em] text-gold-500/80">Oracle</p>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-xs uppercase tracking-[0.22em] text-mist transition-colors hover:text-gold-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#draw"
            className="hidden rounded-full border border-gold-600/50 bg-gradient-to-br from-gold-500/20 to-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-100 transition-all hover:from-gold-500/40 hover:to-gold-400/20 sm:inline-block"
          >
            Draw a Card
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-700/40 text-gold-200 md:hidden"
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gold-700/20 bg-void/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.2em] text-mist hover:text-gold-200"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
