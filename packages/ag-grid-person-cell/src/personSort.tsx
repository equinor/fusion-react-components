export const personSortComparator =
  <T,>(accessor: (data: T) => string | undefined) =>
  (_valueA: T | null | undefined, _valueB: T | null | undefined) => {
    const a = _valueA == null ? undefined : accessor(_valueA);
    const b = _valueB == null ? undefined : accessor(_valueB);
    if (!a) return -1;
    if (!b) return 1;
    return a.localeCompare(b);
  };

export default personSortComparator;
