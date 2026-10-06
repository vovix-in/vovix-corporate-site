import type { Metadata } from "next";
import { ScanLine, TrendingUp, MessageSquare, Check, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section, Reveal, Chip, Button, BentoCard } from "@/components/ui";
import { ExtractionViewer, SignalStream } from "@/components/hero-visuals";

export const metadata: Metadata = {
  title: "Products | Vovix",
  description: "Vovix Lens, Vovix OneView and Vovix Edge — the software Vovix built, runs and maintains in-house.",
  alternates: { canonical: "/products" },
};

const ld = {
  "@context": "https://schema.org", "@type": "ItemList", name: "Vovix products",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "SoftwareApplication", name: "Vovix Lens", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: "https://lens.vovix.in/", description: "AI document-intelligence platform for CA firms. Extracts and validates data from invoices, receipts, bank statements and KYC in any language and exports to TallyPrime, ERP or Excel.", provider: { "@type": "Organization", name: "Vovix Private Limited", url: "https://www.vovix.in/" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "SoftwareApplication", name: "Vovix OneView", applicationCategory: "FinanceApplication", operatingSystem: "WhatsApp (iOS, Android, Web)", url: "https://www.vovix.in/products", description: "WhatsApp-native AI stock research for Indian retail investors.", provider: { "@type": "Organization", name: "Vovix Private Limited", url: "https://www.vovix.in/" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "SoftwareApplication", name: "Vovix Edge", applicationCategory: "FinanceApplication", operatingSystem: "Windows (MetaTrader 5)", url: "https://www.vovix.in/products", description: "AI-assisted decision support for MetaTrader 5 with a strict quality gate.", provider: { "@type": "Organization", name: "Vovix Private Limited", url: "https://www.vovix.in/" } } },
  ],
};

export default function Products() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageShell
        eyebrow="Built, run and maintained in-house"
        title="Software we run"
        lead="Vovix is an engineering company. These are the three products we built for ourselves and now run for other people — the fastest way to judge how we work before you hand us a brief of your own."
      >
        <Section id="lens">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <p className="eyebrow">Document automation · the engine we build on</p>
                <Chip live>Live</Chip>
              </div>
              <h2 className="text-h2 text-ink">Vovix Lens</h2>
              <p className="mt-4 text-lead text-ink-secondary">
                A document-extraction engine for chartered accountant firms and finance teams. Upload an invoice, receipt, bank statement or KYC record — photo, scan or PDF, in any language — and Lens returns every field, table and total as clean, verified data, posted straight into Tally, your ERP, or Excel.
              </p>
              <ul className="mt-6 space-y-2.5">
                {["Any document, any language — no templates, no manual keying","Complete extraction: every line item, table and tax breakup","One-click TallyPrime and ERP export, GST-ready","GSTIN validation and tax-field intelligence built in","Source-grounded: every value maps to its exact place on the page","Human-in-the-loop review on anything below confidence threshold"].map((b) => (
                  <li key={b} className="flex gap-2.5 text-small text-ink-secondary"><Check size={15} className="mt-0.5 shrink-0 text-brand-ink" />{b}</li>
                ))}
              </ul>
              <Button href="https://lens.vovix.in/" size="lg" className="mt-7">Open Vovix Lens <ArrowRight size={17} /></Button>
            </Reveal>
            <Reveal delay={0.1}><ExtractionViewer /></Reveal>
          </div>
        </Section>

        <Section id="edge" alt>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal className="lg:order-2">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <p className="eyebrow">Market engine · MetaTrader 5</p>
                <Chip>Beta · early access</Chip>
              </div>
              <h2 className="text-h2 text-ink">Vovix Edge</h2>
              <p className="mt-4 text-lead text-ink-secondary">
                Most signal tools flood you with alerts. Edge does the opposite. It reads news, price structure and market conditions in real time, and only surfaces a trade when trend, reward-to-risk and timing genuinely line up.
              </p>
              <ul className="mt-6 space-y-2.5">
                {["A strict quality gate — most candidate setups are rejected by design","Every signal sized to your account: entry, stop, target, position","One-click assisted execution on MT5, with kill switch and daily limits","News-aware: built-in economic calendar avoids trading into surprises","Desktop-only for Windows + MT5 — broker credentials stay on your machine"].map((b) => (
                  <li key={b} className="flex gap-2.5 text-small text-ink-secondary"><Check size={15} className="mt-0.5 shrink-0 text-brand-ink" />{b}</li>
                ))}
              </ul>
              <p className="mt-6 rounded-control border border-line bg-ground-paper p-4 text-small text-ink-secondary">
                <strong className="text-ink">The difference: it knows when not to trade.</strong> In unclear, low-quality or high-risk conditions Edge deliberately shows nothing. Fewer, better opportunities — discipline over noise.
              </p>
              <Button href="/#start" size="lg" className="mt-7">Request early access</Button>
            </Reveal>
            <Reveal delay={0.1} className="lg:order-1"><SignalStream /></Reveal>
          </div>
        </Section>

        <Section id="oneview">
          <div className="mx-auto max-w-[62ch] text-center">
            <Reveal>
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
                <p className="eyebrow">Conversational delivery</p>
                <Chip live>Live</Chip>
              </div>
              <h2 className="text-h2 text-ink">Vovix OneView</h2>
              <p className="mt-4 text-lead text-ink-secondary">
                Equity research that runs entirely inside WhatsApp. Type any NSE or BSE ticker and get a full fundamental and technical report back in seconds — no app to install. Our proof that an automated workflow can live where users already are.
              </p>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { i: MessageSquare, h: "WhatsApp-native", p: "Type a ticker, get a structured report in seconds. Quick-reply buttons and pick-lists for frictionless mobile use." },
              { i: TrendingUp, h: "Full web dashboard", p: "Market cap, P/E, EPS, net margins, book value, revenue and profit charts, RSI, MACD and Graham value side by side." },
              { i: ScanLine, h: "Context that persists", p: "Follow-up questions answered in full stock context, with a SEBI disclaimer on every report." },
            ].map((c, i) => (
              <Reveal key={c.h} delay={i * 0.06}>
                <BentoCard className="h-full">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><c.i size={20} /></div>
                  <h3 className="text-[17px] font-bold tracking-[-0.01em] text-ink">{c.h}</h3>
                  <p className="mt-2 text-small leading-relaxed text-ink-secondary">{c.p}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </Section>
      </PageShell>
    </>
  );
}
