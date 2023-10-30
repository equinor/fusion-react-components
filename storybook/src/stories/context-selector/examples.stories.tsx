import { Meta, Story } from '@storybook/react';
import {
  ContextProvider,
  ContextSelector,
  ContextSearch,
  ContextSearchProps,
} from '@equinor/fusion-react-context-selector/src';
import { _exampleResolver, _handleSelect } from './component.helpers';

export default {
  title: 'Examples/ContextSelector',
  component: ContextSelector,
} as Meta;

export const ContextHeader: Story<ContextSearchProps> = ({
  children,
  ...props
}: React.PropsWithChildren<ContextSearchProps>) => {
  return (
    <div
      style={{
        width: '98%',
        maxWidth: '480px',
        height: '350px',
        margin: '0 auto',
      }}
    >
      <ContextProvider resolver={_exampleResolver}>
        <ContextSearch {...props}>{children}</ContextSearch>
      </ContextProvider>
    </div>
  );
};
ContextHeader.args = {
  placeholder: 'Start to type to search...',
  initialText: 'The initial text result',
  id: 'sdd-header-test',
  variant: 'header',
  dropdownHeight: '300px',
  onSelect: _handleSelect,
  onClearContext: () => {
    console.log('Context Clearing');
  },
};
