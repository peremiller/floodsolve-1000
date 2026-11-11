import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const icon = readFileSync(new URL('../dist/favicon.svg', import.meta.url), 'utf8');
const css = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');
const app = readFileSync(new URL('../dist/app.js', import.meta.url), 'utf8');

 test('favicon resolves to the official three-bar FloodSolve brand mark', () => {
  assert.match(html, /rel="icon"[^>]*href="\.\/favicon\.svg"/);
  assert.match(icon, /<svg[^>]*viewBox="0 0 64 64"/);
  assert.equal((icon.match(/<rect /g) || []).length, 3);
  assert.match(css, /\.brand-mark span:nth-child\(3\)/);
});

test('critical controls have readable labels and distinct anchor targets', () => {
  for (const id of ['searchInput','sortSelect','resetButton','solutionGrid','pagination','methodDialog','solutionDialog']) {
    assert.match(html, new RegExp('id="' + id + '"'));
  }
  assert.match(html, /class="skip-link" href="#solutions"/);
  assert.match(html, /id="solutions"/);
  assert.match(html, /aria-live="polite"/);
});

test('atlas assets are available as relative URLs for nested deployment prefixes', () => {
  for (const file of ['styles.css','app.js','favicon.svg']) {
    assert.ok(html.includes('./' + file));
    assert.ok(readFileSync(new URL('../dist/' + file, import.meta.url)).length > 0);
  }
});


test('solution deep links participate in browser Back/Forward and retain direct reload support', () => {
  assert.match(app, /history\.pushState\(/);
  assert.match(app, /window\.addEventListener\("popstate", syncSolutionFromLocation\)/);
  assert.match(app, /window\.addEventListener\("hashchange", syncSolutionFromLocation\)/);
  assert.match(app, /syncSolutionFromLocation\(\);/);
  assert.match(app, /if \(!elements\.dialog\.open\) elements\.dialog\.showModal\(\)/);
  assert.match(app, /location\.hash\.slice\(1\)\.toUpperCase\(\)/);
});

test('search keyboard shortcut does not steal focus from open dialogs or modified shortcuts', () => {
  assert.match(app, /!elements\.dialog\.open && !elements\.methodDialog\.open/);
  assert.match(app, /!event\.ctrlKey && !event\.metaKey && !event\.altKey/);
});
