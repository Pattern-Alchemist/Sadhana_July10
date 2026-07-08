import { FlourishDivider } from "./Symbols";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-[var(--hairline)]">
      <div className="cosmos-dots absolute inset-0 opacity-30" />
      <div className="content-z relative mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
        <span className="fade-up text-[0.62rem] uppercase tracking-luxe text-[var(--color-gold)]">
          {eyebrow}
        </span>
        <h1 className="fade-up mt-4 font-display text-4xl leading-tight text-balance text-[var(--color-ivory)] sm:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="fade-up mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-bone)]/75">
            {subtitle}
          </p>
        )}
        <FlourishDivider className="mt-8" />
      </div>
    </header>
  );
}
