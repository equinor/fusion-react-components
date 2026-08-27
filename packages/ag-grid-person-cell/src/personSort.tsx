/**
 * Creates a comparator function for sorting items by a string value.
 *
 * Handles null/undefined values by placing them at the end of the sort order.
 * Uses locale-aware string comparison for consistent sorting across languages.
 *
 * @template T The type of items being compared
 * @param accessor A function to extract the string value from an item
 * @returns A comparator function suitable for ag-grid's sort
 *
 * @example
 * ```tsx
 * const personNameComparator = personSortComparator(person => person.name);
 * gridOptions.sortingOrder = [personNameComparator];
 * ```
 */
export const personSortComparator =
  <T,>(accessor: (data: T) => string | undefined) =>
  (valueA: T | null | undefined, valueB: T | null | undefined): number => {
    const aValue = valueA == null ? undefined : accessor(valueA);
    const bValue = valueB == null ? undefined : accessor(valueB);

    // Both values are empty: maintain original order
    if (!aValue && !bValue) return 0;

    // Only A is empty: place it after B
    if (!aValue) return 1;

    // Only B is empty: place it after A
    if (!bValue) return -1;

    // Both have values: compare using locale-aware string comparison
    return aValue.localeCompare(bValue);
  };

export default personSortComparator;
