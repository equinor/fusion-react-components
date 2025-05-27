import React, { cloneElement, useRef, Children, type ReactElement, type ReactNode } from 'react';
import { useStepperContext } from './Stepper';
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    flex: 1 1 auto;
  `,
  StepPane: styled.div<{ $vertical?: boolean }>`
    display: flex;
    flex-wrap: wrap;
    ${(props) => props.$vertical && 'flex-direction: column;'}
  `,
};

/** Define the props interface for StepPane component */
type StepPaneChildProps = {
  title: string;
  stepKey: string;
  disabled: boolean;
  done: boolean;
};

/** Define the props interface for children components of StepPane */
const StepPane = ({ children }: { readonly children: ReactNode }): JSX.Element => {
  const stepPaneRef = useRef<HTMLDivElement | null>(null);
  const { verticalSteps, activeStepPosition, forceOrder } = useStepperContext();

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
        /** position of the step */
        position,
        /** in case of forceOrder, follow previous step done rule, if not, step needs to be completed manually */
        done: forceOrder ? position < activeStepPosition : done,
        disabled: disabled === true,
        /** count of all steps */
        stepCount: Children.count(children),
        stepPaneRef: stepPaneRef,
      });
    }
  });

  return (
    <Styled.Container ref={stepPaneRef}>
      <Styled.StepPane $vertical={verticalSteps}>{clonedChildren}</Styled.StepPane>
    </Styled.Container>
  );
};

export default StepPane;
