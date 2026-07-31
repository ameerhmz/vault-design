import { GoogleGenAI } from '@google/genai';

export async function analyzeWebsiteWithGemini({ url, apiKey, pageText, title, description, themeColor }) {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("No Gemini API key provided. Please configure your API key in settings or .env.");
  }

  const ai = new GoogleGenAI({ apiKey: key });

  const systemPrompt = `You are a Principal Frontend Architect, Design Director, and Prompt Engineering Specialist.
Your objective is to analyze the provided website metadata and generate a JSON object containing a HYPER-ACCURATE, PRODUCTION-READY AI MASTER ENGINEERING PROMPT for AI coding assistants (Cursor, Antigravity, v0, Claude Code).

STRICT ACCURACY RULES:
1. NO GENERIC FLUFF: Do NOT write generic sentences like "the website should be clean, modern, or accessible".
2. 5 DOMINANT COLOR PALETTE: Extract 5 exact, realistic Hex color codes matching:
   - Canvas Background (e.g., #0b0b0d)
   - Panel/Card Surface (e.g., #141418)
   - Primary CTA Accent (e.g., #d4a373 or brand accent)
   - Secondary Highlight (e.g., #a89182)
   - Headlines & Primary Text (e.g., #ebe1dc)
3. TYPOGRAPHY RULES: Name the exact display sans-serif or serif font stack and monospace code font.
4. MASTER PROMPT FORMAT: Format masterPrompt using exact Markdown sections:
   ### MASTER AI ENGINEERING BLUEPRINT (React + Tailwind CSS)
   === MASTER DESIGN SYSTEM TOKENS ===
   === COMPONENT ARCHITECTURE & LAYOUT BLUEPRINT === (1. HEADER, 2. HERO FOLD, 3. BENTO GRID, 4. FOOTER)
   === TECHNICAL REQUIREMENTS ===

Required JSON Output Schema:
{
  "title": "Exact Brand Design System Title",
  "category": "One of ['SaaS', 'Portfolio', 'E-commerce', 'Neo-Brutalist', 'AI App', 'Cyberpunk', '3D/Interactive']",
  "style": "Exact Design Aesthetic Name",
  "description": "2-sentence precise technical summary of typography, card layout, and color scheme.",
  "colors": [
    {"hex": "#...", "name": "Canvas Background", "role": "Background"},
    {"hex": "#...", "name": "Panel Surface", "role": "Cards"},
    {"hex": "#...", "name": "Primary Accent", "role": "Primary CTA"},
    {"hex": "#...", "name": "Secondary Highlight", "role": "Highlight"},
    {"hex": "#...", "name": "Headlines Text", "role": "Text"}
  ],
  "typography": {
    "primary": "Primary Font Family",
    "secondary": "Monospace Font Family",
    "notes": "Tracking and weight instructions"
  },
  "vibe": ["Full-Page Scroll", "Sticky Navbar", "Bento Grid", "High Contrast"],
  "masterPrompt": "Complete hyper-accurate master prompt blueprint..."
}

Output MUST be strictly valid JSON.`;

  const userPrompt = `Target Website URL: ${url}
Website Page Title: ${title || 'Unknown Title'}
Meta Description: ${description || 'N/A'}
Theme Color Hex: ${themeColor || 'N/A'}
HTML Content Excerpt: ${pageText ? pageText.slice(0, 2500) : 'N/A'}

Extract exact design tokens and generate the hyper-accurate master engineering blueprint JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.1
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
