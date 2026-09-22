import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        slate: {
          950: "#090d16",
          900: "#0f172a",
          800: "#1e293b",
        },
        emerald: {
          500: "#10b981",
          400: "#34d399",
        },
        cyan: {
          400: "#22d3ee",
        },
        amber: {
          400: "#fbbf24",
        }
      }
    },
  },
  plugins: [],
};

export default config;
