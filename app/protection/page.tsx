"use client";
import { useState } from "react";
import { PROTECTION_CHECKLIST } from "@/lib/practice-data";
import { OmGlyph } from "@/components/Symbols";

export default function ProtectionPage() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [siddhiName, setSiddhiName] = useState("");
  const allRequired = PROTECTION_CHECKLIST.filter((c) => c.required).every((c) => checks[c.id]);

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Energetic Protection Checklist</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Complete all required items before high-caution practice.</p>
      </header>
      <input type="text" value={siddhiName} onChange={(e)=>setSiddhiName(e.target.value)} placeholder="Practice / siddhi name" className="field text-sm mb-4" />
      <div className="space-y-2">
        {PROTECTION_CHECKLIST.map((c) => (
          <label key={c.id} className={`flex items-center gap-3 rounded-sm border p-3 transition ${checks[c.id] ? "border-[var(--color-sage)]/30 bg-[var(--color-sage)]/5" : "border-[var(--color-hairline)] bg-[var(--color-ink)]/40"}`}>
            <input type="checkbox" checked={checks[c.id] || false} onChange={() => setChecks((p) => ({ ...p, [c.id]: !p[c.id] }))} className="accent-[var(--color-gold)]" />
            <span className={`flex-1 text-sm ${checks[c.id] ? "text-[var(--color-sage)]" : "text-[var(--color-bone)]/70"}`}>{c.label}</span>
            {c.required && !checks[c.id] && <span className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/60">Required</span>}
          </label>
        ))}
      </div>
      <div className={`mt-4 rounded-sm border p-4 text-center ${allRequired ? "border-[var(--color-sage)]/40 bg-[var(--color-sage)]/5" : "border-[var(--color-rose-accent)]/20 bg-[var(--color-rose-accent)]/5"}`}>
        {allRequired ? (
          <p className="text-sm text-[var(--color-sage)]">✓ All required protections confirmed. You may proceed.</p>
        ) : (
          <p className="text-sm text-[var(--color-rose-accent)]/80">⚠ Complete all required items before proceeding.</p>
        )}
      </div>
    </div>
  );
}
