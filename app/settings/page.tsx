'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import {
  Settings,
  Sliders,
  Cpu,
  Shield,
  Key,
  Database,
  Radio,
  CheckCircle2,
  Save,
  RotateCcw,
} from 'lucide-react';

export default function SettingsPage() {
  const [yoloConf, setYoloConf] = useState(85);
  const [depthScale, setDepthScale] = useState(1.2);
  const [modelSelect, setModelSelect] = useState('llama-3.3-70b-versatile');
  const [telemetryInterval, setTelemetryInterval] = useState(5);
  const [ircBenchmark, setIrcBenchmark] = useState('IRC:82-2023');
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-100 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#111726] via-slate-900 to-cyan-950/40 border border-cyan-500/20 shadow-glass">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <Settings className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white font-display">
                  System Configuration & AI Model Settings
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                YOLOv8 Segmentation Thresholds • Monocular Depth Matrix Scaling • Groq LLM Runtime
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-cyan-glow transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save System Parameters</span>
              </button>
            </div>
          </div>

          {savedToast && (
            <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold animate-pulse flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>System Configuration Parameters Updated & Synchronized Live!</span>
            </div>
          )}

          {/* Core Settings Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section 1: Computer Vision & Depth Engine Parameters */}
            <div className="p-6 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-5 card-3d-tilt">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono">
                <Cpu className="w-4 h-4" />
                <span>COMPUTER VISION & DEPTH MATRIX PIPELINE</span>
              </div>

              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">YOLOv8-Seg Instance Confidence Threshold:</span>
                  <span className="font-bold text-cyan-400">{yoloConf}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={99}
                  value={yoloConf}
                  onChange={(e) => setYoloConf(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>50% (High Recall)</span>
                  <span>85% (Optimal)</span>
                  <span>99% (Strict Precision)</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Depth Anything Monocular Scale Factor:</span>
                  <span className="font-bold text-cyan-400">{depthScale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={2.0}
                  step={0.05}
                  value={depthScale}
                  onChange={(e) => setDepthScale(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.80x (Shallow)</span>
                  <span>1.20x (Standard)</span>
                  <span>2.00x (Deep Extrusion)</span>
                </div>
              </div>
            </div>

            {/* Section 2: GenAI Copilot & LLM Model Runtime */}
            <div className="p-6 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-5 card-3d-tilt">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono">
                <Sliders className="w-4 h-4" />
                <span>NIRMAN COPILOT & LLM RUNTIME</span>
              </div>

              {/* Model Select */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 block">
                  Active Groq LLM Inference Model:
                </label>
                <select
                  value={modelSelect}
                  onChange={(e) => setModelSelect(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="llama-3.3-70b-versatile">Llama-3.3-70b-versatile (Recommended)</option>
                  <option value="llama-3.1-8b-instant">Llama-3.1-8b-instant (Fast Speed)</option>
                  <option value="mixtral-8x7b-32768">Mixtral-8x7b-32768 (MoE Architecture)</option>
                </select>
              </div>

              {/* IRC Standard Toggle */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-xs font-mono text-slate-300 block">
                  Indian Road Congress (IRC) Governance Standard:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['IRC:82-2023', 'IRC:37-2018'].map((std) => (
                    <button
                      key={std}
                      onClick={() => setIrcBenchmark(std)}
                      className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                        ircBenchmark === std
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-glow'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {std}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
