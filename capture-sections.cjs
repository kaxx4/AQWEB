const { chromium } = require('playwright');
const path = require('path');

const URL = 'https://www.ngoaquaterra.com/';
const OUT_DIR = path.join(__dirname, '.tasks/clone-ngoaquaterra.com/screenshots');

async function captureSections() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Scroll through full page to trigger lazy loading
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(3000);

  // Get section positions after full scroll
  const positions = await page.evaluate(() => {
    const results = {};
    const all = Array.from(document.querySelectorAll('*'));
    for (const el of all) {
      if (el.offsetHeight === 0) continue;
      const t = el.textContent?.trim() || '';
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (t.match(/^REAL IMPACT/) && el.offsetHeight < 300) results.realImpact = top;
      if (t.match(/NGO.S WE WORK WITH/) && el.offsetHeight < 300) results.ngoPartners = top;
      if (t.match(/AQUATERRA IS LESS/) && el.offsetHeight < 300) results.manifesto = top;
      if (t.match(/GROUNDWORK DIARIES/) && el.offsetHeight < 300) results.blogs = top;
      if (t.match(/HIGHLIGHTS OF OUR/) && el.offsetHeight < 300) results.highlights = top;
      if (t.match(/WE BELIEVE CHANGE/) && el.offsetHeight < 300) results.believe = top;
      if (t.match(/^join the community/) && el.offsetHeight < 300) results.community = top;
      if (t.match(/STARTED AS AN NGO/) && el.offsetHeight < 600) results.hero = top;
    }
    return results;
  });
  console.log('Positions after full scroll:', JSON.stringify(positions, null, 2));

  // Scroll-based section captures at known approximate positions
  // (from earlier manual inspection of the page)
  const sections = [
    // [filename, scrollTo, clipY_from_scroll_top, clipHeight]
    ['section-real-impact-heading', 1600, 0, 400],
    ['section-impact-stats-grid', 2100, 0, 1080],
    ['section-highlights-header', 2800, 0, 300],
    ['section-initiatives-row1', 3100, 0, 1080],
    ['section-initiatives-row2', 4200, 0, 1080],
    ['section-initiatives-row3', 5100, 0, 800],
    ['section-blogs-header', 5200, 0, 1080],
    ['section-about-believe', 6300, 0, 800],
    ['section-ngo-partners-logos', 6800, 300, 500],
    ['section-manifesto-dark', 7200, 0, 1080],
    ['section-community-floating', 7900, 0, 1080],
  ];

  for (const [name, scrollY, clipOffsetY, clipH] of sections) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(700);
    await page.screenshot({
      path: path.join(OUT_DIR, name + '.png'),
      clip: { x: 0, y: clipOffsetY, width: 1920, height: clipH }
    });
    console.log(`✓ ${name}.png`);
  }

  await browser.close();
  console.log('Done.');
}

captureSections().catch(e => { console.error(e); process.exit(1); });
