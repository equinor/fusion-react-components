import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles(() =>
  createStyles({
    ButtonContainer: {
      display: 'grid',
      columnGap: '8px',
      gridTemplateColumns: '1fr 1fr',
      padding: ' 0 8px',
      whiteSpace: 'nowrap',
    },
    SearchBar: {
      width: '240px',
      margin: '0 8px',
    },
    TextInputIcon: {
      transform: 'scale(0.8)',
      cursor: 'pointer',
    },
  })
);

export default useStyles;
