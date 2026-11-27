import type { Metadata } from "next";
import { Check, Minus, ArrowRight, Plus, Calculator, Users, FileCheck2, Wrench } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button, Reveal, Section, SectionHead } from "@/components/ui";
import { PricingCalculator } from "@/components/pricing-calculator";
import { ContactForm } from "@/components/contact-form";
import { CONFIRMED, CURRENCY, MIN_EMPLOYEES, MAX_EMPLOYEES, TIERS, ONBOARDING, INCLUDED, NOT_INCLUDED, FAQ, inr } from "@/components/pricing-data";

/* /payroll/pricing — v6 plan step 4. One plan, priced per employee per
   month, with a headcount calculator. Factory owners compare on exactly
   this number, so it is the first thing on the page.                   */

const SITE = "https://www.vovix.in";
const from = TIERS[TIERS.length - 1].rate;

export const metadata: Metadata = {
  title: `VOVIX Payroll pricing — from ${inr(from)} per employee per month`,
  description: `Managed payroll and statutory compliance for Tamil Nadu factories, priced per employee per month. One plan, everything included: attendance to payslips, PF, ESI, PT, LWF and TDS with proof, registers and the inspector pack. Minimum ${MIN_EMPLOYEES} employees.`,
  alternates: { canonical: "/payroll/pricing" },
  openGraph: { title: "VOVIX Payroll pricing", description: `One plan, per employee per month, from ${inr(from)}. Minimum ${MIN_EMPLOYEES} employees.`, url: `${SITE}/payroll/pricing` },
};

const COMPARE: { row: string; sw: string | boolean; ca: string | boolean; vx: string | boolean }[] = [
  { row: "Who does the monthly work", sw: "Your HR, in the software", ca: "The accountant, on request", vx: "A named Vovix operator" },
  { row: "Biometric punches reconciled to shifts", sw: "If you configure it", ca: false, vx: true },
  { row: "Maker-checker before anything is paid", sw: false, ca: false, vx: true },
  { row: "Proof that each filing was paid", sw: false, ca: "On request", vx: "Ledger, per filing" },
  { row: "Factories Rules registers", sw: "Templates", ca: "Sometimes", vx: "Generated monthly" },
  { row: "Tamil payslips and employee app", sw: "Sometimes", ca: false, vx: true },
  { row: "Owner's single screen", sw: false, ca: false, vx: true },
  { row: "Pricing", sw: "Per employee + your HR's time", ca: "Retainer", vx: "Per employee, all-in" },
];

const Cell = ({ v, strong = false }: { v: string | boolean; strong?: boolean }) =>
  v === true ? <Check size={17} className={strong ? "text-brand-ink" : "text-ink-secondary"} aria-label="Yes" />
  : v === false ? <Minus size={15} className="text-line-strong" aria-label="No" />
  : <span className={strong ? "font-semibold text-ink" : "text-ink-secondary"}>{v}</span>;

