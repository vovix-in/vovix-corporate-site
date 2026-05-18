# Vovix Website Color Pattern

This file is the canonical color guide for the `vovix-corporate-site`.

## Primary Theme (Pattern 1: Wealth and Growth)

- Primary (Action): `#00C853` (Emerald Green)
- Secondary (Surface): `#F5F7FA` (Pearl Silver)
- Foundation (Trust): `#102A43` (Deep Navy)
- Accent (Innovation): `#00E5FF` (Electric Cyan)
- Loss Indicator: `#EF5350`

## CSS Variable Source of Truth

Defined in `css/site.css` under `:root`:

- `--vovix-primary: #00C853`
- `--vovix-secondary: #F5F7FA`
- `--vovix-navy: #102A43`
- `--vovix-cyan: #00E5FF`
- `--vovix-loss: #EF5350`
- `--vovix-bg: #F5F7FA`
- `--text-main: #102A43`
- `--text-muted: #486581`
- `--border-color: #D9E2EC`

## Usage Rules

- Use `--vovix-primary` only for high-intent actions (primary buttons, success states, key highlights).
- Use `--vovix-navy` for navigation, headings, and trust-heavy UI zones.
- Use `--vovix-secondary` / `--vovix-bg` for page surfaces and cards to keep a light, transparent feel.
- Use `--vovix-cyan` for focus and innovation accents (input focus, active technical highlights).
- Use red only for negative/loss indicators (`--vovix-loss`).

## Applied Website Mapping

- Navbar background: `--vovix-navy`
- Hero sections: navy-led gradient with emerald/cyan subtle glow
- Primary CTA: `--vovix-primary` with darker hover
- Form focus: cyan border/glow via `--vovix-cyan`
- Trust strips and cards: silver-based surfaces with navy text

### Site-wide (`body.theme-agency`)

All main pages use `body.theme-agency` with `navbar.agency-nav` (white/pearl bar, navy links, gradient logo) and `footer.agency-footer` (pearl silver). Hero bands use shared `hero-navy` (mesh + grid).

### Homepage (`body.theme-agency`)

- Page surface: `--vovix-bg` (Pearl Silver)
- Alternating band: `--vovix-secondary`
- Service & pipeline cards: `--white` on `--border-color`, headings `--text-main`
- Hero & code panel: `--vovix-navy` / `--vovix-navy-deep` with emerald & cyan radial glows
- Eyebrows & active code tab: `--vovix-primary`; pipeline step numbers: `--vovix-cyan`
- Lead form inputs: `--vovix-secondary` background; focus ring `--vovix-cyan`

## Future Guidance

- Keep light mode as default.
- Avoid introducing muddy browns.
- Avoid using red as a brand accent; reserve it for warnings/loss only.
- For any new page, start from existing tokens in `css/site.css` instead of hardcoded hex values.
