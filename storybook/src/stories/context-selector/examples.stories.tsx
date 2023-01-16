import { Meta, Story } from '@storybook/react';
import { ContextSelector, ContextSelectorHeader, ContextHeaderProps } from '@equinor/fusion-react-context-selector/src';
import { _exampleResolver, _handleSelect } from './component.helpers';

export default {
  title: 'Examples/ContextSelector',
  component: ContextSelector,
} as Meta;

export const ContextHeader: Story<ContextHeaderProps> = ({
  children,
  ...props
}: React.PropsWithChildren<ContextHeaderProps>) => {
  return <ContextSelectorHeader {...props}>{children}</ContextSelectorHeader>;
};
ContextHeader.args = {
  placeholder: 'Start to type to search...',
  initialText: 'The initial text result',
  id: 'sdd-header-test',
  variant: 'header',
  dropdownHeight: '300px',
  onSelect: _handleSelect,
  resolver: _exampleResolver,
  onClearContext: () => console.log('Context Clearing'),
};
