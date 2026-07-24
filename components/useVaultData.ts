"use client";

import { useState, useEffect, useCallback } from "react";
import { useVault } from "@/components/VaultProvider";

/**
 * useVaultData — generic hook for reading/writing encrypted data
 * from the vault. Provides a simple { data, setData, loading } interface.
 *
 * Usage:
 *   const { data: entries, setData: setEntries, loading } =
 *     useVaultData<JournalEntry[]>("journal", []);
 */
export function useVaultData<T>(key: string, defaultValue: T) {
  const vault = useVault();
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (vault.status === "unlocked") {
        const stored = vault.read<T>(key);
        setData(stored ?? defaultValue);
      }
      setLoading(false);
    }, 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault.status, key]);

  const update = useCallback(
    async (newData: T | ((prev: T) => T)) => {
      const value =
        typeof newData === "function"
          ? (newData as (prev: T) => T)(data)
          : newData;
      setData(value);
      await vault.write(key, value);
    },
    [vault, key, data]
  );

  const remove = useCallback(async () => {
    setData(defaultValue);
    await vault.remove(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault, key]);

  return { data, setData: update, remove, loading };
}

// ---------- Shared types ----------

export interface JournalEntry {
  id: string;
  date: string; // ISO date
  siddhiSlug?: string;
  siddhiName?: string;
  duration?: number; // minutes
  japaCount?: number;
  moodBefore?: number; // 1-5
  moodAfter?: number; // 1-5
  insights?: string;
  disturbances?: string;
  dreams?: string;
  createdAt: string;
}

export interface CycleEntry {
  id: string;
  siddhiSlug: string;
  siddhiName: string;
  startDate: string;
  targetDays: number;
  checkIns: Record<string, boolean>; // date -> completed
  status: "active" | "completed" | "abandoned";
  notes?: string;
}

export interface JapaSession {
  id: string;
  siddhiSlug?: string;
  siddhiName?: string;
  date: string;
  count: number;
  target: number;
  completed: boolean;
}

export interface CaseNote {
  id: string;
  date: string;
  personInitials: string;
  affliction: string;
  practiceApplied: string;
  beforeNotes?: string;
  afterNotes?: string;
  consentConfirmed: boolean;
  followUpDate?: string;
}

export interface IntegrationCheck {
  id: string;
  journalEntryId: string;
  siddhiSlug?: string;
  timestamp: string;
  type: "30min" | "morning";
  mood?: number;
  notes?: string;
  dreamLog?: string;
}

export interface CurriculumProgress {
  pathId: string;
  siddhiSlug: string;
  status: "unread" | "read" | "studying" | "practicing" | "completed";
  updatedAt: string;
}
