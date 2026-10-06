import type { Config } from "tailwindcss";

/** Vovix Light System — tokens from the approved design spec.
 *  brand.fill vs brand.ink is load-bearing: fill is 2.24:1 on white and
 *  must never carry text; ink is 5.47:1 and is the text-safe emerald. */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: { paper: "#FFFFFF", sub: "#F7F9FB", sunken: "#EDF1F5", spec: "#0B1B2B" },
        line:   { DEFAULT: "#E3EAF0", strong: "#CBD6E2", spec: "rgba(255,255,255,0.10)" },
        ink:    { DEFAULT: "#102A43", secondary: "#44617E", muted: "#5E7892", onspec: "#D7E3EF" },
        brand:  { fill: "#00C853", hover: "#00A844", ink: "#007A37", wash: "#EAF9F0" },
        cyan:   { fill: "#00E5FF", ink: "#00707F", wash: "#E6FAFD" },
        state:  { ok: "#007A37", warn: "#B45309", crit: "#C2342C", critwash: "#FDF0EF" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        label:   ["11px", { lineHeight: "16px", letterSpacing: "0.16em", fontWeight: "600" }],
        mono:    ["12px", { lineHeight: "18px", letterSpacing: "0.02em", fontWeight: "600" }],
        small:   ["14px", { lineHeight: "22px" }],
        body:    ["16px", { lineHeight: "26px" }],
        lead:    ["18px", { lineHeight: "28px", letterSpacing: "-0.008em", fontWeight: "500" }],
        h3:      ["24px", { lineHeight: "32px", letterSpacing: "-0.016em", fontWeight: "700" }],
        h2:      ["32px", { lineHeight: "40px", letterSpacing: "-0.022em", fontWeight: "750" }],
        h1:      ["42px", { lineHeight: "48px", letterSpacing: "-0.028em", fontWeight: "800" }],
        display: ["56px", { lineHeight: "60px", letterSpacing: "-0.03em",  fontWeight: "800" }],
      },
      borderRadius: { chip: "6px", control: "10px", card: "14px", panel: "20px" },
      boxShadow: {
        raised:   "0 1px 2px rgba(16,42,67,0.06)",
        lifted:   "0 8px 24px rgba(16,42,67,0.10)",
        floating: "0 20px 48px rgba(16,42,67,0.16)",
        glow:     "0 6px 18px rgba(0,200,83,0.28)",
        glowlg:   "0 12px 28px rgba(0,200,83,0.36)",
      },
      maxWidth: { shell: "1180px" },
      keyframes: {
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
        flow:     { to: { strokeDashoffset: "-14" } },
        sheen:    { "0%": { transform: "translateX(-130%)" }, "100%": { transform: "translateX(130%)" } },
      },
      animation: {
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
        flow: "flow 1.1s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