const ld = [
  {
    "@context": "https://schema.org", "@type": "Product",
    name: "VOVIX Payroll", url: `${SITE}/payroll/pricing`,
    description: "Managed payroll, statutory compliance and workforce operations for Tamil Nadu factories with 20 to 150 employees.",
    brand: { "@type": "Brand", name: "VOVIX" },
    // Price appears here only once the list is confirmed, so search never shows a placeholder.
    ...(CONFIRMED ? { offers: { "@type": "Offer", priceCurrency: CURRENCY, price: from, priceSpecification: { "@type": "UnitPriceSpecification", price: from, priceCurrency: CURRENCY, unitText: "per employee per month", valueAddedTaxIncluded: false }, availability: "https://schema.org/LimitedAvailability", url: `${SITE}/payroll/pricing` } } : {}),
  },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
];

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageShell eyebrow="VOVIX Payroll · Pricing"
        title="One plan. Per employee, per month. Everything included."
        lead={`No modules, no per-filing fees, no surprise at the inspector's visit. From ${inr(from)} per employee per month for Tamil Nadu factories with ${MIN_EMPLOYEES} to ${MAX_EMPLOYEES} employees.`}>

        {/* ═══ THE CARD ═══ */}
        <Section className="!pt-0">
          <Reveal><PricingCalculator /></Reveal>
          {!CONFIRMED && (
            <p className="mx-auto mt-5 max-w-[70ch] text-center text-[12.5px] leading-relaxed text-ink-muted">
              Early-access pricing is indicative. The exact figure for your plant is confirmed in writing after the walkthrough, before anything is signed, and is then locked for 12 months.
            </p>
          )}
        </Section>

        {/* ═══ INCLUDED / NOT ═══ */}
        <Section id="included" tone="sub">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 [&>*]:min-w-0">
            <div>
              <SectionHead eyebrow="What the fee covers" title="The whole month, not a licence." lead="Everything a factory needs to pay people correctly and prove it, done by Vovix each month." />
              <ul className="grid gap-3 sm:grid-cols-2">
                {INCLUDED.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 rounded-card border border-line bg-white p-4 text-[14px] leading-snug text-ink"><Check size={16} className="mt-0.5 shrink-0 text-brand-ink" aria-hidden />{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHead eyebrow="What stays with you" title="Paid and filed by your business." />
              <ul className="space-y-3">
                {NOT_INCLUDED.map((x) => (
                  <li key={x.h} className="rounded-card border border-line bg-white p-5">
                    <p className="text-[15px] font-bold text-ink">{x.h}</p>
                    <p className="mt-1 text-small leading-relaxed text-ink-secondary">{x.p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ═══ ONBOARDING ═══ */}
        <Section id="onboarding">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
            <SectionHead className="!mb-0" eyebrow="Getting started" title={`${inr(ONBOARDING)} once, and the first month is already checked.`}
              lead="Onboarding is a fixed fee and a fixed sequence. By the time you approve your first live month, it has already been run in parallel against the previous one." />
            <Reveal>
              <ol className="grid gap-4 sm:grid-cols-2">
                {[
                  { i: Users, h: "Week 1 · Masters", p: "Employee masters, UAN and IP numbers, year-to-date figures and bank details migrated from your current sheets or software." },
                  { i: Wrench, h: "Week 1 · Rules", p: "Shift patterns, overtime rules, rate cards and your PF, ESI, PT and LWF registrations set up and checked against last month's challans." },
                  { i: Calculator, h: "Week 2 · Parallel run", p: "Your previous month is re-run in VOVIX Payroll. Every difference against what you actually paid is explained before go-live." },
                  { i: FileCheck2, h: "Week 3 · First live month", p: "The owner approves on one screen. Bank file, challans and registers come out of the same run. The proof ledger starts." },
                ].map((s, i) => (
                  <li key={s.h} className="rounded-card border border-line bg-white p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-wash text-brand-ink"><s.i size={17} aria-hidden /></span>
                      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-muted">0{i + 1}</span>
                    </div>
                    <p className="mt-3 text-[15.5px] font-bold text-ink">{s.h}</p>
                    <p className="mt-1 text-small leading-relaxed text-ink-secondary">{s.p}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Section>

        {/* ═══ COMPARE ═══ */}
        <Section id="compare" tone="sub">
          <SectionHead eyebrow="What to compare it with" title="Software gives you a tool. A retainer gives you a person. This gives you the month, done."
            lead="The honest comparison is not price per seat. It is who carries the work and who carries the proof." />
          <Reveal>
            <div className="overflow-x-auto rounded-panel border border-line bg-white">
              <table className="w-full min-w-[720px] text-left text-small">
                <thead className="bg-ground-sub font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-muted">
                  <tr>
                    <th className="px-5 py-3">Each month</th>
                    <th className="px-5 py-3">Self-serve payroll software</th>
                    <th className="px-5 py-3">Accountant on retainer</th>
                    <th className="bg-brand-wash/60 px-5 py-3 text-brand-ink">VOVIX Payroll</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {COMPARE.map((r) => (
                    <tr key={r.row}>
                      <td className="px-5 py-3.5 font-semibold text-ink">{r.row}</td>
                      <td className="px-5 py-3.5"><Cell v={r.sw} /></td>
                      <td className="px-5 py-3.5"><Cell v={r.ca} /></td>
                      <td className="bg-brand-wash/30 px-5 py-3.5"><Cell v={r.vx} strong /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[12.5px] text-ink-muted">Generic descriptions of the two common alternatives, not claims about any named product or firm. Your current setup may differ; bring it to the walkthrough and we will compare it honestly.</p>
          </Reveal>
        </Section>

        {/* ═══ FAQ ═══ */}
        <Section id="faq">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20 [&>*]:min-w-0">
            <SectionHead className="!mb-0" eyebrow="Pricing FAQ" title="The questions owners ask before they sign." />
            <Reveal>
              <div className="divide-y divide-line-strong border-y border-line-strong">
                {FAQ.map(([q, a], i) => (
                  <details key={q} className="group py-1" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                      <span className="text-[17px] font-semibold text-ink">{q}</span>
                      <Plus size={20} className="shrink-0 text-brand-ink transition-transform duration-300 group-open:rotate-45" aria-hidden />
                    </summary>
                    <p className="max-w-[68ch] pb-6 text-body text-ink-secondary">{a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ═══ CTA ═══ */}
        <Section id="contact" className="!pt-4">
          <div className="on-dark relative overflow-hidden rounded-[28px] bg-navy text-white">
            <div aria-hidden className="gridfield-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
            <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14 [&>*]:min-w-0">
              <div>
                <p className="eyebrow-dark">Get a written quote</p>
                <h2 className="mt-5 text-balance text-[clamp(30px,3.8vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em]">Tell us your headcount. We send the number.</h2>
                <p className="mt-5 text-pretty text-lead font-normal text-ink-onspec">Put your employee count and shift pattern in the message. You get the monthly fee, the onboarding fee and what the first month looks like, in writing, within one business day.</p>
                <Button href="/payroll" variant="onDark" className="mt-8" track="cta_click" place="pricing_cta">What a month looks like <ArrowRight size={16} aria-hidden /></Button>
              </div>
              <div className="rounded-panel border border-white/10 bg-white/[0.04] p-5 sm:p-7">
                <ContactForm dark defaultTopic="VOVIX Payroll" />
              </div>
            </div>
          </div>
        </Section>
      </PageShell>
    </>
  );
}
