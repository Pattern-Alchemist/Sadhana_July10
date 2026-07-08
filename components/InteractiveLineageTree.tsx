"use client";

import { useState } from "react";
import type { LineageNode } from "@/lib/lineage";

/**
 * InteractiveLineageTree — expand/collapse tree with motion-system animations.
 *
 * Each node can be expanded or collapsed to show/hide its children.
 * Uses the accordion pattern from the motion system spec (220ms, ease-decelerated).
 * Default state: top-level expanded, deeper levels collapsed.
 */
export default function InteractiveLineageTree({
  node,
  depth = 0,
  defaultExpanded = true,
}: {
  node: LineageNode;
  depth?: number;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li className="relative pl-6 sm:pl-8">
      {/* connector lines */}
      <span className="absolute left-0 top-3 h-px w-4 bg-[var(--color-gold)]/40 sm:w-6" />
      <span className="absolute left-0 top-0 h-3 w-px bg-[var(--color-gold)]/40" />

      <div className="rounded-sm border border-[var(--hairline)] bg-[var(--color-ink)]/50 p-3 sm:p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            {hasChildren && (
              <button
                onClick={() => setExpanded((e) => !e)}
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[var(--color-gold)]/30 text-[var(--color-gold-bright)] transition motion-safe motion-reduce:transition-none hover:border-[var(--color-gold)]/60"
                aria-label={expanded ? "Collapse" : "Expand"}
                aria-expanded={expanded}
              >
                <span
                  className="text-[0.7rem] transition motion-safe"
                  style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  ▶
                </span>
              </button>
            )}
            <h4
              className="font-display text-base sm:text-xl"
              style={{
                color: depth === 0 ? "var(--color-gold-bright)" : "var(--color-ivory)",
              }}
            >
              {node.label}
            </h4>
          </div>
          <span className="text-[0.55rem] uppercase tracking-luxe text-[var(--color-gold)] sm:text-[0.58rem]">
            {node.era}
          </span>
        </div>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-bone)]/75 sm:text-sm">
          {node.detail}
        </p>
      </div>

      {/* Children — accordion pattern from motion system spec */}
      {hasChildren && (
        <ul
          className={`mt-2 space-y-2 border-l border-[var(--color-gold)]/20 transition motion-safe motion-reduce:transition-none ${
            expanded ? "accordion-expanded" : "accordion-collapsed"
          }`}
          style={{
            maxHeight: expanded ? "5000px" : "0",
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
          }}
        >
          {node.children!.map((c) => (
            <InteractiveLineageTree
              key={c.id}
              node={c}
              depth={depth + 1}
              defaultExpanded={false}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
