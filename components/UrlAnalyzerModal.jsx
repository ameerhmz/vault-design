import React, { useState, useEffect } from 'react';
import { X, Globe, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

export default function UrlAnalyzerModal({ isOpen, onClose, onAnalyze, initialUrl = '' }) {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const steps = [
    "Connecting to target website server...",
    "Extracting page metadata & DOM layout structure...",
    "Analyzing design system with AI Engine...",
    "Synthesizing 5-color palette & Master Prompt..."
  ];

  // Auto-start analysis if initialUrl is passed directly from Hero
  useEffect(() => {
    if (isOpen && initialUrl && initialUrl.trim()) {
      setUrlInput(initialUrl);
      executeAnalysis(initialUrl.trim());
    } else if (isOpen) {
      setUrlInput('');
      setLoading(false);
      setErrorMsg(null);
    }
  }, [isOpen, initialUrl]);

  const executeAnalysis = async (targetUrl) => {
    if (!targetUrl) return;
    setLoading(true);
    setErrorMsg(null);
    setProgressStep(0);

    const stepInterval = setInterval(() => {
      setProgressStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      await onAnalyze(targetUrl);
      clearInterval(stepInterval);
      setLoading(false);
      setUrlInput('');
      onClose();
    } catch (err) {
      clearInterval(stepInterval);
      setLoading(false);
      setErrorMsg(err.message || 'Failed to analyze website URL');
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!urlInput.trim()) return;
    executeAnalysis(urlInput.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0e0e11] border border-[#d4a373]/30 shadow-2xl overflow-hidden text-[#ebe1dc] p-6">
        
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-[#141418] text-zinc-400 border border-white/10 hover:text-white transition-all disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#ebe1dc]">Analyze Website URL</h2>
          <p className="text-xs text-[#a89182] mt-0.5">Extract design system, 5-color palette & master prompt from any URL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* URL Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#ebe1dc]">Target Website Link</label>
            <div className="relative flex items-center">
              <Globe className="absolute left-3 w-4 h-4 text-[#d4a373]" />
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                disabled={loading}
                placeholder="https://example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#0b0b0d] text-[#ebe1dc] placeholder-[#a89182] text-xs rounded-xl border border-[#d4a373]/30 focus:outline-none focus:border-[#d4a373] transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {loading && (
            <div className="p-3.5 rounded-xl bg-[#0b0b0d] border border-[#d4a373]/20 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <Loader2 className="w-4 h-4 text-[#d4a373] animate-spin" />
                <span className="text-xs font-medium text-[#ebe1dc]">{steps[progressStep]}</span>
              </div>
              <div className="w-full h-1 bg-[#141418] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d4a373] transition-all duration-500"
                  style={{ width: `${((progressStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !urlInput.trim()}
            className="w-full py-2.5 rounded-xl bg-[#d4a373] text-[#0b0b0d] font-bold text-xs hover:bg-[#e4b383] transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md"
          >
            {loading ? (
              <span>Extracting Design System...</span>
            ) : (
              <>
                <span>Start AI Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
