import React from 'react';
import Link from 'next/link';
import { Bookmark, Settings, Plus, Shield } from 'lucide-react';

export default function Navbar({ onOpenAnalyzer, onOpenSettings, favoritesCount, onToggleFavoritesOnly, showFavoritesOnly }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090b]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* UICraft.studio Branding */}
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            U
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-zinc-100 tracking-tight">
              UICraft<span className="text-zinc-500 font-normal">.studio</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-medium text-zinc-400 bg-zinc-900 border border-white/[0.08] rounded-md">
              Library
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* Admin Dashboard Link */}
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 text-zinc-400 border border-white/[0.08] hover:text-white hover:bg-zinc-800 transition-all text-xs font-medium"
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
                ? 'bg-zinc-100 text-zinc-900 font-semibold'
                : 'bg-zinc-900/80 text-zinc-300 border border-white/[0.08] hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved</span>
            {favoritesCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] font-bold rounded ${showFavoritesOnly ? 'bg-zinc-900 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Settings Gear */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg bg-zinc-900/80 text-zinc-400 border border-white/[0.08] hover:text-white hover:bg-zinc-800 transition-all"
            title="API Settings (Gemini / Groq)"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Analyze URL Primary Button */}
          <button
            onClick={onOpenAnalyzer}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all ml-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Analyze URL</span>
          </button>

        </div>

      </div>
    </header>
  );
}
