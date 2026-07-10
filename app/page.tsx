"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useVaultData, type JournalEntry, type CycleEntry } from "@/components/useVaultData";
import { DEITY_ROTATION, getCurrentSeason, getDailyQuote, QUOTES } from "@/lib/practice-data";
import { OmGlyph, SriYantraGlyph, FlourishDivider, BinduSun, LotusGlyph } from "@/components/Symbols";

// Lunar tithi computation (same as calendar page)
function computeTithi(date: Date) {
  const refNewMoon = new Date("2000-01-06T18:14:00Z").getTime();
  const lunarCycle = 29.530588853 * 24 * 60 * 60 * 1000;
  const elapsed = date.getTime() - refNewMoon;
  const cyclePos = ((elapsed % lunarCycle) + lunarCycle) % lunarCycle;
  const tithiNumber = Math.floor((cyclePos / lunarCycle) * 30) + 1;
  const paksha: "śukla" | "kṛṣṇa" = tithiNumber <= 15 ? "śukla" : "kṛṣṇa";
  const isAmavasya = tithiNumber === 30;
  const isPurnima = tithiNumber === 15;
  const tithiInPaksha = tithiNumber <= 15 ? tithiNumber : tithiNumber - 15;
  const display = isAmavasya ? "Amāvasyā" : isPurnima ? "Pūrṇimā" : `${paksha === "śukla" ? "Śukla" : "Kṛṣṇa"} ${tithiInPaksha}`;
  let note = "";
  if (isAmavasya) note = "Kālī · ancestor offerings";
  else if (isPurnima) note = "Śrī Vidyā · satvik practices";
  else if (paksha === "kṛṣṇa" && tithiInPaksha === 8) note = "Dhūmāvatī · protective";
  else if (paksha === "kṛṣṇa" && tithiInPaksha === 14) note = "Preta-Siddhi timing";
  else if (paksha === "śukla" && tithiInPaksha === 7) note = "Healing · Mahāmṛtyuñjaya";
  else if (paksha === "śukla" && tithiInPaksha === 11) note = "Ekādaśī · fasting";
  else note = paksha === "śukla" ? "Waxing — building practices" : "Waning — introspective";
  return { display, note, tithiNumber, paksha, isAmavasya, isPurnima };
}

