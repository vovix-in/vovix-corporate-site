import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Section, Reveal, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact | Vovix Private Limited",
  description: "Talk to Vovix about a platform build, an automation project, or white-label delivery under NDA.",
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
    <PageShell eyebrow="Enquiries" title="Let's talk about what you're building"
      lead="For project scope, partnership discussions or product questions. We aim to reply within one business day (IST, Monday–Friday).">
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h2 className="text-h2 text-ink">Start the conversation</h2>
            <p className="mt-4 text-lead text-ink-secondary">
              Describe one process your team repeats every week, or the platform you need built. You&rsquo;ll get a straight answer on feasibility, a timeline, and what a first delivery slice looks like — or an honest &ldquo;not a fit&rdquo;.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="mailto:admin@vovix.in?subject=Project%20enquiry%20-%20vovix.in" size="lg"><Mail size={17} /> Email us</Button>
              <Button href="/services#white-label" size="lg" variant="secondary">White-label enquiry</Button>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[["< 1 day","First reply","Typical first reply within one business day."],
                ["Scope first","Written understanding","A written scope before we commit to any build."],
                ["No hype","No fake wins","We won't invent client logos or savings percentages."]].map(([tag,h,p]) => (
                <div key={h} className="rounded-card border border-line bg-ground-paper p-5">
                  <span className="inline-block rounded-chip bg-brand-wash px-2 py-1 font-mono text-[11px] font-bold text-brand-ink">{tag}</span>
                  <p className="mt-3 text-[15px] font-bold text-ink">{h}</p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-secondary">{p}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-card border border-line bg-ground-sub p-7">
              <p className="eyebrow mb-5">Contact details</p>
              <div className="space-y-5">
                {DETAILS.map((d) => (
                  <div key={d.k} className="flex gap-3">
                    <d.i size={17} className="mt-0.5 shrink-0 text-brand-ink" />
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
          </Reveal>
        </div>
      </Section>
    </PageShell>
  );
}
