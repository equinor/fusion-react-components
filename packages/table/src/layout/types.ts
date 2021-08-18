import { FunctionComponent } from 'react';
import { PluginHook } from 'react-table';
import { TableData } from '../plugins';
import { SpacingType } from '../types';

export type LayoutProps = JSX.IntrinsicElements['table'] & {
  spacing?: SpacingType;
};

export type LayoutTemplate<TProps extends LayoutProps = LayoutProps> = FunctionComponent<TProps>;

export type Layout<TData extends TableData = TableData, TProps extends LayoutProps = LayoutProps> = {
  Template: LayoutTemplate<TProps>;
  plugins?: Array<PluginHook<TData>>;
};

export { SpacingType } from './layout.style';
