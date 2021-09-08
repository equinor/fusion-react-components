import { ThemeProvider } from '@equinor/fusion-react-styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider seed="storybook">
      <Story />
    </ThemeProvider>
  ),
];
