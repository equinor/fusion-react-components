import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(() =>
  createStyles({
    FilterCategoryContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    CategoryLabel: {
      cursor: 'pointer',
    },
  })
);

export default useStyles;
