import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      ChipsContainer: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridGap: '8px',
        alignContent: 'center',
        overflow: 'auto',
      },
      Chip: {
        fontFamily: 'Equinor',
        fontWeight: 500,
        fontSize: '0.875rem',
        color: theme.colors.interactive.primary__resting.value.hex,
        display: 'flex',
        borderRadius: '16px',
        background: theme.colors.interactive.primary__selected_highlight.value.hex,
        whiteSpace: 'nowrap',
        padding: '4px 8px ',
        lineHeight: '24px',
        alignItems: 'center',
      },
      ChipResetFilter: {
        borderRadius: '16px',
        '&:hover': {
          background: theme.colors.interactive.primary__hover_alt.value.hex,
        },
      },
    }),
  { name: 'fusion-filter-chips' }
);

export default useStyles;
