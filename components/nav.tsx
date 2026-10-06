"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./ui";

const PRODUCTS = [
  { name: "Vovix Lens", desc: "Document intelligence → Tally / ERP", href: "https://lens.vovix.in/", external: true },
  { name: "Vovix Edge", desc: "Market decision engine for MT5", href: "/products#edge" },
  { name: "Vovix OneView", desc: "Equity research inside WhatsApp", href: "/products#oneview" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-line shadow-raised" : "border-transparent"
      }`}
    >
      <nav className="shell flex items-center justify-between" aria-label="Primary">
        <a href="/" className="flex shrink-0 items-center py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-vovix.png" alt="Vovix" width={280} height={79}
               className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-10" : "h-12"}`} />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
              className="flex items-center gap-1 rounded-control px-3.5 py-2 text-small font-semibold text-ink-secondary transition-colors hover:text-ink"
              aria-expanded={open} aria-haspopup="true" onClick={() => setOpen(!open)}
            >
              Products <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute left-0 top-full w-[320px] pt-2">
                <div className="overflow-hidden rounded-card border border-line bg-white p-2 shadow-lifted">
                  {PRODUCTS.map((p) => (
                    <a key={p.name} href={p.href}
                       {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                       className="block rounded-control px-3 py-2.5 transition-colors hover:bg-ground-sub">
                      <span className="block text-small font-bold text-ink">{p.name}</span>
                      <span className="block text-[12.5px] leading-snug text-ink-muted">{p.desc}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          {[["Services", "/#services"], ["Process", "/#process"], ["Company", "/about"]].map(([l, h]) => (
            <a key={l} href={h} className="rounded-control px-3.5 py-2 text-small font-semibold text-ink-secondary transition-colors hover:text-ink">{l}</a>
          ))}
          <Button href="/#start" size="sm" className="ml-2">Start your project</Button>
        </div>

        <button className="rounded-control p-2 text-ink lg:hidden" onClick={() => setMenu(!menu)}
                aria-label="Toggle navigation" aria-expanded={menu}>
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menu && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {PRODUCTS.map((p) => (
              <a key={p.name} href={p.href} {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                 className="rounded-control px-3 py-2.5 text-small font-semibold text-ink">{p.name}</a>
            ))}
            <div className="my-1 h-px bg-line" />
            {[["Services", "/#services"], ["Process", "/#process"], ["Company", "/about"]].map(([l, h]) => (
              <a key={l} href={h} className="rounded-control px-3 py-2.5 text-small font-semibold text-ink-secondary">{l}</a>
            ))}
            <Button href="/#start" size="md" className="mt-2">Start your project</Button>
          </div>
        </div>
      )}
    </header>
  );
}
