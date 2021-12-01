import Tippy, { TippyProps } from '@tippyjs/react';

// TODO
//const useStyles = createStyles

export type TooltipProps = TippyProps & {
  /** add custom props */
};

export const Tooltip = (props: TooltipProps): JSX.Element => <Tippy {...props}>{props.children}</Tippy>;

export default Tooltip;
