# Vovix Lens — 30s filings demo (screen record)

This folder contains an **auto-playing HTML demo** you can screen-record to produce an MP4. A browser page is the standard workflow for crisp SaaS UI demos — nothing here generates a video file directly.

## File

- `lens-filings-demo.html` — 1920×1080, 30 seconds, light enterprise UI

## What it shows

Vovix Lens applied to financial filings: point it at a filings source, and it fetches the documents, parses layout, runs OCR across the financial tables, and streams structured rows out to a workbook — with the source page and a confidence score carried on every cell.

This is the same source-grounded extraction Lens does for invoices, bank statements and KYC records, shown against annual reports because that's where the auditability story lands hardest.

## Record on Mac (QuickTime)

1. Open the file in Chrome (full screen optional):
   ```bash
   open -a "Google Chrome" "/path/to/vovix-corporate-site/demo/lens-filings-demo.html"
   ```
2. Zoom the window so the canvas fills the frame (page auto-scales).
3. **QuickTime Player** → File → New Screen Recording → record the browser window.
4. Press **R** in the page to restart the 30s loop if needed.
5. Export as 1080p or 4K from your editor.

## Record with OBS (4K)

- Canvas: 1920×1080 (or scale to 3840×2160 in export)
- Source: Window capture (Chrome)
- FPS: 30 or 60
- Duration: exactly one play (30s) or trim in post

## Scenes (timeline)

| Time | Scene |
|------|--------|
| 0:00–0:05 | Dashboard load, "Initializing Data Pipeline…" |
| 0:05–0:10 | Source URL, fetch starts, badges, PDF queue |
| 0:10–0:15 | PDF scan line, parse status toasts |
| 0:15–0:20 | Table rows populate, OCR structured |
| 0:20–0:26 | Tabs, filtered tab toast, export |
| 0:26–0:30 | Zoom out, "Export Complete", end card |

## Before you publish this

The figures animated in the demo (286 pages, 11.4 seconds) are **illustrative timings written for the animation**. Check them against a real Lens run before quoting them in a post, a deck, or a proposal — the same applies to the copy in `linkedin-post.md`.

The live product is at **lens.vovix.in**. The demo's chrome points there; there is no separate app domain.
