import { useRef } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { Icon } from '@equinor/eds-core-react';
import { done as doneStepIcon } from '@equinor/eds-icons';
import { useStyles } from './style';

export type BadgeProps = {
  readonly position?: number;
  readonly active?: boolean;
  readonly done?: boolean;
};

export const Badge = ({ position, active, done }: BadgeProps): JSX.Element => {
  const styles = useStyles();
  const badgeRef = useRef<HTMLDivElement>(null);

  const badgeClasses = clsx(styles.badge, active && styles.active, done && styles.done);

  return (
    <div ref={badgeRef} className={badgeClasses}>
      {done ? <Icon data={doneStepIcon} /> : position}
    </div>
  );
};
