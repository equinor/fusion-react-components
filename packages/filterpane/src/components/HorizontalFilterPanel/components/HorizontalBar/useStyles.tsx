import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    HorizontalBaR: {
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      height: '48px',
      borderBottom: `solid 1px ${theme.colors.ui.background__medium.value.hex}`,
    },
  })
);

export default useStyles;
