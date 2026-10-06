import { FileText, Scale, Radar, Headphones, GitPullRequest, Bell } from "lucide-react";

/* ── Agent orchestration showcase ──────────────────────────────
   Four agents working concurrently on one vendor-onboarding run.
   Every lane animates at a different cadence so the picture reads
   as parallel work rather than a single queue. Pure CSS + SVG:
   no JS, so it paints on first frame and survives a dead bundle. */

const LANES = [
  { name: "Intake",   task: "watching shared inbox",        dur: "3.2s", delay: "0s",    state: "run" },
  { name: "Extract",  task: "14 invoices → structured rows", dur: "2.4s", delay: "0.5s", state: "run" },
  { name: "Verify",   task: "GSTIN + totals reconciled",     dur: "2.9s", delay: "1.1s", state: "run" },
  { name: "Post",     task: "vouchers → TallyPrime",         dur: "3.6s", delay: "1.7s", state: "run" },
];

const LOG = [
  ["00:02", "intake", "14 documents claimed from inbox"],
  ["00:04", "extract", "line items + tax breakup parsed"],
  ["00:06", "verify", "1 field below threshold → human queue"],
  ["00:09", "post", "13 vouchers written, 1 held"],
  ["00:09", "notify", "summary sent to ops channel"],
];

export function AgentOrchestra() {
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-ground-paper shadow-lifted">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-ground-sub px-5 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">Agent run</p>
          <p className="text-small font-bold text-ink">Vendor onboarding · 4 agents in parallel</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-fill/40 bg-brand-wash px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-fill animate-pulse-dot" /> Running
        </span>
      </div>

      {/* lanes */}
      <div className="space-y-px bg-line/60">
        {LANES.map((l, i) => (
          <div key={l.name} className="grid grid-cols-[132px_1fr_auto] items-center gap-3 bg-ground-paper px-5 py-3 sm:grid-cols-[158px_1fr_auto]">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="relative flex h-2 w-2 shrink-0 items-center justify-center"
                aria-hidden
              >
                <span
                  className="absolute inline-flex h-full w-full rounded-full bg-brand-fill opacity-60 animate-[ping_2.4s_cubic-bezier(0,0,.2,1)_infinite]"
                  style={{ animationDelay: l.delay }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-fill" />
              </span>
              <span className="truncate font-mono text-[11px] font-bold uppercase tracking-wider text-ink">{l.name}</span>
            </div>

            {/* the track */}
            <div className="relative h-[22px] min-w-0 overflow-hidden rounded-full bg-ground-sunken">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-gradient-to-r from-brand-fill/15 via-brand-fill/25 to-cyan-fill/20 animate-[laneFill_var(--d)_cubic-bezier(.4,0,.2,1)_infinite]"
                style={{ ["--d" as string]: l.dur, animationDelay: l.delay }}
              />
              <span
                aria-hidden
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-brand-fill shadow-[0_0_10px_rgba(0,200,83,.7)] animate-[laneDot_var(--d)_cubic-bezier(.4,0,.2,1)_infinite]"
                style={{ ["--d" as string]: l.dur, animationDelay: l.delay }}
              />
              <span className="absolute inset-0 flex items-center px-3">
                <span className="truncate text-[11.5px] text-ink-secondary">{l.task}</span>
              </span>
            </div>

            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-ink-muted tnum">
              {String(i + 1).padStart(2, "0")}/04
            </span>
          </div>
        ))}
      </div>

      {/* run log */}
      <div className="border-t border-line bg-ground-spec px-5 py-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">Run log</p>
        <div className="space-y-1">
          {LOG.map(([t, who, msg], i) => (
            <div
              key={t + who}
              style={{ animationDelay: `${0.35 * i}s` }}
              className="flex animate-[fieldIn_.4s_cubic-bezier(.16,1,.3,1)_both] items-baseline gap-3 font-mono text-[11px]"
            >
              <span className="shrink-0 text-white/55 tnum">{t}</span>
              <span className="w-[52px] shrink-0 text-brand-onspec">{who}</span>
              <span className="truncate text-white/60">{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── What we can build ────────────────────────────────────────── */
export const AGENT_TYPES = [
  { icon: FileText, name: "Document agents", body: "Read invoices, statements and contracts; extract, validate and post them into Tally or your ERP without manual keying.", chip: "Lens engine" },
  { icon: Scale, name: "Reconciliation agents", body: "Match ledgers, bank feeds and vendor statements overnight. They surface only the exceptions that need a person.", chip: "Scheduled" },
  { icon: Radar, name: "Monitoring agents", body: "Watch portals, filings and price feeds. They tell you when something changed and what changed — not that a job ran.", chip: "Event-driven" },
  { icon: Headphones, name: "Support agents", body: "Answer on WhatsApp, email or web with context from your own systems, and hand off to a human with the thread intact.", chip: "OneView pattern" },
  { icon: GitPullRequest, name: "Integration agents", body: "Keep CRM, billing and spreadsheets agreeing with each other. Idempotent jobs, retries, and a trail of every write.", chip: "API-native" },
  { icon: Bell, name: "Escalation agents", body: "Decide what is routine and what needs a human now. The hard part is the threshold, and that is what we tune with you.", chip: "Human-in-loop" },
];
