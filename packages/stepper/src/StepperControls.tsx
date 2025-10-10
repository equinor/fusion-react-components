import { type ReactElement, useCallback } from 'react';
import { Button, Icon } from '@equinor/eds-core-react';
import { arrow_back, arrow_forward } from '@equinor/eds-icons';
import styled from 'styled-components';
import { useStepperContext } from './Stepper';
import { findNextAvailable, findPrevAvailable } from './utils';

/** Define the type for StepDirection */
type StepDirection = 'next' | 'prev';

const Styled = {
  Navigation: styled.div`
    display: flex;
    flex-wrap: nowrap;
  `,
};

export const StepperControls = (): ReactElement => {
  const { canPrev, canNext, stepKeys, currentStepKey, handleChange } = useStepperContext();

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

  /** Callbacks to handle button clicks in navigation */
  const handleClickPrev = useCallback(() => {
    const prevKey = findStepKey('prev');
    if (!prevKey) return;
    handleChange(prevKey.key, stepKeys);
  }, [findStepKey, stepKeys, handleChange]);

  const handleClickNext = useCallback(() => {
    const nextKey = findStepKey('next');
    if (!nextKey) return;
    handleChange(nextKey.key, stepKeys);
  }, [findStepKey, stepKeys, handleChange]);

  return (
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
  );
};

export default StepperControls;
