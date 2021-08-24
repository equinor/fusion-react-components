import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      FilterSelectorContainer: {
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
      },
      FilterSelectorOpen: {
        minWidth: '200px',
      },
      FilterSelectorMinimized: {
        width: '48px',
      },
      SelectorHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
      },

      SelectorHeaderText: {
        lineHeight: '24px',
      },

      SelectorTextInputIcon: {
        transform: 'scale(08)',
        cursor: 'pointer',
      },

      SelectorSection: {
        padding: '8px 0',
        overflowY: 'auto',
        margin: '0px',
      },
    }),
  { name: 'fusion-filterpane-filterSelector' }
);

export default useStyles;
