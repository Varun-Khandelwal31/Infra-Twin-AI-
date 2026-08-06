'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import {
  Layers,
  Search,
  Filter,
  Navigation,
  Cpu,
  Route,
  Camera,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Download,
  Plus,
} from 'lucide-react';

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const assetsList = [
    {
      id: 'AST-DR-904',
      name: 'Skydio X2 Autonomous Drone (Zone 4)',
      category: 'Drone Fleet',
      location: 'NDMC Command Hub',
      status: 'OPERATIONAL',
      health: '98%',
      lastMaintenance: 'May 10, 2025',
      estValue: '₹14.5 Lakhs',
      serialNo: 'SK2-UAV-2025-904',
    },
    {
      id: 'AST-DR-908',
      name: 'Matrice 300 RTK Volumetric UAV (Zone 1)',
      category: 'Drone Fleet',
      location: 'South Delhi Base',
      status: 'OPERATIONAL',
      health: '94%',
      lastMaintenance: 'Apr 28, 2025',
      estValue: '₹22.0 Lakhs',
      serialNo: 'M300-RTK-2025-908',
    },
    {
      id: 'AST-[#111726]',
      name: 'Connaught Place Outer Circle Road Stretch (2.4km)',
      category: 'Pavement Stretch',
      location: 'Ward 34 - NDMC',
      status: 'MONITORED',
      health: '72% (PCI)',
      lastMaintenance: 'Dec 15, 2024',
      estValue: '₹180.0 Lakhs',
      serialNo: 'RD-NDMC-CP-01',
    },
    {
      id: 'AST-CAM-402',
      name: 'FLIR Boson Thermal Infrared Sensor Pod',
      category: 'Sensors & Hardware',
      location: 'Mounted on DR-904',
      status: 'OPERATIONAL',
      health: '100%',
      lastMaintenance: 'May 02, 2025',
      estValue: '₹8.2 Lakhs',
      serialNo: 'FLIR-BOS-2025-402',
    },
    {
      id: 'AST-EDGE-12',
      name: 'NVIDIA Jetson AGX Orin 64GB Edge AI Node',
      category: 'Edge Computing',
      location: 'Drone Ground Station 12',
      status: 'OPERATIONAL',
      health: '96%',
      lastMaintenance: 'May 20, 2025',
      estValue: '₹3.5 Lakhs',
      serialNo: 'NV-ORIN-2025-012',
    },
  ];

  const filteredAssets = assetsList.filter((ast) => {
    const matchesSearch =
      ast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ast.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ast.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || ast.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-100 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#111726] via-slate-900 to-teal-950/40 border border-cyan-500/20 shadow-glass">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/40">
                  <Layers className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold text-white font-display">
                  Smart City Infrastructure Asset Inventory
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Pavement Network Catalog • UAV Fleet Units • Multi-Spectral Sensors • Edge Compute Nodes
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-cyan-glow transition-all flex items-center gap-1.5">
                <Plus className="w-4 h-4" />
                <span>Register New Asset</span>
              </button>
            </div>
          </div>

          {/* Asset Categories Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Pavement Stretches</div>
                <div className="text-2xl font-bold text-white font-display">1,840 km</div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <Route className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Autonomous UAV Fleet</div>
                <div className="text-2xl font-bold text-emerald-400 font-display">12 Drones</div>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Navigation className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">IR & RGB Cameras</div>
                <div className="text-2xl font-bold text-amber-400 font-display">24 Units</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Camera className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between card-3d-tilt">
              <div>
                <div className="text-[11px] font-mono text-slate-400">Edge Compute Nodes</div>
                <div className="text-2xl font-bold text-indigo-400 font-display">8 Stations</div>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                <Cpu className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="p-4 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search asset ID, hardware model, or deployment location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Category:</span>
              {['ALL', 'Drone Fleet', 'Pavement Stretch', 'Sensors & Hardware', 'Edge Computing'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    categoryFilter === cat
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-glow font-bold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Assets Data Table */}
          <div className="p-5 rounded-2xl bg-[#111726]/90 backdrop-blur-xl border border-cyan-500/20 shadow-glass space-y-4">
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-mono">
                  <tr>
                    <th className="p-3">Asset ID</th>
                    <th className="p-3">Asset Name & Model</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Deployment Hub</th>
                    <th className="p-3">Health Status</th>
                    <th className="p-3">Est. Valuation</th>
                    <th className="p-3 text-right">Serial Tag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/40 font-mono">
                  {filteredAssets.map((ast) => (
                    <tr key={ast.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3 font-bold text-cyan-400">{ast.id}</td>
                      <td className="p-3 font-sans font-semibold text-slate-100">{ast.name}</td>
                      <td className="p-3 text-slate-300">{ast.category}</td>
                      <td className="p-3 text-slate-400">{ast.location}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {ast.status} ({ast.health})
                        </span>
                      </td>
                      <td className="p-3 font-bold text-emerald-400">{ast.estValue}</td>
                      <td className="p-3 text-right text-slate-500">{ast.serialNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
