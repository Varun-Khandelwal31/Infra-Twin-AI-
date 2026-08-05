'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import BeforeAfterViewer from '@/components/fraud/BeforeAfterViewer';
import MaterialVarianceTable from '@/components/fraud/MaterialVarianceTable';
import { CONTRACTOR_SLA_SAMPLES, SLAVerificationData } from '@/lib/mockInference';
import { Download, Share2, ShieldCheck, AlertTriangle, Sliders, Activity, RefreshCw } from 'lucide-react';

export default function FraudDetectionPage() {
  const [selectedSample, setSelectedSample] = useState<SLAVerificationData>(CONTRACTOR_SLA_SAMPLES[0]);

  // Real-time SLA Interactive Controls State
  const [overbillPct, setOverbillPct] = useState<number>(
    selectedSample.status === 'FRAUD_ALERT' ? 51 : 2
  );
  const [compactionDensity, setCompactionDensity] = useState<number>(
    selectedSample.status === 'FRAUD_ALERT' ? 68 : 96
  );
  const [allowedTolerance, setAllowedTolerance] = useState<number>(5);

  // Sync sliders when sample preset changes
  useEffect(() => {
    setOverbillPct(selectedSample.status === 'FRAUD_ALERT' ? 51 : 2);
    setCompactionDensity(selectedSample.status === 'FRAUD_ALERT' ? 68 : 96);
  }, [selectedSample.id]);

  // Real-Time Dynamic SLA Calculation Engine
  const calculatedQualityScore = Math.max(
    10,
    Math.min(99, Math.round(compactionDensity * 0.55 + (100 - overbillPct) * 0.45))
  );

  const isFraud = overbillPct > allowedTolerance || compactionDensity < 85 || calculatedQualityScore < 75;
  const currentStatus: 'APPROVED' | 'FRAUD_ALERT' = isFraud ? 'FRAUD_ALERT' : 'APPROVED';

  // Construct dynamic real-time sample state
  const dynamicSample: SLAVerificationData = {
    ...selectedSample,
    repairQualityScore: calculatedQualityScore,
    status: currentStatus,
    summaryMetrics: {
      repairQuality: calculatedQualityScore,
      surfaceSmoothness: Math.max(20, Math.min(98, Math.round(compactionDensity * 0.9))),
      compactionQuality: compactionDensity,
      edgeCompliance: Math.max(15, Math.min(95, Math.round((100 - overbillPct) * 0.95))),
      drainageCompliance: Math.max(10, Math.min(95, Math.round(calculatedQualityScore * 0.9))),
    },
    materialTable: selectedSample.materialTable.map((row) => {
      const isDeficit = overbillPct > allowedTolerance;
      const rowVariance = isDeficit ? `-${overbillPct.toFixed(1)}%` : `-1.8%`;
      const rowStatus = isDeficit ? 'Fraud Detected' : 'Within Limit';
      return {
        ...row,
        variance: row.type === 'Total' ? `-${overbillPct.toFixed(1)}% (Avg)` : rowVariance,
        status: isDeficit ? 'Exceeded Threshold' : 'Within Limit',
      };
    }),
    verificationExplanation: isFraud
      ? `REAL-TIME SLA ALERT: Contractor claimed 100% full-depth restoration but multi-spectral audit detects a ${overbillPct}% material volume deficit and compaction density of ${compactionDensity}% (below IRC 82 threshold). Payment clearance has been automatically FROZEN.`
      : `REAL-TIME SLA PASSED: Repair quality score is ${calculatedQualityScore}% with ${compactionDensity}% compaction density. Material variance (${overbillPct}%) is within allowed threshold (${allowedTolerance}%). Payment clearance APPROVED.`,
  };

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
                  Contractor SLA & Fraud Verification Center
                </h1>
                <span className="p-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time 3D volumetric audit, density validation, and contractor payment clearance engine
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-semibold flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Export SLA Audit</span>
              </button>
              <button className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 shadow-cyan-glow">
                <Share2 className="w-3.5 h-3.5" />
                <span>Freeze/Approve Payment</span>
              </button>
            </div>
          </div>

          {/* Real-Time Interactive SLA Parameter Control Sliders */}
          <div className="p-4 rounded-2xl bg-[#111726]/90 border border-cyan-500/30 shadow-cyan-glow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono">
                <Sliders className="w-4 h-4" />
                <span>REAL-TIME SLA TELEMETRY SIMULATOR</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Adjust sliders to test live payment freeze triggers
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Slider 1: Material Deficit / Overbilling */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Material Deficit / Over-Billing:</span>
                  <span className={`font-bold ${overbillPct > allowedTolerance ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {overbillPct}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={1}
                  value={overbillPct}
                  onChange={(e) => setOverbillPct(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0% (Compliant)</span>
                  <span>30% (High Deficit)</span>
                  <span>60% (Severe Fraud)</span>
                </div>
              </div>

              {/* Slider 2: Compaction Density */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Sub-base Compaction Density:</span>
                  <span className={`font-bold ${compactionDensity < 85 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {compactionDensity}%
                  </span>
                </div>
                <input
                  type="range"
                  min={55}
                  max={100}
                  step={1}
                  value={compactionDensity}
                  onChange={(e) => setCompactionDensity(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>55% (Failed)</span>
                  <span>85% (IRC Threshold)</span>
                  <span>100% (Optimal)</span>
                </div>
              </div>

              {/* Slider 3: Allowed Variance Threshold */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">Allowed Variance Limit:</span>
                  <span className="font-bold text-cyan-400">{allowedTolerance}%</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={20}
                  step={1}
                  value={allowedTolerance}
                  onChange={(e) => setAllowedTolerance(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>2% Strict</span>
                  <span>10% Moderate</span>
                  <span>20% Relaxed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata Strip & Sample Presets */}
          <div className="p-3.5 rounded-2xl bg-[#111726]/80 backdrop-blur-xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-300">
              <span>Project: <strong className="text-white">{dynamicSample.project}</strong></span>
              <span>•</span>
              <span>Road ID: <strong className="text-cyan-400">{dynamicSample.roadId}</strong></span>
              <span>•</span>
              <span>Inspection ID: <strong className="text-cyan-400">{dynamicSample.inspectionId}</strong></span>
              <span>•</span>
              <span>Live Status: <strong className={currentStatus === 'APPROVED' ? 'text-emerald-400' : 'text-rose-400'}>{currentStatus}</strong></span>
            </div>

            {/* Test Sample Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSelectedSample(CONTRACTOR_SLA_SAMPLES[0])}
                className={`px-3 py-1.5 rounded-lg transition-all font-sans font-medium text-xs ${
                  selectedSample.id === 'sla-sample-1'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-green-glow'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                Compliant Repair Preset
              </button>

              <button
                onClick={() => setSelectedSample(CONTRACTOR_SLA_SAMPLES[1])}
                className={`px-3 py-1.5 rounded-lg transition-all font-sans font-medium text-xs ${
                  selectedSample.id === 'sla-sample-2'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-red-glow'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                Fraud Alert Preset
              </button>
            </div>
          </div>

          {/* Side-by-side Before/After Drone Visual with Draggable Split Slider */}
          <BeforeAfterViewer sample={dynamicSample} />

          {/* Material Variance & Verification Summary Table */}
          <MaterialVarianceTable sample={dynamicSample} />
        </main>
      </div>
    </div>
  );
}
