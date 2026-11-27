"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarClock } from "lucide-react";
import { SCHEDULER_URL, track } from "@/lib/analytics";

/* The "book a time" slot. Renders nothing until NEXT_PUBLIC_SCHEDULER_URL
   is set, so the site works without a booking tool. The embed is lazy:
   the iframe is created only when the block scrolls near the viewport,
   and its visit is tracked once as scheduler_open.                      */

export function Scheduler({ place = "contact", title = "Book a 30-minute payroll walkthrough" }: { place?: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (!SCHEDULER_URL || !ref.current) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setNear(true); track("scheduler_open", { place }); io.disconnect(); }
    }, { rootMargin: "400px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [place]);

  if (!SCHEDULER_URL) return null;
  return (
    <div ref={ref} id="schedule" className="scroll-mt-28 overflow-hidden rounded-panel border border-line bg-white shadow-lifted">
      <div className="flex items-center gap-3 border-b border-line bg-ground-sub px-5 py-3.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><CalendarClock size={16} aria-hidden /></span>
        <div className="min-w-0">
          <p className="text-[15px] font-bold leading-snug text-ink">{title}</p>
          <p className="text-[12.5px] text-ink-muted">Pick a slot that suits you (IST). We confirm by email.</p>
        </div>
      </div>
      {near
        ? <iframe src={SCHEDULER_URL} title={title} loading="lazy" className="block h-[720px] w-full" referrerPolicy="strict-origin-when-cross-origin" />
        : <div className="h-[720px] w-full bg-ground-sub/60" aria-hidden />}
      <p className="border-t border-line px-5 py-3 text-[12px] text-ink-muted">
        Calendar not loading? <a href={SCHEDULER_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-ink hover:underline">Open it in a new tab</a> or email admin@vovix.in.
      </p>
    </div>
  );
}
