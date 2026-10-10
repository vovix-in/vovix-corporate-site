"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X, ScanLine, MessageSquare, Activity } from "lucide-react";
import { Button, Logo } from "./ui";

export const PRODUCTS = [
  { name: "VOVIX Lens", desc: "Document intelligence → TallyPrime, ERP, Excel", href: "https://lens.vovix.in/", icon: ScanLine },
  { name: "VOVIX OneView", desc: "Company research inside WhatsApp", href: "/products#oneview", icon: MessageSquare },
  { name: "VOVIX Edge", desc: "Risk-controlled forex automation on MT5", href: "https://edge.vovix.in/", icon: Activity },
];

const LINKS: [string, string][] = [
  ["Services", "/services"],
  ["Use cases", "/#industries"],
  ["How we work", "/#process"],
  ["Company", "/about"],
];

const isExt = (h: string) => /^https?:\/\//.test(h);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);   // products dropdown
  const [menu, setMenu] = useState(false);   // mobile sheet
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Mobile sheet: lock scroll, focus first link, Esc closes and returns focus.
  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenu(false); toggleRef.current?.focus(); }
      if (e.key === "Tab" && sheetRef.current) {
        const f = Array.from(sheetRef.current.querySelectorAll<HTMLElement>("a,button"));
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); toggleRef.current?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); toggleRef.current?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [menu]);

  // Desktop dropdown: Esc and outside click close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e: MouseEvent) => { if (ddRef.current && !ddRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${scrolled || menu ? "border-line shadow-raised" : "border-transparent"}`}>
      <nav className="shell flex h-[68px] items-center justify-between gap-6 md:h-[80px]" aria-label="Primary">
        <a href="/" className="flex shrink-0 items-center" aria-label="VOVIX home">
          <Logo className="h-[52px] md:h-[62px]" />
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          <div ref={ddRef} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
              className="flex items-center gap-1 rounded-control px-3.5 py-2 text-small font-semibold text-ink-secondary transition-colors hover:text-ink"
              aria-expanded={open} aria-controls="nav-products" onClick={() => setOpen(!open)}
            >
              Products <ChevronDown size={15} aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <div id="nav-products" hidden={!open} className="absolute left-0 top-full w-[360px] pt-2">
              <div className="overflow-hidden rounded-card border border-line bg-white p-2 shadow-floating">
                {PRODUCTS.map((p) => (
                  <a key={p.name} href={p.href} {...(isExt(p.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                     className="group flex items-start gap-3 rounded-control px-3 py-3 transition-colors hover:bg-ground-sub">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><p.icon size={17} aria-hidden /></span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 text-small font-bold text-ink">
                        {p.name}{isExt(p.href) && <ArrowUpRight size={13} aria-hidden className="text-ink-muted" />}
                      </span>
                      <span className="block text-[12.5px] leading-snug text-ink-muted">{p.desc}</span>
                    </span>
                  </a>
                ))}
                <a href="/products" className="mt-1 block rounded-control border-t border-line px-3 pb-1.5 pt-3 text-[12.5px] font-semibold text-brand-ink hover:underline">All products →</a>
              </div>
            </div>
          </div>
          {LINKS.map(([l, h]) => (
            <a key={l} href={h} className="rounded-control px-3.5 py-2 text-small font-semibold text-ink-secondary transition-colors hover:text-ink">{l}</a>
          ))}
          <Button href="/contact" size="sm" className="ml-3">Discuss Your Project</Button>
        </div>

        <button ref={toggleRef} className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control text-ink lg:hidden"
                onClick={() => setMenu(!menu)} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="mobile-nav">
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div id="mobile-nav" ref={sheetRef} hidden={!menu}
           className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-line bg-white lg:hidden">
        <div className="shell flex flex-col py-5">
          <p className="eyebrow mb-2 px-1">Products</p>
          {PRODUCTS.map((p) => (
            <a key={p.name} href={p.href} onClick={() => setMenu(false)} {...(isExt(p.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
               className="flex items-center gap-3 rounded-control px-1 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><p.icon size={18} aria-hidden /></span>
              <span>
                <span className="block text-body font-bold text-ink">{p.name}</span>
                <span className="block text-[13px] text-ink-muted">{p.desc}</span>
              </span>
            </a>
          ))}
          <div className="my-3 h-px bg-line" />
          {LINKS.map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMenu(false)} className="rounded-control px-1 py-3 text-body font-semibold text-ink">{l}</a>
          ))}
          <a href="/contact" onClick={() => setMenu(false)} className="rounded-control px-1 py-3 text-body font-semibold text-ink">Contact</a>
          <Button href="/contact" size="lg" className="mt-4 w-full">Discuss Your Project</Button>
          <a href="mailto:admin@vovix.in" className="mt-4 text-center text-small font-semibold text-brand-ink">admin@vovix.in</a>
        </div>
      </div>
    </header>
  );
}
