import React, { useState } from 'react';
import { ArrowRight, Globe } from 'lucide-react';

export default function Hero({ onDirectAnalyze }) {
  const [urlInput, setUrlInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onDirectAnalyze(urlInput);
  };

  return (
    <section className="relative pt-20 pb-12 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Crisp Display Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 leading-[1.08]">
          Engineered AI Prompts.
        </h1>

        {/* Editorial Subtitle */}
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Explore handcrafted design profiles. Extract 5-color palettes, copy tailored prompts for coding assistants, or analyze any website link with 1 click.
        </p>

        {/* Direct URL Input Bar */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-4">
          <div className="relative flex items-center p-1.5 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-xl group hover:border-white/20 transition-all">
            <div className="pl-3.5 pr-2 text-zinc-500">
              <Globe className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste any site URL (e.g., stripe.com, linear.app)..."
              className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none pr-2 font-medium"
            />

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-bold text-xs sm:text-sm hover:bg-white transition-all shrink-0 shadow-md"
            >
              <span>Analyze URL</span>
              <ArrowRight className="w-4 h-4 text-zinc-900" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-500 mt-2.5">
            Automated AI Engine — extracts 5-color palette, typography rules & master prompts automatically.
          </p>
        </form>

      </div>
    </section>
  );
}
