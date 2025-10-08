export const extractProps = <T extends Record<string, unknown>>(
  props: T | Record<string, unknown>,
): T => {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    const value = props[key];
    if (value) {
      result[key] = value;
    }
  }
  return result as T;
};

export default extractProps;
