import { useCallback } from 'react';
import { HeaderProps } from 'react-table';

import { clsx } from '@equinor/fusion-react-styles';
import { useScrimClick } from '../../utils';

import { TableData } from '../../types';

import { useStyle } from './ColumnMenu.style';

import '@equinor/fusion-wc-popover';

export const ColumnMenu = <D extends TableData>(props: HeaderProps<D>): JSX.Element => {
  const { column } = props;
  const { showMenu, menuItems } = column;

  const closeMenu = useCallback(() => {
    column.toggleMenu(column.id, false);
  }, [column]);

  const toggleMenu = useCallback(() => {
    column.toggleMenu(column.id, true);
  }, [column]);

  const menuRef = useScrimClick<HTMLDivElement>(closeMenu, !showMenu);

  const styles = useStyle();

  const renderMenuItems = useCallback(
    (props: any) =>
      menuItems?.map((Component, i) => (
        <div key={i} className={clsx(styles.item, styles.interactive)}>
          <Component {...props}></Component>
        </div>
      )),
    [menuItems, styles]
  );

  return (
    <fwc-popover {...(showMenu && { show: true })} placement="bottom-end">
      <span className={clsx(styles.button, styles.interactive)} onClick={toggleMenu}>
        {column.render('MenuIcon')}
      </span>
      <div slot="popover" ref={menuRef} className={styles.content}>
        {showMenu && renderMenuItems(props)}
      </div>
    </fwc-popover>
  );
};

export default ColumnMenu;
