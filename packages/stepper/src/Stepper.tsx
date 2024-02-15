import { useState, useEffect, useCallback, PropsWithChildren, createContext, useContext } from 'react';
import { findNextAvailable, findPrevAvailable, getSteps } from './utils';
import StepperContent from './StepperContent';

/** Define the props interface for Stepper component */
export type StepperProps = {
  readonly onChange?: (stepKey: string, allSteps: StepKey[]) => void;
  readonly forceOrder?: boolean;
  readonly activeStepKey: string;
  readonly hideNavButtons?: boolean;
  readonly verticalSteps?: boolean;
  readonly horizontalTitle?: boolean;
};

/** Define the type for StepKey */
export type StepKey = {
  key: string;
  position: number;
  disabled: boolean;
  done: boolean;
};

/** Create context for Stepper */
type StepperContextType = {
  verticalSteps?: boolean;
  horizontalTitle?: boolean;
  canPrev: boolean;
  canNext: boolean;
  forceOrder: boolean;
  stepKeys: StepKey[];
  currentStepKey: string;
  activeStepPosition: number;
  handleChange: (stepKey: string, allSteps: StepKey[]) => void;
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepperContext must be used within a StepperProvider');
  }
  return context;
};

export const Stepper = ({
  children,
  activeStepKey,
  forceOrder,
  onChange,
  hideNavButtons,
  verticalSteps,
  horizontalTitle,
}: PropsWithChildren<StepperProps>): JSX.Element => {
  /** State to manage step keys, current step key, and active step position */
  const [stepKeys, setStepKeys] = useState<StepKey[]>([]);
  const [currentStepKey, setCurrentStepKey] = useState<string>(activeStepKey);
  const [activeStepPosition, setActiveStepPosition] = useState<number>(0);

  /** State to manage navigation button availability */
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);

  /** Effect to update stepKeys when children change */
  useEffect(() => {
    const steps = getSteps(children);
    setStepKeys(steps);
  }, [children]);

  /** Effect to update currentStepKey when activeStepKey changes */
  useEffect(() => {
    setCurrentStepKey(activeStepKey);
  }, [activeStepKey]);

  /** Effect to update activeStepPosition, canNext, and canPrev when stepKeys or currentStepKey change */
  useEffect(() => {
    const current = stepKeys.find((sk) => sk.key === currentStepKey);
    if (!current) return;

    setActiveStepPosition(current.position);

    const checkNext = findNextAvailable(current.position, stepKeys).next;
    const checkPrevious = findPrevAvailable(current.position, stepKeys).previous;

    setCanNext(checkNext);
    setCanPrev(checkPrevious);
  }, [stepKeys, currentStepKey]);

  /** Callback to handle step change */
  const handleChange = useCallback(
    (stepKey: string, allSteps: StepKey[]) => {
      setCurrentStepKey(stepKey);
      onChange && onChange(stepKey, allSteps);
    },
    [onChange],
  );

  return (
    <StepperContext.Provider
      value={{
        verticalSteps,
        horizontalTitle,
        canPrev,
        canNext,
        forceOrder: forceOrder || false,
        stepKeys: getSteps(children),
        currentStepKey,
        activeStepPosition,
        handleChange,
      }}
    >
      <StepperContent hideNavButtons={hideNavButtons}>{children}</StepperContent>
    </StepperContext.Provider>
  );
};

export default Stepper;
