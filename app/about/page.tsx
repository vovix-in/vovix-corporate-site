import type { Metadata } from "next";
import { Building2, Package, Calendar, Globe } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section, Reveal, SectionHead, Chip, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "About VOVIX Private Limited",
  description: "VOVIX Private Limited is a founder-led, engineering-first IT automation company in Tamil Nadu, building AI document processing, data systems and its own products.",
  alternates: { canonical: "/about" },
};

const PRODUCTS = [
  ["VOVIX Lens", "Document intelligence for CA firms and finance teams: extraction, GST validation and TallyPrime export."],
  ["VOVIX OneView", "Conversational research on listed Indian companies, delivered through WhatsApp."],
  ["VOVIX Edge", "Forex decision support and optional MT5 execution with pre-event blackouts and exit management."],
];

export default function About() {
  return (
    <PageShell eyebrow="Company" title="About VOVIX"
      lead="An engineering-led IT automation company. We build software that removes repetitive work, connects disconnected systems and turns unstructured data into something a business can act on.">
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.45fr_1fr]">
          <Reveal>
            <SectionHead className="!mb-6" eyebrow="Who we are" title="Founder-led and engineering-first." />
            <div className="space-y-4 text-lead text-ink-secondary">
              <p>VOVIX Private Limited builds intelligent automation, AI-powered document processing and connected data systems for businesses, finance teams and technology partners. <strong className="text-ink">The company commenced operations in 2026.</strong></p>
              <p>We run three products of our own — the clearest way to judge how we engineer before you commission anything. The same backbone of validation, exception handling, integration and monitoring sits under every client build.</p>
              <p>Discovery, engineering and delivery go through one team, so the people who scope the work are the people who build it. When that changes as we grow, we&rsquo;ll say so here.</p>
            </div>
            <div className="mt-8 rounded-card border border-line bg-ground-sub p-6">
              <p className="eyebrow mb-1">Founder</p>
              <p className="text-[19px] font-bold text-ink">Hariharan Vijayakumar</p>
              <p className="mt-2 text-small text-ink-secondary">If we work together, you talk to the person who scopes the work and builds the software — not a hand-off chain.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              <Chip><Building2 size={12} className="text-brand-ink" aria-hidden /> Registered · Tamil Nadu</Chip>
              <Chip><Package size={12} className="text-brand-ink" aria-hidden /> 3 products</Chip>
              <Chip><Calendar size={12} className="text-brand-ink" aria-hidden /> Founded 2026</Chip>
              <Chip><Globe size={12} className="text-brand-ink" aria-hidden /> Working worldwide</Chip>
            </div>
            <div className="mt-6 overflow-hidden rounded-card border border-line">
              {PRODUCTS.map(([h, p]) => (
                <div key={h} className="border-b border-line bg-white p-5 last:border-0">
                  <p className="text-[15px] font-bold text-ink">{h}</p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-secondary">{p}</p>
                </div>
              ))}
            </div>
            <Button href="/products" variant="secondary" className="mt-5">See the products</Button>
          </Reveal>
        </div>
      </Section>

      <Section tone="sub">
        <SectionHead eyebrow="Timeline" title="Our journey so far." lead="A short, factual timeline." />
        <div className="grid gap-5 md:grid-cols-3">
          {[["2026", "Company formed", "VOVIX is incorporated with a focus on automation and data tooling for operations-heavy teams."],
            ["2026", "Lens, OneView & Edge", "Three products in operation: document extraction for finance teams, company research inside WhatsApp, and decision support for MetaTrader 5."],
            ["Now", "Client engineering", "Automation, AI and integration builds — direct, and white-label behind agency partners. Each with upfront, written scoping."]].map(([n, h, p], i) => (
            <Reveal key={h} delay={i * 0.08}>
              <div className="h-full rounded-card border border-line bg-white p-7">
                <span className="inline-flex items-center rounded-full bg-navy px-3 py-1 font-mono text-[12px] font-bold text-brand-onspec">{n}</span>
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
