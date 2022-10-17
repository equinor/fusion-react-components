import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import { agGridStyles } from './styles.css';
/* typescript reference for makeStyles */
import '@material-ui/styles';

type agGridProps = {
  indicateEditMode?: boolean;
};

export const useStyles = makeStyles(
  // pass theme as param if needed
  () =>
    createStyles({
      ...agGridStyles,
      root: (props?: agGridProps) =>
        props?.indicateEditMode
          ? {
              '& :not(.inline-edit-mode)': {
                opacity: 0.8,
              },
            }
          : {},
    }),
  { name: 'fusion-ag-grid-styles' }
);
