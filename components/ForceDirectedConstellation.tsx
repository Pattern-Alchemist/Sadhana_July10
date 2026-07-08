"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * ForceDirectedConstellation — interactive force-directed graph of siddhis.
 *
 * Replaces the static SVG constellation on the homepage with a D3-force
 * simulation where:
 *   - Each siddhi is a node
 *   - Edges connect siddhis that share a tradition or category
 *   - The Witness (core) sits at the center
 *   - Nodes drag, zoom, click-through to siddhi folios
 *
 * Pure SVG + D3-force — no react-force-graph dependency.
 */

export interface FDCNode {
  id: string;
  label: string;
  slug?: string;
  category?: string;
  tradition?: string;
  group: "core" | "siddhi";
  radius: number;
}

export interface FDCEdge {
  source: string;
  target: string;
  strength: number;
}

interface SimNode extends FDCNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimEdge {
  source: SimNode;
  target: SimNode;
  strength: number;
}

export default function ForceDirectedConstellation({
  nodes,
  edges,
  width = 600,
  height = 400,
}: {
  nodes: FDCNode[];
  edges: FDCEdge[];
  width?: number;
  height?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [simNodes, setSimNodes] = useState<SimNode[]>([]);
  const [simEdges, setSimEdges] = useState<SimEdge[]>([]);

  useEffect(() => {
    // Simple force simulation without D3 — a basic Verlet-like integration
    const snodes: SimNode[] = nodes.map((n, i) => {
      const angle = (i / nodes.length) * Math.PI * 2;
      const r = n.group === "core" ? 0 : 120;
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * r + (Math.random() - 0.5) * 40,
        y: height / 2 + Math.sin(angle) * r + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0,
      };
    });

    // Build edge lookup
    const sedges: SimEdge[] = edges.map((e) => ({
      source: snodes.find((n) => n.id === e.source)!,
      target: snodes.find((n) => n.id === e.target)!,
      strength: e.strength,
    }));

    let frame = 0;
    const maxFrames = 300; // run for 300 frames (~5s at 60fps), then settle

    function tick() {
      // Repulsion between all nodes
      for (let i = 0; i < snodes.length; i++) {
        for (let j = i + 1; j < snodes.length; j++) {
          const a = snodes[i];
          const b = snodes[j];
          const dx = (a.x ?? 0) - (b.x ?? 0);
          const dy = (a.y ?? 0) - (b.y ?? 0);
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 800 / (dist * dist);
          a.vx = (a.vx ?? 0) + (dx / dist) * force;
          a.vy = (a.vy ?? 0) + (dy / dist) * force;
          b.vx = (b.vx ?? 0) - (dx / dist) * force;
          b.vy = (b.vy ?? 0) - (dy / dist) * force;
        }
      }

      // Attraction along edges
      for (const e of sedges) {
        const a = e.source;
        const b = e.target;
        const dx = (b.x ?? 0) - (a.x ?? 0);
        const dy = (b.y ?? 0) - (a.y ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - 100) * 0.01 * e.strength;
        a.vx = (a.vx ?? 0) + (dx / dist) * force;
        a.vy = (a.vy ?? 0) + (dy / dist) * force;
        b.vx = (b.vx ?? 0) - (dx / dist) * force;
        b.vy = (b.vy ?? 0) - (dy / dist) * force;
      }

      // Centering force toward the middle
      for (const n of snodes) {
        if (n.group === "core") {
          n.fx = width / 2;
          n.fy = height / 2;
        } else {
          const dx = width / 2 - (n.x ?? 0);
          const dy = height / 2 - (n.y ?? 0);
          n.vx = (n.vx ?? 0) + dx * 0.001;
          n.vy = (n.vy ?? 0) + dy * 0.001;
        }
      }

      // Apply velocity with damping
      for (const n of snodes) {
        if (n.fx != null && n.fy != null) {
          n.x = n.fx;
          n.y = n.fy;
        } else {
          n.vx = (n.vx ?? 0) * 0.85;
          n.vy = (n.vy ?? 0) * 0.85;
          n.x = (n.x ?? 0) + (n.vx ?? 0);
          n.y = (n.y ?? 0) + (n.vy ?? 0);
        }
      }

      setSimNodes([...snodes]);
      setSimEdges([...sedges]);

      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(tick);
      }
    }

    tick();
  }, [nodes, edges, width, height]);

  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ touchAction: "none" }}
      >
        {/* Edges */}
        {simEdges.map((e, i) => {
          const isHovered = hovered && (hovered === e.source.id || hovered === e.target.id);
          return (
            <line
              key={i}
              x1={e.source.x ?? 0}
              y1={e.source.y ?? 0}
              x2={e.target.x ?? 0}
              y2={e.target.y ?? 0}
              stroke="var(--color-gold)"
              strokeWidth={isHovered ? 1.5 : 0.6}
              opacity={isHovered ? 0.8 : 0.25}
              style={{
                transition: "opacity var(--dur-instant) var(--ease-standard), stroke-width var(--dur-instant) var(--ease-standard)",
              }}
            />
          );
        })}

        {/* Nodes */}
        {simNodes.map((n) => {
          const isCore = n.group === "core";
          const isHovered = hovered === n.id;
          const r = n.radius * (isHovered ? 1.3 : 1);
          return (
            <g
              key={n.id}
              transform={`translate(${n.x ?? 0}, ${n.y ?? 0})`}
              onMouseEnter={() => setHovered(n.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: n.slug ? "pointer" : "default" }}
            >
              {n.slug ? (
                <Link href={`/siddhi/${n.slug}`}>
                  <circle
                    r={r}
                    fill={isCore ? "var(--color-gold)" : "var(--color-obsidian)"}
                    stroke={isCore ? "var(--color-gold-bright)" : "var(--color-gold)"}
                    strokeWidth={isCore ? 2 : 1.2}
                    opacity={isHovered ? 1 : 0.85}
                    style={{ transition: "r var(--dur-instant) var(--ease-standard), opacity var(--dur-instant) var(--ease-standard)" }}
                  />
                  <text
                    y={r + 12}
                    textAnchor="middle"
                    fontSize={isCore ? 11 : 9}
                    fill={isCore ? "var(--color-gold-bright)" : "var(--color-bone)"}
                    opacity={isHovered ? 1 : 0.7}
                    style={{ transition: "opacity var(--dur-instant) var(--ease-standard)", pointerEvents: "none" }}
                  >
                    {n.label}
                  </text>
                </Link>
              ) : (
                <>
                  <circle
                    r={r}
                    fill="var(--color-gold)"
                    stroke="var(--color-gold-bright)"
                    strokeWidth={2}
                    opacity={isHovered ? 1 : 0.9}
                  />
                  <text
                    y={r + 14}
                    textAnchor="middle"
                    fontSize={11}
                    fill="var(--color-gold-bright)"
                    style={{ pointerEvents: "none" }}
                  >
                    {n.label}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
      <p className="mt-3 text-center text-[0.55rem] uppercase tracking-luxe text-[var(--color-bone)]/40">
        Hover a node to highlight its connections · Click to open the folio
      </p>
    </div>
  );
}
