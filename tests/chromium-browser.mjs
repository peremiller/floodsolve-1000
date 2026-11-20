import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const files = {
  '/': ['index.html', 'text/html'],
  '/index.html': ['index.html', 'text/html'],
  '/app.js': ['app.js', 'text/javascript'],
  '/styles.css': ['styles.css', 'text/css'],
  '/favicon.svg': ['favicon.svg', 'image/svg+xml']
};
const root = new URL('../dist/', import.meta.url);
const server = createServer((req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  const file = files[path];
  if (!file) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.setHeader('Content-Type', file[1]);
  res.setHeader('Cache-Control', 'no-store');
  res.end(readFileSync(new URL(file[0], root)));
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const url = 'http://127.0.0.1:' + server.address().port;
let browser;
try {
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox']
  });
  for (const width of [320, 390, 1280]) {
    for (const colorScheme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width, height: 800 },
        colorScheme,
        reducedMotion: 'reduce'
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(url);
      await page.evaluate(() => localStorage.setItem('primeqe-existing', 'do-not-change'));
      assert.equal(await page.locator('.solution-card').count(), 24);
      assert.equal(await page.locator('#resultCount').textContent(), '1,000');
      const overflow = await page.evaluate(() => ({
        viewport: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        offenders: [...document.querySelectorAll('body *')]
          .filter(el => el.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(el).overflowX !== 'auto')
          .slice(0, 12).map(el => ({ tag: el.tagName, cls: el.className, right: Math.round(el.getBoundingClientRect().right) }))
      }));
      assert.ok(overflow.documentWidth <= overflow.viewport + 1, 'horizontal overflow ' + JSON.stringify(overflow));
      const prev = page.getByRole('button', { name: 'Previous page' });
      assert.equal(await prev.isDisabled(), true);
      const next = page.getByRole('button', { name: 'Next page' });
      await next.focus();
      await page.keyboard.press('Enter');
      assert.equal((await page.locator('#pagination [aria-current="page"]').textContent()).trim(), '2');
      assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), 'Page 2', 'focus lost on pagination redraw');
      assert.equal(await page.locator('#resultSummary').textContent(), 'Showing the complete global atlas · page 2 of 42');
      assert.equal(await page.locator('#resultSummary').getAttribute('role'), 'status');
      assert.equal(await page.locator('#solutionGrid').getAttribute('aria-live'), null, 'avoid announcing all 24 cards on each page change');
      await page.locator('#listView').click();
      assert.equal(await page.locator('#listView').getAttribute('aria-pressed'), 'true');
      await page.locator('#gridView').click();
      assert.equal(await page.locator('#gridView').getAttribute('aria-pressed'), 'true');
      await page.locator('.card-action').first().click();
      assert.match(page.url(), /#FS-\d{4}$/);
      assert.equal(await page.locator('#solutionDialog').evaluate(el => el.open), true);
      const direct = page.url();
      await page.goBack();
      assert.equal(await page.locator('#solutionDialog').evaluate(el => el.open), false);
      await page.goto(direct);
      assert.equal(await page.locator('#solutionDialog').evaluate(el => el.open), true, 'deep link did not restore brief');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#solutionDialog').evaluate(el => el.open), false);
      await page.locator('#searchInput').fill('an-impossible-flood-solution-xyz');
      assert.equal(await page.locator('#emptyState').isVisible(), true);
      await page.locator('#emptyReset').click();
      assert.equal(await page.locator('#resultCount').textContent(), '1,000');
      assert.equal(await page.evaluate(() => localStorage.getItem('primeqe-existing')), 'do-not-change');
      assert.deepEqual(errors, [], 'uncaught page errors');
      await context.close();
    }
  }
  console.log('PASS: real Chromium 320/390/1280, light/dark OS preference, keyboard pagination focus, deep links, browser back, dialogs, selected, empty/recovery, storage and overflow');
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
