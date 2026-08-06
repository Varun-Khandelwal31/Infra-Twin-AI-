'use client';

import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import { Users, Mail, Phone, MapPin, Shield, CheckCircle2, Activity, Award } from 'lucide-react';

export default function TeamPage() {
  const teamMembers = [
    {
      name: 'Aarav Mehta',
      role: 'City Chief Infrastructure Engineer',
      zone: 'New Delhi Municipal Council (NDMC)',
      email: 'aarav.mehta@ndmc.gov.in',
      phone: '+91 98101 44521',
      status: 'ON_DUTY',
      sorties: 42,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Rajesh Kumar',
      role: 'UAV Drone Operations Lead (Zone 1)',
      zone: 'South Delhi Municipal Corp',
      email: 'rajesh.k@infratwin.ai',
      phone: '+91 98210 11982',
      status: 'AIRBORNE',
      sorties: 128,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Ananya Sharma',
      role: 'Senior Pavement Materials Specialist',
      zone: 'Central Delhi Zone 4',
      email: 'ananya.s@ndmc.gov.in',
      phone: '+91 98711 33029',
      status: 'ON_DUTY',
      sorties: 84,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    },
    {
      name: 'Vikram Singh',
      role: 'Contractor SLA Verification Auditor',
      zone: 'Dwarka Expressway Sector',
      email: 'vikram.singh@pwd.gov.in',
      phone: '+91 99100 88210',
      status: 'ON_DUTY',
      sorties: 65,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    },
  ];

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
                  <Users className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white font-display">
                  Municipal Infrastructure Audit & Operations Team
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Chief Engineers • UAV Flight Leads • Pavement Quality Auditors • Duty Roster
              </p>
            </div>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4 flex flex-col justify-between card-3d-tilt"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-2xl border-2 border-cyan-500/40 object-cover shadow-cyan-glow"
                    />
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        member.status === 'AIRBORNE'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
                          : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-display">{member.name}</h3>
                    <p className="text-xs text-cyan-400 font-medium mt-0.5">{member.role}</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">{member.zone}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>Sorties Supervised:</span>
                    <strong className="text-white">{member.sorties} Missions</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
