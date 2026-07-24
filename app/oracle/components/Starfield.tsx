interface Star {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
  bright: boolean;
}

function seededUnit(index: number, salt: number): number {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

const STARS: Star[] = Array.from({ length: 140 }, (_, i) => {
  const bright = seededUnit(i, 1) > 0.86;
  return {
    top: `${seededUnit(i, 2) * 100}%`,
    left: `${seededUnit(i, 3) * 100}%`,
    size: bright ? seededUnit(i, 4) * 2 + 2 : seededUnit(i, 5) * 1.6 + 0.5,
    delay: `${seededUnit(i, 6) * 6}s`,
    duration: `${seededUnit(i, 7) * 4 + 3}s`,
    bright,
  };
});

export default function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#1a1340_0%,#0b0918_45%,#060510_100%)]" />

      {/* Drifting nebulae */}
      <div className="animate-drift absolute -left-32 top-0 h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,rgba(124,77,255,0.22),transparent_65%)] blur-3xl" />
      <div
        className="animate-drift absolute right-[-10%] top-[20%] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(95,211,196,0.16),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="animate-drift absolute bottom-[-15%] left-[20%] h-[65vh] w-[65vh] rounded-full bg-[radial-gradient(circle,rgba(232,133,92,0.14),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-15s" }}
      />

      {/* Stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.bright ? "#fbf2cf" : "#dcd2ee",
            boxShadow: s.bright
              ? "0 0 6px 1px rgba(251,242,207,0.8)"
              : "0 0 3px rgba(220,210,238,0.5)",
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}

      {/* Faint film grain */}
      <div className="grain absolute inset-0 opacity-[0.04] mix-blend-overlay" />
    </div>
  );
}
