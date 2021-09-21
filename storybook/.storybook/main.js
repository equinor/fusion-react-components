const path = require('path');

module.exports = {
  core: {
    builder: "webpack5",
  },
  // stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx', '../../packages/*/doc/*.stories.tsx'],
  // stories: ['../../packages/*/doc/*.stories.tsx'],
  stories: ['../stories/**/*.stories.{tsx,mdx}'],
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
