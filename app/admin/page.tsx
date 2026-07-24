"use client";

import { useState, useEffect } from "react";
import { SIDDHI_SEED } from "@/lib/archive-data";
import AdminUnrestrictedView from "@/components/AdminUnrestrictedView";
import { OmGlyph } from "@/components/Symbols";

const ADMIN_PASSPHRASE = "Kaos@777"; // Change this to a secure passphrase

export default function AdminPage() {
  const [passphrase, setPassphrase] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleUnlock() {
    setError("");
    if (passphrase === ADMIN_PASSPHRASE) {
      setUnlocked(true);
    } else {
      setError("Incorrect passphrase");
      setPassphrase("");
    }
  }

  if (!mounted) return null;

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-md px-4 pb-20 pt-16 sm:px-6">
        <header className="fade-up mb-8 text-center">
          <div className="mb-4 text-[var(--color-gold)]/60">
            <OmGlyph style={{ fontSize: "2rem" }} />
          </div>
          <h1 className="font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
            Archive Administrator
          </h1>
          <p className="mt-2 text-xs text-[var(--color-bone)]/60">
            Unrestricted viewing access for archival management
          </p>
        </header>

        <div className="space-y-4 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-6">
          <p className="text-xs text-[var(--color-bone)]/70">
            Enter the administrator passphrase to access the unrestricted archive view.
          </p>
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Administrator passphrase"
            className="field text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            autoFocus
          />
          {error && (
            <p className="text-xs text-[var(--color-rose-accent)]">{error}</p>
          )}
          <button onClick={handleUnlock} className="btn-gold w-full text-xs">
            Unlock Archive
          </button>
        </div>
      </div>
    );
  }

  return <AdminUnrestrictedView siddhis={SIDDHI_SEED} />;
}
