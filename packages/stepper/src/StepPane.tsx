import React, { cloneElement, useRef, Children, PropsWithChildren, ReactElement } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { useStyles } from './style';
import { StepKey } from './Stepper';
import { getSteps } from './utils';

type StepPaneProps = {
  onChange: (stepKey: string, allSteps: StepKey[]) => void;
  activeStepKey: string | null;
  activeStepPosition: number;
  forceOrder: boolean;
  verticalSteps?: boolean;
};

type StepPaneChildProps = {
  title: string;
  stepKey: string;
  disabled: boolean;
  done: boolean;
};

const StepPane = ({
  children,
  onChange,
  activeStepKey,
  forceOrder,
  verticalSteps,
}: PropsWithChildren<StepPaneProps>): JSX.Element => {
  const styles = useStyles();
  const stepPaneRef = useRef<HTMLDivElement | null>(null);

  const clonedChildren = Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const { title, stepKey, disabled, done } = child.props as StepPaneChildProps;
      if (!title || !stepKey) {
        return null;
      }

      const position: number = index + 1;

      return cloneElement(child as ReactElement, {
        onChange: () => onChange(stepKey, getSteps(children)),
        isCurrent: stepKey === activeStepKey,
        position,
        isClickable: !forceOrder,
        done,
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
