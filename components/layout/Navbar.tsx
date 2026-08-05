'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Sliders,
  Share2,
  Calendar,
  Layers,
  Search,
  Sparkles,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();

  const isLandingPage = pathname === '/';

  if (isLandingPage) {
    return (
      <header className="sticky top-0 z-50 bg-[#0a0e17]/80 backdrop-blur-md border-b border-cyan-500/20 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:shadow-cyan-glow transition-all">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl text-white font-display tracking-tight">
              InfraTwin <span className="text-cyan-400">AI</span>
            </span>
          </Link>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-medium">
            SIH 2024 Finalist
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="#features" className="hover:text-cyan-400 transition-colors">Features</Link>
          <Link href="#tech-stack" className="hover:text-cyan-400 transition-colors">Tech Stack</Link>
          <Link href="/map" className="hover:text-cyan-400 transition-colors">Digital Twin</Link>
          <Link href="/audit" className="hover:text-cyan-400 transition-colors">AI Studio</Link>
          <Link href="/fraud-detection" className="hover:text-cyan-400 transition-colors">SLA Verification</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-xs hover:shadow-cyan-glow transition-all duration-300 flex items-center gap-2"
          >
            <span>Launch Dashboard</span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="h-14 bg-[#0a0e17]/90 backdrop-blur-md border-b border-cyan-500/15 px-6 flex items-center justify-between shrink-0 z-20">
      {/* Left Pill Navigation matching reference image 1 */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs">
          <button className="px-3 py-1 rounded-md text-slate-400 hover:text-white transition-colors">
            Road Inspection
          </button>
          <button className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium shadow-cyan-glow">
            AI Analysis
          </button>
          <button className="px-3 py-1 rounded-md text-slate-400 hover:text-white transition-colors">
            Inspection History
          </button>
          <button className="px-3 py-1 rounded-md text-slate-400 hover:text-white transition-colors">
            Reports
          </button>
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="flex items-center gap-4 text-xs">
        {/* Search */}
        <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search road ID, ward, inspection..."
            className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-56 text-xs transition-all"
          />
        </div>

        {/* Date Stamp */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>May 27, 2025 10:45 AM</span>
        </div>

        {/* Action Buttons */}
        <button className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">
          <Download className="w-4 h-4" />
        </button>

        <button className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
        </button>

        <button className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">
          <Sliders className="w-4 h-4" />
        </button>

        <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 hover:shadow-cyan-glow transition-all flex items-center gap-1.5 font-medium">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Report</span>
        </button>
      </div>
    </header>
  );
}
