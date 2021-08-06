import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    FilterSelectorOpenContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minWidth: '250px',
      padding: '16px',
      paddingBottom: '0px',
      boxSizing: 'border-box',
      borderRight: `solid 1px ${theme.colors.ui.background__medium.value.hex}`,
    },
    SelectorHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
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
    },
  })
);

export default useStyles;
