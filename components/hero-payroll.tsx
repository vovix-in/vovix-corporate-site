"use client";

import { ArrowRight, Check, ShieldCheck, Clock, Banknote, FileCheck2 } from "lucide-react";
import { Button, Illustrative, usePausable, useTicker } from "./ui";
import { Photo } from "./photo";

/* Homepage hero — v6, payroll-first.
   One promise, one product picture, two actions. Replaces the three-slide
   carousel: a rotating hero never let the priority product own the fold.
   The right column is a live, compact "month of payroll" card that walks
   through the five stages the product is sold on; it advances only while
   on screen and renders its finished state under reduced motion.        */

const STAGES = ["Attendance", "Calculate", "Approve", "Pay", "Prove"];

const STATUS: { icon: typeof Clock; line: string; sub: string }[] = [
  { icon: Clock,       line: "2,236 biometric punches reconciled to shifts", sub: "General · A · B · C · overtime at 2x · 1 exception queued" },
  { icon: Banknote,    line: "86 employees · net pay ₹31,84,600",            sub: "Checked against September · 3 variances explained" },
  { icon: ShieldCheck, line: "Approved by the owner",                        sub: "Maker–checker enforced · nothing paid without sign-off" },
  { icon: Banknote,    line: "Bank file ready for your upload",              sub: "Vovix never holds or moves funds" },
  { icon: FileCheck2,  line: "Every filing carries its evidence",            sub: "Challan + bank debit matched · inspector pack generated" },
];

const FILINGS = [
  { k: "PF ECR",           due: "15 Nov", at: 4, state: "VERIFIED" },
  { k: "ESI contribution", due: "15 Nov", at: 4, state: "PAID" },
  { k: "Professional tax", due: "30 Nov", at: 3, state: "APPROVED" },
  { k: "LWF",              due: "31 Jan", at: 2, state: "PREPARED" },
  { k: "TDS · 24Q",        due: "7 Nov",  at: 2, state: "PREPARED" },
];

const PROOF = [
  "Factories with 20 to 150 employees",
  "PF, ESI, PT, LWF and TDS, each with its own proof",
  "Tamil-first payslips · your DSC and funds stay with you",
];

function tone(st: string) {
  if (st === "VERIFIED") return "text-state-ok bg-brand-wash";
  if (st === "PAID" || st === "APPROVED") return "text-brand-ink bg-brand-wash";
  return "text-state-warn bg-state-warnwash";
}

