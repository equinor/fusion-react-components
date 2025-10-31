/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */

import type { CSSProperties as ReactCSSProperties } from 'react';
import type { StyleProperty, CSSProperties } from '@equinor/fusion-web-theme';

/**
 * Extended CSS properties that support Fusion theme types
 *
 * This interface extends React's CSSProperties with support for:
 * - Fusion theme CSSProperties
 * - Fusion theme StyleProperty values
 * - Custom properties via index signature
 */
export interface StyleCSSProperties extends ReactCSSProperties {
  [k: string]: unknown | CSSProperties | ReactCSSProperties | StyleProperty;
}

/**
 * Base CSS properties that can be static or prop-based
 *
 * Each property can be:
 * - A static value from CSSProperties
 * - A static value from ReactCSSProperties
 * - A function that receives props and returns a value
 *
 * @template Props - The props type for dynamic styles
 */
export type BaseCreateCSSProperties<
  Props extends Record<string, unknown> = Record<string, unknown>,
> = {
  [P in keyof CSSProperties]:
    | CSSProperties[P]
    // @ts-expect-error - Type mismatch between Fusion and React CSS properties is intentional
    | ReactCSSProperties[P]
    | PropsFunc<Props, CSSProperties[P]>
    // @ts-expect-error - Type mismatch between Fusion and React CSS properties is intentional
    | PropsFunc<Props, ReactCSSProperties[P]>;
};

/**
 * CSS properties with support for pseudo-selectors and media queries
 *
 * Extends BaseCreateCSSProperties to allow:
 * - Pseudo-selectors (e.g., '&:hover', '&:focus')
 * - Media queries (e.g., '@media (max-width: 600px)')
 * - Nested selectors (e.g., '& .child')
 *
 * @template Props - The props type for dynamic styles
 */
export interface CreateCSSProperties<
  Props extends Record<string, unknown> = Record<string, unknown>,
> extends BaseCreateCSSProperties<Props> {
  // Allow pseudo selectors and media queries via index signature
  [k: string]:
    | BaseCreateCSSProperties<Props>[keyof BaseCreateCSSProperties<Props>]
    | CreateCSSProperties<Props>;
}

/**
 * Function type for prop-based style values
 *
 * @template Props - The props type
 * @template T - The return type
 */
export type PropsFunc<Props extends Record<string, unknown>, T> = (props: Props) => T;

/**
 * Style rules type definition
 *
 * This is similar to Material-UI's StyleRules but uses Fusion-defined CSSProperties.
 * It supports both static styles and theme/props-based dynamic styles.
 *
 * Each class key can be:
 * - A static CSSProperties object
 * - A static ReactCSSProperties object
 * - A CreateCSSProperties object (supports pseudo-selectors, media queries)
 * - A function that receives props and returns CreateCSSProperties
 *
 * @template Props - The props type for dynamic styles
 * @template ClassKey - The string literal type for class keys
 *
 * @example
 * ```tsx
 * const styles: StyleRules = {
 *   root: { color: 'red' },
 *   button: { padding: '10px' }
 * };
 * ```
 *
 * @example
 * ```tsx
 * const styles: StyleRules<{ color: string }> = {
 *   root: (props) => ({ color: props.color })
 * };
 * ```
 */
export type StyleRules<
  Props extends Record<string, unknown> = Record<string, unknown>,
  ClassKey extends string = string,
> = Record<
  ClassKey,
  // JSS property bag (static styles)
  | CSSProperties
  | ReactCSSProperties
  // JSS property bag where values are based on props (supports pseudo-selectors)
  | CreateCSSProperties<Props>
  // JSS property bag based on props (function that returns styles)
  | PropsFunc<Props, CreateCSSProperties<Props>>
>;

export type StyleRulesCallback<
  Theme,
  Props extends Record<string, unknown>,
  ClassKey extends string = string,
> = (theme: Theme) => StyleRules<Props, ClassKey>;

export type Styles<Theme, Props extends Record<string, unknown>, ClassKey extends string = string> =
  | StyleRules<Props, ClassKey>
  | StyleRulesCallback<Theme, Props, ClassKey>;
