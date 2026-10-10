import {
  ArrowRight, Calculator, Briefcase, FileStack, Landmark, Cloud, Handshake, BarChart3,
  Search, PenTool, Code2, Plug, FlaskConical, Gauge, X, Check, Mail, Phone, MapPin,
} from "lucide-react";
import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button, Reveal, Section, SectionHead } from "@/components/ui";
import { HeroCanvas } from "@/components/hero-canvas";
import { ProductShowcase } from "@/components/product-showcase";
import { ServiceExplorer } from "@/components/services";
import { PipelineDiagram } from "@/components/pipeline";
import { ContactForm } from "@/components/contact-form";

const PROOF = [
  ["3", "products built and operated in-house"],
  ["40+", "languages read by VOVIX Lens, incl. Indic scripts"],
  ["TallyPrime XML", "plus Excel, JSON and CSV exports from Lens"],
  ["WhatsApp · MT5", "automation delivered where users already work"],
];

const PROCESS = [
  { icon: Search, h: "Discover", p: "Map the current process, systems and data — and where it actually breaks. Including what shouldn't be automated." },
  { icon: PenTool, h: "Architect", p: "Design the workflow, data model, integrations and the thresholds where a person stays in the loop. Scope agreed in writing." },
  { icon: Code2, h: "Engineer", p: "Build in short increments with validation, retries and structured logging from the first commit." },
  { icon: Plug, h: "Integrate", p: "Connect to your real accounting, CRM, database and API endpoints — staging first, then production." },
  { icon: FlaskConical, h: "Validate", p: "Test edge cases, bad inputs and failure paths with your own documents and data before go-live." },
  { icon: Gauge, h: "Operate", p: "Monitoring, alerts and a runbook. We stay on to support it, or hand it over cleanly to your team." },
];

const CONTRAST = [
  ["Inputs", "A clean sample file", "Real documents, every format and language"],
  ["Accuracy", "Looks right, unmeasured", "Confidence per field; low scores routed to a person"],
  ["Logic", "A prompt", "AI combined with deterministic business rules"],
  ["Failure", "Fails silently", "Retries, alerts and a runbook"],
  ["Systems", "Copy-paste the output", "Integrated by API with idempotent, logged writes"],
  ["Ownership", "Locked to a vendor", "Your repository, your documentation"],
];

const PRINCIPLES = [
  "Automation designed around real operational problems",
  "Practical AI integrated with business rules",
  "API-first, integration-friendly architecture",
  "Data quality, validation and exception handling",
  "Observability and operational reliability",
  "Risk-aware system design",
  "Custom and white-label delivery",
  "Built to fit existing workflows",
];

const INDUSTRIES = [
  { icon: Calculator, h: "Accounting & financial operations", p: "Purchase invoice and bank statement processing, TallyPrime posting, GST checks and ledger reconciliation." },
  { icon: Briefcase, h: "Professional services", p: "Client document intake, KYC collection, engagement trackers and report assembly." },
  { icon: FileStack, h: "Back-office & document-heavy teams", p: "Classification, extraction and validation of forms, contracts and statements, with a review queue." },
  { icon: Landmark, h: "Financial technology", p: "Market and filings data pipelines, research delivery, rule-based decision support and audit trails." },
  { icon: Cloud, h: "SaaS businesses", p: "Billing and CRM sync, customer data pipelines, internal admin tools and integration backends." },
  { icon: Handshake, h: "Agencies & technology partners", p: "Headless automation backends and integrations delivered white-label under NDA." },
  { icon: BarChart3, h: "Data-intensive operations", p: "Scheduled ingestion, change monitoring, reconciliation and dashboards a team can trust." },
];

