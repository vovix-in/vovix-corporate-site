"use client";

import { AlertTriangle, Check, FileText, Activity, ShieldCheck, Pause, Radio, Send, CheckCheck, Ban, Clock } from "lucide-react";
import { Illustrative, LogoMark, usePausable, useTicker } from "./ui";

/* All three demos are live UI, not screenshots. Each advances a step
   ticker only while on screen and visible; under reduced motion they
   render their final, complete state. Data is illustrative and is
   labelled as such inside every frame.                                */

/* ═══════════════════════════ PAYROLL ═══════════════════════════ */

const PAYROLL_STEPS = ["Attendance", "Calculate", "Approve", "Pay", "Prove"];
const RUN_STATE = ["DRAFT", "DRAFT", "CHECKED", "APPROVED", "PAID"];
const BLOCKERS = [
  { k: "2 employees without a UAN", owner: "HR", clearAt: 2 },
  { k: "14 overtime hours awaiting approval", owner: "Owner", clearAt: 2 },
  { k: "1 unmatched punch · Shift B · 18 Oct", owner: "Vovix", clearAt: 1 },
];
const LINES = [
  { k: "Employees paid", v: "86" },
  { k: "Gross earnings", v: "₹36,04,900" },
  { k: "Net pay", v: "₹31,84,600" },
  { k: "Employer PF + ESI", v: "₹4,12,300" },
];
const FILINGS = [
  { k: "PF ECR", due: "15 Nov", state: "VERIFIED" },
  { k: "ESI contribution", due: "15 Nov", state: "PAID" },
  { k: "Professional tax", due: "30 Nov", state: "APPROVED" },
  { k: "TDS · 24Q", due: "7 Nov", state: "PREPARED" },
];

function stateTone(st: string) {
  if (st === "VERIFIED") return "text-state-ok bg-brand-wash";
  if (st === "PAID" || st === "APPROVED") return "text-brand-ink bg-brand-wash";
  return "text-state-warn bg-state-warnwash";
}

