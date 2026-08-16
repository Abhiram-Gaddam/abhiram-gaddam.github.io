import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Add any other folders where you use Tailwind classes (e.g., ./src)
  ],
  theme: {
    extend: {
      colors: {
        // "ink" is now the warm paper background (name kept so bg-ink/* usages don't need renaming)
        ink: "#fbf4e6",
        "ink-2": "#f5ead6",
        "ink-3": "#eeddb8",
        line: "#e2cfa4",
        "line-soft": "#ecdfba",
        // "paper" is now the main ink-blue text color
        paper: "#22314f",
        muted: "#5c6f8a",
        copper: "#f4a300",
        "copper-soft": "#d98c1f",
        "copper-bright": "#ff6b4a",
        teal: "#2a9d78",
        amber: "#f2b705",
        danger: "#d1483c",
      },
      fontFamily: {
        display: ["var(--font-display)", "cursive"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle at 1px 1px, rgba(217,140,31,0.22) 1px, transparent 0)",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        floatY: "floatY 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;