import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base:    "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated:"var(--bg-elevated)",
          hover:   "var(--bg-hover)",
        },
        border: {
          default: "var(--border-default)",
          strong:  "var(--border-strong)",
        },
        text: {
          primary:   "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted:     "var(--text-muted)",
        },
        accent: {
          default: "var(--accent-default)",
          hover:   "var(--accent-hover)",
          fg:      "var(--accent-fg)",
        },
        severity: {
          critical: "var(--severity-critical)",
          high:     "var(--severity-high)",
          medium:   "var(--severity-medium)",
          low:      "var(--severity-low)",
        },
        cat: {
          underspecified: "var(--cat-underspecified)",
          "undefined-term": "var(--cat-undefined-term)",
          contradiction:  "var(--cat-contradiction)",
          "edge-case":    "var(--cat-edge-case)",
          assumption:     "var(--cat-assumption)",
          "scope-gap":    "var(--cat-scope-gap)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        error:   "var(--error)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-xl": ["3rem",    { lineHeight: "1.2", fontWeight: "800" }],
        "display-lg": ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-xl": ["1.5rem",  { lineHeight: "1.3", fontWeight: "700" }],
        "heading-lg": ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        "heading-md": ["1rem",    { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg":    ["1rem",    { lineHeight: "1.6", fontWeight: "400" }],
        "body-md":    ["0.875rem",{ lineHeight: "1.6", fontWeight: "400" }],
        "body-sm":    ["0.75rem", { lineHeight: "1.6", fontWeight: "400" }],
        "label-lg":   ["0.875rem",{ lineHeight: "1.4", fontWeight: "500" }],
        "label-md":   ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
        "code-md":    ["0.8125rem",{ lineHeight: "1.5", fontWeight: "400" }],
      },
      spacing: {
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
      },
      borderRadius: {
        sm:   "6px",
        md:   "8px",
        lg:   "12px",
        xl:   "16px",
        full: "9999px",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "fade-in-up": "fade-in-up 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
