import { type ClassNameMap, makeStyles as makeStylesWithoutDefault } from '@material-ui/styles';

import { type FusionTheme, theme as defaultTheme } from './theme';
import type { Styles } from './types';

export const makeStyles = <
  Theme = FusionTheme,
  Props extends Record<string, unknown> = Record<string, unknown>,
  ClassKey extends string = string,
>(
  stylesOrCreator: Styles<Theme, Props, ClassKey>,
  options = {},
): keyof Props extends never
  ? (props?: Props) => ClassNameMap<ClassKey>
  : (props: Props) => ClassNameMap<ClassKey> =>
  // TODO
  // @ts-expect-error
  makeStylesWithoutDefault(stylesOrCreator, {
    defaultTheme,
    ...options,
  });

export default makeStyles;
