# VOVIX Brand Colours — verified from the logo

Canonical colour guide for `vovix-corporate-site` (v3, October 2026).

Every brand value below was **sampled from the original logo artwork**
(`public/assets/logo-vovix.png`, median of opaque pixels per region), not chosen by taste.
The previous guide listed `#00C853` / `#102A43`; those do not match the logo and are retired.

| Role | Logo element | Hex | Token |
| --- | --- | --- | --- |
| Foundation navy | alpha mark + "VOV" | `#072836` | `navy`, `ink` |
| Brand green | alpha sweep + pixel trail | `#09A54C` | `brand.fill` |
| Accent cyan | rule under the wordmark | `#1FF3F3` | `cyan.fill` |
| Silver | metallic "IX" | `#ADADAC` | `silver` |

## Derived, contrast-safe shades (same hue)

| Use | Hex | Token | Contrast |
| --- | --- | --- | --- |
| Green text on white | `#067D3A` | `brand.ink` | 5.25:1 |
| Green hover (with navy text) | `#23B862` | `brand.hover` | — |
| Cyan text on white | `#08737A` | `cyan.ink` | AA |
| Secondary text | `#3B5666` | `ink.secondary` | 7.75:1 |
| Muted text | `#5E7787` | `ink.muted` | 4.7:1 |
| Surfaces | `#FFFFFF` / `#F4F7F9` / `#E9EEF2` | `ground.*` | — |

## Rules

- Primary buttons are **navy text on logo green** (4.76:1). White on `#09A54C` is 3.23:1 — never use it for text.
- `#09A54C` on navy is 4.76:1, so the exact logo green is text-safe on dark bands.
- Logo green on white only for fills, icons and display-size type; use `brand.ink` for green body text.
- Cyan is decorative: the brand rule (echoing the logo), focus rings on dark, data pulses.
- Red/amber only for error and review states — never as brand accents.
- The logo exists only as a light-background variant; place it on white or pearl surfaces. Never recolour, redraw or crop it.

Source of truth in code: `tailwind.config.ts` (Tailwind tokens) and `:root` in `app/globals.css` (CSS variables for SVG).
