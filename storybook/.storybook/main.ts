import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import vite from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const repoRoot = path.resolve(__dirname, '../..');

const config: StorybookConfig = {
  stories: [
    '../src/stories_v7/**/*.stories.tsx', 
    '../src/stories_v7/**/*.mdx',
  ],

  framework: '@storybook/react-vite',
  core: {
    builder: '@storybook/builder-vite', 
  },
  async viteFinal(config, _options){
    
    return vite.mergeConfig(config, {
      resolve: {
        alias: [
          {
            find: '#packages',
            replacement: path.resolve(repoRoot, 'packages'),
          },
        ]
      },
      optimizeDeps: {
        exclude: ['@equinor/fusion-react-*']
      },
      plugins: [
        tsconfigPaths({
          root: '../../tsconfig.json',
          ignoreConfigErrors: true,
          parseNative: false,
          loose: true,
        }),
      ],
    })
  },
  

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: (test) => {
        if(!test.parent?.fileName.includes('@types')){
          return true;
        }
        return false;
      }
    },
  },

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-storysource', 
  ],

  docs: {
    autodocs: "tag",
  }
};

export default config;
