'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, IndianRupee, AlertTriangle, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';

const PREDICTIVE_DATA = [
  { name: 'Outer Ring Road (IIT Flyover)', x: 9400, y: 5.2, z: 92, risk: 'Critical', ward: 'Ward 12', daysToFailure: 14, costNow: 4.8, costLater: 32.0 },
  { name: 'Barakhamba Road Arterial', x: 6800, y: 4.8, z: 85, risk: 'Critical', ward: 'Ward 34', daysToFailure: 22, costNow: 3.5, costLater: 24.5 },
  { name: 'NH-48 Mahipalpur Stretch', x: 11200, y: 3.6, z: 68, risk: 'Warning', ward: 'Ward 14', daysToFailure: 45, costNow: 5.2, costLater: 35.0 },
  { name: 'Connaught Place Outer Circle', x: 4200, y: 4.1, z: 62, risk: 'Warning', ward: 'Ward 34', daysToFailure: 58, costNow: 2.8, costLater: 18.2 },
  { name: 'Janpath Avenue', x: 3100, y: 1.8, z: 24, risk: 'Low', ward: 'Ward 33', daysToFailure: 180, costNow: 1.2, costLater: 8.5 },
  { name: 'Dwarka Expressway Sec 21', x: 5600, y: 0.9, z: 15, risk: 'Low', ward: 'Ward 08', daysToFailure: 240, costNow: 1.5, costLater: 9.8 },
];

export default function PredictivePage() {
  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-100 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111726] via-slate-900 to-purple-950/40 border border-cyan-500/20 shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h1 className="text-xl font-bold text-white font-display">
                  Predictive Maintenance & Budget Allocation
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Traffic Load vs. Road Age Degradation Scatter Model • Preventative Optimization
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30">
                AI Risk Forecast Active
              </span>
            </div>
          </div>

          {/* Core Scatter Plot Chart Card */}
          <div className="p-6 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white font-display">
                  Traffic Volume vs. Pavement Age Scatter Matrix
                </h2>
                <p className="text-xs text-slate-400">
                  Bubble size represents Distress Risk Index. Color indicates failure urgency.
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Critical (&lt;30 days)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Warning (30-90 days)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk (&gt;90 days)
                </span>
              </div>
            </div>

            {/* Recharts Scatter Plot */}
            <div className="w-full h-80 bg-slate-950/60 rounded-xl p-4 border border-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis
                    type="number"
                    dataKey="x"
                    name="Traffic Load"
                    unit=" PCU/day"
                    stroke="#64748b"
                    fontSize={11}
                  />
                  <YAxis
                    type="number"
                    dataKey="y"
                    name="Road Age"
                    unit=" Yrs"
                    stroke="#64748b"
                    fontSize={11}
                  />
                  <ZAxis type="number" dataKey="z" range={[100, 800]} name="Risk Index" />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#00d9ff',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="p-3 bg-slate-900 border border-cyan-500/50 rounded-xl shadow-glass text-xs space-y-1">
                          <div className="font-bold text-white">{d.name}</div>
                          <div className="text-slate-400">Ward: {d.ward}</div>
                          <div className="text-cyan-400 font-mono">Traffic: {d.x.toLocaleString()} PCU/day</div>
                          <div className="text-slate-300 font-mono">Age: {d.y} Years</div>
                          <div className="text-rose-400 font-mono font-bold">
                            Predicted Failure: in {d.daysToFailure} Days
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Scatter name="Road Segments" data={PREDICTIVE_DATA}>
                    {PREDICTIVE_DATA.map((entry, index) => {
                      let fill = '#10b981';
                      if (entry.risk === 'Critical') fill = '#ef4444';
                      else if (entry.risk === 'Warning') fill = '#f59e0b';
                      return <Cell key={`cell-${index}`} fill={fill} opacity={0.8} />;
                    })}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Preventative Budget Allocation Suggestion Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111726] to-[#0c1322] border border-cyan-500/30 shadow-glass space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Preventative Budget Allocation Optimization
                  </h3>
                  <p className="text-xs text-slate-400">AI Recommendation Engine</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                Save 6.6x Budget
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-3">
                <div className="text-xs uppercase font-mono font-bold text-emerald-400">
                  Option A: Preventative Patching Now (Next 30 Days)
                </div>
                <div className="text-3xl font-extrabold text-white font-display">₹4.2 Lakhs</div>
                <p className="text-xs text-slate-300">
                  Full-depth micro-patching of Outer Ring Road & Barakhamba Road before monsoon moisture infiltration.
                </p>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Extends pavement life by 4+ years</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-rose-500/30 space-y-3">
                <div className="text-xs uppercase font-mono font-bold text-rose-400">
                  Option B: Deferred Full Reconstruction (After Failure)
                </div>
                <div className="text-3xl font-extrabold text-rose-400 font-display">₹28.0 Lakhs</div>
                <p className="text-xs text-slate-300">
                  Complete sub-base milling, DBM overlay, traffic diversion costs, and emergency contractor tenders.
                </p>
                <div className="text-[11px] font-mono text-rose-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Causes 6.6x higher municipal budget strain</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/copilot"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-cyan-glow transition-all flex items-center gap-2"
              >
                <span>Generate Preventative Maintenance Work Orders</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
