import { ClassNameMap, makeStyles as makeStylesWithoutDefault, Styles } from '@material-ui/styles';

import { FusionTheme, theme as defaultTheme } from './theme';

export const makeStyles = <
  Theme = FusionTheme,
  Props extends Record<string, unknown> = Record<string, unknown>,
  ClassKey extends string = string
>(
  stylesOrCreator: Styles<Theme, Props, ClassKey>,
  options = {}
): keyof Props extends never ? (props?: Props) => ClassNameMap<ClassKey> : (props: Props) => ClassNameMap<ClassKey> =>
  makeStylesWithoutDefault(stylesOrCreator, {
    // @ts-ignore
    defaultTheme,
    ...options,
  });

export default makeStyles;
