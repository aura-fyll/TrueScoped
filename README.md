# TrueScoped

> A free, useful information website that answers real problems ordinary people search for.
> Built for organic search, ad-supported, hosted free on GitHub Pages.

## What this repo is

This repository is the seed of an SEO-focused information site. The strategy is documented in detail in [`RESEARCH.md`](./RESEARCH.md) and [`ROADMAP.md`](./ROADMAP.md); the short version:

1. Find real problems people Google.
2. Write genuinely useful answers.
3. Pair each answer with a free in-browser tool when the problem is procedural (compress PDF, convert HEIC, etc.).
4. Let Google/Bing discover the pages.
5. Earn ad impressions from organic visitors who never need to come back.

The recommended niche — chosen after live web research across Reddit, Apple/Google/Microsoft support, YouTube tutorials, and community forums — is **Files — Everyday File Tools & Tutorials (PDF, Image, Video, Audio)**.

## Repository layout

```
.
├── index.html               Landing page (already wired to all 3 ad units)
├── _config.yml              GitHub Pages / Jekyll config
├── ads/
│   ├── 728x90.html          Leaderboard ad unit, ready to paste
│   ├── 300x250.html         Medium rectangle ad unit, ready to paste
│   ├── 468x60.html          Full banner ad unit, ready to paste
│   ├── ads.js               JS helper — auto-hydrates <div data-ad="SIZE"> tags
│   └── README.md            Ad inventory & placement guidance
├── articles/                Article markdown / HTML (first article goes here)
├── tools/                   Free in-browser tool pages (first tool goes here)
├── _data/                   Structured data (site nav, ad config, etc.)
├── RESEARCH.md              Full SEO research report (60 topics + 10 niches + tools)
├── ROADMAP.md               100-article roadmap organized in 10 clusters of 10
└── README.md                This file
```

## Ad inventory

All three ad units supplied with this project are pre-wired and ready to use. The `index.html` landing page already injects all three (one 728×90 at the top, one 300×250 mid-page, one 468×60 above the footer) using the `ads/ads.js` helper.

| Size   | Use case                                | File                  |
|--------|-----------------------------------------|-----------------------|
| 728x90 | Top-of-page leaderboard                 | `ads/728x90.html`     |
| 300x250| In-content / sidebar / below tool result| `ads/300x250.html`    |
| 468x60 | Mid-article / footer / mobile fallback  | `ads/468x60.html`     |

See [`ads/README.md`](./ads/README.md) for full placement guidance.

## How to add a new article

1. Drop a markdown file in `/articles/` — e.g. `articles/compress-pdf-to-100kb.md`.
2. Use the front matter `layout: article` so Jekyll wraps it in the article template.
3. Place `<div data-ad="300x250"></div>` mid-content (after 2-3 paragraphs) and `<div data-ad="468x60"></div>` at the footer.
4. Link to the new article from the relevant cluster pillar (see `ROADMAP.md`).
5. Link to the relevant free tool (if any) at the bottom of the article.

## How to add a new tool

1. Drop an HTML file in `/tools/` — e.g. `tools/pdf-compressor.html`.
2. The tool must be 100% client-side (browser JS only — no backend, no API costs).
3. Use the same ad layout as `index.html`: top leaderboard + below-tool-result 300x250 + footer 468x60.
4. Link the matching tutorial article directly above the tool UI.

## Deploy

This repo is configured to publish via GitHub Pages from the `main` branch root. To deploy:

1. Push to `main`.
2. In GitHub → Settings → Pages → Source = `Deploy from a branch` → Branch = `main` / `/(root)`.
3. Wait 1-2 minutes for the build.
4. The site will appear at `https://<your-username>.github.io/TrueScoped/` (or the apex if you have a custom domain).

## Where to start (first 10 articles)

The recommended launch order (each pairs an article with a free tool when relevant) is in [`ROADMAP.md`](./ROADMAP.md). Quick reference:

1. The Complete Guide to Compressing a PDF (pillar) → pair with **PDF Compressor** tool
2. How to Compress a PDF to 100 KB for Email Attachments
3. How to Compress a PDF to 1 MB or Less
4. How to Merge Multiple PDFs into One (No Watermark) → pair with **PDF Merger** tool
5. How to Convert HEIC to JPG on Windows 11 → pair with **HEIC to JPG** tool
6. How to Batch Convert 100+ HEIC Photos to JPG
7. How to Compress an Image Without Losing Quality (pillar) → pair with **Image Compressor** tool
8. How to Compress a JPEG to 50 KB
9. How to Convert JPG / PNG Images to a Single PDF → pair with **Image to PDF** tool
10. How to Extract Text from an Image (OCR) Free → pair with **OCR** tool

## The single most important first deliverable

**PDF Compressor with a target-file-size slider** — pair it with article #1, #2, #3 above. It directly serves the top-3 ranked opportunities in this niche, generates high-engagement tool usage, and the slider's UX matches the actual job-to-be-done ("I have a 4&nbsp;MB PDF and a 1&nbsp;MB upload limit"). Implementation: client-side JS using `pdf-lib` + a quality/repeat loop. Everything runs in-browser, no server cost.

## Honest risks

- **Ad network RPM.** The supplied ad network (`versatilesentiment.com`) is not a mainstream network. RPMs on a fresh domain will be low. Plan to apply for AdSense once 30+ pages are indexed.
- **AI Overviews.** Google's AI Overviews are reducing click-through on simple how-to queries. Mitigation: every page is ALSO a tool — users still need to come to the page to use it.
- **GitHub Pages bandwidth.** Tool pages may attract bot traffic. Mitigation: client-side rate-limit + put Cloudflare in front.
- **Domain authority.** A fresh `*.github.io` subdomain has near-zero authority. Long-tail queries are the entry point; broad-head terms come later.

See [`RESEARCH.md`](./RESEARCH.md) § 7.10 for the full risk list.

## License

Content (articles) © 2026 TrueScoped. All rights reserved.
Source code (tools, ad loader, layout templates) — MIT licensed where applicable.
