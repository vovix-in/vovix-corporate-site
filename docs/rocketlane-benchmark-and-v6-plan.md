# Rocketlane benchmark → VOVIX website v6 plan

Reviewed 27 Nov 2026. Compared www.rocketlane.com (homepage, 15k px, Webflow)
against www.vovix.in (production = origin/main, which already has VOVIX Payroll).

## 1. How Rocketlane built their site

| Layer | Rocketlane | VOVIX today |
| --- | --- | --- |
| Builder | Webflow (marketing team edits without engineers) | Next.js 14 + Tailwind, engineer-edited |
| Type | IBM Plex Sans body, Geist/SF Pro display, Montserrat legacy | Plus Jakarta Sans + JetBrains Mono |
| Accent | One blue `#0F62FE`, white + `#F5F5F7` sections, one black section | Emerald + navy, already consistent |
| Motion | 3 Lottie animations, scroll-pinned sticky side-nav, blurred reveal | Framer-motion reveals, photo slider, live demos |
| Forms | HubSpot forms + RevenueHero scheduler (books a demo instantly) | Custom form → Gmail API |
| Analytics | GTM, GA4, Clarity, 6sense, Factors.ai, Capterra, Clay, Bing, Meta pixels | None visible |
| Consent | Cookiebot banner | None |

Page skeleton, top to bottom:

1. Announcement bar with its own offer and email capture ("your next data migration is on us").
2. Nav: Platform / Solutions / Resources / Customers / Pricing + **Free trial** + **Book a demo**. Mega menus with one-line descriptions per item.
3. Hero: one H1, one sentence, two CTAs, full-bleed illustrated art. No carousel.
4. Logo wall: 12 customer logos in a grid.
5. Two product cards (platform, agents).
6. Dark "trifecta" Venn diagram naming the three pillars.
7. **Three pillar sections**, each identical in shape: sticky left tab list → full-width banner image + CTA → H2 + lead + Learn more → product mock image → three feature columns → **customer quote with photo, logo, title, and a number**.
8. Proof block: big stats (86%, 100%) + two more quotes.
9. Ecosystem / community strip.
10. Closing CTA (Free trial + Book a demo).
11. Mega footer: products, industries, integrations, security, resources, compare-vs pages.

The rule they follow everywhere: **claim → product picture → three specifics → named customer with a number → CTA**. Every scroll of the page ends in proof.

## 2. Where VOVIX is already ahead

- Live, interactive product demos instead of static mock images. Keep this; it is the strongest thing on the site.
- "Facts, not badges" security block and the engineer-facing JSON payload. Honest and specific.
- Technical SEO basics (JSON-LD, sitemap, canonical) are in place.
- Visual system is tighter than Rocketlane's (they carry five font families).

## 3. The gaps, ranked by impact on payroll leads

1. **Hero dilutes the priority.** Three rotating slides; slide 1 is generic ("Intelligence that automates business"). Rocketlane commits to one promise. Lead with Payroll: one H1, one line, CTA "Book a payroll walkthrough" + secondary "See how a month runs".
2. **No external proof.** Stats are self-referential (3 products, 2026 incorporated). Zero customer logos, quotes, or outcome numbers. Early access is not an excuse: 2–3 pilot factories, even anonymised ("86-employee precision components plant, Ambattur"), each with one number (days from punch close to payday, filings proven, hours of HR time removed).
3. **No dedicated product pages.** Payroll lives at `/products#payroll`, one anchor among three. It needs its own route (`/payroll`) with the Rocketlane pillar shape applied to its five stages: Attendance · Calculate · Approve · Pay · Prove. Each stage: banner, three specifics, a proof quote.
4. **No pricing, no scheduler.** The only CTA is a contact form. Payroll buyers (factory owners) compare on price per employee per month. Add `/payroll/pricing` (even "from ₹X per employee, minimum 20") and an embedded calendar on the CTA.
5. **No resource layer.** Rocketlane has a blog, academy, templates, community. For Tamil Nadu payroll SEO: PF/ESI/PT/LWF due-date calendar, Factories Rules register templates, TN minimum wage table, "how to read your ECR challan". These are lead magnets and the long-tail search terms owners actually type.
6. **No compare pages.** `/compare/vs-keka`, `/vs-greythr`, `/vs-zoho-payroll`, `/vs-your-ca` capture high-intent search and frame the difference (managed service with proof ledger, not self-serve software).
7. **No analytics or conversion tracking.** Cannot measure any of the above. GA4 + GTM + Microsoft Clarity (free) and a CRM-backed form.
8. **Three audiences on one homepage.** Products, services, white-label. Rocketlane is one thing. Keep services and white-label, but push them below the fold under one "We also build" section.

## 4. Proposed v6 homepage order

1. Announcement bar (already exists): rotate the payroll offer.
2. Nav: Payroll / Products / Services / Resources / Pricing + **Book a walkthrough**.
3. Hero: payroll-first, single message, one photo, no carousel.
4. Proof strip: pilot factory names or sectors + one headline number.
5. "A month of payroll, proven": five-stage pillar block (sticky tabs, Rocketlane pattern) using the existing live Payroll demo as the "product mock".
6. Quote from a pilot owner with photo and a number.
7. Platform diagram (exists) retitled "The engine under Payroll, OneView and Edge".
8. Other products: OneView, Edge as two cards.
9. "We also build": services bento, condensed to one row.
10. Security facts (exists) + link to a new `/security` page.
11. FAQ (exists), payroll questions first.
12. Closing CTA with calendar embed, not just a form.

## 5. New pages

| Route | Purpose |
| --- | --- |
| `/payroll` | Pillar page: five stages, proof, FAQ, CTA |
| `/payroll/pricing` | Per-employee pricing, what is included, what the owner still does |
| `/payroll/compliance/{pf,esi,pt,lwf,tds}` | One explainer each; SEO + trust |
| `/customers` | Pilot stories (anonymised until permitted) |
| `/compare/vs-*` | Keka, greytHR, Zoho Payroll, "your CA" |
| `/resources` | Due-date calendar, register templates, guides |
| `/security` | Expanded "facts, not badges" |

## 6. Build order (each a PR)

1. Pull origin/main first: this checkout (`redesign/v3-brand`) is 21 commits behind and does not have Payroll.
2. Analytics + consent + scheduler wiring (small, unlocks measurement).
3. Payroll-first hero and nav.
4. `/payroll` pillar page with the five-stage sticky block.
5. Proof: collect 2–3 pilot quotes and numbers; add proof strip + `/customers`.
6. Pricing page.
7. Compliance explainers + resources (content-led, can run in parallel).
8. Compare pages.

Keep Next.js. Webflow buys Rocketlane editor-friendliness, but the live demos, the JSON blocks and the motion are cheaper to keep in code. If non-engineers need to edit the resource pages, add MDX under `/content` rather than moving platforms.
