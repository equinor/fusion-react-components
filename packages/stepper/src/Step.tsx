import {
  useEffect,
  useRef,
  type RefObject,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { Badge } from './StepBadge';
import styled, { css } from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { Button, Typography } from '@equinor/eds-core-react';
import { useStepperContext } from './Stepper';

type StyledStepProps = {
  $vertical?: boolean;
  $horizontalTitle?: boolean;
  $clickable?: boolean;
  $disabled?: boolean;
  $done?: boolean;
};

type StyledContentProps = {
  $vertical?: boolean;
  $horizontalTitle?: boolean;
  $disabled?: boolean;
};

const Styled = {
  Step: styled(Button)<StyledStepProps>`
    border: none;
    background-color: transparent;
    padding: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    flex: 1 1 150px;
    cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
    &:not(:last-child):after {
      content: '';
      position: relative;
      top: calc(var(--badge-size) / 2);
      width: calc(100% - var(--badge-size) - calc(var(--spacing) * 2));
      left: 50%;
      height: 1px;
      background-color: ${tokens.colors.interactive.disabled__border.hex};
      order: -1;
    }
    &:focus-visible {
      outline: 2px dashed ${tokens.colors.interactive.primary__resting.hex};
      outline-offset: 2px;
    }
    ${({ $vertical, $horizontalTitle }) =>
      $vertical
        ? css`
            position: relative;
            flex-direction: row;
            align-items: flex-start;
            flex: 1 1;
            padding-bottom: var(--spacing-between-vartical-steps);
            &:not(:last-child):after {
              content: '';
              position: absolute;
              left: calc(var(--badge-size) / 2);
              top: calc(var(--badge-size) + var(--spacing-vertical));
              width: 1px;
              height: calc(100% - var(--badge-size) - calc(var(--spacing-vertical) * 2));
            }
          `
        : $horizontalTitle &&
          css`
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
          `}
    ${({ $done }) =>
      $done &&
      css`
        &:not(:last-child):after {
          background-color: ${tokens.colors.interactive.primary__resting.hex};
        }
      `}
    ${({ $disabled }) =>
      $disabled &&
      css`
        pointer-events: none;
        color: ${tokens.colors.interactive.disabled__text.hex};
        --line-color: ${tokens.colors.interactive.disabled__border.hex};
      `}
  `,
  Content: styled.div<StyledContentProps>`
    display: flex;
    flex-direction: column;
    padding: ${tokens.spacings.comfortable.small} calc(var(--spacing-between-horizontal-steps) / 2);
    ${({ $vertical, $horizontalTitle }) => ($vertical ? 'padding-top: 1px;' : $horizontalTitle && 'padding-top: 2px;')}
    p {
      text-align: ${({ $vertical, $horizontalTitle }) => ($vertical ? 'left' : $horizontalTitle ? 'left' : 'center')};
    }
  `,
  Title: styled(Typography)<{ $current?: boolean }>`
    font-weight: ${({ $current }) => ($current ? '700' : '400')};
    margin-bottom: ${tokens.spacings.comfortable.xx_small};
    }
  `,
  Description: styled(Typography)`
    font-weight: 400;
  `,
};

/** Define the props interface for Step component */
export type StepProps = {
  readonly title: string;
  readonly stepKey: string;
  readonly description?: string;
  readonly disabled?: boolean;
  readonly position?: number;
  readonly done?: boolean;
  readonly stepPaneRef?: RefObject<HTMLElement>;
  readonly stepCount?: number;
};

export const Step = ({
  title,
  description,
  disabled,
  position,
  done,
  stepPaneRef,
  stepKey,
}: PropsWithChildren<StepProps>): ReactElement => {
  const stepRef = useRef<HTMLAnchorElement>(null);
  const { verticalSteps, horizontalTitle, currentStepKey, handleChange, stepKeys, forceOrder } =
    useStepperContext();

  const isClickable = !forceOrder;
  const isCurrent = stepKey === currentStepKey;

  // biome-ignore lint/correctness/useExhaustiveDependencies: done is needed to trigger the effect
  useEffect(() => {
    if (isCurrent) {
      handleChange(stepKey, stepKeys);
    }
  }, [done, handleChange, stepKey, stepKeys, isCurrent]);

  useEffect(() => {
    if (stepPaneRef && stepRef.current && stepPaneRef.current && isCurrent) {
      if (!stepPaneRef.current || !stepRef.current) {
        return;
      }
      const pane = stepPaneRef.current;
      if (pane.scrollWidth === pane.offsetWidth) {
        return;
      }
      pane.scrollTo(stepRef.current.offsetLeft - stepRef.current.offsetWidth, 0);
    }
  }, [isCurrent, stepPaneRef]);

  /** Render the component */
  return (
    <Styled.Step
      ref={stepRef}
      $current={isCurrent}
      $clickable={isClickable}
      $disabled={disabled}
      $done={done}
      $vertical={verticalSteps}
      $horizontalTitle={horizontalTitle}
      as="button"
      onClick={() => !disabled && isClickable && handleChange(stepKey, stepKeys)}
    >
      <Badge position={position} active={isCurrent} done={done} />
      <Styled.Content $vertical={verticalSteps} $horizontalTitle={horizontalTitle}>
        <Styled.Title
          $current={isCurrent}
          group="paragraph"
          variant="body_short"
          color={
            isCurrent
              ? 'primary'
              : disabled
                ? 'disabled'
                : tokens.colors.text.static_icons__default.hex
          }
        >
          {title}
        </Styled.Title>
        <Styled.Description
          group="paragraph"
          variant="caption"
          color={
            isCurrent
              ? 'primary'
              : disabled
                ? 'disabled'
                : tokens.colors.text.static_icons__tertiary.hex
          }
        >
          {description}
        </Styled.Description>
      </Styled.Content>
    </Styled.Step>
  );
};

export default Step;
