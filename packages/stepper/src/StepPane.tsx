import React, { cloneElement, useRef, Children, PropsWithChildren, ReactElement } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { useStyles } from './style';

type StepPaneProps = {
  onChange: (stepKey: string) => void;
  activeStepKey: string | null;
  activeStepPosition: number;
  forceOrder: boolean;
  verticalSteps?: boolean;
};

type StepPaneChildProps = {
  title: string;
  stepKey: string;
  disabled: boolean;
};

const StepPane = ({
  children,
  onChange,
  activeStepKey,
  activeStepPosition,
  forceOrder,
  verticalSteps,
}: PropsWithChildren<StepPaneProps>): JSX.Element => {
  const styles = useStyles();
  const stepPaneRef = useRef<HTMLDivElement | null>(null);

  const clonedChildren = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const { title, stepKey, disabled } = child.props as StepPaneChildProps;
      if (!title || !stepKey) {
        return null;
      }

      const position = index + 1;

      return cloneElement(child as ReactElement, {
        onChange: () => onChange(stepKey),
        isCurrent: stepKey === activeStepKey,
        position,
        isClickable: !forceOrder,
        done: activeStepPosition > position,
        disabled: disabled === true,
        stepCount: Children.count(children),
        verticalStep: verticalSteps,
        stepPaneRef: stepPaneRef,
      });
    }
  });

  const stepPaneClasses = clsx(styles.stepPane, verticalSteps && styles.verticalSteps);

  return (
    <div className={styles.stepPaneWrapper} ref={stepPaneRef}>
      <div className={stepPaneClasses}>{clonedChildren}</div>
    </div>
  );
};

export default StepPane;
