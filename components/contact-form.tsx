"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Copy, Check, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui";

/* Submission path: the form posts to /api/contact, which delivers the
   enquiry to our inbox. We only show "sent" when the server confirms it.
   If that fails for any reason, we fall back to composing the email in
   the visitor's own mail app, with a copy-to-clipboard fallback if no
   client opens — so an enquiry is never silently lost.                */

const TO = "admin@vovix.in";
const TOPICS = [
  "Workflow automation", "AI document processing", "Data pipelines", "API & system integration",
  "Web data ingestion", "Custom software / internal tools", "White-label partnership",
  "VOVIX Lens", "VOVIX OneView", "VOVIX Edge", "Something else",
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "handed" | "copied">("idle");
  const [draft, setDraft] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("name")) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) next.email = "Enter a valid email so we can reply.";
    if (v("message").length < 20) next.message = "A sentence or two about the workflow helps us reply usefully (20+ characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const subject = `Project enquiry — ${v("topic")}${v("company") ? ` — ${v("company")}` : ""}`;
    const lines = [`Name: ${v("name")}`, `Email: ${v("email")}`];
    if (v("company")) lines.push(`Company: ${v("company")}`);
    lines.push(`Topic: ${v("topic")}`, "", v("message"));
    const body = lines.join("\n");
    setDraft(`To: ${TO}\nSubject: ${subject}\n\n${body}`);

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(["name", "email", "company", "topic", "message", "website"].map((k) => [k, v(k)]))),
      });
      if (res.ok) { form.reset(); setState("sent"); return; }
    } catch { /* network failure: fall through to the mail-app handoff */ }
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setState("handed");
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(draft); setState("copied"); } catch { /* clipboard blocked: the text is visible to select */ }
  };

  const label = dark ? "text-white/80" : "text-ink";
  const input = `mt-1.5 block w-full rounded-control border px-3.5 py-3 text-[15px] outline-none transition-colors placeholder:text-ink-muted/70 focus:border-cyan-ink focus:ring-2 focus:ring-cyan-fill/40 ${
    dark ? "border-white/15 bg-white text-ink" : "border-line-strong bg-white text-ink"}`;
  const err = (k: keyof Errors) => errors[k] && (
    <p id={`${k}-err`} className={`mt-1.5 flex items-center gap-1.5 text-[12.5px] font-semibold ${dark ? "text-[#FFB4AE]" : "text-state-crit"}`}>
      <AlertCircle size={13} aria-hidden />{errors[k]}
    </p>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="form-note">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={`text-[13px] font-semibold ${label}`}>Name <span aria-hidden>*</span></label>
          <input id="cf-name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} className={input} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="cf-email" className={`text-[13px] font-semibold ${label}`}>Work email <span aria-hidden>*</span></label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} className={input} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="cf-company" className={`text-[13px] font-semibold ${label}`}>Company</label>
          <input id="cf-company" name="company" autoComplete="organization" className={input} />
        </div>
        <div>
          <label htmlFor="cf-topic" className={`text-[13px] font-semibold ${label}`}>What is this about?</label>
          <select id="cf-topic" name="topic" className={input} defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={`text-[13px] font-semibold ${label}`}>Describe the workflow or integration <span aria-hidden>*</span></label>
        <textarea id="cf-message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined}
          placeholder="e.g. We receive ~800 purchase invoices a month by email and key them into Tally by hand…" className={`${input} resize-y`} />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it are dropped server-side. */}
      <div className="hidden" aria-hidden>
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit" size="lg" disabled={state === "sending"}><Mail size={17} aria-hidden /> {state === "sending" ? "Sending…" : "Discuss Your Project"}</Button>
        <p id="form-note" className={`text-[12.5px] leading-snug ${dark ? "text-white/60" : "text-ink-muted"}`}>
          Sends this message straight to {TO}. We reply to the email you enter.
        </p>
      </div>

      <div aria-live="polite">
        {state === "sent" && (
          <div className={`rise mt-2 flex items-start gap-3 rounded-card border p-4 ${dark ? "border-white/15 bg-white/[0.05]" : "border-line bg-ground-sub"}`}>
            <CheckCircle2 size={18} className={`mt-0.5 shrink-0 ${dark ? "text-brand-onspec" : "text-brand-ink"}`} aria-hidden />
            <div>
              <p className={`text-[13.5px] font-semibold ${dark ? "text-white" : "text-ink"}`}>Message sent — it is in our inbox.</p>
              <p className={`mt-1 text-[12.5px] ${dark ? "text-white/60" : "text-ink-muted"}`}>We will reply to the email address you entered.</p>
            </div>
          </div>
        )}
        {(state === "handed" || state === "copied") && (
          <div className={`rise mt-2 rounded-card border p-4 ${dark ? "border-white/15 bg-white/[0.05]" : "border-line bg-ground-sub"}`}>
            <p className={`text-[13.5px] font-semibold ${dark ? "text-white" : "text-ink"}`}>
              We could not send this from the site, so your message is ready in your email app — press send there to reach us.
            </p>
            <p className={`mt-1 text-[12.5px] ${dark ? "text-white/60" : "text-ink-muted"}`}>
              No email app opened? Copy the message and send it to <a className="font-semibold underline" href={`mailto:${TO}`}>{TO}</a>.
            </p>
            <button type="button" onClick={copy} className={`mt-3 inline-flex items-center gap-1.5 rounded-control border px-3 py-2 text-[12.5px] font-semibold ${dark ? "border-white/20 text-white hover:bg-white/10" : "border-line-strong text-ink hover:bg-white"}`}>
              {state === "copied" ? <><Check size={14} aria-hidden /> Copied</> : <><Copy size={14} aria-hidden /> Copy message</>}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
