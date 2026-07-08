"use client";

import { useState, useMemo } from "react";
import { OmGlyph } from "@/components/Symbols";

/**
 * Lunar Calendar — computes Vedic tithi, pakṣa, and key observations
 * for each day. Uses a simplified lunar-phase calculation.
 *
 * The tithi is the lunar day — 1/30 of the lunar cycle (~29.5 days).
 * There are 15 tithis in the śukla pakṣa (waxing) and 15 in the kṛṣṇa
 * pakṣa (waning). The 15th tithi of śukla is pūrṇimā (full moon); the
 * 15th (technically 30th) of kṛṣṇa is amāvasyā (new moon).
 *
 * Special tithis for practice:
 *   - Amāvasyā (new moon) → Kālī, fierce practices
 *   - Pūrṇimā (full moon) → Śrī Vidyā, Tripurasundarī
 *   - Kṛṣṇa Aṣṭamī (8th waning) → Dhūmāvatī contemplation
 *   - Kṛṣṇa Chaturdaśī (14th waning) → Preta-Siddhi timing
 *   - Śukla Saptamī → healing practices
 */

interface DayInfo {
  date: Date;
  tithiNumber: number;     // 1-30
  tithiName: string;
  paksha: "śukla" | "kṛṣṇa";
  isAmavasya: boolean;
  isPurnima: boolean;
  isSpecial: boolean;
  specialNote?: string;
  recommendedPractice?: string;
}

const TITHI_NAMES = [
  "Pratipadā", "Dvitīyā", "Tṛtīyā", "Caturthī", "Pañcamī",
  "Ṣaṣṭhī", "Saptamī", "Aṣṭamī", "Navamī", "Daśamī",
  "Ekādaśī", "Dvādaśī", "Trayodaśī", "Caturdaśī",
];

function computeTithi(date: Date): DayInfo {
  // Reference new moon: 2000-01-06 18:14 UTC (a known amāvasyā)
  const refNewMoon = new Date("2000-01-06T18:14:00Z").getTime();
  const lunarCycle = 29.530588853 * 24 * 60 * 60 * 1000; // synodic month in ms

  const elapsed = date.getTime() - refNewMoon;
  const cyclePos = ((elapsed % lunarCycle) + lunarCycle) % lunarCycle;
  const tithiFraction = cyclePos / lunarCycle; // 0.0 to 1.0
  const tithiIndex = Math.floor(tithiFraction * 30); // 0-29

  const tithiNumber = tithiIndex + 1; // 1-30
  const paksha: "śukla" | "kṛṣṇa" = tithiNumber <= 15 ? "śukla" : "kṛṣṇa";
  const tithiInPaksha = tithiNumber <= 15 ? tithiNumber : tithiNumber - 15;
  const tithiName = tithiInPaksha <= 14 ? TITHI_NAMES[tithiInPaksha - 1] : "";

  const isAmavasya = tithiNumber === 30;
  const isPurnima = tithiNumber === 15;

  let isSpecial = false;
  let specialNote: string | undefined;
  let recommendedPractice: string | undefined;

  if (isAmavasya) {
    isSpecial = true;
    specialNote = "Amāvasyā — New Moon";
    recommendedPractice = "Kālī sādhana, fierce Mahāvidyā practices, ancestor offerings (tarpaṇa)";
  } else if (isPurnima) {
    isSpecial = true;
    specialNote = "Pūrṇimā — Full Moon";
    recommendedPractice = "Śrī Vidyā, Tripurasundarī, Śrī Cakra worship, satvik practices";
  } else if (paksha === "kṛṣṇa" && tithiInPaksha === 8) {
    isSpecial = true;
    specialNote = "Kṛṣṇa Aṣṭamī";
    recommendedPractice = "Dhūmāvatī contemplation, protective practices";
  } else if (paksha === "kṛṣṇa" && tithiInPaksha === 14) {
    isSpecial = true;
    specialNote = "Kṛṣṇa Chaturdaśī — Nishitha Kāla eve";
    recommendedPractice = "Preta-Siddhi timing (11:45 PM – 1:15 AM), spirit-contact rites";
  } else if (paksha === "kṛṣṇa" && tithiInPaksha === 13) {
    isSpecial = true;
    specialNote = "Kṛṣṇa Trayodaśī";
    recommendedPractice = "Preparatory śuddhi for Chaturdaśī rites";
  } else if (paksha === "śukla" && tithiInPaksha === 7) {
    isSpecial = true;
    specialNote = "Śukla Saptamī";
    recommendedPractice = "Healing practices, Mahāmṛtyuñjaya japa";
  } else if (paksha === "śukla" && tithiInPaksha === 11) {
    isSpecial = true;
    specialNote = "Śukla Ekādaśī";
    recommendedPractice = "Fasting, Viṣṇu practices, deep meditation";
  }

  const tithiDisplayName = isAmavasya ? "Amāvasyā" :
    isPurnima ? "Pūrṇimā" :
    `${paksha === "śukla" ? "Śukla" : "Kṛṣṇa"} ${tithiName || (tithiInPaksha === 15 ? "Pūrṇimā" : tithiInPaksha)}`;

  return {
    date,
    tithiNumber,
    tithiName: tithiDisplayName,
    paksha,
    isAmavasya,
    isPurnima,
    isSpecial,
    specialNote,
    recommendedPractice,
  };
}

