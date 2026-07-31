# SiteVault AI - Next.js Web Design Showcase & AI Prompt Vault

A world-class **Next.js 14 (App Router)** web application that stores curated templates of the best modern website designs, extracts color palettes, provides copy-pasteable AI master prompts, and automatically analyzes any website URL using Gemini / Groq API server routes.

---

## 🌟 Why Next.js is Best for This Project

1. **Server API Routes (`/api/analyze`)**: Clean URL scraping and AI metadata processing without CORS restrictions.
2. **API Key Protection**: Server-side env configuration for Gemini & Groq APIs.
3. **Dynamic Template Routing (`/template/[id]`)**: Instant SSR deep linking for sharing individual website templates.
4. **Performance & SEO**: Native image optimization (`next/image`) for screenshot mockups and `next/font` for crisp modern typography.

---

## 🚀 Core Features

1. **Curated Showcase Gallery**
   - High-fidelity website mockups across styles (Glassmorphism, Neo-Brutalism, Dark SaaS, Cyberpunk, Minimalist, 3D Interactive).
   - 5-color dominant palette per template with 1-click Hex copy.
   - Tailored AI prompts ready to feed into LLMs (Antigravity, Cursor, v0, Bolt, Claude) to build matching designs.

2. **Instant URL Analyzer ("Point to Any Link")**
   - Paste any website URL (e.g. `https://stripe.com`, `https://linear.app`).
   - Powered by Next.js Server Route + Gemini / Groq API to automatically extract colors, typography rules, layout style, and generate a tailored master prompt.

3. **Color Palette & Prompt Exporter**
   - Export color schemes to Tailwind CSS Config, CSS Variables, or JSON.
   - Switch prompt format for Tailwind, Vanilla CSS, or React + Framer Motion.
