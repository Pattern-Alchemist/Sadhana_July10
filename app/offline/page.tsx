import Link from "next/link";
import { OmGlyph } from "@/components/Symbols";
import ForcePrecache from "@/components/ForcePrecache";

export const dynamic = "force-static";

export const metadata = {
  title: "Offline · AstroKalki",
};

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 text-[var(--color-gold)]/60">
        <OmGlyph style={{ fontSize: "3rem" }} />
      </div>
      <h1 className="font-display text-3xl text-[var(--color-ivory)] sm:text-4xl">
        You are offline
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-bone)]/75 sm:text-base">
        The AstroKalki archive is not currently reachable. Any siddhi folios,
        yantras, or manuscripts you have previously visited remain available
        in your browser cache. Reconnect to access the full archive.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-gold text-xs sm:text-sm">
          Try Again
        </Link>
        <Link href="/archive" className="btn-ghost text-xs sm:text-sm">
          Cached Archive
        </Link>
      </div>
      <ForcePrecache />
      <p className="mt-12 text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
        The Living Archive · Offline Mode
      </p>
    </div>
  );
}
