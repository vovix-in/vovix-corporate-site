import type { Metadata } from "next";
import { Lock, ShieldCheck, GitBranch, Tag, Check, X } from "lucide-react";

const CONTRAST = [
  ["Inputs", "A clean sample file", "Real documents, every format and language"],
  ["Accuracy", "Looks right, unmeasured", "Confidence per field; low scores routed to a person"],
  ["Logic", "A prompt", "AI combined with deterministic business rules"],
  ["Failure", "Fails silently", "Retries, alerts and a runbook"],
  ["Systems", "Copy-paste the output", "Integrated by API with idempotent, logged writes"],
  ["Ownership", "Locked to a vendor", "Your repository, your documentation"],
];
import { PageShell } from "@/components/page-shell";
import { Section, Reveal, SectionHead, BentoCard, Button, Chip } from "@/components/ui";
import { ServiceExplorer } from "@/components/services";
import { AgentOrchestra, AGENT_TYPES } from "@/components/agent-orchestra";
import { ScopeBuilder } from "@/components/scope-builder";

export const metadata: Metadata = {
  title: "Services — Workflow Automation, AI Document Processing & Data Engineering",
  description: "Business workflow automation, AI document intelligence, data pipelines, API integration, web data monitoring, custom internal tools and white-label automation engineering from VOVIX.",
  alternates: { canonical: "/services" },
};

const COMMITMENTS = [
  { i: Lock, h: "A mutual NDA comes first", p: "Signed before you send us anything identifiable — not after the scope call. It covers your client's name, the project, your pricing, and the fact that you work with us at all. Our involvement is confidential in both directions." },
  { i: ShieldCheck, h: "Zero contact with your client", p: "We do not email, call, market to, or solicit your client — during the engagement or after it. If one of them approaches us directly, we route them back to you. That sits in the agreement with a non-solicitation clause, not in a sales call." },
  { i: GitBranch, h: "The IP is yours on creation", p: "Work made for hire: ownership passes as the code is written, not on final payment. It lands in your repository as we go, so there is never a moment where finished work is held against an invoice." },
  { i: Tag, h: "Nothing carries our name", p: "Unbranded deliverables: no VOVIX marks in the code, the documentation, the dashboards, or the runbook. We publish no case study, name no partner, and use no logo — unless you give us that permission in writing." },
];

const STAGES = [
  ["01", "NDA, then intake", "We sign the mutual NDA first. Then you send the requirement — redact the client's name if you'd rather; we don't need it to estimate."],
  ["02", "Scope & estimate", "A written scope with the assumptions stated, and our cost to you. What you charge your client is your business — we never ask and never advise on it."],
  ["03", "Build in sprints", "Weekly written updates drafted so you can forward them to your client as your own, with nothing to rewrite or redact."],
  ["04", "We QA it first", "Tested on our side before it reaches you. You should never be the one who discovers the bug in front of your client."],
  ["05", "Unbranded handoff", "Code in your repository, documentation and runbooks in your voice and branding, ready to pass on without an editing pass."],
  ["06", "Support or clean exit", "Keep us on retainer, or we step away: credentials transferred, knowledge handed over, your client's data deleted on our side and certified."],
];

