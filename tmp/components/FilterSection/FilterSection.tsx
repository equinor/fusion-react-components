import {
  Children,
  PropsWithChildren,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import FilterSelector from '../FilterSelector/FilterSelector';
import useResizablePanel from '../../hooks/useResizablePanel';
import { pipe } from 'rxjs';
import { clsx } from '@equinor/fusion-react-styles';
import useStyles from './FilterSection.style';
import { unfold_more } from '@equinor/eds-icons';
import Icon from '../Icon';
import { useFilterContext } from '../../provider';

type FilterSectionProps = {
  isMinimized?: boolean;
  useFilterSelector?: boolean;
  compactFilterSelector?: boolean;
  useFilterSelectorSearch?: boolean;
};

/**
 *FilterSection is a vertically adjustable, that list out registered filters horizontally.
 *When used with FilterSelector, the are will show all filters that are selected in the selector.
 *The filter selector will give the user the ability to select the filters that are currently relevant.
 *Giving greater clarity of what is being filtered at the moment.
 *It also helps with performance, as all filters does not need to be registered at all times.
 *Resulting in less work for the Filter provider when a selection is made.
 *
 * @param isMinimized Minimized will set the section to display :'none'
 * @param useFilterSelector Add a filter selector on the left side. Where user can (de)select filters for use.
 * @param compactFilterSelector Compact Filter options text and checkbox size
 * @param useFilterSelectorSearch Add a search bar to filter selector, to search for filters.
 * @param children Add Filters components as children, and they will be displayed in the filtersection.
 * @example
 * const [minimized, setMinimized] = useState(false);
 * <FilterSection isMinimized={minimized} useFilterSelector useFilterSelectorSearch>
 *     <CheckboxFilter filter={filterSettings}  />
 * </FilterSection>
 */

export const FilterSection = ({
  isMinimized,
  useFilterSelector,
  compactFilterSelector = false,
  useFilterSelectorSearch,
  children,
}: PropsWithChildren<FilterSectionProps>): JSX.Element => {
  const [selection, setSelections] = useState<(ReactChild | ReactFragment | ReactPortal)[]>([]);
  const { store } = useFilterContext();

  useLayoutEffect(() => {
    if (!useFilterSelector) {
      setSelections(Children.toArray(children));
      return;
    }

    const activeChildren = store.selection$.subscribe(
      pipe((currSelection) => {
        const selectionKeys = Object.keys(currSelection as Record<string, unknown>);
        const activeChildren = Children.toArray(children)
          .filter((child) => selectionKeys.includes((child as ReactElement).props.filter.key))
          .sort((a, b) => {
            const aPriority = ((a as ReactElement).props.filter?.priority as number) || 9999;
            const bPriority = ((b as ReactElement).props.filter?.priority as number) || 9999;

            return aPriority - bPriority;
          });
        setSelections(activeChildren);
      })
    );

    return () => activeChildren.unsubscribe();
  }, [store, useFilterSelector, children]);

  const resizeContainerRef = useRef<HTMLDivElement>(null);

  const { resizedSize, isResizing, onResizeStart } = useResizablePanel({
    isResizable: true,
    id: 'FilterPane',
    minHeight: 300,
    maxHeight: 1000,
    resizeContainerRef: resizeContainerRef,
  });

  const styles = useStyles();

  return (
    <div className={clsx(styles.root, isMinimized && styles.Minimized, isResizing && styles.Resizing)}>
      <div ref={resizeContainerRef} className={styles.container} style={{ ...resizedSize }}>
        {useFilterSelector && (
          <FilterSelector useSearch={useFilterSelectorSearch} compact={compactFilterSelector}>
            {children}
          </FilterSelector>
        )}
        {selection.length ? (
          <div className={styles.filters}>{selection}</div>
        ) : (
          <span className={styles.FilterSectionEmptyText}>
            ⬅ Select filter categories to start filtering the dataset
          </span>
        )}
      </div>
      <div className={styles.Resize} onMouseDown={onResizeStart}>
        <div className={styles.ResizeBar} />
        <div className={styles.ResizeIndicator}>
          <Icon icon={unfold_more} />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
