import type { PropsWithChildren } from 'react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import StepPane from './StepPane';
import StepContent from './StepContent';
import { useStepperContext } from './Stepper';
import { StepperControls } from './StepperControls';

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
  Stepper: styled.div<{ $vertical?: boolean; $divider?: boolean }>`
    display: flex;
    flex-direction: ${(props) => (props.$vertical ? 'column' : 'row')};
    align-items: ${(props) => (props.$vertical ? 'flex-start' : 'center')};
    gap: ${tokens.spacings.comfortable.medium};
    padding-bottom: ${tokens.spacings.comfortable.medium};
    ${(props) =>
      props.$divider &&
      (props.$vertical ? 'border-right:var(--stepper-divider)' : 'border-bottom:var(--stepper-divider)')};
    padding-right: ${(props) => (props.$vertical ? tokens.spacings.comfortable.medium : '0')};
  `,
  StepContent: styled.div`
    flex: 1;
  `,
};

type StepperContentProps = {
  readonly hideNavButtons?: boolean;
  readonly divider?: boolean;
};

export const StepperContent = (props: PropsWithChildren<StepperContentProps>): JSX.Element => {
  const { hideNavButtons, divider, children } = props;
  const { verticalSteps, currentStepKey } = useStepperContext();

  return (
    <Styled.Container $vertical={verticalSteps}>
      <Styled.Stepper $vertical={verticalSteps} $divider={divider}>
        {!hideNavButtons && <StepperControls />}
        <StepPane>{children}</StepPane>
      </Styled.Stepper>
      <Styled.StepContent>
        <StepContent activeStepKey={currentStepKey}>{children}</StepContent>
      </Styled.StepContent>
    </Styled.Container>
  );
};

export default StepperContent;
