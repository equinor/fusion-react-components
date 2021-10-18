import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        position: 'sticky',
        left: 0,
        zIndex: 99,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
        padding: '16px',
        paddingBottom: '0px',
        backgroundColor: 'inherit',
        borderRight: `solid 1px ${theme.colors.ui.background__medium.value.hex}`,
        '&$closed': {
          width: '48px',
        },
      },
      header: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
      },
      title: {
        ...theme.typography.heading.h5.style,
      },
      toggleBtn: {
        cursor: 'pointer',
      },
      searchBox: (props: { compact: boolean }) => ({
        marginRight: theme.spacing.comfortable.small.getVariable('padding'),
        width: props.compact ? 160 : 200,
      }),
      FilterSelectorOpen: {
        minWidth: '200px',
      },
      closed: {},
      categories: {
        display: 'flex',
        flexFlow: 'column',
      },
    }),
  { name: 'fusion-filter-filterSelector' }
);

export default useStyles;
