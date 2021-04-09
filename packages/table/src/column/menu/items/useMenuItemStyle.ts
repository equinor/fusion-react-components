import { makeStyles, createStyles } from '@equinor/fusion-react-styles';

export const useMenuItemStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        ...theme.spacing.comfortable.small.style,
        display: 'flex',
        justifyContent: 'space-between',
      },
    }),
  { name: 'fusion-table-menu-item' }
);

export default useMenuItemStyle;
