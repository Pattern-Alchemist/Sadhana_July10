/**
 * Sacred Audio Manager
 * =====================
 * Lightweight browser-native audio for ritual cues.
 *
 * Provides optional ritual sounds:
 * - tap bell (contact, press)
 * - hold hum / charge tone (press-and-hold)
 * - release shimmer (release / completion)
 * - completion chime (ritual step complete)
 *
 * Features:
 * - User-controlled (always optional, never required)
 * - Respects mute / low-distraction mode
 * - Graceful fallback when not supported
 * - Mobile-friendly (no autoplay blocker issues)
 * - Free-to-ship (Web Audio API only, no external sounds)
 */

/**
 * Audio capability detection.
 * Returns false if Web Audio is not available.
 */
export function canPlayAudio(): boolean {
  if (typeof window === "undefined") return false;

  const audioContext =
    window.AudioContext ||
    (window as any).webkitAudioContext ||
    (window as any).mozAudioContext;

  return !!audioContext;
}

/**
 * Ritual sound type
 */
export type RitualSoundType =
  | "bell-tap"
  | "hum-start"
  | "hum-charge"
  | "shimmer-release"
  | "chime-complete";

/**
 * Audio settings
 */
export interface AudioSettings {
  /** Master volume (0-1) */
  masterVolume: number;
  /** Enabled sounds per type */
  enabledSounds: Partial<Record<RitualSoundType, boolean>>;
  /** Fade-in duration (ms) for sustain tones */
  fadeInMs: number;
  /** Fade-out duration (ms) for release */
  fadeOutMs: number;
}

/**
 * Default audio settings
 */
export const DEFAULT_AUDIO_SETTINGS: AudioSettings = {
  masterVolume: 0.3, // Start quiet, user can raise
  enabledSounds: {
    "bell-tap": true,
    "hum-start": true,
    "hum-charge": true,
    "shimmer-release": true,
    "chime-complete": true,
  },
  fadeInMs: 150,
  fadeOutMs: 200,
};

/**
 * AudioManager — singleton managing all ritual sounds.
 * Automatically detects Web Audio support and provides graceful fallback.
 */
export class AudioManager {
  private audioContext: AudioContext | null = null;
  private settings: AudioSettings;
  private activeOscillators: Map<string, OscillatorNode> = new Map();
  private muted = false;

  constructor(initialSettings: Partial<AudioSettings> = {}) {
    this.settings = { ...DEFAULT_AUDIO_SETTINGS, ...initialSettings };

    // Initialize audio context on first user interaction (avoid autoplay issues)
    if (canPlayAudio()) {
      this.lazyInitAudioContext();
    }
  }

