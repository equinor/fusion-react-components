import { formatISO } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/ban-types
const objectToString = (object: Object) => {
  switch (object.constructor) {
    case Date:
      return formatISO(object as Date);
    default:
      return JSON.stringify(object);
  }
};

/**
 * Utility to remove empty attributes from properties, JSX does not comply with the W3 standard
 * [W3](https://www.w3.org/TR/2008/WD-html5-20080610/semantics.html#boolean)
 */
export const elementAttributes = <
  T extends Partial<Record<keyof T, unknown>> = Record<string, unknown>,
>(
  props: Partial<T>,
): T => {
  return Object.keys(props).reduce((cur, key) => {
    const value = props[key as keyof T];
    switch (typeof value) {
      case 'string':
        return Object.assign(cur, { [key]: value });
      case 'object':
        // eslint-disable-next-line @typescript-eslint/ban-types
        return Object.assign(cur, {
          [key]: key === 'style' ? value : objectToString(value as Object),
        });
      default:
        return value ? Object.assign(cur, { [key]: value }) : cur;
    }
  }, {} as T);
};

export default elementAttributes;
