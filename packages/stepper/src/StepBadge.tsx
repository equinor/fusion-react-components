import { useEffect, useRef } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { Icon } from '@equinor/eds-core-react';
import { done as doneStepIcon } from '@equinor/eds-icons';
import { useStyles } from './style';

export type BadgeProps = {
  readonly position?: number;
  readonly active?: boolean;
  readonly done?: boolean;
  readonly runChange?: () => void;
};

export const Badge = ({ position, active, done, runChange }: BadgeProps): JSX.Element => {
  const styles = useStyles();
  const badgeRef = useRef<HTMLDivElement>(null);

  const badgeClasses = clsx(styles.badge, active && styles.active, done && styles.done);

  useEffect(() => {
    if (badgeRef.current && active) {
      runChange && runChange();
    }
  }, [done]);

  return (
    <div ref={badgeRef} className={badgeClasses}>
      {done ? <Icon data={doneStepIcon} /> : position}
    </div>
  );
};
