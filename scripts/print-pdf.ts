/**
 * Render a landing page to a PDF at an exact physical size using headless Chrome.
 *
 * The PDF looks identical to the live page (it uses the normal `screen`
 * styles, not print styles) and is sized to an exact physical format
 * (default 870 x 2170 mm — a roll-up banner).
 *
 * How it works
 * ------------
 * A PDF's layout width is tied to its paper width, so we can't just ask Chrome
 * for an 870 mm-wide page — that would trigger the page's widest desktop layout
 * and look nothing like the normal portrait page. Instead we:
 *   1. Render the page at its natural on-screen width (so the responsive
 *      layout matches what users actually see) and measure its height.
 *   2. Pick the render width so the content's aspect ratio matches the target
 *      banner ratio, so the page fills the format with no distortion or
 *      letterboxing.
 *   3. Export a single-page PDF at that pixel size, then losslessly scale the
 *      vector PDF up to the exact physical dimensions with pdf-lib.
 *
 * Usage (defaults to the live site; pass a localhost URL to export a local
 * dev server instead, which must already be running via `npm run dev`):
 *   npm run print:pdf -- --out bajour-banner.pdf
 *   npm run print:pdf -- --url http://localhost:3000/bajour --out bajour-banner.pdf
 *
 * Options:
 *   --url <url>        Page to render        (default https://briefing.bajour.ch)
 *   --out <path>       Output PDF path       (default ./banner.pdf)
 *   --width <mm>       Physical width  in mm (default 870)
 *   --height <mm>      Physical height in mm (default 2170)
 *   --min-width <px>   Min render width      (default 360)
 *   --max-width <px>   Max render width      (default 1400)
 *   --css <path>       Optional extra CSS to inject before export, e.g. to
 *                      neutralise viewport-height (`vh`) based sizing that
 *                      would explode on a very tall page.
 */
import { readFileSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";

const PT_PER_MM = 72 / 25.4; // PDF points per millimetre
const PT_PER_PX = 72 / 96; // PDF points per CSS pixel (96 dpi)

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

async function main() {
  const url = arg("url", "https://briefing.bajour.ch");
  const out = arg("out", "banner.pdf");
  const widthMm = Number(arg("width", "870"));
  const heightMm = Number(arg("height", "2170"));
  const minWidth = Number(arg("min-width", "360"));
  const maxWidth = Number(arg("max-width", "1400"));
  const cssPath = arg("css", "");
  const targetRatio = heightMm / widthMm; // height / width

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.emulateMediaType("screen"); // keep the on-screen look
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
    // Pixels/analytics can keep the network busy; give layout & fonts a beat.
    await page.evaluate(() => document.fonts?.ready);

    // Inject overrides (e.g. to neutralise `vh`-based sizing) so the layout is
    // height-independent and renders the same on a very tall page.
    if (cssPath) {
      await page.addStyleTag({ content: readFileSync(cssPath, "utf8") });
    }

    // Measure the rendered content height at a given viewport width.
    const measure = async (w: number): Promise<number> => {
      await page.setViewport({ width: w, height: 1000 });
      // Let the responsive layout settle.
      await new Promise((r) => setTimeout(r, 150));
      return page.evaluate(() => {
        const b = document.body;
        const e = document.documentElement;
        return Math.max(b.scrollHeight, e.scrollHeight, b.offsetHeight, e.offsetHeight);
      });
    };

    // Binary-search the render width whose content aspect ratio matches the
    // banner. ratio(width) = height/width is monotonically decreasing in width
    // (wider layout -> relatively shorter), so a binary search converges.
    let lo = minWidth;
    let hi = maxWidth;
    let bestWidth = Math.round((lo + hi) / 2);
    let bestHeight = await measure(bestWidth);
    for (let i = 0; i < 12; i++) {
      const mid = Math.round((lo + hi) / 2);
      const h = await measure(mid);
      const ratio = h / mid;
      bestWidth = mid;
      bestHeight = h;
      if (Math.abs(ratio - targetRatio) / targetRatio < 0.01) break;
      if (ratio > targetRatio) {
        // Too tall/narrow -> widen.
        lo = mid + 1;
      } else {
        // Too short/wide -> narrow.
        hi = mid - 1;
      }
      if (lo > hi) break;
    }

    // Force the page box to the exact banner aspect at the chosen width so the
    // single PDF page fills the format edge to edge.
    const pageWidthPx = bestWidth;
    const pageHeightPx = Math.round(bestWidth * targetRatio);
    await page.setViewport({ width: pageWidthPx, height: pageHeightPx });
    await new Promise((r) => setTimeout(r, 150));

    const rawPdf = await page.pdf({
      printBackground: true,
      width: `${pageWidthPx}px`,
      height: `${pageHeightPx}px`,
      pageRanges: "1",
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    // Losslessly scale the vector page up to the exact physical size.
    const doc = await PDFDocument.load(rawPdf);
    const pdfPage = doc.getPage(0);
    const targetWidthPt = widthMm * PT_PER_MM;
    const targetHeightPt = heightMm * PT_PER_MM;
    const scale = targetWidthPt / (pageWidthPx * PT_PER_PX);
    pdfPage.scaleContent(scale, scale);
    pdfPage.setSize(targetWidthPt, targetHeightPt);

    const finalPdf = await doc.save();
    writeFileSync(out, finalPdf);

    const ratio = bestHeight / bestWidth;
    console.log(
      `Rendered ${url} at ${pageWidthPx}px wide (content aspect ${ratio.toFixed(3)}, target ${targetRatio.toFixed(3)})`,
    );
    console.log(`Wrote ${out} at ${widthMm}x${heightMm} mm`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
