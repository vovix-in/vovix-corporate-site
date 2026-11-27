"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Check, ShieldCheck, FileText, Banknote, FileCheck2, Clock, Fingerprint, Calculator, UserCheck } from "lucide-react";
import { Illustrative } from "./ui";
import { track } from "@/lib/analytics";

/* /payroll — the five-stage pillar block.
   Pattern borrowed from Rocketlane's product pages: a sticky stage list on
   the left, and for each stage a product picture, a claim, and three
   specifics. The pictures are small static UI mocks (illustrative data,
   labelled), not screenshots. Scroll position drives the active stage.   */

type Stage = {
  id: string; n: string; name: string; icon: typeof Clock;
  claim: string; lead: string;
  points: { h: string; p: string }[];
};

export const STAGES: Stage[] = [
  {
    id: "attendance", n: "01", name: "Attendance", icon: Fingerprint,
    claim: "Punches in. Exceptions out. Nothing silently assumed.",
    lead: "Biometric punches are reconciled to General, A, B and C shifts. Anything that doesn't fit is queued for a named person with a deadline, so the month never starts on guesses.",
    points: [
      { h: "Shift reconciliation", p: "Every punch is matched to a shift pattern; late, early and missing punches are flagged, not averaged away." },
      { h: "Overtime at 2x", p: "Overtime is computed from the shift rules you set, at double the ordinary rate, and shown per employee before anyone approves it." },
      { h: "Exceptions with an owner", p: "Each open item names who resolves it (HR, the owner, or Vovix) and by when. The owner's screen shows the count standing between the team and payday." },
    ],
  },
  {
    id: "calculate", n: "02", name: "Calculate", icon: Calculator,
    claim: "Gross to net, checked against last month, line by line.",
    lead: "Earnings, statutory deductions and employer contributions are worked for every employee, then compared with the previous month. Each variance is explained before the run moves on.",
    points: [
      { h: "Every statutory head", p: "PF, ESI, professional tax, LWF and TDS worked per employee with the current rates and ceilings, and the employer's share alongside." },
      { h: "Variance check", p: "Totals and each employee's net are compared with the previous run. New joiners, exits, arrears and rate changes are listed with the reason." },
      { h: "Tamil-first payslips", p: "Payslips are generated in Tamil, with English available, and delivered through the employee app with offline access." },
    ],
  },
  {
    id: "approve", n: "03", name: "Approve", icon: UserCheck,
    claim: "Vovix prepares. You approve. Nothing is paid without sign-off.",
    lead: "Maker-checker is built into the run itself, not a policy on paper. The Vovix operator prepares and checks; the owner sees one screen and approves or sends it back.",
    points: [
      { h: "One owner screen", p: "The question is always the same: can I pay everyone on the 7th? Cash-out, open items and the statutory calendar sit on one page." },
      { h: "Maker-checker enforced", p: "The person who prepared the run cannot approve it. Approval is recorded with who, when and what changed since the last check." },
      { h: "Audit trail", p: "Every action in the month lands in a log you can read: an edit to a rate, a resolved exception, an approval, a bank file generated." },
    ],
  },
  {
    id: "pay", n: "04", name: "Pay", icon: Banknote,
    claim: "Bank file and challans, prepared for you to pay.",
    lead: "After approval, Vovix generates the bank payment file in your bank's format and prepares each statutory challan. Your business pays and uploads; Vovix never touches the money.",
    points: [
      { h: "Your bank, your format", p: "The salary file is generated for your bank's bulk-upload template and reconciled to the approved net pay total before it is handed over." },
      { h: "Challans prepared", p: "PF ECR, ESI contribution, professional tax, LWF and TDS workings are prepared with the amounts and due dates. Upload and payment stay with you." },
      { h: "Funds and DSC stay with you", p: "Vovix does not hold or move funds and does not file on government portals by API. Your digital signature certificate never leaves your control." },
    ],
  },
  {
    id: "prove", n: "05", name: "Prove", icon: FileCheck2,
    claim: "A filing counts as done only when the bank debit matches the challan.",
    lead: "Each statutory filing moves through a proof ledger. Prepared is not paid, and paid is not verified until the challan and the bank debit agree. The inspector gets a pack, not a promise.",
    points: [
      { h: "Proof ledger per filing", p: "Every filing carries its state and its evidence: the challan, the bank debit, the acknowledgement. A missing piece keeps it out of Verified." },
      { h: "Factories Rules registers", p: "Muster roll, wage register, overtime and leave-with-wages registers for Tamil Nadu are generated from the same payroll data, not re-keyed." },
      { h: "Inspector-ready pack", p: "When an inspector visits, the month's registers, payslips, challans and proofs are assembled into one pack, with nothing to hunt for." },
    ],
  },
];

