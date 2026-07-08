"use client";

import { useState, useEffect } from "react";
import { useVault } from "./VaultProvider";
import { OmGlyph } from "./Symbols";

/**
 * VaultGate — renders setup or unlock screen when the vault is not unlocked.
 * Renders children when the vault is unlocked.
 *
 * Place this at the top of the layout, wrapping the main content.
 * Routes that don't need the vault (public browsing) should bypass this
 * by checking vault status — but for simplicity, we gate everything
 * behind the vault once set up. If no vault is set up yet, public
 * browsing works without any passphrase.
 */
export default function VaultGate({ children }: { children: React.ReactNode }) {
  const { status, isHydrated } = useVault();
  const [showGate, setShowGate] = useState(false);

  // Only show the gate after hydration to avoid SSR mismatch
  useEffect(() => {
    if (isHydrated) {
      // Show gate only if vault is set up AND locked
      setShowGate(status === "locked");
    }
  }, [isHydrated, status]);

  if (!isHydrated) {
    return <>{children}</>;
  }

  if (status === "needs-setup") {
    return <VaultSetup />;
  }

  if (showGate) {
    return <VaultUnlock />;
  }

  return <>{children}</>;
}

function VaultSetup() {
  const { setup } = useVault();
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (pass.length < 6) {
      setError("Passphrase must be at least 6 characters.");
      return;
    }
    if (pass !== confirm) {
      setError("Passphrases do not match.");
      return;
    }
    setLoading(true);
    try {
      await setup(pass);
    } catch {
      setError("Setup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-6 sm:p-8">
        <div className="mb-6 text-center">
          <div className="mb-4 text-[var(--color-gold)]/70">
            <OmGlyph style={{ fontSize: "2rem" }} />
          </div>
          <h1 className="font-display text-2xl text-[var(--color-ivory)]">
            Create Your Private Vault
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-bone)]/65">
            All personal data — journal, cycle logs, case notes — will be
            AES-256 encrypted with this passphrase. No server, no cloud.
            Choose a passphrase you will not forget. There is no recovery.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">
              Passphrase
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="field mt-1"
              autoFocus
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)]">
              Confirm Passphrase
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="field mt-1"
              autoComplete="new-password"
            />
          </div>
          {error && (
            <p className="text-xs text-[var(--color-rose-accent)]">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full text-sm"
          >
            {loading ? "Encrypting…" : "Create Vault"}
          </button>
        </form>
        <p className="mt-4 text-center text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/35">
          AES-256-GCM · PBKDF2 100K iterations · Local only
        </p>
      </div>
    </div>
  );
}

function VaultUnlock() {
  const { unlock, lock } = useVault();
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (locked) return;
    setError("");
    setLoading(true);
    const ok = await unlock(pass);
    setLoading(false);
    if (!ok) {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= 3) {
        setLocked(true);
        setError("Too many attempts. Locked for 5 minutes.");
        setTimeout(() => {
          setLocked(false);
          setAttempts(0);
          setError("");
        }, 5 * 60 * 1000);
      } else {
        setError(`Incorrect passphrase. ${3 - next} attempts remaining.`);
      }
      setPass("");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-6 sm:p-8">
        <div className="mb-6 text-center">
          <div className="mb-4 text-[var(--color-gold)]/70">
            <OmGlyph style={{ fontSize: "2rem" }} />
          </div>
          <h1 className="font-display text-2xl text-[var(--color-ivory)]">
            Unlock Your Vault
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-[var(--color-bone)]/65">
            Enter your passphrase to access your practice journal, cycle
            tracker, and healing case notes.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Passphrase"
              className="field"
              autoFocus
              autoComplete="current-password"
              disabled={locked}
            />
          </div>
          {error && (
            <p className="text-xs text-[var(--color-rose-accent)]">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || locked}
            className="btn-gold w-full text-sm"
          >
            {loading ? "Decrypting…" : locked ? "Locked" : "Unlock"}
          </button>
        </form>
        <button
          onClick={() => {
            // Allow browsing without unlocking
            lock();
          }}
          className="mt-4 w-full text-center text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/40 transition hover:text-[var(--color-gold-bright)]"
        >
          Browse without unlocking →
        </button>
      </div>
    </div>
  );
}
