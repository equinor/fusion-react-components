import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const previewHead = readFileSync(new URL('./preview-head.html', import.meta.url), 'utf8');
const managerHead = readFileSync(new URL('./manager-head.html', import.meta.url), 'utf8');

test('preview locks EDS and native controls synchronously, before loading styles', () => {
  const attributes = new Map();
  const root = {
    setAttribute: (name, value) => attributes.set(name, value),
    style: {},
  };
  const script = previewHead.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(script, 'The light policy must run in the document head, not a React effect');
  runInNewContext(script[1], { document: { documentElement: root } });
  assert.equal(attributes.get('data-color-scheme'), 'light');
  assert.equal(root.style.colorScheme, 'only light');
  assert.ok(previewHead.indexOf('</script>') < previewHead.indexOf('<link'));
});

test('both documents advertise only light before application startup', () => {
  for (const head of [previewHead, managerHead]) {
    assert.match(head, /^<meta name="color-scheme" content="only light"\s*\/>/);
    assert.doesNotMatch(head, /prefers-color-scheme|matchMedia|addEventListener/);
  }
  assert.match(managerHead, /:root,\s*:root body \*\s*\{\s*color-scheme:\s*only light;/);
});
