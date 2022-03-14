import { createStyles, makeStyles, FusionTheme } from '@equinor/fusion-react-styles';

export const useStyles = <T extends FusionTheme['typography'], K extends keyof T>(variant: K, type: T[K]) => {
  return makeStyles(
    (theme) =>
      createStyles({
        // type: (props: { variant: keyof FusionTheme['typography']; type: TypographyType }) => ({
        type: (props) => ({
          ...theme.typography[variant][type].styles,
          //   ...theme.typography['heading']['h1'].style,
        }),
      }),
    { name: 'fusion-typography' }
  );
};
