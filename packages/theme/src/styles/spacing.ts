import { tokens } from '@equinor/eds-tokens';
import { StyleProperty, type CSSProperties } from '../style-property';

export type SpacingStyleAttribute = 'padding';

export class SpacingStyleProperty extends StyleProperty<string, SpacingStyleAttribute> {
  get attributes() {
    const { name, value } = this;
    const attribute = StyleProperty.makeCssVar('spacing', name);
    return {
      padding: { attribute, value },
    };
  }

  get style(): CSSProperties {
    return {
      padding: this.value,
    };
  }
}

const createStyleProperty = <T extends Record<string, string>, Tkey extends keyof T>(
  obj: T,
  name: string,
): Record<Tkey, SpacingStyleProperty> =>
  Object.keys(obj).reduce(
    (cur, key) =>
      Object.assign(cur, { [key]: new SpacingStyleProperty(`${name}-${key}`, obj[key]) }),
    {} as Record<Tkey, SpacingStyleProperty>,
  );

export const spacing = {
  comfortable: createStyleProperty(tokens.spacings.comfortable, 'comfortable'),
};

export const spacingVariables = Object.values(spacing).reduce(
  (cur, value) => cur.concat(SpacingStyleProperty.extractVariables(value)),
  [] as string[],
);

export default spacing;
