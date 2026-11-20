const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT_DIR = 'C:\\Users\\Rishi\\.gemini\\antigravity\\brain\\da701b79-8043-456e-bd68-7d2b34587319';

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop 1536x1024
  console.log('Testing Desktop 1536x1024...');
  await page.setViewport({ width: 1536, height: 1024 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: path.join(OUT_DIR, 'desktop_1536.png'), fullPage: false });
  await page.screenshot({ path: path.join(OUT_DIR, 'desktop_full.png'), fullPage: true });

  // 2. Tablet 768x1024
  console.log('Testing Tablet 768x1024...');
  await page.setViewport({ width: 768, height: 1024 });
  await page.screenshot({ path: path.join(OUT_DIR, 'tablet_768.png'), fullPage: true });

  // 3. Mobile 375x812
  console.log('Testing Mobile 375x812...');
  await page.setViewport({ width: 375, height: 812 });
  await page.screenshot({ path: path.join(OUT_DIR, 'mobile_375.png'), fullPage: true });

  // 4. Test interactions on Desktop
  console.log('Testing interactions...');
  await page.setViewport({ width: 1536, height: 1024 });
  
  // Click Train tab
  const buttons = await page.$$('button');
  console.log(`Found ${buttons.length} buttons.`);

  await browser.close();
  console.log('All screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
