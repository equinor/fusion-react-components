import { useEffect, useRef, MutableRefObject, PropsWithChildren } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { useStyles } from './style';
import { Icon } from '@equinor/fusion-react-icon';

export type StepProps = {
  title: string;
  stepKey: string;
  description?: string;
  disabled?: boolean;
  isCurrent?: boolean;
  position?: number;
  onChange?: () => void;
  isClickable?: boolean;
  done?: boolean;
  stepPaneRef?: MutableRefObject<HTMLElement>;
};

export type BadgeProps = {
  position?: number;
  active?: boolean;
  done?: boolean;
};

const Badge = ({ position, active, done }: BadgeProps): JSX.Element => {
  const styles = useStyles();
  const badgeClasses = clsx(styles.badge, active && styles.active, done && styles.done);

  // TODO: Do we want to keep check icon?
  return (
    <div className={badgeClasses}>
      {!done && position}
      {/* {done && position} */}
      {done && <Icon icon="done" color="primary" />}
    </div>
  );
};

export const Step = ({
  title,
  description,
  isCurrent,
  disabled,
  position,
  onChange,
  isClickable,
  done,
  stepPaneRef,
}: PropsWithChildren<StepProps>): JSX.Element => {
  const styles = useStyles();
  const stepRef = useRef<HTMLAnchorElement>(null);

  const stepClasses = clsx(
    styles.step,
    isCurrent && styles.current,
    isClickable && styles.isClickable,
    disabled && styles.disabled,
    done && styles.doneStep
  );

  const titleClasses = clsx(styles.title);

  useEffect(() => {
    if (stepPaneRef && stepRef.current && stepPaneRef.current && isCurrent) {
      if (!stepPaneRef.current || !stepRef) {
        return;
      }

      const pane = stepPaneRef.current;

      if (pane.scrollWidth === pane.offsetWidth) {
        return;
      }

      pane.scrollTo(stepRef.current.offsetLeft - stepRef.current.offsetWidth, 0);
    }
  }, [isCurrent, stepPaneRef, stepRef]);

  if (disabled) {
    return (
      <span className={stepClasses}>
        <Badge position={position} active={isCurrent} done={done} />
        <div className={styles.content}>
          <div className={titleClasses}>
            <span>{title}</span>
          </div>
          <span className={styles.description}>{description}</span>
        </div>
      </span>
    );
  }

  return (
    <a onClick={() => !disabled && isClickable && onChange && onChange()} ref={stepRef} className={stepClasses}>
      <Badge position={position} active={isCurrent} done={done} />
      <div className={styles.content}>
        <div className={titleClasses}>
          <span className={styles.text} title={title}>
            {title}
          </span>
        </div>
        <span className={styles.description}>{description}</span>
      </div>
    </a>
  );
};

export default Step;