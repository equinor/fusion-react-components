import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const previewHead = readFileSync(new URL('./preview-head.html', import.meta.url), 'utf8');

test('preview selects the EDS light colour scheme synchronously, before loading styles', () => {
  const attributes = new Map();
  const root = {
    setAttribute: (name, value) => attributes.set(name, value),
    style: {},
  };
  const script = previewHead.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(script, 'The light policy must run in the document head, not a React effect');
  runInNewContext(script[1], { document: { documentElement: root } });
  assert.deepEqual([...attributes], [['data-color-scheme', 'light']]);
  assert.deepEqual(root.style, {}, 'EDS sets color-scheme from data-color-scheme');
  assert.ok(previewHead.indexOf('</script>') < previewHead.indexOf('<link'));
  assert.doesNotMatch(previewHead, /prefers-color-scheme|matchMedia|addEventListener/);
});
