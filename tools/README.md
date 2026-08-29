# Tools directory

Each file in this directory is a self-contained, single-page HTML tool. Tools are 100% client-side — no backend, no API costs, free to host on GitHub Pages.

## Tool implementation rules

1. **One file per tool.** All HTML, CSS, and JS in one `.html` file. Jekyll serves it as-is.
2. **No upload to a server.** Use the File API + in-browser libraries. Privacy + speed.
3. **Use these CDNs (or vendor locally):**
   - PDF manipulation: `pdf-lib` + `pdfjs-dist`
   - Image manipulation: browser Canvas API (no library needed)
   - Video: `FFmpeg.wasm` (heavier — warn about load time)
4. **Always include:**
   - 728x90 leaderboard above the tool
   - 300x250 medium rectangle directly below the tool result (this is the highest-CTR placement)
   - 468x60 banner above the footer
5. **Always link back** to the related article(s) above the tool UI (in a "Read first" callout).

## Implementation outline — PDF Compressor

The PDF Compressor at `pdf-compressor.html` is wired but the engine itself is a TODO placeholder. To finish it:

```js
// Load pdf-lib and pdfjs:
//   <script src="https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js"></script>
//   <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.min.js"></script>
//   <script> pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist/build/pdf.worker.min.js'; </script>
//
// Algorithm:
//   1. Load the source PDF with pdfjs.
//   2. For each page: render to a canvas at a chosen DPI.
//   3. Re-encode the canvas as JPEG at a chosen quality.
//   4. Re-pack the JPEGs into a new PDF with pdf-lib.
//   5. Measure the resulting bytes.
//   6. If above target KB, reduce quality (or DPI) and repeat. If at the floor and still above target, give up honestly.
//
// Suggested quality/DPI ladder:
//   quality 80, 60, 40, 20, 10  ->  DPI 150, 100, 72, 50
//
// Honest floor:
//   Some PDFs (already low-DPI JPEG scans) simply will not compress further. Tell the user.
```

## Roadmap of tools to build

In priority order (each pairs with one or more articles from `../ROADMAP.md`):

| Priority | Tool | Library | Pairs with articles |
|----------|------|---------|---------------------|
| 1 | PDF Compressor | pdf-lib + pdfjs | #1, #2, #3 |
| 2 | PDF Merger | pdf-lib | #4 (Merge PDFs) |
| 3 | HEIC to JPG | heic2any | #5, #6 |
| 4 | Image Compressor | Canvas API | #7, #8 |
| 5 | Image to PDF | pdf-lib | #9 |
| 6 | OCR (image to text) | tesseract.js | #10 |
| 7 | PDF Page Remover | pdf-lib | Cluster 2 |
| 8 | PDF Splitter | pdf-lib | Cluster 2 |
| 9 | PDF Rotator | pdf-lib | Cluster 2 |
| 10 | PDF to Word | pdfjs + docx | Cluster 3 |
| 11 | WebP to JPG | Canvas API | Cluster 10 |
| 12 | Background Remover | @imgly/background-removal | Cluster 6 |
| 13 | Webpage to PDF | browser print | Cluster 10 |
| 14 | MP4 to MP3 | FFmpeg.wasm | Cluster 8 |
| 15 | Font Identifier | OCR + opentype.js | Cluster 10 |

## Ad placement in tool pages

Every tool page must have these 3 ad slots in this order:

```html
<!-- Top: 728x90 leaderboard, above the H1 -->
<div data-ad="728x90"></div>

<!-- Below tool result: 300x250 (highest CTR placement) -->
<div data-ad="300x250"></div>

<!-- Above footer: 468x60 -->
<div data-ad="468x60"></div>
```

Then include the ad loader once at the bottom:

```html
<script src="/ads/ads.js" defer></script>
```
