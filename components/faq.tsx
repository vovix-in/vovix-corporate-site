import { Plus } from "lucide-react";

export const FAQ = [
  ["Do you only sell products, or also build custom automation?", "Both. VOVIX Lens, OneView and Edge run on the same engine we use for client builds. We take on custom automation, AI and integration projects directly, or white-label behind an agency under mutual NDA."],
  ["How accurate is document extraction?", "We don't quote a blanket accuracy number. Every extracted field carries a confidence score and is linked to its place on the source page; anything below your threshold goes to a person before it posts."],
  ["What does VOVIX Lens export to?", "TallyPrime XML vouchers, plus Excel, JSON and CSV. GSTIN, HSN/SAC, tax-math and ITC checks run before anything exports."],
  ["Where is our data stored?", "VOVIX Lens is hosted on AWS in the Mumbai region, isolated per firm, with AES-256 encryption at rest and TLS in transit. For client builds, data stays in the infrastructure we agree with you."],
  ["How does an engagement start?", "With a written scope: the workflow, the systems it touches, where a person stays in the loop, and what we'd advise you not to automate yet. Nothing is built before that's agreed."],
  ["Is OneView or Edge investment advice?", "No. OneView is informational research and VOVIX is not a SEBI-registered adviser or research analyst. Edge is decision-support software; forex trading carries a high level of risk and no profit is promised."],
];

export function Faq() {
  return (
    <div className="divide-y divide-line-strong border-y border-line-strong">
      {FAQ.map(([q, a], i) => (
        <details key={q} className="group py-1" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="text-[17px] font-semibold text-ink">{q}</span>
            <Plus size={20} className="shrink-0 text-brand-ink transition-transform duration-300 group-open:rotate-45" aria-hidden />
          </summary>
          <p className="max-w-[68ch] pb-6 text-body text-ink-secondary">{a}</p>
        </details>
      ))}
    </div>
  );
}
