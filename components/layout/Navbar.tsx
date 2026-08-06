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
    <header className="h-14 bg-[#0a0e17]/90 backdrop-blur-md border-b border-cyan-500/20 px-6 flex items-center justify-between shrink-0 z-20 vengence-glass-dock">
      {/* Left Pill Navigation */}
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-cyan-500/30 text-xs font-mono">
          <Link
            href="/audit"
            className={cn(
              'px-3 py-1 rounded-lg transition-all font-medium',
              pathname === '/audit' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow' : 'text-slate-400 hover:text-white'
            )}
          >
            AI Audit Studio
          </Link>
          <Link
            href="/map"
            className={cn(
              'px-3 py-1 rounded-lg transition-all font-medium',
              pathname === '/map' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow' : 'text-slate-400 hover:text-white'
            )}
          >
            Digital Twin
          </Link>
          <Link
            href="/sla-verification"
            className={cn(
              'px-3 py-1 rounded-lg transition-all font-medium',
              pathname === '/sla-verification' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow' : 'text-slate-400 hover:text-white'
            )}
          >
            SLA Scan
          </Link>
          <Link
            href="/copilot"
            className={cn(
              'px-3 py-1 rounded-lg transition-all font-medium',
              pathname === '/copilot' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow' : 'text-slate-400 hover:text-white'
            )}
          >
            Nirman Copilot
          </Link>
        </div>
      </div>

      {/* Right Toolbar */}
      <div className="flex items-center gap-4 text-xs">
        {/* Search Command Trigger (Vengeance UI style) */}
        <div className="relative hidden sm:flex items-center">
          <button className="flex items-center justify-between w-56 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 hover:border-cyan-500/40 hover:text-slate-200 transition-all font-sans text-xs">
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Search telemetry...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300 border border-slate-700">
              ⌘ K
            </kbd>
          </button>
        </div>

        {/* Date Stamp */}
        <div className="hidden lg:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>New Delhi Smart Zone</span>
        </div>

        {/* Action Buttons */}
        <button
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
          title="Download Report"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors relative"
          title="System Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
        </button>

        <button
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/40 hover:shadow-cyan-glow transition-all flex items-center gap-1.5 font-mono text-xs font-bold"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Audit</span>
        </button>
      </div>
    </header>
  );
}
