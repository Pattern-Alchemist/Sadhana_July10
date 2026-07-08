"use client";

import { useState, useRef, useEffect } from "react";
import { OmGlyph } from "@/components/Symbols";

interface SoundSource {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  volume: number;
  oscillators?: OscillatorNode[];
  gainNode?: GainNode;
  noiseSource?: AudioBufferSourceNode;
}

const SOUND_PRESETS = [
  { id: "tanpura", name: "Tanpura Drone", icon: "🪕", freqs: [130.81, 164.81, 196.00, 261.63] }, // C3 E3 G3 C4
  { id: "rain", name: "Rain", icon: "🌧️" },
  { id: "fire", name: "Fire", icon: "🔥" },
  { id: "bells", name: "Temple Bells", icon: "🔔", freqs: [523.25, 659.25, 783.99] }, // C5 E5 G5
  { id: "om", name: "Oṃ Drone", icon: "🕉️", freqs: [136.10] }, // C#3 — Om frequency
];

export default function AmbiencePage() {
  const [sources, setSources] = useState<SoundSource[]>(
    SOUND_PRESETS.map((s) => ({ ...s, enabled: false, volume: 0.3 }))
  );
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<Record<string, { oscillators?: OscillatorNode[]; gainNode?: GainNode; noiseSource?: AudioBufferSourceNode }>>({});

  // Initialize audio context on first interaction
  function ensureAudioCtx(): AudioContext {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }

  // Generate white noise buffer for rain/fire
  function createNoiseBuffer(ctx: AudioContext, type: "white" | "brown" | "pink" = "white"): AudioBuffer {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    if (type === "brown") {
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (last + 0.02 * white) / 1.02;
        last = data[i];
        data[i] *= 3.5;
      }
    } else {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    }
    return buffer;
  }

  function toggleSource(id: string) {
    setSources((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const newEnabled = !s.enabled;
        if (newEnabled) {
          startSound(s);
        } else {
          stopSound(id);
        }
        return { ...s, enabled: newEnabled };
      })
    );
  }

  function startSound(source: SoundSource) {
    const ctx = ensureAudioCtx();
    const preset = SOUND_PRESETS.find((p) => p.id === source.id)!;
    const gainNode = ctx.createGain();
    gainNode.gain.value = source.volume;
    gainNode.connect(ctx.destination);

    if (preset.freqs) {
      // Oscillator-based drone
      const oscillators = preset.freqs.map((freq) => {
        const osc = ctx.createOscillator();
        osc.frequency.value = freq;
        osc.type = source.id === "bells" ? "triangle" : "sine";
        osc.connect(gainNode);
        osc.start();
        return osc;
      });
      // For bells, add slow amplitude modulation
      if (source.id === "bells") {
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.2;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.15;
        lfo.connect(lfoGain);
        lfoGain.connect(gainNode.gain);
        lfo.start();
        oscillators.push(lfo);
      }
      activeNodesRef.current[source.id] = { oscillators, gainNode };
    } else if (source.id === "rain") {
      // White noise filtered for rain sound
      const noiseBuffer = createNoiseBuffer(ctx, "white");
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 800;
      noiseSource.connect(filter);
      filter.connect(gainNode);
      noiseSource.start();
      activeNodesRef.current[source.id] = { noiseSource, gainNode };
    } else if (source.id === "fire") {
      // Brown noise for fire crackle
      const noiseBuffer = createNoiseBuffer(ctx, "brown");
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 500;
      noiseSource.connect(filter);
      filter.connect(gainNode);
      noiseSource.start();
      activeNodesRef.current[source.id] = { noiseSource, gainNode };
    }
  }

  function stopSound(id: string) {
    const nodes = activeNodesRef.current[id];
    if (!nodes) return;
    if (nodes.oscillators) {
      nodes.oscillators.forEach((osc) => {
        try { osc.stop(); } catch {}
      });
    }
    if (nodes.noiseSource) {
      try { nodes.noiseSource.stop(); } catch {}
    }
    if (nodes.gainNode) {
      nodes.gainNode.disconnect();
    }
    delete activeNodesRef.current[id];
  }

  function setVolume(id: string, vol: number) {
    setSources((prev) => prev.map((s) => (s.id === id ? { ...s, volume: vol } : s)));
    const nodes = activeNodesRef.current[id];
    if (nodes?.gainNode) {
      nodes.gainNode.gain.value = vol;
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.keys(activeNodesRef.current).forEach((id) => stopSound(id));
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const activeCount = sources.filter((s) => s.enabled).length;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Generated in Browser · No Audio Files
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Practice Ambience
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Mix ambient sounds for your practice. All sounds generated in real-time — no downloads, no files.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sources.map((source) => (
          <div
            key={source.id}
            className={`rounded-sm border p-4 transition motion-safe motion-reduce:transition-none ${
              source.enabled
                ? "border-[var(--color-gold)]/50 bg-[var(--color-gold)]/5"
                : "border-[var(--color-hairline)] bg-[var(--color-ink)]/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleSource(source.id)}
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border text-2xl transition motion-safe:active:scale-95 ${
                  source.enabled
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15"
                    : "border-[var(--color-hairline)]"
                }`}
              >
                {source.icon}
              </button>
              <div className="flex-1">
                <p className="font-display text-sm text-[var(--color-ivory)]">{source.name}</p>
                <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
                  {source.enabled ? "Playing" : "Off"}
                </p>
              </div>
            </div>
            {source.enabled && (
              <div className="mt-3">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={source.volume}
                  onChange={(e) => setVolume(source.id, parseFloat(e.target.value))}
                  className="w-full accent-[var(--color-gold)]"
                />
                <div className="flex justify-between text-[0.4rem] uppercase tracking-luxe text-[var(--color-bone)]/35">
                  <span>Vol</span>
                  <span>{Math.round(source.volume * 100)}%</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {activeCount > 0 && (
        <div className="mt-6 rounded-sm border border-[var(--color-gold)]/30 bg-[var(--color-ink)]/60 p-4 text-center">
          <p className="text-xs text-[var(--color-gold)]/80">
            {activeCount} sound{activeCount > 1 ? "s" : ""} active · Tap to toggle · Adjust volume per source
          </p>
          <button
            onClick={() => {
              sources.forEach((s) => s.enabled && stopSound(s.id));
              setSources((prev) => prev.map((s) => ({ ...s, enabled: false })));
            }}
            className="mt-2 text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/60 transition hover:text-[var(--color-rose-accent)]"
          >
            Stop All
          </button>
        </div>
      )}

      <p className="mt-4 text-center text-xs text-[var(--color-bone)]/45">
        Tanpura drone: C-E-G-C · Oṃ drone: C# (136.10 Hz) · Rain: filtered white noise · Fire: filtered brown noise · Bells: C-E-G with amplitude modulation
      </p>
    </div>
  );
}
