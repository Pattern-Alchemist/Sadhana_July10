"use client";
import { useState, useEffect } from "react";
import { useVault } from "@/components/VaultProvider";
import { encrypt, decrypt } from "@/lib/crypto";
import { OmGlyph } from "@/components/Symbols";

export default function MantraVaultPage() {
  const vault = useVault();
  const [mantraPass, setMantraPass] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [mantra, setMantra] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const [newMantra, setNewMantra] = useState("");
  const [error, setError] = useState("");
  const [hasStored, setHasStored] = useState(false);
  const [mounted, setMounted] = useState(false);

  const STORAGE_KEY = "astrokalki:mantra-vault";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
      setHasStored(!!localStorage.getItem(STORAGE_KEY));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function unlockMantra() {
    setError("");
    if (typeof window === "undefined") return;
    const blob = localStorage.getItem(STORAGE_KEY);
    if (!blob) { setError("No mantra stored. Set one first."); return; }
    try {
      const text = await decrypt(blob, mantraPass);
      setMantra(text);
      setUnlocked(true);
    } catch {
      setError("Incorrect mantra passphrase.");
    }
  }

  async function saveMantra() {
    if (!mantraPass || !newMantra) return;
    const blob = await encrypt(newMantra, mantraPass);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, blob);
    setMantra(newMantra);
    setNewMantra("");
    setInputMode(false);
    setUnlocked(true);
    setHasStored(true);
  }

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-md px-4 pb-20 pt-8 sm:px-6">
      <header className="fade-up mb-6 text-center">
        <div className="mb-3 text-[var(--color-gold)]/60"><OmGlyph style={{ fontSize: "1.6rem" }} /></div>
        <h1 className="font-display text-xl text-[var(--color-ivory)] sm:text-2xl">Personal Mantra Vault</h1>
        <p className="mt-1 text-xs text-[var(--color-bone)]/60">Double-encrypted. Separate passphrase. Long-press to reveal.</p>
      </header>

      {!unlocked ? (
        <div className="space-y-3 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-5">
          <p className="text-xs text-[var(--color-bone)]/65">Enter your mantra passphrase (separate from the main vault).</p>
          <input type="password" value={mantraPass} onChange={(e)=>setMantraPass(e.target.value)} placeholder="Mantra passphrase" className="field text-sm" onKeyDown={(e)=>e.key==="Enter"&&unlockMantra()} />
          {error && <p className="text-xs text-[var(--color-rose-accent)]">{error}</p>}
          <button onClick={unlockMantra} className="btn-gold w-full text-xs">Unlock Mantra</button>
          {!hasStored && (
            <button onClick={() => setInputMode(true)} className="w-full text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]/60">Set mantra for the first time →</button>
          )}
          {inputMode && (
            <div className="space-y-2 pt-2 border-t border-[var(--color-hairline)]">
              <textarea value={newMantra} onChange={(e)=>setNewMantra(e.target.value)} rows={3} placeholder="Your dīkṣā mantra…" className="field text-sm" />
              <button onClick={saveMantra} className="btn-gold w-full text-xs">Encrypt & Store</button>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-sm border border-[var(--color-gold)]/40 bg-[var(--color-ink)]/60 p-6 text-center">
          <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-gold)]/60">Your Mantra</p>
          <div className="mt-4 min-h-[3rem]" onPointerDown={() => setRevealed(true)} onPointerUp={() => setRevealed(false)} onPointerLeave={() => setRevealed(false)}>
            {revealed ? (
              <p className="font-display text-lg text-[var(--color-gold-bright)] leading-relaxed">{mantra}</p>
            ) : (
              <p className="text-sm text-[var(--color-bone)]/40 cursor-pointer">🔒 Long-press to reveal</p>
            )}
          </div>
          <button onClick={() => { setUnlocked(false); setMantra(""); setMantraPass(""); }} className="mt-4 btn-ghost text-xs">Lock</button>
        </div>
      )}
    </div>
  );
}
