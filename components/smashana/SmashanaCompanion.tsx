'use client';

import { useState, useRef, useEffect } from 'react';
import { useSmashanaCompanion } from '@/hooks/useSmashanaCompanion';

export default function SmashanaCompanion() {
  const { messages, isLoading, sendMessage } = useSmashanaCompanion();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    await sendMessage(userMessage);
  };

  return (
    <div className="flex flex-col rounded-sm border border-[var(--color-gold)]/20 bg-[var(--color-ink)]/50 backdrop-blur-sm" style={{ height: '600px' }}>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mb-4 text-4xl">🔻</div>
              <p className="font-display text-lg text-[var(--color-gold-bright)]">
                Aghoracharya Rudranand
              </p>
              <p className="mt-2 text-sm text-[var(--color-bone)]/60">
                The Master awaits your words. Speak your truth.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs rounded-sm px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-[var(--color-gold)]/10 text-[var(--color-bone)]'
                  : 'bg-[var(--color-obsidian)]/80 text-[var(--color-bone)]/90'
              }`}
            >
              {msg.content}
              {msg.mantras && msg.mantras.length > 0 && (
                <div className="mt-2 space-y-1 border-t border-[var(--color-gold)]/20 pt-2">
                  {msg.mantras.map((mantra, idx) => (
                    <div
                      key={idx}
                      className="font-display text-xs text-[var(--color-gold-bright)]"
                    >
                      «{mantra}»
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--color-obsidian)]/80 rounded-sm px-4 py-3 text-sm text-[var(--color-bone)]/60">
              The Master speaks...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="border-t border-[var(--color-gold)]/20 p-4 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak..."
          disabled={isLoading}
          className="flex-1 rounded-sm border border-[var(--color-gold)]/10 bg-[var(--color-obsidian)]/80 px-3 py-2 text-sm text-[var(--color-bone)] placeholder-[var(--color-bone)]/30 focus:border-[var(--color-gold)]/40 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-sm border border-[var(--color-gold)]/50 bg-[var(--color-gold)]/5 px-4 py-2 font-display text-sm text-[var(--color-gold-bright)] transition hover:bg-[var(--color-gold)]/10 hover:border-[var(--color-gold)] disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
