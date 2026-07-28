import VoiceCommandRecorder from '@/components/VoiceCommandRecorder';

export const metadata = {
  title: 'Voice Commands',
  description: 'Speak commands naturally to navigate and control AstroKalki',
};

export default function VoiceCommandPage() {
  return (
    <div className="min-h-screen bg-[var(--color-obsidian)]">
      {/* Hero Section */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-24 border-b border-[var(--hairline)]">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-gold-bright)] mb-4">
            Voice Command Interface
          </h1>
          <p className="font-serif text-lg italic text-[var(--color-bone)]/80 mb-6">
            Like v0's voice-to-action interface. Record your steps, transcribe automatically, and watch the app respond to your words in real-time.
          </p>
          <p className="text-sm text-[var(--color-bone)]/60">
            Hands-free navigation and control—just speak naturally
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <VoiceCommandRecorder />

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
            <div className="text-2xl mb-3">🎤</div>
            <h3 className="font-display text-lg text-[var(--color-gold-bright)] mb-2">Record Steps</h3>
            <p className="text-sm text-[var(--color-bone)]/70">
              Press the microphone and speak. Your words are captured in real-time with live transcription.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
            <div className="text-2xl mb-3">✨</div>
            <h3 className="font-display text-lg text-[var(--color-gold-bright)] mb-2">Automatic Recognition</h3>
            <p className="text-sm text-[var(--color-bone)]/70">
              The app understands your intent—search queries, navigation commands, and practice selections.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--hairline)] bg-[var(--color-ink)]/40 p-6">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="font-display text-lg text-[var(--color-gold-bright)] mb-2">Instant Action</h3>
            <p className="text-sm text-[var(--color-bone)]/70">
              Commands execute immediately—navigate pages, start practices, or launch tools with voice.
            </p>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-12 rounded-lg border border-[var(--hairline)] bg-[var(--color-ink)]/60 p-8">
          <h2 className="font-display text-2xl text-[var(--color-gold-bright)] mb-6">
            Common Commands
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm uppercase tracking-wider text-[var(--color-gold)]/80 mb-3">Navigation</h3>
              <ul className="text-sm text-[var(--color-bone)]/70 space-y-1">
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Open archive"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Show locations"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Go to glossary"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Consult the oracle"</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-[var(--color-gold)]/80 mb-3">Practice</h3>
              <ul className="text-sm text-[var(--color-bone)]/70 space-y-1">
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Start meditation"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Begin japa mala"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Open breath work"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Start recording"</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-[var(--color-gold)]/80 mb-3">Cosmic Guidance</h3>
              <ul className="text-sm text-[var(--color-bone)]/70 space-y-1">
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Show me a random practice"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Let the universe choose"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"What should I practice?"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Roll the cosmic dice"</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-wider text-[var(--color-gold)]/80 mb-3">Search & Learn</h3>
              <ul className="text-sm text-[var(--color-bone)]/70 space-y-1">
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Search for Kali"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Find Tara Sadhana"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"What does Om mean?"</li>
                <li className="flex gap-2"><span className="text-[var(--color-gold)]">•</span>"Show me the learning path"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Browser Support */}
        <div className="mt-12 rounded-lg border border-amber-700/20 bg-amber-950/10 p-6">
          <h3 className="text-sm uppercase tracking-wider text-amber-300/90 mb-2">Browser Compatibility</h3>
          <p className="text-sm text-amber-100/80">
            Voice commands work best in Chrome, Edge, and Safari. Firefox has limited support. Make sure microphone permissions are enabled in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}
