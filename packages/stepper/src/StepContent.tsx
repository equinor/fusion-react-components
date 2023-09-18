import { Fragment, Children, ReactElement, cloneElement, PropsWithChildren } from 'react';

type StepContentProps = {
  activeStepKey: string | null;
};

const StepContent = ({ children, activeStepKey }: PropsWithChildren<StepContentProps>): JSX.Element => {
  const active = Children.toArray(children).find(
    (child) => (child as ReactElement).props.stepKey === activeStepKey,
  ) as ReactElement;

  if (!active) {
    return <></>;
  }

  const clonedChildren = Children.map(active.props.children, (child) => cloneElement(child));

  return <Fragment>{clonedChildren}</Fragment>;
};

export default StepContent;
