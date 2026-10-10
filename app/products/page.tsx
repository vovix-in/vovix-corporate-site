import type { Metadata } from "next";
import { Check, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section, Reveal, Chip, Button } from "@/components/ui";
import { SHOWCASE } from "@/components/product-data";
import { LensDemo, OneViewDemo, EdgeDemo } from "@/components/product-demos";

const DEMOS = { lens: LensDemo, oneview: OneViewDemo, edge: EdgeDemo } as const;

export const metadata: Metadata = {
  title: "Products — VOVIX Lens, OneView & Edge",
  description: "VOVIX Lens (AI document intelligence for CA firms and finance teams), VOVIX OneView (company research on WhatsApp) and VOVIX Edge (risk-controlled forex automation on MT5).",
  alternates: { canonical: "/products" },
};

const SITE = "https://www.vovix.in";
const ld = {
  "@context": "https://schema.org", "@type": "ItemList", name: "VOVIX products",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "SoftwareApplication", name: "VOVIX Lens", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: "https://lens.vovix.in/", description: "AI document-intelligence platform for CA firms and finance teams. Extracts and validates data from invoices, receipts, bank statements and KYC documents in 40+ languages and exports to TallyPrime XML, Excel, JSON or CSV.", provider: { "@id": `${SITE}/#organization` } } },
    { "@type": "ListItem", position: 2, item: { "@type": "SoftwareApplication", name: "VOVIX OneView", applicationCategory: "FinanceApplication", operatingSystem: "WhatsApp", url: `${SITE}/products#oneview`, description: "Conversational research on NSE and BSE-listed companies, delivered through WhatsApp. Informational only.", provider: { "@id": `${SITE}/#organization` } } },
    { "@type": "ListItem", position: 3, item: { "@type": "SoftwareApplication", name: "VOVIX Edge", applicationCategory: "FinanceApplication", operatingSystem: "MetaTrader 5", url: "https://edge.vovix.in/", description: "Forex decision-support and optional automated execution on MetaTrader 5, with pre-event blackouts and automated exit management.", provider: { "@id": `${SITE}/#organization` } } },
  ],
};

const EXTRA: Record<string, { h: string; items: string[] }> = {
  lens: { h: "Built for", items: ["Chartered Accountant firms managing many clients", "In-house finance and accounting teams", "Enterprise back-office operations", "Any team processing documents at volume"] },
  oneview: { h: "Good to know", items: ["Runs inside WhatsApp — nothing to install", "Data and reports are informational, not recommendations", "VOVIX is not a SEBI-registered adviser or research analyst"] },
  edge: { h: "Good to know", items: ["Advisory mode by default — you decide whether to automate", "Signals delivered to a private Telegram channel", "No profit is promised; forex trading carries high risk"] },
};

export default function Products() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageShell
        eyebrow="Products"
        title="Software we engineer, run and maintain."
        lead="Three products built on the same automation backbone we deliver for clients: document intelligence, conversational delivery and risk-controlled execution."
        actions={SHOWCASE.map((p) => <Button key={p.id} href={`#${p.id}`} variant="onDark" size="sm">{p.name}</Button>)}
      >
        {SHOWCASE.map((p, i) => (
          <Section key={p.id} id={p.id} tone={i % 2 ? "sub" : "paper"}>
            <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 [&>*]:min-w-0">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Chip live={p.live}>{p.status}</Chip>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{p.tag}</span>
                </div>
                <h2 className="text-h2 text-ink">{p.name}</h2>
                <p className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-ink">{p.title}</p>
                <p className="mt-4 text-lead text-ink-secondary">{p.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.points.map((b) => (
                    <li key={b} className="flex gap-2.5 text-small text-ink-secondary"><Check size={16} className="mt-[3px] shrink-0 text-brand-ink" aria-hidden />{b}</li>
                  ))}
                </ul>
                <div className="mt-7 rounded-card border border-line bg-white p-5">
                  <p className="eyebrow mb-2">{EXTRA[p.id].h}</p>
                  <ul className="space-y-1.5">
                    {EXTRA[p.id].items.map((x) => <li key={x} className="text-[13.5px] text-ink-secondary">— {x}</li>)}
                  </ul>
                </div>
                {"note" in p && p.note && <p className="mt-5 border-l-2 border-state-warn/60 pl-3 text-[12.5px] leading-relaxed text-ink-muted">{p.note}</p>}
                <Button href={p.id === "oneview" ? "/contact" : p.cta.href} size="lg" className="mt-7">
                  {p.id === "oneview" ? "Enquire about OneView" : p.cta.l} <ArrowRight size={17} aria-hidden />
                </Button>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 ? "lg:order-1" : ""}>{(() => { const D = DEMOS[p.id]; return <D />; })()}</Reveal>
            </div>
          </Section>
        ))}
      </PageShell>
    </>
  );
}
