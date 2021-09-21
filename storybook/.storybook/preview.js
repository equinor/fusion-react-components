import { ThemeProvider } from '@equinor/fusion-react-styles';

import './theme.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
  chromatic: { 
    disableSnapshot: true 
  },
  argTypes:{
    css: {control: {disable: true}}
  }
};

export const decorators = [
  (Story) => (
    <ThemeProvider seed="storybook">
      <Story />
    </ThemeProvider>
  ),
];
