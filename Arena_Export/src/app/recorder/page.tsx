"use client";

import { useState, useRef } from "react";
import { useVaultData } from "@/components/useVaultData";
import { OmGlyph } from "@/components/Symbols";

interface Recording {
  id: string;
  name: string;
  date: string;
  duration: number;
  blob: string; // base64-encoded audio
  size: number;
}

export default function RecorderPage() {
  const { data: recordings, setData: setRecordings } = useVaultData<Recording[]>("recordings", []);
  const [recording, setRecording] = useState(false);
  const [name, setName] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          const recording: Recording = {
            id: crypto.randomUUID(),
            name: name || `Recitation ${new Date().toLocaleDateString()}`,
            date: new Date().toISOString().slice(0, 10),
            duration: elapsed,
            blob: base64,
            size: blob.size,
          };
          setRecordings((prev) => [recording, ...prev]);
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } catch (err) {
      alert("Microphone access denied. Please allow microphone access to record.");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function deleteRecording(id: string) {
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  }

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <header className="fade-up mb-8 text-center">
        <div className="mb-4 text-[var(--color-gold)]/60">
          <OmGlyph style={{ fontSize: "1.8rem" }} />
        </div>
        <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.6rem]">
          Encrypted · Local Only · No Uploads
        </span>
        <h1 className="mt-2 font-display text-2xl text-[var(--color-ivory)] sm:text-3xl">
          Mantra Recorder
        </h1>
        <p className="mt-2 text-xs text-[var(--color-bone)]/65 sm:text-sm">
          Record your mantra recitation for self-assessment. All recordings AES-256 encrypted, stored only on this device.
        </p>
      </header>

      <div className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-6 text-center sm:p-8">
        {/* Record button */}
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`mx-auto grid h-32 w-32 place-items-center rounded-full border-2 transition motion-safe:active:scale-95 sm:h-36 sm:w-36 ${
            recording
              ? "border-[var(--color-rose-accent)] bg-[var(--color-rose-accent)]/10"
              : "border-[var(--color-gold)] bg-gradient-to-b from-[var(--color-gold)]/20 to-[var(--color-gold-deep)]/10"
          }`}
        >
          {recording ? (
            <div>
              <div className="mx-auto h-8 w-8 rounded-sm bg-[var(--color-rose-accent)]" />
              <p className="mt-2 text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]">Stop</p>
              <p className="text-sm text-[var(--color-ivory)] tabular-nums">{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</p>
            </div>
          ) : (
            <div>
              <span className="font-display text-2xl text-[var(--color-gold-bright)]">●</span>
              <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/55">Record</p>
            </div>
          )}
        </button>

        {!recording && (
          <div className="mt-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Recording name (optional)"
              className="field text-sm"
            />
          </div>
        )}
      </div>

      {/* Recordings list */}
      {recordings.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-display text-lg text-[var(--color-gold-bright)]">Your Recordings</h2>
          <div className="space-y-3">
            {recordings.map((r) => (
              <div key={r.id} className="rounded-sm border border-[var(--color-hairline)] bg-[var(--color-ink)]/40 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <p className="text-sm text-[var(--color-ivory)]">{r.name}</p>
                    <p className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-bone)]/45">
                      {new Date(r.date).toLocaleDateString()} · {Math.floor(r.duration / 60)}:{String(r.duration % 60).padStart(2, "0")} · {(r.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <button onClick={() => deleteRecording(r.id)} className="text-[0.5rem] uppercase tracking-luxe text-[var(--color-rose-accent)]/60 transition hover:text-[var(--color-rose-accent)]">
                    Delete
                  </button>
                </div>
                <audio controls src={r.blob} className="mt-2 w-full" style={{ filter: "invert(0.85) hue-rotate(180deg)" }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
