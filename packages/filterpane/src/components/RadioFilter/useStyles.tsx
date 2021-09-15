import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { CSSProperties } from 'react';

export type RadioFilterStyles = {
  filterContainer?: CSSProperties;
  filterHeader?: CSSProperties;
  filterOptionsContainer?: CSSProperties;
  filterOption?: CSSProperties;
  filterOptionLabel?: CSSProperties;
};

const useStyles = makeStyles(
  () =>
    createStyles({
      RadioFilterContainer:{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        paddingBottom: '0px',
        boxSizing: 'border-box',
        minWidth: '150px',
        maxWidth: '240px',
        
      },
      FilterHeader: {
        padding: '0 8px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
       
      },
      FilterOptionsContainer: {
        flexDirection: 'column',
        overflowY: 'auto',
        margin: 0,
        paddingRight: '8px',
        
      },
      FilterOption: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
      
      },
      FilterOptionLabel: {
        flex: 1,
        overflow: 'hidden',
        height: '100%',
        cursor: 'pointer',
        alignItems: 'center',
        textOverflow: 'ellipsis',
        
      },
    }),
  { name: 'fusion-filterpane-radioFilter' }
);

export default useStyles;
