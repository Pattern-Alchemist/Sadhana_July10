"use client";

import { useState } from "react";
import Link from "next/link";

export interface ConstellationNode {
  id: string;
  label: string;
  slug?: string;
  kind: "core" | "branch";
}

export interface ConstellationEdge {
  from: string;
  to: string;
}

export default function Constellation({
  nodes,
  edges,
}: {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const W = 520;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;

  const ring = nodes.filter((n) => n.kind === "branch");
  const core = nodes.find((n) => n.kind === "core");

  const pos = (id: string) => {
    if (id === core?.id) return { x: cx, y: cy };
    const i = ring.findIndex((n) => n.id === id);
    const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
    const r = 132;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.62 };
  };

  const connected = (id: string) =>
    edges
      .filter((e) => e.from === id || e.to === id)
      .map((e) => (e.from === id ? e.to : e.from));

  const isLinked = (id: string) =>
    !active || active === id || connected(active).includes(id);

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* edges */}
        {edges.map((e, i) => {
          const a = pos(e.from);
          const b = pos(e.to);
          const lit = active && (e.from === active || e.to === active);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={lit ? "var(--color-gold-bright)" : "var(--color-gold)"}
              strokeWidth={lit ? 1.2 : 0.5}
              opacity={lit ? 0.9 : 0.22}
              style={{ transition: "all 0.3s ease" }}
            />
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
          const p = pos(n.id);
          const linked = isLinked(n.id);
          const isActive = active === n.id;
          const r = n.kind === "core" ? 13 : 8;
          const content = (
            <g
              key={n.id}
              transform={`translate(${p.x},${p.y})`}
              style={{ cursor: "pointer", transition: "opacity 0.3s ease" }}
              opacity={linked ? 1 : 0.25}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => n.slug && (window.location.href = `/siddhi/${n.slug}`)}
            >
              <circle
                r={r + 6}
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth={0.5}
                opacity={isActive ? 0.7 : 0.2}
              />
              <circle
                r={r}
                fill={isActive ? "var(--color-gold-bright)" : "var(--color-charcoal)"}
                stroke="var(--color-gold-bright)"
                strokeWidth={1}
                style={{ transition: "all 0.3s ease" }}
              />
              {n.kind === "core" && (
                <text
                  textAnchor="middle"
                  dy="0.32em"
                  fontSize="13"
                  fill="var(--color-obsidian)"
                  fontWeight={700}
                >
                  ✦
                </text>
              )}
              <text
                y={r + 16}
                textAnchor="middle"
                fontSize="10.5"
                fill={linked ? "var(--color-bone)" : "var(--color-bone)"}
                opacity={linked ? 0.95 : 0.4}
                className="font-body"
              >
                {n.label}
              </text>
            </g>
          );
          return content;
        })}
      </svg>
      <p className="mt-2 text-center text-xs italic text-[var(--color-bone)]/50">
        Hover a node to trace its living connections.
      </p>
    </div>
  );
}
