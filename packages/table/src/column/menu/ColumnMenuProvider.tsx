import { Context, createContext, PropsWithChildren, useCallback, useState } from 'react';
import { HeaderProps } from 'react-table';
import { TableData } from '../../types';

export type ColumnMenuContext<D extends TableData = TableData> = {
  header?: HeaderProps<D>;
  open?: boolean;
  show: VoidFunction;
  close: VoidFunction;
};

export const context = createContext<ColumnMenuContext | undefined>(undefined) as Context<ColumnMenuContext>;

context.displayName = 'TableColumnMenuContext';

type ColumnMenuProviderProps<D extends TableData> = {
  header: HeaderProps<D>;
};

export const ColumnMenuProvider = <D extends TableData>(
  props: PropsWithChildren<ColumnMenuProviderProps<D>>
): JSX.Element => {
  const { header, children } = props;

  const [open, setOpen] = useState<boolean>(false);
  const show = useCallback(() => setOpen(true), [setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  const value = {
    header,
    open,
    show,
    close,
  };
  return <context.Provider value={value as ColumnMenuContext}>{children}</context.Provider>;
};

export default ColumnMenuProvider;
