import { tokens, type Typography } from '@equinor/eds-tokens';
import { StyleProperty, type StyleAttribute } from '../style-property';

type TypographyAttribute = keyof Typography;
export class TypographyStyleProperty extends StyleProperty<Typography, TypographyAttribute> {
  get attributes() {
    const { name, value } = this;
    return {
      color: {
        attribute: StyleProperty.makeCssVar('typography', `${name}__color`),
        value: StyleProperty.makeVariable({
          attribute: StyleProperty.makeCssVar('typography', 'base-color'),
          value: value.color,
        }),
        base: true,
      },
      fontFamily: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-fontFamily`),
        value: value.fontFamily,
      },
      fontSize: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-fontSize`),
        value: value.fontSize,
      },
      fontWeight: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-fontWeight`),
        value: value.fontWeight,
      },
      lineHeight: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-lineHeight`),
        value: value.lineHeight,
      },
      textAlign: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-textAlign`),
        value: value.textAlign,
      },
      letterSpacing: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-letterSpacing`),
        value: value.letterSpacing,
      },
      fontStyle: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-fontStyle`),
        value: value.fontStyle,
      },
      textTransform: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-textTransform`),
        value: value.textTransform,
      },
      textDecoration: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-textDecoration`),
        value: value.textDecoration,
      },
      fontFeature: {
        attribute: StyleProperty.makeCssVar('typography', `${name}-fontFeature`),
        value: value.fontFeature,
      },
    };
  }
}

const createStyleProperty = <
  // biome-ignore lint/suspicious/noExplicitAny: generic default/constraint
  T extends Record<string, TypographyAttribute | any>,
  Tkey extends keyof T,
>(
  obj: T,
  name: string,
): Record<Tkey, TypographyStyleProperty> =>
  Object.keys(obj).reduce(
    (cur, key) =>
      Object.assign(cur, { [key]: new TypographyStyleProperty(`${name}-${key}`, obj[key]) }),
    {} as Record<Tkey, TypographyStyleProperty>,
  );

export const typography = {
  heading: createStyleProperty(tokens.typography.heading, 'heading'),
  input: createStyleProperty(tokens.typography.input, 'input'),
  navigation: createStyleProperty(tokens.typography.navigation, 'navigation'),
  paragraph: createStyleProperty(tokens.typography.paragraph, 'paragraph'),
  table: createStyleProperty(tokens.typography.table, 'table'),
  ui: createStyleProperty(tokens.typography.ui, 'ui'),
};

export const baseTypographyColor: StyleAttribute = {
  attribute: StyleProperty.makeCssVar('typography', 'base-color'),
  value: tokens.colors.text.static_icons__default.rgba,
};

export const typographyVariables = [
  ...Object.values(typography).reduce(
    (cur, value) => cur.concat(StyleProperty.extractVariables(value)),
    [] as string[],
  ),
  [baseTypographyColor.attribute, baseTypographyColor.value].join(':'),
];

export default typography;
