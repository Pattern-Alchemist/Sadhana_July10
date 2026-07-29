"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AGHAD_MANTRAS } from "@/lib/aghad-course-data";

type AudioState = "idle" | "loading" | "playing" | "error";

type Mantra = {
  id?: number;
  title: string;
  sanskrit?: string;
  transliteration?: string;
  translation?: string;
  pronunciation?: string;
  sound_file?: string;
  soundFile?: string;
  mantra_type?: string;
  chakra?: string;
  why_recite?: string;
  whyRecite?: string;
  benefits?: string[] | unknown;
  visualizations?: string[] | unknown;
  frequency?: number;
  duration?: number;
  intensity?: string;
};

export default function MantrasLab() {
  const [mantras, setMantras] = useState<Mantra[]>(AGHAD_MANTRAS);
  const [selectedMantra, setSelectedMantra] = useState<Mantra>(AGHAD_MANTRAS[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMantras = async () => {
      try {
        const response = await fetch("/api/aghad/mantras");
        if (response.ok) {
          const data = await response.json();
          if (data.mantras && data.mantras.length > 0) {
            setMantras(data.mantras as Mantra[]);
            setSelectedMantra(data.mantras[0] as Mantra);
          }
        }
      } catch (error) {
        console.log("Using fallback mantras - database not available");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMantras();
  }, []);
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [isReciting, setIsReciting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);

  const playPronunciation = async () => {
    if (!(selectedMantra.soundFile || selectedMantra.sound_file)) return;
    
    setAudioState("loading");
    try {
      const audio = audioRef.current;
      if (audio) {
        audio.src = selectedMantra.soundFile || selectedMantra.sound_file || "";
        audio.play();
        setAudioState("playing");
      }
    } catch (error) {
      setAudioState("error");
    }
  };

  const startVoicePractice = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognitionAPI = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.continuous = false;
    recognitionRef.current.language = "sa-IN";

    recognitionRef.current.onstart = () => setIsReciting(true);
    recognitionRef.current.onend = () => setIsReciting(false);
    recognitionRef.current.onerror = () => setIsReciting(false);

    recognitionRef.current.start();
  };

  const stopVoicePractice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsReciting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Header */}
      <div className="border-b border-[var(--hairline)] bg-gradient-to-r from-[var(--color-ink)] to-[var(--color-charcoal)] px-6 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-[var(--color-gold-bright)]">
              Mantra Lab
            </h1>
            <p className="mt-1 text-sm text-[var(--color-bone)]/70">
              Master the sacred vibrations
            </p>
          </div>
          <Link href="/aghad/dashboard" className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)]">
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Mantra List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-display text-lg text-[var(--color-gold-bright)] mb-4">
              Core Mantras
            </h2>

            {mantras.map((mantra) => (
              <button
                key={mantra.id || mantra.title}
                onClick={() => setSelectedMantra(mantra)}
                className={`w-full text-left p-4 rounded-sm border transition-all duration-300 ${
                  selectedMantra.title === mantra.title
                    ? "bg-[var(--color-gold)]/10 border-[var(--color-gold)] shadow-lg"
                    : "bg-[var(--color-ink)]/20 border-[var(--hairline)] hover:bg-[var(--color-ink)]/40"
                }`}
              >
                <div className="font-semibold text-[var(--color-ivory)]">
                  {mantra.title}
                </div>
                <div className="text-xs text-[var(--color-bone)]/60 mt-1">
                  {mantra.transliteration}
                </div>
                <div className="text-xs text-[var(--color-gold)]/70 mt-2">
                  {mantra.mantra_type}
                </div>
              </button>
            ))}
          </div>

          {/* Mantra Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sanskrit */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8">
              <div className="text-xs uppercase tracking-wide text-[var(--color-gold)]/70 mb-3">
                Sanskrit
              </div>
              <div className="font-display text-4xl text-[var(--color-gold-bright)] text-center py-8">
                {selectedMantra.sanskrit}
              </div>

              <div className="space-y-4 mt-8">
                <div>
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-2">
                    Transliteration
                  </div>
                  <div className="text-lg font-body text-[var(--color-ivory)]">
                    {selectedMantra.transliteration}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-2">
                    Translation
                  </div>
                  <div className="text-[var(--color-bone)]/85 leading-relaxed">
                    {selectedMantra.translation}
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-2">
                    Pronunciation Guide
                  </div>
                  <div className="text-[var(--color-bone)]/85 font-mono text-sm bg-[var(--color-stone)]/30 p-3 rounded-sm border border-[var(--hairline)]">
                    {selectedMantra.pronunciation}
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Practice */}
            <div className="rounded-sm border border-[var(--color-purple-accent)]/30 bg-gradient-to-br from-[var(--color-purple-accent)]/5 to-transparent p-8">
              <div className="text-xs uppercase tracking-wide text-[var(--color-purple-accent)] font-semibold mb-6">
                Voice Practice
              </div>

              <div className="space-y-6">
                {/* Listen */}
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-ivory)] mb-3">
                    Step 1: Listen
                  </h4>
                  <button
                    onClick={playPronunciation}
                    disabled={!(selectedMantra.soundFile || selectedMantra.sound_file)}
                    className="w-full px-6 py-4 bg-[var(--color-gold)] text-[var(--color-obsidian)] font-semibold rounded-sm hover:bg-[var(--color-gold-bright)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {audioState === "playing" ? "Playing..." : "Play Pronunciation"}
                  </button>
                  <audio
                    ref={audioRef}
                    onEnded={() => setAudioState("idle")}
                    onPlay={() => setAudioState("playing")}
                  />
                </div>

                {/* Recite */}
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-ivory)] mb-3">
                    Step 2: Recite
                  </h4>
                  <div className="space-y-3">
                    <button
                      onClick={isReciting ? stopVoicePractice : startVoicePractice}
                      className={`w-full px-6 py-4 font-semibold rounded-sm transition-all ${
                        isReciting
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-[var(--color-purple-accent)] text-white hover:bg-[var(--color-purple-accent)]/90"
                      }`}
                    >
                      {isReciting ? "Stop Recitation" : "Start Voice Recording"}
                    </button>

                    {isReciting && (
                      <div className="text-center py-4">
                        <div className="inline-block animate-pulse">
                          <div className="w-4 h-4 bg-red-600 rounded-full" />
                        </div>
                        <p className="text-xs text-[var(--color-bone)]/60 mt-2">
                          Listening...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mantra Details */}
            <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-8 space-y-6">
              <div>
                <h4 className="text-sm uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-3">
                  Why Recite?
                </h4>
                <p className="text-[var(--color-bone)]/85 leading-relaxed">
                  {selectedMantra.whyRecite}
                </p>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-3">
                  Benefits
                </h4>
                <ul className="space-y-2">
                  {(Array.isArray(selectedMantra.benefits) ? selectedMantra.benefits : [])?.map((benefit: any, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[var(--color-bone)]/75"
                    >
                      <span className="text-[var(--color-gold)] flex-shrink-0">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-2">
                    Frequency
                  </div>
                  <div className="text-lg font-display text-[var(--color-gold-bright)]">
                    {selectedMantra.frequency} times
                  </div>
                  <div className="text-xs text-[var(--color-bone)]/60">
                    per session
                  </div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-2">
                    Duration
                  </div>
                  <div className="text-lg font-display text-[var(--color-gold-bright)]">
                    {selectedMantra.duration} mins
                  </div>
                  <div className="text-xs text-[var(--color-bone)]/60">
                    per session
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm uppercase tracking-wide text-[var(--color-gold)] font-semibold mb-3">
                  Visualizations
                </h4>
                <div className="space-y-2">
                  {(Array.isArray(selectedMantra.visualizations) ? selectedMantra.visualizations : [])?.map((viz: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-sm bg-[var(--color-stone)]/30 border border-[var(--hairline)]"
                    >
                      <p className="text-sm text-[var(--color-bone)]/75 italic">
                        {viz}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
