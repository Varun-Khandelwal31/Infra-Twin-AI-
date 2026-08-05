'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, Layers, Eye } from 'lucide-react';
import { InspectionData } from '@/lib/mockInference';

interface DepthHeatmapCanvasProps {
  sample: InspectionData;
}

export default function DepthHeatmapCanvas({ sample }: DepthHeatmapCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'top' | 'side'>('3d');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 300;
    };
    resize();
    window.addEventListener('resize', resize);

    const depthGrid = sample.depthGrid;
    const rows = depthGrid.length;
    const cols = depthGrid[0].length;
    const maxDepth = sample.metrics.maxDepthCm;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2 + 10;

      ctx.clearRect(0, 0, w, h);

      // Ambient background
      ctx.fillStyle = '#060a12';
      ctx.fillRect(0, 0, w, h);

      if (viewMode === '3d') {
        angle += 0.005;
      }

      // Draw 3D Mesh Grid & Depth Contours
      const gridSpacing = 16;
      const halfW = (cols * gridSpacing) / 2;
      const halfH = (rows * gridSpacing) / 2;

      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const d = depthGrid[r][c];

          // Color interpolation: blue (0cm) -> cyan (3cm) -> yellow (7cm) -> red (15cm)
          const normDepth = Math.min(d / maxDepth, 1);

          let rCol = Math.round(normDepth * 239);
          let gCol = Math.round((1 - normDepth) * 200 + normDepth * 40);
          let bCol = Math.round((1 - normDepth) * 255);

          if (d === 0) {
            rCol = 10; gCol = 20; bCol = 50; // Dark blue base road
          }

          // Projection based on viewMode
          let px1 = (c * gridSpacing) - halfW;
          let py1 = (r * gridSpacing) - halfH;
          let pz1 = d * 5; // depth displacement down

          let screenX = cx;
          let screenY = cy;

          if (viewMode === '3d') {
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            const rx = px1 * cosA - py1 * sinA;
            const ry = px1 * sinA + py1 * cosA;
            screenX = cx + rx;
            screenY = cy + ry * 0.45 + pz1;
          } else if (viewMode === 'top') {
            screenX = cx + px1;
            screenY = cy + py1;
          } else if (viewMode === 'side') {
            screenX = cx + px1;
            screenY = cy + pz1 * 2;
          }

          ctx.fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`;
          ctx.strokeStyle = `rgba(${rCol}, ${gCol}, ${bCol}, 0.3)`;
          ctx.lineWidth = 0.5;

          ctx.beginPath();
          ctx.rect(screenX, screenY, gridSpacing * 0.9, gridSpacing * 0.9);
          ctx.fill();
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [sample, viewMode]);

  return (
    <div className="relative w-full h-[320px] rounded-2xl overflow-hidden bg-[#060a12] border border-cyan-500/25 shadow-glass">
      {/* Title */}
      <div className="absolute top-4 left-4 z-20 text-xs font-bold text-white font-display">
        3D Depth Map
      </div>

      {/* Left Rainbow Vertical Legend matching screenshot 1 */}
      <div className="absolute top-12 left-4 z-20 flex items-center gap-2">
        <div className="w-3 h-44 rounded-full bg-gradient-to-t from-blue-600 via-cyan-400 via-yellow-400 to-rose-600 border border-slate-700 shadow-glass" />
        <div className="flex flex-col justify-between h-44 text-[10px] font-mono text-slate-300">
          <span>15+ cm</span>
          <span>12</span>
          <span>9</span>
          <span>6</span>
          <span>3</span>
          <span>0</span>
        </div>
      </div>

      {/* Right Controls (3D View, Top View, Side View) matching screenshot 1 */}
      <div className="absolute top-12 right-4 z-20 flex flex-col gap-1.5 p-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs">
        <button
          onClick={() => setViewMode('3d')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            viewMode === '3d' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>3D View</span>
        </button>

        <button
          onClick={() => setViewMode('top')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            viewMode === 'top' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Top View</span>
        </button>

        <button
          onClick={() => setViewMode('side')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            viewMode === 'side' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Side View</span>
        </button>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
