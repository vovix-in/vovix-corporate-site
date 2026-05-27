# Design Plugin — Vovix Skill Overrides

This file is read automatically by every skill in the `design` plugin
when invoked in this workspace. It adds Vovix-specific rules **on top of**
each skill's default behavior — defaults still apply unless overridden here.

> Pair this with [`vovix-brand.md`](./vovix-brand.md) and
> [`vovix-tokens.css`](./vovix-tokens.css). Always consult those first.

---

## design:design-critique

Before applying generic heuristics, score the artifact against the **Vovix
critique rubric** (0–3 each, total 24):

1. **Token discipline** — uses `--vx-*` tokens, no raw hex
2. **Hierarchy** — title / page-sub / KPI labels follow §3.2 scale
3. **Data density** — tabular surfaces feel like Bloomberg, not marketing
4. **Numeric formatting** — tabular-nums, units in headers, INR system
5. **Status semantics** — color + icon + label (never color alone)
6. **Empty / loading / error** — all three states present and explicit
7. **Voice** — copy matches §2 (confident, calm, never hype-y)
8. **Accessibility** — passes the §6 floor in `vovix-brand.md`

Output: a table with each row scored, evidence, and a **single highest-leverage
fix** before listing the rest. Skip generic UX advice that doesn't reference
the rubric.

---

## design:design-system

When proposing new patterns:

- Name them in the `--vx-*` namespace (e.g. `--vx-table-row-hover`).
- Ship both a CSS token and an entry in `vovix-tokens.css`.
- Provide a Figma-equivalent name and a code example side-by-side.
- Document the *light* version now; leave a `// dark:` placeholder comment for
  every token so the dark theme migration is trivial later.
- Reject `!important`, hardcoded hex, and pixel-rounded transforms.

When **auditing** the system, group findings into:
**Drift** (token used inconsistently) · **Gap** (no token exists)
· **Debt** (legacy override that should be retired).

---

## design:design-handoff

Every Vovix handoff spec must include the following sections **in this order**:

1. **Scope** — surface name + screenshot/Figma link
2. **Tokens used** — table of `--vx-*` variables touched
3. **States** — default, hover, focus, active, disabled, loading, empty, error
4. **Responsive** — behavior at 1920 / 1440 / 1280 / 1024 / 768 widths
5. **Motion** — easing, duration, `prefers-reduced-motion` behavior
6. **Accessibility** — focus order, ARIA names, contrast, target sizes
7. **Edge cases** — long strings, empty data, 1000+ rows, slow network
8. **Analytics hooks** — event name + properties (forwarded to product-tracking plugin)
9. **Open questions** — explicit list, not buried in prose

Reject any handoff that ships without **focus**, **loading**, and **empty**
states defined — these are mandatory at Vovix.

---

## design:ux-copy

- Default register: **"more confident"** voice from §5.
- Always offer **two** alternatives ranked confident → conversational.
- Forbid the banlist in §2 (unlock, supercharge, seamless, simply, just, …).
- For numeric strings in product UI, default to **Indian system** (1,01,122)
  unless the surface is region-scoped to US/EU.
- For destructive-action confirmations, the verb must match the consequence
  ("Delete export" not "Confirm"). Cancel button is always **Cancel** —
  no clever alternatives.

---

## design:accessibility-review

Use **WCAG 2.1 AA** as the floor and the Vovix accessibility addendum in §6 of
`vovix-brand.md`. Treat these as P0 (release-blocking):

- Body text below 4.5:1 contrast
- Icon-only buttons without `aria-label`
- Status conveyed by color only
- Focus styles removed without replacement
- Animation > 400ms with no `prefers-reduced-motion` opt-out
- Touch targets < 40×40 px

Report findings with: **Severity** · **WCAG ref** · **Surface** · **Fix
(with token names)** · **Why it matters to Vovix users**.

---

## design:user-research

Vovix users are equity-research / data-ops / compliance professionals. When
designing studies:

- Recruit by **artifact**, not job title — "shows me their last 3 NSE pulls"
  is a better filter than "VP, Research".
- Always include a **trust scenario** ("how would you audit this number?")
  alongside the speed scenario.
- For usability tests on OneCrawl, prefer think-aloud over satisfaction Likerts.
- Sample size guidance: 6–8 for qualitative usability; ≥ 30 for any quantitative
  preference test.

---

## design:research-synthesis

When synthesizing notes:

- Tag every insight with **one** of: `trust`, `speed`, `coverage`, `export`,
  `pricing`, `setup`, `other`. These are the Vovix theme buckets.
- Promote any insight tagged `trust` to the top of the report by default —
  Vovix's differentiator is auditability, so trust insights move the roadmap most.
- Always conclude with a **"What this implies for the design system"** section,
  linking back to specific tokens or components in `vovix-tokens.css`.
- Never invent quotes. If a paraphrase is needed, label it `[paraphrase]`.

---

## Reference order (every skill should follow)

When any design plugin skill runs in this workspace, consult files in this order:

1. `.design/vovix-brand.md` — voice, tokens, accessibility floor
2. `.design/vovix-tokens.css` — exact values
3. `.design/SKILL_OVERRIDES.md` — this file
4. The skill's own `SKILL.md` defaults

Anything in (1)–(3) wins over (4) when they conflict.
