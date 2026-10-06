"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ── Button ─────────────────────────────────────────────────────
   primary is navy-on-emerald, never white-on-emerald: #fff on
   #00C853 is 2.24:1 and fails WCAG AA. Navy is 6.54:1.            */
type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
};

const SIZES = { sm: "px-3.5 py-2 text-small", md: "px-5 py-3 text-small", lg: "px-7 py-4 text-body" };
const VARIANTS = {
  primary: "bg-brand-fill text-ink font-bold shadow-glow hover:bg-brand-hover hover:shadow-glowlg active:bg-brand-hover",
  secondary: "border-[1.5px] border-ink text-ink font-bold hover:bg-ink hover:text-white",
  ghost: "text-ink-secondary font-semibold hover:bg-ground-sunken hover:text-ink",
};

export function Button({ children, href, onClick, variant = "primary", size = "md", className = "", type = "button" }: BtnProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-control transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}

/* ── Chip ─────────────────────────────────────────────────────── */
export function Chip({ children, live = false, className = "" }: { children: ReactNode; live?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.04em] ${
      live ? "border-brand-fill/40 bg-brand-wash text-brand-ink" : "border-line-strong bg-ground-paper text-ink-secondary"
    } ${className}`}>
      {live && <span className="h-1.5 w-1.5 rounded-full bg-brand-fill animate-pulse-dot" aria-hidden />}
      {children}
    </span>
  );
}

/* ── Reveal ───────────────────────────────────────────────────
   Renders visible. Only once JS confirms it can animate does it
   hide and fade in — so a failed or slow bundle never leaves the
   page blank.                                                    */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    setArmed(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = armed && !shown;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(14px)" : "none",
        transition: `opacity .45s cubic-bezier(.16,1,.3,1) ${delay}s, transform .45s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Section scaffolding ──────────────────────────────────────── */
export function Section({ id, alt = false, children, className = "" }: { id?: string; alt?: boolean; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${alt ? "bg-ground-sub" : "bg-ground-paper"} ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, center = true }: { eyebrow: string; title: string; lead?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-12 ${center ? "text-center" : ""}`}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className={`text-balance text-[clamp(26px,3.6vw,32px)] font-[750] leading-tight tracking-[-0.022em] text-ink ${lead ? "mb-3" : ""}`}>{title}</h2>
      {lead && <p className={`text-lead text-ink-secondary ${center ? "mx-auto" : ""} max-w-[62ch]`}>{lead}</p>}
    </Reveal>
  );
}

/* ── Bento card ───────────────────────────────────────────────── */
export function BentoCard({ children, className = "", interactive = true }: { children: ReactNode; className?: string; interactive?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-card border border-line bg-ground-paper p-7 transition-all duration-300 ${
      interactive ? "hover:-translate-y-1 hover:border-brand-fill/30 hover:shadow-lifted" : ""
    } ${className}`}>
      {interactive && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-fill to-cyan-fill transition-transform duration-500 group-hover:scale-x-100" />
      )}
      {children}
    </div>
  );
}
