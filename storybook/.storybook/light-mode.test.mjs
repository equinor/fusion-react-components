import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const previewHead = readFileSync(new URL('./preview-head.html', import.meta.url), 'utf8');
const markup = previewHead.replace(/<!--[\s\S]*?-->/g, '');

test('preview selects the EDS light colour scheme on <html> before loading styles', () => {
  const htmlTags = markup.match(/<html\b[^>]*>/g) ?? [];
  assert.deepEqual(htmlTags, ['<html data-color-scheme="light">']);
  assert.ok(markup.indexOf('<html') < markup.indexOf('<link'));
  assert.doesNotMatch(markup, /<script|<\/html>|color-scheme:|prefers-color-scheme/);
});
