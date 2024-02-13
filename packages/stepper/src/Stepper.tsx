import { useState, useEffect, useCallback, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Button, Icon } from '@equinor/eds-core-react';
import { arrow_back, arrow_forward } from '@equinor/eds-icons';
import StepPane from './StepPane';
import StepContent from './StepContent';
import { findNextAvailable, findPrevAvailable, getSteps } from './utils';

const Styled = {
  Container: styled.div<{ $vertical?: boolean }>`
    --content-resize: 1;
    --badge-size: 21px;
    --spacing: 7.5px;
    --spacing-vertical: 5px;
    --spacing-between-vartical-steps: ${tokens.spacings.comfortable.x_large};
    --spacing-between-horizontal-steps: ${tokens.spacings.comfortable.medium};
    --stepper-divider: 1px solid ${tokens.colors.interactive.disabled__border.hex};
    display: flex;
    flex-direction: ${(props) => (props.$vertical ? 'row' : 'column')};
    height: 100%;
    ${(props) => (props.$vertical ? 'width:100%' : '')}
  `,
  Stepper: styled.div<{ $vertical?: boolean; $horizontalTitle?: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.$vertical ? 'column' : 'row')};
    align-items: ${(props) => (props.$vertical ? 'flex-start' : 'center')};
    gap: ${tokens.spacings.comfortable.medium};
    padding-bottom: ${tokens.spacings.comfortable.medium};
    ${(props) => (props.$vertical ? 'border-right:var(--stepper-divider)' : 'border-bottom:var(--stepper-divider)')};
    padding-right: ${(props) => (props.$vertical ? tokens.spacings.comfortable.medium : '0')};
    ${(props) =>
      !props.$vertical &&
      props.$horizontalTitle &&
      css`
        & $step {
          flex: 1 1 auto;
          flex-direction: row;
          align-items: flex-start;
          padding-right: var(--spacing);
          &:not(:last-child):after {
            flex: 1;
            order: 1;
            left: 0;
            width: calc(100% - var(--spacing));
          }
        }
        & $content {
          padding-top: 2px;
          text-align: left;
        }
      `}
  `,
  StepContent: styled.div`
    flex: 1;
  `,
  Navigation: styled.div`
    display: flex;
    flex-wrap: nowrap;
  `,
};

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
    <Styled.Container $vertical={verticalSteps}>
      <Styled.Stepper $vertical={verticalSteps} $horizontalTitle={horizontalTitle}>
        {!hideNavButtons && (
          <Styled.Navigation>
            <Button
              color="primary"
              variant="ghost_icon"
              onClick={handleClickPrev}
              disabled={!canPrev}
              aria-label="Stepper navigation button - previous step"
            >
              <Icon data={arrow_back} />
            </Button>
            <Button
              color="primary"
              variant="ghost_icon"
              onClick={handleClickNext}
              disabled={!canNext}
              aria-label="Stepper navigation button - next step"
            >
              <Icon data={arrow_forward} />
            </Button>
          </Styled.Navigation>
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
      </Styled.Stepper>
      <Styled.StepContent>
        <StepContent activeStepKey={currentStepKey}>{children}</StepContent>
      </Styled.StepContent>
    </Styled.Container>
  );
};

export default Stepper;
