import { makeStyles, createStyles, clsx } from '@equinor/fusion-react-styles';
import { useContext, useEffect, useRef } from 'react';

import { context } from './ColumnMenuProvider';

const useStyle = makeStyles(
  (theme) =>
    createStyles({
      root: {
        ...theme.elevation.overlay.style,
        background: theme.colors.ui.background__default.value.rgba,
        minWidth: '100px',
        display: 'inline-flex',
        flexFlow: 'column',
      },
    }),
  { name: 'fusion-table-menu-pane' }
);

type ColumnMenuPaneProps = React.HTMLAttributes<HTMLDivElement>;

export const ColumnMenuPane = (props: ColumnMenuPaneProps): JSX.Element => {
  const { children, className, ...attr } = props;
  const { open, close } = useContext(context);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !menuRef.current) return;
    const onScrimClick = (e: Event) => {
      !e.composedPath().includes(menuRef.current as Node) && close();
    };

    document.addEventListener('click', onScrimClick);

    return () => document.removeEventListener('click', onScrimClick);
  }, [open, close]);

  const styles = useStyle();
  return (
    <div {...attr} ref={menuRef} className={clsx(className, styles.root)}>
      {open && children}
    </div>
  );
};

export default ColumnMenuPane;
