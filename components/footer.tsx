import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./ui";

const COLS = [
  { h: "Products", links: [
    { l: "VOVIX Lens", href: "https://lens.vovix.in/" },
    { l: "VOVIX OneView", href: "/products#oneview" },
    { l: "VOVIX Edge", href: "https://edge.vovix.in/" },
    { l: "All products", href: "/products" },
  ]},
  { h: "Services", links: [
    { l: "Workflow automation", href: "/services#workflow" },
    { l: "AI document intelligence", href: "/services#ai-docs" },
    { l: "Data pipelines", href: "/services#data" },
    { l: "API & system integration", href: "/services#api" },
    { l: "White-label engineering", href: "/services#white-label" },
  ]},
  { h: "Company", links: [
    { l: "About VOVIX", href: "/about" },
    { l: "How we work", href: "/#process" },
    { l: "Use cases", href: "/#industries" },
    { l: "Contact", href: "/contact" },
    { l: "Privacy", href: "/legal/privacy" },
    { l: "Terms", href: "/legal/terms" },
  ]},
];

const DISCLAIMERS = [
  ["Engagements", "VOVIX builds software to automate tasks and support operational decisions. Site content is general and not bespoke professional, legal or tax advice unless separately agreed. Outcomes depend on your process, volume and adoption."],
  ["VOVIX Lens", "Outputs are machine-assisted and should be reviewed before operational or financial use. You are responsible for handling personal or regulated data in line with your policies and applicable law."],
  ["VOVIX OneView", "Informational and educational only — not investment advice. VOVIX is not registered with SEBI as an investment adviser or research analyst. Verify data with exchanges and filings before any trading or allocation decision."],
  ["VOVIX Edge", "Trading foreign exchange carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. VOVIX Edge does not guarantee profits or protect against losses. You are solely responsible for your trading decisions."],
];

const ext = (h: string) => (/^https?:\/\//.test(h) ? { target: "_blank", rel: "noopener noreferrer" } : {});

export function Footer() {
  return (
    <footer className="border-t border-line bg-ground-sub pb-10 pt-16">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr]">
          <div>
            <a href="/" aria-label="VOVIX home" className="inline-block"><Logo variant="footer" className="h-[76px]" /></a>
            <p className="mt-4 max-w-[38ch] text-small text-ink-secondary">
              VOVIX Private Limited engineers intelligent automation, AI document processing and connected data systems — and runs three products of its own.
            </p>
            <ul className="mt-5 space-y-2.5 text-small">
              <li><a href="mailto:admin@vovix.in" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand-ink"><Mail size={15} className="text-brand-ink" aria-hidden />admin@vovix.in</a></li>
              <li><a href="tel:+919080640562" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand-ink"><Phone size={15} className="text-brand-ink" aria-hidden />+91 90806 40562</a></li>
              <li className="inline-flex items-center gap-2 text-ink-secondary"><MapPin size={15} className="text-brand-ink" aria-hidden />Guduvancheri, Tamil Nadu, India</li>
            </ul>
          </div>
          {COLS.map((c) => (
            <nav key={c.h} aria-label={c.h}>
              <p className="eyebrow mb-4">{c.h}</p>
              <ul className="space-y-2.5">
                {c.links.map((x) => (
                  <li key={x.l}>
                    <a href={x.href} {...ext(x.href)} className="text-small text-ink-secondary transition-colors hover:text-brand-ink">{x.l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="my-10 h-px bg-line" />

        <div className="space-y-2.5">
          {DISCLAIMERS.map(([t, body]) => (
            <p key={t} className="text-[12.5px] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-ink-secondary">{t}:</strong> {body}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-ink-muted">
          <p>© {new Date().getFullYear()} VOVIX Private Limited. All rights reserved.</p>
          <p className="flex items-center gap-2 font-mono uppercase tracking-[0.14em]"><span className="brand-rule !w-6" aria-hidden />Automate Your Alpha</p>
        </div>
      </div>
    </footer>
  );
}
