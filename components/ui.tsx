"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";

/* ── Logo ──────────────────────────────────────────────────────
   The original artwork, trimmed only of the empty transparent margin
   the source PNG carried (that margin is why the logo used to look
   tiny or "zoomed" depending on the slot). Never redrawn or recoloured.
   Sizing is by height only; width follows the artwork's 2.74:1 ratio.
   Light backgrounds only — the supplied artwork is navy + green.        */
const LOGO_RATIO = 1272 / 464;
export function Logo({ height = 44, className = "", priority = false }: { height?: number; className?: string; priority?: boolean }) {
  const width = Math.round(height * LOGO_RATIO);
  return (
    <picture className={`block shrink-0 ${className}`} style={{ width, height }}>
      <source srcSet="/assets/logo-vovix-lockup.webp" type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/logo-vovix-lockup@web.png" alt="VOVIX — Automate Your Alpha" width={width} height={height}
           style={{ width, height }} decoding="async" fetchPriority={priority ? "high" : "auto"} className="block h-full w-full object-contain" />
    </picture>
  );
}

/* The alpha mark, cut from the same original lockup with its full pixel trail. */
export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <picture className={`block shrink-0 ${className}`} style={{ width: size, height: size }}>
      <source srcSet="/assets/logo-vovix-mark.webp" type="image/webp" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/logo-vovix-mark@web.png" alt="" width={size} height={size} style={{ width: size, height: size }} decoding="async" className="block h-full w-full object-contain" />
    </picture>
  );
}

/* ── Button ─────────────────────────────────────────────────────
   Primary is navy-on-logo-green (4.76:1). White on #09A54C is
   3.23:1 and fails AA for button-sized text, so we never use it. */
type BtnProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  disabled?: boolean;
};

const SIZES = { sm: "px-3.5 py-2 text-small", md: "px-5 py-3 text-small", lg: "px-6 py-3.5 text-body" };
const VARIANTS = {
  primary: "bg-brand-fill text-navy font-bold shadow-glow hover:bg-brand-hover hover:shadow-glowlg",
  secondary: "border-[1.5px] border-navy text-navy font-bold hover:bg-navy hover:text-white",
  ghost: "text-ink-secondary font-semibold hover:bg-ground-sunken hover:text-ink",
  onDark: "border-[1.5px] border-white/30 text-white font-semibold hover:border-white hover:bg-white/5",
};

export function Button({ children, href, onClick, variant = "primary", size = "md", className = "", type = "button", external, disabled }: BtnProps) {
  const cls = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-control transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (href) {
    const ext = external ?? /^https?:\/\//.test(href);
    return (
      <a href={href} className={cls} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {ext && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}</button>;
}

/* ── Chip ─────────────────────────────────────────────────────── */
export function Chip({ children, live = false, dark = false, className = "" }: { children: ReactNode; live?: boolean; dark?: boolean; className?: string }) {
  const tone = dark
    ? live ? "border-brand-fill/40 bg-brand-fill/10 text-brand-bright" : "border-white/15 bg-white/[0.04] text-ink-onspec"
    : live ? "border-brand-fill/40 bg-brand-wash text-brand-ink" : "border-line-strong bg-ground-paper text-ink-secondary";
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.04em] ${tone} ${className}`}>
      {live && <span className="h-1.5 w-1.5 rounded-full bg-brand-fill animate-pulse-dot" aria-hidden />}
      {children}
    </span>
  );
}

/* ── usePausable ──────────────────────────────────────────────
   Pauses CSS animation inside `ref` when it's off-screen or the tab
   is hidden, and reports `active` so JS-driven loops can stop too. */
export function usePausable<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = true;
    const apply = () => {
      const on = inView && document.visibilityState === "visible";
      el.dataset.paused = on ? "false" : "true";
      setActive(on);
    };
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver(([e]) => { inView = e.isIntersecting; apply(); }, { rootMargin: "80px" })
      : null;
    io?.observe(el);
    document.addEventListener("visibilitychange", apply);
    return () => { io?.disconnect(); document.removeEventListener("visibilitychange", apply); };
  }, []);
  return [ref, active];
}

export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduce;
}

/* ── useTicker ─ a step counter that only advances while active ── */
export function useTicker(steps: number, ms: number, active: boolean, reset?: unknown) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => { setI(0); }, [reset]);
  useEffect(() => {
    if (reduce) { setI(steps - 1); return; }
    if (!active) return;
    const t = setInterval(() => setI((x) => (x + 1) % steps), ms);
    return () => clearInterval(t);
  }, [steps, ms, active, reduce]);
  return i;
}

/* ── Reveal ───────────────────────────────────────────────────
   Renders visible. Only once JS confirms it can animate does it
   hide and fade in — a failed bundle never leaves the page blank. */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const el = ref.current;
    if (!el) return;
    // Already on screen at mount (e.g. deep-linked) → don't hide it.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden = armed && !shown;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(16px)" : "none",
        transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${delay}s, transform .55s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ── Section scaffolding ──────────────────────────────────────── */
export function Section({ id, tone: toneProp, alt = false, children, className = "", label }: { id?: string; tone?: "paper" | "sub" | "navy"; alt?: boolean; children: ReactNode; className?: string; label?: string }) {
  const tone = toneProp ?? (alt ? "sub" : "paper");
  const bg = tone === "navy" ? "on-dark bg-navy text-white" : tone === "sub" ? "bg-ground-sub" : "bg-ground-paper";
  return (
    <section id={id} aria-label={label} className={`relative py-20 md:py-32 ${bg} ${className}`}>
      <div className="shell relative">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, center = false, dark = false, className = "" }: { eyebrow: string; title: ReactNode; lead?: ReactNode; center?: boolean; dark?: boolean; className?: string }) {
  return (
    <Reveal className={`mb-12 md:mb-16 ${center ? "mx-auto text-center" : ""} max-w-[760px] ${className}`}>
      <div className={`mb-4 flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className={dark ? "brand-rule" : "brand-rule-light"} aria-hidden />
        <p className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</p>
      </div>
      <h2 className={`text-balance text-[clamp(30px,3.8vw,42px)] font-semibold leading-[1.1] tracking-[-0.03em] ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead && <p className={`mt-5 text-pretty text-lead ${dark ? "text-ink-onspec" : "text-ink-secondary"} ${center ? "mx-auto" : ""} max-w-[64ch]`}>{lead}</p>}
    </Reveal>
  );
}

/* ── Card ─────────────────────────────────────────────────────── */
export function BentoCard({ children, className = "", interactive = true }: { children: ReactNode; className?: string; interactive?: boolean }) {
  return (
    <div className={`group relative overflow-hidden rounded-card border border-line bg-ground-paper p-7 transition-all duration-300 ${
      interactive ? "hover:-translate-y-1 hover:border-brand-fill/40 hover:shadow-lifted" : ""
    } ${className}`}>
      {interactive && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-fill to-cyan-fill transition-transform duration-500 group-hover:scale-x-100" />
      )}
      {children}
    </div>
  );
}

/* ── Illustrative-data tag — every product mockup carries one ── */
export function Illustrative({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${dark ? "text-white/50" : "text-ink-muted"}`}>
      Illustrative data
    </span>
  );
}
