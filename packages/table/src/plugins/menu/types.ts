import { FunctionComponent } from 'react';

import { HeaderProps, Renderer } from 'react-table';
import { TableData } from '../../types';

export type ColumnMenuOptions<TData extends TableData> = {
  readonly disableMenu?: boolean;
  readonly menuItems?: FunctionComponent<HeaderProps<TData>>[];
  MenuIcon?: Renderer<HeaderProps<TData>>;
  Menu?: Renderer<HeaderProps<TData>>;
};

export interface ColumnMenuProps<TData extends TableData> extends ColumnMenuOptions<TData> {
  toggleMenu: (id: string, show?: boolean) => void;
  closeMenu: VoidFunction;
  openMenu: VoidFunction;
  readonly showMenu?: boolean;
}

export type MenuState = {
  columnId?: string;
  show?: boolean;
};

export type { TableData };
