import { CreateCSSProperties, PropsFunc, StyleRules } from '@material-ui/styles';
import { CSSProperties } from '@equinor/fusion-web-theme';

/**
 * Same as material but only with fusion defined/imported CSSProperties, typescript mismatch
 */
export type FusionStyleRules<
  Props extends Record<string, unknown> = Record<string, unknown>,
  ClassKey extends string = string
> = Record<
  ClassKey,
  // JSS property bag
  | CSSProperties
  // JSS property bag where values are based on props
  | CreateCSSProperties<Props>
  // JSS property bag based on props
  | PropsFunc<Props, CreateCSSProperties<Props>>
>;

// eslint-disable-next-line @typescript-eslint/ban-types
export const createStyles = <ClassKey extends string, Props extends {}>(
  styles?: FusionStyleRules<Props, ClassKey>
): StyleRules<Props, ClassKey> | never => styles as unknown as StyleRules<Props, ClassKey>;
