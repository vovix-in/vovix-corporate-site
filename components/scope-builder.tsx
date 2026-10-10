"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "./ui";

/* Output is a timeline range and a phase breakdown — never a price.
   A number you have to walk back in the first call costs more than
   it wins. Weeks are defensible; a rupee figure invites a fight
   before anything has been scoped. */

const PLATFORMS = [
  { id: "site",  label: "Corporate / marketing site", weeks: [4, 6],  blurb: "Next.js, CMS-backed, sub-second loads" },
  { id: "saas",  label: "SaaS app or dashboard",      weeks: [8, 14], blurb: "Auth, multi-tenant data, real-time views" },
  { id: "auto",  label: "Automation pipeline",        weeks: [5, 9],  blurb: "Ingestion, validation, retries, alerting" },
];

const INTEGRATIONS = [
  { id: "pay",  label: "Payments",         weeks: 1.5, note: "Razorpay / Stripe, webhook reconciliation" },
  { id: "erp",  label: "ERP / Tally",      weeks: 2.5, note: "Voucher posting, GSTIN validation" },
  { id: "ai",   label: "Custom AI",        weeks: 3,   note: "Extraction or agents, with human review" },
  { id: "rt",   label: "Real-time APIs",   weeks: 2,   note: "Streaming data, websockets, live charts" },
  { id: "wa",   label: "WhatsApp delivery", weeks: 1.5, note: "Templates, opt-in, conversational flows" },
  { id: "sso",  label: "SSO / RBAC",       weeks: 2,   note: "Roles, audit trail, enterprise login" },
];

export function ScopeBuilder() {
  const reduce = useReducedMotion();
  const [platform, setPlatform] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const estimate = useMemo(() => {
    if (!platform) return null;
    const base = PLATFORMS.find((p) => p.id === platform)!;
    const add = picked.reduce((s, id) => s + (INTEGRATIONS.find((i) => i.id === id)?.weeks ?? 0), 0);
    return { lo: Math.round(base.weeks[0] + add), hi: Math.round(base.weeks[1] + add * 1.35) };
  }, [platform, picked]);

  return (
    <div className="overflow-hidden rounded-panel border border-line bg-ground-paper shadow-raised">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        {/* steps */}
        <div className="border-b border-line p-7 lg:border-b-0 lg:border-r lg:p-9">
          <div className="mb-7">
            <p className="eyebrow mb-2">Step 1 — what are we building</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {PLATFORMS.map((p) => {
                const on = platform === p.id;
                return (
                  <button key={p.id} onClick={() => setPlatform(p.id)} aria-pressed={on}
                    className={`rounded-control border px-3.5 py-3 text-left transition-all ${
                      on ? "border-[1.5px] border-brand-fill bg-brand-wash" : "border-line hover:border-line-strong hover:bg-ground-sub"
                    }`}>
                    <span className={`block text-[13px] font-bold leading-snug ${on ? "text-ink" : "text-ink-secondary"}`}>{p.label}</span>
                    <span className="mt-1 block text-[11.5px] leading-snug text-ink-muted">{p.blurb}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-2">Step 2 — what it has to talk to</p>
            <div className="flex flex-wrap gap-2">
              {INTEGRATIONS.map((i) => {
                const on = picked.includes(i.id);
                return (
                  <button key={i.id} onClick={() => toggle(i.id)} aria-pressed={on} title={i.note}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-all ${
                      on ? "border-[1.5px] border-brand-fill bg-brand-wash text-ink" : "border-line-strong text-ink-secondary hover:border-ink-muted hover:text-ink"
                    }`}>
                    {on && <Check size={12} className="text-brand-ink" />}
                    {i.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[12px] text-ink-muted">Pick as many as apply. Each one adds integration and testing time, not just code.</p>
          </div>
        </div>

        {/* output */}
        <div className="bg-ground-sub p-7 lg:p-9">
          <p className="eyebrow mb-4">Step 3 — indicative timeline</p>
          <AnimatePresence mode="wait">
            {!estimate ? (
              <motion.div key="empty" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                  Choose a platform to see a range. It updates as you add integrations.
                </p>
              </motion.div>
            ) : (
              <motion.div key="res" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[44px] font-bold leading-none text-ink tnum">{estimate.lo}–{estimate.hi}</span>
                  <span className="text-lead text-ink-secondary">weeks</span>
                </div>
                <p className="mt-3 text-small leading-relaxed text-ink-secondary">
                  Design, build, QA and handover. Assumes one decision-maker on your side and content ready when we need it — the two things that actually move dates.
                </p>
                <div className="mt-5 space-y-1.5 border-t border-line pt-4">
                  {[["Discovery & written scope", "week 1"], ["Design system & key screens", "weeks 2–3"], ["Build & integrations", "the bulk"], ["QA, docs, handover", "final week"]].map(([a, b]) => (
                    <div key={a} className="flex items-baseline justify-between gap-3">
                      <span className="text-[12.5px] text-ink-secondary">{a}</span>
                      <span className="font-mono text-[11px] text-ink-muted">{b}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[12px] leading-relaxed text-ink-muted">
                  Indicative only. We confirm against your actual requirements in writing before anything is committed.
                </p>
                <Button href="/contact" className="mt-5 w-full">
                  Get this scoped properly <ArrowRight size={16} />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
