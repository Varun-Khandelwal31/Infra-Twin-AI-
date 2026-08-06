'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import Link from 'next/link';
import {
  ClipboardList,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  IndianRupee,
  ShieldCheck,
  FileText,
  Building2,
  Plus,
} from 'lucide-react';

export default function WorkOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const workOrders = [
    {
      id: 'WO-2025-8041',
      project: 'Connaught Place Full-Depth Bituminous Patching',
      contractor: 'Apex Infraworks Pvt Ltd',
      zone: 'Zone 4 (NDMC)',
      budget: '₹4.80 Lakhs',
      materialClaimed: '2.80 Ton Bitumen',
      progress: 85,
      status: 'UNDER_AUDIT',
      deadline: 'Jun 15, 2025',
      slaStatus: 'PENDING_SCAN',
      sampleId: 'sample-1',
    },
    {
      id: 'WO-2025-8042',
      project: 'Outer Ring Road Flyover Milling & DBM Overlay',
      contractor: 'Buildcon Highways Ltd',
      zone: 'Zone 1 (South Delhi)',
      budget: '₹14.50 Lakhs',
      materialClaimed: '6.50 Ton Bitumen',
      progress: 40,
      status: 'PAYMENT_FROZEN',
      deadline: 'May 30, 2025',
      slaStatus: 'FRAUD_DETECTED',
      sampleId: 'sample-2',
    },
    {
      id: 'WO-2025-8043',
      project: 'Dwarka Sector 21 Tack Coat & Crack Seal',
      contractor: 'Greenline Pavements',
      zone: 'Zone 8 (Dwarka)',
      budget: '₹2.10 Lakhs',
      materialClaimed: '1.20 Ton Bitumen',
      progress: 100,
      status: 'APPROVED',
      deadline: 'May 20, 2025',
      slaStatus: 'PASSED',
      sampleId: 'sample-3',
    },
    {
      id: 'WO-2025-8044',
      project: 'Barakhamba Sub-base Grouting & Saw Cut Patch',
      contractor: 'Apex Infraworks Pvt Ltd',
      zone: 'Zone 4 (NDMC)',
      budget: '₹6.20 Lakhs',
      materialClaimed: '3.50 Ton Bitumen',
      progress: 60,
      status: 'IN_PROGRESS',
      deadline: 'Jun 30, 2025',
      slaStatus: 'SCHEDULED',
      sampleId: 'sample-4',
    },
  ];

  const filteredOrders = workOrders.filter((wo) => {
    const matchesSearch =
      wo.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.contractor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || wo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-100 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#111726] via-slate-900 to-blue-950/40 border border-cyan-500/20 shadow-glass">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white font-display">
                  Contractor Work Orders & SLA Lifecycle Governance
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Automated Material Billing Audits • Escrow Disbursement • IRC:82 Compliance Tracking
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-cyan-glow transition-all flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Issue New Work Order Tender</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Total Tender Budget</div>
                <div className="text-2xl font-bold text-white font-display">₹27.60 Lakhs</div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Active Work Orders</div>
                <div className="text-2xl font-bold text-cyan-400 font-display">4 Active</div>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30">
                <ClipboardList className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Payment Holds (Fraud)</div>
                <div className="text-2xl font-bold text-rose-400 font-display">1 Blocked</div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Cleared Disbursals</div>
                <div className="text-2xl font-bold text-emerald-400 font-display">₹2.10 Lakhs</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search & Status Filter */}
          <div className="p-4 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search work order ID, contractor, or project name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Status Filter:</span>
              {['ALL', 'UNDER_AUDIT', 'PAYMENT_FROZEN', 'APPROVED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    statusFilter === st
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-glow font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Work Orders List Cards */}
          <div className="space-y-4">
            {filteredOrders.map((wo) => {
              let statusBadge = 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
              if (wo.status === 'PAYMENT_FROZEN') statusBadge = 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
              else if (wo.status === 'APPROVED') statusBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

              return (
                <div
                  key={wo.id}
                  className="p-5 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-6 card-3d-tilt"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-cyan-400 text-xs">{wo.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${statusBadge}`}>
                        {wo.status}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{wo.zone}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white font-display">{wo.project}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                        {wo.contractor}
                      </span>
                      <span>•</span>
                      <span>Budget: <strong className="text-emerald-400">{wo.budget}</strong></span>
                      <span>•</span>
                      <span>Deadline: {wo.deadline}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 max-w-md pt-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Repair Progress</span>
                        <span className="text-cyan-300 font-bold">{wo.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${wo.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                    <Link
                      href="/sla-verification"
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>Verify SLA Scan</span>
                    </Link>

                    <Link
                      href={`/copilot?sample=${wo.sampleId}`}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-cyan-glow transition-all flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Generate BOQ</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
