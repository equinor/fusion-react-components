import { tokens } from '@equinor/eds-tokens';
import StyleProperty, { type CSSProperties, type StyleAttribute } from '../style-property';

export type Color = {
  hex: string;
  hsla: string;
  rgba: string;
};

export type ColorStyleAttribute = 'color';

export class ColorStyleProperty extends StyleProperty<Color, ColorStyleAttribute> {
  get attributes(): Record<ColorStyleAttribute, StyleAttribute> {
    const {
      name,
      value: { rgba },
    } = this;
    const attribute = StyleProperty.makeCssVar('color', name);
    return {
      color: { attribute, value: rgba },
    };
  }

  get style(): CSSProperties {
    return {
      color: this.value.rgba,
    };
  }
}

const createStyleProperty = <T extends Record<string, Color>, Tkey extends keyof T>(
  obj: T,
  name: string,
): Record<Tkey, ColorStyleProperty> =>
  Object.keys(obj).reduce(
    (cur, key) => Object.assign(cur, { [key]: new ColorStyleProperty(`${name}-${key}`, obj[key]) }),
    {} as Record<Tkey, ColorStyleProperty>,
  );

export const colors = {
  infographic: createStyleProperty(tokens.colors.infographic, 'infographic'),
  interactive: createStyleProperty(tokens.colors.interactive, 'interactive'),
  logo: createStyleProperty(tokens.colors.logo, 'logo'),
  text: createStyleProperty(tokens.colors.text, 'text'),
  ui: createStyleProperty(tokens.colors.ui, 'ui'),
};

export const colorVariables = Object.values(colors).reduce(
  (cur, value) => cur.concat(ColorStyleProperty.extractVariables(value)),
  [] as string[],
);

export default colors;
