// Render page.html to entry.png with the cached headless Chromium.
// Deterministic: fixed viewport, no network, animations off, PNG only.
import { createRequire } from 'node:module';
const require = createRequire('/home/hatch/workspace/makefun/pwshot/package.json');
const { chromium } = require('playwright-core');
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(root, 'page.html'), 'utf8');

const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM ||
    '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png' });
await browser.close();

writeFileSync(join(root, 'entry.png'), png);
console.log('wrote entry.png', png.length, 'bytes');
