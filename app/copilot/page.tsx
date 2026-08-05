'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Navbar from '@/components/layout/Navbar';
import BOQResultCard from '@/components/copilot/BOQResultCard';
import { INSPECTION_SAMPLES } from '@/lib/mockInference';
import { BOQResponse } from '@/lib/groq';
import { Bot, Mic, Send, Cpu, X, Sparkles } from 'lucide-react';

function CopilotContent() {
  const searchParams = useSearchParams();
  const sampleId = searchParams.get('sample');

  const initialSample = INSPECTION_SAMPLES.find((s) => s.id === sampleId) || INSPECTION_SAMPLES[0];

  const [promptInput, setPromptInput] = useState(
    `Generate an IRC:82-2023 compliant BOQ for ${initialSample.roadName} (${initialSample.distressType}, Area: ${initialSample.metrics.areaSqm} sqm, Depth: ${initialSample.metrics.maxDepthCm}cm).`
  );

  const [isLoading, setIsLoading] = useState(false);
  const [boqData, setBoqData] = useState<BOQResponse | null>(null);
  const [isListening, setIsListening] = useState(false);

  const handleGenerate = async (queryText?: string) => {
    const text = queryText !== undefined ? queryText : promptInput;
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          inspectionContext: initialSample,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setBoqData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate BOQ on load so page is never empty
  useEffect(() => {
    handleGenerate(promptInput);
  }, [sampleId]);

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        const voiceTxt = `Generate BOQ for ${initialSample.roadName} (${initialSample.distressType}) using VG-30 Bitumen`;
        setPromptInput(voiceTxt);
        setIsListening(false);
        handleGenerate(voiceTxt);
      }, 2000);
    }
  };

  const isLive = boqData?.source === 'live';

  return (
    <>
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111726] via-slate-900 to-blue-950/40 border border-cyan-500/20 shadow-glass flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Bot className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-bold text-white font-display">
              Nirman Copilot • GenAI BOQ & IRC Compliance Engine
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Powered by Groq Llama-3 70B • Grounded in IRC:82-2023, IRC:37-2018 & MoRTH Specs
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span
            className={`px-3 py-1.5 rounded-lg border font-bold ${
              isLive
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-cyan-glow'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {isLive ? 'Llama-3 70B Live' : 'Simulated Engine Mode'}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            IRC RAG Vector Sync Active
          </span>
        </div>
      </div>

      {/* Quick Preset Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-[11px] font-mono shrink-0">Preset Queries:</span>
        {INSPECTION_SAMPLES.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              const txt = `Generate BOQ for ${s.roadName} (${s.distressType}, Area: ${s.metrics.areaSqm} sqm, Depth: ${s.metrics.maxDepthCm}cm)`;
              setPromptInput(txt);
              handleGenerate(txt);
            }}
            className={`px-3 py-1.5 rounded-xl border text-slate-200 shrink-0 transition-all ${
              initialSample.id === s.id
                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-cyan-glow'
                : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
            }`}
          >
            {s.roadName.split(' ')[0]} BOQ
          </button>
        ))}
      </div>

      {/* Input Box with Keyboard Enter listener & Clear button */}
      <div className="p-4 rounded-2xl bg-[#111726]/90 border border-cyan-500/30 shadow-cyan-glow space-y-3">
        <div className="relative flex items-center">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
            placeholder="Type engineering query (e.g. Generate BOQ for 500 sqm patch repair)... Press Enter to submit."
            rows={2}
            className="w-full pl-4 pr-32 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs font-sans resize-none"
          />

          <div className="absolute right-3 flex items-center gap-2">
            {promptInput && (
              <button
                onClick={() => setPromptInput('')}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 transition-colors"
                title="Clear Input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={toggleVoice}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-cyan-400'
              }`}
              title="Voice Command"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleGenerate()}
              disabled={isLoading || !promptInput.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:shadow-cyan-glow transition-all disabled:opacity-50 flex items-center gap-1.5 text-xs"
            >
              {isLoading ? (
                <Cpu className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Submit</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">💡 Tip:</span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">Enter</kbd> to generate BOQ • <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">Shift + Enter</kbd> for newline</span>
          </div>

          {isListening && (
            <div className="text-rose-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Listening to voice command...
            </div>
          )}
        </div>
      </div>

      {/* Results Output */}
      {isLoading && (
        <div className="p-8 rounded-2xl bg-[#111726] border border-cyan-500/20 text-center space-y-3">
          <Cpu className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <div className="text-sm font-bold text-white font-display">
            Synthesizing IRC:82-2023 Bill of Quantities...
          </div>
          <p className="text-xs text-slate-400">Querying RAG vectors & running Llama-3 70B model</p>
        </div>
      )}

      {boqData && !isLoading && <BOQResultCard boq={boqData} />}
    </>
  );
}

export default function CopilotPage() {
  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-100 font-sans overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <Suspense fallback={<div className="p-8 text-xs font-mono text-cyan-400">Loading Nirman Copilot...</div>}>
            <CopilotContent />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
