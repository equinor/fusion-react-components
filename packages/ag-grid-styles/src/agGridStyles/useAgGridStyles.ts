import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import styles from './styles.jss.json';

type agGridProps = {
  indicateEditMode?: boolean;
};

export const useStyles = makeStyles(
  (theme) =>
    createStyles({
      ...styles,
      root: (props?: agGridProps) => ({
        '--ag-row-hover-color': theme.colors.interactive.table__cell__fill_hover.getVariable('color'),
        '--ag-selected-row-background-color': theme.colors.interactive.table__cell__fill_activated.getVariable('color'),
        '--ag-background-color': theme.colors.interactive.table__cell__fill_resting.getVariable('color'),
        '--ag-header-background-color': theme.colors.interactive.table__header__fill_resting.getVariable('color'),
        '--ag-header-cell-hover-background-color':
          theme.colors.interactive.table__header__fill_hover.getVariable('color'),
        '--ag-header-cell-moving-background-color':
          theme.colors.interactive.table__header__fill_activated.getVariable('color'),
        '& :not(.inline-edit-mode)': {
          opacity: `${props?.indicateEditMode ? '0.8' : '1'}`,
        },
      }),
    }),
  { name: 'fusion-ag-grid-styles' },
) as () => ClassNameMap;

export default useStyles;
