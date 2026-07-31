import React, { useState } from 'react';
import { Bookmark, Check, ArrowUpRight } from 'lucide-react';

export default function TemplateCard({ template, onSelect, isFavorite, onToggleFavorite, onCopyHex }) {
  const [copiedHex, setCopiedHex] = useState(null);

  const handleColorClick = (e, hex) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    onCopyHex(hex);
    setTimeout(() => setCopiedHex(null), 1600);
  };

  return (
    <div
      onClick={() => onSelect(template)}
      className="copper-editorial-card group flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Visual Website Preview Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
        <img
          src={template.image || `https://api.microlink.io/?url=${encodeURIComponent(template.url)}&screenshot=true&embed=screenshot.url`}
          alt={template.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-transparent to-transparent opacity-70" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-[#0b0b0d]/90 border border-[#d4a373]/30 text-[11px] font-medium text-[#d4a373] backdrop-blur-md">
          {template.category}
        </div>

        {/* Single Bookmark Action Button Top Right */}
        <div className="absolute top-3 right-3 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(template.id);
            }}
            className={`p-1.5 rounded-md backdrop-blur-md border transition-all shadow-md ${
              isFavorite
                ? 'bg-[#d4a373] text-[#0b0b0d] border-[#d4a373] font-bold'
                : 'bg-[#0b0b0d]/90 text-zinc-400 border-[#d4a373]/20 hover:text-white hover:border-[#d4a373]/60'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save template'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#0b0b0d]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Title & Description */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-[#ebe1dc] group-hover:text-[#d4a373] transition-colors line-clamp-1">
              {template.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#d4a373] transition-colors shrink-0" />
          </div>
          <p className="text-xs text-[#a89182] mt-1 line-clamp-2 leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="mt-auto pt-3 border-t border-[#d4a373]/15 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {template.colors?.slice(0, 5).map((color, idx) => (
              <button
                key={idx}
                onClick={(e) => handleColorClick(e, color.hex)}
                className="swatch-pill relative w-5 h-5 rounded-full border border-white/20 shadow-sm focus:outline-none"
                style={{ backgroundColor: color.hex }}
                title={`Copy ${color.name} (${color.hex})`}
              >
                {copiedHex === color.hex && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-full">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-medium text-[#a89182] group-hover:text-[#ebe1dc] transition-colors">
            {template.style}
          </span>
        </div>

      </div>
    </div>
  );
}
