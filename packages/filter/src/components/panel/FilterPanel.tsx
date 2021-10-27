import { Children, ReactElement } from 'react';
import { FilterComponent } from '../filter';
import { FilterPanelProvider, FilterPanelConsumer } from './FilterPanelProvider';
import { FilterPanelFilters } from './FilterPanelFilters';
import { FilterPanelBar } from './FilterPanelBar';
import { SelectionChips } from '../misc';
import FilterPanelSelector from './FilterPanelSelector';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexFlow: 'column',
        gap: theme.spacing.comfortable.medium.getVariable('padding'),
      },
    }),
  { name: 'fusion-filter-panel' }
);

export type FilterPanelProps = JSX.IntrinsicElements['div'] & {
  /** Show filter bar */
  showBar?: boolean;

  /** Show selector for filters */
  showSelector?: boolean;

  /** display filters initial */
  showFilters?: boolean;

  /**
   * Initial selected filters
   * @default all - `filterKey` of all child components provided
   */
  selectedFilters?: string[];
};

/**
 * Base component for displaying filter components and controllers
 */
export const FilterPanel = (props: React.PropsWithChildren<FilterPanelProps>): JSX.Element => {
  const { showFilters, className, children, ...args } = props;
  const filters = (Children.toArray(children) as ReactElement<FilterComponent>[]).filter((x) => !!x.props.filterKey);
  const initialSelectedFilters = props.selectedFilters || filters.map((x) => x.props.filterKey);
  const styles = useStyles();
  return (
    <FilterPanelProvider {...{ filters, initialSelectedFilters, showFilters }}>
      <div {...args} className={clsx(className, styles.root)}>
        {props.showBar && <FilterPanelBar />}
        <FilterPanelFilters FilterSelector={props.showSelector ? FilterPanelSelector : undefined} />
        <FilterPanelConsumer>
          {(context) => !context?.showFilters && <SelectionChips chips={{ variant: 'outlined' }} />}
        </FilterPanelConsumer>
      </div>
    </FilterPanelProvider>
  );
};

export default FilterPanel;