  /**
   * Lazy-initialize AudioContext on first interaction.
   * Mobile browsers require user gesture to start AudioContext.
   */
  private lazyInitAudioContext() {
    if (this.audioContext) return;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as any).webkitAudioContext ||
        (window as any).mozAudioContext;

      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    } catch (e) {
      console.error("[AudioManager] Failed to initialize AudioContext:", e);
    }
  }

  /**
   * Ensure AudioContext is ready
   */
  private ensureContext(): AudioContext | null {
    if (!this.audioContext && canPlayAudio()) {
      this.lazyInitAudioContext();
    }
    return this.audioContext;
  }

  /**
   * Set master volume
   */
  setMasterVolume(volume: number) {
    this.settings.masterVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Toggle specific sound type
   */
  enableSound(sound: RitualSoundType, enabled: boolean) {
    this.settings.enabledSounds[sound] = enabled;
  }

  /**
   * Mute all audio
   */
  setMuted(muted: boolean) {
    this.muted = muted;
    // Stop all active sounds
    if (muted) {
      this.stopAllSounds();
    }
  }

  /**
   * Check if a sound is enabled
   */
  isSoundEnabled(sound: RitualSoundType): boolean {
    if (this.muted) return false;
    return this.settings.enabledSounds[sound] ?? true;
  }

  /**
   * Play a ritual sound
   */
  async playSound(type: RitualSoundType): Promise<void> {
    if (this.muted || !this.isSoundEnabled(type)) return;

    const ctx = this.ensureContext();
    if (!ctx) return;

    try {
      switch (type) {
        case "bell-tap":
          this.playBellTap(ctx);
          break;
        case "hum-start":
          this.playHumStart(ctx);
          break;
        case "hum-charge":
          this.playHumCharge(ctx);
          break;
        case "shimmer-release":
          this.playShimmerRelease(ctx);
          break;
        case "chime-complete":
          this.playChimeComplete(ctx);
          break;
      }
    } catch (e) {
      console.error("[AudioManager] Error playing sound:", type, e);
    }
  }

  /**
   * Stop a specific sound by ID
   */
  stopSound(soundId: string) {
    const osc = this.activeOscillators.get(soundId);
    if (osc) {
      try {
        osc.stop();
      } catch {
        // Already stopped
      }
      this.activeOscillators.delete(soundId);
    }
  }

  /**
   * Stop all active sounds
   */
  stopAllSounds() {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
      } catch {
        // Already stopped
      }
    });
    this.activeOscillators.clear();
  }

  /**
   * Play bell tap (contact feedback)
   * Sharp, brief, high-pitched tone
   */
  private playBellTap(ctx: AudioContext) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // High bell-like frequency
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);

    // Sharp attack, quick decay
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(
      this.settings.masterVolume * 0.6,
      now + 0.02,
    );
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Play hum start (start hold)
   * Warm, present tone - beginning of charge
   */
  private playHumStart(ctx: AudioContext) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Warm fundamental
    osc.frequency.setValueAtTime(128, now);

    // Smooth fade-in
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(
      this.settings.masterVolume * 0.4,
      now + this.settings.fadeInMs / 1000,
    );

    const soundId = `hum-start-${now}`;
    osc.start(now);

    // Auto-stop after 1 second
    setTimeout(() => {
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + this.settings.fadeOutMs / 1000,
      );
      osc.stop(ctx.currentTime + this.settings.fadeOutMs / 1000);
      this.activeOscillators.delete(soundId);
    }, 1000);

    this.activeOscillators.set(soundId, osc);
  }

  /**
   * Play hum charge (holding/charging)
   * Slightly higher, building energy
   */
  private playHumCharge(ctx: AudioContext) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Slightly higher pitch (3rd harmonic)
    osc.frequency.setValueAtTime(192, now);
    osc.frequency.linearRampToValueAtTime(224, now + 0.5); // Slight rise

    // Build presence
    gain.gain.setValueAtTime(this.settings.masterVolume * 0.3, now);
    gain.gain.linearRampToValueAtTime(
      this.settings.masterVolume * 0.5,
      now + 0.2,
    );

    const soundId = `hum-charge-${now}`;
    osc.start(now);

    // Continue until stopped externally or timeout
    setTimeout(() => {
      try {
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          ctx.currentTime + this.settings.fadeOutMs / 1000,
        );
        osc.stop(ctx.currentTime + this.settings.fadeOutMs / 1000);
      } catch {
        // Already stopped
      }
      this.activeOscillators.delete(soundId);
    }, 3000);

    this.activeOscillators.set(soundId, osc);
  }

  /**
   * Play shimmer release (offering release)
   * Bright, sparkling descent
   */
  private playShimmerRelease(ctx: AudioContext) {
    const now = ctx.currentTime;

    // Create a series of descending tones (shimmer effect)
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Descending overtones
      const startFreq = 800 - i * 150;
      const endFreq = 400 - i * 100;

      osc.frequency.setValueAtTime(startFreq, now + i * 0.05);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + i * 0.05 + 0.2);

      gain.gain.setValueAtTime(0, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(
        this.settings.masterVolume * 0.4,
        now + i * 0.05 + 0.05,
      );
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.05 + 0.25);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.25);
    }
  }

  /**
   * Play completion chime (ritual step complete)
   * Triumphant, resonant tone
   */
  private playChimeComplete(ctx: AudioContext) {
    const now = ctx.currentTime;

    // Fundamental
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.frequency.setValueAtTime(256, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(
      this.settings.masterVolume * 0.6,
      now + 0.08,
    );
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

    osc1.start(now);
    osc1.stop(now + 0.8);

    // 5th harmonic (resonance)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.frequency.setValueAtTime(640, now + 0.05);
    gain2.gain.setValueAtTime(0, now + 0.05);
    gain2.gain.linearRampToValueAtTime(
      this.settings.masterVolume * 0.3,
      now + 0.1,
    );
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

    osc2.start(now + 0.05);
    osc2.stop(now + 0.75);
  }
}

/**
 * Singleton instance
 */
let audioManagerInstance: AudioManager | null = null;

/**
 * Get the audio manager singleton
 */
export function getAudioManager(
  initialSettings?: Partial<AudioSettings>,
): AudioManager {
  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManager(initialSettings);
  }
  return audioManagerInstance;
}
