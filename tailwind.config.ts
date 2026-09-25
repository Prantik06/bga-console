import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0D16",
        panel: "#131829",
        "panel-raised": "#171D31",
        border: "#1F2740",
        "border-soft": "#182036",
        text: {
          primary: "#E8ECF5",
          muted: "#8891A8",
          faint: "#5B6377",
        },
        owner: "#F2B84B",
        legacy: "#35C7EA",
        legend: "#9B6BF2",
        empire: "#F0508C",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "10px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
