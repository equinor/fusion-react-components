import { useState, useEffect, useCallback, Children, ReactElement, PropsWithChildren } from 'react';
import { useStyles } from './style';
import { clsx } from '@equinor/fusion-react-styles';
import { IconButton } from '@equinor/fusion-react-button';
import StepPane from './StepPane';
import StepContent from './StepContent';

export type StepperProps = {
  onChange?: (stepKey: string) => void;
  forceOrder?: boolean;
  activeStepKey: string;
  hideNavButtons?: boolean;
  verticalSteps?: boolean;
};

type StepKey = {
  key: string;
  position: number;
  disabled: boolean;
};

type StepDirection = 'next' | 'prev';

export const Stepper = ({
  children,
  activeStepKey,
  forceOrder,
  onChange,
  hideNavButtons,
  verticalSteps,
}: PropsWithChildren<StepperProps>): JSX.Element => {
  const styles = useStyles();
  const [stepKeys, setStepKeys] = useState<StepKey[]>([]);
  const [currentStepKey, setCurrentStepKey] = useState<string>(activeStepKey);
  const [activeStepPosition, setActiveStepPosition] = useState<number>(0);

  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);

  const stepperContainerClasses = clsx(
    styles.root,
    styles.stepperContainer,
    verticalSteps && styles.verticalStepperContainer
  );
  const stepperClasses = clsx(styles.stepper, verticalSteps && styles.verticalStepper);

  useEffect(() => {
    const steps: StepKey[] = Children.toArray(children).map((c, i) => ({
      key: (c as ReactElement).props.stepKey,
      position: i + 1,
      disabled: (c as ReactElement).props.disabled,
    }));

    setStepKeys(steps);
  }, [children]);

  useEffect(() => {
    setCurrentStepKey(activeStepKey);
  }, [activeStepKey]);

  useEffect(() => {
    const current = stepKeys.find((sk) => sk.key === currentStepKey);

    if (current) {
      setActiveStepPosition(current.position);

      const next = stepKeys.find((sk) => sk.position === current.position + 1);
      const prev = stepKeys.find((sk) => sk.position === current.position - 1);

      setCanNext(next !== undefined && !next.disabled);
      setCanPrev(prev !== undefined && !prev.disabled);
    }
  }, [stepKeys, currentStepKey]);

  const findStepKey = useCallback(
    (direction: StepDirection) => {
      const current = stepKeys.find((sk) => sk.key === currentStepKey);

      if (!current) {
        return;
      }

      const newPosition = direction === 'next' ? current.position + 1 : current.position - 1;
      const prevOrNext = stepKeys.find((sk) => sk.position === newPosition);
      return prevOrNext;
    },
    [currentStepKey, stepKeys]
  );

  const handleChange = useCallback(
    (stepKey: string) => {
      setCurrentStepKey(stepKey);
      onChange && onChange(stepKey);
    },
    [onChange]
  );

  const handleClickPrev = useCallback(() => {
    const prevKey = findStepKey('prev');
    if (!prevKey) {
      return;
    }

    handleChange(prevKey.key);
  }, [handleChange, findStepKey]);

  const handleClickNext = useCallback(() => {
    const nextKey = findStepKey('next');

    if (!nextKey) {
      return;
    }

    handleChange(nextKey.key);
  }, [handleChange, findStepKey]);

  return (
    <div className={stepperContainerClasses}>
      <div className={stepperClasses}>
        {!hideNavButtons && (
          <div className={styles.navigationArrows}>
            <div className={styles.navigationArrow}>
              <IconButton
                rounded
                icon="arrow_back"
                color={canPrev ? 'primary' : 'disabled'}
                size="small"
                onClick={handleClickPrev}
                disabled={!canPrev}
                ariaLabel="Stepper navigation button - previous step"
              />
            </div>
            <div className={styles.navigationArrow}>
              <IconButton
                rounded
                icon="arrow_forward"
                color={canNext ? 'primary' : 'disabled'}
                size="small"
                onClick={handleClickNext}
                disabled={!canNext}
                ariaLabel="Stepper navigation button - next step"
              />
            </div>
          </div>
        )}
        <StepPane
          forceOrder={forceOrder || false}
          children={children}
          activeStepKey={currentStepKey}
          activeStepPosition={activeStepPosition}
          onChange={handleChange}
          verticalSteps={verticalSteps}
        />
      </div>
      <div className={styles.stepContent}>
        <StepContent children={children} activeStepKey={currentStepKey} />
      </div>
    </div>
  );
};

export default Stepper;
