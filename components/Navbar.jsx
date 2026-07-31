import React from 'react';
import Link from 'next/link';
import { Bookmark, Settings, Shield } from 'lucide-react';

export default function Navbar({ onOpenSettings, favoritesCount, onToggleFavoritesOnly, showFavoritesOnly }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#d4a373]/15 bg-[#0b0b0d]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* UICraft.studio Branding with Copper Champagne Accent */}
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-[#d4a373] text-[#0b0b0d] flex items-center justify-center font-extrabold text-sm shadow-sm group-hover:scale-105 transition-transform">
            U
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-[#ebe1dc] tracking-tight">
              UICraft<span className="text-[#d4a373] font-normal">.studio</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-medium text-[#d4a373] bg-[#141418] border border-[#d4a373]/20 rounded-md">
              Showcase
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* Admin Dashboard Link */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141418] text-zinc-400 border border-[#d4a373]/20 hover:text-white hover:border-[#d4a373]/50 transition-all text-xs font-medium"
            title="Admin Control Center"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Admin</span>
          </Link>

          {/* Favorites Filter Button */}
          <button
            onClick={onToggleFavoritesOnly}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showFavoritesOnly
                ? 'bg-[#d4a373] text-[#0b0b0d] font-bold'
                : 'bg-[#141418] text-zinc-300 border border-[#d4a373]/20 hover:border-[#d4a373]/50 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved</span>
            {favoritesCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded ${showFavoritesOnly ? 'bg-[#0b0b0d] text-[#d4a373]' : 'bg-zinc-800 text-zinc-300'}`}>
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Settings Gear */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg bg-[#141418] text-zinc-400 border border-[#d4a373]/20 hover:text-white hover:border-[#d4a373]/50 transition-all"
            title="API Settings (Gemini / Groq)"
          >
            <Settings className="w-4 h-4" />
          </button>

        </div>

      </div>
    </header>
  );
}
