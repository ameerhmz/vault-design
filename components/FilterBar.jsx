import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function FilterBar({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, categories, totalCount, filteredCount }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl bg-zinc-900/60 border border-white/[0.08] backdrop-blur-md">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-100 text-zinc-950 shadow-sm scale-105'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar Input */}
        <div className="relative min-w-[260px] md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates by style or keyword..."
            className="w-full pl-10 pr-9 py-2 bg-zinc-950 text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/[0.08] text-xs focus:outline-none focus:border-zinc-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Filter Info Bar */}
      <div className="flex items-center justify-between px-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span>Showing <strong className="text-zinc-200">{filteredCount}</strong> of {totalCount} showcase designs</span>
          {selectedCategory !== 'All' && (
            <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 text-[10px] font-medium border border-white/10">
              Filter: {selectedCategory}
            </span>
          )}
        </div>

        {(searchQuery || selectedCategory !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="text-zinc-400 hover:text-white underline text-[11px]"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
