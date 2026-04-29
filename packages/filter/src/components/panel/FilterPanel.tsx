import { Children, type PropsWithChildren, type HTMLAttributes, type ReactElement } from 'react';
import type { FilterComponent } from '../filter';
import {
  FilterPanelProvider,
  FilterPanelConsumer,
  type FilterPanelProviderContext,
} from './FilterPanelProvider';
import { FilterPanelFilters } from './FilterPanelFilters';
import { FilterPanelBar } from './FilterPanelBar';
import { SelectionChips } from '../misc';
import FilterPanelSelector from './FilterPanelSelector';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import type { FilterFn } from '../../types';

const Styled = {
  Root: styled.div`
    --filter-panel-spacing: ${tokens.spacings.comfortable.medium};
    display: flex;
    flex-flow: column;
    gap: var(--filter-panel-spacing);
    padding: var(--filter-panel-spacing);
    border: 1px solid ${tokens.colors.interactive.disabled__border.rgba};
    border-radius: 0.5rem;
    & > * {
      padding: 0 var(--filter-panel-spacing);
      margin: 0 calc(var(--filter-panel-spacing) * -1);
    }
  `,
  Filters: styled.div`
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: calc(var(--filter-panel-spacing));
    margin-bottom: calc(var(--filter-panel-spacing) * -1);
    background-color: ${tokens.colors.ui.background__light.rgba};
  `,
};

type StyleClasses = {
  /** filter panel */
  root: string;
  /** filter container */
  filters: string;
};

export type FilterPanelProps<TData> = HTMLAttributes<HTMLDivElement> & {
  /** Show filter bar */
  showBar?: boolean;

  /** Show selector for filters */
  showSelector?: boolean;

  /** display filters initial */
  showFilters?: boolean;

  /** show selection when filters are collapsed */
  showSelection?: boolean;

  /**
   * Initial selected filters
   * @default all - `filterKey` of all child components provided
   */
  selectedFilters?: string[];

  /** style classes */
  classes?: Partial<StyleClasses>;

  /** method to use for search bar */
  searchFn?: FilterFn<TData, string>;
};

/**
 * Base component for displaying filter components and controllers
 */
export const FilterPanel: <TData>(
  props: PropsWithChildren<FilterPanelProps<TData>>,
) => ReactElement = <TData,>(props: PropsWithChildren<FilterPanelProps<TData>>): ReactElement => {
  const { showFilters, className, classes, children, showSelection, searchFn, ...args } = props;
  const filters = (Children.toArray(children) as ReactElement<FilterComponent>[]).filter(
    (x) => !!x.props.filterKey,
  );
  const initialSelectedFilters = props.selectedFilters || filters.map((x) => x.props.filterKey);
  return (
    <FilterPanelProvider {...{ filters, initialSelectedFilters, showFilters }}>
      <Styled.Root
        {...args}
        className={[classes?.root, className].filter(Boolean).join(' ') || undefined}
      >
        {props.showBar && <FilterPanelBar searchFn={searchFn} />}
        <Styled.Filters>
          <FilterPanelFilters
            FilterSelector={props.showSelector ? FilterPanelSelector : undefined}
            className={classes?.filters}
          />
        </Styled.Filters>
        <FilterPanelConsumer>
          {(context: FilterPanelProviderContext) =>
            showSelection &&
            !context?.showFilters && <SelectionChips chips={{ variant: 'outlined' }} />
          }
        </FilterPanelConsumer>
      </Styled.Root>
    </FilterPanelProvider>
  );
};

export default FilterPanel;