export function PayrollDemo() {
  const [ref, active] = usePausable<HTMLDivElement>();
  const step = useTicker(PAYROLL_STEPS.length + 1, 1900, active); // last tick holds the finished state
  const s = Math.min(step, PAYROLL_STEPS.length - 1);
  const open = BLOCKERS.filter((x) => s < x.clearAt).length;

  return (
    <div ref={ref} className="overflow-hidden rounded-panel border border-line bg-white shadow-floating">
      {/* chrome */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-ground-sub px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] font-semibold text-ink-muted">
          <FileText size={13} className="shrink-0 text-brand-ink" aria-hidden />
          <span className="truncate">payroll.vovix.in · Chennai Precision Components · October 2026</span>
        </span>
        <Illustrative />
      </div>

      {/* stepper */}
      <ol className="flex border-b border-line" aria-label="Payroll month stage">
        {PAYROLL_STEPS.map((l, i) => (
          <li key={l} aria-current={i === s ? "step" : undefined}
              className={`relative flex-1 px-1 py-2.5 text-center font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition-colors sm:text-[10.5px] ${
                i < s ? "text-brand-ink" : i === s ? "text-ink" : "text-ink-muted/70"}`}>
            {l}
            <span className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand-fill transition-transform duration-500 ${i <= s ? "scale-x-100" : "scale-x-0"}`} />
          </li>
        ))}
      </ol>

      <div className="grid gap-0 md:grid-cols-[0.82fr_1fr]">
        {/* Today — the owner's one screen */}
        <div className="border-r border-line bg-ground-sub/60 p-4">
          <div className="h-full rounded-control border border-line bg-white p-4 shadow-raised">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Today · owner view</p>
            <p className="mt-1 text-[13px] font-bold leading-snug text-ink">
              {open ? `${open} thing${open > 1 ? "s" : ""} stand${open > 1 ? "" : "s"} between your team and payday` : "Ready for payday on the 7th"}
            </p>
            <ul className="mt-3 space-y-1.5">
              {BLOCKERS.map((x) => {
                const done = s >= x.clearAt;
                return (
                  <li key={x.k} className="flex items-start gap-2 text-[11.5px] leading-snug">
                    {done ? <Check size={13} className="mt-px shrink-0 text-brand-ink" aria-label="resolved" />
                          : <AlertTriangle size={13} className="mt-px shrink-0 text-state-warn" aria-label="open" />}
                    <span className={`min-w-0 ${done ? "text-ink-muted line-through" : "text-ink"}`}>{x.k}</span>
                    <span className="ml-auto shrink-0 rounded bg-ground-sub px-1.5 py-px font-mono text-[9px] font-bold uppercase text-ink-muted">{x.owner}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-line pt-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted">Cash-out this month</p>
              <p className="mt-1 text-[15px] font-bold text-ink tnum">{s >= 1 ? "₹35,96,900" : "—"}</p>
              <p className="font-mono text-[9.5px] text-ink-muted">net pay on the 7th · PF, ESI by the 15th · PT by the 30th</p>
            </div>
          </div>
        </div>

        {/* run state, approval, payment, proof */}
        <div className="min-h-[330px] p-4 sm:min-h-[380px] sm:p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">Payroll run · October 2026</p>
            <span className={`rounded px-1.5 py-px font-mono text-[9.5px] font-bold ${stateTone(RUN_STATE[s] === "PAID" ? "VERIFIED" : RUN_STATE[s] === "DRAFT" ? "PREPARED" : RUN_STATE[s])}`}>{RUN_STATE[s]}</span>
          </div>

          {s === 0 ? (
            <div className="flex min-h-[290px] flex-col items-center justify-center gap-3 text-center sm:min-h-[340px]">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-wash text-brand-ink">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-fill/20" aria-hidden />
                <Clock size={20} aria-hidden />
              </span>
              <p className="text-small font-semibold text-ink">Reconciling 2,236 biometric punches to shifts</p>
              <p className="font-mono text-[11px] text-ink-muted">General · A · B · C shifts · overtime at 2x · exceptions queued</p>
            </div>
          ) : (
            <>
              <div className="mt-3 divide-y divide-line/80">
                {LINES.map((f, i) => (
                  <div key={f.k} style={{ animationDelay: `${i * 60}ms` }} className="slide-in flex items-baseline justify-between gap-3 py-[6px]">
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink-muted">{f.k}</span>
                    <span className="text-[12.5px] font-semibold text-ink tnum">{f.v}</span>
                  </div>
                ))}
              </div>

              {s >= 2 && (
                <ul className="fade-in mt-4 space-y-1 text-[12px] text-ink-secondary">
                  <li className="flex items-center gap-2"><Check size={13} className="shrink-0 text-brand-ink" aria-hidden />Prepared by Vovix operator · checked against last month, 3 variances explained</li>
                  <li className="flex items-center gap-2"><ShieldCheck size={13} className="shrink-0 text-brand-ink" aria-hidden />Approved by the owner · maker–checker enforced</li>
                  {s >= 3 && <li className="slide-in flex items-center gap-2"><CheckCheck size={13} className="shrink-0 text-brand-ink" aria-hidden />Bank file generated for your upload · Vovix never holds money</li>}
                </ul>
              )}

              {s >= 4 && (
                <div className="fade-in mt-4 overflow-hidden rounded-control border border-navy/10 bg-navy">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-onspec">Compliance proof ledger</span>
                    <span className="font-mono text-[9px] text-white/70">Calculated → … → Verified</span>
                  </div>
                  <ul className="divide-y divide-white/10">
                    {FILINGS.map((f, i) => (
                      <li key={f.k} style={{ animationDelay: `${i * 90}ms` }} className="slide-in flex items-center justify-between gap-3 px-3 py-1.5 text-[11px] text-ink-onspec">
                        <span className="min-w-0 truncate">{f.k} <span className="text-white/50">· due {f.due}</span></span>
                        <span className={`shrink-0 rounded px-1.5 py-px font-mono text-[9px] font-bold ${stateTone(f.state)}`}>{f.state}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════ ONEVIEW ═══════════════════════════ */

const REVENUE = [62, 68, 74, 81, 90];

export function OneViewDemo() {
  const [ref, active] = usePausable<HTMLDivElement>();
  const step = useTicker(7, 1700, active); // 0..6
  const show = (n: number) => step >= n;

  return (
    <div ref={ref} className="relative flex justify-center overflow-hidden rounded-panel border border-line bg-gradient-to-br from-ground-sub via-white to-brand-wash/60 px-4 py-8 shadow-floating sm:py-10">
      <div className="absolute right-4 top-3"><Illustrative /></div>
      {/* phone */}
      <div className="w-full max-w-[340px] overflow-hidden rounded-[30px] border-[6px] border-navy bg-navy shadow-floating">
        <div className="flex items-center gap-2.5 bg-navy px-4 pb-3 pt-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white"><LogoMark size={26} /></span>
          <div className="min-w-0">
            <p className="text-[13px] font-bold leading-tight text-white">VOVIX OneView</p>
            <p className="text-[10.5px] leading-tight text-white/60">{step === 1 || step === 4 ? "typing…" : "business account"}</p>
          </div>
        </div>
        <div className="flex h-[440px] flex-col justify-end gap-2 overflow-hidden bg-[#EEF3EF] px-3 pb-3 pt-4"
             style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(7,40,54,0.05) 1px, transparent 0)", backgroundSize: "16px 16px" }}>
          <Bubble me>Analyse ACME Industries</Bubble>
          {step === 1 && <Typing />}
          {show(2) && (
            <Bubble>
              <p className="text-[11px] font-bold uppercase tracking-wide text-brand-ink">Company tear-sheet</p>
              <p className="text-[13px] font-bold text-ink">ACME Industries Ltd</p>
              <p className="mb-2 font-mono text-[10px] text-ink-muted">NSE: ACME · Capital goods</p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-y border-line py-2 text-[11px]">
                {[["Mkt cap", "₹12,480 Cr"], ["P/E", "18.4×"], ["ROE", "16.2%"], ["Debt/Equity", "0.32"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2"><span className="text-ink-muted">{k}</span><span className="font-semibold text-ink tnum">{v}</span></div>
                ))}
              </div>
              <p className="mt-2 font-mono text-[9.5px] uppercase tracking-wider text-ink-muted">Revenue · 5 yrs</p>
              <div className="mt-1 flex h-[38px] items-end gap-1.5">
                {REVENUE.map((v, i) => (
                  <span key={i} className="flex-1 origin-bottom rounded-t-sm bg-brand-fill/80 transition-transform duration-700" style={{ height: `${v}%`, transform: show(3) ? "scaleY(1)" : "scaleY(0.05)", transitionDelay: `${i * 80}ms` }} />
                ))}
              </div>
            </Bubble>
          )}
          {show(3) && (
            <div className="fade-in flex flex-wrap gap-1.5 pl-1">
              {["Valuation", "Peers", "Technicals"].map((q) => (
                <span key={q} className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${q === "Valuation" && show(4) ? "border-brand-fill bg-brand-wash text-brand-ink" : "border-line-strong bg-white text-ink-secondary"}`}>{q}</span>
              ))}
            </div>
          )}
          {step === 4 && <Typing />}
          {show(5) && (
            <Bubble>
              <p className="text-[12px] text-ink"><strong>Valuation:</strong> P/E 18.4× vs 5-yr median 21.0×; P/B 2.6×. Earnings growth 11.8% CAGR.</p>
              <p className="mt-1.5 border-t border-line pt-1.5 text-[10px] leading-snug text-ink-muted">Informational only — not investment advice. Verify with exchange filings.</p>
            </Bubble>
          )}
        </div>
        <div className="flex items-center gap-2 bg-[#EEF3EF] px-3 pb-3">
          <span className="flex-1 rounded-full bg-white px-3 py-2 text-[12px] text-ink-muted">Ask about any listed company…</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-fill text-navy"><Send size={15} aria-hidden /></span>
        </div>
      </div>
    </div>
  );
}

