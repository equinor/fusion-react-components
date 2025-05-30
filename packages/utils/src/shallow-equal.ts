/**
 * Shallow compare of two objects
 * @returns boolean - true if objects are the same false if difference
 */
export const shallowEqual = <T extends Record<string, unknown>>(
  a: Partial<T>,
  b: Partial<T>,
): boolean =>
  Object.keys(a).length === Object.keys(b).length &&
  Object.keys(a).every((key) => a[key] === b[key]);
