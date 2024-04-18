import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';


const theme = create({
  base: 'light',
  brandTitle: 'Fusion React Components',
  brandUrl: 'https://github.com/equinor/fusion-react-components',
  brandImage: 'https://avatars.githubusercontent.com/u/525862?s=48&v=4',
  colorPrimary: '#FF1243',
  colorSecondary: '#007079',
  fontBase: 'Equinor, sans-serif',
  fontCode: '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace'
});

addons.setConfig({theme});
