import { HeaderProps } from 'react-table';

import { TableData } from '../../types';

import { useContext } from 'react';

import MenuPane from './ColumnMenuPane';
import { context } from './ColumnMenuProvider';
import { makeStyles, createStyles, clsx } from '@equinor/fusion-react-styles';

// webcomponents
import '@equinor/fusion-wc-popover';

const useStyle = makeStyles(
  (theme) =>
    createStyles({
      item: {
        ...theme.colors.text.static_icons__default.style,
        display: 'block',
      },
      button: {
        display: 'inline-flex',
        ...theme.elevation.none.style,
      },
      interactive: {
        cursor: 'pointer',
        background: theme.colors.ui.background__default.value.rgba,
        transition: 'background 250ms ease-in', //TODO: add theme transitions
        '&:hover': {
          background: theme.colors.interactive.primary__selected_hover.value.rgba,
        },
      },
    }),
  { name: 'fusion-table-menu-content' }
);

export const ColumnMenuContent = (): JSX.Element => {
  const { show, close, open, header } = useContext(context);
  const styles = useStyle();
  return (
    <fwc-popover {...(open && { show: true })} placement="bottom-end">
      <span className={clsx(styles.button, styles.interactive)} onClick={() => (open ? close() : show())}>
        {header?.column.render('MenuIcon')}
      </span>
      <MenuPane slot="popover">
        {header?.column.menuItems?.map((Component, i) => (
          <div className={clsx(styles.item, styles.interactive)} key={i}>
            <Component {...(header as HeaderProps<TableData>)} />
          </div>
        ))}
      </MenuPane>
    </fwc-popover>
  );
};

export default ColumnMenuContent;
