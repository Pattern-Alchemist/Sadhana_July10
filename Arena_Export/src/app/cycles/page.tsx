"use client";

import { useState } from "react";
import { useVaultData, type CycleEntry } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

export default function CyclesPage() {
  const { data: cycles, setData: setCycles } = useVaultData<CycleEntry[]>("cycles", []);
  const [showForm, setShowForm] = useState(false);

  function addCycle(cycle: Omit<CycleEntry, "id" | "checkIns" | "status">) {
    const newCycle: CycleEntry = {
      ...cycle,
      id: crypto.randomUUID(),
      checkIns: {},
      status: "active",
    };
    setCycles((prev) => [newCycle, ...prev]);
    setShowForm(false);
  }

  function toggleCheckIn(id: string, date: string) {
    setCycles((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, checkIns: { ...c.checkIns, [date]: !c.checkIns[date] } }
          : c
      )
    );
  }

  function updateStatus(id: string, status: CycleEntry["status"]) {
    setCycles((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  function deleteCycle(id: string) {
    setCycles((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Encrypted · Local Only
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Sādhana Cycle Tracker
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Plan your 41-day, 21-day, or 11-day cycles. Track daily check-ins. Visualize your consistency.
        </p>
      </header>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
          {cycles.length} {cycles.length === 1 ? "cycle" : "cycles"}
        </p>
        <button onClick={() => setShowForm(true)} className="btn-gold text-xs sm:text-sm">
          + Start Cycle
        </button>
      </div>

      {showForm && <CycleForm onSubmit={addCycle} onCancel={() => setShowForm(false)} />}

      <div className="space-y-6">
        {cycles.map((cycle) => (
          <CycleCard
            key={cycle.id}
            cycle={cycle}
            onToggleCheckIn={(date) => toggleCheckIn(cycle.id, date)}
            onStatusChange={(status) => updateStatus(cycle.id, status)}
            onDelete={() => deleteCycle(cycle.id)}
          />
        ))}
        {cycles.length === 0 && !showForm && (
          <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8 text-center">
            <p className="text-sm text-[var(--color-bone)]/65">
              No active cycles. Begin a sādhana cycle to track your daily practice.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CycleForm({ onSubmit, onCancel }: { onSubmit: (c: Omit<CycleEntry, "id" | "checkIns" | "status">) => void; onCancel: () => void }) {
  const [siddhiName, setSiddhiName] = useState("");
  const [siddhiSlug, setSiddhiSlug] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [targetDays, setTargetDays] = useState("41");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      siddhiName,
      siddhiSlug: siddhiSlug || siddhiName,
      startDate,
      targetDays: parseInt(targetDays) || 41,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-4 sm:p-6">
      <div>
        <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Practice / Siddhi Name</label>
        <input type="text" value={siddhiName} onChange={(e) => setSiddhiName(e.target.value)} className="field mt-1 text-sm" placeholder="e.g. Pranava Japa" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="field mt-1 text-sm" required />
        </div>
        <div>
          <label className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]">Duration (days)</label>
          <select value={targetDays} onChange={(e) => setTargetDays(e.target.value)} className="field mt-1 text-sm">
            <option value="11">11 days</option>
            <option value="21">21 days</option>
            <option value="41">41 days</option>
            <option value="108">108 days</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn-gold text-xs">Start Cycle</button>
        <button type="button" onClick={onCancel} className="btn-ghost text-xs">Cancel</button>
      </div>
    </form>
  );
}

function CycleCard({ cycle, onToggleCheckIn, onStatusChange, onDelete }: {
  cycle: CycleEntry;
  onToggleCheckIn: (date: string) => void;
  onStatusChange: (status: CycleEntry["status"]) => void;
  onDelete: () => void;
}) {
  const start = new Date(cycle.startDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: { date: string; label: number; isPast: boolean; isToday: boolean }[] = [];
  for (let i = 0; i < cycle.targetDays; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);
    days.push({
      date: d.toISOString().slice(0, 10),
      label: i + 1,
      isPast: d < today,
      isToday: d.getTime() === today.getTime(),
    });
  }

  const completed = Object.values(cycle.checkIns).filter(Boolean).length;
  const progress = Math.round((completed / cycle.targetDays) * 100);
  const active = cycle.status === "active";

  return (
    <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="font-display text-lg text-[var(--color-gold-bright)]">{cycle.siddhiName}</h3>
          <p className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
            {cycle.targetDays} days · started {start.toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {active && (
            <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-sage)]">● Active</span>
          )}
          {cycle.status === "completed" && (
            <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold-bright)]">✓ Completed</span>
          )}
          {cycle.status === "abandoned" && (
            <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]">Abandoned</span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">Progress</span>
          <span className="text-xs text-[var(--color-gold-bright)]">{completed}/{cycle.targetDays} · {progress}%</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--color-obsidian)]">
          <div className="h-full bg-gradient-to-r from-[var(--color-gold-deep)] to-[var(--color-gold-bright)] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Day grid */}
      <div className="mt-4 grid grid-cols-7 gap-1 sm:grid-cols-10">
        {days.map((day) => {
          const isChecked = cycle.checkIns[day.date] ?? false;
          return (
            <button
              key={day.date}
              onClick={() => active && onToggleCheckIn(day.date)}
              disabled={!active}
              className={`grid aspect-square place-items-center rounded-sm text-[0.55rem] transition motion-safe motion-reduce:transition-none ${
                isChecked
                  ? "bg-[var(--color-gold)] text-[var(--color-obsidian)]"
                  : day.isToday
                  ? "border border-[var(--color-gold-bright)] text-[var(--color-gold-bright)]"
                  : day.isPast
                  ? "border border-[var(--color-rose-accent)]/30 text-[var(--color-rose-accent)]/50"
                  : "border border-[var(--hairline)] text-[var(--color-bone)]/40"
              } ${active ? "cursor-pointer hover:border-[var(--color-gold)]" : "cursor-default"}`}
              title={day.date}
            >
              {day.label}
            </button>
          );
        })}
      </div>

      {active && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => onStatusChange("completed")} className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-sage)] transition hover:text-[var(--color-sage)]/80">
            Mark Complete
          </button>
          <button onClick={() => onStatusChange("abandoned")} className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/60 transition hover:text-[var(--color-rose-accent)]">
            Abandon
          </button>
          <button onClick={onDelete} className="ml-auto text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/35 transition hover:text-[var(--color-rose-accent)]">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
