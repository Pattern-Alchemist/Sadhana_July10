"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEpistemicLens } from "./useEpistemicLens";
import { OmGlyph } from "./Symbols";
import RandomSiddhiButton from "./RandomSiddhiButton";

interface NavItem {
  href: string;
  label: string;
}
interface NavGroup {
  id: string;
  label: string;
  icon: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    id: "personal",
    label: "Personal",
    icon: "🔻",
    items: [
      { href: "/oracle", label: "🔮 Karma Oracle Deck" },
      { href: "/smashana", label: "🪦 Smashana Companion" },
    ],
  },
  {
    id: "reference",
    label: "Reference",
    icon: "📚",
    items: [
      { href: "/archive", label: "Siddhi Archive" },
      { href: "/yantras", label: "Yantra Gallery" },
      { href: "/yantra-3d", label: "3D Yantra Viewer" },
      { href: "/reader", label: "Sanskrit Reader" },
      { href: "/glossary", label: "Glossary" },
      { href: "/flashcards", label: "Flashcards" },
      { href: "/manuscripts", label: "Codex Library" },
      { href: "/tags", label: "Tags" },
      { href: "/lineage", label: "Lineage Tree" },
      { href: "/parampara", label: "My Paramparā" },
      { href: "/dependencies", label: "Dependencies" },
      { href: "/cosmos", label: "Living Cosmos" },
      { href: "/calendar", label: "Lunar Calendar" },
      { href: "/deity", label: "Deity of the Day" },
      { href: "/seasonal", label: "Seasonal Practice" },
      { href: "/quotes", label: "Daily Quote" },
      { href: "/schools", label: "Schools" },
      { href: "/comparative", label: "Comparative Matrix" },
      { href: "/archivist", label: "The Custodian" },
      { href: "/knowledge", label: "Knowledge Archive" },
    ],
  },
  {
    id: "practice",
    label: "Practice",
    icon: "🕉️",
    items: [
      { href: "/ritual", label: " Ritual Mode" },
      { href: "/sessions", label: "Session Builder" },
      { href: "/sankalpa", label: "Saṅkalpa" },
      { href: "/japa", label: "Japa Mālā" },
      { href: "/metronome", label: "Metronome" },
      { href: "/breath", label: "Breath Timer" },
      { href: "/timer", label: "Meditation Timer" },
      { href: "/ambience", label: "Ambience" },
      { href: "/recorder", label: "Mantra Recorder" },
      { href: "/mantra-vault", label: "Mantra Vault" },
      { href: "/calculator", label: "Count Calculator" },
      { href: "/curriculum", label: "Reading Path" },
      { href: "/breath-magic", label: "🔥 Breath Magic Lab" },
      { href: "/nyasa-visualizer", label: "✨ Nyasa Visualization" },
      { href: "/preta-work", label: "👻 Preta-Work Suite" },
      { href: "/yantra-builder", label: "🎨 Yantra Builder" },
      { href: "/chakra-scanner", label: "💎 Chakra Scanner" },
      { href: "/yantra-meditation", label: "🧘 Yantra Meditation" },
    ],
  },
  {
    id: "tracking",
    label: "Tracking",
    icon: "📊",
    items: [
      { href: "/sacred-timeline", label: "🌙 Sacred Timeline" },
      { href: "/journal", label: "Practice Journal" },
      { href: "/energetics", label: "Energetic Journal" },
      { href: "/dreams", label: "Dream Journal" },
      { href: "/wisdom", label: "Wisdom Board" },
      { href: "/cycles", label: "Cycle Tracker" },
      { href: "/fasting", label: "Fasting Tracker" },
      { href: "/materials", label: "Pūjā Materials" },
      { href: "/insights", label: "Insights" },
      { href: "/heatmap", label: "Year Heatmap" },
    ],
  },
  {
    id: "healing",
    label: "Healing",
    icon: "🙏",
    items: [
      { href: "/healing", label: "Healing Hub" },
      { href: "/protection", label: "Protection Checklist" },
      { href: "/purification", label: "Purification Countdown" },
      { href: "/crisis", label: "Crisis SOS" },
      { href: "/safety", label: "Safety Page" },
      { href: "/export", label: "Export Data" },
      { href: "/certificate", label: "Completion Certificate" },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: "⚙️",
    items: [
      { href: "/vault", label: "Vault Settings" },
      { href: "/journey", label: "Curated Journey" },
      { href: "/api/health", label: "Health Check" },
    ],
  },
];

