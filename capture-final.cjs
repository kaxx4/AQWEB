const { chromium } = require('playwright');
const path = require('path');

const URL = 'https://www.ngoaquaterra.com/';
const OUT_DIR = path.join(__dirname, '.tasks/clone-ngoaquaterra.com/screenshots');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Trigger all animations/lazy loads by scrolling full page
  const totalHeight = await page.evaluate(async () => {
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += 300) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 1000));
    return document.body.scrollHeight;
  });
  console.log('Total page height:', totalHeight);
  await page.waitForTimeout(2000);

  // Take a full-page screenshot and analyze section boundaries from it
  // Use percentage-based scroll positions
  const vp = 1080;
  const sections = [
    // Format: [name, scrollY_percent_of_totalHeight, note]
    // From visual inspection of full-page screenshot:
    // 0-1080: Hero
    // ~1080-1600: Everything We Do (bubble diagram)
    // ~1600-1900: Join CTA (blue box)
    // ~1900-2200: Real Impact heading
    // ~2200-3200: Impact stats (mint green)
    // ~3200-5400: Highlights / initiatives grid (mint green continued)
    // ~5400-6100: Groundwork Diaries blogs
    // ~6100-6700: WE BELIEVE CHANGE / NGO Partners
    // ~6700-7600: Manifesto dark starfield
    // ~7600-8300: Community floating photos + footer

    ['section-everything-we-do-bubbles',  1080,  vp],
    ['section-join-us-now-cta',           1600,  500],
    ['section-real-impact-heading',       1900,  300],
    ['section-impact-stats-mint',         2100,  vp],
    ['section-impact-stats-mint-2',       3100,  vp],
    ['section-highlights-initiatives',    3200,  vp],
    ['section-initiatives-grid-2',        4200,  vp],
    ['section-initiatives-grid-3',        5100,  vp],
    ['section-groundwork-diaries',        5300,  vp],
    ['section-blog-cards',                5700,  vp],
    ['section-believe-change',            6300,  700],
    ['section-ngo-partners',              6800,  400],
    ['section-manifesto-starfield',       7100,  vp],
    ['section-community-join',            7700,  vp],
    ['section-footer',                    8200,  vp],
  ];

  for (const [name, scrollY, clipH] of sections) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(OUT_DIR, name + '.png'),
      clip: { x: 0, y: 0, width: 1920, height: clipH }
    });
    console.log(`✓ ${name}.png`);
  }

  await browser.close();
  console.log('\nDone. Total page height:', totalHeight);
}

main().catch(e => { console.error(e); process.exit(1); });
