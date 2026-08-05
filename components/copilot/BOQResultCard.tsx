'use client';

import React from 'react';
import { BOQResponse } from '@/lib/groq';
import {
  FileText,
  IndianRupee,
  Leaf,
  Clock,
  ShieldCheck,
  Download,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/utils';

interface BOQResultCardProps {
  boq: BOQResponse;
}

export default function BOQResultCard({ boq }: BOQResultCardProps) {
  const isLive = boq.source === 'live';

  return (
    <div className="p-6 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/30 shadow-glass space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-display">
                  Automated Bill of Quantities (BOQ)
                </h2>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                    isLive
                      ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {isLive ? 'Llama-3 70B Live' : 'Simulated Engine Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-400">IRC:82-2023 & MoRTH Aligned Estimate</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-semibold flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF</span>
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 shadow-cyan-glow">
            <Share2 className="w-3.5 h-3.5" />
            <span>Contractor Tender</span>
          </button>
        </div>
      </div>

      {/* Rationale Summary */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <span className="font-bold text-cyan-400">Engineering Rationale: </span>
        {boq.summary}
      </div>

      {/* Key Metric Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Distress Area</div>
          <div className="text-lg font-bold text-white font-display mt-0.5">{boq.distressAreaSqm} sqm</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Max Depth</div>
          <div className="text-lg font-bold text-white font-display mt-0.5">{boq.depthCm} cm</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">Est. Execution Time</div>
          <div className="text-lg font-bold text-cyan-400 font-display mt-0.5 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{boq.executionTimeDays} Day</span>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 font-mono">CO2 Carbon Footprint</div>
          <div className="text-lg font-bold text-emerald-400 font-display mt-0.5 flex items-center gap-1">
            <Leaf className="w-4 h-4" />
            <span>{boq.estimatedCO2Kg} kg CO2e</span>
          </div>
        </div>
      </div>

      {/* Materials Table */}
      <div>
        <h3 className="text-xs uppercase font-mono font-bold text-cyan-400 mb-3 tracking-wider">
          1. Material Specifications & Schedule
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px]">
              <tr>
                <th className="p-3">Material Description</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Unit Rate (INR)</th>
                <th className="p-3 text-right">Total (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
              {boq.materials.map((mat, i) => (
                <tr key={i} className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-slate-200">{mat.item}</td>
                  <td className="p-3 font-mono text-cyan-300">{mat.quantity}</td>
                  <td className="p-3 font-mono text-slate-400">₹{mat.rateINR.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono font-bold text-slate-100 text-right">
                    ₹{mat.totalINR.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Labor & Machinery Table */}
      <div>
        <h3 className="text-xs uppercase font-mono font-bold text-cyan-400 mb-3 tracking-wider">
          2. Labor, Equipment & Machinery Deployment
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px]">
              <tr>
                <th className="p-3">Item / Machinery</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Daily Rate (INR)</th>
                <th className="p-3 text-right">Total (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
              {boq.laborAndEquipment.map((lab, i) => (
                <tr key={i} className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-slate-200">{lab.item}</td>
                  <td className="p-3 font-mono text-cyan-300">{lab.quantity}</td>
                  <td className="p-3 font-mono text-slate-400">₹{lab.rateINR.toLocaleString('en-IN')}</td>
                  <td className="p-3 font-mono font-bold text-slate-100 text-right">
                    ₹{lab.totalINR.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total Cost Summary Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/50 to-blue-950/50 border border-cyan-500/40 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase font-mono font-bold text-cyan-400">Total Net Estimated BOQ</div>
          <div className="text-[11px] text-slate-400">Includes materials, labor, machinery & 18% GST</div>
        </div>
        <div className="text-2xl font-extrabold text-white font-display">
          ₹{boq.totalCostINR.toLocaleString('en-IN')}
        </div>
      </div>

      {/* IRC Citations */}
      <div className="pt-2">
        <h4 className="text-[11px] font-mono text-slate-400 mb-2 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          IRC & MoRTH Statutory Citations Grounding:
        </h4>
        <div className="flex flex-wrap gap-2">
          {boq.ircCitations.map((cit, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300"
            >
              {cit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
