import { FusionTheme } from '@equinor/fusion-react-styles';
import { createElement } from 'react';
import { useStyles } from './style';

export type TypographyProps<T extends FusionTheme['typography'], K extends keyof T> = {
  variant: K;
  type: keyof T[K];
  component: keyof FusionTheme['typography'];
};

export const Typography = <T extends FusionTheme['typography'], K extends keyof T>(
  props: React.PropsWithChildren<TypographyProps<T, K>>
) => {
  const { variant, type, component, children } = props;
  //   const styles = useStyles(variant, type)({ variant, type });
  const styles = useStyles(variant, type)();
  const el = createElement(component, { className: styles.type }, children);
  return el;
};

// -----------------
// Test

export type Test<T extends FusionTheme['typography'], K extends keyof T> = {
  variant: K;
  type: keyof T[K];
};
function testFunc<T extends FusionTheme['typography'], K extends keyof T>(props: Test<T, K>) {
  return props.type;
}
testFunc({ variant: 'input', type: 'helper' });

// --------------------

export default Typography;
