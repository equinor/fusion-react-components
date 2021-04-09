import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        fill: 'currentColor',
        height: '1em',
        width: 'auto',
        ...theme.colors.text.static_icons__default,
      },
      active: {
        ...theme.colors.interactive.primary__hover.style,
      },
    }),
  { name: 'fusion-table-icon' }
);

export default useStyle;
