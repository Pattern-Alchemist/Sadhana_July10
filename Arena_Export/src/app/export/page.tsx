"use client";
import { useState } from "react";
import { useVault } from "@/components/VaultProvider";
import { useVaultData, type JournalEntry, type JapaSession, type CycleEntry, type CaseNote } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

export default function ExportPage() {
  const vault = useVault();
  const { data: journal } = useVaultData<JournalEntry[]>("journal", []);
  const { data: japa } = useVaultData<JapaSession[]>("japa-sessions", []);
  const { data: cycles } = useVaultData<CycleEntry[]>("cycles", []);
  const { data: cases } = useVaultData<CaseNote[]>("case-notes", []);
  const [exported, setExported] = useState(false);

  function generate() {
    let md = "# AstroKalki Practice Export\n\n";
    md += `Generated: ${new Date().toISOString()}\n\n`;
    md += `**This file contains your personal practice data. Store it securely. Delete it when no longer needed.**\n\n---\n\n`;

    md += `## Practice Journal (${journal.length} entries)\n\n`;
    [...journal].sort((a,b)=>a.date.localeCompare(b.date)).forEach((e) => {
      md += `### ${e.date} — ${e.siddhiName ?? "Practice"}\n`;
      if (e.duration) md += `- Duration: ${e.duration} min\n`;
      if (e.japaCount) md += `- Japa: ${e.japaCount}\n`;
      if (e.moodBefore && e.moodAfter) md += `- Mood: ${e.moodBefore} → ${e.moodAfter}\n`;
      if (e.insights) md += `\n**Insights:** ${e.insights}\n`;
      if (e.disturbances) md += `\n**Disturbances:** ${e.disturbances}\n`;
      if (e.dreams) md += `\n**Dreams:** ${e.dreams}\n`;
      md += "\n";
    });

    md += `\n## Japa Sessions (${japa.length} sessions, ${japa.reduce((s,j)=>s+j.count,0)} total)\n\n`;
    japa.forEach((j) => { md += `- ${j.date}: ${j.count} (${j.siddhiName ?? "Practice"})${j.completed ? " ✓" : ""}\n`; });

    md += `\n## Sādhana Cycles (${cycles.length})\n\n`;
    cycles.forEach((c) => { md += `- ${c.siddhiName}: ${c.status}, ${Object.values(c.checkIns).filter(Boolean).length}/${c.targetDays} days (started ${c.startDate})\n`; });

    md += `\n## Healing Case Notes (${cases.length})\n\n`;
    cases.forEach((c) => { md += `- ${c.date}: ${c.personInitials} — ${c.affliction} → ${c.practiceApplied}${c.consentConfirmed ? "" : " ⚠ no consent"}\n`; });

    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `astrokalki-export-${new Date().toISOString().slice(0,10)}.md`;
    a.click(); URL.revokeObjectURL(url);
    setExported(true);
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6 text-center">
      <header className="fade-up mb-6">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Export to Markdown</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Download your full practice history as a readable .md file.</p>
      </header>
      <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-5 text-left">
        <p className="text-xs text-[var(--color-bone)]/65 mb-3">This export will include:</p>
        <ul className="space-y-1 text-xs text-[var(--color-bone)]/55">
          <li>• {journal.length} journal entries</li>
          <li>• {japa.length} japa sessions ({japa.reduce((s,j)=>s+j.count,0)} total count)</li>
          <li>• {cycles.length} sādhana cycles</li>
          <li>• {cases.length} healing case notes</li>
        </ul>
      </div>
      <button onClick={generate} className="mt-4 btn-gold text-xs" disabled={journal.length === 0 && japa.length === 0 && cycles.length === 0 && cases.length === 0}>
        {exported ? "✓ Exported — Download Again" : "Generate & Download .md"}
      </button>
      {exported && <p className="mt-3 text-xs text-[var(--color-sage)]">File downloaded. Store securely — it contains your personal data in plaintext.</p>}
    </div>
  );
}
