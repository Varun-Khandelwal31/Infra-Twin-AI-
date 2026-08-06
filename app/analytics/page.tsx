'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  ShieldCheck,
  Award,
  Layers,
  Download,
  Calendar,
} from 'lucide-react';

const HISTORICAL_PCI_DATA = [
  { month: 'Jan', ndmc: 82, southDelhi: 74, dwarka: 78, airportZone: 85 },
  { month: 'Feb', ndmc: 80, southDelhi: 72, dwarka: 76, airportZone: 83 },
  { month: 'Mar', ndmc: 78, southDelhi: 70, dwarka: 74, airportZone: 80 },
  { month: 'Apr', ndmc: 75, southDelhi: 68, dwarka: 71, airportZone: 78 },
  { month: 'May', ndmc: 74, southDelhi: 65, dwarka: 70, airportZone: 76 },
  { month: 'Jun', ndmc: 72, southDelhi: 62, dwarka: 68, airportZone: 74 },
];

const DISTRESS_DISTRIBUTION = [
  { name: 'Water-Bound Potholes', value: 42, color: '#ef4444' },
  { name: 'Alligator Cracking', value: 28, color: '#f59e0b' },
  { name: 'Longitudinal Rutting', value: 18, color: '#3b82f6' },
  { name: 'Transverse Thermal Cracks', value: 12, color: '#10b981' },
];

const CONTRACTOR_LEADERBOARD = [
  { name: 'Greenline Pavements Pvt Ltd', totalOrders: 14, verifiedSla: '98.5%', status: 'Tier 1 Certified' },
  { name: 'Apex Infraworks Pvt Ltd', totalOrders: 22, verifiedSla: '94.2%', status: 'Tier 1 Certified' },
  { name: 'Urban Infrastructure Corp', totalOrders: 9, verifiedSla: '88.0%', status: 'Tier 2 Compliant' },
  { name: 'Buildcon Highways Ltd', totalOrders: 18, verifiedSla: '48.5%', status: 'Under Investigation (Fraud)' },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-100 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#111726] via-slate-900 to-indigo-950/40 border border-cyan-500/20 shadow-glass">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white font-display">
                  Infrastructure Telemetry Analytics & PCI Trends
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Multi-Ward Pavement Degradation Curves • Distress Severity Distribution • Contractor Audit Ratings
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>Export Analytics CSV</span>
              </button>
            </div>
          </div>

          {/* Historical PCI Trend Line Chart */}
          <div className="p-6 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white font-display">
                  Pavement Condition Index (PCI) Historical Degradation Trend
                </h2>
                <p className="text-xs text-slate-400">Monthly PCI trajectory across major smart city zones</p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                {['1M', '3M', '6M', '1Y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg border transition-all ${
                      timeRange === range
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-glow font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-80 bg-slate-950/60 rounded-xl p-4 border border-slate-800">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={HISTORICAL_PCI_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[50, 100]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#00d9ff',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="ndmc" name="Zone 4 (NDMC)" stroke="#00d9ff" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="southDelhi" name="Zone 1 (South Delhi)" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="dwarka" name="Zone 8 (Dwarka)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="airportZone" name="Zone 14 (Airport)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Grid: Distress Pie Chart + Contractor Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Pie Chart */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white font-display">Distress Type Breakdown</h3>
                <p className="text-xs text-slate-400">AI Computer Vision Classification</p>
              </div>

              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={DISTRESS_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {DISTRESS_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderColor: '#00d9ff',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                {DISTRESS_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.name}
                    </span>
                    <span className="font-mono font-bold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contractor SLA Ranking Leaderboard */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Contractor SLA Performance Ranking</h3>
                  <p className="text-xs text-slate-400">Audited via AI Drone 3D Volumetric Scans</p>
                </div>
                <Award className="w-5 h-5 text-amber-400" />
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-mono">
                    <tr>
                      <th className="p-3">Contractor Name</th>
                      <th className="p-3">Work Orders</th>
                      <th className="p-3">Verified SLA Compliance</th>
                      <th className="p-3 text-right">Audit Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/40 font-mono">
                    {CONTRACTOR_LEADERBOARD.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3 font-semibold text-slate-200 font-sans">{c.name}</td>
                        <td className="p-3 text-slate-400">{c.totalOrders} Completed</td>
                        <td className="p-3 font-bold text-cyan-300">{c.verifiedSla}</td>
                        <td className="p-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              c.verifiedSla.startsWith('9')
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : c.verifiedSla.startsWith('8')
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                : 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
