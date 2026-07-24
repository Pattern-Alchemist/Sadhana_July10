"use client";

import VaultGate from "@/components/VaultGate";
import { useVault } from "@/components/VaultProvider";

export default function VaultPage() {
  const { status, lock, wipeAll } = useVault();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {status === "unlocked" ? (
        <div className="text-center mt-20 fade-up">
          <h1 className="font-display text-3xl text-[var(--color-gold)] mb-4">Vault Unlocked</h1>
          <p className="text-[var(--color-bone)]/80 mb-8">
            Your private data is now decrypted in memory and accessible.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={lock} className="btn-ghost">
              Lock Vault
            </button>
            <button 
              onClick={() => {
                if (confirm("Are you sure? This deletes your vault and all encrypted data permanently.")) {
                  wipeAll();
                }
              }} 
              className="btn-ghost text-[var(--color-rose-accent)]"
            >
              Wipe Data
            </button>
          </div>
        </div>
      ) : (
        <VaultGate>
          <div className="hidden" />
        </VaultGate>
      )}
    </div>
  );
}