function MonthCard() {
  const [ref, active] = usePausable<HTMLDivElement>();
  const tick = useTicker(STAGES.length + 1, 2200, active); // extra tick holds the finished state
  const s = Math.min(tick, STAGES.length - 1);
  const St = STATUS[s];

  return (
    <div ref={ref} className="overflow-hidden rounded-panel border border-white/15 bg-white text-ink shadow-floating">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-ground-sub px-4 py-2.5">
        <span className="truncate font-mono text-[11px] font-semibold text-ink-muted">payroll.vovix.in · Chennai Precision Components · Oct 2026</span>
        <Illustrative />
      </div>

      <ol className="no-scrollbar flex overflow-x-auto border-b border-line" aria-label="Payroll month stage">
        {STAGES.map((l, i) => (
          <li key={l} aria-current={i === s ? "step" : undefined}
              className={`relative flex-1 whitespace-nowrap px-2 py-2.5 text-center font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] transition-colors sm:px-1 sm:text-[10px] sm:tracking-[0.08em] ${i < s ? "text-brand-ink" : i === s ? "text-ink" : "text-ink-muted/70"}`}>
            {l}
            <span className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand-fill transition-transform duration-500 ${i <= s ? "scale-x-100" : "scale-x-0"}`} />
          </li>
        ))}
      </ol>

      <div className="p-4 sm:p-5">
        <div key={s} className="slide-in flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><St.icon size={18} aria-hidden /></span>
          <div className="min-w-0">
            <p className="text-[15px] font-bold leading-snug text-ink">{St.line}</p>
            <p className="mt-0.5 font-mono text-[11px] leading-snug text-ink-muted">{St.sub}</p>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-control border border-navy/10 bg-navy">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-onspec">Compliance proof ledger</span>
            <span className="font-mono text-[9px] text-white/60">Prepared → Paid → Verified</span>
          </div>
          <ul className="divide-y divide-white/10">
            {FILINGS.map((f) => {
              const shown = s >= f.at ? f.state : s >= 1 ? "CALCULATED" : "—";
              return (
                <li key={f.k} className="flex items-center justify-between gap-3 px-3 py-1.5 text-[11.5px] text-ink-onspec">
                  <span className="min-w-0 truncate">{f.k} <span className="text-white/50">· due {f.due}</span></span>
                  <span className={`shrink-0 rounded px-1.5 py-px font-mono text-[9px] font-bold transition-colors ${shown === "—" || shown === "CALCULATED" ? "bg-white/10 text-white/70" : tone(shown)}`}>{shown}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-3 flex items-center gap-2 text-[12px] text-ink-secondary">
          <Check size={13} className="shrink-0 text-brand-ink" aria-hidden />
          {s >= 4 ? "Ready for the inspector: registers and proof pack generated." : "Owner's one question answered: can I pay everyone on the 7th?"}
        </p>
      </div>
    </div>
  );
}

export function HeroPayroll() {
  return (
    <section aria-label="VOVIX Payroll" className="on-dark relative isolate overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 -z-20 opacity-40"><Photo name="payroll-desk" priority sizes="100vw" /></div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,27,37,0.98)_0%,rgba(7,40,54,0.92)_50%,rgba(7,40,54,0.7)_100%)]" />
      <div aria-hidden className="gridfield-dark absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      <div className="shell relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24 [&>*]:min-w-0">
        <div className="max-w-[620px]">
          <p className="rise flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
            <span className="brand-rule" aria-hidden />VOVIX Payroll · Tamil Nadu factories
          </p>
          <h1 className="rise mt-6 text-balance text-[clamp(38px,5vw,62px)] font-semibold leading-[1.04] tracking-[-0.038em] [animation-delay:.08s]">
            Your factory&rsquo;s payroll, run every month. <span className="text-brand-fill">Every filing proven.</span>
          </h1>
          <p className="rise mt-6 max-w-[54ch] text-pretty text-lead font-normal text-white/80 [animation-delay:.16s]">
            Vovix runs the month and you approve it. PF, ESI, PT, LWF and TDS each carry their own evidence, workers get Tamil payslips, and the inspector gets a proof pack.
          </p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:.24s]">
            <Button href="/contact?topic=VOVIX+Payroll" size="lg" track="cta_click" place="hero">Book a payroll walkthrough <ArrowRight size={18} aria-hidden /></Button>
            <Button href="/payroll#month" size="lg" variant="onDark" track="cta_click" place="hero">See how a month runs</Button>
          </div>
          <ul className="rise mt-10 grid gap-2.5 border-t border-white/10 pt-6 sm:grid-cols-3 [animation-delay:.32s]">
            {PROOF.map((x) => (
              <li key={x} className="flex items-start gap-2 text-[13.5px] leading-snug text-white/80"><Check size={15} className="mt-0.5 shrink-0 text-brand-fill" aria-hidden />{x}</li>
            ))}
          </ul>
          <p className="rise mt-6 text-[13px] text-white/60 [animation-delay:.4s]">
            Also from VOVIX: <a href="/products#oneview" className="font-semibold text-white/85 hover:text-brand-fill">OneView</a>, <a href="https://edge.vovix.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/85 hover:text-brand-fill">Edge</a> and <a href="/services" className="font-semibold text-white/85 hover:text-brand-fill">custom automation</a> for the work between your systems.
          </p>
        </div>

        <div className="rise w-full [animation-delay:.2s] lg:max-w-[560px] lg:justify-self-end">
          <MonthCard />
        </div>
      </div>
    </section>
  );
}
