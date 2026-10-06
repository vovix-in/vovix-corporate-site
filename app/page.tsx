import {
  ScanLine, TrendingUp, MessageSquare, ShieldCheck, Globe, LayoutDashboard,
  Workflow, Palette, ArrowRight, Check, Mail,
} from "lucide-react";
import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button, Chip, Reveal, Section, SectionHead, BentoCard } from "@/components/ui";
import { ExtractionViewer, SignalStream } from "@/components/hero-visuals";
import { ScopeBuilder } from "@/components/scope-builder";

const PRODUCTS = [
  {
    icon: ScanLine, tint: "bg-[#FDF2E3] text-[#B45309]", span: "lg:col-span-2",
    kicker: "Document intelligence · Live", name: "Vovix Lens",
    body: "Invoices, bank statements and KYC records read once — every line item, table and tax breakup — then posted into TallyPrime, your ERP or Excel.",
    bullets: ["Any format, any language — photo, scan or PDF. No templates.", "GSTIN validation and tax-field intelligence built in", "Low-confidence fields flagged for a human before anything posts"],
    chip: "Every value links to its source page",
    cta: { l: "Open Vovix Lens", href: "https://lens.vovix.in/", ext: true },
  },
  {
    icon: TrendingUp, tint: "bg-[#E8F2FE] text-[#0071E3]", span: "",
    kicker: "Market engine · Beta", name: "Vovix Edge",
    body: "A decision-support engine for MetaTrader 5 built around a strict quality gate — most candidate setups are rejected by design.",
    bullets: ["Every signal sized to the account", "Kill switch and daily limits", "Shows nothing when conditions don't qualify"],
    chip: "Knows when not to trade",
    cta: { l: "Learn more", href: "/products#edge" },
  },
  {
    icon: MessageSquare, tint: "bg-brand-wash text-brand-ink", span: "",
    kicker: "Conversational delivery · Live", name: "Vovix OneView",
    body: "Equity research that runs entirely inside WhatsApp. Type an NSE or BSE ticker, get a structured report back — no app to install.",
    bullets: ["Fundamentals and technicals in one report", "Follow-ups answered in full context", "A workflow living where users already are"],
    chip: "Zero install · WhatsApp native",
    cta: { l: "Learn more", href: "/products#oneview" },
  },
  {
    icon: ShieldCheck, tint: "bg-[#EEF1F6] text-ink", span: "lg:col-span-2",
    kicker: "How we handle your data and your clients", name: "Built to be handed over",
    body: "Mutual NDA before anything identifiable is shared. IP assigned as it's written, into your repository. Nothing we build carries our name unless you put it there.",
    bullets: ["Work made for hire — ownership passes at creation, not on payment", "Non-solicitation: we never contact your client, during or after", "Human-in-the-loop wherever a wrong automated call would cost you"],
    chip: "Under NDA · IP yours at creation",
    cta: { l: "How white-label works", href: "/services#white-label" },
  },
];

const PILLARS = [
  { icon: Globe, name: "Web platforms & portals", body: "Marketing sites and enterprise portals that load fast on a bad connection and stay editable by your team.", stack: ["Next.js", "TypeScript", "Tailwind", "Headless CMS"] },
  { icon: LayoutDashboard, name: "SaaS & dashboard engineering", body: "Multi-tenant apps, real-time charts, and the unglamorous state management that keeps them correct under load.", stack: ["React", "Node", "PostgreSQL", "Redis"] },
  { icon: Workflow, name: "AI agents & ERP automation", body: "Document pipelines, Tally and ERP integrations, WhatsApp delivery, scheduled jobs with real error recovery.", stack: ["Python", "FastAPI", "Airflow", "Docker"] },
  { icon: Palette, name: "Design systems in Figma", body: "Token-driven component libraries that survive contact with a second developer — like the one this site is built from.", stack: ["Figma", "Tokens Studio", "Storybook"] },
];

