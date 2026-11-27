import type { Metadata } from "next";
import { ArrowRight, Check, X, Factory, Fingerprint, ClipboardList, Users, Server, Lock, UserCheck, FileCheck2, Mail, Phone } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button, Reveal, Section, SectionHead, Chip } from "@/components/ui";
import { PayrollDemo } from "@/components/product-demos";
import { PayrollStages } from "@/components/payroll-stages";
import { ContactForm } from "@/components/contact-form";
import { Plus } from "lucide-react";
import { SCHEDULER_URL } from "@/lib/analytics";

/* /payroll — the VOVIX Payroll pillar page (v6 plan, step 2).
   Shape: hero → who it's for → five-stage block → live demo →
   who does what → statutory calendar → security → FAQ → CTA.
   Every claim here also appears on /products#payroll or in the product
   data; nothing new is asserted. No customer quotes yet: early access.  */

const SITE = "https://www.vovix.in";

export const metadata: Metadata = {
  title: "VOVIX Payroll — Managed payroll and statutory compliance for Tamil Nadu factories",
  description: "Vovix runs your factory's payroll every month and you approve it. Attendance to payslips, PF, ESI, PT, LWF and TDS, each filing with its own proof, plus Tamil Nadu Factories Rules registers. For plants with 20 to 150 employees.",
  alternates: { canonical: "/payroll" },
  openGraph: { title: "VOVIX Payroll — payroll run every month, every filing proven", description: "Managed payroll, compliance and workforce operations for Tamil Nadu factories with 20 to 150 employees.", url: `${SITE}/payroll` },
};

const FOR = [
  { i: Factory, h: "Tamil Nadu factories, 20 to 150 employees", p: "Registered under the Factories Act, with PF and ESI applicable and an owner who signs off on pay." },
  { i: Fingerprint, h: "Biometric attendance, shifts and overtime", p: "General, A, B and C shift patterns, overtime at 2x, and punches that need reconciling every month." },
  { i: Users, h: "An owner who wants one screen", p: "Can I pay everyone on the 7th? What is open, and who is holding it up? That is the whole dashboard." },
  { i: ClipboardList, h: "Teams who need registers and a proof pack", p: "When the inspector comes, the registers, challans and proofs for the month are already assembled." },
];

const WHO = [
  { task: "Reconcile punches to shifts and queue exceptions", vovix: true, you: false },
  { task: "Resolve exceptions that need a decision (UAN, overtime, leave)", vovix: false, you: true },
  { task: "Calculate gross to net, statutory heads and employer share", vovix: true, you: false },
  { task: "Check the run against last month and explain variances", vovix: true, you: false },
  { task: "Approve the month", vovix: false, you: true },
  { task: "Generate the bank file, challans and Tamil payslips", vovix: true, you: false },
  { task: "Pay salaries and statutory dues; upload on the portals", vovix: false, you: true },
  { task: "Match challans to bank debits and move filings to Verified", vovix: true, you: false },
  { task: "Generate Factories Rules registers and the inspector pack", vovix: true, you: false },
];

const CALENDAR = [
  { f: "Net pay", when: "By the 7th", how: "Bank file in your bank's bulk-upload format", ev: "Bank debit" },
  { f: "TDS on salaries", when: "Deposit by the 7th; 24Q quarterly", how: "Challan workings and the 24Q schedule prepared", ev: "Challan · bank debit" },
  { f: "PF ECR", when: "By the 15th", how: "ECR file prepared for your upload on the EPFO portal", ev: "Challan · bank debit · TRRN" },
  { f: "ESI contribution", when: "By the 15th", how: "Contribution file prepared for your upload", ev: "Challan · bank debit" },
  { f: "Professional tax", when: "Per the Tamil Nadu schedule", how: "Workings prepared for payment to the local body", ev: "Challan" },
  { f: "LWF", when: "Annually, by 31 January", how: "Employee and employer contributions worked for the year", ev: "Challan" },
];

const SECURITY = [
  { i: Server, h: "Hosted in India", p: "VOVIX Payroll runs on AWS in the Mumbai region, one isolated tenant per factory." },
  { i: Lock, h: "Encrypted", p: "AES-256 at rest and TLS in transit." },
  { i: UserCheck, h: "Maker-checker", p: "The person who prepares a run cannot approve it. Every action is logged with who and when." },
  { i: FileCheck2, h: "Your funds, your DSC", p: "Vovix never holds or moves money and never files by API. Your digital signature stays with you." },
];

