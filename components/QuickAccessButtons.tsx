"use client";

import Link from "next/link";

export function QuickAccessButtons() {
  return (
    <>
      <style>{`
        @keyframes neon-blink {
          0%, 100% {
            box-shadow: 
              0 0 10px rgba(245, 241, 230, 0.4),
              0 0 20px rgba(245, 241, 230, 0.2),
              inset 0 0 10px rgba(245, 241, 230, 0.1);
            opacity: 1;
          }
          50% {
            box-shadow: 
              0 0 20px rgba(245, 241, 230, 0.7),
              0 0 40px rgba(245, 241, 230, 0.4),
              inset 0 0 15px rgba(245, 241, 230, 0.2);
            opacity: 0.95;
          }
        }

        @keyframes button-shadow-depth {
          0%, 100% {
            filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
          }
          50% {
            filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.6));
          }
        }

        .quick-access-btn {
          animation: neon-blink 2.5s ease-in-out infinite, button-shadow-depth 2.5s ease-in-out infinite;
        }

        .quick-access-btn:hover {
          animation: neon-blink 1.2s ease-in-out infinite, button-shadow-depth 1.2s ease-in-out infinite;
        }
      `}</style>

      <div className="flex gap-4 justify-center items-center">
        {/* Aghad Button */}
        <Link
          href="/aghad"
          className="quick-access-btn group relative px-8 py-3 rounded-sm border border-[var(--color-ivory)]/40 bg-gradient-to-br from-[var(--color-ink)]/60 to-[var(--color-charcoal)]/60 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-ivory)]/70 hover:from-[var(--color-charcoal)]/80 hover:to-[var(--color-stone)]/80"
        >
          <span className="relative z-10 font-display text-base font-medium text-[var(--color-ivory)] tracking-wide group-hover:text-white transition-colors">
            Aghad Mastery
          </span>
          <span className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Divider */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-[var(--color-ivory)]/30 to-transparent" />

        {/* Admin Button */}
        <Link
          href="/admin"
          className="quick-access-btn group relative px-8 py-3 rounded-sm border border-[var(--color-ivory)]/40 bg-gradient-to-br from-[var(--color-ink)]/60 to-[var(--color-charcoal)]/60 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-ivory)]/70 hover:from-[var(--color-charcoal)]/80 hover:to-[var(--color-stone)]/80"
        >
          <span className="relative z-10 font-display text-base font-medium text-[var(--color-ivory)] tracking-wide group-hover:text-white transition-colors">
            Admin Panel
          </span>
          <span className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </>
  );
}
