import { CSSProperties, FunctionComponent } from 'react';
import { PluginHook, Row, TableRowProps } from 'react-table';
import { TableData } from '../plugins';
import { SpacingType } from '../types';

export interface LayoutProps {
  spacing?: SpacingType;
  style?: CSSProperties;
  className?: string;
  getTrProps?: (props: Row<TableData>) => TableRowProps;
}

export type LayoutTemplate<TProps extends LayoutProps = LayoutProps> = FunctionComponent<TProps>;

export type Layout<TData extends TableData = TableData, TProps extends LayoutProps = LayoutProps> = {
  Template: LayoutTemplate<TProps>;
  plugins?: Array<PluginHook<TData>>;
};

export { SpacingType } from './layout.style';
