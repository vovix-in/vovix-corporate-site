# Vovix — Brand & Design Context

> Authoritative reference for the **design** plugin (design-critique, design-system,
> design-handoff, ux-copy, accessibility-review, user-research, research-synthesis).
> Every skill in the `design` plugin should treat this file as the source of truth
> for Vovix brand voice, visual language, and design constraints.

## 1. Company

- **Name:** Vovix Pvt Ltd
- **Domain:** vovix.in · app domain `app.vovix.in`
- **Primary product:** **Vovix OneCrawl** — enterprise document intelligence platform.
  Crawls public sources (NSE, BSE, SEC EDGAR, company IR sites), downloads PDFs,
  parses + OCRs them, and exports structured rows to Sheets / Excel / API.
- **Buyer:** Equity research analysts, financial data ops teams, compliance teams,
  audit / due-diligence firms.
- **Tagline:** *From raw documents to structured intelligence.*

## 2. Positioning & voice

| Axis              | Vovix is…                          | Vovix is **not**…                  |
|-------------------|------------------------------------|------------------------------------|
| Tone              | Precise, confident, calm           | Hype-y, jokey, emoji-heavy         |
| Vocabulary        | Enterprise + practitioner          | Buzzword, "AI magic"               |
| Voice register    | Engineer-to-analyst peer           | Sales-pitchy, condescending        |
| Visual register   | Bloomberg-meets-Linear             | Bright marketing SaaS              |
| Personality words | Rigorous, fast, auditable, exact   | Playful, whimsical, casual         |

**Sentence patterns we like:**
- "Parse 286 pages in 11.4 seconds — every row traced to a source page."
- "Verified against the filing, not the press release."
- "From URL to structured row, with the audit trail intact."

**Words/phrases to avoid:** *unlock, supercharge, revolutionize, game-changer,
seamless, effortless, simply, just*, exclamation marks in product copy, emojis
in UI surfaces (allowed sparingly in marketing only).

## 3. Visual identity

### 3.1 Color tokens

Use these exact CSS custom property names in all design-handoff specs.

```css
/* Brand */
--vx-brand-600: #1d4ed8;     /* primary blue, buttons/links */
--vx-brand-500: #2563eb;     /* default brand */
--vx-brand-400: #3b82f6;     /* hover / accent */
--vx-brand-100: #dbeafe;     /* tinted background */
--vx-brand-050: #eff6ff;     /* subtle surface */

/* Neutral (slate) */
--vx-ink-900: #0f172a;       /* primary text */
--vx-ink-700: #334155;
--vx-ink-500: #64748b;       /* secondary text */
--vx-ink-300: #cbd5e1;
--vx-ink-100: #eef2f7;       /* dividers */
--vx-ink-050: #f7f9fc;       /* page bg */
--vx-paper:   #ffffff;       /* card bg */

/* Semantic */
--vx-success: #16a34a;
--vx-warning: #d97706;
--vx-danger:  #dc2626;
--vx-info:    #2563eb;       /* alias to brand-500 */
```

**Contrast rules (WCAG AA mandatory):**
- Body text on `--vx-paper`: use `--vx-ink-900` (≥ 16.5:1)
- Secondary text on `--vx-paper`: `--vx-ink-500` (≥ 4.7:1) — never lighter for paragraphs
- Brand buttons: `--vx-brand-600` bg, white text (≥ 5.8:1)
- Never put `--vx-ink-300` or lighter on `--vx-paper` for text.

### 3.2 Typography

- **Type family:** `Inter`, fallback `system-ui, -apple-system, "Segoe UI", sans-serif`
- **Numerics:** always `font-variant-numeric: tabular-nums` in tables, dashboards,
  and any column of figures.
- **Scale (rem from 16 base):**

| Token        | Size  | Weight | Line  | Use                                    |
|--------------|-------|--------|-------|----------------------------------------|
| `display-1`  | 40px  | 800    | 1.15  | Marketing hero only                    |
| `h1`         | 22px  | 700    | 1.25  | Page titles                            |
| `h2`         | 18px  | 700    | 1.3   | Section titles                         |
| `h3`         | 15px  | 600    | 1.35  | Card / panel headers                   |
| `body`       | 14px  | 400    | 1.5   | Default                                |
| `body-sm`    | 12.5px| 400    | 1.5   | Dense tables, metadata                 |
| `label`      | 11px  | 600    | 1.3   | Uppercase eyebrow labels (.06em track) |
| `code`       | 13px  | 500    | 1.45  | `ui-monospace, "SF Mono", monospace`   |

### 3.3 Radii, spacing, elevation

- **Spacing scale:** 4 / 6 / 8 / 12 / 16 / 20 / 24 / 28 / 36 / 48 px
- **Radii:** `sm 6px`, `md 8px`, `lg 10px`, `xl 12px`, `pill 999px`. Default for
  cards/panels: `xl (12px)`. Buttons: `md (8px)` or `lg (9px)`.
- **Elevation:**
  - `e1` (cards):   `0 1px 0 rgba(15,23,42,.04), 0 1px 3px rgba(15,23,42,.06)`
  - `e2` (modal):   `0 16px 40px rgba(15,23,42,.12)`
  - `e3` (overlay): `0 30px 80px rgba(15,23,42,.16)`
