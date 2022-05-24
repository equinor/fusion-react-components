import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { TypographyPropertiesType, TypographyType } from './types';
import { useMemo } from 'react';

export const useStyle = <K extends keyof TypographyType, T extends keyof TypographyPropertiesType<K>>(
  variant: K,
  type: T
) => {
  return useMemo(
    () =>
      makeStyles((theme) => {
        const typography = theme.typography[variant];
        const gg = typography[type];
        return createStyles({
          root: gg,
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
