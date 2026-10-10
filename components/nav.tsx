"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowUpRight, ChevronDown, Menu, X, ScanLine, MessageSquare, Activity,
  Workflow, ScanText, Database, Plug, Radar, LayoutDashboard, Layers,
} from "lucide-react";
import { Button, Logo } from "./ui";

export const PRODUCTS = [
  { name: "VOVIX Lens", desc: "Invoices and documents to TallyPrime, ERP or Excel", href: "https://lens.vovix.in/", icon: ScanLine },
  { name: "VOVIX OneView", desc: "Company research inside WhatsApp", href: "/products#oneview", icon: MessageSquare },
  { name: "VOVIX Edge", desc: "Risk-controlled forex automation on MT5", href: "https://edge.vovix.in/", icon: Activity },
];

const SERVICES = [
  { name: "Workflow automation", href: "/services#workflow", icon: Workflow },
  { name: "AI document intelligence", href: "/services#ai-docs", icon: ScanText },
  { name: "Data engineering & pipelines", href: "/services#data", icon: Database },
  { name: "API & system integration", href: "/services#api", icon: Plug },
  { name: "Web data ingestion & monitoring", href: "/services#ingest", icon: Radar },
  { name: "Custom software & internal tools", href: "/services#tools", icon: LayoutDashboard },
  { name: "White-label automation", href: "/services#white-label", icon: Layers },
];

const LINKS: [string, string][] = [["Platform", "/#platform"], ["Use cases", "/#use-cases"], ["Company", "/about"]];
const isExt = (h: string) => /^https?:\/\//.test(h);
const ext = (h: string) => (isExt(h) ? { target: "_blank", rel: "noopener noreferrer" } : {});

