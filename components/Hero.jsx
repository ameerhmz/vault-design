import React, { useState } from 'react';
import { ArrowRight, Globe, Sparkles } from 'lucide-react';

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
        
        {/* Top Editorial Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141418] border border-[#d4a373]/30 text-xs font-semibold text-[#d4a373] backdrop-blur-md shadow-lg animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
          <span>Curated Excellence in Digital Design</span>
        </div>

        {/* Display Title matching Mockup: AURA / UICRAFT: WEB DESIGN SHOWCASE */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight text-[#ebe1dc] leading-[1.08]">
          <span className="text-copper-gradient font-sans uppercase tracking-widest text-3xl sm:text-5xl block mb-2 font-normal">
            UICraft Studio
          </span>
          Web Design Showcase
        </h1>

        {/* Editorial Subtitle */}
        <p className="text-sm sm:text-base text-[#a89182] max-w-2xl mx-auto leading-relaxed font-normal">
          Discover pioneering web aesthetics from global creators. Extract 5-color dominant palettes, UI design tokens, and engineered master prompts.
        </p>

        {/* Direct URL Input Bar */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-4">
          <div className="relative flex items-center p-1.5 rounded-2xl bg-[#141418]/90 border border-[#d4a373]/30 shadow-2xl backdrop-blur-xl group hover:border-[#d4a373]/60 transition-all">
            <div className="pl-3.5 pr-2 text-[#d4a373]">
              <Globe className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste any site URL (e.g., stripe.com, linear.app)..."
              className="w-full bg-transparent text-[#ebe1dc] placeholder-[#a89182] text-xs sm:text-sm focus:outline-none pr-2 font-medium"
            />

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#d4a373] text-[#0b0b0d] font-bold text-xs sm:text-sm hover:bg-[#e4b383] transition-all shrink-0 shadow-md"
            >
              <span>Analyze URL</span>
              <ArrowRight className="w-4 h-4 text-[#0b0b0d]" />
            </button>
          </div>

          <p className="text-[11px] text-[#a89182] mt-2.5">
            Automated AI Engine — extracts 5-color palette, typography rules & master prompts automatically.
          </p>
        </form>

      </div>
    </section>
  );
}
