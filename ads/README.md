# TrueScoped Ad Inventory

This file documents the three ad units currently configured for the TrueScoped site.
All three are served by `versatilesentiment.com` via their `invoke.js` loader.

## How to use

### Option A — Drop-in HTML snippet

Copy the corresponding `.html` file from this folder directly into your page where you want the ad to appear:

```html
<!-- 728x90 leaderboard -->
<!--#include file="ads/728x90.html"-->

<!-- 300x250 medium rectangle -->
<!--#include file="ads/300x250.html"-->

<!-- 468x60 full banner -->
<!--#include file="ads/468x60.html"-->
```

If you are not using SSI, just paste the contents of the relevant `.html` file inline.

### Option B — JS helper (recommended for tool pages)

Include `ads/ads.js` once per page:

```html
<script src="/ads/ads.js" defer></script>
```

Then drop empty containers anywhere you want an ad:

```html
<div data-ad="728x90"></div>   <!-- top of article -->
<div data-ad="300x250"></div>  <!-- sidebar or mid-content -->
<div data-ad="468x60"></div>   <!-- footer or between paragraphs -->
```

The script will hydrate them on `DOMContentLoaded`. To re-inject an ad after a tool re-renders, call:

```js
window.TrueScopedAds.refresh(document.querySelector('[data-ad="300x250"]'));
```

## Ad unit reference

| Size   | Type             | Use case                                              | Key (atOptions.key)                |
|--------|------------------|-------------------------------------------------------|------------------------------------|
| 728x90 | Leaderboard      | Top-of-page banner, above the H1, site header         | `b8cb302039695a8ca6be0d1670ae3030` |
| 300x250| Medium Rectangle | Sidebar, in-content, below tool output                | `3e064c14d68f63c18b5aa4b6b1873c46` |
| 468x60 | Full Banner      | Mid-article, footer, mobile fallback                  | `0ed8bf9af74609561a1e84bb22ed0e94` |

## Placement guidance

For maximum ad revenue while staying brand-safe:

1. **Always above the fold** — at least one 728x90 in the page header so every visitor sees one ad impression.
2. **In-content unit** — a 300x250 placed mid-article (after 2-3 paragraphs) typically has the highest CTR.
3. **Below tool output** — if a page hosts a tool (PDF compressor, image converter, etc.), place a 300x250 directly below the tool result. Users look there immediately after running the tool.
4. **Footer banner** — a 468x60 above the footer catches the eye of users who scroll to the bottom looking for related articles.
5. **Avoid more than 3 ad units per page** — too many ads hurt rankings and UX.

## Respect for users

`ads.js` automatically skips ad injection if the user has `DoNotTrack=1` set. To override (e.g. for testing), set:

```js
window.TrueScopedAds = window.TrueScopedAds || {};
window.TrueScopedAds.forceShow = true;
```

…before the `ads.js` script tag.

## Compliance notes

- All three scripts load from `versatilesentiment.com` via the `invoke.js` pattern.
- The ad iframe is created and managed entirely by `versatilesentiment.com`'s loader — we do not control what is served. Review the network's content policy directly.
- A privacy policy / cookie disclosure may be required depending on the user's jurisdiction. Add one before going live.
