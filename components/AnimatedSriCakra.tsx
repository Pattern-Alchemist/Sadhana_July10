"use client";

import { useEffect, useState } from "react";

/**
 * AnimatedSriCakra — a CSS-driven Śrī Cakra that assembles triangle-by-triangle
 * on the homepage hero.
 *
 * Construction:
 *   - 9 triangles (4 upward Śiva in gold, 5 downward Śakti in cyan)
 *   - Each fades + rotates into place in sequence (200ms stagger)
 *   - Central bindu appears last with a glow
 *   - After assembly, the whole yantra slowly rotates (180s)
 *
 * This is a decorative hero element — it is NOT a replacement for the
 * full scholarly Śrī Cakra SVG (see /yantras/sri-cakra-yantra.svg for that).
 * The geometry here is a simplified concentric-nesting approximation
 * suitable for an entrance animation.
 */

export default function AnimatedSriCakra() {
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    // Mark as assembled after all triangles have appeared (2200ms + buffer)
    const t = setTimeout(() => setAssembled(true), 2400);
    return () => clearTimeout(t);
  }, []);

  // Triangle dimensions — concentric nesting, each smaller than the last
  // Upward (Śiva) triangles: apex at top, base at bottom
  // Downward (Śakti) triangles: apex at bottom, base at top
  // Rendered as SVG polygons for crisp scaling

  const size = 460; // viewBox
  const center = size / 2;

  // Generate 4 upward + 5 downward triangles, concentrically nested
  // Each triangle's apex touches the inner edge of the previous ring
  const sivaTriangles = [
    { scale: 1.0, opacity: 0.85 },
    { scale: 0.78, opacity: 0.75 },
    { scale: 0.56, opacity: 0.65 },
    { scale: 0.34, opacity: 0.55 },
  ];
  const shaktiTriangles = [
    { scale: 0.92, opacity: 0.80 },
    { scale: 0.70, opacity: 0.70 },
    { scale: 0.48, opacity: 0.60 },
    { scale: 0.26, opacity: 0.50 },
    { scale: 0.14, opacity: 0.40 },
  ];

  // Upward (Śiva) triangle: apex at top, base at bottom
  // For scale s, the triangle has half-width = s * 180, height = s * 312 (approx)
  const sivaPoints = (scale: number) => {
    const w = scale * 180;
    const h = scale * 280;
    return `${center},${center - h / 2} ${center - w},${center + h / 2} ${center + w},${center + h / 2}`;
  };

  // Downward (Śakti) triangle: apex at bottom, base at top
  const shaktiPoints = (scale: number) => {
    const w = scale * 180;
    const h = scale * 280;
    return `${center},${center + h / 2} ${center - w},${center - h / 2} ${center + w},${center - h / 2}`;
  };

  return (
    <div className={`sri-cakra-hero ${assembled ? "sc-assembled" : ""}`}>
      {/* The 9 triangle layers, rendered in assembly order:
          outermost Śiva first, then alternating Śakti/Śiva inward */}
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={sivaPoints(sivaTriangles[0].scale)}
            fill="none"
            stroke="#c9985e"
            strokeWidth="2"
            opacity={sivaTriangles[0].opacity}
          />
        </svg>
      </div>
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={shaktiPoints(shaktiTriangles[0].scale)}
            fill="none"
            stroke="#6fc7bd"
            strokeWidth="2"
            opacity={shaktiTriangles[0].opacity}
          />
        </svg>
      </div>
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={sivaPoints(sivaTriangles[1].scale)}
            fill="none"
            stroke="#c9985e"
            strokeWidth="1.8"
            opacity={sivaTriangles[1].opacity}
          />
        </svg>
      </div>
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={shaktiPoints(shaktiTriangles[1].scale)}
            fill="none"
            stroke="#6fc7bd"
            strokeWidth="1.8"
            opacity={shaktiTriangles[1].opacity}
          />
        </svg>
      </div>
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={sivaPoints(sivaTriangles[2].scale)}
            fill="none"
            stroke="#c9985e"
            strokeWidth="1.6"
            opacity={sivaTriangles[2].opacity}
          />
        </svg>
      </div>
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={shaktiPoints(shaktiTriangles[2].scale)}
            fill="none"
            stroke="#6fc7bd"
            strokeWidth="1.6"
            opacity={shaktiTriangles[2].opacity}
          />
        </svg>
      </div>
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={sivaPoints(sivaTriangles[3].scale)}
            fill="none"
            stroke="#c9985e"
            strokeWidth="1.4"
            opacity={sivaTriangles[3].opacity}
          />
        </svg>
      </div>
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={shaktiPoints(shaktiTriangles[3].scale)}
            fill="none"
            stroke="#6fc7bd"
            strokeWidth="1.4"
            opacity={shaktiTriangles[3].opacity}
          />
        </svg>
      </div>
      <div className="sc-layer">
        <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
          <polygon
            points={shaktiPoints(shaktiTriangles[4].scale)}
            fill="none"
            stroke="#6fc7bd"
            strokeWidth="1.2"
            opacity={shaktiTriangles[4].opacity}
          />
        </svg>
      </div>

      {/* Central bindu */}
      <div className="sc-bindu" />
    </div>
  );
}
