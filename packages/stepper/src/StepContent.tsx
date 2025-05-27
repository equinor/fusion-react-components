import { Fragment, Children, type ReactElement, cloneElement, type PropsWithChildren } from 'react';

/** Define the props interface for StepContent component */
type StepContentProps = {
  readonly activeStepKey: string | null;
};

const StepContent = ({ children, activeStepKey }: PropsWithChildren<StepContentProps>): JSX.Element => {
  /** Find the active step based on the activeStepKey */
  const active = Children.toArray(children).find(
    (child) => (child as ReactElement).props.stepKey === activeStepKey,
  ) as ReactElement;

  if (!active) {
    return <></>;
  }

  /** Clone and map the children of the active step */
  const clonedChildren = Children.map(active.props.children, (child) => cloneElement(child));

  /** Return a Fragment containing the cloned children of the active step */
  return <Fragment>{clonedChildren}</Fragment>;
};

export default StepContent;
