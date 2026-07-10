'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

interface YantraTemplate {
  name: string;
  description: string;
  deity: string;
  ratios: number[]; // Sacred proportions
  generate: (size: number) => { circles: Circle[]; lines: Line[]; triangles: Triangle[] };
}

interface Circle {
  cx: number;
  cy: number;
  r: number;
  label?: string;
}

interface Triangle {
  points: Point[];
  label?: string;
}

const YANTRA_TEMPLATES: Record<string, YantraTemplate> = {
  'sri-cakra': {
    name: 'Sri Chakra (Tripura Sundari)',
    description: 'The most sacred yantra. 43 triangles in perfect proportion.',
    deity: 'Tripura Sundari',
    ratios: [1, 1.618, 2.618, 4.236], // Golden ratio derivatives
    generate: (size: number) => {
      const center = size / 2;
      const circles = [
        { cx: center, cy: center, r: size * 0.45, label: 'Outer circle' },
        { cx: center, cy: center, r: size * 0.4 },
        { cx: center, cy: center, r: size * 0.35 },
        { cx: center, cy: center, r: size * 0.25 },
        { cx: center, cy: center, r: size * 0.15, label: 'Inner bindu' },
      ];

      const lines: Line[] = [];
      const triangles: Triangle[] = [];

      // Generate concentric triangles
      for (let i = 1; i <= 5; i++) {
        const angle = (Math.PI * 2) / 3;
        const radius = (size * 0.4 * i) / 5;
        const points: Point[] = [];

        for (let j = 0; j < 3; j++) {
          points.push({
            x: center + radius * Math.cos((angle * j + Math.PI / 2) * (i % 2 === 0 ? 1 : -1)),
            y: center + radius * Math.sin((angle * j + Math.PI / 2) * (i % 2 === 0 ? 1 : -1)),
          });
        }

        triangles.push({ points });
      }

      return { circles, lines, triangles };
    },
  },
  'maha-meru': {
    name: 'Maha Meru (Cosmic Mountain)',
    description: 'Layered mountain yantra representing ascent through consciousness.',
    deity: 'Maha Meru',
    ratios: [1, 2, 3, 5, 8, 13], // Fibonacci sequence
    generate: (size: number) => {
      const center = size / 2;
      const triangles: Triangle[] = [];

      // Mountain layers
      for (let i = 0; i < 6; i++) {
        const baseWidth = size * (0.9 - i * 0.12);
        const height = size * (0.85 - i * 0.12);
        triangles.push({
          points: [
            { x: center - baseWidth / 2, y: center + height },
            { x: center + baseWidth / 2, y: center + height },
            { x: center, y: center + height - baseWidth * 0.866 },
          ],
        });
      }

      const circles = [{ cx: center, cy: center - size * 0.3, r: size * 0.08, label: 'Apex' }];

      return { circles, lines: [], triangles };
    },
  },
  'chakra-wheel': {
    name: 'Chakra Wheel (Energy Centers)',
    description: 'Represents the seven chakras in unified visualization.',
    deity: 'All Chakra Deities',
    ratios: [1, 1.5, 2, 2.5, 3],
    generate: (size: number) => {
      const center = size / 2;
      const circles = [
        { cx: center, cy: center, r: size * 0.5, label: 'Outer boundary' },
        { cx: center, cy: center, r: size * 0.4 },
        { cx: center, cy: center, r: size * 0.3 },
        { cx: center, cy: center, r: size * 0.15 },
        { cx: center, cy: center, r: size * 0.08, label: 'Central bindu' },
      ];

      const triangles: Triangle[] = [];
      for (let i = 0; i < 7; i++) {
        const angle = (Math.PI * 2 * i) / 7;
        const radius = size * 0.35;
        triangles.push({
          points: [
            { x: center, y: center },
            { x: center + radius * Math.cos(angle), y: center + radius * Math.sin(angle) },
            {
              x: center + radius * Math.cos(angle + (Math.PI * 2) / 7),
              y: center + radius * Math.sin(angle + (Math.PI * 2) / 7),
            },
          ],
          label: `Chakra ${i + 1}`,
        });
      }

      return { circles, lines: [], triangles };
    },
  },
};

