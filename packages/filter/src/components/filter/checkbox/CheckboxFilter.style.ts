import { createStyles, makeStyles } from '@equinor/fusion-react-styles';

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexFlow: 'column',
        // TODO - remove
        minWidth: 150,
      },
      items: (props: { layout: 'column' | 'row' }) => ({
        display: 'flex',
        flexFlow: props.layout,
        overflowY: 'auto',
      }),

      title: {
        ...theme.typography.heading.h3.style,
      },
    }),
  { name: 'fusion-filter-checkbox-option' },
);

export default useStyles;
