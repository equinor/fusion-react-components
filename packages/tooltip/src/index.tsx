import Tippy, { TippyProps } from '@tippyjs/react/headless';
import { useStyles } from './style';

export type TooltipProps = TippyProps;

export const Tooltip = (props: TooltipProps): JSX.Element => {
  const styles = useStyles();

  return (
    <Tippy
      render={(attrs) => (
        <div className={styles.box} {...attrs}>
          <div className={styles.arrow} data-popper-arrow></div>
          <div className={styles.content}>{props.content}</div>
        </div>
      )}
      {...props}
    >
      {props.children}
    </Tippy>
  );
};

export default Tooltip;
