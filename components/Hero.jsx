import React, { useState } from 'react';
import { ArrowRight, Link2 } from 'lucide-react';

export default function Hero({ onDirectAnalyze }) {
  const [inputUrl, setInputUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onDirectAnalyze(inputUrl.trim());
      setInputUrl('');
    }
  };

  return (
    <div className="pt-14 pb-10 px-4 sm:px-6 lg:px-8 text-center relative border-b border-white/[0.06]">
      <div className="max-w-3xl mx-auto">
        
        {/* Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/[0.08] text-zinc-300 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Curated Index of Remarkable Interfaces</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-zinc-100 tracking-tight leading-[1.1] mb-4">
          Web Design Systems & <br />
          <span className="text-zinc-400 font-normal">Engineered AI Prompts.</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
          Explore handcrafted design profiles. Extract 5-color palettes, copy tailored prompts for coding assistants, or analyze any website link with 1 click.
        </p>

        {/* Logical Search & Analyze Bar */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-2.5">
          <div className="relative flex items-center p-1.5 rounded-xl bg-zinc-900/90 border border-white/[0.1] focus-within:border-zinc-400 transition-all shadow-lg">
            <div className="pl-3 pr-2 text-zinc-500">
              <Link2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste any site URL (e.g., stripe.com, linear.app)..."
              className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none py-1.5"
            />
            <button
              type="submit"
              disabled={!inputUrl.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white transition-all shrink-0 disabled:opacity-50"
            >
              <span>Analyze URL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-zinc-500 text-center">
            Automated AI Engine — extracts 5-color palette, typography rules & master prompts automatically.
          </p>
        </form>

      </div>
    </div>
  );
}
