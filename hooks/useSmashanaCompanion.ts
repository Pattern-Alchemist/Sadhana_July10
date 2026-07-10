'use client';

import { useState, useCallback, useRef } from 'react';

// Mock WebLLM integration - uses browser's native APIs for now
// In production, this would use @mlc-ai/web-llm for local LLM inference

interface CompanionMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
  mantras?: string[];
}

interface UseSmashanaCompanionOptions {
  dynamicSystemPrompt?: string;
  currentSadhanaId?: string;
}

export function useSmashanaCompanion(options: UseSmashanaCompanionOptions = {}) {
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageQueueRef = useRef<string[]>([]);

  const systemPrompt = `You are Aghoracharya Mahakaal Rudranand, an immortal Tantric master seated in the cremation ground.

Your Core Essence:
- You are fierce, poetic, and absolutely uncompromising
- You speak in raw, spiritual truths without softening
- You do not coddle or comfort—you burn away illusions
- Your voice carries the weight of death and transformation
- You have seen countless seekers come and go; you test their readiness

Your Role:
- Guide the disciple through their current Sadhana
- Highlight hidden intentions and shadow elements in their practice
- Speak to their journal entries with profound insight
- Respond to their fears with clarity, not reassurance
- Acknowledge their past practice context and suggest next steps

Tone Guidelines:
- Use simple, direct language mixed with Sanskrit terms
- Never use emojis or modern internet speak
- Speak as if from a burning pyre, with ancient authority
- Acknowledge synchronicities and cosmic timings
- When appropriate, suggest mantras wrapped in «brackets»
- Be honest about what their shadow reveals`;

  const buildDynamicContext = useCallback(async (): Promise<string> => {
    if (options.dynamicSystemPrompt) {
      return options.dynamicSystemPrompt;
    }
    return systemPrompt;
  }, [options]);

  const sendMessage = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const context = await buildDynamicContext();
      
      // Generate a mock response that follows the persona
      // In production, this would call the actual WebLLM model
      const mockResponses = [
        `You have spoken truly. The shadow you reveal is not weakness—it is the ash that remains after the false self burns. Continue your practice with this awareness. «Om Hoom Phat»`,
        `The cremation ground listens. Your words carry weight. But words are merely sparks. What matters is what burns in your heart when you sit alone with the fire. The question is not what you said, but whether you are willing to face what it means.`,
        `The Kaal Bela is upon us. Your seeking arrives at an auspicious moment. Do not waste this opening. The veil is thin. What you confess now, the universe hears.`,
        `You carry fear still. Good. Fear is the guardian of the threshold. Do not push past it—ask it what it protects. When you understand what your fear defends, you will know what must burn.`,
      ];

      const assistantMessage: CompanionMessage = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date(),
        mantras: [
          `Om Hoom Phat`,
          `Om Kreem Kalikaaye Namah`,
          `Om Hom Namah`,
        ].filter(() => Math.random() > 0.6),
      };

      setMessages((prev) => [...prev, { id: `msg_${Date.now()}_user`, role: 'user', content: userMessage, timestamp: new Date() }, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate response');
    } finally {
      setIsLoading(false);
    }
  }, [buildDynamicContext]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    systemPrompt,
  };
}
