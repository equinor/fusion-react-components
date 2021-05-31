import '@equinor/fusion-wc-popover';

import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useStyle = makeStyles(
  (theme) =>
    createStyles({
      content: {
        ...theme.elevation.overlay.style,
        background: theme.colors.ui.background__default.value.rgba,
        minWidth: '100px',
        display: 'inline-flex',
        flexFlow: 'column',
      },
      item: {
        ...theme.colors.text.static_icons__default.style,
        ...theme.spacing.comfortable.small.style,
        display: 'block',
      },
      button: {
        display: 'inline-flex',
        ...theme.elevation.none.style,
      },
      interactive: {
        cursor: 'pointer',
        background: theme.colors.ui.background__default.value.rgba,
        transition: 'background 250ms ease-in', //TODO: add theme transitions
        '&:hover': {
          background: theme.colors.interactive.primary__selected_hover.value.rgba,
        },
      },
    }),
  { name: 'fusion-table-menu' }
);

export default useStyle;
