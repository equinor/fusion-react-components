import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { TypographyType } from './types';

export const useStyles = <T extends TypographyType, K extends keyof T>(variant: keyof T, type: keyof T[K]) => {
  return makeStyles(
    (theme) =>
      createStyles({
        root: () => {
          const typography = theme.typography[variant as keyof typeof theme.typography];
          const styleProperty = typography[type as keyof typeof typography] || { style: {} };
          return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ...styleProperty.style,
            color: 'red',
          };
        },
      }),
    { name: 'fusion-typography' }
  );
};
