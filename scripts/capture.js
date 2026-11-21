const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Rishi\\.gemini\\antigravity\\brain\\da701b79-8043-456e-bd68-7d2b34587319';

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runValidation() {
  console.log('Launching Chrome Puppeteer test suite...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop 1536 x 1024 (Primary visual reference)
  console.log('1. Validating Desktop 1536x1024...');
  await page.setViewport({ width: 1536, height: 1024, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await delay(1200);
  await page.screenshot({ path: path.join(OUT_DIR, 'phase1_desktop_1536.png'), fullPage: false });
  await page.screenshot({ path: path.join(OUT_DIR, 'phase1_desktop_full.png'), fullPage: true });

  // 2. Desktop 1440 x 900
  console.log('2. Validating Desktop 1440x900...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await delay(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'phase1_desktop_1440.png'), fullPage: false });

  // 3. Laptop 1280 x 800
  console.log('3. Validating Laptop 1280x800...');
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await delay(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'phase1_laptop_1280.png'), fullPage: false });

  // 4. Tablet Landscape 1024 x 768
  console.log('4. Validating Tablet Landscape 1024x768...');
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
  await delay(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'phase1_tablet_1024.png'), fullPage: false });

  // 5. Tablet Portrait 768 x 1024
  console.log('5. Validating Tablet Portrait 768x1024...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 1 });
  await delay(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'phase1_tablet_768.png'), fullPage: false });

  // 6. Mobile 390 x 844 (iPhone 14 standard)
  console.log('6. Validating Mobile 390x844...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await delay(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'phase1_mobile_390.png'), fullPage: false });

  // 7. Mobile 360 x 780 (Android standard)
  console.log('7. Validating Mobile 360x780...');
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 1 });
  await delay(500);
  await page.screenshot({ path: path.join(OUT_DIR, 'phase1_mobile_360.png'), fullPage: false });

  // 8. Test Mobile Drawer
  console.log('8. Testing Mobile Drawer interaction...');
  const menuBtn = await page.$('button[aria-label="Toggle menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await delay(400);
    await page.screenshot({ path: path.join(OUT_DIR, 'phase1_mobile_drawer.png'), fullPage: false });
    // close drawer
    await menuBtn.click();
    await delay(300);
  }

  // 9. Return to Desktop 1536x1024 for Interactive Validation
  console.log('9. Testing Desktop Dropdowns & Booking Modal...');
  await page.setViewport({ width: 1536, height: 1024 });
  await delay(500);

  // Click Travel Tools dropdown
  const toolsBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Travel Tools'));
  });
  if (toolsBtn) {
    await toolsBtn.click();
    await delay(400);
    await page.screenshot({ path: path.join(OUT_DIR, 'phase1_travel_tools_dropdown.png'), fullPage: false });
  }

  // Switch to Train tab
  console.log('10. Switching transport mode to Train...');
  const trainTab = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent.includes('Train'));
  });
  if (trainTab) {
    await trainTab.click();
    await delay(400);
    await page.screenshot({ path: path.join(OUT_DIR, 'phase1_train_mode.png'), fullPage: false });
  }

  // Click Search Tickets button
  console.log('11. Triggering Search Tickets...');
  const searchBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button[type="submit"]'));
    return buttons.find(b => b.textContent.includes('Search Tickets'));
  });
  if (searchBtn) {
    await searchBtn.click();
    await delay(1200);
    await page.screenshot({ path: path.join(OUT_DIR, 'phase1_search_results_modal.png'), fullPage: false });
  }

  await browser.close();
  console.log('SUCCESS: All Phase 1 validations and screenshots completed!');
}

runValidation().catch((err) => {
  console.error('Validation test error:', err);
  process.exit(1);
});