function Bubble({ children, me = false }: { children: React.ReactNode; me?: boolean }) {
  return (
    <div className={`fade-in max-w-[86%] rounded-[12px] px-3 py-2 text-[12.5px] shadow-raised ${me ? "self-end rounded-tr-sm bg-[#D7F5E2] text-ink" : "self-start rounded-tl-sm bg-white"}`}>
      {children}
      {me && <span className="ml-2 inline-flex translate-y-px text-cyan-ink"><CheckCheck size={12} aria-hidden /></span>}
    </div>
  );
}

function Typing() {
  return (
    <div className="fade-in flex w-14 items-center justify-center gap-1 self-start rounded-[12px] rounded-tl-sm bg-white px-3 py-2.5 shadow-raised" aria-label="typing">
      {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink-muted" style={{ animation: `typing 1s ${i * 0.15}s infinite` }} />)}
    </div>
  );
}

/* ════════════════════════════ EDGE ════════════════════════════ */

const CATALYSTS = [
  { t: "13:30", e: "US CPI (m/m) — released", pair: "EUR/USD" },
  { t: "13:30", e: "Price reaction vs. consensus", pair: "EUR/USD" },
  { t: "13:31", e: "Context check: spread, volatility, trend", pair: "EUR/USD" },
];

export function EdgeDemo() {
  const [ref, active] = usePausable<HTMLDivElement>();
  const step = useTicker(5, 1800, active); // 0 detect, 1 evaluate, 2 context, 3 qualified, 4 hold
  const qualified = step >= 3;

  return (
    <div ref={ref} className="on-dark overflow-hidden rounded-panel border border-white/10 bg-navy text-white shadow-floating">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
          <Activity size={13} className="text-brand-onspec" aria-hidden /> VOVIX Edge · operations
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-fill animate-pulse-dot" aria-hidden /> MT5 bridge
          </span>
          <Illustrative dark />
        </span>
      </div>

      <div className="grid md:grid-cols-[1.15fr_1fr]">
        {/* catalyst pipeline */}
        <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Catalyst evaluation</p>
          <ol className="space-y-2">
            {CATALYSTS.map((c, i) => {
              const state = step > i ? "done" : step === i ? "run" : "wait";
              return (
                <li key={c.e} className={`flex items-center gap-3 rounded-control border px-3 py-2 transition-colors ${state === "run" ? "border-cyan-fill/40 bg-cyan-fill/[0.06]" : "border-white/10 bg-white/[0.02]"}`}>
                  <span className="w-10 shrink-0 font-mono text-[10.5px] text-white/50 tnum">{c.t}</span>
                  <span className="min-w-0 flex-1 truncate text-[12px] text-white/85">{c.e}</span>
                  {state === "done" ? <Check size={14} className="shrink-0 text-brand-onspec" aria-label="done" />
                    : state === "run" ? <Radio size={14} className="shrink-0 animate-pulse text-cyan-fill" aria-label="running" />
                    : <Clock size={13} className="shrink-0 text-white/30" aria-label="waiting" />}
                </li>
              );
            })}
          </ol>

          <div className={`mt-3 rounded-control border px-3 py-3 transition-all duration-500 ${qualified ? "border-brand-fill/50 bg-brand-fill/[0.08]" : "border-white/10 bg-white/[0.02] opacity-50"}`}>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand-onspec">{qualified ? "Qualified · EUR/USD long" : "Awaiting qualification"}</span>
              <span className="font-mono text-[10px] text-white/50">expires 60m</span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {[["Entry", "1.0842"], ["Stop", "1.0818"], ["Target", "1.0890"], ["R:R", "1 : 2"]].map(([k, v]) => (
                <div key={k}>
                  <p className="font-mono text-[9.5px] uppercase tracking-wider text-white/45">{k}</p>
                  <p className="font-mono text-[12px] font-semibold text-white tnum">{qualified ? v : "—"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-control border border-white/10 bg-white/[0.02] px-3 py-2.5">
            <Ban size={13} className="mt-0.5 shrink-0 text-white/50" aria-hidden />
            <p className="text-[11.5px] leading-snug text-white/60"><strong className="font-semibold text-white/80">USD/JPY — stood down.</strong> Catalyst not confirmed by price; no signal issued.</p>
          </div>
        </div>

        {/* risk + health */}
        <div className="p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Risk controls</p>
          <dl className="space-y-1.5">
            {[["Execution mode", "Advisory"], ["Risk per trade", "0.5% of equity"], ["Pre-event blackout", "± 15 min"], ["Exit management", "Automated"], ["Instruments", "7 majors + XAU"]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 border-b border-white/[0.07] pb-1.5">
                <dt className="text-[11.5px] text-white/60">{k}</dt>
                <dd className="font-mono text-[11.5px] font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex items-center justify-between rounded-control border border-white/15 bg-white/[0.03] px-3 py-2">
            <span className="flex items-center gap-2 text-[12px] font-semibold text-white"><Pause size={13} aria-hidden /> Kill switch</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">pause all automation</span>
          </div>

          <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">System health</p>
          <div className="grid grid-cols-3 gap-2">
            {[["Feed", "OK"], ["Alerts", "Telegram"], ["Journal", "logged"]].map(([k, v]) => (
              <div key={k} className="rounded-control border border-white/10 bg-white/[0.03] px-2 py-2">
                <p className="font-mono text-[9.5px] uppercase tracking-wider text-white/45">{k}</p>
                <p className="mt-0.5 flex items-center gap-1 font-mono text-[11px] font-semibold text-white"><ShieldCheck size={11} className="text-brand-onspec" aria-hidden />{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
