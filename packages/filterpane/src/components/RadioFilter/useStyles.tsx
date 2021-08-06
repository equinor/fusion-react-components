import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';
import { CSSProperties } from 'react';

export type RadioFilterStyles = {
  filterContainer?: CSSProperties;
  filterHeader?: CSSProperties;
  filterOptionsContainer?: CSSProperties;
  filterOptions?: CSSProperties;
};

const useStyles = makeStyles<FusionTheme, RadioFilterStyles>(() =>
  createStyles({
    RadioFilterContainer: ({ filterContainer }) => ({
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      paddingBottom: '0px',
      boxSizing: 'border-box',
      minWidth: '100px',
      maxWidth: '240px',
      ...filterContainer,
    }),
    FilterHeader: ({ filterHeader }) => ({
      padding: '0 8px',
      fontWeight: 'bold',
      ...filterHeader,
    }),
    FilterOptionsContainer: ({ filterOptionsContainer }) => ({
      flexDirection: 'column',
      overflowY: 'auto',
      margin: 0,
      paddingRight: '8px',
      ...filterOptionsContainer,
    }),
    FilterOption: ({ filterOptions }) => ({
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      ...filterOptions,
    }),
  })
);

export default useStyles;