const FAQ: [string, string][] = [
  ["What does VOVIX Payroll produce each month?", "Payslips in Tamil and English, a bank payment file in your bank's format, PF ECR and ESI contribution files, professional tax and LWF workings, TDS schedules, and the Tamil Nadu Factories Rules registers. Each statutory filing moves to Verified only when the bank debit matches the challan."],
  ["Does Vovix pay salaries or file on the portals for us?", "No. Vovix prepares the bank file and every challan; your business pays and uploads. Vovix does not hold or move funds and does not file on government portals by API. Your DSC stays with you."],
  ["What do we have to do each month?", "Resolve the exceptions that need a decision, approve the run on one screen, then pay and upload the files Vovix has prepared. Everything else, from punch reconciliation to the proof ledger, is Vovix's work."],
  ["What size of factory is this built for?", "Tamil Nadu factories with 20 to 150 employees, biometric attendance and shift work. Larger plants and multi-state employers are not the current focus."],
  ["Where is our data stored, and who can see it?", "On AWS in the Mumbai region, one isolated tenant per factory, encrypted at rest and in transit. Vovix operators see only the tenant they work on, and every action is in the audit trail."],
  ["Is this a replacement for our auditor or labour consultant?", "No. VOVIX Payroll prepares workings from the data your business provides. Amounts should be reviewed and approved by you before payment or filing, and the workings are not a substitute for professional advice."],
  ["What does it cost?", "One plan, priced per employee per month with everything included, plus a one-time onboarding fee. The pricing page has the tiers and a calculator; the exact figure for your plant is confirmed in writing after the walkthrough."],
  ["How do we start?", "Book a walkthrough. We go through one real month with your attendance data and show what the run, the approval screen and the proof ledger look like for your plant. Early access means we are onboarding a small number of factories at a time."],
];

