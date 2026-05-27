# `.design/` — Vovix design plugin customization

This folder customizes the `design` plugin (design-critique, design-system,
design-handoff, ux-copy, accessibility-review, user-research, research-synthesis)
for Vovix Pvt Ltd.

## Files

| File                  | Purpose                                                    |
|-----------------------|------------------------------------------------------------|
| `vovix-brand.md`      | Brand voice, tokens, accessibility floor, copy guidelines  |
| `vovix-tokens.css`    | CSS custom properties — single source of truth for values  |
| `SKILL_OVERRIDES.md`  | Per-skill rules layered on top of plugin defaults          |

## How to use

Whenever you invoke a design plugin skill in this workspace, it will read the
files above before applying its defaults. To customize further:

- Add or change tokens in `vovix-tokens.css`
- Add or change voice rules in `vovix-brand.md`
- Add or change per-skill behavior in `SKILL_OVERRIDES.md`

## Plugin invocation examples

```
/design:design-critique    # critique an attached screenshot or HTML file
/design:ux-copy            # rewrite a button / error / empty state
/design:accessibility-review
/design:design-handoff     # spec sheet for engineering
/design:design-system      # audit / extend the system
/design:user-research      # plan a study
/design:research-synthesis # turn notes → themes
```

All seven skills will now treat the files in this folder as ground truth.
