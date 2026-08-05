'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Layers, Box, Cpu, Sparkles, Eye, ShieldAlert } from 'lucide-react';

export default function Hero3DRoad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeSlice, setActiveSlice] = useState<'3d' | 'contour' | 'mesh'>('3d');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 480;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // 3D Rendering Engine
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2 + mousePos.x * 30;
      const cy = h / 2 + 20 + mousePos.y * 30;

      ctx.clearRect(0, 0, w, h);

      // Background glowing ambient gradients
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, w / 1.4);
      bgGrad.addColorStop(0, 'rgba(0, 217, 255, 0.18)');
      bgGrad.addColorStop(0.4, 'rgba(15, 23, 42, 0.4)');
      bgGrad.addColorStop(1, 'rgba(10, 14, 23, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      rotation += 0.006;

      // Draw 3D Perspective Road Surface Grid
      const numGridLines = 28;
      const gridWidth = 400;
      const gridLength = 500;

      ctx.lineWidth = 1;

      for (let i = -numGridLines / 2; i <= numGridLines / 2; i++) {
        const xOffset = i * (gridWidth / numGridLines);

        const cosR = Math.cos(rotation * 0.4 + mousePos.x);
        const sinR = Math.sin(rotation * 0.4 + mousePos.x);

        const x1 = xOffset * cosR - (-gridLength / 2) * sinR;
        const z1 = xOffset * sinR + (-gridLength / 2) * cosR + 420;

        const x2 = xOffset * cosR - (gridLength / 2) * sinR;
        const z2 = xOffset * sinR + (gridLength / 2) * cosR + 420;

        const px1 = cx + (x1 * 400) / z1;
        const py1 = cy + (130 * 400) / z1;
        const px2 = cx + (x2 * 400) / z2;
        const py2 = cy + (130 * 400) / z2;

        ctx.strokeStyle = i % 4 === 0 ? 'rgba(0, 217, 255, 0.25)' : 'rgba(30, 41, 59, 0.4)';
        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.stroke();
      }

      // Draw 3D Volumetric Depth Pothole Mesh
      const numRings = 14;
      for (let r = 1; r <= numRings; r++) {
        const radius = r * 12;
        const depth = Math.pow(r / numRings, 1.8) * 55; // 55px depth displacement

        ctx.beginPath();
        const pts = 42;
        for (let p = 0; p <= pts; p++) {
          const angle = (p / pts) * Math.PI * 2 + rotation;
          // Organic distress noise
          const noise = Math.sin(angle * 5 + r) * 7 + Math.cos(angle * 8) * 5;
          const currentRadius = radius + noise;

          const px3D = Math.cos(angle) * currentRadius;
          const py3D = depth;
          const pz3D = Math.sin(angle) * currentRadius + 340;

          const screenX = cx + (px3D * 400) / pz3D;
          const screenY = cy + (py3D * 400) / pz3D + 15;

          if (p === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.closePath();

        // Color transition: Cyan outer rim -> Yellow mid depth -> Red core
        const factor = r / numRings;
        let rCol = Math.round(factor * 239);
        let gCol = Math.round((1 - factor) * 217 + factor * 60);
        let bCol = Math.round((1 - factor) * 255);

        if (activeSlice === 'contour') {
          rCol = 0; gCol = 217; bCol = 255;
        }

        ctx.strokeStyle = `rgba(${rCol}, ${gCol}, ${bCol}, ${0.4 + factor * 0.55})`;
        ctx.shadowColor = `rgba(${rCol}, ${gCol}, ${bCol}, 0.8)`;
        ctx.shadowBlur = activeSlice === 'mesh' ? 4 : 14;
        ctx.lineWidth = activeSlice === 'mesh' ? 1.2 : 2.2;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Animated Glowing Laser Scan Beam
      const scanY = cy + Math.sin(rotation * 2.5) * 70;
      const scanGrad = ctx.createLinearGradient(cx - 200, scanY, cx + 200, scanY);
      scanGrad.addColorStop(0, 'rgba(0, 217, 255, 0)');
      scanGrad.addColorStop(0.5, 'rgba(0, 217, 255, 0.95)');
      scanGrad.addColorStop(1, 'rgba(0, 217, 255, 0)');

      ctx.beginPath();
      ctx.moveTo(cx - 240, scanY);
      ctx.lineTo(cx + 240, scanY);
      ctx.strokeStyle = scanGrad;
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00d9ff';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Floating Telemetry Callout Box 1
      ctx.fillStyle = 'rgba(11, 17, 30, 0.92)';
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.6)';
      ctx.lineWidth = 1;

      const badgeX = cx + 70;
      const badgeY = cy - 100;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, 190, 64, 10);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 11px Space Grotesk, sans-serif';
      ctx.fillStyle = '#00d9ff';
      ctx.fillText('YOLOv8 + Monocular Depth', badgeX + 14, badgeY + 22);

      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('Max Depth: 15.0cm (±1.2)', badgeX + 14, badgeY + 40);
      ctx.fillStyle = '#ef4444';
      ctx.fillText('• High Structural Distress', badgeX + 14, badgeY + 54);

      // Draw Floating Telemetry Callout Box 2 (Left)
      const badge2X = cx - 220;
      const badge2Y = cy + 40;
      ctx.beginPath();
      ctx.roundRect(badge2X, badge2Y, 160, 50, 10);
      ctx.fillStyle = 'rgba(11, 17, 30, 0.92)';
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 10px Space Grotesk, sans-serif';
      ctx.fillStyle = '#10b981';
      ctx.fillText('✓ Volumetric Audit', badge2X + 12, badge2Y + 20);
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Volume: 0.375 m³', badge2X + 12, badge2Y + 38);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSlice, mousePos]);

  return (
    <div className="relative w-full h-[480px] rounded-3xl overflow-hidden bg-slate-950/80 border border-cyan-500/30 shadow-cyan-glow flex flex-col justify-between p-4 group">
      {/* Top Header Controls */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-cyan-glow">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Interactive 3D Spatial Matrix</span>
        </div>

        {/* View Slice Mode Selector */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveSlice('3d')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeSlice === '3d'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3D Mesh
          </button>
          <button
            onClick={() => setActiveSlice('contour')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeSlice === 'contour'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Contours
          </button>
          <button
            onClick={() => setActiveSlice('mesh')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeSlice === 'mesh'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Wireframe
          </button>
        </div>
      </div>

      {/* Main WebGL/Canvas Viewport */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-crosshair" />

      {/* Bottom Telemetry Legend */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 p-2.5 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Move mouse to tilt perspective grid</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-cyan-400">0cm Rim</span>
          <span className="text-amber-400">7cm Mid</span>
          <span className="text-rose-400 font-bold">15cm Core</span>
        </div>
      </div>
    </div>
  );
}
