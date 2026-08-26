import { describe, expect, test } from 'vitest';
import { personSortComparator } from './personSort';

describe('personSortComparator', () => {
  const accessor = (person: { name?: string }) => person.name;
  const comparator = personSortComparator(accessor);

  test('returns 0 when both values are null or undefined', () => {
    expect(comparator(null, null)).toBe(0);
    expect(comparator(undefined, undefined)).toBe(0);
    expect(comparator(null, undefined)).toBe(0);
    expect(comparator(undefined, null)).toBe(0);
  });

  test('returns 0 when accessor returns undefined or empty for both values', () => {
    expect(comparator({}, {})).toBe(0);
    expect(comparator({ name: '' }, { name: '' })).toBe(0);
    expect(comparator({ name: undefined }, { name: undefined })).toBe(0);
    expect(comparator(null, {})).toBe(0);
  });

  test('sorts missing values after valid values', () => {
    expect(comparator({ name: 'Alice' }, null)).toBe(-1);
    expect(comparator(null, { name: 'Alice' })).toBe(1);
    expect(comparator({ name: 'Alice' }, {})).toBe(-1);
    expect(comparator({}, { name: 'Alice' })).toBe(1);
  });

  test('compares valid string names alphabetically using localeCompare', () => {
    expect(comparator({ name: 'Alice' }, { name: 'Bob' })).toBeLessThan(0);
    expect(comparator({ name: 'Bob' }, { name: 'Alice' })).toBeGreaterThan(0);
    expect(comparator({ name: 'Alice' }, { name: 'Alice' })).toBe(0);
  });
});
