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
              className={`max-w-xs rounded-lg px-5 py-4 text-sm font-body leading-relaxed border transition-all ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-amber-600/15 to-amber-600/5 text-amber-950 border-amber-600/30 shadow-lg shadow-amber-600/10'
                  : 'bg-gradient-to-br from-slate-700/60 to-gray-700/60 text-amber-50/90 border-amber-600/20 shadow-md shadow-slate-900/30'
              }`}
            >
              {msg.content}
              {msg.mantras && msg.mantras.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-amber-600/20 pt-3">
                  {msg.mantras.map((mantra, idx) => (
                    <div
                      key={idx}
                      className="font-display text-xs text-yellow-300 italic pl-2 border-l-2 border-amber-600/50"
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
            <div className="bg-gradient-to-r from-slate-700/50 to-gray-700/50 rounded-lg px-4 py-3 text-sm text-amber-600/60 border border-amber-600/20 italic animate-pulse">
              The Master speaks...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="border-t border-amber-600/20 p-4 flex gap-2 bg-gradient-to-r from-slate-900/40 to-gray-700/40"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak your truth..."
          disabled={isLoading}
          className="flex-1 rounded-lg border border-amber-600/25 bg-gradient-to-r from-slate-900/80 to-slate-700/50 px-4 py-3 text-sm text-amber-50 placeholder-amber-50/40 focus:border-amber-600/60 focus:outline-none focus:ring-1 focus:ring-amber-600/30 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-lg border border-amber-600/60 bg-gradient-to-br from-amber-600/20 to-amber-600/5 px-5 py-3 font-display text-sm text-yellow-300 transition hover:bg-amber-600/15 hover:border-amber-600 hover:shadow-lg hover:shadow-amber-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✦
        </button>
      </form>
    </div>
  );
}
