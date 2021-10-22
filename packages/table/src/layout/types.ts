import { CSSProperties, FunctionComponent } from 'react';
import { PluginHook, Row } from 'react-table';
import { TableData } from '../plugins';
import { SpacingType } from '../types';

export type BasicLayoutProps = {
  spacing?: SpacingType;
  style?: CSSProperties;
  className?: string;
};
export interface LayoutProps extends BasicLayoutProps {
  setTableRowProps?: (props: Row<TableData>) => BasicLayoutProps;
}

export type LayoutTemplate<TProps extends LayoutProps = LayoutProps> = FunctionComponent<TProps>;

export type Layout<TData extends TableData = TableData, TProps extends LayoutProps = LayoutProps> = {
  Template: LayoutTemplate<TProps>;
  plugins?: Array<PluginHook<TData>>;
};

export { SpacingType } from './layout.style';
