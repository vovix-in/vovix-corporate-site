# Vovix corporate site (static)

Marketing site for **Vovix Private Limited**, aligned with the handoff pack in `../vovix-corporate-handoff/` (Bootstrap 5, emerald `#00C853`, Montserrat / Plus Jakarta Sans / Inter, Boxicons).

## Target architecture (planned)

| Layer | Choice |
| --- | --- |
| **Source control** | **GitHub** private repositories under your **organization** (split repos as needed: corporate site, app, infra). |
| **Edge / DNS / protection** | **Cloudflare** in front (DNS, proxy, TLS, WAF/rate limits as you enable them). Public traffic hits Cloudflare first. |
| **Company website** | **Cloudflare Pages** *or* **Vercel**: static hosting for this marketing site (`vovix-corporate-site`). Pick one; both work for zero-build HTML. |
| **Vovix app + backend** | **AWS** (e.g. EC2, ECS on EC2, or similar) *or* **Docker** on a **managed cloud VM** elsewhere, with a **managed database** (RDS, Aurora, managed Postgres, etc.). Not wired in this repo. |

**Separation of concerns:** this folder is only the **static corporate site**. Product APIs, auth, and databases live with the application stack above, not on Pages/Vercel.

## Preview locally

```bash
cd "vovix-corporate-site"
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/

## Deploy on Cloudflare Pages (alternative)

1. Create a **private** GitHub org repo containing this site (or use monorepo with **Root directory** = `vovix-corporate-site`).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → Connect the repo.
3. **Build command:** empty or `exit 0`. **Build output directory:** `/` (repo root) or the subdirectory if using a root path override.
4. Attach **custom domain** `www.vovix.in` / `vovix.in`; keep DNS on **Cloudflare** and proxy orange-cloud as desired.
5. Optional: copy caching headers from `vercel.json` into **Pages → Settings → Headers** if you want the same asset TTL behaviour.

## Deploy on Vercel (free, static)

This folder is a **zero-build** static site (plain HTML, CSS, assets). Vercel serves files as-is.

**With Cloudflare in front:** point DNS at Vercel (or use CNAME flattening for apex per Vercel docs); keep Cloudflare proxy enabled only if you accept Vercel’s compatibility notes for proxied SSL (often works; validate after cutover).

### Option A: Git import (recommended)

1. Push this repo (or only the `vovix-corporate-site` folder as its own repo) to GitHub / GitLab / Bitbucket.
2. In [Vercel](https://vercel.com/new), **Add New Project** and import the repository.
3. Under **Project Settings → General → Root Directory**, set **`vovix-corporate-site`** if the repository root is the parent `Vovix Pvt Ltd` folder. If the repo root *is* `vovix-corporate-site`, leave Root Directory empty.
4. **Framework Preset:** Other (no build command). Leave **Build Command** empty and **Output Directory** empty (defaults to repo root / root directory).
5. **Domains:** Add `vovix.in` and `www.vovix.in`, set the primary you want in the Vercel UI. `vercel.json` includes a permanent redirect from **`vovix.in` → `https://www.vovix.in`** to match `sitemap.xml` and canonicals. If you prefer apex-only, remove the `redirects` block in `vercel.json`.
6. Deploy. Future pushes to the production branch redeploy automatically.

### Option B: Vercel CLI

```bash
cd "vovix-corporate-site"
npx vercel@latest
```

Follow the prompts (login, link project, confirm scope). For production:

```bash
npx vercel@latest --prod
```

### After go-live

- If DNS stays on **Cloudflare**, add the records Vercel shows (or use **CNAME** to `cname.vercel-dns.com` for `www`). For apex, use Vercel’s recommended **A** records or redirect apex → `www` in Cloudflare.
- Confirm `https://www.vovix.in/robots.txt` and `https://www.vovix.in/sitemap.xml` load.

## Before production

- Set real domains in canonical tags, `sitemap.xml`, `robots.txt`, and `og:image` (use `assets/og-image.svg`).
- Copy official logos from the product app (`logo-vovix-navbar.svg`, favicons) into `assets/` and update `<img>` / favicon links if you replace the text navbar mark.
- Replace contact placeholders (registered office, email) and finalize legal pages with counsel.
- Positioning: **business automation** across everyday operations, not solely investment products. **Vovix OneView** is scoped as a **market-intelligence** product (Indian equities); duplicate product cards on `products.html` as other automation tools launch. Keep securities/SEBI-style compliance notes only on market-related product context (have counsel review).
