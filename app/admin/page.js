'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Search, Trash2, Globe, Star, ExternalLink, RefreshCw, Lock, LogOut, KeyRound } from 'lucide-react';
import Toast from '@/components/Toast';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState(null);

  // Check saved admin session on mount
  useEffect(() => {
    const token = localStorage.getItem('sitevault_admin_token');
    if (token === 'vault_admin_authenticated_session_token_2026') {
      setIsAuthenticated(true);
      fetchAdminData();
    }
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('sitevault_admin_token', data.token);
        setIsAuthenticated(true);
        showToast('Successfully logged in as Admin!', 'success');
        fetchAdminData();
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setAuthError('Login request failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sitevault_admin_token');
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
    showToast('Logged out of Admin Control Center', 'info');
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      if (data.success) {
        setTemplates(data.templates || []);
      }
    } catch (e) {
      console.error("Admin fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    const nextStatus = !currentStatus;
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFeatured: nextStatus } : t))
    );

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle-featured',
          id,
          isFeatured: nextStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          nextStatus ? 'Template featured in public gallery!' : 'Removed from featured gallery',
          'success'
        );
      }
    } catch (e) {
      showToast('Failed to update featured status', 'error');
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}" from the global database?`)) return;

    setTemplates((prev) => prev.filter((t) => t.id !== id));

    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Template deleted permanently from database', 'info');
      }
    } catch (e) {
      showToast('Failed to delete template', 'error');
    }
  };

  const filteredTemplates = templates.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title?.toLowerCase().includes(q) ||
      t.url?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q)
    );
  });

  const featuredCount = templates.filter((t) => t.isFeatured).length;

  // Render Login Gate if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 selection:bg-zinc-100 selection:text-zinc-950">
        
        <Toast toast={toast} onClose={() => setToast(null)} />

        <div className="w-full max-w-md p-8 rounded-2xl bg-[#0e0e11] border border-white/10 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-extrabold text-zinc-100">Admin Control Gate</h1>
            <p className="text-xs text-zinc-400">Enter your administrator credentials to access management controls.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Username</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Admin username"
                required
                className="w-full px-3.5 py-2.5 bg-zinc-950 text-zinc-100 rounded-xl border border-white/[0.08] text-xs focus:outline-none focus:border-zinc-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Admin password"
                required
                className="w-full px-3.5 py-2.5 bg-zinc-950 text-zinc-100 rounded-xl border border-white/[0.08] text-xs focus:outline-none focus:border-zinc-400"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-medium">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-zinc-100 text-zinc-950 font-bold text-xs hover:bg-white transition-all shadow-md"
            >
              Authenticate Admin
            </button>
          </form>

          <div className="text-center pt-2 border-t border-white/[0.08]">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Gallery</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // Render Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 sm:p-6 lg:p-8 selection:bg-zinc-100 selection:text-zinc-950">
      
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-white transition-all"
              title="Back to Vault.design"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h1 className="text-xl font-extrabold text-zinc-100">Admin Control Center</h1>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Manage user-analyzed website links & select default showcase templates</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAdminData}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300 text-xs font-semibold hover:bg-zinc-800 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Feed</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08]">
            <span className="text-xs text-zinc-400 font-medium">Total User-Analyzed Websites</span>
            <p className="text-2xl font-bold text-zinc-100 mt-1">{templates.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08]">
            <span className="text-xs text-zinc-400 font-medium">Featured in Default Showcase</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{featuredCount}</p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.08]">
            <span className="text-xs text-zinc-400 font-medium">Database Persistence</span>
            <p className="text-xs font-mono text-zinc-300 mt-2">data/db.json</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter analyzed URLs by domain or category..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 text-zinc-100 placeholder-zinc-500 rounded-xl border border-white/[0.08] text-xs focus:outline-none focus:border-zinc-500"
          />
        </div>

        {/* Admin Management Table */}
        <div className="rounded-2xl bg-zinc-900/50 border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-950/80 border-b border-white/[0.08] text-zinc-400 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Target Website</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Palette Swatches</th>
                  <th className="p-4">Show in Default Gallery</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-900/80 transition-colors">
                      
                      {/* Website & Title */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-zinc-950">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
                          </div>
                          <div>
                            <p className="font-bold text-zinc-100 text-xs line-clamp-1">{item.title}</p>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-zinc-400 hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <span>{item.url}</span>
                              <ExternalLink className="w-3 h-3 text-zinc-500" />
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300 border border-white/10">
                          {item.category || 'SaaS'}
                        </span>
                      </td>

                      {/* Palette Swatches */}
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {item.colors?.slice(0, 5).map((col, idx) => (
                            <span
                              key={idx}
                              className="w-4 h-4 rounded-full border border-white/20 inline-block"
                              style={{ backgroundColor: col.hex }}
                              title={col.hex}
                            />
                          ))}
                        </div>
                      </td>

                      {/* Featured Toggle Switch */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleFeatured(item.id, item.isFeatured)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            item.isFeatured
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : 'bg-zinc-950 text-zinc-400 border-white/10 hover:text-white'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                          <span>{item.isFeatured ? 'Featured in Gallery' : 'Hidden from Gallery'}</span>
                        </button>
                      </td>

                      {/* Delete Action */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-2 rounded-lg bg-zinc-950 text-zinc-400 border border-white/10 hover:text-red-400 hover:bg-zinc-800 transition-all"
                          title="Delete from database"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-zinc-500">
                      {loading ? 'Loading user analyzed websites...' : 'No user-analyzed websites in database yet.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
