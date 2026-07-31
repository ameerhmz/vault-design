import React, { useState } from 'react';
import { ArrowRight, Sparkles, Wand2, Globe, Layers, Cpu } from 'lucide-react';

export default function Hero({ onDirectAnalyze }) {
  const [urlInput, setUrlInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onDirectAnalyze(urlInput);
  };

  return (
    <section className="relative pt-16 pb-12 overflow-hidden">
      
      {/* Ambient 3D Light Orbs */}
      <div className="ambient-orb-primary" />
      <div className="ambient-orb-secondary" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
        
        {/* Top Feature Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 text-xs font-semibold text-zinc-300 backdrop-blur-md shadow-xl animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>3D Human-Crafted Web Architecture Library</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Hero Title with 3D Metallic Gradient */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-metallic leading-[1.1]">
          Engineered AI Master Prompts. <br />
          <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Human-Crafted 3D Aesthetics.
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Explore handcrafted 3D design profiles. Extract 5-color dominant palettes, deep tech stacks, and copy production-ready prompts for Cursor, Antigravity, and v0.
        </p>

        {/* Direct URL Input Bar */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-2">
          <div className="relative flex items-center p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-xl group hover:border-white/20 transition-all">
            <div className="pl-3.5 pr-2 text-zinc-500">
              <Globe className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste any website link (e.g. stripe.com, linear.app)..."
              className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none pr-2 font-medium"
            />

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-bold text-xs sm:text-sm hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 shadow-md"
            >
              <span>Analyze URL</span>
              <Wand2 className="w-4 h-4 text-zinc-900" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-500 mt-2.5">
            Automated Fallback Engine — Groq Llama 3.3 70B & Gemini 2.0 Flash architecture extraction.
          </p>
        </form>

        {/* Floating 3D Interactive Studio Visualizer */}
        <div className="pt-8 max-w-3xl mx-auto">
          <div className="animate-float-3d p-2 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.08] text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-sans font-semibold text-zinc-300">UICraft Studio — Live 3D Perspective Preview</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                <Cpu className="w-3.5 h-3.5" />
                <span>3D Engine Active</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
