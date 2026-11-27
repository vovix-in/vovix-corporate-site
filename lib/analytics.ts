/* Analytics and consent, in one place.

   Configuration is by public env vars, all optional:
     NEXT_PUBLIC_GA_ID         GA4 measurement id (G-XXXXXXX)
     NEXT_PUBLIC_CLARITY_ID    Microsoft Clarity project id
     NEXT_PUBLIC_SCHEDULER_URL Embeddable booking page (Google Calendar
                               appointment schedule, Cal.com, Calendly…)

   Nothing third-party loads until the visitor allows it in the consent
   banner. The choice is kept in localStorage, so it survives reloads but
   never leaves the browser. A Global Privacy Control signal counts as a
   "no" and the banner is not shown.

   track() is safe to call anywhere on the client: when GA4 is not loaded
   (no id, or consent withheld) the event is dropped after being pushed to
   window.dataLayer, so a tag manager added later still sees it.          */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";
export const SCHEDULER_URL = process.env.NEXT_PUBLIC_SCHEDULER_URL ?? "";
export const ANALYTICS_CONFIGURED = Boolean(GA_ID || CLARITY_ID);

export type Consent = "granted" | "denied";
const KEY = "vx_consent";
const EVENT = "vx-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  // GPC is an explicit opt-out signal; honour it without asking.
  if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return "denied";
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch { return null; }
}

export function writeConsent(c: Consent) {
  try { localStorage.setItem(KEY, c); } catch { /* private mode: the choice lasts for this page only */ }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: c }));
}

export function onConsentChange(fn: (c: Consent) => void) {
  const h = (e: Event) => fn((e as CustomEvent<Consent>).detail);
  window.addEventListener(EVENT, h);
  return () => window.removeEventListener(EVENT, h);
}

/* Event vocabulary. Keep names snake_case and stable: they become GA4
   event names and, later, conversions.                                   */
export type EventName =
  | "cta_click"            // any primary/secondary CTA; params: place, label, href
  | "lead_submit"          // contact form submitted; params: topic, outcome
  | "payroll_stage_view"   // a /payroll stage scrolled into view; params: stage
  | "scheduler_open";      // the booking embed became visible; params: place

export function track(name: EventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  (window.dataLayer ||= []).push({ event: name, ...params });
  window.gtag?.("event", name, params);
}
