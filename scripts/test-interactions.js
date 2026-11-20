const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Rishi\\.gemini\\antigravity\\brain\\da701b79-8043-456e-bd68-7d2b34587319';
const wait = (ms) => new Promise(r => setTimeout(r, ms));

async function testInteractions() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1536, height: 1024 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

  const results = {};

  // 1. Test Tab Switching
  console.log('1. Testing transport tabs...');
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Train')) {
      await b.click();
      await wait(300);
      results.trainTab = true;
    }
  }

  // 2. Test Swap Button
  console.log('2. Testing Swap button...');
  const swapBtn = await page.$('button[title="Swap Origin & Destination"]');
  if (swapBtn) {
    await swapBtn.click();
    await wait(300);
    results.swapButton = true;
  }

  // 3. Test Multi-Modal Modal
  console.log('3. Testing Multi-Modal Modal...');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Multi-Modal Trip')) {
      await b.click();
      await wait(500);
      await page.screenshot({ path: path.join(OUT_DIR, 'modal_multimodal.png') });
      results.multiModalModal = true;
      break;
    }
  }

  // Close any open modal
  await page.keyboard.press('Escape');
  await wait(300);

  // 4. Test Search Submission and Results Modal
  console.log('4. Testing Search button...');
  const searchBtn = await page.$('button[type="submit"]');
  if (searchBtn) {
    await searchBtn.click();
    await wait(1000);
    await page.screenshot({ path: path.join(OUT_DIR, 'modal_results.png') });
    results.searchModal = true;
  }

  await browser.close();
  console.log('Test interactions results:', JSON.stringify(results, null, 2));
}

testInteractions().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
