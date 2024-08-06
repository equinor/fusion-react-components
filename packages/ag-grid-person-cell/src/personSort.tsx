export const personSortComparator =
  <T,>(accessor: (data: T) => string | undefined) =>
  (_valueA: T, _valueB: T) => {
    const a = accessor(_valueA);
    const b = accessor(_valueB);
    if (!a) return -1;
    if (!b) return 1;
    return a.localeCompare(b);
  };

export default personSortComparator;
