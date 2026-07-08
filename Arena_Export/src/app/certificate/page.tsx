"use client";
import { useState } from "react";
import { useVaultData, type CycleEntry } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

export default function CertificatePage() {
  const { data: cycles } = useVaultData<CycleEntry[]>("cycles", []);
  const completed = cycles.filter((c) => c.status === "completed");
  const [selected, setSelected] = useState<CycleEntry | null>(completed[0] ?? null);

  function generate(c: CycleEntry) {
    const checkIns = Object.values(c.checkIns).filter(Boolean).length;
    const html = `<html><head><title>Sādhana Completion — ${c.siddhiName}</title><style>
      body{margin:0;padding:40px;background:#0a0908;font-family:Georgia,serif;color:#f5f1e6;}
      .cert{max-width:600px;margin:0 auto;border:2px solid #c9985e;padding:40px;text-align:center;background:#100f0d;}
      h1{color:#e6c089;font-size:24px;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;}
      h2{color:#c9985e;font-size:18px;margin:20px 0;}
      .siddhi{font-size:28px;color:#f5f1e6;margin:20px 0;}
      .dates{color:#d8cdb4;font-size:14px;margin:10px 0;}
      .stats{color:#9a7340;font-size:12px;margin:15px 0;}
      .verse{font-style:italic;color:#d8cdb4;font-size:13px;margin-top:30px;border-top:1px solid #c9985e;padding-top:20px;}
      .om{font-size:32px;color:#c9985e;}
    </style></head><body><div class="cert">
      <div class="om">ॐ</div>
      <h1>Sādhanā Pūrṇāhuti</h1>
      <h2>Completion of Contemplative Cycle</h2>
      <div class="siddhi">${c.siddhiName}</div>
      <div class="dates">Started: ${new Date(c.startDate).toLocaleDateString()}<br>Completed: ${new Date().toLocaleDateString()}</div>
      <div class="stats">Duration: ${c.targetDays} days · Check-ins: ${checkIns}/${c.targetDays}</div>
      <div class="verse">"As a cucumber severed from its bondage to the vine,<br>may the practitioner be liberated from bondage — not from immortality."<br>— Ṛgveda VII.59.12</div>
    </div></body></html>`;
    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); w.print(); }
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Sādhana Certificate</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Generate a printable PDF certificate for completed cycles.</p>
      </header>
      {completed.length === 0 ? (
        <p className="text-center text-sm text-[var(--color-bone)]/55 py-8">No completed cycles yet. Complete a cycle to generate a certificate.</p>
      ) : (
        <div className="space-y-2">
          {completed.map((c) => (
            <button key={c.id} onClick={() => generate(c)} className="block w-full rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/40 p-4 text-left transition hover:border-[var(--color-gold)]/60">
              <span className="text-sm text-[var(--color-gold-bright)]">{c.siddhiName}</span>
              <span className="ml-2 text-[0.5rem] text-[var(--color-bone)]/45">{c.targetDays} days · started {new Date(c.startDate).toLocaleDateString()}</span>
              <p className="mt-1 text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]/60">Generate PDF →</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
