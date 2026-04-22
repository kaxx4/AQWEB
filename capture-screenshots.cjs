const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const URL = 'https://www.ngoaquaterra.com/';
const OUT_DIR = path.join(__dirname, '.tasks/clone-ngoaquaterra.com/screenshots');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function captureAll() {
  const browser = await chromium.launch({ headless: true });

  // ── DESKTOP 1920×1080 ──────────────────────────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    // Full page
    await page.screenshot({ path: path.join(OUT_DIR, 'full-page-desktop.png'), fullPage: true });
    console.log('✓ full-page-desktop.png');

    // section-hero  (scroll position 0, viewport height ~1080)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-hero.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-hero.png');

    // Nav component – force opacity so it's visible
    await page.evaluate(() => {
      const el = document.querySelector('.framer-ndusjc-container');
      if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
    await page.screenshot({ path: path.join(OUT_DIR, 'component-nav.png'), clip: { x: 0, y: 0, width: 1920, height: 70 } });
    console.log('✓ component-nav.png');

    // section-everything-we-do  (~700–1800)
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-everything-we-do.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-everything-we-do.png');

    // section-join-cta  (~1300–1600)
    await page.evaluate(() => window.scrollTo(0, 1300));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-join-cta.png'), clip: { x: 0, y: 0, width: 1920, height: 500 } });
    console.log('✓ section-join-cta.png');

    // section-real-impact heading  (~1600)
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-impact-header.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-impact-header.png');

    // section-project-cards  (~1900–2200)
    await page.evaluate(() => window.scrollTo(0, 1900));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-project-cards.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-project-cards.png');

    // section-impact-stats  (~2200–3100)
    await page.evaluate(() => window.scrollTo(0, 2200));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-impact-stats.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-impact-stats.png');

    // section-initiatives  (~3000–5200)
    await page.evaluate(() => window.scrollTo(0, 3100));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-initiatives.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-initiatives.png');

    // section-blogs  (~5200–6000)
    await page.evaluate(() => window.scrollTo(0, 5200));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-blogs.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-blogs.png');

    // section-about-mission  (~6200–6700)
    await page.evaluate(() => window.scrollTo(0, 6200));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-about-mission.png'), clip: { x: 0, y: 0, width: 1920, height: 700 } });
    console.log('✓ section-about-mission.png');

    // section-ngo-partners  (~6500–7200)
    await page.evaluate(() => window.scrollTo(0, 6500));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-ngo-partners.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-ngo-partners.png');

    // section-manifesto (dark starfield) (~7000)
    await page.evaluate(() => window.scrollTo(0, 7000));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-manifesto.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-manifesto.png');

    // section-community  (~7800)
    await page.evaluate(() => window.scrollTo(0, 7800));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-community.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ section-community.png');

    // footer
    await page.evaluate(() => window.scrollTo(0, 99999));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'component-footer.png'), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log('✓ component-footer.png');

    // component-be-a-part button (zoom on nav CTA)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.evaluate(() => {
      const el = document.querySelector('.framer-ndusjc-container');
      if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT_DIR, 'component-cta-be-a-part.png'), clip: { x: 1380, y: 10, width: 200, height: 55 } });
    console.log('✓ component-cta-be-a-part.png');

    // Hover state for "BE A PART" button
    const beAPartBtn = page.locator('a[href*="recruitment"]').first();
    await beAPartBtn.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, 'component-cta-be-a-part-hover.png'), clip: { x: 1380, y: 10, width: 200, height: 55 } });
    console.log('✓ component-cta-be-a-part-hover.png');

    // Hover state on a nav link
    await page.evaluate(() => window.scrollTo(0, 300));
    await page.waitForTimeout(400);
    const navLink = page.locator('header a').nth(1);
    await navLink.hover();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, 'component-nav-hover.png'), clip: { x: 0, y: 0, width: 1920, height: 70 } });
    console.log('✓ component-nav-hover.png');

    // component-blog-card
    await page.evaluate(() => window.scrollTo(0, 5400));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'component-blog-card.png'), clip: { x: 0, y: 50, width: 530, height: 600 } });
    console.log('✓ component-blog-card.png');

    // component-project-card
    await page.evaluate(() => window.scrollTo(0, 3200));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'component-project-card.png'), clip: { x: 0, y: 50, width: 500, height: 700 } });
    console.log('✓ component-project-card.png');

    // component-impact-bubble (everything we do circles)
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT_DIR, 'component-impact-bubble.png'), clip: { x: 400, y: 50, width: 800, height: 700 } });
    console.log('✓ component-impact-bubble.png');

    // Hover state on a circle bubble
    const bubble = page.locator('text=PROJECTS').first();
    try {
      await bubble.hover();
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(OUT_DIR, 'component-impact-bubble-hover.png'), clip: { x: 400, y: 50, width: 800, height: 700 } });
      console.log('✓ component-impact-bubble-hover.png');
    } catch(e) { console.log('Skip bubble hover:', e.message); }

    await ctx.close();
  }

  // ── TABLET 1024×768 ────────────────────────────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 1024, height: 768 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, 'full-page-tablet.png'), fullPage: true });
    console.log('✓ full-page-tablet.png');
    await ctx.close();
  }

  // ── MOBILE 375×812 ─────────────────────────────────────────────────────────
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: path.join(OUT_DIR, 'full-page-mobile.png'), fullPage: true });
    console.log('✓ full-page-mobile.png');

    // mobile hero
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT_DIR, 'section-hero-mobile.png'), clip: { x: 0, y: 0, width: 375, height: 812 } });
    console.log('✓ section-hero-mobile.png');

    await ctx.close();
  }

  await browser.close();
  console.log('\nAll screenshots saved to:', OUT_DIR);
}

captureAll().catch(e => { console.error(e); process.exit(1); });
