"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { encrypt, decrypt, hashPassphrase, generateSalt, bytesToBase64 } from "@/lib/crypto";

/**
 * VaultProvider — AES-encrypted localStorage context.
 *
 * Manages:
 *   - First-run passphrase setup (creates vault salt + hash)
 *   - Unlock (verifies passphrase against stored hash)
 *   - Lock (clears in-memory key, requires re-auth)
 *   - Auto-lock after 30 minutes of inactivity
 *   - read() / write() / delete() — encrypted at rest
 *   - exportAll() / wipeAll() — backup + secure deletion
 *
 * All personal data flows through this provider. No plaintext ever
 * touches localStorage. No server. No cloud. No telemetry.
 */

const VAULT_SALT_KEY = "astrokalki:vault-salt";
const VAULT_HASH_KEY = "astrokalki:vault-hash";
const VAULT_DATA_KEY = "astrokalki:vault-data";
const AUTO_LOCK_MS = 30 * 60 * 1000; // 30 minutes

type VaultStatus = "loading" | "needs-setup" | "locked" | "unlocked";
type VaultCache = Record<string, unknown>;
type EncryptedStore = Record<string, string>;

interface VaultContextValue {
  status: VaultStatus;
  setup: (passphrase: string) => Promise<void>;
  unlock: (passphrase: string) => Promise<boolean>;
  lock: () => void;
  read: <T = any>(key: string) => T | null;
  write: <T = any>(key: string, value: T) => Promise<void>;
  remove: (key: string) => Promise<void>;
  exportAll: () => Promise<string | null>;
  wipeAll: () => void;
  isHydrated: boolean;
}

const VaultContext = createContext<VaultContextValue | null>(null);

export function useVault() {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("useVault must be used within a VaultProvider");
  return ctx;
}

function readEncryptedStore(): EncryptedStore {
  const raw = localStorage.getItem(VAULT_DATA_KEY);
  return raw ? JSON.parse(raw) as EncryptedStore : {};
}

function clearCache(cache: VaultCache) {
  Object.keys(cache).forEach((key) => delete cache[key]);
}

export function VaultProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<VaultStatus>("loading");
  const [passphrase, setPassphrase] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastActivity, setLastActivity] = useState(0);
  const memoryCacheRef = useRef<VaultCache>({});

  // On mount: check if vault is set up.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const salt = localStorage.getItem(VAULT_SALT_KEY);
      const hash = localStorage.getItem(VAULT_HASH_KEY);
      setStatus(!salt || !hash ? "needs-setup" : "locked");
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const lock = useCallback(() => {
    clearCache(memoryCacheRef.current);
    setPassphrase(null);
    setStatus("locked");
  }, []);

  // Auto-lock after inactivity.
  useEffect(() => {
    if (status !== "unlocked") return;
    const interval = window.setInterval(() => {
      if (Date.now() - lastActivity > AUTO_LOCK_MS) {
        lock();
      }
    }, 60_000); // check every minute
    const onActivity = () => setLastActivity(Date.now());
    window.addEventListener("click", onActivity);
    window.addEventListener("keydown", onActivity);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("click", onActivity);
      window.removeEventListener("keydown", onActivity);
    };
  }, [status, lastActivity, lock]);

  const setup = useCallback(async (newPassphrase: string) => {
    const salt = generateSalt();
    const saltB64 = bytesToBase64(salt);
    const hash = await hashPassphrase(newPassphrase, salt);
    localStorage.setItem(VAULT_SALT_KEY, saltB64);
    localStorage.setItem(VAULT_HASH_KEY, hash);
    localStorage.setItem(VAULT_DATA_KEY, JSON.stringify({})); // empty encrypted store
    clearCache(memoryCacheRef.current);
    setPassphrase(newPassphrase);
    setStatus("unlocked");
    setLastActivity(Date.now());
  }, []);

  const unlock = useCallback(async (entered: string): Promise<boolean> => {
    const saltB64 = localStorage.getItem(VAULT_SALT_KEY);
    const storedHash = localStorage.getItem(VAULT_HASH_KEY);
    if (!saltB64 || !storedHash) return false;

    // Convert base64 salt back to Uint8Array.
    const binary = atob(saltB64);
    const salt = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) salt[i] = binary.charCodeAt(i);

    const hash = await hashPassphrase(entered, salt);
    if (hash !== storedHash) return false;

    setPassphrase(entered);
    setStatus("unlocked");
    setLastActivity(Date.now());
    return true;
  }, []);

  const read = useCallback(<T = any,>(key: string): T | null => {
    if (!passphrase) return null;
    return (memoryCacheRef.current[key] as T | undefined) ?? null;
  }, [passphrase]);

  const write = useCallback(async <T = any,>(key: string, value: T) => {
    if (!passphrase) throw new Error("Vault is locked");
    memoryCacheRef.current[key] = value;
    const store = readEncryptedStore();
    const encrypted = await encrypt(JSON.stringify(value), passphrase);
    store[key] = encrypted;
    localStorage.setItem(VAULT_DATA_KEY, JSON.stringify(store));
    setLastActivity(Date.now());
  }, [passphrase]);

  const remove = useCallback(async (key: string) => {
    delete memoryCacheRef.current[key];
    const store = readEncryptedStore();
    delete store[key];
    localStorage.setItem(VAULT_DATA_KEY, JSON.stringify(store));
  }, []);

  const exportAll = useCallback(async (): Promise<string | null> => {
    if (!passphrase) return null;
    const raw = localStorage.getItem(VAULT_DATA_KEY);
    if (!raw) return null;
    const store = JSON.parse(raw) as EncryptedStore;
    const exported: VaultCache = {};
    for (const [key, blob] of Object.entries(store)) {
      try {
        const decrypted = await decrypt(blob, passphrase);
        exported[key] = JSON.parse(decrypted);
      } catch {
        exported[key] = null;
      }
    }
    return JSON.stringify(exported, null, 2);
  }, [passphrase]);

  const wipeAll = useCallback(() => {
    localStorage.removeItem(VAULT_DATA_KEY);
    localStorage.removeItem(VAULT_SALT_KEY);
    localStorage.removeItem(VAULT_HASH_KEY);
    clearCache(memoryCacheRef.current);
    setPassphrase(null);
    setStatus("needs-setup");
  }, []);

  // On unlock, load all data into memory cache.
  useEffect(() => {
    if (status === "locked") {
      clearCache(memoryCacheRef.current);
      return;
    }

    if (status !== "unlocked" || !passphrase) return;

    let cancelled = false;
    (async () => {
      const raw = localStorage.getItem(VAULT_DATA_KEY);
      if (!raw) return;
      const store = JSON.parse(raw) as EncryptedStore;
      const nextCache: VaultCache = {};
      for (const [key, blob] of Object.entries(store)) {
        try {
          const decrypted = await decrypt(blob, passphrase);
          nextCache[key] = JSON.parse(decrypted);
        } catch {
          // skip corrupted entries
        }
      }
      if (!cancelled) {
        clearCache(memoryCacheRef.current);
        Object.assign(memoryCacheRef.current, nextCache);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, passphrase]);

  return (
    <VaultContext.Provider
      value={{ status, setup, unlock, lock, read, write, remove, exportAll, wipeAll, isHydrated }}
    >
      {children}
    </VaultContext.Provider>
  );
}
