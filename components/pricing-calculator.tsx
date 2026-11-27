"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button, Chip } from "./ui";
import { CONFIRMED, MIN_EMPLOYEES, MAX_EMPLOYEES, TIERS, ONBOARDING, GST_NOTE, rateFor, monthlyFor, inr } from "./pricing-data";

/* The one pricing card. A headcount slider turns the per-employee rate
   into the monthly figure a factory owner actually wants to see.       */

export function PricingCalculator() {
  const [n, setN] = useState(60);
  const rate = rateFor(n);
  const monthly = monthlyFor(n);

  return (
    <div className="overflow-hidden rounded-panel border border-line bg-white shadow-lifted">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] [&>*]:min-w-0">
        {/* Left: the number */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Chip live>Early access</Chip>
            {!CONFIRMED && <Chip>Indicative pricing</Chip>}
          </div>
          <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">VOVIX Payroll · managed</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-[clamp(40px,5vw,56px)] font-bold leading-none tracking-[-0.035em] text-ink tnum">{inr(rate)}</span>
            <span className="text-[15px] text-ink-secondary">per employee, per month</span>
          </p>
          <p className="mt-2 text-small text-ink-muted">{GST_NOTE} Minimum {MIN_EMPLOYEES} employees.</p>

          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor="headcount" className="text-[14px] font-semibold text-ink">Employees on payroll</label>
              <output htmlFor="headcount" className="font-mono text-[15px] font-bold text-ink tnum">{n}</output>
            </div>
            <input id="headcount" type="range" min={MIN_EMPLOYEES} max={MAX_EMPLOYEES} step={1} value={n}
                   onChange={(e) => setN(Number(e.target.value))}
                   className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand-fill" aria-valuetext={`${n} employees`} />
            <div className="mt-1.5 flex justify-between font-mono text-[10.5px] text-ink-muted"><span>{MIN_EMPLOYEES}</span><span>{MAX_EMPLOYEES}</span></div>
          </div>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            <div className="flex items-baseline justify-between py-3">
              <dt className="text-small text-ink-secondary">Monthly fee for {n} employees</dt>
              <dd className="text-[22px] font-bold text-ink tnum">{inr(monthly)}</dd>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <dt className="text-small text-ink-secondary">One-time onboarding</dt>
              <dd className="text-[16px] font-semibold text-ink tnum">{inr(ONBOARDING)}</dd>
            </div>
            <div className="flex items-baseline justify-between py-3">
              <dt className="text-small text-ink-secondary">Per employee, per working day</dt>
              <dd className="text-[16px] font-semibold text-ink tnum">about {inr(Math.round(rate / 26))}</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact?topic=VOVIX+Payroll" size="lg" track="cta_click" place="pricing_card">Book a payroll walkthrough <ArrowRight size={18} aria-hidden /></Button>
            <Button href="/payroll#month" size="lg" variant="secondary" track="cta_click" place="pricing_card">See how a month runs</Button>
          </div>
        </div>

        {/* Right: the tiers */}
        <div className="border-t border-line bg-ground-sub p-6 sm:p-8 lg:border-l lg:border-t-0">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">Volume tiers</p>
          <ul className="mt-4 divide-y divide-line">
            {TIERS.map((t) => {
              const on = rate === t.rate;
              return (
                <li key={t.label} className={`flex items-center justify-between py-3.5 ${on ? "text-ink" : "text-ink-secondary"}`}>
                  <span className="flex items-center gap-2 text-small font-semibold">
                    <span className={`h-2 w-2 rounded-full ${on ? "bg-brand-fill" : "bg-line-strong"}`} aria-hidden />{t.label}
                  </span>
                  <span className="font-mono text-[14px] font-bold tnum">{inr(t.rate)}<span className="text-[11px] font-medium text-ink-muted"> /emp/mo</span></span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[12.5px] leading-relaxed text-ink-muted">The tier is set by headcount on the last day of the month and applies to every employee. No per-filing, per-payslip or per-register charges.</p>
          <ul className="mt-6 space-y-2">
            {["Rate locked for 12 months for early-access factories", "Monthly billing, 30-day notice either way", "Nothing to install; your biometric devices stay yours"].map((x) => (
              <li key={x} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink-secondary"><Check size={15} className="mt-0.5 shrink-0 text-brand-ink" aria-hidden />{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
