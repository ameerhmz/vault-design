import "./globals.css";

export const metadata = {
  title: "UICraft Studio — Engineered AI Prompts & Web Architecture Library",
  description: "Explore handcrafted design profiles, extract 5-color palettes, copy tailored prompts for coding assistants, and analyze any website link with 1 click.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
