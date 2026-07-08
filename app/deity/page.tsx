"use client";
import { DEITY_ROTATION } from "@/lib/practice-data";
import { OmGlyph } from "@/components/Symbols";

export default function DeityPage() {
  const today = new Date().getDay();
  const deity = DEITY_ROTATION[today];

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6 text-center">
      <header className="fade-up mb-6">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Deity of the Day</h1>
      </header>
      <div className="rounded-sm border p-8" style={{ borderColor: deity.color + "40", background: deity.color + "08" }}>
        <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</p>
        <h2 className="mt-3 font-display text-3xl" style={{ color: deity.color }}>{deity.name}</h2>
        <p className="mt-1 font-display text-lg text-[var(--color-gold)]/70">{deity.sanskrit}</p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-bone)]/70">{deity.role}</p>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-1">
        {DEITY_ROTATION.map((d, i) => (
          <div key={i} className={`rounded-sm border p-2 text-center ${i === today ? "border-[var(--color-gold)]" : "border-[var(--color-hairline)]"}`}>
            <p className="text-[0.5rem] text-[var(--color-bone)]/45">{["Su","Mo","Tu","We","Th","Fr","Sa"][i]}</p>
            <p className="text-[0.6rem]" style={{ color: i === today ? d.color : "var(--color-bone)" }}>{d.name.split("/")[0].split(" ")[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
