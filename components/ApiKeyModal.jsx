import React, { useState, useEffect } from 'react';
import { X, Key, ExternalLink, Check, ShieldCheck } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, onSaveKeys, currentGeminiKey, currentGroqKey, onShowToast }) {
  const [geminiKey, setGeminiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');

  useEffect(() => {
    setGeminiKey(currentGeminiKey || '');
    setGroqKey(currentGroqKey || '');
  }, [currentGeminiKey, currentGroqKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveKeys({ gemini: geminiKey.trim(), groq: groqKey.trim() });
    onShowToast("API keys saved locally!", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0e0e11] border border-white/10 shadow-2xl overflow-hidden text-zinc-200 p-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5">
          <h2 className="text-lg font-bold text-zinc-100">API Key Configuration</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Enter key or leave blank to use environment defaults</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
              <span>Google Gemini API Key</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 flex items-center gap-1 text-[11px]"
              >
                Get Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-2 bg-zinc-950 text-zinc-100 placeholder-zinc-600 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-200">
              <span>Groq API Key (Llama 3.3 70B)</span>
              <a
                href="https://console.groq.com/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 flex items-center gap-1 text-[11px]"
              >
                Get Key <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              placeholder="gsk_..."
              className="w-full px-3 py-2 bg-zinc-950 text-zinc-100 placeholder-zinc-600 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-950/60 border border-white/[0.06] text-[11px] text-zinc-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Keys are stored strictly in your browser session.</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-bold text-xs hover:bg-white transition-all flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save API Keys</span>
          </button>

        </form>

      </div>
    </div>
  );
}
