import { type Preview } from '@storybook/react-vite';
import { useEffect } from 'storybook/preview-api';

import { Theme } from '../src/components/Theme';
import { applyColorScheme, type StorybookColorScheme } from './color-scheme';

const _customElementsDefine = window.customElements.define;
window.customElements.define = (name, cl, conf) => {
  if (!customElements.get(name)) {
    _customElementsDefine.call(window.customElements, name, cl, conf);
  }
  else {
    console.debug(`${name} has been defined twice`);
  }
};

const preview: Preview = {
  globalTypes: {
    colorScheme: {
      description: 'EDS colour scheme (resolved data-color-scheme on <html>)',
      toolbar: {
        title: 'Colour scheme',
        icon: 'contrast',
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorScheme: 'system',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ['Docs', 'documentation', '*'], 
      },
    },
    docs: {
      codePanel: true,
    },
  },
 
  decorators: [
    (Story, context) => {
      const colorScheme = (context.globals.colorScheme ?? 'system') as StorybookColorScheme;
      // Applied during render so the first paint uses the selected scheme; the effect keeps
      // `system` in sync with OS changes.
      applyColorScheme(document.documentElement, colorScheme)();
      useEffect(() => applyColorScheme(document.documentElement, colorScheme), [colorScheme]);
      return (
        <Theme>
          <Story />
        </Theme>
      );
    },
  ],
  tags: ['autodocs'],
};

export default preview;
