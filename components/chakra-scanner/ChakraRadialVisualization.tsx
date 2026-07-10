'use client';

import { useEffect, useRef } from 'react';
import type { ChakraAssessment } from '@/lib/chakra-data';
import { CHAKRAS } from '@/lib/chakra-data';

interface Props {
  assessments: Record<string, ChakraAssessment>;
}

export default function ChakraRadialVisualization({ assessments }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 500;
    canvas.height = 500;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 200;

    // Draw background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw concentric circles
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    for (let r = 40; r <= maxRadius; r += 40) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw chakra rings
    CHAKRAS.forEach((chakra, index) => {
      const angle = (Math.PI * 2 * index) / CHAKRAS.length - Math.PI / 2;
      const assessment = assessments[chakra.id];

      if (!assessment) return;

      const energy = assessment.energy;
      const blockage = assessment.blockage;

      // Energy ring
      const energyRadius = (energy / 100) * maxRadius;
      ctx.fillStyle = chakra.color + '80';
      ctx.beginPath();
      ctx.arc(centerX, centerY, energyRadius, angle - 0.2, angle + 0.2);
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // Blockage indicator
      if (blockage > 30) {
        const blockageX = centerX + Math.cos(angle) * (maxRadius + 30);
        const blockageY = centerY + Math.sin(angle) * (maxRadius + 30);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(blockageX - 5, blockageY - 5, 10, 10);
      }

      // Labels
      const labelX = centerX + Math.cos(angle) * (maxRadius + 50);
      const labelY = centerY + Math.sin(angle) * (maxRadius + 50);
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(chakra.name, labelX, labelY);
    });

    // Center circle
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fill();
  }, [assessments]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-slate-800 rounded-lg p-8 shadow-2xl">
        <canvas
          ref={canvasRef}
          className="rounded-lg border-2 border-slate-700"
        />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
          <span>High Energy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <span>Blocked</span>
        </div>
      </div>
    </div>
  );
}
