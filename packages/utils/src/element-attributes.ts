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
  const result = {} as T;
  for (const key of Object.keys(props)) {
    const value = props[key as keyof T];
    switch (typeof value) {
      case 'string':
        result[key as keyof T] = value as T[keyof T];
        break;
      case 'object':
        result[key as keyof T] = (
          key === 'style' ? value : objectToString(value as Record<string, unknown>)
        ) as T[keyof T];
        break;
      default:
        if (value) {
          result[key as keyof T] = value as T[keyof T];
        }
        break;
    }
  }
  return result;
};

export default elementAttributes;
