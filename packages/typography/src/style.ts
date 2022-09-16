import { createStyles, makeStyles, StyleCSSProperties } from '@equinor/fusion-react-styles';
import { TypographyPropertiesType, TypographyType } from './types';
import { useMemo } from 'react';

export const useStyle = <K extends keyof TypographyType, T extends keyof TypographyPropertiesType<K>>(
  variant: K,
  type: T
) => {
  return useMemo(
    () =>
      makeStyles((theme) => {
        const typography = theme.typography[variant] as TypographyPropertiesType<K>;
        const root = typography[type] as StyleCSSProperties;
        return createStyles({
          root,
        });
      })(),
    [variant, type]
  ).root;
};

export const useStyles = makeStyles((theme) => {
  const ff = Object.entries(theme.typography).reduce(
    (cur, [key, value]) =>
      Object.assign(
        cur,
        Object.entries(value).reduce(
          (child, [childKey, childValue]) => Object.assign(child, { [`${key}__${childKey}`]: childValue.style }),
          {}
        )
      ),
    {}
  );
  return createStyles(ff);
});