type Menu = "products" | "services" | null;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<Menu>(null);
  const [sheet, setSheet] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hoverT = useRef<ReturnType<typeof setTimeout>>();
  // Hover intent: a cursor merely passing over (or the page scrolling under it) shouldn't open a mega menu.
  const hoverOpen = (m: Menu) => { clearTimeout(hoverT.current); hoverT.current = setTimeout(() => setOpen(m), m ? 140 : 0); };

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!sheet) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSheet(false); toggleRef.current?.focus(); }
      if (e.key === "Tab" && sheetRef.current) {
        const f = Array.from(sheetRef.current.querySelectorAll<HTMLElement>("a,button"));
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); toggleRef.current?.focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); toggleRef.current?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [sheet]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    const onClick = (e: MouseEvent) => { if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  const trigger = (id: Exclude<Menu, null>, label: string) => (
    <button
      className={`flex items-center gap-1 rounded-control px-3.5 py-2 text-[15px] font-medium transition-colors hover:text-ink ${open === id ? "text-ink" : "text-ink-secondary"}`}
      aria-expanded={open === id} aria-controls={`mega-${id}`}
      onClick={() => { clearTimeout(hoverT.current); setOpen(open === id ? null : id); }} onMouseEnter={() => hoverOpen(id)} onMouseLeave={() => clearTimeout(hoverT.current)}
    >
      {label} <ChevronDown size={15} aria-hidden className={`transition-transform ${open === id ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <>
      {/* Announcement — a real, current product fact, not a promo */}
      <div className="on-dark bg-navy text-white">
        <a href="https://lens.vovix.in/" target="_blank" rel="noopener noreferrer"
           className="shell flex items-center justify-center gap-3 py-2.5 text-[13px] sm:text-small">
          <span className="rounded bg-brand-fill px-1.5 py-px font-mono text-[10.5px] font-bold text-navy">NEW</span>
          <span className="truncate text-white/90">VOVIX Lens exports TallyPrime XML with GSTIN, HSN and ITC checks built in</span>
          <span className="hidden shrink-0 font-semibold text-brand-fill sm:inline">Try it →</span>
        </a>
      </div>

      <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${scrolled || sheet || open ? "border-line shadow-raised" : "border-line/60"}`}>
        <div ref={barRef} onMouseLeave={() => hoverOpen(null)}>
          <nav className="shell flex h-16 items-center justify-between gap-6 md:h-[78px]" aria-label="Primary">
            <a href="/" className="flex shrink-0 items-center" aria-label="VOVIX home">
              <Logo height={40} className="md:hidden" priority />
              <Logo height={50} className="hidden md:block" priority />
            </a>

            <div className="hidden items-center gap-0.5 lg:flex">
              {trigger("products", "Products")}
              {trigger("services", "Services")}
              {LINKS.map(([l, h]) => (
                <a key={l} href={h} onMouseEnter={() => hoverOpen(null)} className="rounded-control px-3.5 py-2 text-[15px] font-medium text-ink-secondary transition-colors hover:text-ink">{l}</a>
              ))}
            </div>

            <div className="hidden items-center gap-5 lg:flex">
              <a href="https://lens.vovix.in/" target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold text-ink hover:text-brand-ink">Try VOVIX Lens</a>
              <Button href="/contact" size="sm" className="!px-4 !py-2.5">Discuss Your Project</Button>
            </div>

            <button ref={toggleRef} className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control text-ink lg:hidden"
                    onClick={() => setSheet(!sheet)} aria-label={sheet ? "Close menu" : "Open menu"} aria-expanded={sheet} aria-controls="mobile-nav">
              {sheet ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          {/* Mega menus (desktop) */}
          <div id="mega-products" hidden={open !== "products"} className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lifted max-lg:hidden">
            <div className="shell grid grid-cols-[1.4fr_1fr_1fr] gap-10 py-8">
              <div>
                <p className="eyebrow mb-4">Products</p>
                <div className="grid gap-1">
                  {PRODUCTS.map((p) => (
                    <a key={p.name} href={p.href} {...ext(p.href)} className="group flex items-start gap-4 rounded-card p-3 transition-colors hover:bg-ground-sub">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink transition-colors group-hover:bg-navy group-hover:text-brand-fill"><p.icon size={20} aria-hidden /></span>
                      <span>
                        <span className="flex items-center gap-1 text-[15px] font-semibold text-ink">{p.name}{isExt(p.href) && <ArrowUpRight size={14} aria-hidden className="text-ink-muted" />}</span>
                        <span className="block text-small text-ink-muted">{p.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow mb-4">Platform</p>
                <ul className="space-y-3 text-[15px]">
                  {[["How the engine works", "/#platform"], ["Integrations", "/#works-with"], ["Security & data handling", "/#security"], ["All products", "/products"]].map(([l, h]) => (
                    <li key={l}><a href={h} className="font-medium text-ink-secondary hover:text-ink">{l}</a></li>
                  ))}
                </ul>
              </div>
              <a href="https://lens.vovix.in/" target="_blank" rel="noopener noreferrer" className="on-dark group flex flex-col justify-between rounded-card bg-navy p-6 text-white">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-fill">Featured</span>
                <span className="mt-6 text-[19px] font-semibold leading-snug">From a purchase invoice to a balanced TallyPrime voucher.</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-brand-fill">Open VOVIX Lens <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </a>
            </div>
          </div>
          <div id="mega-services" hidden={open !== "services"} className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lifted max-lg:hidden">
            <div className="shell grid grid-cols-[2fr_1fr] gap-10 py-8">
              <div>
                <p className="eyebrow mb-4">Engineering services</p>
                <div className="grid grid-cols-2 gap-1">
                  {SERVICES.map((s) => (
                    <a key={s.name} href={s.href} className="group flex items-center gap-3 rounded-control p-2.5 transition-colors hover:bg-ground-sub">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><s.icon size={17} aria-hidden /></span>
                      <span className="text-[15px] font-medium text-ink">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="rounded-card border border-line bg-ground-sub p-6">
                <p className="eyebrow mb-3">How we engage</p>
                <p className="text-small text-ink-secondary">A written scope first — including what we&rsquo;d advise you not to automate yet. Direct, or white-label behind your brand under mutual NDA.</p>
                <a href="/services#estimate" className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-brand-ink">Estimate a timeline <ArrowRight size={15} aria-hidden /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sheet */}
        <div id="mobile-nav" ref={sheetRef} hidden={!sheet} className="h-[calc(100dvh-64px)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <div className="shell flex flex-col py-5">
            <p className="eyebrow mb-1">Products</p>
            {PRODUCTS.map((p) => (
              <a key={p.name} href={p.href} onClick={() => setSheet(false)} {...ext(p.href)} className="flex items-center gap-3 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><p.icon size={18} aria-hidden /></span>
                <span>
                  <span className="block text-body font-semibold text-ink">{p.name}</span>
                  <span className="block text-[13px] text-ink-muted">{p.desc}</span>
                </span>
              </a>
            ))}
            <div className="my-3 h-px bg-line" />
            {[["Services", "/services"], ...LINKS, ["Contact", "/contact"]].map(([l, h]) => (
              <a key={l} href={h} onClick={() => setSheet(false)} className="py-3 text-body font-semibold text-ink">{l}</a>
            ))}
            <Button href="/contact" size="lg" className="mt-4 w-full">Discuss Your Project</Button>
            <Button href="https://lens.vovix.in/" size="lg" variant="secondary" className="mt-3 w-full">Try VOVIX Lens</Button>
          </div>
        </div>
      </header>
    </>
  );
}
