"use client";

import { AlertTriangle } from "lucide-react";
import { LogoMark, usePausable, useTicker } from "./ui";

/* Hero product composition (Figma: "Hero product composition").
   A live VOVIX Lens window — the stepper advances, fields land one by
   one with confidence scores, one field is held for review — with the
   other two products floating around it as proof of breadth.
   All data is illustrative and labelled as such.                     */

const STEPS = ["Capture", "Read", "Extract", "Validate", "Export"];
const FIELDS: [string, string, number][] = [
  ["Supplier", "Sundaram Traders", 0.98],
  ["GSTIN", "33AAGCS4321F1Z8", 0.99],
  ["Invoice no.", "INV-2026-0914", 0.99],
  ["HSN / SAC", "8471", 0.97],
  ["Taxable value", "₹49,500.00", 0.99],
  ["CGST + SGST", "₹8,910.00", 0.96],
  ["Place of supply", "Tamil Nadu", 0.84],
];

export function HeroProduct() {
  const [ref, active] = usePausable<HTMLDivElement>();
  // 0..4 stages, 5..7 hold on the finished state
  const tick = useTicker(9, 1300, active);
  const stage = Math.min(tick, 4);
  const shown = stage < 2 ? 0 : stage === 2 ? 4 : FIELDS.length;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[600px] pb-16 pt-6 sm:pb-20 lg:pt-10" aria-label="Illustration: VOVIX Lens extracting an invoice into TallyPrime" role="img">
      <style>{`
        @keyframes vxFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .vx-float { animation: vxFloat 6s ease-in-out infinite; }
      `}</style>

      {/* Edge pill */}
      <div className="vx-float absolute right-0 top-0 z-20 hidden items-center gap-2 rounded-full bg-navy-raised px-3.5 py-2 shadow-lifted sm:flex" style={{ animationDelay: "-2s" }}>
        <span className="h-2 w-2 rounded-full bg-brand-fill animate-pulse-dot" aria-hidden />
        <span className="font-mono text-[11px] text-white">Edge · USD/JPY stood down — no signal</span>
      </div>

      {/* Lens window */}
      <div className="relative z-10 overflow-hidden rounded-[18px] border border-line bg-white shadow-floating">
        <div className="flex items-center justify-between border-b border-line bg-ground-sub px-4 py-2.5">
          <span className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-line-strong" aria-hidden />)}
            <span className="ml-2 font-mono text-[11.5px] text-ink-muted">lens.vovix.in<span className="hidden sm:inline"> / batch-0914</span></span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">Illustrative<span className="hidden sm:inline"> data</span></span>
        </div>
        <ol className="flex items-center justify-between border-b border-line px-4 py-3">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${i <= stage ? "bg-brand-fill" : "bg-line-strong"}`} aria-hidden />
              <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.06em] transition-colors sm:text-[10.5px] ${i <= stage ? "text-ink" : "text-ink-muted/70"}`}>{s}</span>
            </li>
          ))}
        </ol>
        <div className="grid sm:grid-cols-[200px_1fr]">
          {/* source */}
          <div className="hidden bg-ground-sub p-4 sm:block">
            <div className="relative overflow-hidden rounded-control border border-line bg-white p-3.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Tax invoice</p>
              <p className="mt-1 text-[13px] font-bold text-ink">Sundaram Traders</p>
              <p className={`mt-2 inline-block rounded border px-1 font-mono text-[9.5px] transition-colors duration-500 ${stage >= 2 ? "border-brand-fill bg-brand-wash text-ink" : "border-transparent text-ink-muted"}`}>GSTIN 33AAGCS4321F1Z8</p>
              <div className="mt-3 space-y-1.5">{[88, 70, 94, 60].map((w, i) => <div key={i} className="h-[5px] rounded-full bg-ground-sunken" style={{ width: `${w}%` }} />)}</div>
              <div className="mt-3 grid grid-cols-[1fr_auto] gap-y-1 font-mono text-[9.5px] text-ink-secondary">
                <span>HSN 8471 · 10</span><span className="text-right">49,500.00</span>
                <span>CGST 9%</span><span className="text-right">4,455.00</span>
                <span>SGST 9%</span><span className="text-right">4,455.00</span>
                <span className="font-bold text-ink">Total</span><span className="text-right font-bold text-ink">58,410.00</span>
              </div>
              {stage === 1 && <span aria-hidden className="pointer-events-none absolute inset-x-0 h-7 animate-[scanline_1.3s_linear_infinite] bg-gradient-to-b from-transparent via-brand-fill/25 to-transparent" />}
            </div>
          </div>
          {/* fields */}
          <div className="min-h-[300px] px-4 pb-4 pt-3 sm:px-5">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">Extracted fields</p>
            {FIELDS.map(([k, v, c], i) => {
              const on = i < shown;
              const tone = c >= 0.95 ? "bg-brand-wash text-state-ok" : "bg-state-warnwash text-state-warn";
              return (
                <div key={k} className="flex items-center justify-between gap-3 border-b border-line/80 py-[7px]">
                  <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-wider text-ink-muted">{k}</span>
                  <span className={`flex min-w-0 items-center gap-1.5 transition-all duration-500 ${on ? "opacity-100" : "translate-x-1 opacity-0"}`} style={{ transitionDelay: `${(i % 4) * 90}ms` }}>
                    <span className="truncate text-[12.5px] font-semibold text-ink tnum">{v}</span>
                    <span className={`shrink-0 rounded px-1 font-mono text-[9.5px] font-bold tnum ${tone}`}>{c.toFixed(2)}</span>
                  </span>
                </div>
              );
            })}
            <div className={`mt-3 flex items-center gap-2 rounded-control bg-state-warnwash px-3 py-2 transition-opacity duration-500 ${stage >= 3 ? "opacity-100" : "opacity-0"}`}>
              <AlertTriangle size={14} className="shrink-0 text-state-warn" aria-hidden />
              <span className="text-[12px] font-semibold text-ink">1 field below threshold → review queue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tally export */}
      <div className={`vx-float absolute -bottom-0 right-0 z-20 w-[250px] rounded-[14px] bg-navy px-4 py-3.5 shadow-floating transition-all duration-700 sm:-right-4 ${stage >= 4 ? "opacity-100" : "translate-y-2 opacity-0"}`}>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-brand-fill">TallyPrime XML · balanced</p>
        <p className="mt-1 text-small font-semibold text-white">13 vouchers posted · 1 held</p>
        <p className="mt-1 truncate font-mono text-[10px] text-ink-onspec">&lt;VOUCHER VCHTYPE=&quot;Purchase&quot;&gt; … &lt;/VOUCHER&gt;</p>
      </div>

      {/* OneView */}
      <div className="vx-float absolute -left-8 bottom-6 z-20 hidden w-[250px] rounded-[14px] border border-line bg-white p-3.5 shadow-floating sm:block" style={{ animationDelay: "-4s" }}>
        <div className="flex items-center gap-2">
          <LogoMark size={22} />
          <span className="text-[12.5px] font-bold text-ink">VOVIX OneView</span>
        </div>
        <p className="mt-2 inline-block rounded-[10px] bg-[#D7F5E2] px-2.5 py-1.5 text-[12px] text-ink">Analyse ACME Industries</p>
        <p className="mt-2 font-mono text-[10px] text-ink-secondary">Tear-sheet ready · P/E 18.4× · ROE 16.2%</p>
      </div>
    </div>
  );
}
