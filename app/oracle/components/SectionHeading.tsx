import { motion } from "framer-motion";

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }: Props) {
  const centered = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col gap-3 ${centered ? "items-center text-center" : "items-start text-left"}`}
    >
      <div className={`flex items-center gap-3 ${centered ? "" : ""}`}>
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-600" />
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-gold-500">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-600" />
      </div>
      <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight text-parchment parchment-shadow sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-1 max-w-2xl font-serif text-lg italic leading-relaxed text-mist`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
