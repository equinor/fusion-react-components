/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */

import type { CSSProperties as ReactCSSProperties } from 'react';
import type { StyleProperty, CSSProperties } from '@equinor/fusion-web-theme';

export interface StyleCSSProperties extends ReactCSSProperties {
  [k: string]: unknown | CSSProperties | ReactCSSProperties | StyleProperty;
}

export type BaseCreateCSSProperties<
  Props extends Record<string, unknown> = Record<string, unknown>,
> = {
  [P in keyof CSSProperties]:
    | CSSProperties[P]
    // @ts-ignore
    | ReactCSSProperties[P]
    | PropsFunc<Props, CSSProperties[P]>
    //@ts-ignore
    | PropsFunc<Props, ReactCSSProperties[P]>;
};

export interface CreateCSSProperties<
  Props extends Record<string, unknown> = Record<string, unknown>,
> extends BaseCreateCSSProperties<Props> {
  // Allow pseudo selectors and media queries
  [k: string]:
    | BaseCreateCSSProperties<Props>[keyof BaseCreateCSSProperties<Props>]
    | CreateCSSProperties<Props>;
}

export type PropsFunc<Props extends Record<string, unknown>, T> = (props: Props) => T;

/**
 * Same as material but only with fusion defined/imported CSSProperties, typescript mismatch
 */
export type StyleRules<
  Props extends Record<string, unknown> = Record<string, unknown>,
  ClassKey extends string = string,
> = Record<
  ClassKey,
  // JSS property bag
  | CSSProperties
  | ReactCSSProperties
  // JSS property bag where values are based on props
  | CreateCSSProperties<Props>
  // JSS property bag based on props
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
