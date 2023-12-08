import React, { cloneElement, useRef, Children, PropsWithChildren, ReactElement } from 'react';
import { clsx } from '@equinor/fusion-react-styles';
import { useStyles } from './style';
import { StepKey } from './Stepper';
import { getSteps } from './utils';

/** Define the props interface for StepPane component */
type StepPaneProps = {
  readonly onChange: (stepKey: string, allSteps: StepKey[]) => void;
  readonly activeStepKey: string | null;
  readonly activeStepPosition: number;
  readonly forceOrder: boolean;
  readonly verticalSteps?: boolean;
};

/** Define the props interface for StepPane component */
type StepPaneChildProps = {
  title: string;
  stepKey: string;
  disabled: boolean;
  done: boolean;
};

/** Define the props interface for children components of StepPane */
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
      const { title, stepKey, disabled, done } = child.props as StepPaneChildProps;
      if (!title || !stepKey) {
        return null;
      }

      /** Calculate the position based on the index */
      const position: number = index + 1;

      /** Clone the child element with modified props */
      return cloneElement(child as ReactElement, {
        /** run onChange with current step key and all steps as array */
        onChange: () => onChange(stepKey, getSteps(children)),
        /** check if the current step is active step */
        isCurrent: stepKey === activeStepKey,
        /** position of the step */
        position,
        isClickable: !forceOrder,
        /** in case of forceOrder, follow previous step done rule, if not, step needs to be completed manually */
        done: forceOrder ? position < activeStepPosition : done,
        disabled: disabled === true,
        /** count of all steps */
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
