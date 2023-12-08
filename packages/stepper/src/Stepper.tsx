import { useState, useEffect, useCallback, PropsWithChildren } from 'react';
import { useStyles } from './style';
import { clsx } from '@equinor/fusion-react-styles';
import { Button, Icon } from '@equinor/eds-core-react';
import { arrow_back, arrow_forward } from '@equinor/eds-icons';
import StepPane from './StepPane';
import StepContent from './StepContent';
import { findNextAvailable, findPrevAvailable, getSteps } from './utils';

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

/** Define the type for StepDirection */
type StepDirection = 'next' | 'prev';

export const Stepper = ({
  children,
  activeStepKey,
  forceOrder,
  onChange,
  hideNavButtons,
  verticalSteps,
  horizontalTitle,
}: PropsWithChildren<StepperProps>): JSX.Element => {
  const styles = useStyles();
  /** State to manage step keys, current step key, and active step position */
  const [stepKeys, setStepKeys] = useState<StepKey[]>([]);
  const [currentStepKey, setCurrentStepKey] = useState<string>(activeStepKey);
  const [activeStepPosition, setActiveStepPosition] = useState<number>(0);

  /** State to manage navigation button availability */
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);

  const stepperContainerClasses = clsx(
    styles.root,
    styles.stepperContainer,
    verticalSteps && styles.verticalStepperContainer,
  );
  const stepperClasses = clsx(
    styles.stepper,
    verticalSteps && styles.verticalStepper,
    !verticalSteps && horizontalTitle && styles.horizontalTitleStepper,
  );

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

  /** Callback to find the next or previous step key */
  const findStepKey = useCallback(
    (direction: StepDirection) => {
      const current = stepKeys.find((sk) => sk.key === currentStepKey);
      if (!current) return;

      const nextNewPosition = findNextAvailable(current.position, stepKeys).step?.position;
      const nextPrevPosition = findPrevAvailable(current.position, stepKeys).step?.position;

      const newPosition = direction === 'next' ? nextNewPosition : nextPrevPosition;
      const prevOrNext = stepKeys.find((sk) => sk.position === newPosition);
      return prevOrNext;
    },
    [currentStepKey, stepKeys],
  );

  /** Callback to handle step change */
  const handleChange = useCallback(
    (stepKey: string, allSteps: StepKey[]) => {
      setCurrentStepKey(stepKey);
      onChange && onChange(stepKey, allSteps);
    },
    [onChange],
  );

  /** Callbacks to handle button clicks in navigation */
  const handleClickPrev = useCallback(() => {
    const prevKey = findStepKey('prev');
    if (!prevKey) return;
    handleChange(prevKey.key, getSteps(children));
  }, [children, findStepKey, handleChange]);

  const handleClickNext = useCallback(() => {
    const nextKey = findStepKey('next');
    if (!nextKey) return;
    handleChange(nextKey.key, getSteps(children));
  }, [children, findStepKey, handleChange]);

  return (
    <div className={stepperContainerClasses}>
      <div className={stepperClasses}>
        {!hideNavButtons && (
          <div className={styles.navigationArrows}>
            <div className={styles.navigationArrow}>
              <Button
                color="primary"
                variant="ghost_icon"
                onClick={handleClickPrev}
                disabled={!canPrev}
                aria-label="Stepper navigation button - previous step"
              >
                <Icon data={arrow_back} />
              </Button>
            </div>
            <div className={styles.navigationArrow}>
              <Button
                color="primary"
                variant="ghost_icon"
                onClick={handleClickNext}
                disabled={!canNext}
                aria-label="Stepper navigation button - next step"
              >
                <Icon data={arrow_forward} />
              </Button>
            </div>
          </div>
        )}
        <StepPane
          forceOrder={forceOrder || false}
          activeStepKey={currentStepKey}
          activeStepPosition={activeStepPosition}
          onChange={handleChange}
          verticalSteps={verticalSteps}
        >
          {children}
        </StepPane>
      </div>
      <div className={styles.stepContent}>
        <StepContent activeStepKey={currentStepKey}>{children}</StepContent>
      </div>
    </div>
  );
};

export default Stepper;
