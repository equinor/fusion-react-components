import { makeStyles, createStyles } from '@equinor/fusion-react-styles';
import { PropsWithChildren } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      overflow: 'auto',
    },
    container: {
      position: 'relative',
    },
  })
);
export type LayoutProps = {
  columnTotalSize: number;
  rowTotalSize: number;
  isScrolling: boolean;
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
};
/**
 * Main container of the virtualized garden.
 * Sets the component to fit the whole screen and enables scrolling when overflowing.
 * The inner div will be positioned relative and have the widths and heights from
 * useVirtual hooks.
 * pointerEvents is just for optimization, turned off when user is scrolling.
 */
export const Layout = (props: PropsWithChildren<LayoutProps>) => {
  const { columnTotalSize, rowTotalSize, isScrolling, parentRef, children } = props;

  const styles = useStyles();
  return (
    <div ref={parentRef} className={styles.root}>
      <div
        className={styles.container}
        style={{
          width: `${columnTotalSize}px`,
          height: `${rowTotalSize}px`,
          pointerEvents: isScrolling ? 'none' : 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Layout;
