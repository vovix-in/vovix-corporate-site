"use client";

import { useState } from "react";
import { Inbox, FileCog, ShieldCheck, GitMerge, UserCheck, Send, Activity, Check, AlertTriangle } from "lucide-react";
import { usePausable, useTicker } from "./ui";

const NODES = [
  { k: "ingest", icon: Inbox, h: "Ingest" },
  { k: "parse", icon: FileCog, h: "Parse & normalise" },
  { k: "validate", icon: ShieldCheck, h: "AI + rules" },
  { k: "reconcile", icon: GitMerge, h: "Reconcile" },
  { k: "deliver", icon: Send, h: "Deliver" },
] as const;

const SCENARIOS = [
  {
    id: "invoice", label: "Invoice → accounting",
    d: { ingest: "Shared inbox · 14 PDFs", parse: "OCR → line items, tax", validate: "GSTIN, HSN, tax math, ITC", reconcile: "Match vendor ledger & PO", deliver: "TallyPrime vouchers", exception: "1 low-confidence field held for review", monitor: "09:00 run · 13 posted · 1 held · 0 failures" },
  },
  {
    id: "sync", label: "API → database sync",
    d: { ingest: "Webhooks + nightly pull", parse: "Map to target schema", validate: "Type, range & key checks", reconcile: "Upsert, dedupe by key", deliver: "PostgreSQL · warehouse", exception: "3 records rejected on schema, queued", monitor: "Sync lag 42s · retries 1 · alert on error" },
  },
  {
    id: "recon", label: "CRM + payment reconciliation",
    d: { ingest: "CRM deals + gateway settlements", parse: "Normalise IDs & currency", validate: "Amount & status rules", reconcile: "Payment ↔ invoice ↔ deal", deliver: "Books + CRM status", exception: "2 unmatched settlements to finance", monitor: "Daily digest · variance tracked" },
  },
  {
    id: "ingestion", label: "Scheduled data ingestion",
    d: { ingest: "Public filings · rate-limited", parse: "Tables extracted from PDFs", validate: "Completeness & change rules", reconcile: "Diff vs. last snapshot", deliver: "Dataset + change alert", exception: "Source layout changed — job paused", monitor: "Hourly · backoff on 429 · on-call alert" },
  },
];

export function PipelineDiagram() {
  const [sc, setSc] = useState(0);
  const [ref, active] = usePausable<HTMLDivElement>();
  const step = useTicker(7, 1300, active, sc); // 0-4 nodes, 5 exception, 6 monitor
  const S = SCENARIOS[sc];

  const nodeState = (i: number) => (step > i || step >= 5 ? "done" : step === i ? "run" : "wait");

  return (
    <div ref={ref}>
      <div role="radiogroup" aria-label="Example workflow" className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {SCENARIOS.map((s, i) => (
          <button key={s.id} role="radio" aria-checked={i === sc} onClick={() => setSc(i)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${
              i === sc ? "border-navy bg-navy text-white" : "border-line-strong bg-white text-ink-secondary hover:border-ink-muted hover:text-ink"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-panel border border-line bg-white shadow-lifted">
        {/* main lane */}
        <ol className="grid gap-0 p-5 sm:p-7 lg:grid-cols-5 lg:gap-0">
          {NODES.map((n, i) => {
            const st = nodeState(i);
            return (
              <li key={n.k} className="relative flex gap-4 pb-6 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center">
                {/* connector: vertical on mobile, horizontal on desktop */}
                {i < NODES.length - 1 && (
                  <span aria-hidden className={`absolute left-[23px] top-12 h-[calc(100%-48px)] w-[2px] lg:left-[calc(50%+30px)] lg:top-[23px] lg:h-[2px] lg:w-[calc(100%-60px)] ${
                    st === "done" ? "bg-[length:14px_14px] bg-[linear-gradient(90deg,var(--vx-green)_50%,transparent_50%)] lg:animate-[connFlow_.7s_linear_infinite] max-lg:bg-[linear-gradient(180deg,var(--vx-green)_50%,transparent_50%)]" : "bg-line"}`} />
                )}
                <span className={`relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  st === "run" ? "border-brand-fill bg-navy text-brand-fill shadow-glow" : st === "done" ? "border-brand-fill bg-brand-wash text-brand-ink" : "border-line-strong bg-white text-ink-muted"}`}>
                  {st === "run" && <span aria-hidden className="absolute inset-0 animate-ping rounded-full border-2 border-brand-fill/50" />}
                  <n.icon size={19} aria-hidden />
                </span>
                <div className="min-w-0 lg:mt-3 lg:px-2">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">Step {i < 4 ? i + 1 : 6}</p>
                  <p className="text-[15px] font-bold text-ink">{n.h}</p>
                  <p key={S.id + n.k} className="fade-in mt-0.5 text-[13px] leading-snug text-ink-secondary">{S.d[n.k]}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* exception lane + monitor */}
        <div className="grid border-t border-line md:grid-cols-2">
          <div className={`flex items-start gap-3 border-b border-line p-5 transition-colors duration-500 sm:px-7 md:border-b-0 md:border-r ${step >= 5 ? "bg-state-warnwash" : "bg-ground-sub/60"}`}>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${step >= 5 ? "border-state-warn bg-white text-state-warn" : "border-line-strong bg-white text-ink-muted"}`}>
              <UserCheck size={17} aria-hidden />
            </span>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted">Step 5 · Route exceptions</p>
              <p key={S.id} className="fade-in mt-0.5 flex items-start gap-1.5 text-[13.5px] font-semibold leading-snug text-ink">
                <AlertTriangle size={14} className="mt-0.5 shrink-0 text-state-warn" aria-hidden />{S.d.exception}
              </p>
              <p className="mt-1 text-[12.5px] text-ink-muted">A person decides; the decision is logged and the run resumes.</p>
            </div>
          </div>
          <div className={`flex items-start gap-3 p-5 transition-colors duration-500 sm:px-7 ${step >= 6 ? "bg-navy" : "bg-ground-sub/60"}`}>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${step >= 6 ? "border-brand-fill bg-navy-raised text-brand-fill" : "border-line-strong bg-white text-ink-muted"}`}>
              <Activity size={17} aria-hidden />
            </span>
            <div>
              <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${step >= 6 ? "text-white/60" : "text-ink-muted"}`}>Step 7 · Monitor & alert</p>
              <p key={S.id} className={`fade-in mt-0.5 flex items-start gap-1.5 text-[13.5px] font-semibold leading-snug ${step >= 6 ? "text-white" : "text-ink"}`}>
                <Check size={14} className={`mt-0.5 shrink-0 ${step >= 6 ? "text-brand-onspec" : "text-brand-ink"}`} aria-hidden />{S.d.monitor}
              </p>
              <p className={`mt-1 text-[12.5px] ${step >= 6 ? "text-white/60" : "text-ink-muted"}`}>Failures page a human. Silence means healthy, not skipped.</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes connFlow { to { background-position: 14px 0; } }`}</style>
    </div>
  );
}
