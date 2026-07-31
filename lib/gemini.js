import { GoogleGenAI } from '@google/genai';

export async function analyzeWebsiteWithGemini({ url, apiKey, pageText, title }) {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("No Gemini API key provided. Please configure your API key in settings or .env.");
  }

  const ai = new GoogleGenAI({ apiKey: key });

  const systemPrompt = `You are the world's top senior frontend architect, UI/UX director, and prompt engineer.
Your task is to analyze the provided website link/metadata and generate a JSON object containing a HYPER-SPECIFIC, PRODUCTION-READY AI MASTER PROMPT for Cursor/Antigravity/v0.

CRITICAL RULE FOR MASTER PROMPT:
- AVOID ALL GENERIC FLUFF (do NOT say 'the site should be responsive, professional, or accessible').
- Write a CONCRETE PIXEL-EXACT BLUEPRINT covering:
  1. HEADER & NAVBAR: Logo mark, exact navigation menu items, CTA button copy and styling.
  2. HERO FOLD: Headline text, sub-headline description, primary & secondary action buttons, hero media visual container.
  3. BENTO GRID / FEATURES: Exact 3-column card breakdown (Card 1 title & description, Card 2 metrics widget, Card 3 interactive panel).
  4. INTERACTIVE PHYSICS: Hover scale factor, border glow colors, active button press states.
  5. FOOTER: Sitemap links, brand notice, newsletter form.

Required JSON Structure:
{
  "title": "Catchy display title",
  "category": "Choose one of ['SaaS', 'Portfolio', 'E-commerce', 'Neo-Brutalist', 'AI App', 'Cyberpunk', '3D/Interactive']",
  "style": "Design aesthetic name (e.g. Obsidian Minimalist, Glassmorphic SaaS)",
  "description": "2-sentence technical summary of page depth, layout grid, and color palette.",
  "colors": [
    {"hex": "#...", "name": "Canvas Background", "role": "Background"},
    {"hex": "#...", "name": "Panel Surface", "role": "Cards"},
    {"hex": "#...", "name": "Primary Accent", "role": "Primary CTA"},
    {"hex": "#...", "name": "Secondary Accent", "role": "Highlight"},
    {"hex": "#...", "name": "Primary Text", "role": "Headlines"}
  ],
  "typography": {
    "primary": "Font name (e.g. Inter)",
    "secondary": "Monospace font name (e.g. JetBrains Mono)",
    "notes": "Letter spacing and weight notes"
  },
  "vibe": ["Full-Page Scroll", "Sticky Navbar", "Bento Grid", "High Contrast"],
  "masterPrompt": "The hyper-specific technical blueprint prompt..."
}

Output MUST be valid JSON only.`;

  const userPrompt = `Target Website URL: ${url}
Website Page Title: ${title || 'Unknown Title'}
Page Content Sample: ${pageText ? pageText.slice(0, 2000) : 'Not available'}

Extract exact design tokens and write a hyper-accurate, concrete AI engineering master prompt for this website link.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    const cleanJsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJsonText);
  } catch (err) {
    console.error("Gemini API error:", err);
    throw new Error(`Gemini Analysis Failed: ${err.message}`);
  }
}
