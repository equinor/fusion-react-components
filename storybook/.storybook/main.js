const path = require('path');

const excludedProps = [
  // lit-element
  'renderOptions',
  // ReactiveElement
  'renderRoot',
  'connectedCallback',
  'disconnectedCallback',
  'isUpdatePending',
  'hasUpdated',
  'attributeChangedCallback',
  'willUpdate',
  'updateComplete',
  'addController',
  'removeController',
  'requestUpdate',
  // ripple
  'ripple',
  'isRippleActive',
]

const propFilter = (prop) => !(
  prop.parent && /node_modules/.test(prop.parent.fileName) ||
  /^aria/.test(prop.name) ||
  excludedProps.includes(prop.name)
);

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ['../src/stories/**/*.stories.{mdx,tsx}'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(__dirname, '../tsconfig.js'),
      shouldExtractLiteralValuesFromEnum: true,
      propFilter
    },
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      }
    },
    '@storybook/addon-storysource'
  ],
  
};
