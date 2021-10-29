import { createStyles, makeStyles } from '@equinor/fusion-react-styles';
import { VirtualItem, useVirtual } from 'react-virtual/types';
import { Col, GardenPackage } from '../models/VirtualGarden';
const useStyles = makeStyles(() =>
  createStyles({
    item: {
      position: 'absolute',
      willChange: 'transform',
      top: 0,
      left: 0,
    },
  })
);
type VirtualHookReturn = Pick<ReturnType<typeof useVirtual>, 'virtualItems' | 'scrollToIndex'>;
type ItemProps<TPackage extends object, T extends Col<TPackage>> = {
  /** Virtual row from iterating thorugh rowVirtualizer */
  virtualRow: VirtualItem;
  /** ColumnVirtualizer from useVirtual hook */
  columnVirtualizer: VirtualHookReturn;
  /** Columns object */
  columns: T[];
  /** Properties for the Package component */
  packageProps: GardenPackage<TPackage> & {
    itemWidth: number;
    onPackageClick: (selectedPkg: TPackage) => void;
    selectedPkg: TPackage | null;
  };
};

/**
 * Wrapper around the Package component passed from the app.
 * Component will iterate through the column object from useVirtual hook and return
 * the package component if there are any items in the columns object
 */
export const PackageContainer = <D extends object, T extends Col<D>>(props: ItemProps<D, T>): JSX.Element | null => {
  const { columns, virtualRow, columnVirtualizer, packageProps } = props;
  const { component: Package, itemWidth, onPackageClick, selectedPkg, customPackageProps } = packageProps;
  const styles = useStyles();

  const handlePackageClick = (selectedPkg: D, columnIndex: number) => {
    onPackageClick(selectedPkg);
    //TODO: If align center, then goes out of the view. Does not depend on sidesheet width.

    columnVirtualizer.scrollToIndex(columnIndex, { align: 'center' });
  };
  return (
    <>
      {columnVirtualizer.virtualItems.map((virtualColumn) => {
        const item = columns[virtualColumn.index]?.data[virtualRow.index];
        if (!item) return null;

        return (
          <div
            key={virtualColumn.index}
            className={styles.item}
            style={{
              transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
              width: `${virtualColumn.size}px`,
              height: `${virtualRow.size}px`,
            }}
            ref={(el) => {
              virtualRow.measureRef(el);
              virtualColumn.measureRef(el);
            }}
          >
            <Package
              item={item}
              width={itemWidth}
              onPackageClick={(e: D) => handlePackageClick(e, virtualColumn.index)}
              selectedPkg={selectedPkg}
              columnKey={columns[virtualColumn.index].key}
              {...customPackageProps}
            />
          </div>
        );
      })}
    </>
  );
};
export default PackageContainer;
