import { Children, type ReactElement } from 'react';
import type { FilterComponent } from '../filter';
import { FilterPanelProvider, FilterPanelConsumer } from './FilterPanelProvider';
import { FilterPanelFilters } from './FilterPanelFilters';
import { FilterPanelBar } from './FilterPanelBar';
import { SelectionChips } from '../misc';
import FilterPanelSelector from './FilterPanelSelector';
import { clsx, createStyles, makeStyles } from '@equinor/fusion-react-styles';
import type { FilterFn } from '../../types';

const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        '--filter-panel-spacing': theme.spacing.comfortable.medium.getVariable('padding'),
        display: 'flex',
        flexFlow: 'column',
        gap: 'var(--filter-panel-spacing)',
        padding: 'var(--filter-panel-spacing)',
        border: `1px solid ${theme.colors.interactive.disabled__border.getVariable('color')}`,
        borderRadius: `0.5rem`,
        '&>*': {
          padding: '0 var(--filter-panel-spacing)',
          margin: '0 calc(var(--filter-panel-spacing) * -1)',
        },
      },
      filters: {
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        paddingBottom: 'calc(var(--filter-panel-spacing))',
        marginBottom: 'calc(var(--filter-panel-spacing) * -1)',
        backgroundColor: theme.colors.ui.background__light.getVariable('color'),
      },
    }),
  { name: 'fusion-filter-panel' },
);

type StyleClasses = {
  /** filter panel */
  root: string;
  /** filter container */
  filters: string;
};

export type FilterPanelProps<TData> = JSX.IntrinsicElements['div'] & {
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
  props: React.PropsWithChildren<FilterPanelProps<TData>>,
) => JSX.Element = <TData,>(
  props: React.PropsWithChildren<FilterPanelProps<TData>>,
): JSX.Element => {
  const { showFilters, className, classes, children, showSelection, searchFn, ...args } = props;
  const filters = (Children.toArray(children) as ReactElement<FilterComponent>[]).filter(
    (x) => !!x.props.filterKey,
  );
  const initialSelectedFilters = props.selectedFilters || filters.map((x) => x.props.filterKey);
  const styles = useStyles();
  return (
    <FilterPanelProvider {...{ filters, initialSelectedFilters, showFilters }}>
      <div {...args} className={clsx(styles.root, classes?.root, className)}>
        {props.showBar && <FilterPanelBar searchFn={searchFn} />}
        <FilterPanelFilters
          FilterSelector={props.showSelector ? FilterPanelSelector : undefined}
          className={clsx(styles.filters, classes?.filters)}
        />
        <FilterPanelConsumer>
          {(context: any) =>
            showSelection &&
            !context?.showFilters && <SelectionChips chips={{ variant: 'outlined' }} />
          }
        </FilterPanelConsumer>
      </div>
    </FilterPanelProvider>
  );
};

export default FilterPanel;
