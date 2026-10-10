import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section, Reveal } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — Discuss Your Automation Project",
  description: "Talk to VOVIX about workflow automation, AI document processing, data pipelines, API integration or white-label engineering under NDA.",
  alternates: { canonical: "/contact" },
};

const DETAILS = [
  { i: Mail, k: "Email", v: "admin@vovix.in", href: "mailto:admin@vovix.in" },
  { i: Phone, k: "Phone", v: "+91 90806 40562", href: "tel:+919080640562" },
  { i: MapPin, k: "Office", v: "Guduvancheri, Tamil Nadu, India" },
  { i: Clock, k: "Hours", v: "Mon–Fri, 9am – 6pm IST" },
];

export default function Contact() {
  return (
    <PageShell eyebrow="Contact" title="Let's Automate What's Slowing Your Business Down."
      lead="Tell us about your workflow, data challenges, or integration requirements. We'll explore a practical engineering solution tailored to your business.">
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr]">
          <Reveal>
            <div className="rounded-panel border border-line bg-white p-6 shadow-lifted sm:p-8">
              <h2 className="text-h3 text-ink">Discuss your project</h2>
              <p className="mb-6 mt-2 text-small text-ink-secondary">Describe one process your team repeats every week, or the system you need connected. You&rsquo;ll get a straight answer on feasibility, a timeline, and what a first delivery slice looks like — or an honest &ldquo;not a fit&rdquo;.</p>
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-panel border border-line bg-ground-sub p-7">
              <p className="eyebrow mb-5">Contact details</p>
              <div className="space-y-5">
                {DETAILS.map((d) => (
                  <div key={d.k} className="flex gap-3">
                    <d.i size={17} className="mt-0.5 shrink-0 text-brand-ink" aria-hidden />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">{d.k}</p>
                      {d.href
                        ? <a href={d.href} className="text-small font-semibold text-ink hover:text-brand-ink">{d.v}</a>
                        : <p className="text-small font-semibold text-ink">{d.v}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {[["First reply", "Typically within one business day (IST, Mon–Fri)."],
                ["Scope first", "A written understanding before we commit to any build."],
                ["Partners", "White-label work starts with a mutual NDA, signed before you share client details."]].map(([h, p]) => (
                <div key={h} className="rounded-card border border-line bg-white p-5">
                  <p className="text-[14.5px] font-bold text-ink">{h}</p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-secondary">{p}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
