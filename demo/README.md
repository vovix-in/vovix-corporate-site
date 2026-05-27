# Vovix OneCrawl — 30s product demo (screen record)

This folder contains an **auto-playing HTML demo** you can screen-record to produce an MP4. Cursor cannot generate continuous video files directly; this is the standard workflow for crisp SaaS UI demos.

## File

- `onecrawl-product-demo.html` — 1920×1080, 30 seconds, light enterprise UI

## Record on Mac (QuickTime)

1. Open the file in Chrome (full screen optional):
   ```bash
   open -a "Google Chrome" "/path/to/vovix-corporate-site/demo/onecrawl-product-demo.html"
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
| 0:00–0:05 | Dashboard load, “Initializing Data Pipeline…” |
| 0:05–0:10 | URL paste, Start Crawl, badges, PDF queue |
| 0:10–0:15 | PDF scan line, parse status toasts |
| 0:15–0:20 | Table rows populate, OCR structured |
| 0:20–0:26 | Tabs, filtered tab toast, export |
| 0:26–0:30 | Zoom out, “Export Complete”, end card |

## Note on product name

The public site uses **Vovix Crawler** for web data extraction. This demo uses **OneCrawl** as requested for the video asset; rename in HTML if you want it to match the live site.
