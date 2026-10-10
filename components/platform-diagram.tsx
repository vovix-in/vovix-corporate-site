import { FileText, MessageCircle, LineChart, Database, ScanLine, MessageSquare, Activity, Workflow } from "lucide-react";

/* Platform diagram (Figma: "Platform diagram").
   Inputs → one engine (5 stages) → what runs on it. The dashed
   connectors carry a moving dash so the flow reads left-to-right;
   CSS only, and still under prefers-reduced-motion.                  */

const INPUTS = [
  { i: FileText, h: "Documents", s: "Invoices · statements · KYC" },
  { i: MessageCircle, h: "Messages", s: "WhatsApp · email" },
  { i: LineChart, h: "Market data", s: "Prices · economic events" },
  { i: Database, h: "Systems", s: "APIs · databases · files" },
];
const STAGES = [
  ["01", "Ingest", "Inbox, upload, API, schedule"],
  ["02", "Understand", "OCR, AI extraction, classification"],
  ["03", "Validate", "Business rules, confidence, human review"],
  ["04", "Deliver", "Tally, ERP, WhatsApp, MT5, webhooks"],
  ["05", "Monitor", "Logs, retries, alerts, audit trail"],
];
const OUTPUTS = [
  { i: ScanLine, h: "VOVIX Lens", s: "Documents → TallyPrime", href: "https://lens.vovix.in/" },
  { i: MessageSquare, h: "VOVIX OneView", s: "Research on WhatsApp", href: "/products#oneview" },
  { i: Activity, h: "VOVIX Edge", s: "Risk-controlled forex on MT5", href: "https://edge.vovix.in/" },
  { i: Workflow, h: "Your workflow", s: "Custom & white-label builds", href: "/services" },
];

function Connector() {
  return (
    <div aria-hidden className="flex items-center justify-center py-2 lg:py-0">
      <svg viewBox="0 0 48 16" className="h-4 w-12 rotate-90 lg:rotate-0">
        <path d="M0 8h42" stroke="var(--vx-green)" strokeWidth="1.8" strokeDasharray="4 4" className="animate-flow" />
        <path d="M37 3l6 5-6 5" fill="none" stroke="var(--vx-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const box = "flex items-center gap-3 rounded-card border border-white/10 bg-white/[0.04] px-4 py-3";

export function PlatformDiagram() {
  return (
    <div className="grid items-center gap-2 lg:grid-cols-[1fr_auto_1.45fr_auto_1fr] lg:gap-5">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-onspec">Inputs</p>
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {INPUTS.map((x) => (
            <li key={x.h} className={box}>
              <x.i size={17} className="shrink-0 text-brand-fill" aria-hidden />
              <span className="min-w-0">
                <span className="block text-small font-semibold text-white">{x.h}</span>
                <span className="block truncate font-mono text-[10.5px] text-ink-onspec">{x.s}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Connector />
      <div className="rounded-panel border-[1.5px] border-brand-fill bg-navy-raised p-5 shadow-[0_0_0_6px_rgba(9,165,76,0.08)] sm:p-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[17px] font-semibold text-white">VOVIX automation engine</p>
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-brand-fill">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-fill animate-pulse-dot" aria-hidden />Monitored
          </span>
        </div>
        <ol>
          {STAGES.map(([n, h, s]) => (
            <li key={n} className="grid grid-cols-[28px_96px_1fr] items-baseline gap-3 border-t border-white/10 py-3 sm:grid-cols-[28px_110px_1fr]">
              <span className="font-mono text-[12px] font-bold text-brand-fill">{n}</span>
              <span className="text-small font-semibold text-white">{h}</span>
              <span className="text-[13px] text-ink-onspec">{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <Connector />
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-onspec">Runs in production as</p>
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {OUTPUTS.map((x) => (
            <li key={x.h}>
              <a href={x.href} {...(/^https?:/.test(x.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                 className={`${box} transition-colors hover:border-brand-fill/60 hover:bg-white/[0.07]`}>
                <x.i size={17} className="shrink-0 text-brand-fill" aria-hidden />
                <span className="min-w-0">
                  <span className="block text-small font-semibold text-white">{x.h}</span>
                  <span className="block truncate font-mono text-[10.5px] text-ink-onspec">{x.s}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
