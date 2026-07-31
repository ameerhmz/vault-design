'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FilterBar from '@/components/FilterBar';
import TemplateCard from '@/components/TemplateCard';
import TemplateDetailModal from '@/components/TemplateDetailModal';
import UrlAnalyzerModal from '@/components/UrlAnalyzerModal';
import ApiKeyModal from '@/components/ApiKeyModal';
import Toast from '@/components/Toast';
import { INITIAL_TEMPLATES } from '@/data/templates';
import { Layers, Shield } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = ["All", "SaaS", "Portfolio", "E-commerce", "Neo-Brutalist", "AI App", "Cyberpunk", "3D/Interactive"];

export default function Home() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Modals & States
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [analyzerInitialUrl, setAnalyzerInitialUrl] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [toast, setToast] = useState(null);

  // Helper: Deduplicate templates array by URL or ID
  const deduplicateTemplates = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      const normUrl = item.url ? item.url.replace(/\/$/, '').toLowerCase() : item.id;
      if (seen.has(normUrl)) return false;
      seen.add(normUrl);
      return true;
    });
  };

  // Load persisted state & admin-featured templates on mount
  useEffect(() => {
    const initData = async () => {
      try {
        const savedFavs = localStorage.getItem('sitevault_favorites');
        if (savedFavs) setFavorites(JSON.parse(savedFavs));

        // Fetch Admin featured templates from server database (data/db.json)
        const adminRes = await fetch('/api/admin');
        const adminData = await adminRes.json();
        const serverTemplates = adminData.success ? (adminData.templates || []).filter((t) => t.isFeatured) : [];

        const savedCustom = localStorage.getItem('sitevault_custom_templates');
        const customArr = savedCustom ? JSON.parse(savedCustom) : [];

        setTemplates((prev) => deduplicateTemplates([...customArr, ...serverTemplates, ...INITIAL_TEMPLATES]));

        const gKey = localStorage.getItem('sitevault_gemini_key');
        if (gKey) setGeminiKey(gKey);

        const grKey = localStorage.getItem('sitevault_groq_key');
        if (grKey) setGroqKey(grKey);
      } catch (e) {
        console.error("Local storage load error:", e);
      }
    };
    initData();
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Favorites Toggle
  const toggleFavorite = (id) => {
    let next;
    if (favorites.includes(id)) {
      next = favorites.filter((favId) => favId !== id);
      showToast('Removed from saved', 'info');
    } else {
      next = [...favorites, id];
      showToast('Added to saved!', 'success');
    }
    setFavorites(next);
    localStorage.setItem('sitevault_favorites', JSON.stringify(next));
  };

  // Delete Template Function
  const handleDeleteTemplate = (id) => {
    setTemplates((prev) => {
      const next = prev.filter((t) => t.id !== id);
      const customOnly = next.filter((t) => !INITIAL_TEMPLATES.some((init) => init.id === t.id));
      localStorage.setItem('sitevault_custom_templates', JSON.stringify(customOnly));
      return next;
    });
    showToast('Template deleted', 'info');
  };

  // Save API Keys
  const handleSaveKeys = ({ gemini, groq }) => {
    setGeminiKey(gemini);
    setGroqKey(groq);
    localStorage.setItem('sitevault_gemini_key', gemini);
    localStorage.setItem('sitevault_groq_key', groq);
  };

  // Direct Analyze trigger from Hero input bar
  const handleDirectAnalyzeTrigger = (url) => {
    setAnalyzerInitialUrl(url);
    setIsAnalyzerOpen(true);
  };

  // Perform URL Analysis Call (Local Database Caching logic)
  const handleAnalyzeUrl = async (targetUrl) => {
    let normalizedUrl = targetUrl.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }
    const cleanDbKey = normalizedUrl.replace(/\/$/, '').toLowerCase();

    // 1. Check Local Storage Database Cache first!
    const existingInTemplates = templates.find((t) => t.url && t.url.replace(/\/$/, '').toLowerCase() === cleanDbKey);
    if (existingInTemplates) {
      console.log("Loading website analysis from local database cache:", cleanDbKey);
      setSelectedTemplate(existingInTemplates);
      showToast(`Loaded ${existingInTemplates.title} from local database cache!`, 'success');
      return;
    }

    // 2. If not found in local database, perform AI API call
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: normalizedUrl,
        apiKey: groqKey || geminiKey
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to analyze website URL');
    }

    const newTemplate = data.template;
    
    // 3. Save new analysis permanently into Local Storage Database
    setTemplates((prev) => {
      const normTarget = newTemplate.url.replace(/\/$/, '').toLowerCase();
      const filteredPrev = prev.filter((t) => t.url.replace(/\/$/, '').toLowerCase() !== normTarget);
      const updated = [newTemplate, ...filteredPrev];

      const customOnly = updated.filter((t) => !INITIAL_TEMPLATES.some((init) => init.id === t.id));
      localStorage.setItem('sitevault_custom_templates', JSON.stringify(customOnly));
      return updated;
    });

    setSelectedTemplate(newTemplate);
    showToast(`Analyzed & saved ${newTemplate.title} to database!`, 'success');
  };

  // Filtered Templates Calculation
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      if (showFavoritesOnly && !favorites.includes(tpl.id)) return false;
      if (selectedCategory !== 'All' && tpl.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = tpl.title.toLowerCase().includes(q);
        const matchStyle = tpl.style?.toLowerCase().includes(q);
        const matchVibe = tpl.vibe?.some((v) => v.toLowerCase().includes(q));
        const matchDesc = tpl.description?.toLowerCase().includes(q);
        return matchTitle || matchStyle || matchVibe || matchDesc;
      }
      return true;
    });
  }, [templates, favorites, searchQuery, selectedCategory, showFavoritesOnly]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col relative selection:bg-zinc-100 selection:text-zinc-950">
      
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Navigation Header */}
      <Navbar
        onOpenAnalyzer={() => {
          setAnalyzerInitialUrl('');
          setIsAnalyzerOpen(true);
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />

      {/* Hero Header */}
      <Hero onDirectAnalyze={handleDirectAnalyzeTrigger} />

      {/* Filter & Search Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={CATEGORIES}
        totalCount={templates.length}
        filteredCount={filteredTemplates.length}
      />

      {/* Gallery Cards Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 flex-1">
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={(tpl) => setSelectedTemplate(tpl)}
                isFavorite={favorites.includes(template.id)}
                onToggleFavorite={toggleFavorite}
                onDeleteTemplate={handleDeleteTemplate}
                onCopyHex={(hex) => showToast(`Copied ${hex} to clipboard!`, 'copy')}
                onShowToast={showToast}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl bg-zinc-900/40 border border-white/[0.08] max-w-xl mx-auto">
            <div className="p-3 rounded-xl bg-zinc-800 text-zinc-300 w-10 h-10 mx-auto flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-100 mb-1">No Design Templates Found</h3>
            <p className="text-xs text-zinc-400 mb-5">Try resetting search filters or analyze a new website link.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setShowFavoritesOnly(false);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 text-xs font-semibold hover:bg-white transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-zinc-950 py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">Vault.design</span> — Web Design Library
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Dashboard</span>
            </Link>
            <span>•</span>
            <p>© 2026 Crafted with Next.js, Groq AI & Gemini 2.0.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TemplateDetailModal
        template={selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        isFavorite={selectedTemplate ? favorites.includes(selectedTemplate.id) : false}
        onToggleFavorite={toggleFavorite}
        onShowToast={showToast}
      />

      <UrlAnalyzerModal
        isOpen={isAnalyzerOpen}
        onClose={() => {
          setIsAnalyzerOpen(false);
          setAnalyzerInitialUrl('');
        }}
        onAnalyze={handleAnalyzeUrl}
        initialUrl={analyzerInitialUrl}
      />

      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveKeys={handleSaveKeys}
        currentGeminiKey={geminiKey}
        currentGroqKey={groqKey}
        onShowToast={showToast}
      />

    </div>
  );
}
