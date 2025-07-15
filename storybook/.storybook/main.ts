import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import remarkGfm from 'remark-gfm';

const repoRoot = path.resolve(__dirname, '../..');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|tsx|ts)'],
  framework: '@storybook/react-vite',
  async viteFinal(config, _options) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: '#packages',
            replacement: path.resolve(repoRoot, 'packages'),
          },
        ],
      },
      optimizeDeps: {
        exclude: ['@equinor/fusion-react-*'],
      },
      plugins: [
        tsconfigPaths({
          root: '../../tsconfig.json',
          ignoreConfigErrors: true,
          parseNative: false,
          loose: true,
        }),
      ],
    });
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },

  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  docs: {},
};

export default config;