const STEPS = [
  { n: "01", h: "Written scope first", p: "We map the real requirement, name what we'd advise against, and put the whole thing in writing before a line of code. No verbal commitments." },
  { n: "02", h: "Build with the checks in", p: "Validation, retries, monitoring and human approval steps engineered from day one — not bolted on after the first incident." },
  { n: "03", h: "Hand it over properly", p: "Your repository, your branding, schema documentation and a runbook your team can operate without calling us." },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">

        {/* ── Hero ── */}
        <section className="dotfield relative overflow-hidden border-b border-line bg-gradient-to-b from-ground-sub to-ground-paper">
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-56 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(0,200,83,0.11),transparent_68%)]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-52 -left-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.09),transparent_68%)]" />
          <div className="shell relative grid items-center gap-14 py-16 md:py-20 lg:grid-cols-[1fr_1.05fr]">
            <div className="animate-[fadeUp_.5s_cubic-bezier(.16,1,.3,1)_both]">
              <p className="eyebrow mb-4">Enterprise software engineering · India, working worldwide</p>
              <h1 className="text-balance text-[clamp(34px,5.2vw,56px)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink">
                We build enterprise platforms — and run three of our own.
              </h1>
              <p className="mt-6 max-w-[54ch] text-lead text-ink-secondary">
                Custom web platforms, SaaS dashboards and automation pipelines for teams who need them to hold up under real load. The same engineering runs Vovix Lens, Edge and OneView in production — so you can inspect our work before you commission any.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#start" size="lg">Start your project <ArrowRight size={18} /></Button>
                <Button href="#products" size="lg" variant="secondary">See what we&rsquo;ve built</Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                <Chip>Written scope before we build</Chip>
                <Chip>White-label under NDA</Chip>
                <Chip>You own the code and the runbook</Chip>
                <Chip live>3 products live in production</Chip>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 animate-[fadeUp_.5s_cubic-bezier(.16,1,.3,1)_.1s_both]">
              <ExtractionViewer />
              <SignalStream />
            </div>
          </div>
        </section>

        {/* ── Products ── */}
        <Section id="products">
          <SectionHead
            eyebrow="Engineered by Vovix"
            title="Three products we built, run and maintain"
            lead="Not a portfolio of client logos — software of our own, live and in use. It is the fastest way to judge how we engineer before you hand us anything."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06} className={p.span}>
                <BentoCard className="flex h-full flex-col">
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-control ${p.tint}`}>
                    <p.icon size={22} />
                  </div>
                  <p className="eyebrow mb-1.5">{p.kicker}</p>
                  <h3 className="text-h3 text-ink">{p.name}</h3>
                  <p className="mt-2.5 text-small leading-relaxed text-ink-secondary">{p.body}</p>
                  <ul className="mt-4 space-y-2">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-[13px] leading-snug text-ink-secondary">
                        <Check size={14} className="mt-px shrink-0 text-brand-ink" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <Chip className="mb-4">{p.chip}</Chip>
                    <a href={p.cta.href} {...(p.cta.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                       className="group/l flex items-center gap-1.5 text-small font-bold text-brand-ink">
                      {p.cta.l}
                      <ArrowRight size={15} className="transition-transform group-hover/l:translate-x-1" />
                    </a>
                  </div>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Services ── */}
        <Section id="services" alt>
          <SectionHead
            eyebrow="Client engineering"
            title="What we build for you"
            lead="The products above are the proof. This is the work — scoped in writing, built with the checks in, and handed over so your team owns it."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <BentoCard className="h-full">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-control bg-brand-wash text-brand-ink">
                    <p.icon size={22} />
                  </div>
                  <h3 className="text-[19px] font-bold tracking-[-0.012em] text-ink">{p.name}</h3>
                  <p className="mt-2.5 text-small leading-relaxed text-ink-secondary">{p.body}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-chip border border-line bg-ground-sub px-2 py-1 font-mono text-[10.5px] font-semibold text-ink-muted">{s}</span>
                    ))}
                  </div>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Process ── */}
        <Section id="process">
          <SectionHead eyebrow="How we work" title="Three steps, and one of them is saying no" />
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="h-full rounded-card border border-line bg-ground-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-fill/40 hover:shadow-lifted">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-brand-fill/30 bg-gradient-to-br from-brand-wash to-cyan-wash font-mono text-[13px] font-bold text-brand-ink">{s.n}</span>
                  <h3 className="mt-5 text-[17px] font-bold tracking-[-0.01em] text-ink">{s.h}</h3>
                  <p className="mt-2 text-small leading-relaxed text-ink-secondary">{s.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Scope builder ── */}
        <Section id="estimate" alt>
          <SectionHead
            eyebrow="Scope builder"
            title="Roughly what would this take?"
            lead="Pick what you're building and what it has to connect to. You get a timeline range and a phase breakdown — not a price, because a number nobody can stand behind helps neither of us."
          />
          <Reveal><ScopeBuilder /></Reveal>
        </Section>

        {/* ── CTA ── */}
        <Section id="start">
          <Reveal>
            <div className="relative overflow-hidden rounded-panel border-[1.5px] border-brand-fill/25 bg-gradient-to-br from-brand-wash via-ground-paper to-cyan-wash p-10 md:p-14">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,200,83,0.14),transparent_70%)]" />
              <div className="relative grid items-center gap-9 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <p className="eyebrow mb-3">Let&rsquo;s build it right</p>
                  <h2 className="text-balance text-[clamp(26px,3.6vw,34px)] font-[750] leading-tight tracking-[-0.025em] text-ink">
                    Have a project in mind?
                  </h2>
                  <p className="mt-4 max-w-[52ch] text-lead text-ink-secondary">
                    Tell us what you&rsquo;re building and what&rsquo;s in the way. You&rsquo;ll get a straight answer on feasibility, a timeline, and what a first delivery slice looks like — or an honest “not a fit”.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button href="mailto:admin@vovix.in?subject=Project%20enquiry%20-%20vovix.in" size="lg">
                      <Mail size={17} /> Start the conversation
                    </Button>
                    <Button href="/services#white-label" size="lg" variant="secondary">I&rsquo;m an agency</Button>
                  </div>
                </div>
                <div className="space-y-3 rounded-card border border-line bg-white/70 p-6 backdrop-blur">
                  {[
                    ["Reply time", "One business day · IST Mon–Fri"],
                    ["First deliverable", "A written scope, before any build"],
                    ["Engagement", "Direct, or white-label behind your brand"],
                    ["Where we are", "Guduvancheri, Tamil Nadu · remote worldwide"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-line pb-3 last:border-0 last:pb-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">{k}</p>
                      <p className="mt-0.5 text-small font-semibold text-ink">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

      </main>
      <Footer />
    </>
  );
}
