import type { Metadata } from "next";
import { Building2, Package, Calendar, Globe } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section, Reveal, SectionHead, Chip } from "@/components/ui";

export const metadata: Metadata = {
  title: "About | Vovix Private Limited",
  description: "Vovix Private Limited — a founder-led enterprise software company in Tamil Nadu building platforms, automation and its own products.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <PageShell eyebrow="Company profile" title="About Vovix"
      lead="Enterprise platforms, automation and data systems for ambitious teams. Registered in Tamil Nadu, working with companies worldwide.">
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-3">Who we are</p>
            <h2 className="mb-5 text-h2 text-ink">Founder-led, deliberately small</h2>
            <div className="space-y-4 text-lead text-ink-secondary">
              <p>Vovix Private Limited builds software that automates operational work and supports the decisions around it, for teams globally. <strong className="text-ink">The company commenced operations in 2026.</strong></p>
              <p><strong className="text-ink">Who we want to work with:</strong> finance teams, SaaS companies and SMEs that need stable automation without vaporware — and agencies and studios, where we build under your brand and under NDA.</p>
              <p>Discovery, engineering and delivery go through the same small team. There are no separate &ldquo;Leadership&rdquo;, &ldquo;Engineering&rdquo; and &ldquo;Customer Success&rdquo; departments on paper. When we outgrow that model, we&rsquo;ll say so here.</p>
            </div>
            <div className="mt-8 rounded-card border border-line bg-ground-sub p-6">
              <p className="eyebrow mb-1">Founder</p>
              <p className="text-[19px] font-bold text-ink">Hariharan Vijayakumar</p>
              <p className="mt-2 text-small text-ink-secondary">If we work together, you are talking to the person who scopes the work and builds the software — not a hand-off chain.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              <Chip><Building2 size={12} className="text-brand-ink" /> Registered · Tamil Nadu</Chip>
              <Chip><Package size={12} className="text-brand-ink" /> 3 live products</Chip>
              <Chip><Calendar size={12} className="text-brand-ink" /> Founded 2026</Chip>
              <Chip><Globe size={12} className="text-brand-ink" /> Remote worldwide</Chip>
            </div>
            <div className="mt-6 rounded-card border border-line bg-ground-paper p-6">
              <p className="eyebrow mb-3">Why Vovix</p>
              <p className="text-small leading-relaxed text-ink-secondary">
                Too many ops teams still lose time to exports, reconciliations and one-off integrations that should be small, reliable systems — not weekly heroics in spreadsheets. We&rsquo;re deliberately early-stage: three products you can try today, and only a handful of custom engagements at a time so we can scope in writing and ship without pretending we already have enterprise-scale playbooks.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section alt>
        <SectionHead eyebrow="Timeline" title="Our journey so far" lead="A short, factual timeline. Everything below is 2026." />
        <div className="grid gap-5 md:grid-cols-3">
          {[["2026","Company starts","Vovix is formed; we focus on automation and data tooling for ops-heavy teams."],
            ["2026","Lens, OneView & Edge","Three live products: document extraction for finance teams, stock research inside WhatsApp, and decision support for MetaTrader 5."],
            ["Now","Client engineering","Platform and automation builds — direct, and white-label behind agency partners. Each with upfront, honest scoping."]].map(([n,h,p], i) => (
            <Reveal key={h} delay={i * 0.08}>
              <div className="h-full rounded-card border border-line bg-ground-paper p-7">
                <span className="inline-flex items-center rounded-full border-[1.5px] border-brand-fill/30 bg-gradient-to-br from-brand-wash to-cyan-wash px-3 py-1 font-mono text-[12px] font-bold text-brand-ink">{n}</span>
                <h3 className="mt-4 text-[17px] font-bold tracking-[-0.01em] text-ink">{h}</h3>
                <p className="mt-2 text-small leading-relaxed text-ink-secondary">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
