'use client';

import React from 'react';
import { SLAVerificationData } from '@/lib/mockInference';
import { CheckCircle2, ShieldAlert, AlertTriangle, Info } from 'lucide-react';

interface MaterialVarianceTableProps {
  sample: SLAVerificationData;
}

export default function MaterialVarianceTable({ sample }: MaterialVarianceTableProps) {
  const m = sample.summaryMetrics;
  const isApproved = sample.status === 'APPROVED';

  return (
    <div className="space-y-6">
      {/* Lower 3 Cards Grid matching Screenshot 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Card: Repair Verification Summary progress bars */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-3.5">
          <h3 className="text-xs font-bold text-white font-display">Repair Verification Summary</h3>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400">Repair Quality Score</span>
                <span className="font-mono font-bold text-emerald-400">{m.repairQuality}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${m.repairQuality}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400">Surface Smoothness</span>
                <span className="font-mono font-bold text-emerald-400">{m.surfaceSmoothness}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${m.surfaceSmoothness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400">Compaction Quality</span>
                <span className="font-mono font-bold text-emerald-400">{m.compactionQuality}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${m.compactionQuality}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400">Edge Compliance</span>
                <span className="font-mono font-bold text-emerald-400">{m.edgeCompliance}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${m.edgeCompliance}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400">Drainage Compliance</span>
                <span className="font-mono font-bold text-emerald-400">{m.drainageCompliance}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${m.drainageCompliance}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Card: AI Analysis Results checklist */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-3.5">
          <h3 className="text-xs font-bold text-white font-display">AI Analysis Results</h3>

          <div className="space-y-2.5 text-xs">
            {sample.aiAnalysisResults.map((result, idx) => {
              const isError = result.startsWith('✕');
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                    isError
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  }`}
                >
                  {isError ? (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  <span className="font-medium">{result}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Material Used vs Material Claimed Table matching screenshot 2 */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-3.5">
          <h3 className="text-xs font-bold text-white font-display">Material Used vs Material Claimed</h3>

          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-900 text-slate-400 font-mono">
                <tr>
                  <th className="p-2">Material Type</th>
                  <th className="p-2">Claimed</th>
                  <th className="p-2">AI Used</th>
                  <th className="p-2">Variance</th>
                  <th className="p-2 text-right">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
                {sample.materialTable.map((row, idx) => {
                  const isFraud = row.status.includes('Fraud') || row.status.includes('Exceeded');
                  return (
                    <tr key={idx} className="hover:bg-slate-900/50">
                      <td className="p-2 font-semibold text-slate-200">{row.type}</td>
                      <td className="p-2 font-mono text-slate-400">{row.claimed}</td>
                      <td className="p-2 font-mono text-cyan-300">{row.used}</td>
                      <td
                        className={`p-2 font-mono font-bold ${
                          isFraud ? 'text-rose-400' : 'text-emerald-400'
                        }`}
                      >
                        {row.variance}
                      </td>
                      <td className="p-2 text-right">
                        <span
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${
                            isFraud
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>AI detection based on multi-spectral analysis, texture mapping & 3D volume estimation.</span>
          </div>
        </div>
      </div>

      {/* Bottom Explanation Banner matching screenshot 2 */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
        isApproved
          ? 'bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border-cyan-500/30'
          : 'bg-gradient-to-r from-rose-950/40 via-slate-900 to-amber-950/40 border-rose-500/40'
      }`}>
        <div className={`p-2 rounded-lg border shrink-0 ${
          isApproved ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
        }`}>
          {isApproved ? <CheckCircle2 className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
        </div>
        <div>
          <div className="font-bold text-white font-display">AI Verification Explanation</div>
          <p className="text-slate-300 text-xs mt-1 leading-relaxed">
            {sample.verificationExplanation}
          </p>
        </div>
      </div>
    </div>
  );
}
