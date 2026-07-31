export const INITIAL_TEMPLATES = [
  {
    id: "linear-app",
    title: "Linear — Issue Tracking Designed for Speed",
    url: "https://linear.app",
    category: "SaaS",
    style: "Obsidian Minimalist",
    description: "The gold standard of developer tool design. Dark charcoal canvas, subtle 1px metallic borders, tight letter-spacing, and keyboard-first UI cues.",
    image: "https://api.microlink.io/?url=https%3A%2F%2Flinear.app&screenshot=true&embed=screenshot.url",
    colors: [
      { hex: "#08090a", name: "Onyx Void", role: "Background" },
      { hex: "#141517", name: "Elevated Panel", role: "Cards & Sidebar" },
      { hex: "#5e6ad2", name: "Linear Violet", role: "Brand Accent" },
      { hex: "#8a94a6", name: "Steel Muted", role: "Secondary Labels" },
      { hex: "#f7f8f8", name: "Crisp White", role: "Headlines" }
    ],
    typography: {
      primary: "Inter (-0.02em tracking)",
      secondary: "JetBrains Mono (Hotkeys & Code)",
      notes: "High density 13px/14px text with subtle 1px border dividers."
    },
    vibe: ["Full-Page Scroll", "Developer Tool", "Keyboard Driven", "Dark Mode"],
    masterPrompt: `Design a high-performance issue tracker landing page inspired by Linear App.
DESIGN PHILOSOPHY & FULL-PAGE STRUCTURE:
- Header: Sticky navbar with logo, navigation links, keyboard shortcut badge (CMD + K), and Sign In button.
- Hero Fold: Bold headline in Inter sans-serif (-0.02em tracking), dual CTA buttons, and interactive board preview.
- Scroll Sections:
  1. Kanban issue board showcasing priority badges, status filters, and team avatars.
  2. Feature grid highlighting speed metrics ('Built for 60fps interaction').
  3. Interactive keyboard shortcut showcase panel.
- Palette: Background #08090a, Panel Surface #141517, Accent Violet #5e6ad2, Primary Text #f7f8f8, Secondary Text #8a94a6.
- Footer: Multi-column sitemap links, social icons, and copyright details.`,
    tailwindConfig: `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        linearBg: '#08090a',\n        linearPanel: '#141517',\n        linearViolet: '#5e6ad2',\n        linearText: '#f7f8f8',\n        linearMuted: '#8a94a6',\n      }\n    }\n  }\n}`,
    cssVariables: `:root {\n  --bg-main: #08090a;\n  --bg-panel: #141517;\n  --accent: #5e6ad2;\n  --text-main: #f7f8f8;\n  --text-muted: #8a94a6;\n}`
  },
  {
    id: "stripe-home",
    title: "Stripe — Financial Infrastructure for the Internet",
    url: "https://stripe.com",
    category: "SaaS",
    style: "Aurora Mesh & Isometric",
    description: "Fluid multi-color mesh gradient backgrounds, isometric device mockups, vibrant pill tags, and crystal clear feature columns.",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fstripe.com&screenshot=true&embed=screenshot.url",
    colors: [
      { hex: "#0a2540", name: "Deep Navy", role: "Canvas Background" },
      { hex: "#635bff", name: "Stripe Indigo", role: "Primary Accent" },
      { hex: "#00d4ff", name: "Electric Cyan", role: "Gradient Beam" },
      { hex: "#ff5b99", name: "Neon Pink", role: "Gradient Accent" },
      { hex: "#ffffff", name: "Pure White", role: "Card Surface" }
    ],
    typography: {
      primary: "Sohne / Inter",
      secondary: "Roboto Mono",
      notes: "Bold display titles with colorful gradient highlights."
    },
    vibe: ["Full-Page Scroll", "Fintech", "Mesh Gradient", "Isometric"],
    masterPrompt: `Build a modern payment platform landing page inspired by Stripe.
FULL-PAGE DEEP ARCHITECTURE:
- Header: Transparent sticky navbar with product mega-dropdown menu and Sign In button.
- Hero Fold: Deep navy #0a2540 canvas with a 45-degree multi-color mesh gradient (#635bff, #00d4ff, #ff5b99). Dual CTAs ('Start Now' primary indigo button, 'Contact Sales' outline button).
- Scroll Sections:
  1. Floating code snippet container displaying live API requests.
  2. Multi-column feature grid showcasing payment methods, fraud prevention, and billing products.
  3. Global scale metrics section ('250M+ requests per day').
- Palette: Navy #0a2540, Stripe Indigo #635bff, Cyan #00d4ff, Pink #ff5b99, White #ffffff.`,
    tailwindConfig: `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        stripeNavy: '#0a2540',\n        stripeIndigo: '#635bff',\n        stripeCyan: '#00d4ff',\n        stripePink: '#ff5b99',\n      }\n    }\n  }\n}`,
    cssVariables: `:root {\n  --stripe-navy: #0a2540;\n  --stripe-indigo: #635bff;\n  --stripe-cyan: #00d4ff;\n  --stripe-pink: #ff5b99;\n}`
  },
  {
    id: "raycast-app",
    title: "Raycast — Supercharged Command Palette",
    url: "https://raycast.com",
    category: "Portfolio",
    style: "Dark Mode Glow",
    description: "Deep obsidian theme with crimson red accent highlights, floating glass command palette windows, and crisp extension badges.",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fraycast.com&screenshot=true&embed=screenshot.url",
    colors: [
      { hex: "#070709", name: "Pitch Black", role: "Background" },
      { hex: "#ff6363", name: "Raycast Crimson", role: "Primary Accent" },
      { hex: "#1c1c24", name: "Command Surface", role: "Modal Fill" },
      { hex: "#9ca3af", name: "Muted Gray", role: "Subtext" },
      { hex: "#f9fafb", name: "Bright White", role: "Title Text" }
    ],
    typography: {
      primary: "SF Pro / Inter",
      secondary: "Fira Code",
      notes: "Compact command bar typography with shortcut keys."
    },
    vibe: ["Full-Page Scroll", "Command Palette", "Mac Native", "Crimson Glow"],
    masterPrompt: `Create a Raycast-inspired developer tool showcase page.
LAYOUT & COMPONENTS:
- Header: Minimal dark header with brand logo, store link, and download trigger button.
- Hero Fold: Deep black background #070709, interactive simulated command palette search box with crimson red glow (#ff6363).
- Scroll Sections:
  1. Extension Store Grid displaying integration cards (GitHub, Slack, Jira, Notion).
  2. Keyboard shortcut workflow visualizer with live hotkey badges.
  3. Developer API documentation banner.`,
    tailwindConfig: `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        raycastBg: '#070709',\n        raycastRed: '#ff6363',\n        raycastSurface: '#1c1c24',\n      }\n    }\n  }\n}`,
    cssVariables: `:root {\n  --raycast-bg: #070709;\n  --raycast-red: #ff6363;\n  --raycast-surface: #1c1c24;\n}`
  },
  {
    id: "vercel-platform",
    title: "Vercel — Develop, Preview, Ship",
    url: "https://vercel.com",
    category: "SaaS",
    style: "Monochrome Precision",
    description: "Pure black and white technical design system. Geometric triangular branding, subtle 1px border lines, and high-contrast typography.",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fvercel.com&screenshot=true&embed=screenshot.url",
    colors: [
      { hex: "#000000", name: "Pure Black", role: "Background" },
      { hex: "#111111", name: "Surface Card", role: "Panels" },
      { hex: "#ffffff", name: "Pure White", role: "Headlines & CTA" },
      { hex: "#888888", name: "Neutral Slate", role: "Secondary Text" },
      { hex: "#0070f3", name: "Vercel Blue", role: "Link Accent" }
    ],
    typography: {
      primary: "Geist Sans",
      secondary: "Geist Mono",
      notes: "Clean sans-serif hierarchy with crisp monospace terminal blocks."
    },
    vibe: ["Full-Page Scroll", "Monochrome", "Technical Precision", "Deployment"],
    masterPrompt: `Build a Vercel-inspired developer deployment platform interface.
SPECIFICATIONS:
- Aesthetic: Stark monochrome black #000000 and white #ffffff with 1px border dividers (#333333).
- Header: Sticky header with triangle logo mark, navigation menu, and deploy button.
- Hero Fold: Geist Sans display headline, terminal prompt snippet, and primary action CTA.
- Scroll Sections:
  1. Live build logs console displaying deployment status in Geist Mono font.
  2. Framework integration grid (Next.js, React, Vue, Svelte, Nuxt).
  3. Global Edge Network interactive world map.`,
    tailwindConfig: `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        vercelBg: '#000000',\n        vercelSurface: '#111111',\n        vercelBlue: '#0070f3',\n      }\n    }\n  }\n}`,
    cssVariables: `:root {\n  --vercel-bg: #000000;\n  --vercel-surface: #111111;\n  --vercel-blue: #0070f3;\n}`
  },
  {
    id: "supabase-db",
    title: "Supabase — The Open Source Firebase Alternative",
    url: "https://supabase.com",
    category: "AI App",
    style: "Emerald Dark Mode",
    description: "Deep charcoal canvas paired with vibrant emerald green accents, code snippet tabs, and relational database visualizers.",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fsupabase.com&screenshot=true&embed=screenshot.url",
    colors: [
      { hex: "#1c1c1c", name: "Charcoal Dark", role: "Background" },
      { hex: "#3ecf8e", name: "Supabase Emerald", role: "Primary Accent" },
      { hex: "#242424", name: "Panel Surface", role: "Cards & Tabs" },
      { hex: "#a1a1a1", name: "Slate Gray", role: "Muted Text" },
      { hex: "#ededed", name: "Bright Light", role: "Primary Text" }
    ],
    typography: {
      primary: "Custom Sans / Inter",
      secondary: "Source Code Pro",
      notes: "Clean developer documentation styling with emerald green highlights."
    },
    vibe: ["Full-Page Scroll", "Database", "Open Source", "Emerald Accent"],
    masterPrompt: `Build a developer database landing page inspired by Supabase.
DESIGN DIRECTIONS:
- Palette: Charcoal dark #1c1c1c, Supabase Emerald #3ecf8e, Surface Panel #242424.
- Header: Sticky navbar with green bolt logo, documentation links, and GitHub star counter button.
- Scroll Sections:
  1. Hero section with headline, subtext, and 'Start your project' primary CTA.
  2. Tabbed code snippet window demonstrating SQL queries and real-time auth.
  3. Interactive feature cards with emerald green top border hover effects.`,
    tailwindConfig: `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        supaBg: '#1c1c1c',\n        supaEmerald: '#3ecf8e',\n        supaPanel: '#242424',\n      }\n    }\n  }\n}`,
    cssVariables: `:root {\n  --supa-bg: #1c1c1c;\n  --supa-emerald: #3ecf8e;\n  --supa-panel: #242424;\n}`
  },
  {
    id: "framer-site",
    title: "Framer — The Web Builder for Designers",
    url: "https://framer.com",
    category: "Portfolio",
    style: "Interactive Studio",
    description: "Deep obsidian design tool canvas with vibrant blue accents, smooth canvas controls, and interactive template previews.",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fframer.com&screenshot=true&embed=screenshot.url",
    colors: [
      { hex: "#000000", name: "Canvas Void", role: "Background" },
      { hex: "#0055ff", name: "Framer Blue", role: "Primary Accent" },
      { hex: "#111111", name: "Panel Fill", role: "Cards & Toolbars" },
      { hex: "#888888", name: "Slate Muted", role: "Labels" },
      { hex: "#ffffff", name: "Crisp White", role: "Headlines" }
    ],
    typography: {
      primary: "Inter / Custom Sans",
      secondary: "JetBrains Mono",
      notes: "Clean design tool typography with high-contrast accent highlights."
    },
    vibe: ["Full-Page Scroll", "Design Tool", "Interactive Canvas", "High Density"],
    masterPrompt: `Build a modern web design tool platform inspired by Framer.
DESIGN SPECIFICATIONS:
- Aesthetic: Pitch black canvas #000000, Framer Blue #0055ff, dark panels #111111.
- Features:
  1. Interactive canvas preview with zoom and scroll controls.
  2. Component library grid showcasing UI widgets and animated transitions.
  3. Feature highlight columns for CMS, localization, and 60fps performance.`,
    tailwindConfig: `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        framerBg: '#000000',\n        framerBlue: '#0055ff',\n        framerPanel: '#111111',\n      }\n    }\n  }\n}`,
    cssVariables: `:root {\n  --framer-bg: #000000;\n  --framer-blue: #0055ff;\n  --framer-panel: #111111;\n}`
  }
];
