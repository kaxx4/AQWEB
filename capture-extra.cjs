const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const URL = 'https://www.ngoaquaterra.com/';
const OUT_DIR = path.join(__dirname, '.tasks/clone-ngoaquaterra.com/screenshots');

async function captureExtra() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Get accurate section positions from the DOM
  const positions = await page.evaluate(() => {
    const results = {};
    // Find specific text markers to get real positions
    const allText = Array.from(document.querySelectorAll('*'));
    for (const el of allText) {
      const t = el.textContent?.trim();
      if (!t) continue;
      if (t.startsWith('REAL IMPACT') && el.offsetHeight < 200) results.realImpact = el.getBoundingClientRect().top + window.scrollY;
      if (t.startsWith('NGO') && t.includes("WE WORK WITH") && el.offsetHeight < 200) results.ngoPartners = el.getBoundingClientRect().top + window.scrollY;
      if (t.startsWith('AQUATERRA IS LESS') && el.offsetHeight < 200) results.manifesto = el.getBoundingClientRect().top + window.scrollY;
      if (t.startsWith('GROUNDWORK DIARIES') && el.offsetHeight < 200) results.blogs = el.getBoundingClientRect().top + window.scrollY;
      if (t.startsWith('HIGHLIGHTS OF OUR') && el.offsetHeight < 200) results.highlights = el.getBoundingClientRect().top + window.scrollY;
      if (t.startsWith('WE BELIEVE CHANGE') && el.offsetHeight < 200) results.believe = el.getBoundingClientRect().top + window.scrollY;
      if (t.startsWith('join the community') && el.offsetHeight < 200) results.community = el.getBoundingClientRect().top + window.scrollY;
      if (t.startsWith('EVERYTHING WE DO AT AQ') && el.offsetHeight < 300) results.everythingWeDo = el.getBoundingClientRect().top + window.scrollY;
      if (t.startsWith('JOIN US NOW') && el.offsetHeight < 400) results.joinCta = el.getBoundingClientRect().top + window.scrollY;
    }
    return results;
  });
  console.log('Section positions:', JSON.stringify(positions, null, 2));

  // Re-capture sections with accurate positions
  const captures = [
    { name: 'section-real-impact', y: positions.realImpact - 50, h: 200 },
    { name: 'section-impact-stats-full', y: positions.realImpact - 50, h: 1400 },
    { name: 'section-highlights', y: positions.highlights - 50, h: 1200 },
    { name: 'section-blogs-full', y: positions.blogs - 50, h: 1200 },
    { name: 'section-believe', y: positions.believe - 30, h: 600 },
    { name: 'section-ngo-partners-full', y: positions.ngoPartners - 100, h: 600 },
    { name: 'section-manifesto-full', y: positions.manifesto - 50, h: 500 },
    { name: 'section-community-full', y: positions.community - 100, h: 900 },
    { name: 'section-join-cta-full', y: (positions.joinCta || 1300) - 30, h: 500 },
    { name: 'section-everything-we-do-full', y: (positions.everythingWeDo || 700) - 50, h: 1200 },
  ];

  for (const cap of captures) {
    if (!cap.y || cap.y < 0) { console.log(`Skip ${cap.name} (no y)`); continue; }
    await page.evaluate(y => window.scrollTo(0, y - 100), cap.y);
    await page.waitForTimeout(800);
    const scrollY = await page.evaluate(() => window.scrollY);
    const clipY = cap.y - scrollY;
    await page.screenshot({
      path: path.join(OUT_DIR, cap.name + '.png'),
      clip: { x: 0, y: Math.max(0, clipY), width: 1920, height: cap.h }
    });
    console.log(`✓ ${cap.name}.png (y=${cap.y})`);
  }

  // GET IN TOUCH sticky button
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUT_DIR, 'component-get-in-touch-sticky.png'),
    clip: { x: 1380, y: 640, width: 200, height: 70 }
  });
  console.log('✓ component-get-in-touch-sticky.png');

  // READ MORE button component
  await page.evaluate(y => window.scrollTo(0, y), positions.highlights || 3000);
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT_DIR, 'component-read-more-button.png'),
    clip: { x: 0, y: 200, width: 400, height: 60 }
  });
  console.log('✓ component-read-more-button.png');

  // Hover state on READ MORE
  const readMore = page.locator('text=READ MORE').first();
  try {
    await readMore.hover();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(OUT_DIR, 'component-read-more-button-hover.png'),
      clip: { x: 0, y: 200, width: 400, height: 60 }
    });
    console.log('✓ component-read-more-button-hover.png');
  } catch(e) { console.log('Skip read-more hover:', e.message); }

  await browser.close();
  console.log('\nExtra captures done.');
}

captureExtra().catch(e => { console.error(e); process.exit(1); });
