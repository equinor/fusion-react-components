import { ThemeProvider } from '@equinor/fusion-react-styles';

ThemeProvider;

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
  options: {
    storySort: {
      includeName: true,
      order: ['*', 'Snapshots'], 
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider seed="storybook">
      <Story />
    </ThemeProvider>
  ),
];

const _customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
  if (!customElements.get(name)) {
    _customElementsDefine.call(window.customElements, name, cl, conf);
  }
  else {
    console.debug(`${name} has been defined twice`);
  }
};
