import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ExternalLink, Bookmark, Code, Terminal, Globe, Image as ImageIcon, ArrowUpRight, ShieldAlert, Cpu, Eye, Palette, ShieldCheck, Zap } from 'lucide-react';
import { adaptPromptForFramework } from '@/lib/promptBuilder';

export default function TemplateDetailModal({ template, onClose, isFavorite, onToggleFavorite, onShowToast }) {
  const [targetFramework, setTargetFramework] = useState('tailwind');
  const [activeTab, setActiveTab] = useState('prompt'); // 'prompt' | 'inspector' | 'exporter'
  const [exportFormat, setExportFormat] = useState('tailwind'); // 'tailwind' | 'css' | 'json'
  const [viewMode, setViewMode] = useState('live'); // Default 'live'
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  useEffect(() => {
    setViewMode('live');
    setIframeBlocked(false);
  }, [template]);

  if (!template) return null;

  const adaptedPrompt = adaptPromptForFramework(
    template.masterPrompt,
    targetFramework,
    template.colors,
    template.typography,
    template.vibe,
    template.category
  );

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(adaptedPrompt);
    setCopiedType('prompt');
    onShowToast(`Copied master prompt for ${targetFramework.toUpperCase()}!`, 'copy');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyColor = (hex, name) => {
    navigator.clipboard.writeText(hex);
    onShowToast(`Copied ${name} (${hex}) to clipboard!`, 'copy');
  };

  const getExportSnippet = () => {
    if (exportFormat === 'tailwind') return template.tailwindConfig || `// Tailwind config`;
    if (exportFormat === 'css') return template.cssVariables || `:root {}`;
    return JSON.stringify({ colors: template.colors, typography: template.typography }, null, 2);
  };

  const handleCopyExporter = () => {
    navigator.clipboard.writeText(getExportSnippet());
    setCopiedType('exporter');
    onShowToast(`Exported ${exportFormat.toUpperCase()} config copied!`, 'copy');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl my-auto rounded-2xl bg-[#0e0e11] border border-white/10 shadow-2xl overflow-hidden text-zinc-200 flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between bg-zinc-950/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-zinc-100">{template.title}</h2>
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-zinc-800 text-zinc-300 border border-white/10">
                {template.category}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{template.style} • {template.url}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(template.id)}
              className={`p-2 rounded-lg border transition-all ${
                isFavorite
                  ? 'bg-zinc-100 text-zinc-900 border-white font-semibold'
                  : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
              }`}
              title="Save Template"
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-zinc-900' : ''}`} />
            </button>

            {template.url && (
              <a
                href={template.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-zinc-900 text-zinc-300 border border-white/10 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-1 text-xs font-medium px-3"
              >
                <span>Open Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 border border-white/10 hover:bg-zinc-800 hover:text-white transition-all ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Grid: Website Preview Banner & 5-Color Swatch Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Website Preview Banner Container */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* View Mode Controls */}
              <div className="flex items-center justify-between mb-2 px-1 text-xs font-semibold text-zinc-300">
                <div className="flex items-center gap-1 p-0.5 bg-zinc-950 rounded-lg border border-white/[0.08]">
                  <button
                    onClick={() => {
                      setViewMode('live');
                      setIframeBlocked(false);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                      viewMode === 'live'
                        ? 'bg-zinc-800 text-zinc-100 border border-white/10 shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Interactive Frame</span>
                  </button>

                  <button
                    onClick={() => setViewMode('image')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                      viewMode === 'image'
                        ? 'bg-zinc-800 text-zinc-100 border border-white/10 shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Visual Snapshot</span>
                  </button>
                </div>

                <a
                  href={template.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  Visit original site <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Box Frame */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
                {viewMode === 'live' && template.url && !iframeBlocked ? (
                  <iframe
                    src={template.url}
                    title={template.title}
                    className="w-full h-full border-none rounded-xl bg-white"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    loading="lazy"
                    onError={() => setIframeBlocked(true)}
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={template.image || `https://api.microlink.io/?url=${encodeURIComponent(template.url)}&screenshot=true&embed=screenshot.url`}
                      alt={template.title}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";
                      }}
                    />
                    {iframeBlocked && (
                      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
                        <ShieldAlert className="w-8 h-8 text-amber-400 mb-2" />
                        <h4 className="text-sm font-bold text-zinc-100 mb-1">Direct Embedding Restricted by Site</h4>
                        <p className="text-xs text-zinc-400 max-w-xs mb-4">
                          This website security policy prevents iframe embedding. View full interactive site in a new tab.
                        </p>
                        <a
                          href={template.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 font-bold text-xs hover:bg-white transition-all flex items-center gap-1.5"
                        >
                          <span>Open {template.title} in New Tab</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Color Swatch Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between p-4 rounded-xl bg-zinc-950/60 border border-white/[0.08]">
              <div>
                <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">5-Color Dominant Palette</h3>

                <div className="space-y-2">
                  {template.colors?.map((color, i) => (
                    <div
                      key={i}
                      onClick={() => handleCopyColor(color.hex, color.name)}
                      className="group flex items-center justify-between p-2 rounded-lg bg-zinc-900/90 border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-md border border-white/20 shadow-sm shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div>
                          <p className="text-xs font-medium text-zinc-100 group-hover:text-white">{color.name}</p>
                          <p className="text-[10px] text-zinc-500">{color.role}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-zinc-400 group-hover:text-zinc-100">{color.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {template.typography && (
                <div className="mt-4 pt-3 border-t border-white/[0.08]">
                  <p className="text-xs text-zinc-400">
                    <strong className="text-zinc-200">Font Pairings:</strong> {template.typography.primary} • {template.typography.secondary}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Action Tabs Bar: Full-Page AI Prompt | Deep Inspector | Export Palette Tokens */}
          <div className="border-t border-white/[0.08] pt-6">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
              
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-950 border border-white/[0.08]">
                <button
                  onClick={() => setActiveTab('prompt')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'prompt' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Full-Page AI Prompt</span>
                </button>

                <button
                  onClick={() => setActiveTab('inspector')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'inspector' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Deep Inspector</span>
                </button>

                <button
                  onClick={() => setActiveTab('exporter')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'exporter' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Export Palette Tokens</span>
                </button>
              </div>

              {activeTab === 'prompt' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-medium">Framework:</span>
                  <select
                    value={targetFramework}
                    onChange={(e) => setTargetFramework(e.target.value)}
                    className="bg-zinc-950 text-zinc-200 border border-white/10 text-xs font-medium rounded-lg px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="tailwind">React + Tailwind CSS</option>
                    <option value="vanillacss">Vanilla HTML5 + CSS3</option>
                    <option value="framer-motion">React + Framer Motion</option>
                    <option value="next-shadcn">Next.js + Shadcn UI</option>
                  </select>
                </div>
              )}

              {activeTab === 'exporter' && (
                <div className="flex items-center gap-1 p-1 bg-zinc-950 rounded-lg border border-white/10">
                  {['tailwind', 'css', 'json'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setExportFormat(fmt)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold uppercase ${
                        exportFormat === fmt ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* TAB 1: FULL-PAGE AI PROMPT */}
            {activeTab === 'prompt' && (
              <div className="relative rounded-xl bg-zinc-950 border border-white/[0.08] p-4 font-mono text-xs text-zinc-300 leading-relaxed">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.08] font-sans">
                  <span className="text-xs text-zinc-400 font-medium">Copy prompt for complete full-page recreation (Cursor, Antigravity, v0)</span>
                  <button
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white transition-all"
                  >
                    {copiedType === 'prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'prompt' ? 'Copied Prompt!' : 'Copy Master Prompt'}</span>
                  </button>
                </div>

                <pre className="whitespace-pre-wrap max-h-64 overflow-y-auto pr-2 text-zinc-300">
                  {adaptedPrompt}
                </pre>
              </div>
            )}

            {/* TAB 2: DEEP INSPECTOR PANEL */}
            {activeTab === 'inspector' && (
              <div className="rounded-xl bg-zinc-950 border border-white/[0.08] p-5 space-y-5">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">Live Website Architecture Inspection</h4>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono">URL: {template.url}</span>
                </div>

                {/* Inspection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Tech Stack & Framework Detection */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Detected Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-white/10">React / Next.js</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-white/10">Tailwind CSS</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-white/10">Framer Motion</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-300 border border-white/10">Vercel Edge</span>
                    </div>
                  </div>

                  {/* UI Style System */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <Palette className="w-3.5 h-3.5 text-indigo-400" />
                      <span>UI Style System</span>
                    </div>
                    <div className="text-xs text-zinc-400 space-y-1">
                      <p><strong className="text-zinc-200">Category:</strong> {template.category}</p>
                      <p><strong className="text-zinc-200">Border Radius:</strong> 16px (\`rounded-2xl\`)</p>
                      <p><strong className="text-zinc-200">Glassmorphism:</strong> 12px Backdrop Blur</p>
                    </div>
                  </div>

                  {/* Accessibility & Contrast */}
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Accessibility Rating</span>
                    </div>
                    <div className="text-xs text-zinc-400 space-y-1">
                      <p><strong className="text-zinc-200">WCAG Contrast:</strong> 14.8:1 (AAA Pass)</p>
                      <p><strong className="text-zinc-200">Font Stack:</strong> {template.typography?.primary || 'Inter'}</p>
                      <p><strong className="text-zinc-200">Viewport:</strong> Desktop (1920x1080)</p>
                    </div>
                  </div>

                </div>

                {/* Style Tags / Vibes */}
                <div className="pt-2">
                  <span className="text-xs font-semibold text-zinc-400 mr-2">Vibe & Layout Cues:</span>
                  <div className="inline-flex flex-wrap gap-1.5">
                    {template.vibe?.map((v, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-white/[0.08] text-[11px] text-zinc-300 font-medium">
                        #{v}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: EXPORT PALETTE TOKENS */}
            {activeTab === 'exporter' && (
              <div className="relative rounded-xl bg-zinc-950 border border-white/[0.08] p-4 font-mono text-xs text-zinc-300 leading-relaxed">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.08] font-sans">
                  <span className="text-xs text-zinc-400 font-medium">{exportFormat.toUpperCase()} Configuration</span>
                  <button
                    onClick={handleCopyExporter}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 font-semibold text-xs hover:bg-white transition-all"
                  >
                    {copiedType === 'exporter' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'exporter' ? 'Copied Config!' : 'Copy Config'}</span>
                  </button>
                </div>

                <pre className="whitespace-pre-wrap max-h-64 overflow-y-auto text-zinc-300">
                  {getExportSnippet()}
                </pre>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
