"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TONES = ["Curiosity", "Reverence", "Commitment", "Accomplishment", "Honest doubt"];

export default function ReflectionComposer({
  siddhiOptions,
}: {
  siddhiOptions: { slug: string; name: string }[];
}) {
  const router = useRouter();
  const [penName, setPenName] = useState("");
  const [siddhiSlug, setSiddhiSlug] = useState(siddhiOptions[0]?.slug ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tone, setTone] = useState(TONES[0]);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          penName: penName.trim() || "anonymous reader",
          siddhiSlug,
          title: title.trim(),
          body: body.trim(),
          tone,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setTitle("");
      setBody("");
      setPenName("");
      router.refresh();
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-6">
      <h3 className="font-display text-2xl text-[var(--color-gold-bright)]">
        Inscribe a Reflection
      </h3>
      <p className="mt-1 text-sm italic text-[var(--color-bone)]/60">
        A private record of your contemplation — honest over certain. Honesty is
        the archive&apos;s first discipline.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
            Pen name
          </label>
          <input
            className="field"
            placeholder="anonymous reader"
            value={penName}
            onChange={(e) => setPenName(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
            Concerning
          </label>
          <select
            className="field"
            value={siddhiSlug}
            onChange={(e) => setSiddhiSlug(e.target.value)}
          >
            {siddhiOptions.map((s) => (
              <option key={s.slug} value={s.slug} className="bg-[var(--color-ink)]">
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
          Title
        </label>
        <input
          className="field"
          placeholder="A short heading for this entry…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
          Reflection
        </label>
        <textarea
          className="field min-h-[120px] resize-y"
          placeholder="What did you notice? What did the text disclose? Record, do not embellish…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-[0.58rem] uppercase tracking-luxe text-[var(--color-bone)]/55">
          Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={`border px-3 py-1.5 text-xs tracking-wide-sm transition ${
                tone === t
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]/15 text-[var(--color-gold-bright)]"
                  : "border-[var(--hairline)] text-[var(--color-bone)]/65 hover:text-[var(--color-ivory)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button type="submit" className="btn-gold" disabled={status === "saving"}>
          {status === "saving" ? "Inscribing…" : "Inscribe"}
        </button>
        {status === "done" && (
          <span className="text-sm text-[var(--color-sage)]">✓ Recorded in the timeline.</span>
        )}
        {status === "error" && (
          <span className="text-sm text-[var(--color-rose-accent)]">Could not save. Try again.</span>
        )}
      </div>
    </form>
  );
}
