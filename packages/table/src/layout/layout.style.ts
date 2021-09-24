import { makeStyles, FusionTheme, createStyles, theme } from '@equinor/fusion-react-styles';

export type SpacingType = keyof typeof theme.spacing.comfortable;

export type StyleProps = {
  spacing: SpacingType;
  virtualPaddingTop?: number;
  virtualPaddingBottom?: number;
};

export const useStyles = makeStyles<FusionTheme, StyleProps>(
  (theme) =>
    createStyles({
      root: {
        ...theme.typography.table.cell_text.style,
        borderCollapse: 'collapse',
      },
      thead: {
        ...theme.typography.table.cell_header,
        background: theme.colors.interactive.table__header__fill_resting.value.hex,
        borderBottom: `2px solid ${theme.colors.ui.background__medium.value.hex}`,
      },
      groupHeader: {
        ...theme.typography.heading.h5.style,
      },
      cell: ({ spacing }) => ({
        ...theme.spacing.comfortable[spacing].style,
      }),
      row: {
        borderBottom: `1px solid ${theme.colors.ui.background__medium.value.hex}`,
        '&:hover': {
          background: theme.colors.interactive.table__cell__fill_hover.value.rgba,
        },
      },
      interactiveRow: {
        '&:hover': {
          background: theme.colors.interactive.table__cell__fill_hover.value.rgba,
        },
      },
      virtualTableBody: ({ virtualPaddingBottom, virtualPaddingTop }) => ({
        '&::before': {
          display: 'block',
          paddingTop: virtualPaddingTop || 0,
          content: '""',
        },
        '&::after': {
          display: 'block',
          paddingBottom: virtualPaddingBottom || 0,
          content: '""',
        },
      }),
      virtualContainer: {
        overflow: 'auto',
        height: 'inherit',
      },
    }),
  { name: 'fusion-table-layout' }
);

export default useStyles;
