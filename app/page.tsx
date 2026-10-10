import {
  ArrowRight, Check, Search, PenTool, Code2, Plug, FlaskConical, Gauge,
  Calculator, Briefcase, FileStack, Landmark, Cloud, Handshake, Server, Lock, UserCheck, GitBranch, Mail, Phone, MapPin,
} from "lucide-react";
import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button, Reveal, Section, SectionHead } from "@/components/ui";
import { HeroProduct } from "@/components/hero-product";
import { PlatformDiagram } from "@/components/platform-diagram";
import { ProductShowcase } from "@/components/product-showcase";
import { PipelineDiagram } from "@/components/pipeline";
import { ContactForm } from "@/components/contact-form";
import { Faq, FAQ } from "@/components/faq";

/* Homepage — built from the Figma file "VOVIX Website — v4 Redesign"
   (page 01 Homepage — Desktop 1440 / 02 Mobile 390).
   Section order follows the category research: product-led hero,
   ecosystem strip, platform framing, products, services, process,
   engineering + security proof, use cases, FAQ, closing CTA.          */

const WORKS_WITH = ["TallyPrime", "Excel", "WhatsApp Business", "MetaTrader 5", "Telegram", "Gmail & Outlook", "AWS", "PostgreSQL", "MongoDB", "REST APIs & webhooks"];

const BENTO = [
  { n: "01", id: "workflow", h: "Business Workflow Automation", p: "Approvals, reconciliation, document handling and scheduled jobs that run themselves — with retries, idempotent writes and explicit approval steps where a person must decide.", t: ["Event triggers", "Scheduled jobs", "Approval routing", "Audit trail"], span: "lg:col-span-3" },
  { n: "02", id: "ai-docs", h: "AI Engineering & Document Intelligence", p: "Extraction, classification and validation with confidence thresholds and a human review queue — the architecture behind VOVIX Lens.", t: ["OCR · 40+ languages", "Rule validation", "Review queue"], span: "lg:col-span-3" },
  { n: "03", id: "data", h: "Data Engineering & Pipelines", p: "Ingestion, transformation, reconciliation and delivery with schema checks and lineage.", t: ["Orchestration", "Reconciliation"], span: "lg:col-span-2" },
  { n: "04", id: "api", h: "API Development & Integration", p: "CRMs, payment gateways, accounting platforms and databases kept in agreement.", t: ["REST", "Webhooks", "TallyPrime"], span: "lg:col-span-2" },
  { n: "05", id: "ingest", h: "Web Data Ingestion & Monitoring", p: "Scoped, rate-limited collection with change detection, retries and alerts.", t: ["Change detection", "Alerting"], span: "lg:col-span-2" },
  { n: "06", id: "tools", h: "Custom Software & Internal Tools", p: "Dashboards, operational interfaces and purpose-built applications your team owns and understands.", t: ["Next.js · React", "Python · FastAPI", "PostgreSQL"], span: "lg:col-span-3" },
  { n: "07", id: "white-label", h: "White-Label Automation Infrastructure", p: "Headless backends, pipelines and integrations delivered unbranded under mutual NDA — you keep the client, the brand and the margin.", t: ["Under NDA", "IP assigned at creation", "Unbranded runbooks"], span: "lg:col-span-3", dark: true },
];

const PROCESS = [
  { i: Search, h: "Discover", p: "Map the process, systems and data — and what shouldn't be automated." },
  { i: PenTool, h: "Architect", p: "Workflow, data model and human-in-the-loop thresholds, scoped in writing." },
  { i: Code2, h: "Engineer", p: "Short increments with validation, retries and logging from day one." },
  { i: Plug, h: "Integrate", p: "Your real Tally, CRM, database and APIs — staging first." },
  { i: FlaskConical, h: "Validate", p: "Edge cases and bad inputs, tested with your own documents." },
  { i: Gauge, h: "Operate", p: "Monitoring, alerts and a runbook. Support, or a clean handover." },
];

const SECURITY = [
  { i: Server, h: "Hosted in India", p: "VOVIX Lens runs on AWS in the Mumbai region, isolated per firm." },
  { i: Lock, h: "Encrypted", p: "AES-256 at rest and TLS in transit." },
  { i: UserCheck, h: "Human in the loop", p: "Low-confidence fields go to review; every action lands in an audit trail." },
  { i: GitBranch, h: "Your code, your repo", p: "Client builds land in your repository under NDA, IP assigned as it's written." },
];

