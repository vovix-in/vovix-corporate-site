import type { Metadata } from "next";
import { PageShell, Prose } from "@/components/page-shell";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | Vovix",
  description: "How the Vovix corporate website collects and uses information.",
  alternates: { canonical: "/legal/privacy" },
};

/* Content ported verbatim from the static site. Legal wording is
   counsel-adjacent — do not paraphrase when editing. */
export default function Page() {
  return (
    <PageShell eyebrow="Legal" title="Privacy Policy" lead="How the Vovix corporate website collects and uses information.">
      <Section>
        <Prose>
          <div className="mb-8 rounded-card border border-line bg-ground-sub p-5 text-small text-ink-secondary">
            Product-specific privacy terms may apply on <a className="font-semibold text-brand-ink hover:underline" href="https://lens.vovix.in/" target="_blank" rel="noopener noreferrer">lens.vovix.in</a> where relevant.
          </div>
          <h2>Data we may collect</h2>
          <ul>
            <li>Technical logs and analytics events when you browse this website.</li>
            <li>Information you voluntarily send via email or other contact channels.</li>
          </ul>
          <h2>How we use it</h2>
          <p>We use this information to operate and improve the website, respond to enquiries, and maintain security and reliability.</p>
          <h2>Contact</h2>
          <p>Questions about this policy: admin@vovix.in</p>
          <p>Last updated: 23 April 2026</p>
        </Prose>
      </Section>
    </PageShell>
  );
}
