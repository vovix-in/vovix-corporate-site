"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { ANALYTICS_CONFIGURED, CLARITY_ID, GA_ID, readConsent, writeConsent, onConsentChange, track, type Consent } from "@/lib/analytics";

/* Mounted once in the root layout. Three jobs:
   1. Load GA4 and Clarity only after consent is granted.
   2. Turn clicks on any element carrying data-event into track() calls,
      so CTAs are instrumented with an attribute instead of a handler.
   3. Show the consent banner until the visitor has chosen.             */

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src; s.async = true;
  document.head.appendChild(s);
}

function enable() {
  if (GA_ID) {
    window.dataLayer ||= [];
    // gtag must push `arguments`, not a spread array, or GA ignores it.
    window.gtag = function gtag() { window.dataLayer!.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("config", GA_ID, { anonymize_ip: true });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`);
  }
  if (CLARITY_ID && !window.clarity) {
    const q: unknown[][] = [];
    window.clarity = function clarity() { q.push(Array.from(arguments)); };
    (window.clarity as unknown as { q: unknown[][] }).q = q;
    loadScript(`https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_ID)}`);
  }
}

export function Analytics() {
  const [consent, setConsent] = useState<Consent | null | "unknown">("unknown");

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    if (c === "granted") enable();
    return onConsentChange((next) => { setConsent(next); if (next === "granted") enable(); });
  }, []);

  // Delegated CTA tracking: <a data-event="cta_click" data-place="hero">.
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-event]");
      if (!el) return;
      const { event, ...rest } = el.dataset;
      const params: Record<string, string> = {};
      for (const [k, v] of Object.entries(rest)) if (v !== undefined) params[k] = v;
      params.label ||= (el.textContent ?? "").trim().slice(0, 60);
      const href = el.getAttribute("href"); if (href) params.href = href;
      track(event as Parameters<typeof track>[0], params);
    };
    document.addEventListener("click", h, { capture: true });
    return () => document.removeEventListener("click", h, { capture: true });
  }, []);

  if (!ANALYTICS_CONFIGURED || consent !== null) return null;
  return <ConsentBanner onChoose={writeConsent} />;
}

function ConsentBanner({ onChoose }: { onChoose: (c: Consent) => void }) {
  return (
    <div role="region" aria-label="Analytics consent"
         className="rise fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-[520px] rounded-card border border-line bg-white p-4 shadow-floating sm:inset-x-auto sm:left-5 sm:bottom-5 sm:p-5">
      <div className="flex gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-brand-wash text-brand-ink"><ShieldCheck size={16} aria-hidden /></span>
        <div className="min-w-0">
          <p className="text-[14px] font-bold leading-snug text-ink">Help us see which pages are useful?</p>
          <p className="mt-1 text-[12.5px] leading-snug text-ink-secondary">
            With your OK we use Google Analytics{CLARITY_ID ? " and Microsoft Clarity" : ""} to count visits and see which parts of the site get used. No advertising cookies, nothing until you say yes. <a href="/legal/privacy" className="font-semibold text-brand-ink hover:underline">Privacy policy</a>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => onChoose("granted")} className="rounded-control bg-brand-fill px-3.5 py-2 text-[13px] font-bold text-navy hover:bg-brand-ink hover:text-white">Allow analytics</button>
            <button type="button" onClick={() => onChoose("denied")} className="rounded-control border border-line-strong px-3.5 py-2 text-[13px] font-semibold text-ink-secondary hover:text-ink">No thanks</button>
          </div>
        </div>
      </div>
    </div>
  );
}
