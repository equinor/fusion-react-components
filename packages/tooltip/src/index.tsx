import Tippy, { TippyProps } from '@tippyjs/react';
import { useStyles } from './style';

export type TooltipProps = TippyProps;

export const Tooltip = (props: TippyProps): JSX.Element => {
  useStyles();
  return <Tippy {...props}>{props.children}</Tippy>;
};

export default Tooltip;
