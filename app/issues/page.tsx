'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import {
  AlertTriangle,
  Search,
  Filter,
  ExternalLink,
  Bot,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  Layers,
  ArrowUpDown,
  Plus,
} from 'lucide-react';
import { INSPECTION_SAMPLES } from '@/lib/mockInference';

export default function IssuesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [wardFilter, setWardFilter] = useState<string>('ALL');

  const issuesList = [
    {
      id: 'ISS-801',
      title: 'Outer Ring Road (IIT Flyover)',
      distress: 'Critical Structural Pothole (Depth 18.2cm)',
      severity: 'Critical',
      ward: 'Ward 12 - South Delhi',
      status: 'OPEN',
      reportedAt: '10 mins ago',
      reportedBy: 'Autonomous Drone DR-908',
      areaSqm: 4.1,
      maxDepthCm: 18.2,
      estCost: '₹3.2 Lakhs',
      sampleId: 'sample-2',
    },
    {
      id: 'ISS-802',
      title: 'Connaught Place Outer Circle',
      distress: 'Severe Water-Bound Pothole (Depth 15.0cm)',
      severity: 'Critical',
      ward: 'Ward 34 - NDMC',
      status: 'IN_PROGRESS',
      reportedAt: '35 mins ago',
      reportedBy: 'Autonomous Drone DR-904',
      areaSqm: 2.5,
      maxDepthCm: 15.0,
      estCost: '₹1.8 Lakhs',
      sampleId: 'sample-1',
    },
    {
      id: 'ISS-803',
      title: 'Barakhamba Road Exit 2',
      distress: 'High Density Alligator Cracking & Sub-base Collapse',
      severity: 'High',
      ward: 'Ward 34 - NDMC',
      status: 'OPEN',
      reportedAt: '1 hour ago',
      reportedBy: 'Citizen Telemetry App',
      areaSqm: 3.5,
      maxDepthCm: 16.4,
      estCost: '₹2.45 Lakhs',
      sampleId: 'sample-4',
    },
    {
      id: 'ISS-804',
      title: 'Dwarka Expressway Sector 21',
      distress: 'Longitudinal Rutting & Edge Bleeding',
      severity: 'Moderate',
      ward: 'Ward 08 - Dwarka',
      status: 'RESOLVED',
      reportedAt: '3 hours ago',
      reportedBy: 'Autonomous Drone DR-912',
      areaSqm: 1.8,
      maxDepthCm: 8.5,
      estCost: '₹0.95 Lakhs',
      sampleId: 'sample-3',
    },
    {
      id: 'ISS-805',
      title: 'NH-48 Mahipalpur Stretch',
      distress: 'Transverse Thermal Cracking & Asphalt Void',
      severity: 'Moderate',
      ward: 'Ward 14 - Airport Zone',
      status: 'IN_PROGRESS',
      reportedAt: '5 hours ago',
      reportedBy: 'Patrol Vehicle Scan',
      areaSqm: 2.1,
      maxDepthCm: 7.2,
      estCost: '₹1.2 Lakhs',
      sampleId: 'sample-5',
    },
  ];

  const filteredIssues = issuesList.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.distress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || issue.severity === severityFilter;
    const matchesWard = wardFilter === 'ALL' || issue.ward.includes(wardFilter);
    return matchesSearch && matchesSeverity && matchesWard;
  });

  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-100 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#111726] via-slate-900 to-rose-950/30 border border-cyan-500/20 shadow-glass">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white font-display">
                  Citywide Road Issues & Distress Command Center
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Real-Time AI-Detected Pavement Voids • Ticket Lifecycle Management • Work Order Dispatch
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-cyan-glow transition-all flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Log New Inspection Issue</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Total Active Issues</div>
                <div className="text-2xl font-bold text-white font-display">{issuesList.length} Logged</div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Critical Priority Voids</div>
                <div className="text-2xl font-bold text-rose-400 font-display">2 Critical</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Under Repair / In Progress</div>
                <div className="text-2xl font-bold text-amber-400 font-display">2 Active</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">SLA Resolved Today</div>
                <div className="text-2xl font-bold text-emerald-400 font-display">1 Completed</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="p-4 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by location, distress type, or Ticket ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1 text-slate-400">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>Severity:</span>
              </div>
              {['ALL', 'Critical', 'High', 'Moderate'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    severityFilter === sev
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-glow font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Issues Data Table */}
          <div className="p-5 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4">
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="p-3">Ticket ID</th>
                    <th className="p-3">Location & Stretch</th>
                    <th className="p-3">Distress Type</th>
                    <th className="p-3">Severity</th>
                    <th className="p-3">AI Metrics (Area / Depth)</th>
                    <th className="p-3">Repair Est.</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/40 font-mono">
                  {filteredIssues.map((issue) => {
                    let sevBadge = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
                    if (issue.severity === 'High') sevBadge = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
                    else if (issue.severity === 'Moderate') sevBadge = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';

                    let statusBadge = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                    if (issue.status === 'IN_PROGRESS') statusBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse';
                    else if (issue.status === 'RESOLVED') statusBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

                    return (
                      <tr key={issue.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3 font-bold text-cyan-400">{issue.id}</td>
                        <td className="p-3 font-sans">
                          <div className="font-bold text-slate-100">{issue.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{issue.ward}</div>
                        </td>
                        <td className="p-3 text-slate-300">{issue.distress}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${sevBadge}`}>
                            {issue.severity}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">
                          <span className="text-white font-bold">{issue.areaSqm} m²</span> • <span className="text-cyan-300">{issue.maxDepthCm} cm</span>
                        </td>
                        <td className="p-3 text-emerald-400 font-bold">{issue.estCost}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusBadge}`}>
                            {issue.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center gap-1.5 justify-end">
                            <Link
                              href={`/audit?sample=${issue.sampleId}`}
                              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold transition-all flex items-center gap-1"
                            >
                              <span>Audit</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>

                            <Link
                              href={`/copilot?sample=${issue.sampleId}`}
                              className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[10px] font-bold transition-all flex items-center gap-1"
                            >
                              <Bot className="w-3 h-3" />
                              <span>BOQ</span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
