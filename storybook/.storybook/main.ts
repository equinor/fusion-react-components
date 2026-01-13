// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'path';
import remarkGfm from 'remark-gfm';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const repoRoot = resolve(__dirname, '../..');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|tsx|ts)'],
  framework: '@storybook/react-vite',
  async viteFinal(config, _options) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: '#packages',
            replacement: resolve(repoRoot, 'packages'),
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
