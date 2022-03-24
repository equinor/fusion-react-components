import { clsx } from '@equinor/fusion-react-styles';
import { createElement } from 'react';
import { useStyles } from './style';
import { TypographyType } from './types';

export type divProps = JSX.IntrinsicElements['div'];

export type TypographyProps<
  K extends keyof T,
  T extends TypographyType = TypographyType
> = JSX.IntrinsicElements['div'] & {
  variant: K;
  type: keyof T[K];
  component?: keyof TypographyType;
};

export const Typography = <K extends keyof T, T extends TypographyType>(
  props: React.PropsWithChildren<TypographyProps<K, T>>
) => {
  const { variant, type, component, className, children } = props;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const styles = useStyles({ variant, type });
  const tag = component ? `typography.${component}` : `typography.${String(variant as keyof T)}`;
  const el = createElement(tag, { className: clsx(styles.root, className) }, children);
  return el;
};

export default Typography;
