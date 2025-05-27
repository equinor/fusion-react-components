import { Button, Icon } from '@equinor/eds-core-react';
import { chevron_up, chevron_down, refresh } from '@equinor/eds-icons';

import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import type { FilterFn } from '../../types';
import { SearchFilter } from '../filter';
import { ClearFilterButton } from '../misc';
import { useFilterPanelContext } from './FilterPanelProvider';

Icon.add({ chevron_down, chevron_up, refresh });

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
  { name: 'fusion-filter-panel-bar' },
);

type FilterPanelBarProps<TData> = JSX.IntrinsicElements['div'] & {
  readonly searchFn?: FilterFn<TData, string>;
};

export const FilterPanelBar = <TData,>(props: FilterPanelBarProps<TData>): JSX.Element => {
  const { className, searchFn, ...args } = props;
  const { showFilters, setShowFilters } = useFilterPanelContext();
  const styles = useStyles();

  return (
    <div {...args} className={clsx(className, styles.root)}>
      <SearchFilter filterKey="global" label="Search all" className={styles.searchInput} filterFn={searchFn} />
      <div className={styles.actions}>
        <ClearFilterButton className={styles.resetBtn} variant="ghost">
          Reset Filters
          <Icon name="refresh" />
        </ClearFilterButton>
        <Button
          icon={showFilters ? 'chevron_up' : 'chevron_down'}
          onClick={() => setShowFilters(!showFilters)}
          variant="outlined"
          trailingIcon
        >
          {showFilters ? 'Hide filters' : 'Show filters'}
          <Icon name={showFilters ? 'chevron_up' : 'chevron_down'} />
        </Button>
      </div>
    </div>
  );
};

export default FilterPanelBar;