const ld = [
  {
    "@context": "https://schema.org", "@type": "SoftwareApplication",
    name: "VOVIX Payroll", applicationCategory: "BusinessApplication", operatingSystem: "Web",
    url: `${SITE}/payroll`,
    description: "Managed payroll, statutory compliance and workforce operations for Tamil Nadu factories with 20 to 150 employees. Attendance to payslips, PF, ESI, PT, LWF and TDS, each filing with its own proof, plus Factories Rules registers.",
    provider: { "@id": `${SITE}/#organization` },
    areaServed: { "@type": "State", name: "Tamil Nadu" },
  },
  {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
];

export default function Payroll() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageShell photo="payroll-desk"
        eyebrow="VOVIX Payroll · Early access"
        title="Your factory's payroll, run every month. Every filing proven."
        lead="Managed payroll, compliance and workforce operations for Tamil Nadu factories with 20 to 150 employees. Vovix runs the month, the owner approves, and PF, ESI, PT, LWF and TDS each carry their own evidence."
        actions={<>
          <Button href="/contact?topic=VOVIX+Payroll" size="lg" track="cta_click" place="payroll_hero">Book a payroll walkthrough <ArrowRight size={18} aria-hidden /></Button>
          <Button href="/payroll/pricing" size="lg" variant="onDark" track="cta_click" place="payroll_hero">See pricing</Button>
        </>}
      >
        {/* ═══ WHO IT'S FOR ═══ */}
        <Section id="for" tone="sub" className="!py-14 md:!py-20">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FOR.map((f, i) => (
              <Reveal key={f.h} delay={i * 0.05} className="rounded-card border border-line bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><f.i size={18} aria-hidden /></span>
                <p className="mt-4 text-[16px] font-bold leading-snug text-ink">{f.h}</p>
                <p className="mt-2 text-small leading-relaxed text-ink-secondary">{f.p}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ═══ FIVE STAGES ═══ */}
        <Section id="month">
          <SectionHead eyebrow="A month of payroll" title="Five stages. Each one leaves evidence."
            lead="Attendance, Calculate, Approve, Pay, Prove. The same sequence every month, with a person deciding at the points that need one and a record of everything else." />
          <PayrollStages />
        </Section>

        {/* ═══ LIVE DEMO ═══ */}
        <Section id="demo" tone="navy" className="overflow-hidden">
          <div aria-hidden className="gridfield-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14 [&>*]:min-w-0">
            <SectionHead dark className="!mb-0" eyebrow="See it run" title="A live month, not a screenshot."
              lead="This is the product's own UI with illustrative data. It advances through the five stages on its own; the owner's view on the left is the screen a factory owner opens." />
            <Reveal><PayrollDemo /></Reveal>
          </div>
        </Section>

        {/* ═══ WHO DOES WHAT ═══ */}
        <Section id="who-does-what" tone="sub">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
            <SectionHead className="!mb-0" eyebrow="Who does what" title="Vovix runs the month. You decide and you pay."
              lead="The split is deliberate. The work that is repeatable sits with Vovix; the decisions and the money stay with your business." />
            <Reveal>
              <div className="overflow-hidden rounded-panel border border-line bg-white">
                <div className="grid grid-cols-[1fr_72px_72px] border-b border-line bg-ground-sub px-5 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-muted sm:grid-cols-[1fr_96px_96px]">
                  <span>Each month</span><span className="text-center">Vovix</span><span className="text-center">You</span>
                </div>
                <ul className="divide-y divide-line">
                  {WHO.map((w) => (
                    <li key={w.task} className="grid grid-cols-[1fr_72px_72px] items-center px-5 py-3 text-small text-ink sm:grid-cols-[1fr_96px_96px]">
                      <span>{w.task}</span>
                      <span className="flex justify-center">{w.vovix ? <Check size={17} className="text-brand-ink" aria-label="Vovix" /> : <X size={15} className="text-line-strong" aria-hidden />}</span>
                      <span className="flex justify-center">{w.you ? <Check size={17} className="text-navy" aria-label="You" /> : <X size={15} className="text-line-strong" aria-hidden />}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 border-l-2 border-state-warn/60 pl-3 text-[12.5px] leading-relaxed text-ink-muted">Vovix does not hold or move funds and does not file on government portals by API. Statutory files are prepared for your business to pay and upload; your DSC stays with you.</p>
            </Reveal>
          </div>
        </Section>

        {/* ═══ STATUTORY CALENDAR ═══ */}
        <Section id="filings">
          <SectionHead eyebrow="Statutory calendar" title="Every filing, its due date, and what counts as proof."
            lead="Each row is a line in the proof ledger. A filing reaches Verified only when all of its evidence is attached and the amounts agree." />
          <Reveal>
            <div className="overflow-x-auto rounded-panel border border-line bg-white">
              <table className="w-full min-w-[640px] text-left text-small">
                <thead className="bg-ground-sub font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink-muted">
                  <tr><th className="px-5 py-3">Filing</th><th className="px-5 py-3">When</th><th className="px-5 py-3">Vovix prepares</th><th className="px-5 py-3">Evidence for Verified</th></tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {CALENDAR.map((c) => (
                    <tr key={c.f}>
                      <td className="px-5 py-3.5 font-semibold text-ink">{c.f}</td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-ink-secondary">{c.when}</td>
                      <td className="px-5 py-3.5 text-ink-secondary">{c.how}</td>
                      <td className="px-5 py-3.5 font-mono text-[11.5px] text-ink-secondary">{c.ev}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[12.5px] text-ink-muted">Due dates follow the current EPFO, ESIC, Income-tax and Tamil Nadu schedules and are confirmed for your plant at onboarding. Statutory workings are not a substitute for advice from your auditor or labour consultant.</p>
          </Reveal>
        </Section>

        {/* ═══ SECURITY ═══ */}
        <Section id="security" tone="sub">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 [&>*]:min-w-0">
            <SectionHead className="!mb-0" eyebrow="Security & data handling" title="Facts, not badges." />
            <Reveal>
              <ul className="grid gap-4 sm:grid-cols-2">
                {SECURITY.map((s) => (
                  <li key={s.h} className="flex gap-4 rounded-card border border-line bg-white p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><s.i size={18} aria-hidden /></span>
                    <span><span className="block text-[16px] font-semibold text-ink">{s.h}</span><span className="block text-small text-ink-secondary">{s.p}</span></span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* ═══ FAQ ═══ */}
        <Section id="faq">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20 [&>*]:min-w-0">
            <SectionHead className="!mb-0" eyebrow="FAQ" title="What factory owners ask first." />
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
                <div className="flex items-center gap-3"><Chip dark>Early access</Chip><span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-onspec">Onboarding a few factories at a time</span></div>
                <h2 className="mt-5 text-balance text-[clamp(30px,3.8vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em]">Book a payroll walkthrough.</h2>
                <p className="mt-5 text-pretty text-lead font-normal text-ink-onspec">Bring one real month of attendance. We&rsquo;ll show you the run, the approval screen and the proof ledger for your plant, and say so honestly if your setup isn&rsquo;t a fit yet.</p>
                <dl className="mt-8 divide-y divide-white/10 overflow-hidden rounded-card border border-white/10 bg-white/[0.03]">
                  {[[Mail, "Email", "admin@vovix.in", "mailto:admin@vovix.in"], [Phone, "Phone", "+91 90806 40562", "tel:+919080640562"]].map(([I, k, v, h]) => {
                    const Icon = I as typeof Mail;
                    return (
                      <div key={k as string} className="flex items-center gap-3 px-5 py-3.5">
                        <Icon size={16} className="shrink-0 text-brand-fill" aria-hidden />
                        <dt className="sr-only">{k as string}</dt>
                        <dd className="text-small font-semibold"><a href={h as string} className="hover:text-brand-fill">{v as string}</a></dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-4 text-[12.5px] text-white/55">Typical first reply within one business day (IST, Mon–Fri).</p>
                {SCHEDULER_URL && (
                  <Button href="/contact?topic=VOVIX+Payroll#schedule" variant="onDark" className="mt-5" track="cta_click" place="payroll_cta">Pick a time on the calendar <ArrowRight size={16} aria-hidden /></Button>
                )}
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
