"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ScanLine, MessageSquare, Activity, Check, ArrowRight } from "lucide-react";
import { Button, Chip } from "./ui";
import { LensDemo, OneViewDemo, EdgeDemo } from "./product-demos";
import { SHOWCASE } from "./product-data";

const ICONS = { lens: ScanLine, oneview: MessageSquare, edge: Activity } as const;
const DEMOS = { lens: LensDemo, oneview: OneViewDemo, edge: EdgeDemo } as const;

export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = SHOWCASE[active];
  const Demo = DEMOS[p.id];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = SHOWCASE.length;
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="VOVIX products" onKeyDown={onKey}
           className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0">
        {SHOWCASE.map((t, i) => {
          const on = i === active;
          return (
            <button key={t.id} ref={(el) => { tabs.current[i] = el; }}
              role="tab" id={`tab-${t.id}`} aria-selected={on} aria-controls={`panel-${t.id}`} tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group relative flex min-w-[220px] items-center gap-3 overflow-hidden rounded-card border px-4 py-3.5 text-left transition-all duration-300 sm:min-w-0 ${
                on ? "border-navy bg-navy text-white shadow-lifted" : "border-line bg-white text-ink hover:border-line-strong hover:shadow-raised"}`}>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-control transition-colors ${on ? "bg-brand-fill text-navy" : "bg-brand-wash text-brand-ink"}`}>
                {(() => { const I = ICONS[t.id]; return <I size={19} aria-hidden />; })()}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-bold leading-tight">{t.name}</span>
                <span className={`block font-mono text-[10.5px] uppercase tracking-[0.1em] ${on ? "text-ink-onspec" : "text-ink-muted"}`}>{t.tag}</span>
              </span>
              <span aria-hidden className={`absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-brand-fill to-cyan-fill transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`} />
            </button>
          );
        })}
      </div>

      <div key={p.id} role="tabpanel" id={`panel-${p.id}`} aria-labelledby={`tab-${p.id}`} tabIndex={0}
           className="rise mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 [&>*]:min-w-0">
        <div className="lg:pt-4">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Chip live={p.live}>{p.status}</Chip>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{p.name}</span>
          </div>
          <h3 className="text-balance text-[clamp(26px,3.2vw,34px)] font-semibold leading-[1.12] tracking-[-0.025em] text-ink">{p.title}</h3>
          <p className="mt-4 text-pretty text-lead text-ink-secondary">{p.body}</p>

          <div className="mt-6 flex flex-wrap items-center gap-1.5" aria-label="Workflow">
            {p.flow.map((f, i) => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="rounded-chip border border-line bg-ground-sub px-2 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-ink-secondary">{f}</span>
                {i < p.flow.length - 1 && <ArrowRight size={12} className="text-brand-fill" aria-hidden />}
              </span>
            ))}
          </div>

          <ul className="mt-6 space-y-2.5">
            {p.points.map((b) => (
              <li key={b} className="flex gap-2.5 text-small text-ink-secondary">
                <Check size={16} className="mt-[3px] shrink-0 text-brand-ink" aria-hidden />{b}
              </li>
            ))}
          </ul>
          {"note" in p && p.note && <p className="mt-5 border-l-2 border-state-warn/60 pl-3 text-[12.5px] leading-relaxed text-ink-muted">{p.note}</p>}
          <Button href={p.cta.href} size="lg" className="mt-7">{p.cta.l} <ArrowRight size={17} aria-hidden /></Button>
        </div>
        <Demo />
      </div>
    </div>
  );
}
