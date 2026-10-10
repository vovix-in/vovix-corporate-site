import type { Metadata } from "next";
import { PageShell, Prose } from "@/components/page-shell";
import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the VOVIX website.",
  alternates: { canonical: "/legal/terms" },
};

/* Content ported verbatim from the static site. Legal wording is
   counsel-adjacent — do not paraphrase when editing. */
export default function Page() {
  return (
    <PageShell eyebrow="Legal" title="Terms of Use" lead="The terms that apply when you use the VOVIX website.">
      <Section>
        <Prose>
          <div className="mb-8 rounded-card border border-line bg-ground-sub p-5 text-small text-ink-secondary">
            <strong className="font-semibold text-ink">Updates:</strong> We may revise these terms from time to time. The version on this page is the one that applies when you use the site. Product or subscription terms for specific applications may be published separately (for example on <a className="font-semibold text-brand-ink hover:underline" href="https://lens.vovix.in/" target="_blank" rel="noopener noreferrer">lens.vovix.in</a>) where they apply.
          </div>
          <h2>No Professional Advice</h2>
          <p>VOVIX builds software tools to automate tasks and support operational decisions for businesses. Corporate-site content is general in nature and does not constitute legal, tax, accounting, or other professional advice tailored to your situation unless you have a separate written agreement with us.</p>
          <h2>Market-Related Tools</h2>
          <p>Where a VOVIX product involves securities or markets (for example equities), outputs are informational and educational only, not investment advice. Securities involve risk; past performance does not guarantee future results. Verify data with exchanges and official disclosures. Product-specific compliance notes are provided on the relevant product pages.</p>
          <h2>Acceptable Use</h2>
          <p>By using this website you agree not to misuse services, scrape in violation of robots or rate limits, or attempt to interfere with security. Specific terms may be updated; check this page periodically.</p>
          <p>Last updated: 23 April 2026</p>
        </Prose>
      </Section>
    </PageShell>
  );
}
