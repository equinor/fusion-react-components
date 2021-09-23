const path = require('path');

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
        propFilter: (prop) => (prop.parent ? !prop.parent.fileName.includes('@types/react') : true),
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
  ]
};
