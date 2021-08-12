/**
 * Utility to remove empty attributes from properties, JSX does not comply with the W3 standard
 * [W3](https://www.w3.org/TR/2008/WD-html5-20080610/semantics.html#boolean)
 */
export const elementAttributes = <T extends Record<string, unknown> = Record<string, unknown>>(
  props: T
): Partial<T> => {
  return Object.keys(props).reduce((cur, key) => {
    switch (typeof props[key]) {
      case 'string':
        return Object.assign(cur, { [key]: props[key] });
    }
    return props[key] ? Object.assign(cur, { [key]: props[key] }) : cur;
  }, {} as Partial<T>);
};

export default elementAttributes;
