import Tippy, { TippyProps } from '@tippyjs/react';

export type TooltipProps = TippyProps;

export const Tooltip = (props: TippyProps): JSX.Element => <Tippy {...props}>{props.children}</Tippy>;

export default Tooltip;
