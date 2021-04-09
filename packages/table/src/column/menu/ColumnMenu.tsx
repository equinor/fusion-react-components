import { HeaderProps } from 'react-table';

import '@equinor/fusion-wc-icon';
import '@equinor/fusion-wc-popover';

import { TableData } from '../../types';

import MenuProvider from './ColumnMenuProvider';
import ColumnMenuContent from './ColumnMenuContent';

export type ColumnMenuProps<D extends TableData> = HeaderProps<D>;

export const ColumnMenu = <D extends TableData>(props: ColumnMenuProps<D>): JSX.Element => {
  return (
    <MenuProvider header={props}>
      <ColumnMenuContent></ColumnMenuContent>
    </MenuProvider>
  );
};

export default ColumnMenu;
