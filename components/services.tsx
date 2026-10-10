"use client";

import { useEffect, useState } from "react";
import { Workflow, ScanText, Database, Plug, Radar, LayoutDashboard, Layers, ChevronDown } from "lucide-react";

export const SERVICES = [
  {
    id: "workflow", icon: Workflow, name: "Business Workflow Automation",
    short: "Approvals, reconciliation, document handling and scheduled jobs that run themselves.",
    problem: "Skilled people spend their week copying data between systems, chasing approvals and re-running the same reconciliations by hand.",
    approach: "We map the real process first, then automate it as event- and schedule-driven jobs with retries, idempotent writes and explicit approval steps where a person must decide.",
    outcome: "Repetitive operations run on time, every time — and the team only sees the exceptions that genuinely need judgment.",
    stack: ["Event triggers", "Scheduled jobs", "Approval routing", "Audit trail"],
  },
  {
    id: "ai-docs", icon: ScanText, name: "AI Engineering & Document Intelligence",
    short: "Extraction, classification and validation, with human review where it matters.",
    problem: "Invoices, statements, forms and contracts arrive in every format and language, and someone has to key them in and check them.",
    approach: "OCR and AI extraction combined with deterministic business rules, confidence thresholds and a review queue — the same architecture that runs VOVIX Lens.",
    outcome: "Structured, validated data with every value traceable to its source, and low-confidence fields routed to a person before they post.",
    stack: ["OCR · 40+ languages", "Field extraction", "Rule validation", "Review queue"],
  },
  {
    id: "data", icon: Database, name: "Data Engineering & Pipelines",
    short: "Ingestion, transformation, validation and delivery you can depend on.",
    problem: "Data lands in spreadsheets, exports and APIs that disagree with each other, and reports are only as good as last week's manual clean-up.",
    approach: "Pipelines with schema checks, deduplication, reconciliation steps and lineage, orchestrated and monitored so failures surface instead of silently skipping.",
    outcome: "One trustworthy dataset delivered to the warehouse, dashboard or downstream system on a predictable schedule.",
    stack: ["Ingestion", "Transformation", "Reconciliation", "Orchestration"],
  },
  {
    id: "api", icon: Plug, name: "API Development & System Integration",
    short: "CRMs, payment gateways, accounting platforms and databases, connected.",
    problem: "The CRM, billing, accounting and internal tools each hold part of the truth, and nobody trusts which one is current.",
    approach: "Well-defined APIs, webhooks and scheduled syncs with authentication, rate-limit handling, retries and a log of every write.",
    outcome: "Systems that agree with each other, with a clear record of what changed, when, and why.",
    stack: ["REST APIs", "Webhooks", "Payment gateways", "TallyPrime / ERP"],
  },
  {
    id: "ingest", icon: Radar, name: "Web Data Ingestion & Monitoring",
    short: "Scoped, rate-limited collection with retries, alerts and observability.",
    problem: "Teams manually check portals, filings and public sources for changes, and miss the one that mattered.",
    approach: "Appropriately scoped, rate-limited ingestion jobs that respect source terms, with retry handling, change detection, exception alerts and run monitoring.",
    outcome: "You hear when something changed and what changed — not merely that a job ran.",
    stack: ["Change detection", "Rate limiting", "Alerting", "Run monitoring"],
  },
  {
    id: "tools", icon: LayoutDashboard, name: "Custom Software & Internal Tools",
    short: "Dashboards, operational interfaces and purpose-built applications.",
    problem: "Off-the-shelf tools almost fit, so the gaps are filled with spreadsheets, scripts and workarounds only one person understands.",
    approach: "Purpose-built web applications and dashboards designed around your workflow, with roles, audit trails and documentation your team can maintain.",
    outcome: "Software that matches how the business actually operates, owned and understood by your team.",
    stack: ["Next.js · React", "Python · FastAPI", "PostgreSQL", "Role-based access"],
  },
  {
    id: "white-label", icon: Layers, name: "White-Label Automation Infrastructure",
    short: "Headless backends and integrations for agencies and technology partners.",
    problem: "Agencies win automation work they can't staff, and need an engineering partner who stays invisible to their client.",
    approach: "Headless backends, pipelines and integrations delivered unbranded under mutual NDA, with IP assigned to you as it's written.",
    outcome: "You keep the client, the brand and the margin; we ship the engineering behind you.",
    stack: ["Under NDA", "Unbranded delivery", "IP assigned at creation", "Runbooks"],
  },
] as const;

function Detail({ s }: { s: (typeof SERVICES)[number] }) {
  return (
    <div className="rise">
      <ol className="relative space-y-6 border-l border-line pl-6">
        {[
          ["The problem", s.problem, "bg-ground-sunken"],
          ["Our engineering approach", s.approach, "bg-cyan-fill"],
          ["The outcome", s.outcome, "bg-brand-fill"],
        ].map(([h, p, dot]) => (
          <li key={h} className="relative">
            <span className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white ${dot}`} aria-hidden />
            <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{h}</p>
            <p className="mt-1.5 text-pretty text-body text-ink-secondary">{p}</p>
          </li>
        ))}
      </ol>
      <div className="mt-7 flex flex-wrap gap-1.5">
        {s.stack.map((t) => (
          <span key={t} className="rounded-chip border border-line bg-ground-sub px-2 py-1 font-mono text-[10.5px] font-semibold text-ink-secondary">{t}</span>
        ))}
      </div>
    </div>
  );
}

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];

  // Deep links like /services#data open that service.
  useEffect(() => {
    const sync = () => {
      const i = SERVICES.findIndex((x) => `#${x.id}` === window.location.hash);
      if (i >= 0) setActive(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
      <ul className="divide-y divide-line overflow-hidden rounded-panel border border-line bg-white">
        {SERVICES.map((x, i) => {
          const on = i === active;
          return (
            <li key={x.id} id={x.id}>
              <button onClick={() => setActive(i)} aria-expanded={on} aria-controls={`svc-${x.id}`}
                className={`group flex w-full items-start gap-4 px-5 py-4 text-left transition-colors sm:px-6 ${on ? "bg-ground-sub" : "hover:bg-ground-sub/60"}`}>
                <span className="mt-0.5 w-6 shrink-0 font-mono text-[11px] font-bold text-ink-muted tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-control transition-colors ${on ? "bg-navy text-brand-fill" : "bg-brand-wash text-brand-ink"}`}>
                  <x.icon size={19} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] font-bold leading-snug tracking-[-0.01em] text-ink">{x.name}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-muted">{x.short}</span>
                </span>
                <ChevronDown size={18} aria-hidden className={`mt-2 shrink-0 text-ink-muted transition-transform lg:-rotate-90 ${on ? "rotate-180 text-brand-ink lg:rotate-0" : ""}`} />
              </button>
              {on && (
                <div id={`svc-${x.id}`} className="border-t border-line bg-white px-5 py-6 sm:px-6 lg:hidden">
                  <Detail s={x} />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="relative hidden lg:block">
        <div className="sticky top-28 overflow-hidden rounded-panel border border-line bg-white p-9 shadow-lifted" aria-live="polite">
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-control bg-navy text-brand-fill"><s.icon size={22} aria-hidden /></span>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand-ink">Service {String(active + 1).padStart(2, "0")} / 07</p>
              <h3 className="text-h3 text-ink">{s.name}</h3>
            </div>
          </div>
          <Detail key={s.id} s={s} />
        </div>
      </div>
    </div>
  );
}