/* ── Stage pictures (illustrative, static) ─────────────────────── */
function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-panel border border-line bg-white shadow-lifted">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-ground-sub px-4 py-2.5">
        <span className="flex min-w-0 items-center gap-2 font-mono text-[11px] font-semibold text-ink-muted"><FileText size={13} className="shrink-0 text-brand-ink" aria-hidden /><span className="truncate">{title}</span></span>
        <Illustrative />
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

const Row = ({ k, v, tone = "" }: { k: string; v: string; tone?: string }) => (
  <div className="flex items-baseline justify-between gap-3 py-[7px] text-[12.5px]">
    <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-muted">{k}</span>
    <span className={`font-semibold text-ink tnum ${tone}`}>{v}</span>
  </div>
);

function PicAttendance() {
  const items = [
    { k: "1 unmatched punch · Shift B · 18 Oct", owner: "Vovix", due: "today" },
    { k: "2 employees without a UAN", owner: "HR", due: "22 Oct" },
    { k: "14 overtime hours awaiting approval", owner: "Owner", due: "25 Oct" },
    { k: "Late punch pattern · 3 employees · Shift C", owner: "HR", due: "25 Oct" },
  ];
  return (
    <Frame title="payroll.vovix.in · Attendance · October 2026">
      <div className="grid gap-4 sm:grid-cols-[1fr_1.3fr]">
        <div className="rounded-control border border-line bg-ground-sub/70 p-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">Punches reconciled</p>
          <p className="mt-1 text-[28px] font-bold leading-none tracking-[-0.03em] text-ink tnum">2,236</p>
          <p className="mt-2 font-mono text-[10px] text-ink-muted">86 employees · 4 shift patterns</p>
          <div className="mt-4 space-y-1.5">
            {[["General", 100], ["Shift A", 100], ["Shift B", 96], ["Shift C", 100]].map(([s, pct]) => (
              <div key={s as string}>
                <div className="flex justify-between font-mono text-[10px] text-ink-secondary"><span>{s}</span><span className="tnum">{pct}%</span></div>
                <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-line"><div className={`h-full rounded-full ${pct === 100 ? "bg-brand-fill" : "bg-state-warn"}`} style={{ width: `${pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">Exception queue · 4 open</p>
          <ul className="mt-2 divide-y divide-line">
            {items.map((x) => (
              <li key={x.k} className="flex items-center gap-2 py-2 text-[12px]">
                <AlertTriangle size={13} className="shrink-0 text-state-warn" aria-hidden />
                <span className="min-w-0 flex-1 truncate text-ink">{x.k}</span>
                <span className="shrink-0 rounded bg-ground-sub px-1.5 py-px font-mono text-[9px] font-bold uppercase text-ink-muted">{x.owner}</span>
                <span className="hidden shrink-0 font-mono text-[9.5px] text-ink-muted sm:inline">{x.due}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}

function PicCalculate() {
  return (
    <Frame title="payroll.vovix.in · Calculate · October 2026">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="divide-y divide-line/80">
          <Row k="Employees paid" v="86" />
          <Row k="Gross earnings" v="₹36,04,900" />
          <Row k="Net pay" v="₹31,84,600" />
          <Row k="Employer PF + ESI" v="₹4,12,300" />
          <Row k="TDS deducted" v="₹1,08,400" />
        </div>
        <div className="rounded-control border border-line bg-ground-sub/70 p-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">Variance vs September · 3 explained</p>
          <ul className="mt-2 space-y-2 text-[12px] text-ink-secondary">
            {[["+₹42,300", "2 new joiners · Shift A · from 6 Oct"], ["−₹18,900", "1 exit · full and final settled"], ["+₹11,200", "Overtime · 14 hours approved at 2x"]].map(([d, why]) => (
              <li key={why} className="flex gap-2"><span className="w-[72px] shrink-0 font-mono text-[11px] font-bold text-ink tnum">{d}</span><span>{why}</span></li>
            ))}
          </ul>
          <p className="mt-3 flex items-center gap-1.5 text-[11.5px] text-brand-ink"><Check size={13} aria-hidden /> 86 Tamil payslips generated</p>
        </div>
      </div>
    </Frame>
  );
}

function PicApprove() {
  return (
    <Frame title="payroll.vovix.in · Approve · October 2026">
      <div className="grid gap-4 sm:grid-cols-[1.1fr_1fr]">
        <div className="rounded-control border border-line bg-ground-sub/70 p-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">Today · owner view</p>
          <p className="mt-1 text-[15px] font-bold leading-snug text-ink">Ready for payday on the 7th</p>
          <ul className="mt-3 space-y-1.5 text-[12px]">
            {["4 exceptions resolved", "Variances explained by the Vovix operator", "Checked by a second operator"].map((x) => (
              <li key={x} className="flex items-center gap-2 text-ink-secondary"><Check size={13} className="shrink-0 text-brand-ink" aria-hidden />{x}</li>
            ))}
          </ul>
          <div className="mt-4 border-t border-line pt-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-muted">Cash-out this month</p>
            <p className="mt-1 text-[18px] font-bold text-ink tnum">₹35,96,900</p>
            <p className="font-mono text-[9.5px] text-ink-muted">net pay on the 7th · PF, ESI by the 15th</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <ul className="space-y-2 text-[12px]">
            {[["Prepared", "Vovix operator · 28 Oct 16:10"], ["Checked", "Second operator · 29 Oct 09:40"], ["Approved", "Owner · pending"]].map(([s, who], i) => (
              <li key={s} className="flex items-center gap-3">
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${i < 2 ? "bg-brand-wash text-brand-ink" : "bg-ground-sub text-ink-muted"}`}>{i < 2 ? <Check size={13} aria-hidden /> : <Clock size={13} aria-hidden />}</span>
                <span><span className="block font-semibold text-ink">{s}</span><span className="block font-mono text-[10px] text-ink-muted">{who}</span></span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <span className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-control bg-brand-fill px-3 py-2 text-[12.5px] font-bold text-navy"><ShieldCheck size={14} aria-hidden /> Approve October</span>
            <span className="inline-flex items-center justify-center rounded-control border border-line px-3 py-2 text-[12.5px] font-semibold text-ink-secondary">Send back</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function PicPay() {
  const files = [
    { k: "Salary bank file", d: "HDFC bulk upload · 86 rows · ₹31,84,600", st: "READY" },
    { k: "PF ECR", d: "Due 15 Nov · ₹2,98,700", st: "PREPARED" },
    { k: "ESI contribution", d: "Due 15 Nov · ₹1,13,600", st: "PREPARED" },
    { k: "Professional tax", d: "Tamil Nadu schedule", st: "PREPARED" },
    { k: "TDS · 24Q", d: "Deposit by 7 Nov · ₹1,08,400", st: "PREPARED" },
  ];
  return (
    <Frame title="payroll.vovix.in · Pay · October 2026">
      <ul className="divide-y divide-line">
        {files.map((f) => (
          <li key={f.k} className="flex items-center gap-3 py-2.5 text-[12.5px]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><FileText size={14} aria-hidden /></span>
            <span className="min-w-0 flex-1"><span className="block font-semibold text-ink">{f.k}</span><span className="block truncate font-mono text-[10px] text-ink-muted">{f.d}</span></span>
            <span className={`shrink-0 rounded px-1.5 py-px font-mono text-[9px] font-bold ${f.st === "READY" ? "bg-brand-wash text-state-ok" : "bg-state-warnwash text-state-warn"}`}>{f.st}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-start gap-2 rounded-control border border-line bg-ground-sub/70 p-3 text-[11.5px] text-ink-secondary"><ShieldCheck size={14} className="mt-px shrink-0 text-brand-ink" aria-hidden />Your business uploads and pays each of these. Vovix never holds funds and never files by API; your DSC stays with you.</p>
    </Frame>
  );
}

function PicProve() {
  const filings = [
    { k: "PF ECR", due: "15 Nov", st: "VERIFIED", ev: "challan · bank debit · TRRN" },
    { k: "ESI contribution", due: "15 Nov", st: "VERIFIED", ev: "challan · bank debit" },
    { k: "Professional tax", due: "TN schedule", st: "PAID", ev: "challan" },
    { k: "LWF", due: "31 Jan", st: "APPROVED", ev: "—" },
    { k: "TDS · 24Q", due: "7 Nov", st: "VERIFIED", ev: "challan · bank debit" },
  ];
  const tone = (st: string) => st === "VERIFIED" ? "text-state-ok bg-brand-wash" : st === "PAID" || st === "APPROVED" ? "text-brand-ink bg-brand-wash" : "text-state-warn bg-state-warnwash";
  return (
    <Frame title="payroll.vovix.in · Prove · October 2026">
      <div className="overflow-hidden rounded-control border border-navy/10 bg-navy">
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-onspec">Compliance proof ledger</span>
          <span className="hidden font-mono text-[9px] text-white/60 sm:inline">Calculated → Prepared → Approved → Paid → Verified</span>
        </div>
        <ul className="divide-y divide-white/10">
          {filings.map((f) => (
            <li key={f.k} className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2 text-[11.5px] text-ink-onspec sm:grid-cols-[1.2fr_1.4fr_auto]">
              <span className="min-w-0 truncate">{f.k} <span className="text-white/50">· due {f.due}</span></span>
              <span className="hidden truncate font-mono text-[10px] text-white/60 sm:block">{f.ev}</span>
              <span className={`shrink-0 rounded px-1.5 py-px font-mono text-[9px] font-bold ${tone(f.st)}`}>{f.st}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {[["Muster roll", "Oct 2026 · 86"], ["Wage register", "Oct 2026 · 86"], ["Overtime register", "Oct 2026 · 14 h"]].map(([h, s]) => (
          <div key={h} className="flex items-center gap-2 rounded-control border border-line bg-ground-sub/70 px-3 py-2 text-[12px]">
            <FileCheck2 size={14} className="shrink-0 text-brand-ink" aria-hidden />
            <span><span className="block font-semibold text-ink">{h}</span><span className="block font-mono text-[10px] text-ink-muted">{s}</span></span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

const PICS: Record<string, () => JSX.Element> = { attendance: PicAttendance, calculate: PicCalculate, approve: PicApprove, pay: PicPay, prove: PicProve };

/* ── The block ────────────────────────────────────────────────── */
export function PayrollStages() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const seen = useRef<Set<number>>(new Set());

  // One event per stage per page view, the first time it becomes the active one.
  useEffect(() => {
    if (seen.current.has(active)) return;
    seen.current.add(active);
    track("payroll_stage_view", { stage: STAGES[active].id, index: active + 1 });
  }, [active]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      // The stage whose top is nearest the upper third of the viewport wins.
      const visible = entries.filter((e) => e.isIntersecting).map((e) => Number((e.target as HTMLElement).dataset.i));
      if (visible.length) setActive(Math.min(...visible));
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16 [&>*]:min-w-0">
      {/* Stage list: sticky on desktop, a scrolling chip row on mobile */}
      <nav aria-label="Payroll stages" className="w-full max-w-full lg:sticky lg:top-28 lg:self-start">
        <ol className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 lg:mx-0 lg:w-auto lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
          {STAGES.map((s, i) => (
            <li key={s.id} className="shrink-0 lg:border-b lg:border-line">
              <a href={`#${s.id}`} aria-current={i === active ? "step" : undefined}
                 className={`flex items-center gap-2.5 rounded-full border px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] transition-colors lg:rounded-none lg:border-0 lg:px-0 lg:py-3.5 ${
                   i === active ? "border-navy bg-navy text-white lg:bg-transparent lg:text-ink" : "border-line bg-white text-ink-muted hover:text-ink lg:bg-transparent"}`}>
                <span className={`hidden h-[2px] w-5 rounded-full transition-colors lg:block ${i === active ? "bg-brand-fill" : "bg-line-strong"}`} aria-hidden />
                <span className="lg:hidden">{s.n}</span>{s.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="min-w-0 space-y-20 md:space-y-28">
        {STAGES.map((s, i) => {
          const Pic = PICS[s.id];
          return (
            <section key={s.id} id={s.id} data-i={i} ref={(el) => { refs.current[i] = el; }} className="scroll-mt-28">
              <Pic />
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-wash text-brand-ink"><s.icon size={17} aria-hidden /></span>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">{s.n} · {s.name}</span>
              </div>
              <h3 className="mt-4 max-w-[26ch] text-balance text-[clamp(24px,2.8vw,32px)] font-semibold leading-[1.12] tracking-[-0.025em] text-ink">{s.claim}</h3>
              <p className="mt-3 max-w-[66ch] text-pretty text-lead text-ink-secondary">{s.lead}</p>
              <div className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
                {s.points.map((p) => (
                  <div key={p.h}>
                    <p className="text-[15.5px] font-bold text-ink">{p.h}</p>
                    <p className="mt-1.5 text-small leading-relaxed text-ink-secondary">{p.p}</p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