const STACK = [
  ["Backend engineering", "Services and job workers built for correctness under load.", ["Python", "FastAPI", "Node.js", "TypeScript"]],
  ["APIs & webhooks", "Authenticated, rate-limit aware, idempotent integrations.", ["REST", "Webhooks", "OAuth", "Retry queues"]],
  ["Data & storage", "Schemas, indexes and migrations planned up front.", ["PostgreSQL", "MongoDB", "Redis"]],
  ["AI & document processing", "Extraction paired with rules and human review.", ["OCR", "LLM extraction", "Confidence scoring"]],
  ["Workflow orchestration", "Scheduled and event-driven pipelines with backoff.", ["Airflow", "Docker", "Cron & event triggers"]],
  ["Cloud infrastructure", "Containerised services in India-region cloud.", ["AWS · Mumbai", "Encrypted at rest", "TLS"]],
  ["Monitoring & observability", "Know a job failed before your users do.", ["Structured logs", "Run metrics", "Alerting"]],
  ["Financial platforms", "Market data and delivery channels in production.", ["MetaTrader 5", "NSE / BSE data", "WhatsApp", "Telegram"]],
  ["ERP & accounting", "Output that posts cleanly into the books.", ["TallyPrime XML", "Excel", "JSON / CSV"]],
] as const;

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">

        {/* ═══ HERO ═══ */}
        <section className="on-dark relative overflow-hidden bg-navy text-white" aria-labelledby="hero-title">
          <div aria-hidden className="gridfield-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" />
          <div aria-hidden className="absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(9,165,76,0.16),transparent_65%)]" />
          <div aria-hidden className="absolute -bottom-48 left-[-10%] h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(31,243,243,0.07),transparent_65%)]" />

          <div className="shell relative pb-8 pt-14 md:pt-20 lg:flex lg:min-h-[640px] lg:items-center lg:pb-20 lg:pt-16">
            <div className="relative z-[1] lg:max-w-[520px]">
              <p className="rise flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-white/80 [animation-delay:.05s]">
                <span className="brand-rule" aria-hidden /> Automate Your Alpha
              </p>
              <h1 id="hero-title" className="rise mt-6 text-balance text-[clamp(40px,5.4vw,64px)] font-extrabold leading-[1.03] tracking-[-0.038em] [animation-delay:.12s]">
                Intelligence That <span className="text-brand-fill">Automates</span> Business.
              </h1>
              <p className="rise mt-6 max-w-[52ch] text-pretty text-lead text-ink-onspec [animation-delay:.2s]">
                VOVIX engineers intelligent automation, AI-powered document processing, and connected data systems that turn complex business workflows into reliable, scalable operations.
              </p>
              <div className="rise mt-9 flex flex-wrap gap-3 [animation-delay:.28s]">
                <Button href="#products" size="lg">Explore Our Solutions <ArrowRight size={18} aria-hidden /></Button>
                <Button href="/contact" size="lg" variant="onDark">Discuss Your Project</Button>
              </div>
              <ul className="rise mt-9 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55 [animation-delay:.36s]" aria-label="Capabilities">
                {["Workflow automation", "Document intelligence", "Data pipelines", "API integration"].map((c) => (
                  <li key={c} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-brand-fill" aria-hidden />{c}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Canvas: in-flow band under the copy on mobile; full-height background on desktop */}
          <div className="rise relative -mt-2 h-[260px] px-2 pb-6 sm:h-[360px] lg:absolute lg:inset-y-0 lg:left-[48%] lg:right-[1.5%] lg:mt-0 lg:h-auto lg:px-0 lg:pb-0 lg:[mask-image:linear-gradient(to_right,transparent,black_10%)] [animation-delay:.2s]">
            <HeroCanvas className="h-full w-full" />
          </div>
        </section>

        {/* ═══ PROOF STRIP ═══ */}
        <section aria-label="At a glance" className="border-b border-line bg-white">
          <div className="shell"><div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {PROOF.map(([k, v]) => (
              <div key={k} className="bg-white px-4 py-7 sm:px-6">
                <p className="text-[clamp(20px,2.4vw,28px)] font-extrabold tracking-[-0.02em] text-ink">{k}</p>
                <p className="mt-1 text-[13px] leading-snug text-ink-muted">{v}</p>
              </div>
            ))}
          </div></div>
        </section>

        {/* ═══ PRODUCTS ═══ */}
        <Section id="products">
          <SectionHead
            eyebrow="Products"
            title="Three products we engineer, run and maintain."
            lead="Our own software, in production. Each one is a working example of the automation we build for clients — document intelligence, conversational delivery and risk-controlled execution."
          />
          <ProductShowcase />
        </Section>

        {/* ═══ SERVICES ═══ */}
        <Section id="services" tone="sub">
          <SectionHead
            eyebrow="Engineering services"
            title="An engineering partner for the work between your systems."
            lead="Beyond our products, we design and build automation, AI and data systems for businesses, finance teams and technology partners — scoped in writing and engineered to run unattended."
          />
          <ServiceExplorer />
        </Section>

        {/* ═══ AUTOMATION PIPELINE ═══ */}
        <Section id="automation">
          <SectionHead
            center
            eyebrow="Automation, shown"
            title="From Manual Work to Intelligent Workflows."
            lead="Every pipeline we ship has the same backbone: ingest, normalise, validate with AI and rules, reconcile, route exceptions to a person, deliver — and monitor all of it. Pick an example."
          />
          <Reveal><PipelineDiagram /></Reveal>
        </Section>

        {/* ═══ PROCESS ═══ */}
        <Section id="process" tone="sub">
          <SectionHead
            eyebrow="How we work"
            title="Six stages, from first map to steady operation."
            lead="We work to understand existing systems before proposing new ones. The sequence flexes with the project — a single integration doesn't need the ceremony of a multi-system rollout — but the checks never get skipped."
          />
          <ol className="grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS.map((s, i) => (
              <Reveal as="li" key={s.h} delay={i * 0.05} className="group relative bg-white p-5 transition-colors hover:bg-ground-paper sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-control bg-brand-wash text-brand-ink transition-colors group-hover:bg-navy group-hover:text-brand-fill"><s.icon size={20} aria-hidden /></span>
                  <span className="font-mono text-[12px] font-bold text-ink-muted tnum">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-[19px] font-bold tracking-[-0.012em] text-ink">{s.h}</h3>
                <p className="mt-2 text-small leading-relaxed text-ink-secondary">{s.p}</p>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ═══ WHY VOVIX ═══ */}
        <Section id="why" tone="navy" className="overflow-hidden">
          <div aria-hidden className="gridfield-dark pointer-events-none absolute inset-0 -z-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <SectionHead
            dark
            eyebrow="Why VOVIX"
            title="An AI demo and automation a business can run on are different things."
            lead="Most of the engineering in a reliable automation is everything around the model: validation, exception handling, integration and monitoring. That is the part we're built for."
          />
          <Reveal>
            <div className="overflow-hidden rounded-panel border border-white/10">
              <div className="hidden grid-cols-[0.5fr_1fr_1fr] bg-white/[0.04] font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/55 sm:grid">
                <span className="px-6 py-3" />
                <span className="border-l border-white/10 px-6 py-3">Superficial AI demo</span>
                <span className="border-l border-white/10 px-6 py-3 text-brand-onspec">VOVIX automation</span>
              </div>
              {CONTRAST.map(([k, a, b]) => (
                <div key={k} className="grid border-t border-white/10 [&:nth-child(2)]:border-t-0 sm:grid-cols-[0.5fr_1fr_1fr] sm:[&:nth-child(2)]:border-t">
                  <span className="px-4 pb-1 pt-4 text-[13px] font-semibold text-white sm:px-6 sm:py-4">{k}</span>
                  <span className="flex items-start gap-2 px-4 py-1.5 text-[13px] text-white/55 sm:border-l sm:border-white/10 sm:px-6 sm:py-4"><X size={14} className="mt-0.5 shrink-0 text-white/35" aria-label="Demo:" />{a}</span>
                  <span className="flex items-start gap-2 px-4 pb-4 pt-1.5 text-[13px] text-white sm:border-l sm:border-white/10 sm:bg-brand-fill/[0.05] sm:px-6 sm:py-4"><Check size={14} className="mt-0.5 shrink-0 text-brand-onspec" aria-label="VOVIX:" />{b}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 0.04} className="flex gap-3 border-t border-white/10 pt-4">
                <span className="font-mono text-[11px] font-bold text-brand-onspec tnum">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[14px] font-semibold leading-snug text-white/90">{p}</span>
              </Reveal>
            ))}
          </ul>
        </Section>

        {/* ═══ INDUSTRIES ═══ */}
        <Section id="industries">
          <SectionHead
            eyebrow="Use cases"
            title="Where our automation fits."
            lead="The same building blocks — document intelligence, integration, pipelines and monitoring — apply wherever work is repetitive, rule-bound and spread across systems."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {INDUSTRIES.map((x, i) => (
              <Reveal key={x.h} delay={i * 0.04} className={i < 2 ? "lg:col-span-3" : i < 5 ? "lg:col-span-2" : "lg:col-span-3"}>
                <div className="group h-full rounded-card border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-fill/40 hover:shadow-lifted">
                  <x.icon size={22} className="text-brand-ink" aria-hidden />
                  <h3 className="mt-4 text-[17px] font-bold tracking-[-0.01em] text-ink">{x.h}</h3>
                  <p className="mt-2 text-small leading-relaxed text-ink-secondary">{x.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ═══ TECHNICAL CREDIBILITY ═══ */}
        <Section id="stack" tone="sub">
          <SectionHead
            eyebrow="Engineering capabilities"
            title="The stack behind our products and client work."
            lead="Technologies we run in production today — grouped by the job they do, not listed for the sake of logos."
          />
          <div className="grid gap-px overflow-hidden rounded-panel border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {STACK.map(([h, p, t]) => (
              <div key={h} className="bg-white p-6">
                <h3 className="text-[15.5px] font-bold text-ink">{h}</h3>
                <p className="mt-1 text-[13px] text-ink-muted">{p}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.map((x) => <span key={x} className="rounded-chip bg-ground-sub px-2 py-1 font-mono text-[11px] font-semibold text-ink-secondary">{x}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══ CONTACT ═══ */}
        <Section id="contact">
          <div className="relative overflow-hidden rounded-[28px] bg-navy text-white on-dark">
            <div aria-hidden className="gridfield-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
            <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(9,165,76,0.22),transparent_70%)]" />
            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-14">
              <div>
                <p className="flex items-center gap-3 font-mono text-label uppercase text-ink-onspec"><span className="brand-rule" aria-hidden />Start a conversation</p>
                <h2 className="mt-5 text-balance text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
                  Let&rsquo;s Automate What&rsquo;s Slowing Your Business Down.
                </h2>
                <p className="mt-5 text-pretty text-lead text-ink-onspec">
                  Tell us about your workflow, data challenges, or integration requirements. We&rsquo;ll explore a practical engineering solution tailored to your business.
                </p>
                <ul className="mt-8 space-y-3 text-small">
                  <li><a href="mailto:admin@vovix.in" className="inline-flex items-center gap-2.5 font-semibold text-white hover:text-brand-onspec"><Mail size={16} className="text-brand-onspec" aria-hidden />admin@vovix.in</a></li>
                  <li><a href="tel:+919080640562" className="inline-flex items-center gap-2.5 font-semibold text-white hover:text-brand-onspec"><Phone size={16} className="text-brand-onspec" aria-hidden />+91 90806 40562</a></li>
                  <li className="inline-flex items-center gap-2.5 text-white/70"><MapPin size={16} className="text-brand-onspec" aria-hidden />Guduvancheri, Tamil Nadu · working worldwide</li>
                </ul>
                <p className="mt-6 text-[12.5px] text-white/55">Typical first reply within one business day (IST, Mon–Fri).</p>
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
