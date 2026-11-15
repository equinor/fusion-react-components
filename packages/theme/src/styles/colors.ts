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

/**
 * Fusion-owned mapping from legacy EDS 0.9.2 colour tokens to the closest EDS 2.x
 * colour-scheme-aware CSS custom property (`@equinor/eds-tokens/css/variables`).
 *
 * EDS publishes no official legacy-to-2.x mapping, so these pairs are approximations.
 * Tokens without an entry (infographic, logo, overlays) keep their static light values.
 */
export const colorSchemeVariables: Record<string, Record<string, string>> = {
  interactive: {
    primary__selected_highlight: '--eds-color-bg-accent-fill-muted-default',
    primary__selected_hover: '--eds-color-bg-accent-fill-muted-hover',
    primary__resting: '--eds-color-bg-accent-fill-emphasis-default',
    primary__hover: '--eds-color-bg-accent-fill-emphasis-hover',
    primary__hover_alt: '--eds-color-bg-accent-fill-muted-default',
    secondary__highlight: '--eds-color-bg-info-fill-muted-default',
    secondary__resting: '--eds-color-bg-neutral-fill-emphasis-default',
    secondary__link_hover: '--eds-color-bg-neutral-fill-emphasis-hover',
    danger__highlight: '--eds-color-bg-danger-fill-muted-default',
    danger__resting: '--eds-color-bg-danger-fill-emphasis-default',
    danger__hover: '--eds-color-bg-danger-fill-emphasis-hover',
    danger__text: '--eds-color-text-danger-subtle',
    warning__highlight: '--eds-color-bg-warning-fill-muted-default',
    warning__resting: '--eds-color-bg-warning-fill-emphasis-default',
    warning__hover: '--eds-color-bg-warning-fill-emphasis-hover',
    warning__text: '--eds-color-text-warning-subtle',
    success__highlight: '--eds-color-bg-success-fill-muted-default',
    success__resting: '--eds-color-bg-success-fill-emphasis-default',
    success__hover: '--eds-color-bg-success-fill-emphasis-hover',
    success__text: '--eds-color-text-success-subtle',
    table__cell__fill_resting: '--eds-color-bg-neutral-surface',
    table__cell__fill_hover: '--eds-color-bg-neutral-fill-muted-default',
    table__cell__fill_activated: '--eds-color-bg-accent-fill-muted-default',
    table__header__fill_activated: '--eds-color-bg-neutral-fill-muted-default',
    table__header__fill_hover: '--eds-color-bg-neutral-fill-muted-hover',
    table__header__fill_resting: '--eds-color-bg-neutral-canvas',
    disabled__text: '--eds-color-text-disabled',
    text_highlight: '--eds-color-bg-info-fill-muted-default',
    focus: '--eds-color-border-focus',
    disabled__border: '--eds-color-border-disabled',
    disabled__fill: '--eds-color-bg-disabled',
    link_on_interactive_colors: '--eds-color-text-accent-strong-on-emphasis',
    icon_on_interactive_colors: '--eds-color-text-accent-strong-on-emphasis',
  },
  text: {
    static_icons__default: '--eds-color-text-neutral-strong',
    static_icons__secondary: '--eds-color-text-neutral-subtle',
    static_icons__tertiary: '--eds-color-text-neutral-subtle',
    static_icons__primary_white: '--eds-color-text-accent-strong-on-emphasis',
  },
  ui: {
    background__default: '--eds-color-bg-neutral-surface',
    background__light: '--eds-color-bg-neutral-canvas',
    background__medium: '--eds-color-bg-neutral-fill-muted-default',
    background__info: '--eds-color-bg-info-fill-muted-default',
    background__warning: '--eds-color-bg-warning-fill-muted-default',
    background__danger: '--eds-color-bg-danger-fill-muted-default',
  },
};

/**
 * Replace the legacy `var(--eds_*, rgba(...))` value with the mapped EDS 2.x variable.
 * No literal fallback is kept: the legacy `--eds_*` variables and literal values are static
 * light colours, and the host provides the EDS colour variables.
 */
const withColorScheme = (color: Color, variable?: string): Color =>
  variable ? { ...color, rgba: `var(${variable})` } : color;

const createStyleProperty = <T extends Record<string, Color>, Tkey extends keyof T>(
  obj: T,
  name: string,
): Record<Tkey, ColorStyleProperty> =>
  Object.keys(obj).reduce(
    (cur, key) =>
      Object.assign(cur, {
        [key]: new ColorStyleProperty(
          `${name}-${key}`,
          withColorScheme(obj[key], colorSchemeVariables[name]?.[key]),
        ),
      }),
    {} as Record<Tkey, ColorStyleProperty>,
  );

export const colors = {
  infographic: createStyleProperty(tokens.colors.infographic, 'infographic'),
  interactive: createStyleProperty(tokens.colors.interactive, 'interactive'),
  logo: createStyleProperty(tokens.colors.logo, 'logo'),
  text: createStyleProperty(tokens.colors.text, 'text'),
  ui: createStyleProperty(tokens.colors.ui, 'ui'),
};

export const colorVariables = Object.values(colors).flatMap((value) =>
  ColorStyleProperty.extractVariables(value),
);

export default colors;
