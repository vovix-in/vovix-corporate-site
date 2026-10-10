/* Shared product copy — server-safe (no "use client"), used by the
   homepage showcase and the /products page. Claims here are checked
   against lens.vovix.in and edge.vovix.in; keep them in sync. */
export const SHOWCASE = [
  {
    id: "lens", name: "VOVIX Lens", tag: "Document intelligence",
    status: "Live", live: true,
    title: "Turn business documents into verified accounting data.",
    body: "AI-powered document intelligence and financial data extraction for CA firms, finance and accounting teams, and back-office operations that process documents at volume.",
    flow: ["Capture", "Read", "Extract", "Validate", "Export"],
    points: [
      "Invoices, receipts, bank statements and KYC — printed, scanned or handwritten",
      "Reads 40+ languages, including Indic scripts",
      "GSTIN, HSN/SAC, tax-math and ITC (Sec 17(5)) checks before anything exports",
      "Every field linked to its place on the source page, with a confidence score",
      "Export to TallyPrime XML, Excel, JSON or CSV",
    ],
    cta: { l: "Explore VOVIX Lens", href: "https://lens.vovix.in/" },
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
