import { createStyles, FusionTheme, makeStyles } from '@equinor/fusion-react-styles';
import { CSSProperties } from 'react';

export type CheckBoxFilterStyleProps = { checkBoxFilterContainer?: CSSProperties; filterHeader?: CSSProperties };

const useStyles = makeStyles<FusionTheme, CheckBoxFilterStyleProps>(() =>
  createStyles({
    CheckBoxFilterContainer: ({ checkBoxFilterContainer }) => ({
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      paddingBottom: '0px',
      boxSizing: 'border-box',
      minWidth: '150px',
      maxWidth: '240px',
      ...checkBoxFilterContainer,
    }),
    FilterHeader: {
      padding: '0 8px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
    },
    TextInputIcon: {
      transform: 'scale(0.8)',
      cursor: 'pointer',
    },
    FilterOptionsContainer: {
      flexDirection: 'column',
      overflowY: 'auto',
      margin: 0,
      padding: 0,
    },
  })
);

export default useStyles;