export default function DashboardPage() {
  const { data: entries } = useVaultData<JournalEntry[]>("journal", []);
  const { data: cycles } = useVaultData<CycleEntry[]>("cycles", []);
  const { data: sankalpas } = useVaultData<{id:string;text:string;pinned:boolean}[]>("sankalpas", []);

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  const today = now?.toISOString().slice(0, 10) ?? "";
  const weekday = now?.getDay() ?? 0;
  const deity = DEITY_ROTATION[weekday];
  const tithi = useMemo(() => (now ? computeTithi(now) : { display: "", note: "", tithiNumber: 0, paksha: "śukla" as const, isAmavasya: false, isPurnima: false }), [now]);
  const season = getCurrentSeason();
  const quote = getDailyQuote();

  // Streak
  const dates = new Set(entries.map((e) => e.date));
  let streak = 0;
  let cursor = new Date(now);
  cursor.setHours(0, 0, 0, 0);
  if (!dates.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Active cycle
  const activeCycle = cycles.find((c) => c.status === "active");
  const cycleCheckIns = activeCycle ? Object.values(activeCycle.checkIns).filter(Boolean).length : 0;
  const cycleNeedsCheckIn = activeCycle && !activeCycle.checkIns[today];

  // Pinned sankalpa
  const pinnedSankalpa = sankalpas.find((s) => s.pinned);

  // Quick actions
  const quickActions = [
    { href: "/ritual", label: "Ritual", icon: "🪔" },
    { href: "/japa", label: "Japa", icon: "📿" },
    { href: "/breath", label: "Breath", icon: "🌬️" },
    { href: "/timer", label: "Meditate", icon: "⏱️" },
    { href: "/journal", label: "Journal", icon: "📓" },
    { href: "/ambience", label: "Ambience", icon: "🎵" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero — with motion background image */}
      <section className="relative overflow-hidden border-b border-[var(--color-hairline)] py-12 sm:py-16">
        {/* Motion background image */}
        <div className="absolute inset-0 opacity-50">
          <img
            src="/hero/motion-waves.png"
            alt="Sacred energy flows"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
        
        {/* Overlay gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10, 9, 8, 0.4), rgba(10, 9, 8, 0.2), rgba(10, 9, 8, 0.6))",
          }}
          aria-hidden="true"
        />

        <div className="content-z relative mx-auto max-w-4xl px-4 text-center sm:px-8">
          <div className="mb-4 flex justify-center opacity-90">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[var(--color-gold-bright)] to-[var(--color-gold)] opacity-30" />
          </div>
          <p className="fade-up text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
            {now ? now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "Loading..."}
          </p>
          <h1 className="fade-up mt-3 font-display text-[1.75rem] font-medium leading-tight text-balance text-[var(--color-ivory)] sm:text-4xl">
            Your Practice Dashboard
          </h1>
        </div>
      </section>

      {/* Dashboard grid */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Today's Tithi */}
        <Link href="/calendar" className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40">
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Lunar Tithi</p>
            <p className="mt-2 font-display text-xl text-[var(--color-gold-bright)]">{tithi.display}</p>
            <p className="mt-1 text-xs text-[var(--color-bone)]/60">{tithi.note}</p>
          </Link>

          {/* Deity of the day */}
          <Link href="/deity" className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40" style={{ borderColor: deity.color + "30" }}>
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Today's Deity</p>
            <p className="mt-2 font-display text-xl" style={{ color: deity.color }}>{deity.name}</p>
            <p className="mt-0.5 font-display text-xs text-[var(--color-gold)]/60">{deity.sanskrit}</p>
          </Link>

          {/* Streak */}
          <Link href="/journal" className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40">
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Practice Streak</p>
            <p className="mt-2 font-display text-3xl text-[var(--color-gold-bright)]">{streak} <span className="text-sm text-[var(--color-bone)]/50">days</span></p>
            <p className="mt-1 text-xs text-[var(--color-bone)]/60">{streak === 0 ? "Begin today →" : streak >= 41 ? "✦ 41-day milestone!" : `${41 - streak} days to 41-day milestone`}</p>
          </Link>

          {/* Active cycle */}
          {activeCycle ? (
            <Link href="/cycles" className="group rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/5 p-5 transition hover:border-[var(--color-gold)]/50">
              <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Active Cycle</p>
              <p className="mt-2 font-display text-lg text-[var(--color-gold-bright)]">{activeCycle.siddhiName}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--color-obsidian)]">
                <div className="h-full bg-gradient-to-r from-[var(--color-gold-deep)] to-[var(--color-gold-bright)]" style={{ width: `${(cycleCheckIns / activeCycle.targetDays) * 100}%` }} />
              </div>
              <p className="mt-1 text-xs text-[var(--color-bone)]/60">{cycleCheckIns}/{activeCycle.targetDays} days{cycleNeedsCheckIn ? " · ⚠ check in today" : " · ✓ checked in"}</p>
            </Link>
          ) : (
            <Link href="/cycles" className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40">
              <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Active Cycle</p>
              <p className="mt-2 text-sm text-[var(--color-bone)]/55">No active cycle. Start one →</p>
            </Link>
          )}

          {/* Pinned saṅkalpa */}
          {pinnedSankalpa ? (
            <Link href="/sankalpa" className="group rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40">
              <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Saṅkalpa</p>
              <p className="mt-2 text-sm italic leading-relaxed text-[var(--color-bone)]/75">{pinnedSankalpa.text}</p>
            </Link>
          ) : (
            <Link href="/sankalpa" className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40">
              <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Saṅkalpa</p>
              <p className="mt-2 text-sm text-[var(--color-bone)]/55">Set your intention →</p>
            </Link>
          )}

          {/* Daily quote */}
          <Link href="/quotes" className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40">
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Today's Quote</p>
            <p className="mt-2 text-xs italic leading-relaxed text-[var(--color-bone)]/75">"{quote.text}"</p>
            <p className="mt-1 text-[0.5rem] text-[var(--color-gold-bright)]">— {quote.source}</p>
          </Link>

          {/* Seasonal */}
          <Link href="/seasonal" className="group rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40">
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Season</p>
            <p className="mt-2 font-display text-lg text-[var(--color-gold-bright)]">{season.name.split(" ")[0]}</p>
            <p className="mt-1 text-xs text-[var(--color-bone)]/60">{season.element} predominant</p>
          </Link>

          {/* Crisis SOS */}
          <Link href="/crisis" className="group rounded-sm border border-[var(--color-rose-accent)]/20 bg-[var(--color-rose-accent)]/5 p-5 transition hover:border-[var(--color-rose-accent)]/40">
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/80">Emergency</p>
            <p className="mt-2 font-display text-lg text-[var(--color-rose-accent)]">Crisis Grounding</p>
            <p className="mt-1 text-xs text-[var(--color-bone)]/55">Instant 7-step protocol →</p>
          </Link>

          {/* Practice today count */}
          <Link href="/insights" className="group rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-5 transition hover:border-[var(--color-gold)]/40">
            <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Today</p>
            <p className="mt-2 font-display text-3xl text-[var(--color-gold-bright)]">{entries.filter((e) => e.date === today).length}</p>
            <p className="mt-1 text-xs text-[var(--color-bone)]/60">session{entries.filter((e) => e.date === today).length !== 1 ? "s" : ""} logged</p>
          </Link>
        </div>

        <FlourishDivider className="my-8" />

        {/* Quick actions */}
        <div className="mb-3 text-center">
          <h2 className="font-display text-lg text-[var(--color-gold-bright)]">Quick Practice</h2>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group flex flex-col items-center gap-1 rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-4 transition hover:border-[var(--color-gold)]/40 hover:bg-[var(--color-ink)]/70"
            >
              <span className="text-2xl transition group-hover:scale-110">{action.icon}</span>
              <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/60 transition group-hover:text-[var(--color-gold-bright)]">{action.label}</span>
            </Link>
          ))}
        </div>

        {/* Entry to the archive */}
        <div className="mt-10 text-center">
          <Link href="/archive" className="btn-gold text-xs sm:text-sm">
            Enter The Full Archive →
          </Link>
        </div>
      </section>
    </div>
  );
}
