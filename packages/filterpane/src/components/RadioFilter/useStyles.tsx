import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';
import { CSSProperties } from 'react';

export type RadioFilterStyles = {
  filterContainer?: CSSProperties;
  filterHeader?: CSSProperties;
  filterOptionsContainer?: CSSProperties;
  filterOptions?: CSSProperties;
};

const useStyles = makeStyles<FusionTheme, RadioFilterStyles>(
  () =>
    createStyles({
      RadioFilterContainer: ({ filterContainer }) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        paddingBottom: '0px',
        boxSizing: 'border-box',
        minWidth: '150px',
        maxWidth: '240px',
        ...filterContainer,
      }),
      FilterHeader: ({ filterHeader }) => ({
        padding: '0 8px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        ...filterHeader,
      }),
      FilterOptionsContainer: ({ filterOptionsContainer }) => ({
        flexDirection: 'column',
        overflowY: 'auto',
        margin: 0,
        paddingRight: '8px',
        ...filterOptionsContainer,
      }),
      FilterOption: ({ filterOption }) => ({
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        ...filterOption,
      }),
      FilterOptionLabel: ({ filterOptionLabel }) => ({
        flex: 1,
        overflow: 'hidden',
        height: '100%',
        cursor: 'pointer',
        alignItems: 'center',
        textOverflow: 'ellipsis',
        ...filterOptionLabel,
      }),
    }),
  { name: 'fusion-filterpane-radioFilter' }
);

export default useStyles;
