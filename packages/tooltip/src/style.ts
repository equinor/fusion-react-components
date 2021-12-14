import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import style from './react-tooltip.css';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      ...style,
      container: {
        ...theme.typography.ui.tooltip.style,
        color: theme.colors.text.static_icons__primary_white.getVariable('color'),
        backgroundColor: theme.colors.text.static_icons__default.getVariable('color'),
        lineHeight: 'inherit',
        '& > .tippy-arrow': {
          color: theme.colors.text.static_icons__default.getVariable('color'),
        },
      },
    }),
  { name: 'fusion-tooltip' }
);
