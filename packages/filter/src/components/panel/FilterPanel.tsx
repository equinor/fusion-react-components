import { Children, ReactElement } from 'react';
import { FilterComponent } from '../filter';
import { FilterPanelProvider } from './FilterPanelProvider';
import { FilterPanelSelector } from './FilterPanelSelector';
import { FilterPanelFilters } from './FilterPanelFilters';
import { FilterPanelBar } from './FilterPanelBar';

export type FilterPanelProps = {
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
  const { showFilters, children } = props;
  const filters = (Children.toArray(children) as ReactElement<FilterComponent>[]).filter((x) => !!x.props.filterKey);
  const initialSelectedFilters = props.selectedFilters || filters.map((x) => x.props.filterKey);
  return (
    <FilterPanelProvider {...{ filters, initialSelectedFilters, showFilters }}>
      {props.showBar && <FilterPanelBar />}
      {props.showSelector && <FilterPanelSelector />}
      <FilterPanelFilters />
    </FilterPanelProvider>
  );
};

export default FilterPanel;
