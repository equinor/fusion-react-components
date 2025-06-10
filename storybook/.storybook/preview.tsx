import React from 'react';

import { type Preview } from '@storybook/react-vite';

import {Theme} from '../src/components/Theme'

import './theme.css';

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
      source: {
        language: 'tsx'
      },

      codePanel: true
    },
  },
 
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
