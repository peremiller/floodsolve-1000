import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const icon = readFileSync(new URL('../dist/favicon.svg', import.meta.url), 'utf8');
const css = readFileSync(new URL('../dist/styles.css', import.meta.url), 'utf8');

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
