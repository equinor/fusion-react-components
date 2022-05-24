import { clsx } from '@equinor/fusion-react-styles';
import { createElement } from 'react';
import { useStyle, useStyles } from './style';
import { TypographyPropertiesType, TypographyType } from './types';

export const Typography = <
  K extends keyof TypographyType,
  T extends keyof TypographyPropertiesType<K>,
  C extends keyof JSX.IntrinsicElements = 'div'
>(
  props: React.PropsWithChildren<
    JSX.IntrinsicElements[C] & {
      variant: K;
      type: Extract<T, string>;
      tag?: C;
    }
  >
) => {
  const { variant, type, tag = 'div', children, className, ...attr } = props;
  const ff = useStyles();
  // const style = useStyle(variant, type);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const el = createElement(tag, { ...attr, className: clsx(ff[`${variant}__${type}`], className) }, children);
  return el;
};

// const test = () => <Typography variant="heading" type="h2" />
// const Test2 = () => {
//   const className = useStyle('heading', 'h3');
//   return <div className={className} />;
// };

export { useStyle as useTypographyStyle };

export default Typography;