- **Borders:** `1px solid var(--vx-ink-100)` for dividers, `var(--vx-ink-300)`
  for input rest, `var(--vx-brand-500)` + 4px brand-100 ring on focus.

## 4. Component canon (truncated)

| Component          | Default tokens                                                       |
|--------------------|----------------------------------------------------------------------|
| Primary button     | bg `--vx-brand-600`, text `--vx-paper`, radius `lg`, height 38       |
| Ghost button       | bg `--vx-paper`, border `--vx-ink-100`, text `--vx-ink-700`          |
| Card               | bg `--vx-paper`, border `--vx-ink-100`, radius `xl`, padding 16–18   |
| KPI tile           | Card + label (uppercase, `--vx-ink-500`) + value (`h1` 26px / 800)   |
| Status badge       | radius `pill`, padding 6×12, 11.5px / 600                            |
| Table header       | bg `--vx-ink-050`, label, `--vx-ink-500`, 1px bottom border          |
| Input              | height 40–44, padding 0 14, border `--vx-ink-300`, radius `lg`       |
| Toast              | left border 4px brand or success, e2, 12 14 padding                  |
| Sidebar            | width 240–260, paper bg, divided sections, uppercase labels          |

**Status badge color mapping (canonical):**

- `Fetching` / `Downloading` / `Processing` (active) → **blue** family (`--vx-brand-100`, `--vx-brand-600`)
- `Queued` / `Parsing` (in progress, neutral risk) → **amber** family
- `Done` / `Verified` / `Exported` → **green** family
- `OCR` / `Structuring` (transformative) → **purple** family
- `Review` / `Needs attention` (non-blocking) → **amber** family
- `Failed` / `Error` → **danger red**

## 5. UX copy guidelines

- **Buttons:** verb-first, ≤ 3 words: *Start Crawl*, *New Job*, *Export to Sheets*,
  *Re-run with OCR*. Avoid "Submit", "OK", "Done".
- **Empty states:** describe what *will* be here, then the primary action.
  > "No crawl jobs yet. Paste a filings URL to start your first crawl."
- **Errors:** name the cause, suggest a fix, never blame the user.
  > "Source returned 403. The page may require sign-in — switch to **NSE feed** instead?"
- **Confirmations:** quiet by default (toast, not modal). Modal only for destructive
  / irreversible actions (delete export, revoke API key).
- **Numbers:** Indian number system in product (`₹ 10,01,122 Cr`) unless region
  is US (then `$1,001,122 M`). Always include unit in column header, never inside cell.
- **Time:** prefer relative ("2 sec ago", "4 min ago") for last-N-minutes, then
  switch to absolute ("Today, 14:32 IST").

## 6. Accessibility floor (non-negotiable)

- **WCAG 2.1 AA** is the floor. AAA contrast for body text.
- All interactive controls reachable by keyboard. Focus ring: `0 0 0 4px var(--vx-brand-100)`.
- Touch targets ≥ 40×40 px.
- Status conveyed by **color + icon + label**, never color alone.
- Tables: visible row hover, sticky header at ≥ 12 rows, `<caption>` for screen readers.
- Motion: every animation < 400 ms or respects `prefers-reduced-motion`.

## 7. Common Vovix UI surfaces (for design-handoff context)

1. **OneCrawl Dashboard** — KPI strip (4 tiles), URL input row, status badge strip,
   split: Document queue + Structured output table, table footer with export status.
2. **Crawl Job Detail** — left: document tree with status; right: tabs
   (Summary, Financials, Ratios, Receipts), live populating table.
3. **Document Viewer** — PDF preview with annotation layer, extracted-table chips
   linked to source pages.
4. **Exports** — list of generated workbooks (xlsx/Sheets/API runs), filters by
   pipeline / source / date.
5. **Settings** — workspace, API keys, member roles, audit log.

## 8. Research priorities (for user-research / research-synthesis skills)

When synthesizing research notes for Vovix, the recurring themes to look for are:

- **Trust / auditability** — "I need to point to the page this number came from."
- **Speed vs completeness tradeoff** — analysts want top-of-funnel rows in seconds,
  full reconciliation later.
- **Indian filing nuances** — NSE/BSE PDFs are formatted inconsistently across
  quarters; OCR fidelity matters.
- **Sheets is the destination** — not Tableau, not a custom BI tool. Plan exports
  around xlsx + Google Sheets first.

## 9. Skill-specific reminders

- **design-critique:** judge against this document's tokens before generic heuristics.
  Flag any UI surface that uses raw hex instead of `--vx-*` variables.
- **design-system:** when extending the system, propose names in the `--vx-*`
  namespace and provide light + dark values together (dark is on roadmap, not
  yet shipped — keep parity-ready).
- **design-handoff:** every spec must enumerate tokens used, focus state, error
  state, empty state, loading state, and `prefers-reduced-motion` behavior.
- **ux-copy:** apply §5 strictly. When suggesting alternatives, give 2 options
  ranked: "more confident" / "more conversational" — Vovix defaults to "more confident".
- **accessibility-review:** WCAG 2.1 AA + the rules in §6. Treat icon-only
  buttons without `aria-label` as a P0 issue.
- **user-research / research-synthesis:** weight evidence about *trust* and
  *auditability* heavily — they are Vovix's primary differentiator.
