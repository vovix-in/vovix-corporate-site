const COLS = [
  { h: "Products", links: [
    { l: "Vovix Lens", href: "https://lens.vovix.in/", ext: true },
    { l: "Vovix OneView", href: "/products#oneview" },
    { l: "Vovix Edge", href: "/products#edge" },
  ]},
  { h: "Services", links: [
    { l: "Web platforms", href: "/#services" },
    { l: "SaaS engineering", href: "/#services" },
    { l: "Automation & ERP", href: "/#services" },
    { l: "White-label under NDA", href: "/services#white-label" },
  ]},
  { h: "Company", links: [
    { l: "About", href: "/about" },
    { l: "Process", href: "/#process" },
    { l: "Contact", href: "/#start" },
  ]},
  { h: "Legal", links: [
    { l: "Privacy", href: "/legal/privacy" },
    { l: "Terms", href: "/legal/terms" },
  ]},
];

const DISCLAIMERS = [
  ["Engagements", "Vovix builds software to automate tasks and support operational decisions. Site content is general and not bespoke professional, legal or tax advice unless separately agreed. Outcomes depend on your process, volume and adoption."],
  ["Vovix Lens", "Outputs are machine-assisted and should be reviewed before operational or financial use. You are responsible for handling personal or regulated data in line with your policies and applicable law."],
  ["Vovix OneView", "Informational and educational only — not investment advice. Vovix is not registered with SEBI as an investment adviser or research analyst. Verify data with exchanges and filings before any trading or allocation decision."],
  ["Vovix Edge", "Trading foreign exchange carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. Vovix Edge provides analysis and advisory signals only and does not guarantee profits or protect against losses. You are solely responsible for your trading decisions."],
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ground-sub pt-14 pb-10">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-vovix.png" alt="Vovix" width={300} height={164}
                 className="mb-4 h-auto w-full max-w-[220px] object-contain" />
            <p className="max-w-[34ch] text-small text-ink-secondary">
              Enterprise platforms, SaaS dashboards and automation pipelines — built, documented and handed over.
            </p>
            <a href="mailto:admin@vovix.in" className="mt-3 inline-block text-small font-semibold text-brand-ink hover:underline">
              admin@vovix.in
            </a>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <p className="eyebrow mb-3">{c.h}</p>
              <ul className="space-y-2">
                {c.links.map((x) => (
                  <li key={x.l}>
                    <a href={x.href} {...(x as any).ext ? { target: "_blank", rel: "noopener noreferrer" } : {}}
                       className="text-small text-ink-secondary transition-colors hover:text-brand-ink">{x.l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-9 h-px bg-line" />

        <div className="space-y-2.5">
          {DISCLAIMERS.map(([t, body]) => (
            <p key={t} className="text-[12.5px] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-ink-secondary">{t}:</strong> {body}
            </p>
          ))}
        </div>

        <p className="mt-7 text-[12.5px] text-ink-muted">
          © {new Date().getFullYear()} Vovix Private Limited · Guduvancheri, Tamil Nadu, India
        </p>
      </div>
    </footer>
  );
}
