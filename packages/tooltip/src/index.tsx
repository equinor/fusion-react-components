import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export type TooltipProps = TippyProps;

export const Tooltip = (props: TippyProps): JSX.Element => <Tippy {...props}>{props.children}</Tippy>;

export default Tooltip;
