import {
  Children,
  PropsWithChildren,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import FilterContext from '../../../../FilterContext';
import FilterSelector from '../FilterSelector';
import useResizablePanel from '../../../../hooks/useResizablePanel';
import { pipe } from 'rxjs';
import { clsx } from '@equinor/fusion-react-styles';
import useStyles from './useStyles';
import { unfold_more } from '@equinor/eds-icons';
import Icon from '../../../Icon';

type FilterSectionProps = {
  isMinimized?: boolean;
  useFilterSelector?: boolean;
  compactFilterSelector?: boolean;
};

const FilterSection = ({
  isMinimized,
  useFilterSelector,
  compactFilterSelector = false,
  children,
}: PropsWithChildren<FilterSectionProps>): JSX.Element => {
  const [selection, setSelection] = useState<(ReactChild | ReactFragment | ReactPortal)[]>([]);
  const { store } = useContext(FilterContext);

  useEffect(() => {
    if (!useFilterSelector) {
      setSelection(Children.toArray(children));
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
        setSelection(activeChildren);
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
  const filterContainerClassNames = useMemo(
    () =>
      clsx(
        styles.FilterSectionContainer,
        isMinimized ? styles.Minimized : undefined,
        isResizing ? styles.Resizing : undefined
      ),
    [isMinimized, styles, isResizing]
  );

  return (
    <div className={filterContainerClassNames}>
      <div ref={resizeContainerRef} className={styles.FilterSection} style={{ ...resizedSize }}>
        {/*!!useFilterSelector && <FilterSelector compact={compactFilterSelector}>{children}</FilterSelector>*/}
        {selection.length ? (
          selection
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
