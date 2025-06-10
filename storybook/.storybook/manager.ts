import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';


const theme = create({
  base: 'light',
  brandTitle: 'Fusion React Components',
  brandUrl: 'https://github.com/equinor/fusion-react-components',
  colorPrimary: '#FF1243',
  colorSecondary: '#007079',
  fontBase: 'Equinor, sans-serif',
  fontCode: '"Operator Mono","Fira Code Retina","Fira Code","FiraCode-Retina","Andale Mono","Lucida Console",Consolas,Monaco,monospace'
});

addons.setConfig({theme});