export default function Services() {
  return (
    <PageShell
      eyebrow="Engineering services"
      title="Automation, AI and data systems, engineered to run unattended."
      lead="Seven ways we work with businesses, finance teams and technology partners — direct, or white-label behind your brand under NDA. Every engagement starts with a written scope, including the parts we'd advise you not to build yet."
      actions={<><Button href="/contact" size="lg">Discuss Your Project</Button><Button href="#estimate" size="lg" variant="secondary">Estimate a timeline</Button></>}
    >
      <Section id="capabilities">
        <SectionHead eyebrow="What we build" title="Problem, approach, outcome — for each service." lead="Choose a service to see the business problem it addresses, how we engineer it, and what changes once it's running." />
        <ServiceExplorer />
      </Section>

      <Section id="agents" tone="sub">
        <SectionHead
          eyebrow="AI agents"
          title="Agents that do the work, not just answer questions."
          lead="A chatbot replies. An agent reads the document, checks it against your ledger, posts the entry, and escalates the one case it isn't sure about. Here are four working on one job at once."
        />
        <Reveal><AgentOrchestra /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {AGENT_TYPES.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.05}>
              <BentoCard className="h-full">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><a.icon size={20} aria-hidden /></span>
                  <Chip>{a.chip}</Chip>
                </div>
                <h3 className="text-[17px] font-bold tracking-[-0.01em] text-ink">{a.name}</h3>
                <p className="mt-2 text-small leading-relaxed text-ink-secondary">{a.body}</p>
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="white-label-partners">
        <div className="mb-12 text-center">
          <Reveal>
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
              <p className="eyebrow">For agencies, studios &amp; consultancies</p>
              <Chip live>Under NDA</Chip>
            </div>
            <h2 className="text-h2 text-ink">White-label delivery</h2>
            <p className="mx-auto mt-4 max-w-[62ch] text-lead text-ink-secondary">
              You keep the client, the brand, and the margin. We build behind you and stay invisible — no VOVIX name on the work, no contact with your client, ever.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {COMMITMENTS.map((c, i) => (
            <Reveal key={c.h} delay={i * 0.06}>
              <BentoCard className="h-full">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-control bg-ground-sunken text-ink"><c.i size={21} /></div>
                <h3 className="text-[18px] font-bold tracking-[-0.012em] text-ink">{c.h}</h3>
                <p className="mt-2.5 text-small leading-relaxed text-ink-secondary">{c.p}</p>
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="sub">
        <SectionHead eyebrow="The process" title="How a partner engagement runs" lead="Six stages. You stay the only voice your client hears at every one of them." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STAGES.map(([n, h, p], i) => (
            <Reveal key={n} delay={i * 0.05}>
              <div className="h-full rounded-card border border-line bg-ground-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-fill/40 hover:shadow-lifted">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-brand-fill/30 bg-gradient-to-br from-brand-wash to-cyan-wash font-mono text-[12px] font-bold text-brand-ink">{n}</span>
                <h3 className="mt-4 text-[16px] font-bold tracking-[-0.01em] text-ink">{h}</h3>
                <p className="mt-2 text-small leading-relaxed text-ink-secondary">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">Engagement models</p>
            <h3 className="mb-5 text-[20px] font-bold tracking-[-0.015em] text-ink">Three ways to work with us</h3>
            <div className="space-y-3">
              {[["Project","One defined build, fixed written scope. Best for a first engagement, when neither side has worked with the other yet."],
                ["Retainer","A reserved block of build time each month for a steady backlog across several of your clients."],
                ["Hybrid","A retainer for ongoing work with larger builds quoted separately. Where most partnerships settle once a rhythm is established."]].map(([h,p]) => (
                <div key={h} className="flex gap-2.5">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-ink" />
                  <p className="text-small text-ink-secondary"><strong className="font-semibold text-ink">{h}</strong> — {p}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow mb-3">Before you ask</p>
            <h3 className="mb-5 text-[20px] font-bold tracking-[-0.015em] text-ink">What we won&rsquo;t do</h3>
            <div className="space-y-3">
              {["Take a partner engagement we can't properly staff. We hold a limited number of partner slots at a time — you'll get a date or a no, not a maybe.",
                "Pretend white-labelling fixes an unclear brief. If the requirement is vague it will fail under your brand rather than ours, so we'll say so before you commit to your client.",
                "Quote your client, sit on your calls unannounced, or ask what your margin is."].map((p) => (
                <div key={p} className="flex gap-2.5">
                  <X size={16} className="mt-0.5 shrink-0 text-state-crit" />
                  <p className="text-small text-ink-secondary">{p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-12 text-center">
          <Button href="/contact" size="lg">Start a partner conversation</Button>
          <p className="mt-4 text-small text-ink-muted">Send the requirement and we&rsquo;ll return the NDA first. Typical first reply within one business day (IST, Mon–Fri).</p>
        </Reveal>
      </Section>
      <Section id="why" tone="navy">
        <SectionHead dark eyebrow="Why VOVIX" title="An AI demo and automation a business can run on are different things."
          lead="Most of the engineering in a reliable automation is everything around the model: validation, exception handling, integration and monitoring." />
        <Reveal>
          <div className="overflow-hidden rounded-panel border border-white/10">
            <div className="hidden grid-cols-[0.5fr_1fr_1fr] bg-white/[0.04] font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-white/55 sm:grid">
              <span className="px-6 py-3" /><span className="border-l border-white/10 px-6 py-3">Superficial AI demo</span><span className="border-l border-white/10 px-6 py-3 text-brand-fill">VOVIX automation</span>
            </div>
            {CONTRAST.map(([k, a, b]) => (
              <div key={k} className="grid border-t border-white/10 [&:nth-child(2)]:border-t-0 sm:grid-cols-[0.5fr_1fr_1fr] sm:[&:nth-child(2)]:border-t">
                <span className="px-4 pb-1 pt-4 text-[13px] font-semibold text-white sm:px-6 sm:py-4">{k}</span>
                <span className="flex items-start gap-2 px-4 py-1.5 text-[13px] text-white/55 sm:border-l sm:border-white/10 sm:px-6 sm:py-4"><X size={14} className="mt-0.5 shrink-0 text-white/35" aria-label="Demo:" />{a}</span>
                <span className="flex items-start gap-2 px-4 pb-4 pt-1.5 text-[13px] text-white sm:border-l sm:border-white/10 sm:bg-brand-fill/[0.05] sm:px-6 sm:py-4"><Check size={14} className="mt-0.5 shrink-0 text-brand-fill" aria-label="VOVIX:" />{b}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section id="estimate" tone="sub">
        <SectionHead
          eyebrow="Scope builder"
          title="Roughly what would this take?"
          lead="Pick what you're building and what it has to connect to. You get a timeline range and a phase breakdown — not a price, because a number nobody can stand behind helps neither of us."
        />
        <Reveal><ScopeBuilder /></Reveal>
      </Section>
    </PageShell>
  );
}
