import { makeStyles, FusionTheme, createStyles, theme } from '@equinor/fusion-react-styles';

export type SpacingType = keyof typeof theme.spacing.comfortable;

export type StyleProps = {
  spacing: SpacingType;
};

export const useStyles = makeStyles<FusionTheme, StyleProps>(
  () =>
    createStyles({
      pagination: {
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
      },
    }),
  { name: 'fusion-table-pagination-layout' }
);

export default useStyles;
