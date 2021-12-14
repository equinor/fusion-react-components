import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import style from './react-tooltip.css';

export const useStyles = makeStyles(
  () =>
    createStyles({
      ...style,
    }),
  { name: 'fusion-tooltip' }
);
