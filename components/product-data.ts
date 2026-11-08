/* Shared product copy — server-safe (no "use client"), used by the
   homepage showcase and the /products page. Claims here are checked
   against payroll.vovix.in and edge.vovix.in; keep them in sync. */
export const SHOWCASE = [
  {
    id: "payroll", name: "VOVIX Payroll", tag: "Payroll & compliance",
    status: "Early access", live: false,
    title: "Your factory's payroll, run every month, with every statutory filing proven.",
    body: "Managed payroll, compliance and workforce operations for Tamil Nadu factories with 20 to 150 employees. Vovix runs the month, the owner approves, and PF, ESI, PT, LWF and TDS each carry their own evidence.",
    flow: ["Attendance", "Calculate", "Approve", "Pay", "Prove"],
    points: [
      "Biometric punches reconciled to shifts, overtime at 2x, every exception queued for a person with an owner and a deadline",
      "Maker–checker by design: Vovix prepares, the owner approves, nothing is paid without sign-off",
      "A seven-state proof ledger per filing: a challan counts as done only when the bank debit matches it",
      "Tamil Nadu Factories Rules registers and an inspector-ready proof pack generated from payroll data",
      "Tamil-first employee app with offline payslips; bank files and challans are yours to pay and upload",
    ],
    cta: { l: "Talk to us about VOVIX Payroll", href: "/contact" },
    note: "Vovix does not hold or move funds and does not file on government portals by API. Statutory files are prepared for your business to pay and upload; your DSC stays with you.",
  },
  {
    id: "oneview", name: "VOVIX OneView", tag: "Conversational research",
    status: "Live", live: true,
    title: "Company research, delivered as a conversation on WhatsApp.",
    body: "Ask about any NSE or BSE-listed company and get a structured financial tear-sheet back in the chat — no separate app, no dashboard to learn.",
    flow: ["Ask", "Retrieve", "Analyse", "Summarise", "Follow up"],
    points: [
      "Plain-language questions about listed Indian companies",
      "Fundamentals, valuation, growth and technicals in one structured report",
      "Follow-up questions answered in the context of the company",
      "Runs inside the chat app your users already have",
      "Every report carries a disclaimer — information, not investment advice",
    ],
    cta: { l: "Discover VOVIX OneView", href: "/products#oneview" },
  },
  {
    id: "edge", name: "VOVIX Edge", tag: "Quantitative technology",
    status: "Early access", live: false,
    title: "Decision support and execution for forex, with the brakes built in.",
    body: "Monitors economic catalysts and market context, issues a signal only when a setup qualifies, and can execute on a connected MetaTrader 5 account under strict risk boundaries.",
    flow: ["Monitor", "Evaluate", "Qualify", "Execute", "Journal"],
    points: [
      "7 major pairs plus gold, monitored 24/5 across Asia, London and New York",
      "Each catalyst evaluated against live context — most candidates are rejected",
      "Advisory by default; optional automated execution on your MT5 account",
      "Pre-event blackouts, automated exit management and a kill switch for automation",
      "Every signal logged and measured against real market outcomes",
    ],
    cta: { l: "Explore VOVIX Edge", href: "https://edge.vovix.in/" },
    note: "Forex trading carries a high level of risk. VOVIX Edge does not promise profits or protect against losses.",
  },
] as const;
