import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        fill: 'currentColor',
        height: '1em',
        width: 'auto',
        color: theme.colors.text.static_icons__default.getVariable('color'),
      },
      active: {
        color: theme.colors.interactive.primary__hover.getVariable('color'),
      },
    }),
  { name: 'fusion-table-icon' },
);

export default useStyle;
