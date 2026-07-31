import React, { useState } from 'react';
import { Bookmark, Check, ArrowUpRight, Copy, Trash2 } from 'lucide-react';

export default function TemplateCard({ template, onSelect, isFavorite, onToggleFavorite, onDeleteTemplate, onCopyHex, onShowToast }) {
  const [copiedHex, setCopiedHex] = useState(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const handleColorClick = (e, hex) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    onCopyHex(hex);
    setTimeout(() => setCopiedHex(null), 1600);
  };

  const handleQuickCopyPrompt = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(template.masterPrompt);
    setCopiedPrompt(true);
    if (onShowToast) onShowToast(`Copied AI prompt for ${template.title}!`, 'copy');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div
      onClick={() => onSelect(template)}
      className="editorial-card group flex flex-col overflow-hidden cursor-pointer"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-60" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-zinc-950/85 border border-white/10 text-[11px] font-medium text-zinc-300 backdrop-blur-md">
          {template.category}
        </div>

        {/* Action Buttons Top Right */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          
          {/* Delete Button */}
          {onDeleteTemplate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTemplate(template.id);
              }}
              className="p-1.5 rounded-md bg-zinc-950/85 text-zinc-400 border border-white/10 hover:text-red-400 hover:bg-zinc-800 backdrop-blur-md transition-all shadow-md"
              title="Delete template"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Quick Copy Prompt Button */}
          <button
            onClick={handleQuickCopyPrompt}
            className="p-1.5 rounded-md bg-zinc-950/85 text-zinc-300 border border-white/10 hover:text-white hover:bg-zinc-800 backdrop-blur-md transition-all shadow-md"
            title="Quick Copy AI Master Prompt"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(template.id);
            }}
            className={`p-1.5 rounded-md backdrop-blur-md border transition-all shadow-md ${
              isFavorite
                ? 'bg-zinc-100 text-zinc-900 border-white'
                : 'bg-zinc-950/85 text-zinc-400 border-white/10 hover:text-white'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save template'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-zinc-900' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Title & Description */}
        <div className="mb-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
              {template.title}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors shrink-0" />
          </div>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between">
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

          <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
            {template.style}
          </span>
        </div>

      </div>
    </div>
  );
}
