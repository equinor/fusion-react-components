import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';


const theme = create({
  base: 'light',
  brandTitle: 'Fusion React Components',
  brandUrl: 'https://github.com/equinor/fusion-react-components',
  colorPrimary: '#FF1243',
  colorSecondary: '#007079',
  fontBase: 'Equinor, sans-serif',
});

addons.setConfig({theme});