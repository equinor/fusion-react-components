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
      select: {
        fontFamily: 'inherit',
        margin: '0 1em 0 1em',
        padding: '0 .5em 0 0',
        fontSize: '14px',
      },
    }),
  { name: 'fusion-table-pagination-layout' },
);

export default useStyles;
