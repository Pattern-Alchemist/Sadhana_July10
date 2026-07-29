"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  type: "user" | "guru";
  text: string;
  timestamp: Date;
}

const GURU_RESPONSES: Record<string, string> = {
  default:
    "Om. I am here to guide you on the path of Aghad. Ask me anything about your practice, mantras, chakras, or the journey to enlightenment.",
  meditation:
    "Meditation is the gateway to silence. Sit comfortably, spine straight. Close your eyes. Watch the breath without controlling it. Let thoughts arise and dissolve like clouds in the sky.",
  mantra:
    "Mantras are sacred vibrations that attune your consciousness to higher frequencies. Chant with reverence, not ambition. The repetition itself purifies the mind and awakens kundalini.",
  kundalini:
    "Kundalini is the dormant divine energy coiled at the base of your spine. Through systematic practice, it awakens and ascends through the chakras, bringing enlightenment.",
  chakra:
    "Each chakra is an energy center governing different aspects of consciousness. Root chakra: stability. Sacral: creativity. Solar plexus: power. Heart: love. Throat: truth. Third eye: intuition. Crown: unity.",
  difficulty:
    "Difficulties on the path are blessings in disguise. They are your consciousness revealing areas that need healing. Continue practice with patience and reverence.",
  progress:
    "Progress in spirituality is not linear. Some days you will feel expanded; others contracted. This is natural. Trust the process. Consistency is the key.",
};

export default function VoiceGuru() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      type: "guru",
      text: "Om namah shivaya. I am your Guru guide on the path of Aghad. Speak or type your questions freely. I am here to illuminate your journey to enlightenment.",
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGuruResponse = (userText: string): string => {
    const lower = userText.toLowerCase();

    if (lower.includes("meditat")) return GURU_RESPONSES.meditation;
    if (lower.includes("mantra")) return GURU_RESPONSES.mantra;
    if (lower.includes("kundalini")) return GURU_RESPONSES.kundalini;
    if (lower.includes("chakra")) return GURU_RESPONSES.chakra;
    if (lower.includes("difficult") || lower.includes("struggling"))
      return GURU_RESPONSES.difficulty;
    if (lower.includes("progress")) return GURU_RESPONSES.progress;

    return GURU_RESPONSES.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate Guru thinking and response
    setTimeout(() => {
      const guruResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "guru",
        text: getGuruResponse(inputText),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, guruResponse]);

      // Auto-speak Guru response
      speakText(guruResponse.text);
    }, 800);
  };

  const startVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported");
      return;
    }

    const SpeechRecognitionAPI = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.language = "en-US";

    recognitionRef.current.onstart = () => setIsListening(true);

    recognitionRef.current.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      if (event.results[event.results.length - 1].isFinal) {
        setInputText(transcript);
      }
    };

    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.start();
  };

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)] flex flex-col">
      {/* Header */}
      <div className="border-b border-[var(--hairline)] bg-gradient-to-r from-[var(--color-ink)] to-[var(--color-charcoal)] px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-[var(--color-gold-bright)]">
              Ask Your Guru
            </h1>
            <p className="mt-1 text-sm text-[var(--color-bone)]/70">
              Voice-enabled guidance for your spiritual journey
            </p>
          </div>
          <Link
            href="/aghad/dashboard"
            className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-6 py-4 rounded-sm ${
                  message.type === "user"
                    ? "bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/40 text-[var(--color-ivory)]"
                    : "bg-[var(--color-purple-accent)]/10 border border-[var(--color-purple-accent)]/40 text-[var(--color-bone)]"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <div
                  className={`text-xs mt-2 ${
                    message.type === "user"
                      ? "text-[var(--color-gold)]/60"
                      : "text-[var(--color-purple-accent)]/60"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[var(--hairline)] bg-gradient-to-t from-[var(--color-ink)]/40 to-transparent px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask your Guru..."
              className="flex-1 px-4 py-3 rounded-sm bg-[var(--color-stone)]/40 border border-[var(--hairline)] text-[var(--color-ivory)] placeholder-[var(--color-bone)]/40 focus:outline-none focus:border-[var(--color-gold)]/40 focus:ring-1 focus:ring-[var(--color-gold)]/20 transition-all"
            />

            <button
              onClick={() => {
                if (isListening && recognitionRef.current) {
                  recognitionRef.current.stop();
                  setIsListening(false);
                } else {
                  startVoiceInput();
                }
              }}
              className={`px-6 py-3 rounded-sm font-semibold transition-all ${
                isListening
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-[var(--color-purple-accent)] text-white hover:bg-[var(--color-purple-accent)]/90"
              }`}
              title="Click to speak"
            >
              {isListening ? "Stop" : "🎤"}
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="px-6 py-3 bg-[var(--color-gold)] text-[var(--color-obsidian)] rounded-sm font-semibold hover:bg-[var(--color-gold-bright)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>

          {/* Text-to-Speech Control */}
          {isSpeaking && (
            <div className="mt-4 p-4 rounded-sm bg-[var(--color-gold)]/5 border border-[var(--color-gold)]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="inline-block animate-pulse">
                  <div className="w-3 h-3 bg-[var(--color-gold)] rounded-full" />
                </div>
                <span className="text-sm text-[var(--color-bone)]/70">
                  Guru is speaking...
                </span>
              </div>
              <button
                onClick={stopSpeaking}
                className="text-xs text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] uppercase tracking-wide font-semibold"
              >
                Stop
              </button>
            </div>
          )}

          {/* Help Text */}
          <p className="mt-4 text-xs text-[var(--color-bone)]/50 text-center">
            Use your voice to ask questions. Ask about mantras, chakras, meditation, kundalini, or any aspect of your practice.
          </p>
        </div>
      </div>
    </div>
  );
}