export default function CalendarPage() {
  const [monthOffset, setMonthOffset] = useState(0);

  const days = useMemo(() => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const baseMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = baseMonth.getFullYear();
    const month = baseMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const result: (DayInfo | null)[] = [];
    // Pad start to align with weekday
    const startWeekday = firstDay.getDay();
    for (let i = 0; i < startWeekday; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      result.push(computeTithi(new Date(year, month, d, 12, 0, 0)));
    }
    return result;
  }, [monthOffset]);

  const monthName = new Date(new Date().getFullYear(), new Date().getMonth() + monthOffset, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Vedic Lunar Calendar
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Tithi Calendar
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          The lunar day (tithi) determines the auspicious timing for specific practices. Tap a day for details.
        </p>
      </header>

      {/* Month navigation */}
      <div className="mb-6 flex items-center justify-between">
        <button onClick={() => setMonthOffset((o) => o - 1)} className="btn-ghost text-xs">← Prev</button>
        <h2 className="font-display text-lg text-[var(--color-gold-bright)]">{monthName}</h2>
        <button onClick={() => setMonthOffset((o) => o + 1)} className="btn-ghost text-xs">Next →</button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40 py-1">{d}</div>
        ))}
        {days.map((day, i) => {
          if (!day) return <div key={i} />;
          const isToday = day.date.toISOString().slice(0, 10) === todayStr;
          const moonPhase = day.tithiNumber <= 15
            ? `◐ ${day.tithiNumber}`
            : `◑ ${day.tithiNumber - 15}`;
          return (
            <div
              key={i}
              className={`rounded-sm border p-1.5 text-center transition motion-safe motion-reduce:transition-none sm:p-2 ${
                day.isSpecial
                  ? "border-[var(--color-gold)]/50 bg-[var(--color-gold)]/5"
                  : "border-[var(--hairline)] bg-[var(--color-ink)]/30"
              } ${isToday ? "ring-1 ring-[var(--color-gold-bright)]" : ""}`}
              title={day.specialNote}
            >
              <p className={`text-xs ${isToday ? "font-bold text-[var(--color-gold-bright)]" : "text-[var(--color-bone)]/70"}`}>
                {day.date.getDate()}
              </p>
              <p className="text-[0.5rem] text-[var(--color-bone)]/40">
                {day.isAmavasya ? "●" : day.isPurnima ? "○" : moonPhase}
              </p>
              {day.isSpecial && (
                <p className="text-[0.4rem] uppercase tracking-luxe text-[var(--color-gold)]/60 truncate">
                  {day.specialNote?.split(" — ")[0]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Today's details */}
      {days.map((d) => d && d.date.toISOString().slice(0, 10) === todayStr).some(Boolean) && (
        <div className="mt-8 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-5">
          {(() => {
            const todayInfo = days.find((d) => d && d.date.toISOString().slice(0, 10) === todayStr);
            if (!todayInfo) return null;
            return (
              <div>
                <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">Today</p>
                <h3 className="mt-1 font-display text-xl text-[var(--color-gold-bright)]">{todayInfo.tithiName}</h3>
                {todayInfo.specialNote && (
                  <p className="mt-1 text-sm text-[var(--color-gold)]/80">{todayInfo.specialNote}</p>
                )}
                {todayInfo.recommendedPractice && (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-bone)]/75">
                    <span className="text-[var(--color-gold)]">Recommended: </span>
                    {todayInfo.recommendedPractice}
                  </p>
                )}
                {!todayInfo.specialNote && (
                  <p className="mt-2 text-sm text-[var(--color-bone)]/55">
                    {todayInfo.paksha === "śukla" ? "Waxing phase — building, expansive practices." : "Waning phase — introspective, dissolution practices."}
                  </p>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
        <span>● Amāvasyā</span>
        <span>○ Pūrṇimā</span>
        <span>◐ Śukla (waxing)</span>
        <span>◑ Kṛṣṇa (waning)</span>
        <span className="text-[var(--color-gold)]/60">✦ Special tithi</span>
      </div>
    </div>
  );
}
