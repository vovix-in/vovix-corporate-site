import { Check, AlertTriangle, FileText, Activity, Ban } from "lucide-react";

/* ── Extraction viewer — Lens side ─────────────────────────────
   The flagged low-confidence row is the point of this component.
   Human-in-the-loop is already the published promise; showing a
   clean 100% sweep would contradict it.                          */
const FIELDS = [
  { k: "Invoice no.",   v: "INV-2026-0914", c: 0.99 },
  { k: "Supplier",      v: "Sundaram Traders", c: 0.97 },
  { k: "GSTIN",         v: "33AAGCS4321F1Z8", c: 0.98 },
  { k: "Taxable",       v: "₹49,500.00",  c: 0.99 },
  { k: "CGST 9%",       v: "₹4,455.00",   c: 0.96 },
  { k: "Place of supply", v: "Tamil Nadu", c: 0.84 },
];

function conf(c: number) {
  if (c >= 0.95) return { cls: "text-state-ok bg-brand-wash", label: c.toFixed(2) };
  if (c >= 0.8) return { cls: "text-state-warn bg-[#FDF6EC]", label: c.toFixed(2) };
  return { cls: "text-state-crit bg-state-critwash", label: c.toFixed(2) };
}

export function ExtractionViewer() {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-lifted">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-ground-sub px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
          <FileText size={13} className="text-brand-ink" /> Vovix Lens
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-fill/40 bg-brand-wash px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-fill animate-pulse-dot" /> Extracting
        </span>
      </div>

      <div className="relative overflow-hidden px-4 py-2.5">
        <span aria-hidden className="pointer-events-none absolute inset-x-0 h-[26px] animate-[scanline_2.8s_linear_infinite] bg-gradient-to-b from-transparent via-brand-fill/15 to-transparent" />
        {FIELDS.map((f, i) => {
          const c = conf(f.c);
          return (
            <div
              key={f.k}
              style={{ animationDelay: `${0.1 * i}s` }}
              className="relative flex animate-[fieldIn_.34s_cubic-bezier(.16,1,.3,1)_both] items-baseline justify-between gap-3 border-b border-line/70 py-[7px] last:border-0"
            >
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink-muted">{f.k}</span>
              <span className="flex min-w-0 items-baseline gap-1.5">
                <span className="truncate text-[13px] font-semibold text-ink tnum">{f.v}</span>
                <span className={`shrink-0 rounded px-1 py-px font-mono text-[9.5px] font-bold tnum ${c.cls}`}>{c.label}</span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-line bg-[#FDF6EC] px-4 py-2.5">
        <AlertTriangle size={13} className="shrink-0 text-state-warn" />
        <span className="text-[11.5px] leading-snug text-ink-secondary">
          <strong className="font-semibold text-ink">1 field below threshold</strong> — queued for review before posting
        </span>
      </div>
      <div className="flex items-center gap-2 border-t border-line px-4 py-2.5">
        <Check size={13} className="shrink-0 text-brand-ink" />
        <span className="text-[11.5px] text-ink-secondary">Every value links back to its page in the source PDF</span>
      </div>
    </div>
  );
}

/* ── Signal stream — Edge side ─────────────────────────────────
   On ground/spec. The stand-down state is deliberately the
   dominant element: refusing to fire is the actual product.      */
const SPARK = [18, 22, 19, 26, 24, 31, 28, 35, 33, 40, 37, 44, 41, 49, 46, 54];

export function SignalStream() {
  const pts = SPARK.map((v, i) => `${(i / (SPARK.length - 1)) * 240},${60 - v}`).join(" ");
  return (
    <div className="overflow-hidden rounded-card border border-white/10 bg-ground-spec shadow-lifted">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/55">
          <Activity size={13} className="text-brand-onspec" /> Vovix Edge
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/55">MT5 · live</span>
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] text-white/50">EUR/USD</span>
          <span className="font-mono text-[11px] text-brand-onspec tnum">+0.42%</span>
        </div>
        <svg viewBox="0 0 240 64" className="mt-1 h-[52px] w-full" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#00C853" stopOpacity=".34" />
              <stop offset="1" stopColor="#00C853" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={`0,64 ${pts} 240,64`} fill="url(#sg)" className="animate-[fadeIn_.8s_ease-out_1.2s_both]" />
          <polyline points={pts} pathLength={1} fill="none" stroke="#4FE08A" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" className="spark-draw" />
          <circle cx="240" cy={60 - SPARK[SPARK.length - 1]} r="2.6" fill="#4FE08A" className="animate-[fadeIn_.2s_ease-out_1.9s_both]" />
        </svg>
      </div>

      <div className="space-y-px px-4 pb-1">
        {[["Entry", "1.0842"], ["Stop", "1.0818"], ["Target", "1.0906"], ["Size", "0.42 lot"]].map(([k, v], i) => (
          <div key={k} style={{ animationDelay: `${1 + 0.12 * i}s` }} className="slide-in flex items-center justify-between border-b border-white/[0.07] py-[5px] last:border-0">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/55">{k}</span>
            <span className="font-mono text-[12px] font-semibold text-white tnum">{v}</span>
          </div>
        ))}
      </div>

      {/* the differentiator */}
      <div className="rise mx-3 mb-3 mt-2 rounded-[10px] border border-white/10 bg-white/[0.04] px-3 py-2.5 [animation-delay:1.6s]">
        <div className="flex items-start gap-2">
          <Ban size={13} className="mt-px shrink-0 text-white/55" />
          <div>
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-white/55">GBP/JPY — stood down</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-white/55">
              Regime unclear, reward-to-risk below gate. No signal issued.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
