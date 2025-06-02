import { type ReactElement, type ReactNode, Children } from 'react';
import type { StepKey } from './Stepper';

type NextAvailableStep = {
  step: StepKey | undefined;
  next: boolean;
};

type PrevAvailableStep = {
  step: StepKey | undefined;
  previous: boolean;
};

/** Map out all children as an array of objects that have key, position, disabled and done */
export const getSteps = (children: ReactNode): StepKey[] => {
  return Children.toArray(children).map((child, i) => {
    return {
      key: (child as ReactElement).props.stepKey,
      position: i + 1,
      disabled: (child as ReactElement).props.disabled ?? false,
      done: (child as ReactElement).props.done ?? false,
    };
  });
};

/** Check if there is next step that is available (not disabled) for "jump" */
export const findNextAvailable = (currentPosition: number, steps: StepKey[]): NextAvailableStep => {
  const current = steps.find((sk) => sk.position === currentPosition);
  if (current) {
    const nextAvailableStep = steps.find(
      (sk) => sk.position > current.position && sk.disabled === false,
    );

    return nextAvailableStep
      ? {
          step: nextAvailableStep,
          next: true,
        }
      : {
          step: undefined,
          next: false,
        };
  }
  return {
    step: undefined,
    next: false,
  };
};

/** Check if there is previous step that is available (not disabled) for "jump" */
export const findPrevAvailable = (currentPosition: number, steps: StepKey[]): PrevAvailableStep => {
  const current = steps.find((sk) => sk.position === currentPosition);
  if (current) {
    const prevAvailableSteps = steps.filter(
      (sk) => sk.position < current.position && sk.disabled === false,
    );
    const prevAvailableStep = prevAvailableSteps
      .reverse()
      .find((sk) => sk.position < current.position && sk.disabled === false);
    return prevAvailableStep
      ? {
          step: prevAvailableStep,
          previous: true,
        }
      : {
          step: undefined,
          previous: false,
        };
  }
  return {
    step: undefined,
    previous: false,
  };
};
