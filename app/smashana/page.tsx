'use client';

import { useState } from 'react';
import SmashanaCompanion from '@/components/smashana/SmashanaCompanion';

export default function SmashanaPage() {
  const [journalEntry, setJournalEntry] = useState('');

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-[var(--color-gold)]/20 pb-6">
          <h1 className="font-display text-3xl tracking-wide text-[var(--color-gold-bright)] sm:text-4xl">
            🪦 Smashana Companion
          </h1>
          <p className="mt-2 text-sm text-[var(--color-bone)]/70">
            Speak to the Master who dwells in the cremation ground. Confess your shadow, ask for guidance, receive fierce truth.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Companion Chat */}
          <div className="lg:col-span-2">
            <SmashanaCompanion />
          </div>

          {/* Right: Shadow Mirror (Journal) */}
          <div className="rounded-sm border border-[var(--color-gold)]/20 bg-[var(--color-ink)]/50 p-6 backdrop-blur-sm">
            <h2 className="mb-4 font-display text-lg text-[var(--color-gold-bright)]">
              Shadow Mirror
            </h2>
            <p className="mb-4 text-xs text-[var(--color-bone)]/60">
              Write what you cannot say aloud. The Master reads the truth beneath your words.
            </p>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Your confession..."
              className="min-h-[300px] w-full resize-none rounded-sm border border-[var(--color-gold)]/10 bg-[var(--color-obsidian)]/80 p-3 font-body text-sm text-[var(--color-bone)] placeholder-[var(--color-bone)]/30 focus:border-[var(--color-gold)]/40 focus:outline-none"
            />
            <button
              onClick={() => {
                if (journalEntry.trim()) {
                  setJournalEntry('');
                  // In production, save to IndexedDB and send to Companion
                }
              }}
              disabled={!journalEntry.trim()}
              className="mt-4 w-full border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/5 py-2 font-display text-sm text-[var(--color-gold-bright)] transition hover:bg-[var(--color-gold)]/10 hover:border-[var(--color-gold)] disabled:opacity-50"
            >
              Confess
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
