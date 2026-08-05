'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import {
  ShieldAlert,
  ShieldCheck,
  Download,
  Share2,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Unlock,
} from 'lucide-react';

export default function SLAVerificationPage() {
  // Preset scenarios or interactive slider
  const [billedVolume, setBilledVolume] = useState<number>(1.0); // Contractor billed 1.0 m3
  const [aiFilledVolume, setAiFilledVolume] = useState<number>(0.5); // AI verified 0.5 m3 filled
  const [compactionDensity, setCompactionDensity] = useState<number>(98.2);

  const volumeDeficit = billedVolume - aiFilledVolume;
  const deficitPercentage = ((volumeDeficit / billedVolume) * 100).toFixed(1);
  const isFraud = billedVolume > aiFilledVolume * 1.05; // >5% over-billing triggers fraud alert

  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-100 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white font-display">
                  Contractor SLA & Volumetric Fraud Verification Module
                </h1>
                <span
                  className={`p-1 rounded-full border ${
                    isFraud
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}
                >
                  {isFraud ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Side-by-side 3D volumetric audit comparing contractor material invoices against AI drone scans
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-3">
              <button className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>Export Audit PDF</span>
              </button>
              <button
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isFraud
                    ? 'bg-rose-500 text-white shadow-red-glow hover:bg-rose-600'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-green-glow'
                }`}
              >
                {isFraud ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                <span>{isFraud ? 'Freeze Contractor Payment' : 'Clear Payment (Clearance Approved)'}</span>
              </button>
            </div>
          </div>

          {/* FLASHING RED FRAUD ALERT BANNER OR GREEN CLEARANCE BANNER */}
          {isFraud ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/90 via-rose-900/60 to-slate-950 border-2 border-rose-500/80 text-rose-200 shadow-red-glow animate-pulse flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/50 shrink-0">
                  <AlertTriangle className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold text-white font-display uppercase tracking-wide">
                    <span>⚠️ ANOMALOUS MATERIAL BILLING DETECTED!</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/30 text-rose-300 border border-rose-500/50">
                      FRAUD ALERT
                    </span>
                  </div>
                  <p className="text-xs text-rose-200 mt-1 font-mono leading-relaxed">
                    Contractor billed for <strong className="text-white underline">{billedVolume.toFixed(2)} m³</strong> of material, but AI 3D volumetric audit proves only <strong className="text-white underline">{aiFilledVolume.toFixed(2)} m³</strong> was filled ({deficitPercentage}% Material Deficit of {volumeDeficit.toFixed(2)} m³). <span className="font-bold text-yellow-300">Payment Hold Recommended.</span>
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl bg-rose-950 border border-rose-500/60 text-xs font-mono font-bold text-rose-300 shrink-0 text-center">
                HOLD RECOMMENDATION: <span className="block text-white text-sm">FREEZE ₹1,48,500</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-emerald-900/60 to-slate-950 border border-emerald-500/50 text-emerald-200 shadow-green-glow flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-display">
                    CONTRACTOR SLA VERIFIED & PASSED
                  </div>
                  <p className="text-xs text-emerald-300 mt-0.5 font-mono">
                    Contractor billed {billedVolume.toFixed(2)} m³ matching AI verified volume filled ({aiFilledVolume.toFixed(2)} m³). Payment Clearance Approved.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                100% COMPLIANT
              </span>
            </div>
          )}

          {/* Interactive Preset Buttons & Live Parameter Sliders */}
          <div className="p-4 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono">
                <Sliders className="w-4 h-4" />
                <span>SLA TEST CONTROL PANEL & BILLING SIMULATOR</span>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setBilledVolume(1.0);
                    setAiFilledVolume(0.5);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                    billedVolume === 1.0 && aiFilledVolume === 0.5
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-red-glow'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  🚨 Trigger Fraud Alert (Billed 1.0m³ vs AI 0.5m³)
                </button>

                <button
                  onClick={() => {
                    setBilledVolume(0.5);
                    setAiFilledVolume(0.5);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                    billedVolume === 0.5 && aiFilledVolume === 0.5
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-green-glow'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                  }`}
                >
                  ✅ Compliant Repair (Billed 0.5m³ vs AI 0.5m³)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800">
              {/* Slider 1: Contractor Billed Volume */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Contractor Invoice Billed Material Volume:</span>
                  <span className={`font-bold text-sm ${isFraud ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {billedVolume.toFixed(2)} m³
                  </span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={billedVolume}
                  onChange={(e) => setBilledVolume(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.5 m³ (Accurate)</span>
                  <span>1.0 m³ (Over-Billed)</span>
                  <span>2.0 m³ (Severe Over-Claim)</span>
                </div>
              </div>

              {/* Slider 2: AI Verified Volume Filled */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">AI 3D Volumetric Audit Verified Volume Filled:</span>
                  <span className="font-bold text-sm text-cyan-400">
                    {aiFilledVolume.toFixed(2)} m³
                  </span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={1.5}
                  step={0.05}
                  value={aiFilledVolume}
                  onChange={(e) => setAiFilledVolume(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.2 m³ Void</span>
                  <span>0.5 m³ Standard</span>
                  <span>1.5 m³ Max Fill</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIDE-BY-SIDE IMAGE VIEWER (grid-cols-2) matching exact prompt spec */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT SIDE: "Before Repair" (Red Mask + Volume = 0.5m³) */}
            <div className="relative h-[380px] rounded-2xl overflow-hidden bg-[#0c111c] border-2 border-rose-500/40 shadow-glass flex flex-col justify-between p-4 group">
              {/* Top Overlay Badge */}
              <div className="flex items-center justify-between z-10">
                <div className="px-3 py-1.5 rounded-xl bg-rose-950/90 backdrop-blur-md border border-rose-500/50 text-xs font-bold text-rose-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Before Repair (Drone Scan)</span>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300">
                  Captured: May 15, 2025
                </span>
              </div>

              {/* Background Road Image with RED Segmentation Overlay */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop"
                  alt="Before Repair Drone Scan"
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />

                {/* RED Segmentation Mask Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 450" preserveAspectRatio="none">
                  <defs>
                    <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M 160,120 C 240,90 350,110 420,150 C 480,200 460,320 400,390 C 320,440 210,430 150,360 C 110,290 100,180 160,120 Z"
                    fill="rgba(239, 68, 68, 0.25)"
                    stroke="#ef4444"
                    strokeWidth="4"
                    strokeDasharray="8, 4"
                    filter="url(#redGlow)"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              {/* Prominent Bottom Volume Card */}
              <div className="relative z-10 p-4 rounded-xl bg-slate-950/90 backdrop-blur-xl border border-rose-500/40 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-slate-400 text-[11px] uppercase tracking-wider">Unfilled Pothole Void</div>
                  <div className="text-xl font-black text-rose-400 font-display mt-0.5">
                    Volume = 0.50 m³
                  </div>
                </div>
                <div className="text-right border-l border-slate-800 pl-4">
                  <span className="text-slate-400 block">Area: 2.50 m²</span>
                  <span className="text-slate-400 block">Depth: 20.0 cm</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: "After Repair" (Green Mask + Volume filled = 0.5m³) */}
            <div className="relative h-[380px] rounded-2xl overflow-hidden bg-[#0c111c] border-2 border-emerald-500/40 shadow-glass flex flex-col justify-between p-4 group">
              {/* Top Overlay Badge */}
              <div className="flex items-center justify-between z-10">
                <div className="px-3 py-1.5 rounded-xl bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>After Repair (Drone Scan)</span>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs font-mono text-slate-300">
                  Captured: May 29, 2025
                </span>
              </div>

              {/* Background Road Image with GREEN Segmentation Overlay */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop"
                  alt="After Repair Drone Scan"
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />

                {/* GREEN Segmentation Mask Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 450" preserveAspectRatio="none">
                  <defs>
                    <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M 180,140 C 250,110 340,120 400,160 C 450,200 430,300 380,360 C 310,400 220,390 170,330 C 130,270 140,190 180,140 Z"
                    fill={isFraud ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.25)'}
                    stroke={isFraud ? '#ef4444' : '#10b981'}
                    strokeWidth="4"
                    strokeDasharray="8, 4"
                    filter="url(#greenGlow)"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              {/* Prominent Bottom Volume Card */}
              <div className="relative z-10 p-4 rounded-xl bg-slate-950/90 backdrop-blur-xl border border-emerald-500/40 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-slate-400 text-[11px] uppercase tracking-wider">AI Verified Material Filled</div>
                  <div className="text-xl font-black text-emerald-400 font-display mt-0.5">
                    Volume filled = {aiFilledVolume.toFixed(2)} m³
                  </div>
                </div>
                <div className="text-right border-l border-slate-800 pl-4">
                  <span className="text-slate-400 block">Compaction: 98.2%</span>
                  <span className="text-slate-400 block">SLA: {isFraud ? 'FAILED' : 'PASSED'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Audit Table */}
          <div className="p-5 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4">
            <h3 className="text-xs font-bold text-white font-display uppercase tracking-wider">
              Volumetric Material Audit & Fraud Diagnostics
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="p-3">Material Category</th>
                    <th className="p-3">Contractor Billed</th>
                    <th className="p-3">AI Verified Volume Filled</th>
                    <th className="p-3">Variance / Deficit</th>
                    <th className="p-3 text-right">Audit Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/40 font-mono">
                  <tr>
                    <td className="p-3 font-semibold text-slate-200 font-sans">VG-30 Bituminous Concrete</td>
                    <td className="p-3 text-slate-300">{(billedVolume * 2.4).toFixed(2)} Ton ({billedVolume.toFixed(2)} m³)</td>
                    <td className="p-3 text-cyan-300">{(aiFilledVolume * 2.4).toFixed(2)} Ton ({aiFilledVolume.toFixed(2)} m³)</td>
                    <td className={`p-3 font-bold ${isFraud ? 'text-rose-400' : 'text-emerald-400'}`}>
                      -{deficitPercentage}% ({volumeDeficit.toFixed(2)} m³ Shortfall)
                    </td>
                    <td className="p-3 text-right">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border ${
                          isFraud
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-red-glow'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-green-glow'
                        }`}
                      >
                        {isFraud ? 'OVER-BILLING FRAUD' : 'WITHIN SLA TOLERANCE'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
