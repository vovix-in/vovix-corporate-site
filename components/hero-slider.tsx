"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "./ui";
import { Photo, type PhotoName } from "./photo";

/* Full-bleed photo hero (Figma: 05 Homepage v5 → "Hero — photo slider").
   Three slides, each a real message with its own CTA. Auto-advances every
   7s; pauses on hover/focus, when the tab is hidden, and never auto-plays
   under prefers-reduced-motion. Users can pause explicitly (WCAG 2.2.2). */

const SLIDES: { photo: PhotoName; eyebrow: string; title: [string, string, string]; body: string; cta: { l: string; href: string }; thumb: string }[] = [
  {
    photo: "hero-office", eyebrow: "Automate Your Alpha",
    title: ["Intelligence that ", "automates", " business."],
    body: "VOVIX engineers intelligent automation, AI document processing and connected data systems that turn complex workflows into reliable, scalable operations.",
    cta: { l: "Explore Our Solutions", href: "#products" }, thumb: "Intelligence that automates business",
  },
  {
    photo: "lens-desk", eyebrow: "VOVIX Lens · Live",
    title: ["From a pile of invoices to ", "balanced", " TallyPrime vouchers."],
    body: "Lens reads invoices, statements and KYC in 40+ languages, checks GSTIN, HSN and tax math, and exports TallyPrime XML, Excel or JSON.",
    cta: { l: "Explore VOVIX Lens", href: "https://lens.vovix.in/" }, thumb: "From invoice to TallyPrime",
  },
  {
    photo: "chennai", eyebrow: "Engineering services",
    title: ["Built in Chennai. ", "Working", " worldwide."],
    body: "Workflow automation, data pipelines, API integration and white-label engineering — scoped in writing, built with the checks in, handed over properly.",
    cta: { l: "See our services", href: "/services" }, thumb: "Built in Chennai, working worldwide",
  },
];
const DURATION = 7000;

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);   // user's explicit choice
  const [hold, setHold] = useState(false);       // hover / focus inside
  const [reduce, setReduce] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
  }, []);

  const go = useCallback((n: number) => setI((n + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused || hold || reduce) return;
    const t = setTimeout(() => { if (document.visibilityState === "visible") go(i + 1); }, DURATION);
    return () => clearTimeout(t);
  }, [i, paused, hold, reduce, go]);

  const running = !paused && !hold && !reduce;
  const s = SLIDES[i];

  return (
    <section ref={ref} aria-roledescription="carousel" aria-label="Highlights"
      className="on-dark relative isolate flex min-h-[620px] overflow-hidden bg-navy text-white md:min-h-[680px]"
      onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)} onBlurCapture={() => setHold(false)}>

      {/* Photos: all mounted so the cross-fade is instant; only the first is eager. */}
      {SLIDES.map((sl, n) => (
        <div key={sl.photo} aria-hidden={n !== i}
             className={`absolute inset-0 -z-20 transition-[opacity,transform] duration-[1200ms] ease-out ${n === i ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}>
          <Photo name={sl.photo} priority={n === 0} sizes="100vw" />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,27,37,0.95)_0%,rgba(7,40,54,0.78)_45%,rgba(7,40,54,0.25)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-deep/80 to-transparent" />

      <div className="shell relative flex flex-col justify-center pb-28 pt-16 md:pb-32">
        <div key={i} className="max-w-[640px]" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${SLIDES.length}`}>
          <p className="rise flex items-center gap-3 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-white/80">
            <span className="brand-rule" aria-hidden />{s.eyebrow}
          </p>
          {i === 0
            ? <h1 className="rise mt-6 text-balance text-[clamp(38px,5.4vw,66px)] font-semibold leading-[1.04] tracking-[-0.038em] [animation-delay:.08s]">{s.title[0]}<span className="text-brand-fill">{s.title[1]}</span>{s.title[2]}</h1>
            : <h2 className="rise mt-6 text-balance text-[clamp(36px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.036em] [animation-delay:.08s]">{s.title[0]}<span className="text-brand-fill">{s.title[1]}</span>{s.title[2]}</h2>}
          <p className="rise mt-6 max-w-[54ch] text-pretty text-lead font-normal text-white/80 [animation-delay:.16s]">{s.body}</p>
          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:.24s]">
            <Button href={s.cta.href} size="lg">{s.cta.l} <ArrowRight size={18} aria-hidden /></Button>
            <Button href="/contact" size="lg" variant="onDark">Discuss Your Project</Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="shell flex items-end justify-between gap-6 pb-7">
          <div className="flex items-center gap-3">
            <button onClick={() => go(i - 1)} aria-label="Previous slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:border-white hover:bg-white/10"><ChevronLeft size={18} /></button>
            <button onClick={() => go(i + 1)} aria-label="Next slide" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:border-white hover:bg-white/10"><ChevronRight size={18} /></button>
            {!reduce && (
              <button onClick={() => setPaused(!paused)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white hover:border-white hover:bg-white/10">
                {paused ? <Play size={15} /> : <Pause size={15} />}
              </button>
            )}
            <div className="ml-2 flex items-center gap-2" role="tablist" aria-label="Choose slide">
              {SLIDES.map((sl, n) => (
                <button key={sl.photo} role="tab" aria-selected={n === i} aria-label={`Slide ${n + 1}: ${sl.thumb}`} onClick={() => go(n)}
                  className={`relative h-1.5 overflow-hidden rounded-full bg-white/30 transition-all duration-500 ${n === i ? "w-12" : "w-4 hover:bg-white/60"}`}>
                  {n === i && (
                    <span key={`${i}-${running}`} className="absolute inset-y-0 left-0 bg-brand-fill"
                      style={running ? { animation: `heroProgress ${DURATION}ms linear forwards` } : { width: "100%" }} />
                  )}
                </button>
              ))}
            </div>
          </div>
          {/* Next-slide previews (desktop) */}
          <div className="hidden gap-3 lg:flex">
            {[1, 2].map((k) => {
              const n = (i + k) % SLIDES.length; const sl = SLIDES[n];
              return (
                <button key={sl.photo} onClick={() => go(n)} className="group w-[210px] rounded-card border border-white/20 bg-white/10 p-2 text-left backdrop-blur-md transition-colors hover:bg-white/20">
                  <span className="block aspect-[16/8] overflow-hidden rounded-[10px]"><Photo name={sl.photo} sizes="210px" className="transition-transform duration-500 group-hover:scale-105" /></span>
                  <span className="mt-2 block px-1 text-[12.5px] font-semibold leading-snug text-white">{sl.thumb}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`@keyframes heroProgress { from { width: 0 } to { width: 100% } }`}</style>
    </section>
  );
}
