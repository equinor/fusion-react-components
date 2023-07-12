import { Meta, Story } from '@storybook/react';
import { Stepper, Step, StepperProps } from '@equinor/fusion-react-stepper';
import { useState } from 'react';
import { Button } from '@equinor/fusion-react-button';

export default {
  title: 'Examples/Stepper',
  component: Stepper,
  argTypes: {
    activeStepKey: {
      description: 'Active step',
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    forceOrder: {
      description: 'Steps will have specific order',
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    verticalSteps: {
      description: 'Change stepper layout to vertical',
      type: { name: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    hideNavButtons: {
      description: 'Hide stepper navigation buttons',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onChange: {
      table: {
        type: { summary: '(stepKey: string) => void' },
      },
    },
  },
} as Meta;

const Item = (props: any) => {
  return (
    <div
      style={{
        padding: '20px',
        borderTop: '1px solid rgb(220, 220, 220)',
        boxSizing: 'border-box',
      }}
    >
      {props.children}
    </div>
  );
};

const Buttons = (props: any) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
      }}
    >
      {props.children}
    </div>
  );
};

export const Component: Story<StepperProps> = (props: StepperProps) => {
  return (
    <Stepper {...props}>
      <Step title="Select workspace and other work" description="Description example text" stepKey="step1">
        <Item>Select workspace</Item>
      </Step>
      <Step title="Select report/dashboard" description="Description" stepKey="step2">
        <Item>Select a report or dashboard</Item>
      </Step>
      <Step title="Fill in details" stepKey="step3">
        <Item>Specify details about refresh rate, data source etc.</Item>
      </Step>
      <Step title="Summary" stepKey="step4">
        <Item>Summary</Item>
      </Step>
      <Step title="Publish" stepKey="step5" disabled>
        <Item>Publish button</Item>
      </Step>
    </Stepper>
  );
};

Component.args = {
  activeStepKey: 'step2',
  forceOrder: false,
  hideNavButtons: false,
  verticalSteps: false,
};

export const ForceOrder: Story<StepperProps> = (props: StepperProps) => {
  const [activeStep, setActiveStepp] = useState<string>('contract');
  return (
    <Stepper {...props} activeStepKey={activeStep}>
      <Step title="Select contract" description="Shows available contracts" stepKey="contract">
        <Item>
          <h3>Choose Contract to import personnel from</h3>
          <p>Press the button to enable navigation to next step.</p>
          <Button onClick={() => setActiveStepp('personnel')}>Next</Button>
        </Item>
      </Step>
      <Step title="Select personnel" description="Choose personnel" stepKey="personnel">
        <Item>
          <h3>Select personnel from contract</h3>
          <p>
            Press the <b>next</b> button to enable navigation to "review" step. Or go <b>back</b>.
          </p>
          <Buttons>
            <Button variant="outlined" onClick={() => setActiveStepp('contract')}>
              Back
            </Button>
            <Button onClick={() => setActiveStepp('review')}>Next</Button>
          </Buttons>
        </Item>
      </Step>
      <Step title="Review selection" description="Check for mistakes" stepKey="review">
        <Item>
          <h3>Review persons who will be added to contract and set dates</h3>
          <p>Are you sure? Or do you want to go back?</p>
          <Buttons>
            <Button variant="outlined" onClick={() => setActiveStepp('personnel')}>
              Back
            </Button>
            <Button onClick={() => setActiveStepp('summary')}>Next</Button>
          </Buttons>
        </Item>
      </Step>
      <Step title="Summary" stepKey="summary" disabled>
        <Item>
          <h3>Summary</h3>
          <Button onClick={() => setActiveStepp('publish')}>FINISH IT!</Button>
        </Item>
      </Step>
      <Step title="Publish" stepKey="publish" disabled>
        <Item>
          <h3>Congrats, you have successfully added personnel to contract</h3>
          <Button onClick={() => setActiveStepp('contract')}>Reset</Button>
        </Item>
      </Step>
    </Stepper>
  );
};

ForceOrder.args = {
  forceOrder: true,
  hideNavButtons: true,
  verticalSteps: false,
};

export const Vertical: Story<StepperProps> = (props: StepperProps) => {
  return (
    <Stepper {...props}>
      <Step title="Select contract" description="Shows available contracts" stepKey="contract">
        <Item>Choose Contract to import personnel from</Item>
      </Step>
      <Step title="Select personnel" description="Choose personnel" stepKey="personnel">
        <Item>Select personnel from contract</Item>
      </Step>
      <Step title="Review selection" description="Check for mistakes" stepKey="review">
        <Item>Review persons who will be added to contract and set dates.</Item>
      </Step>
      <Step title="Summary" stepKey="summary">
        <Item>Summary</Item>
      </Step>
      <Step title="Publish" stepKey="publish">
        <Item>Congrats, you have successfully added personnel to contract</Item>
      </Step>
    </Stepper>
  );
};

Vertical.args = {
  activeStepKey: 'contract',
  forceOrder: false,
  hideNavButtons: false,
  verticalSteps: true,
};
