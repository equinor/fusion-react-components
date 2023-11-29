import { useEffect, useRef, MutableRefObject, PropsWithChildren } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { useStyles } from './style';
import { Badge } from './StepBadge';

export type StepProps = {
  readonly title: string;
  readonly stepKey: string;
  readonly description?: string;
  readonly disabled?: boolean;
  readonly isCurrent?: boolean;
  readonly position?: number;
  readonly onChange?: () => void;
  readonly isClickable?: boolean;
  readonly done?: boolean;
  readonly stepPaneRef?: MutableRefObject<HTMLElement>;
  readonly stepCount?: number;
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
    done && styles.doneStep,
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
    // TODO!
    // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <a onClick={() => !disabled && isClickable && onChange && onChange()} ref={stepRef} className={stepClasses}>
      <Badge position={position} active={isCurrent} done={done} runChange={() => onChange && onChange()} />
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
