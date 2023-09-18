import {
  createGenerateClassName,
  StylesProvider as BaseStylesProvider,
  StylesProviderProps,
} from '@material-ui/styles';

import Element from '@equinor/fusion-wc-theme';
Element;

export const StylesProvider = (
  props: StylesProviderProps & {
    seed?: string;
  },
): JSX.Element => {
  const { children, seed, ...args } = props;
  if (seed && !args.generateClassName) {
    args.generateClassName = createGenerateClassName({ seed });
  }
  return <BaseStylesProvider {...args}>{children}</BaseStylesProvider>;
};

export default StylesProvider;
