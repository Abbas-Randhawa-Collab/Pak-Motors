import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: "#0b0b0d",
        "black-2": "#151517",
        off: "#f4f2ef",
        line: "#e4e1db",
        red: {
          DEFAULT: "#c31324",
          dark: "#8a0e1c",
          light: "#e63946",
        },
        gray: {
          DEFAULT: "#6b6e76",
          light: "#9a9da3",
        },
        plate: {
          green: "#0b3d24",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        plate: "2px 2px 0 #c31324",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
