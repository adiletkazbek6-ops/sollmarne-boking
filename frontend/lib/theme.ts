export const colors = {
  bg: "#0A1118",
  bgDeep: "#060B10",
  surface: "#111D28",
  surfaceAlt: "#152330",
  gold: "#D4AF37",
  goldSoft: "#F3E5AB",
  teal: "#006D77",
  tealLight: "#83C5BE",
  textMain: "#F8F9FA",
  textMuted: "#A0ABBA",
  border: "rgba(255, 255, 255, 0.1)",
  overlay: "rgba(10, 17, 24, 0.72)",
};

export const fonts = {
  heading: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
  body: '"Montserrat", "Helvetica Neue", Arial, sans-serif',
};

// Helper to inject Google Fonts on web
export const injectWebFonts = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById("sollmarine-fonts")) return;
  const link = document.createElement("link");
  link.id = "sollmarine-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(link);

  // smooth scrolling + no tap highlight + base body bg
  const style = document.createElement("style");
  style.innerHTML = `
    html, body, #root { background: ${colors.bg}; }
    html { scroll-behavior: smooth; }
    body { -webkit-font-smoothing: antialiased; -webkit-tap-highlight-color: transparent; }
    *::-webkit-scrollbar { width: 10px; height: 10px; }
    *::-webkit-scrollbar-track { background: ${colors.bgDeep}; }
    *::-webkit-scrollbar-thumb { background: ${colors.surface}; border-radius: 4px; }
    *::-webkit-scrollbar-thumb:hover { background: ${colors.gold}; }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .smt-fade-up { animation: fadeUp .9s ease-out both; }
  `;
  document.head.appendChild(style);
};
