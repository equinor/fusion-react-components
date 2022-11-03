import Button from '@equinor/fusion-react-button';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { FilterFn } from '../../types';
import { SearchFilter } from '../filter';
import { ClearFilterButton } from '../misc';
import { useFilterPanelContext } from './FilterPanelProvider';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: theme.spacing.comfortable.medium.getVariable('padding'),
      },
      searchInput: {
        '--textinput-dense-size': '36px',
      },
      actions: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.comfortable.medium.getVariable('padding'),
      },
      resetBtn: {
        '&[disabled]': {
          display: 'none',
        },
      },
    }),
  { name: 'fusion-filter-panel-bar' }
);

type FilterPanelBarProps<TData> = JSX.IntrinsicElements['div'] & {
  searchFn?: FilterFn<TData, string>;
};

export const FilterPanelBar = <TData,>(props: FilterPanelBarProps<TData>): JSX.Element => {
  const { className, searchFn, ...args } = props;
  const { showFilters, setShowFilters } = useFilterPanelContext();
  const styles = useStyles();
  return (
    <div {...args} className={clsx(className, styles.root)}>
      <SearchFilter filterKey="global" label="Search all" className={styles.searchInput} dense filterFn={searchFn} />
      <div className={styles.actions}>
        <ClearFilterButton className={styles.resetBtn} label="Reset Filters" icon="refresh" variant="ghost" />
        <Button
          icon={showFilters ? 'chevron_up' : 'chevron_down'}
          label={showFilters ? 'Hide filters' : 'Show filters'}
          onClick={() => setShowFilters(!showFilters)}
          variant="outlined"
          trailingIcon
        />
      </div>
    </div>
  );
};

export default FilterPanelBar;