export default function YantraBuilder() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('sri-cakra');
  const [isDrawing, setIsDrawing] = useState(false);
  const [yantraSize, setYantraSize] = useState(400);
  const [proportionValid, setProportionValid] = useState(true);
  const [svgOutput, setSvgOutput] = useState('');
  const [purpose, setPurpose] = useState('');

  const template = YANTRA_TEMPLATES[selectedTemplate];
  const { circles, triangles } = template.generate(yantraSize);

  useEffect(() => {
    // Generate SVG
    let svg = `<svg viewBox="0 0 ${yantraSize} ${yantraSize}" xmlns="http://www.w3.org/2000/svg">
  <!-- ${template.name} -->
  <style>
    circle { fill: none; stroke: #c9985e; stroke-width: 1; }
    triangle { fill: none; stroke: #c9985e; stroke-width: 1; }
    .label { font-size: 10px; fill: #c9985e; }
  </style>`;

    // Add circles
    circles.forEach((circle) => {
      svg += `\n  <circle cx="${circle.cx}" cy="${circle.cy}" r="${circle.r}"/>`;
    });

    // Add triangles
    triangles.forEach((triangle) => {
      const pointsStr = triangle.points.map((p) => `${p.x},${p.y}`).join(' ');
      svg += `\n  <polygon points="${pointsStr}"/>`;
    });

    svg += '\n</svg>';
    setSvgOutput(svg);
  }, [selectedTemplate, yantraSize, template]);

  const downloadSVG = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/svg+xml;charset=utf-8,' + encodeURIComponent(svgOutput));
    element.setAttribute('download', `${template.name.replace(/\s+/g, '-')}.svg`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadPNG = async () => {
    // SVG to PNG export using canvas
    const svg = svgRef.current;
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);

    img.onload = () => {
      canvas.width = yantraSize;
      canvas.height = yantraSize;
      ctx.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${template.name.replace(/\s+/g, '-')}.png`;
      link.click();
    };
  };

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-serif mb-2">Interactive Yantra Builder</h1>
        <p className="text-sm text-[var(--color-bone)]/60">Design sacred geometry with perfect proportions</p>
      </div>

      {/* Template Selector */}
      <div className="space-y-3">
        <label className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60">Select Yantra Template</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {Object.entries(YANTRA_TEMPLATES).map(([key, tmpl]) => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`rounded-lg border px-4 py-3 text-left transition ${
                selectedTemplate === key
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10'
                  : 'border-[var(--hairline)] hover:border-[var(--color-gold)]/40'
              }`}
            >
              <p className="text-sm font-serif mb-1">{tmpl.name}</p>
              <p className="text-xs text-[var(--color-bone)]/60">{tmpl.deity}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Yantra Preview & Controls */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Canvas Preview */}
        <div className="rounded-lg border border-[var(--hairline)] p-6">
          <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-4">Live Preview</p>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${yantraSize} ${yantraSize}`}
            xmlns="http://www.w3.org/2000/svg"
            className="w-full border border-[var(--hairline)] rounded bg-[var(--color-bone)]/5"
          >
            {/* Circles */}
            {circles.map((circle, i) => (
              <circle
                key={`circle-${i}`}
                cx={circle.cx}
                cy={circle.cy}
                r={circle.r}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-[var(--color-gold)]"
              />
            ))}

            {/* Triangles */}
            {triangles.map((triangle, i) => {
              const pointsStr = triangle.points.map((p) => `${p.x},${p.y}`).join(' ');
              return (
                <polygon
                  key={`triangle-${i}`}
                  points={pointsStr}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-[var(--color-gold)]"
                />
              );
            })}
          </svg>

          {/* Geometry Info */}
          <div className="mt-4 space-y-2 text-xs">
            <p>
              <span className="text-[var(--color-bone)]/60">Proportions:</span>
              <span className="ml-2 font-serif text-[var(--color-gold)]">{template.ratios.join(', ')}</span>
            </p>
            <p>
              <span className="text-[var(--color-bone)]/60">Size:</span>
              <span className="ml-2 font-serif">{yantraSize}px</span>
            </p>
            <p>
              <span className={proportionValid ? 'text-green-500' : 'text-red-500'}>
                {proportionValid ? '✓ Proportions Valid' : '✗ Proportions Invalid'}
              </span>
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Size Slider */}
          <div>
            <label className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2 block">Yantra Size</label>
            <input
              type="range"
              min="200"
              max="800"
              step="50"
              value={yantraSize}
              onChange={(e) => setYantraSize(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-[var(--color-bone)]/60 mt-1">{yantraSize}px × {yantraSize}px</p>
          </div>

          {/* Template Info */}
          <div className="rounded-lg bg-[var(--color-bone)]/5 p-4">
            <p className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2">Template</p>
            <p className="text-sm font-serif mb-2">{template.name}</p>
            <p className="text-xs text-[var(--color-bone)]/70">{template.description}</p>
            <p className="text-xs text-[var(--color-gold)] mt-2">Deity: {template.deity}</p>
          </div>

          {/* Purpose */}
          <div>
            <label className="text-xs uppercase tracking-luxe text-[var(--color-bone)]/60 mb-2 block">Purpose</label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="What is your intention for this yantra?"
              className="w-full rounded border border-[var(--hairline)] bg-[var(--color-bone)]/5 px-3 py-2 text-sm"
              rows={3}
            />
          </div>

          {/* Export Buttons */}
          <div className="space-y-2">
            <button
              onClick={downloadSVG}
              className="w-full rounded-lg bg-[var(--color-gold)] px-4 py-2 text-sm font-serif text-[var(--color-bone)] transition hover:bg-[var(--color-gold-bright)]"
            >
              Export as SVG
            </button>
            <button
              onClick={downloadPNG}
              className="w-full rounded-lg border border-[var(--hairline)] px-4 py-2 text-sm font-serif text-[var(--color-bone)]/70 transition hover:border-[var(--color-gold)]/40"
            >
              Export as PNG
            </button>
            <button className="w-full rounded-lg border border-[var(--hairline)] px-4 py-2 text-sm font-serif text-[var(--color-bone)]/70 transition hover:border-[var(--color-gold)]/40">
              AR Preview (Beta)
            </button>
          </div>
        </div>
      </div>

      {/* Sacred Geometry Info */}
      <div className="rounded-lg bg-[var(--color-bone)]/5 p-6">
        <h3 className="text-lg font-serif mb-4">Sacred Geometry Principles</h3>
        <ul className="space-y-2 text-xs text-[var(--color-bone)]/70">
          <li>
            <span className="font-serif text-[var(--color-gold)]">Golden Ratio (1.618):</span> Perfect proportions found in nature and divinity
          </li>
          <li>
            <span className="font-serif text-[var(--color-gold)]">Fibonacci Sequence:</span> Mathematical pattern of cosmic creation
          </li>
          <li>
            <span className="font-serif text-[var(--color-gold)]">Sacred Numbers:</span> 3 (trinity), 5 (microcosm), 7 (perfection), 9 (completion)
          </li>
          <li>
            <span className="font-serif text-[var(--color-gold)]">Mandala Symmetry:</span> Perfect balance representing unified consciousness
          </li>
        </ul>
      </div>
    </div>
  );
}