export default function SiteNav({ siddhiSlugs = [] }: { siddhiSlugs?: string[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>("personal");
  const { lens, toggle, mounted } = useEpistemicLens();

  function isActive(href: string) {
    return pathname === href || pathname?.startsWith(href + "/");
  }

  function isGroupActive(group: NavGroup) {
    return group.items.some((item) => isActive(item.href));
  }

  return (
    <header className="sticky top-0 z-50 hairline-bottom bg-[var(--color-obsidian)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 xl:px-8">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--color-gold)]/50 text-[var(--color-gold-bright)] transition group-hover:border-[var(--color-gold)] sm:h-9 sm:w-9">
            <OmGlyph style={{ fontSize: "1.1rem", lineHeight: 1 }} />
          </span>
          <span className="leading-none">
            <span className="font-display text-base tracking-wide-sm text-gold-foil sm:text-lg">
              AstroKalki
            </span>
            <span className="hide-on-mobile block text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/60 sm:text-[0.58rem]">
              The Living Archive
            </span>
          </span>
        </Link>

        {/* Desktop nav — grouped dropdowns */}
        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_GROUPS.map((group) => (
            <div key={group.id} className="group relative">
              <button
                className={`flex items-center gap-1 px-2.5 py-2 font-display text-[0.9rem] tracking-wide-sm transition ${
                  isGroupActive(group) ? "text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/75 hover:text-[var(--color-ivory)]"
                }`}
              >
                <span className="text-xs">{group.icon}</span>
                {group.label}
              </button>
              {/* Dropdown */}
              <div className="invisible absolute left-0 top-full pt-1 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="grid min-w-[200px] gap-0.5 rounded-sm border border-[var(--hairline)] bg-[var(--color-obsidian)] p-2 shadow-lg">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-sm px-3 py-1.5 font-display text-sm transition motion-safe hover:bg-[var(--color-gold)]/10 ${
                        isActive(item.href) ? "text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/70"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <RandomSiddhiButton slugs={siddhiSlugs} />
          <button
            onClick={toggle}
            title="Toggle the epistemological lens"
            className="hidden items-center gap-2 border border-[var(--hairline)] px-2.5 py-1.5 font-display text-xs tracking-wide-sm text-[var(--color-bone)] transition hover:border-[var(--color-gold)]/60 sm:flex"
          >
            <span className={lens === "scholar" ? "text-[var(--color-cyan-accent)]" : "opacity-50"}>
              Scholar
            </span>
            <span className="text-[var(--color-gold)]">/</span>
            <span className={lens === "practitioner" ? "text-[var(--color-purple-accent)]" : "opacity-50"}>
              Practitioner
            </span>
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--hairline)] text-[var(--color-gold-bright)] xl:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer — categorized accordion */}
      {open && (
        <div className="border-t border-[var(--color-hairline)] bg-[var(--color-ink)] px-4 py-4 sm:px-6 xl:hidden">
          <nav className="space-y-1">
            {NAV_GROUPS.map((group) => {
              const expanded = expandedGroup === group.id;
              return (
                <div key={group.id}>
                  <button
                    onClick={() => setExpandedGroup(expanded ? null : group.id)}
                    className={`flex w-full items-center justify-between py-2.5 font-display text-base transition ${
                      isGroupActive(group) ? "text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/85"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{group.icon}</span>
                      {group.label}
                    </span>
                    <span className={`text-xs transition motion-safe ${expanded ? "rotate-90" : ""}`}>▶</span>
                  </button>
                  {expanded && (
                    <div className="ml-4 mb-2 space-y-0.5 border-l border-[var(--color-gold)]/15 pl-3">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`block py-2 text-sm transition ${
                            isActive(item.href) ? "text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/65"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <button
            onClick={() => { toggle(); }}
            className="mt-4 flex w-full items-center justify-center gap-2 border border-[var(--hairline)] px-3 py-2.5 font-display text-sm tracking-wide-sm text-[var(--color-bone)]"
          >
            Lens: {mounted ? lens : "scholar"}
          </button>
        </div>
      )}
    </header>
  );
}
