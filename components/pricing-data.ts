/* VOVIX Payroll pricing — the single place the numbers live.

   ┌──────────────────────────────────────────────────────────────────┐
   │ CONFIRMED is false: the figures below are INDICATIVE placeholders │
   │ chosen to build and review the page. Replace them with the agreed │
   │ price list, then set CONFIRMED to true. While false, the page     │
   │ shows an "indicative" notice and the Offer JSON-LD carries no     │
   │ price, so search engines never index a wrong number.              │
   └──────────────────────────────────────────────────────────────────┘ */

export const CONFIRMED = false;

export const CURRENCY = "INR";
export const MIN_EMPLOYEES = 20;
export const MAX_EMPLOYEES = 150;

/* Per employee per month, excluding GST. The rate for a plant is the tier
   its headcount falls in, applied to every employee (not marginal).      */
export const TIERS = [
  { upTo: 49,  rate: 199, label: "20 – 49 employees" },
  { upTo: 99,  rate: 169, label: "50 – 99 employees" },
  { upTo: 150, rate: 149, label: "100 – 150 employees" },
];

/* One-time, excluding GST: data migration, shift and rate setup, first
   parallel run against the previous month.                              */
export const ONBOARDING = 15000;

export const GST_NOTE = "All prices exclude GST at 18%.";

export function rateFor(employees: number) {
  const n = Math.min(Math.max(employees, MIN_EMPLOYEES), MAX_EMPLOYEES);
  return TIERS.find((t) => n <= t.upTo)?.rate ?? TIERS[TIERS.length - 1].rate;
}

export function monthlyFor(employees: number) {
  const n = Math.min(Math.max(employees, MIN_EMPLOYEES), MAX_EMPLOYEES);
  return n * rateFor(n);
}

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export const INCLUDED = [
  "Biometric punch reconciliation to shifts, overtime at 2x, exception queue",
  "Gross-to-net for every employee with PF, ESI, PT, LWF and TDS worked",
  "Variance check against the previous month, explained line by line",
  "Owner approval screen with maker-checker and a full audit trail",
  "Bank payment file in your bank's bulk-upload format",
  "PF ECR, ESI contribution, PT, LWF and TDS workings and challans prepared",
  "Compliance proof ledger: challan and bank debit matched per filing",
  "Tamil Nadu Factories Rules registers and the inspector-ready pack",
  "Tamil-first payslips and the employee app with offline access",
  "A named Vovix operator and support on WhatsApp and email, Mon–Sat",
];

export const NOT_INCLUDED = [
  { h: "Statutory dues and salaries", p: "You pay PF, ESI, PT, LWF, TDS and net salaries from your own accounts. Vovix never holds or moves funds." },
  { h: "Portal uploads and your DSC", p: "Filing on EPFO, ESIC and TRACES is done by your business with your digital signature. Vovix prepares every file." },
  { h: "Registrations and advice", p: "New PF, ESI or PT registrations, and legal or tax advice, are outside the service. We work alongside your auditor." },
  { h: "Hardware", p: "Biometric devices stay yours. We read their exports; we do not supply or service them." },
];

export const FAQ: [string, string][] = [
  ["How is the monthly fee calculated?", "Headcount on the last day of the month, multiplied by the per-employee rate for the tier that headcount falls in. Joiners and exits during the month are included in the run at no extra charge."],
  ["Is there a minimum?", `Yes: ${MIN_EMPLOYEES} employees. Below that, a managed service does not make sense for either side; a part-time accountant will serve you better and we will say so on the walkthrough.`],
  ["What does onboarding cover?", "Migrating employee masters and year-to-date figures, setting up shift patterns, rates and statutory registrations in the system, and one parallel run against your previous month so the first live month is already checked."],
  ["Is there a contract?", "Monthly billing, with a 30-day notice period either way. Early-access factories lock their rate for 12 months."],
  ["What about GST and invoices?", `${GST_NOTE} A GST invoice is issued on the 1st of each month for the month ahead.`],
  ["Do we pay for the employee app?", "No. Payslips, the employee app and the inspector pack are part of the service, not add-ons."],
];
