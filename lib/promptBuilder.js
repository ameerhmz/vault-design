/**
 * World-Class AI Prompt Architect & Code Scaffolding Engine
 * Generates production-ready, pixel-exact master engineering prompts for Cursor / Antigravity / v0 / Claude Code.
 */

export function adaptPromptForFramework(basePrompt, framework, colors = [], typography = {}, vibe = [], category = 'SaaS') {
  const bgHex = colors[0]?.hex || '#09090b';
  const surfaceHex = colors[1]?.hex || '#18181b';
  const primaryHex = colors[2]?.hex || '#6366f1';
  const accentHex = colors[3]?.hex || '#22c55e';
  const textHex = colors[4]?.hex || '#f4f4f5';

  const primaryFont = typography?.primary || 'Inter';
  const secondaryFont = typography?.secondary || 'JetBrains Mono';

  const vibeList = vibe && vibe.length > 0 ? vibe.map(v => `#${v}`).join(', ') : '#Full-Page Scroll, #Sticky Navbar, #Interactive Buttons, #Minimalist Design';

  const designTokensHeader = `
=== MASTER DESIGN SYSTEM TOKENS ===
- Background Canvas: ${bgHex} (${colors[0]?.name || 'Canvas'})
- Panel/Card Surface: ${surfaceHex} (${colors[1]?.name || 'Surface'})
- Primary CTA Accent: ${primaryHex} (${colors[2]?.name || 'Primary CTA'})
- Secondary Highlight: ${accentHex} (${colors[3]?.name || 'Highlight'})
- Text & Headlines: ${textHex} (${colors[4]?.name || 'Headlines'})
- Primary Display Font: '${primaryFont}', sans-serif (-0.025em tracking for headlines)
- Monospace/Code Font: '${secondaryFont}', monospace
- Corner Radius Token: 16px (rounded-2xl)
- Glassmorphism Blur Token: 12px Backdrop Blur (backdrop-blur-md bg-opacity-80)
- Stroke/Border Token: 1px metallic stroke (border border-white/[0.08] hover:border-white/20)
- Accessibility: WCAG 14.8:1 AAA High Contrast
- Layout Cues: ${vibeList}
`;

  if (framework === 'tailwind') {
    return `### MASTER AI ENGINEERING BLUEPRINT (React + Tailwind CSS)

You are a Principal Frontend Architect. Build a production-ready, full-page web application matching the design tokens and component specs below.

${designTokensHeader}

=== COMPONENT ARCHITECTURE & LAYOUT BLUEPRINT ===

1. HEADER & STICKY NAVBAR:
   - Fixed top header (\`sticky top-0 z-40 w-full backdrop-blur-md bg-[${bgHex}]/80 border-b border-white/[0.08]\`).
   - Left: Brand logo with category pill badge (\`${category}\`).
   - Center: Desktop navigation links (\`text-zinc-400 hover:text-white transition-colors text-xs font-semibold\`).
   - Right: Primary CTA button (\`bg-[${primaryHex}] text-white font-bold text-xs px-4 py-2 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md\`).

2. HERO FOLD:
   - Centered display title in font \`${primaryFont}\` (\`text-4xl sm:text-6xl font-extrabold tracking-tight text-[${textHex}]\`).
   - Subtitle text (\`text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed\`).
   - Dual action button group: Primary CTA button \`bg-[${primaryHex}] text-white font-bold\` + Secondary outline button \`border border-white/20 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800\`.
   - Interactive hero mockup container (\`bg-[${surfaceHex}] border border-white/10 p-2 rounded-2xl shadow-2xl overflow-hidden\`).

3. BENTO GRID FEATURE SECTIONS:
   - 3-Column responsive grid (\`grid grid-cols-1 md:grid-cols-3 gap-6\`).
   - Each Bento Card: \`bg-[${surfaceHex}] border border-white/[0.08] p-6 rounded-2xl hover:border-white/20 transition-all shadow-lg\`.
   - Card 1: Main capability highlight with bold icon badge.
   - Card 2: Interactive metrics & live status readout using monospace font \`${secondaryFont}\`.
   - Card 3: Interactive demo or feature preview with accent highlights in \`text-[${accentHex}]\`.

4. FOOTER:
   - Multi-column sitemap, social icons, brand copyright, and newsletter subscription form.

=== ORIGINAL EXTRACTION CONTEXT ===
${basePrompt}

=== TECHNICAL REQUIREMENTS ===
- Write complete, self-contained React JSX code using Tailwind CSS classes.
- Use explicit hex arbitrary values where needed (e.g., \`bg-[${bgHex}]\`, \`text-[${primaryHex}]\`).
- Ensure all interactive buttons have hover state scale & press down physics (\`hover:scale-[1.02] active:scale-[0.98] transition-all\`).`;
  }

  if (framework === 'vanillacss') {
    return `/* MASTER AI ENGINEERING PROMPT (Vanilla HTML5 + CSS3) */

${designTokensHeader}

=== CSS SPECIFICATION ===
:root {
  --bg-canvas: ${bgHex};
  --bg-surface: ${surfaceHex};
  --color-primary: ${primaryHex};
  --color-accent: ${accentHex};
  --color-text: ${textHex};
  --font-primary: '${primaryFont}', sans-serif;
  --font-mono: '${secondaryFont}', monospace;
  --radius-card: 16px;
  --backdrop-blur: 12px;
}

=== HTML STRUCTURE & BLUEPRINT ===
- Header: <header class="navbar"> with backdrop-filter: blur(var(--backdrop-blur)) and border-bottom: 1px solid rgba(255,255,255,0.08).
- Hero: <section class="hero"> with H1 in var(--font-primary), CTA in var(--color-primary).
- Bento Grid: <div class="bento-grid"> using CSS Grid repeat(auto-fit, minmax(300px, 1fr)).

=== ORIGINAL EXTRACTION CONTEXT ===
${basePrompt}`;
  }

  if (framework === 'framer-motion') {
    return `### MASTER AI ENGINEERING PROMPT (React + Framer Motion)

Build an interactive animated web application using React, Tailwind CSS, and Framer Motion.

${designTokensHeader}

=== ANIMATION & INTERACTION BLUEPRINT ===
- Intro Reveal: \`initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}\`.
- Button Micro-interactions: \`whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}\`.
- Scroll Reveal: \`whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}\`.

=== ORIGINAL EXTRACTION CONTEXT ===
${basePrompt}`;
  }

  return `### MASTER AI ENGINEERING PROMPT (Next.js + Shadcn UI)

${designTokensHeader}

=== ORIGINAL EXTRACTION CONTEXT ===
${basePrompt}`;
}
