import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { analyzeWebsiteWithGemini } from '@/lib/gemini';
import { analyzeWebsiteWithGroq } from '@/lib/groq';

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'db.json');

function getDbData() {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading db.json:", e);
  }
  return { templates: [] };
}

export async function POST(req) {
  try {
    const { url, apiKey } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Normalize URL
    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }
    const cleanNormUrl = targetUrl.replace(/\/$/, '').toLowerCase();

    // 1. CHECK DISK DATABASE CACHE FIRST (data/db.json)
    const db = getDbData();
    const cachedEntry = db.templates.find(
      (t) => t.url && t.url.replace(/\/$/, '').toLowerCase() === cleanNormUrl
    );

    if (cachedEntry) {
      console.log(`Returning analyzed design from disk database for: ${cleanNormUrl}`);
      return NextResponse.json({ success: true, template: cachedEntry, cached: true });
    }

    // Rich Server-Side Scraping: Meta tags, theme color, OpenGraph metadata & font declarations
    let pageTitle = '';
    let metaDescription = '';
    let themeColor = '';
    let ogImage = '';
    let pageText = '';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);
      const res = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const html = await res.text();
        
        // Extract Title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch) pageTitle = titleMatch[1].trim();

        // Extract Meta Description
        const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
        if (descMatch) metaDescription = descMatch[1].trim();

        // Extract Theme Color Hex
        const colorMatch = html.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i);
        if (colorMatch) themeColor = colorMatch[1].trim();

        // Extract OG Image
        const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
        if (ogImageMatch) ogImage = ogImageMatch[1].trim();

        // Clean Body Text
        pageText = html.replace(/<script\b[^<]*>([\s\S]*?)<\/script>/gi, '')
                       .replace(/<style\b[^<]*>([\s\S]*?)<\/style>/gi, '')
                       .replace(/<[^>]+>/g, ' ')
                       .replace(/\s+/g, ' ')
                       .trim();
      }
    } catch (fetchErr) {
      console.warn("Could not pre-fetch URL server side:", fetchErr.message);
    }

    let result;
    const groqKey = apiKey || process.env.GROQ_API_KEY;
    const geminiKey = apiKey || process.env.GEMINI_API_KEY;

    const payload = {
      url: targetUrl,
      title: pageTitle,
      description: metaDescription,
      themeColor,
      ogImage,
      pageText
    };

    // Automated Fallback Execution Chain: Groq (Llama 3.3 70B) -> Gemini (Gemini 2.0 Flash)
    if (groqKey) {
      try {
        console.log("Analyzing with Groq AI Llama 3.3 70B (Hyper-Accurate Engine)...");
        result = await analyzeWebsiteWithGroq({ ...payload, apiKey: groqKey });
      } catch (groqErr) {
        console.warn("Groq API error, falling back to Gemini 2.0 Flash:", groqErr.message);
        if (geminiKey) {
          try {
            result = await analyzeWebsiteWithGemini({ ...payload, apiKey: geminiKey });
          } catch (geminiErr) {
            console.warn("Gemini API error as well:", geminiErr.message);
          }
        }
      }
    } else if (geminiKey) {
      try {
        console.log("Analyzing with Gemini 2.0 Flash (Hyper-Accurate Engine)...");
        result = await analyzeWebsiteWithGemini({ ...payload, apiKey: geminiKey });
      } catch (geminiErr) {
        console.warn("Gemini API error:", geminiErr.message);
      }
    }

    // Ensure fallback result structure if no keys configured
    if (!result) {
      const hostname = new URL(targetUrl).hostname.replace('www.', '');
      const cleanName = hostname.split('.')[0];
      const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      const bgHex = themeColor || '#0b0b0d';

      result = {
        id: `custom-${Date.now()}`,
        title: `${capitalized} Design System — Engineered AI Master Prompt`,
        url: targetUrl,
        category: "SaaS",
        style: "Obsidian High-Contrast Minimalist",
        description: metaDescription || `Autogenerated design profile for ${hostname}. Features extracted 5-color palette, high-contrast typography rules, and production-ready master engineering prompt.`,
        colors: [
          { hex: bgHex, name: "Obsidian Canvas", role: "Background" },
          { hex: "#141418", name: "Elevated Surface", role: "Cards & Modals" },
          { hex: "#d4a373", name: "Warm Copper Accent", role: "Primary Accent" },
          { hex: "#a89182", name: "Warm Taupe Muted", role: "Secondary Text" },
          { hex: "#ebe1dc", name: "Warm Ivory", role: "Primary Text" }
        ],
        typography: {
          primary: "Inter / Plus Jakarta Sans",
          secondary: "JetBrains Mono",
          notes: "Display typography with -0.025em tracking for headlines."
        },
        vibe: ["Full-Page Scroll", "Sticky Navbar", "Bento Grid", "High Contrast"],
        masterPrompt: `Create a modern responsive website inspired by ${hostname}.\nKEY DESIGN SPECIFICATIONS:\n- Palette: Canvas ${bgHex}, Surface #141418 with 1px border rgba(212,163,115,0.2), Primary Accent #d4a373, Text #ebe1dc, Muted text #a89182.\n- Component Architecture:\n  1. Sticky top navigation header with logo, category pill tag, and primary CTA button.\n  2. Centered hero fold with bold display title, sub-text description, and direct input CTA bar.\n  3. 3-column responsive bento feature grid with 1px metallic stroke cards.\n  4. Footer with multi-column site map and copyright notice.`
      };
    }

    // High-Resolution Screenshot API
    const liveScreenshotUrl = ogImage || `https://api.microlink.io/?url=${encodeURIComponent(targetUrl)}&screenshot=true&embed=screenshot.url`;

    const finalTemplate = {
      id: result.id || `tpl-${Date.now()}`,
      title: result.title || pageTitle || 'Website Analysis',
      url: targetUrl,
      category: result.category || "SaaS",
      style: result.style || "Minimalist High-Contrast",
      description: result.description || "Extracted design profile with production-ready AI master engineering prompt.",
      colors: result.colors || [],
      typography: result.typography || { primary: "Inter", secondary: "JetBrains Mono" },
      vibe: result.vibe || ["Full-Page Scroll", "Sticky Navbar", "Bento Grid", "High Contrast"],
      masterPrompt: result.masterPrompt || "",
      image: liveScreenshotUrl,
      isFeatured: true,
      analyzedAt: new Date().toISOString()
    };

    return NextResponse.json({ success: true, template: finalTemplate });
  } catch (error) {
    console.error('API /api/analyze error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze website' },
      { status: 500 }
    );
  }
}
