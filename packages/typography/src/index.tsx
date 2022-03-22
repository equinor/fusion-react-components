import { createElement } from 'react';
import { useStyles } from './style';
import { TypographyType } from './types';

export type TypographyProps<K extends keyof T, T extends TypographyType = TypographyType> = {
  variant: K;
  type: keyof T[K];
  component?: keyof TypographyType;
};

export const Typography = <K extends keyof T, T extends TypographyType>(
  props: React.PropsWithChildren<TypographyProps<K, T>>
) => {
  const { variant, type, component, children } = props;
  const styles = useStyles(variant, type)();
  const tag = component ? `typography-${component}` : `typography-${String(variant as keyof T)}`;
  const el = createElement(tag, { className: styles.root }, children);
  return el;
};

export default Typography;
