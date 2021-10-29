import { MemoExoticComponent, useCallback, useMemo } from 'react';
import { VirtualItem } from 'react-virtual/types';
import { Col, CustomComponentProps, HeaderArgs } from '../models/VirtualGarden';
import { useExpandDispatch } from '../hooks/useExpand';
import { ActionType } from '../providers/ExpandProvider';
import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import clsx from 'clsx';

const isHighlight = (highlightIndex: number, columnIndex: number): boolean => highlightIndex === columnIndex;
const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'sticky',
      zIndex: 1,
      top: 0,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '35px',
      willChange: 'transform',
      textAlign: 'left',
      cursor: 'pointer',
      borderRadius: '5px',
      background: '#f7f7f7',
      border: '1px solid white',
    },
    highlightedHeader: {
      background: '#007079',
      color: '#ffffff',
    },
  })
);
type HeaderContainerProps<
  TPackages extends object,
  TColumn extends Col<TPackages>,
  TFilter extends object
> = JSX.IntrinsicElements['div'] & {
  columnVirtualizer: { virtualItems: VirtualItem[] };
  columns: TColumn[];
  filterTerms: TFilter[];
  headerChild: MemoExoticComponent<(args: HeaderArgs<TPackages, TColumn, TFilter>) => JSX.Element>;
  hightlightColumn: string | null;
  customHeaderProps?: CustomComponentProps;
};
/**
 * Container for the header components of the garden.
 * It will be sticky and zIndex: 1 so when you scroll it wont move and will be placed above packages..
 * Map through the column object and return the header component passed from the app.
 */
export const HeaderContainer = <TPackage extends object, TColumn extends Col<TPackage>, TFilter extends object>(
  props: HeaderContainerProps<TPackage, TColumn, TFilter>
) => {
  const columnExpand = useExpandDispatch();
  const styles = useStyles();

  const { columnVirtualizer, columns, filterTerms, headerChild, hightlightColumn, customHeaderProps, ...rest } = props;
  const HeaderChild = headerChild;

  const highlightedColumnKeyIndex = useMemo(
    () => columns.findIndex((column) => column.key === hightlightColumn),
    [columns, hightlightColumn]
  );

  const handleClick = useCallback(
    (index, key) => {
      columnExpand({
        index,
        key,
        descriptionData: columns[index].data,
        type: ActionType.EXPAND,
      });
    },
    [columnExpand, columns]
  );
  return (
    <div className={styles.container} {...rest}>
      {columnVirtualizer.virtualItems.map((virtualColumn) => {
        return (
          <div
            key={virtualColumn.index}
            className={
              isHighlight(highlightedColumnKeyIndex, virtualColumn.index)
                ? clsx(styles.header, styles.highlightedHeader)
                : styles.header
            }
            style={{
              width: `${virtualColumn.size}px`,
              transform: `translateX(${virtualColumn.start}px) translateY(0px)`,
            }}
            onClick={() => handleClick(virtualColumn.index, columns[virtualColumn.index].key)}
          >
            <HeaderChild
              columns={columns}
              filterTerms={filterTerms}
              headerKey={columns[virtualColumn.index]?.key}
              {...customHeaderProps}
            />
          </div>
        );
      })}
    </div>
  );
};
