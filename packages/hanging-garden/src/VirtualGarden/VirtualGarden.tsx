import { Fragment, useCallback, useRef, useLayoutEffect } from 'react';
import { useVirtual } from 'react-virtual';
import { useVirtualScrolling } from '../hooks/useVirtualScrolling';
import { Layout } from './Layout';
import { Col, GardenProps } from '../models/VirtualGarden';
import { HeaderContainer } from './HeaderContainer';
import { useExpand } from '../hooks/useExpand';
import { PackageContainer } from './PackageContainer';
/**
 * Internal Garden component that will handle the virtualization of rows and columns.
 * The component will receive the same props as the main garden component.
 * It will handle scrolling and rendering the components passed as props from the app.
 */
export const VirtualGarden = <TPackage extends object, TFilter extends object, TColumn extends Col<TPackage>>(
  props: GardenProps<TPackage, TFilter, TColumn>
) => {
  /** Ref that is used for useVirtual hook */
  const parentRef = useRef<HTMLDivElement | null>(null);

  /**Virtual scrolling to try to optimize performance */
  const { isScrolling, scrollOffsetFn } = useVirtualScrolling(parentRef);
  const { widths: contextWidths } = useExpand();

  const { gardenData, handlers, filterTerms, gardenHeader, gardenPackage } = props;
  const { columnCount, columns, itemWidth, rowCount, selectedPkg } = gardenData;
  const { component: packageComponent, customPackageProps } = gardenPackage;
  const { component: headerChild, customHeaderStyling, customHeaderProps } = gardenHeader;

  /**
   * Virtualized row
   * estimateSize, the size of each row, has to be in useCallback
   */
  const rowVirtualizer = useVirtual({
    size: rowCount,
    parentRef,
    estimateSize: useCallback(() => 30, []),
    paddingStart: 40,
    overscan: 2,
  });

  /**
   * Virtualized column
   * Set the direction to be horizontal
   * EstimateSize is from an array that is created whenever columnCount or itemSize changes
   * keyExtractor is used here because columns might change size, and also need it when filtering data,
   * scrollOffsetFn from useVirtualScrolling
   * useObserver?
   */
  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: columnCount,
    parentRef,
    estimateSize: useCallback((index) => contextWidths[index], [contextWidths]),
    keyExtractor: useCallback((index) => index, [contextWidths]),
    scrollOffsetFn,
    useObserver: useCallback(() => ({ height: 0, width: window.innerWidth }), []),
    overscan: 2,
  });

  /** Scroll to the highlighted key column on render
   * Not sure if it should be done after all the DOM mutations are finished before paint or
   * just normal useEffect?
   */
  useLayoutEffect(() => {
    const scrollIndex = columns.findIndex((column) => column.key === gardenData.hightlightColumn);
    scrollIndex !== -1 && columnVirtualizer.scrollToIndex(scrollIndex, { align: 'center' });
  }, [columns, gardenData.hightlightColumn, columnVirtualizer.scrollToIndex]);

  return (
    <Layout
      rowTotalSize={rowVirtualizer.totalSize}
      columnTotalSize={columnVirtualizer.totalSize}
      parentRef={parentRef}
      isScrolling={isScrolling}
    >
      <HeaderContainer<TPackage, TColumn, TFilter>
        columnVirtualizer={columnVirtualizer}
        columns={columns}
        filterTerms={filterTerms}
        headerChild={headerChild}
        hightlightColumn={gardenData.hightlightColumn}
        customHeaderProps={customHeaderProps}
        {...customHeaderStyling}
      />

      {rowVirtualizer.virtualItems.map((virtualRow) => {
        return (
          <Fragment key={virtualRow.index}>
            <PackageContainer<TPackage, TColumn>
              columnVirtualizer={columnVirtualizer}
              columns={columns}
              virtualRow={virtualRow}
              packageProps={{
                component: packageComponent,
                itemWidth,
                onPackageClick: handlers.onPackageClick,
                selectedPkg,
                customPackageProps,
              }}
            />
          </Fragment>
        );
      })}
    </Layout>
  );
};
export default VirtualGarden;
