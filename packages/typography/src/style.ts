import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { TypographyType } from './types';

export const useStyles = makeStyles((theme) => {
  return createStyles({
    root: <T extends TypographyType, K extends keyof T>(args: { variant: keyof T; type: keyof T[K] }) => {
      const typography = theme.typography[args.variant as keyof typeof theme.typography];
      const styleProperty = typography[args.type as keyof typeof typography] || { style: {} };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return styleProperty.style;
    },
  });
});
