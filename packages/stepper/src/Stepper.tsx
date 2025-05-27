import {
  useState,
  useEffect,
  useCallback,
  type PropsWithChildren,
  createContext,
  useContext,
  Children,
  type ReactElement,
} from 'react';
import { findNextAvailable, findPrevAvailable, getSteps } from './utils';
import StepperContent from './StepperContent';

/** Define the props interface for Stepper component */
export type StepperProps = {
  readonly onChange?: (stepKey: string, allSteps: StepKey[]) => void;
  readonly forceOrder?: boolean;
  readonly initialStepKey?: string;
  readonly stepKey?: string;
  readonly hideNavButtons?: boolean;
  readonly verticalSteps?: boolean;
  readonly horizontalTitle?: boolean;
  readonly divider?: boolean;
};

/** Define the type for StepKey */
export type StepKey = {
  key: string;
  position: number;
  disabled: boolean;
  done: boolean;
};

export type StepKeys = StepKey[];

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
  initialStepKey,
  stepKey,
  forceOrder,
  onChange,
  hideNavButtons,
  verticalSteps,
  horizontalTitle,
  divider,
}: PropsWithChildren<StepperProps>): JSX.Element => {
  /** State to manage step keys, current step key, and active step position */
  const [stepKeys, setStepKeys] = useState<StepKey[]>([]);
  /** Fallback to key of first step if stepKey/initialStepKey is not set */
  const [currentStepKey, setCurrentStepKey] = useState<string>(
    stepKey ?? initialStepKey ?? (Children.toArray(children)[0] as ReactElement).props.stepKey,
  );
  const [activeStepPosition, setActiveStepPosition] = useState<number>(0);

  /** State to manage navigation button availability */
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);

  /** Effect to update stepKeys when children change */
  useEffect(() => {
    const steps = getSteps(children);
    setStepKeys(steps);
  }, [children]);

  /** Effect to update currentStepKey when stepKey changes */
  useEffect(() => {
    stepKey && setCurrentStepKey(stepKey);
  }, [stepKey]);

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
    (newStepKey: string, allSteps: StepKey[]) => {
      /** If stepKey is undefined we call setCurrentStepKey here since it is then an uncontrolled component */
      !stepKey && setCurrentStepKey(newStepKey);
      onChange && onChange(newStepKey, allSteps);
    },
    [onChange, stepKey],
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
      <StepperContent hideNavButtons={hideNavButtons} divider={divider}>
        {children}
      </StepperContent>
    </StepperContext.Provider>
  );
};

export default Stepper;
