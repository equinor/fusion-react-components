import { Children, type ReactElement, cloneElement, type PropsWithChildren } from 'react';
import type { StepProps } from './Step';

/** Define the props interface for StepContent component */
type StepContentProps = {
  readonly activeStepKey: string | null;
};

const StepContent = ({
  children,
  activeStepKey,
}: PropsWithChildren<StepContentProps>): ReactElement | undefined => {
  /** Find the active step based on the activeStepKey */
  const active = Children.toArray(children).find(
    (child) => (child as ReactElement<StepProps>).props.stepKey === activeStepKey,
  ) as ReactElement<PropsWithChildren<StepProps>>;

  if (!active) {
    return;
  }

  /** Clone and map the children of the active step */
  const clonedChildren = Children.map(active.props.children, (child) =>
    cloneElement(child as ReactElement),
  );

  /** Return a Fragment containing the cloned children of the active step */
  return <>{clonedChildren}</>;
};

export default StepContent;
