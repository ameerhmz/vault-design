import React from 'react';
import { CheckCircle2, Copy, Info } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-zinc-900 text-zinc-100 px-4 py-3 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md animate-fade-in text-xs font-medium">
      {toast.type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : toast.type === 'copy' ? (
        <Copy className="w-4 h-4 text-zinc-300 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-zinc-400 shrink-0" />
      )}
      <span>{toast.message}</span>
    </div>
  );
}
