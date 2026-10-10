import type { Config } from "tailwindcss";

/** Vovix brand system — v3.
 *
 *  Every brand value below is sampled from the original logo artwork
 *  (public/assets/logo-vovix.png), not chosen by taste:
 *    alpha mark + "VOV" ........ navy   #072836
 *    alpha sweep + pixel trail . green  #09A54C
 *    rule under the wordmark ... cyan   #1FF3F3
 *    "IX" metallic letters ..... silver #ADADAC
 *
 *  Contrast rules (WCAG 2.1):
 *    brand.fill on white is 3.23:1 → fills, icons, large display type only.
 *    brand.ink  on white is 5.25:1 → the text-safe green (same hue, darker).
 *    navy on brand.fill is 4.76:1  → primary buttons are navy-on-green.
 *    brand.fill on navy is 4.76:1  → the logo green is text-safe on dark bands.
 *    cyan is decorative (rules, focus on dark, data pulses) — never body text on light. */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:   { DEFAULT: "#072836", deep: "#041B25", raised: "#0B3344", line: "rgba(255,255,255,0.10)" },
        ground: { paper: "#FFFFFF", sub: "#F4F7F9", sunken: "#E9EEF2", spec: "#072836" },
        line:   { DEFAULT: "#E1E8ED", strong: "#C9D5DD", spec: "rgba(255,255,255,0.10)" },
        ink:    { DEFAULT: "#072836", secondary: "#3B5666", muted: "#5E7787", onspec: "#C9D6DE" },
        brand:  { fill: "#09A54C", hover: "#23B862", ink: "#067D3A", wash: "#E8F6EE", onspec: "#09A54C", bright: "#3DD27E" },
        cyan:   { fill: "#1FF3F3", ink: "#08737A", wash: "#E5FBFB" },
        silver: { DEFAULT: "#ADADAC", light: "#DCDCDC", dark: "#8C8C8B" },
        state:  { ok: "#067D3A", warn: "#B45309", warnwash: "#FDF6EC", crit: "#C2342C", critwash: "#FDF0EF" },
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
        lead:    ["18px", { lineHeight: "29px", letterSpacing: "-0.006em", fontWeight: "500" }],
        h3:      ["22px", { lineHeight: "30px", letterSpacing: "-0.016em", fontWeight: "700" }],
        h2:      ["36px", { lineHeight: "42px", letterSpacing: "-0.026em", fontWeight: "800" }],
        h1:      ["44px", { lineHeight: "50px", letterSpacing: "-0.03em", fontWeight: "800" }],
        display: ["64px", { lineHeight: "66px", letterSpacing: "-0.035em", fontWeight: "800" }],
      },
      borderRadius: { chip: "6px", control: "10px", card: "14px", panel: "20px" },
      boxShadow: {
        raised:   "0 1px 2px rgba(7,40,54,0.06)",
        lifted:   "0 10px 28px rgba(7,40,54,0.10)",
        floating: "0 24px 60px rgba(7,40,54,0.18)",
        glow:     "0 6px 18px rgba(9,165,76,0.28)",
        glowlg:   "0 12px 28px rgba(9,165,76,0.36)",
      },
      maxWidth: { shell: "1200px" },
      keyframes: {
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.35" } },
        flow:     { to: { strokeDashoffset: "-28" } },
      },
      animation: {
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
        flow: "flow 1.4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