const USE_CASES = [
  { i: Calculator, h: "Accounting & finance operations", p: "Purchase invoice and bank statement processing, TallyPrime posting, GST checks and ledger reconciliation." },
  { i: Briefcase, h: "Professional services", p: "Client document intake, KYC collection, engagement trackers and report assembly." },
  { i: FileStack, h: "Back-office & document-heavy teams", p: "Classification, extraction and validation of forms, contracts and statements, with a review queue." },
  { i: Landmark, h: "Financial technology", p: "Filings and market-data pipelines, research delivery, rule-based decision support and audit trails." },
  { i: Cloud, h: "SaaS businesses", p: "Billing and CRM sync, customer data pipelines, internal admin tools and integration backends." },
  { i: Handshake, h: "Agencies & technology partners", p: "Headless automation backends and integrations delivered white-label under NDA." },
];

const faqLd = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Navbar />
      <main id="main">

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden bg-ground-sub" aria-labelledby="hero-title">
          <div aria-hidden className="dotfield absolute inset-0 [mask-image:radial-gradient(ellipse_at_75%_30%,black,transparent_70%)]" />
          <div aria-hidden className="absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(9,165,76,0.10),transparent_65%)]" />
          <div className="shell relative grid items-center gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
            <div>
              <div className="rise flex items-center gap-3">
                <span className="brand-rule-light" aria-hidden />
                <p className="eyebrow">IT automation · AI engineering · Data systems</p>
              </div>
              <h1 id="hero-title" className="rise mt-6 text-balance text-[clamp(40px,5.4vw,68px)] font-semibold leading-[1.04] tracking-[-0.038em] text-ink [animation-delay:.08s]">
                Intelligence that <span className="text-brand-fill">automates</span> business.
              </h1>
              <p className="rise mt-6 max-w-[54ch] text-pretty text-lead font-normal text-ink-secondary [animation-delay:.16s]">
                VOVIX engineers intelligent automation, AI-powered document processing and connected data systems that turn complex business workflows into reliable, scalable operations.
              </p>
              <div className="rise mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:.24s]">
                <Button href="#products" size="lg">Explore Our Solutions <ArrowRight size={18} aria-hidden /></Button>
                <Button href="/contact" size="lg" variant="secondary">Discuss Your Project</Button>
              </div>
              <ul className="rise mt-9 space-y-2.5 [animation-delay:.32s]">
                {["Written scope before any build", "First reply within one business day", "White-label delivery under mutual NDA"].map((x) => (
                  <li key={x} className="flex items-center gap-2.5 text-small text-ink-secondary"><Check size={16} className="text-brand-ink" aria-hidden />{x}</li>
                ))}
              </ul>
            </div>
            <div className="rise [animation-delay:.2s]"><HeroProduct /></div>
          </div>
        </section>

        {/* ═══ WORKS WITH ═══ */}
        <section id="works-with" aria-label="Works with" className="border-y border-line bg-white">
          <div className="shell flex flex-col gap-4 py-7 lg:flex-row lg:items-center lg:gap-10">
            <p className="shrink-0 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-muted lg:w-[190px]">Works with the systems you already run</p>
            <ul className="flex flex-wrap gap-2.5">
              {WORKS_WITH.map((w) => (
                <li key={w} className="rounded-full border border-line-strong bg-white px-3.5 py-1.5 font-mono text-[12px] text-ink-secondary">{w}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ═══ PLATFORM ═══ */}
        <Section id="platform" tone="navy" className="overflow-hidden">
          <div aria-hidden className="gridfield-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
          <div className="relative mb-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <SectionHead dark className="!mb-0" eyebrow="The VOVIX platform" title="One automation engine. Three products. Your custom builds." />
            <Reveal><p className="text-pretty text-lead text-ink-onspec">Every VOVIX system runs on the same backbone — ingest, understand, validate, deliver and monitor. Our products prove it in production; your workflows get the same engineering.</p></Reveal>
          </div>
          <Reveal><PlatformDiagram /></Reveal>
        </Section>

        {/* ═══ PRODUCTS ═══ */}
        <Section id="products">
          <SectionHead eyebrow="Products" title="Three products we engineer, run and maintain."
            lead="Our own software, in production — each one a working example of the automation we build for clients." />
          <ProductShowcase />
        </Section>

        {/* ═══ SERVICES BENTO ═══ */}
        <Section id="services" tone="sub">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead className="!mb-0" eyebrow="Engineering services" title="An engineering partner for the work between your systems."
              lead="Beyond our products, we design and build automation, AI and data systems — scoped in writing and engineered to run unattended." />
            <Reveal><Button href="/services" variant="secondary">All services</Button></Reveal>
          </div>
          <div className="grid gap-4 lg:grid-cols-6">
            {BENTO.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.04} className={b.span}>
                <a href={`/services#${b.id}`} className={`group flex h-full flex-col rounded-[20px] border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lifted ${
                  b.dark ? "on-dark border-navy bg-navy text-white" : "border-line bg-white hover:border-brand-fill/40"}`}>
                  <span className={`font-mono text-[12px] font-bold ${b.dark ? "text-brand-fill" : "text-brand-ink"}`}>{b.n}</span>
                  <h3 className={`mt-3 text-[21px] font-semibold leading-snug tracking-[-0.015em] ${b.dark ? "text-white" : "text-ink"}`}>{b.h}</h3>
                  <p className={`mt-3 text-small leading-relaxed ${b.dark ? "text-ink-onspec" : "text-ink-secondary"}`}>{b.p}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {b.t.map((t) => <span key={t} className={`rounded-chip px-2 py-1 font-mono text-[11px] ${b.dark ? "bg-white/[0.07] text-ink-onspec" : "bg-ground-sub text-ink-secondary"}`}>{t}</span>)}
                  </div>
                  <span className={`mt-5 inline-flex items-center gap-1.5 text-small font-semibold ${b.dark ? "text-brand-fill" : "text-brand-ink"}`}>
                    Learn more <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ═══ AUTOMATION PIPELINE ═══ */}
        <Section id="automation">
          <SectionHead center eyebrow="Automation, shown" title="From manual work to intelligent workflows."
            lead="Ingest, normalise, validate with AI and rules, reconcile, route exceptions to a person, deliver — and monitor all of it. Pick an example." />
          <Reveal><PipelineDiagram /></Reveal>
        </Section>

        {/* ═══ HOW WE WORK ═══ */}
        <Section id="process" tone="sub">
          <SectionHead eyebrow="How we work" title="From first map to steady operation."
            lead="The sequence flexes with the project — a single integration doesn't need the ceremony of a multi-system rollout — but the checks never get skipped." />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.h} delay={i * 0.05} className="relative lg:pr-6">
                <div className="flex items-center">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${i === 0 ? "bg-navy text-brand-fill" : "bg-brand-wash text-brand-ink"}`}><s.i size={19} aria-hidden /></span>
                  {i < PROCESS.length - 1 && <span aria-hidden className="ml-3 hidden h-px flex-1 bg-line-strong lg:block" />}
                </div>
                <p className="mt-5 font-mono text-[11px] font-bold text-ink-muted">0{i + 1}</p>
                <h3 className="mt-1 text-[18px] font-semibold text-ink">{s.h}</h3>
                <p className="mt-2 text-small leading-relaxed text-ink-secondary">{s.p}</p>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ═══ ENGINEERS + SECURITY ═══ */}
        <Section id="security">
          <div className="grid gap-5 lg:grid-cols-2 [&>*]:min-w-0">
            <Reveal className="on-dark flex flex-col rounded-[24px] bg-navy p-7 text-white sm:p-10">
              <div className="flex items-center gap-3"><span className="brand-rule" aria-hidden /><p className="eyebrow-dark">For engineers</p></div>
              <h2 className="mt-5 text-[clamp(24px,2.6vw,30px)] font-semibold leading-tight tracking-[-0.025em]">Structured output your systems can trust.</h2>
              <p className="mt-3 text-small text-ink-onspec">Every field carries its value, confidence and source. Anything below threshold is held — never silently posted.</p>
              <pre className="mt-6 overflow-x-auto rounded-card bg-navy-raised p-5 font-mono text-[12px] leading-[1.7] text-ink-onspec"><code>
<span className="text-brand-fill">POST</span>{` /webhooks/lens  · document.extracted
{
  "document_id": "inv_0914",
  "supplier": { "value": "Sundaram Traders", "confidence": 0.98 },
  "gstin":    { "value": "33AAGCS4321F1Z8", "valid": true },
  "totals":   { "taxable": 49500.00, "tax": 8910.00 },
  "review":   [{ "field": "place_of_supply", "confidence": 0.84 }],
  "export":   { "tally_xml": "ready", "balanced": true }
}`}</code></pre>
              <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/50">Illustrative payload</p>
            </Reveal>
            <Reveal delay={0.08} className="rounded-[24px] border border-line bg-white p-7 sm:p-10">
              <div className="flex items-center gap-3"><span className="brand-rule-light" aria-hidden /><p className="eyebrow">Security & data handling</p></div>
              <h2 className="mt-5 text-[clamp(24px,2.6vw,30px)] font-semibold leading-tight tracking-[-0.025em] text-ink">Facts, not badges.</h2>
              <ul className="mt-6 divide-y divide-line">
                {SECURITY.map((s) => (
                  <li key={s.h} className="flex gap-4 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><s.i size={18} aria-hidden /></span>
                    <span>
                      <span className="block text-[16px] font-semibold text-ink">{s.h}</span>
                      <span className="block text-small text-ink-secondary">{s.p}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        {/* ═══ USE CASES ═══ */}
        <Section id="use-cases" tone="sub">
          <SectionHead eyebrow="Use cases" title="Where our automation fits."
            lead="The same building blocks apply wherever work is repetitive, rule-bound and spread across systems." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((u, i) => (
              <Reveal key={u.h} delay={i * 0.04}>
                <div className="h-full rounded-card border border-line bg-white p-6">
                  <u.i size={22} className="text-brand-ink" aria-hidden />
                  <h3 className="mt-4 text-[17px] font-semibold text-ink">{u.h}</h3>
                  <p className="mt-2 text-small leading-relaxed text-ink-secondary">{u.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ═══ FAQ ═══ */}
        <Section id="faq">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
            <SectionHead className="!mb-0" eyebrow="FAQ" title="Questions we hear first." />
            <Reveal><Faq /></Reveal>
          </div>
        </Section>

        {/* ═══ CLOSING CTA ═══ */}
        <Section id="contact" className="!pt-4">
          <div className="on-dark relative overflow-hidden rounded-[28px] bg-navy text-white">
            <div aria-hidden className="gridfield-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
            <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(9,165,76,0.22),transparent_70%)]" />
            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
              <div>
                <div className="flex items-center gap-3"><span className="brand-rule" aria-hidden /><p className="eyebrow-dark">Start a conversation</p></div>
                <h2 className="mt-5 text-balance text-[clamp(30px,3.8vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em]">Let&rsquo;s automate what&rsquo;s slowing your business down.</h2>
                <p className="mt-5 text-pretty text-lead font-normal text-ink-onspec">Bring one real workflow — or one real invoice. We&rsquo;ll show you what automating it looks like, and say so honestly if it isn&rsquo;t a fit.</p>
                <dl className="mt-8 divide-y divide-white/10 overflow-hidden rounded-card border border-white/10 bg-white/[0.03]">
                  {[[Mail, "Email", "admin@vovix.in", "mailto:admin@vovix.in"], [Phone, "Phone", "+91 90806 40562", "tel:+919080640562"], [MapPin, "Office", "Guduvancheri, Tamil Nadu · working worldwide", ""]].map(([I, k, v, h]) => {
                    const Icon = I as typeof Mail;
                    return (
                      <div key={k as string} className="flex items-center gap-3 px-5 py-3.5">
                        <Icon size={16} className="shrink-0 text-brand-fill" aria-hidden />
                        <dt className="sr-only">{k as string}</dt>
                        <dd className="text-small font-semibold">{h ? <a href={h as string} className="hover:text-brand-fill">{v as string}</a> : <span className="text-white/75">{v as string}</span>}</dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-4 text-[12.5px] text-white/55">Typical first reply within one business day (IST, Mon–Fri).</p>
              </div>
              <div className="rounded-panel border border-white/10 bg-white/[0.04] p-5 sm:p-7">
                <ContactForm dark />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
