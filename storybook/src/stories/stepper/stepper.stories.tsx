/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { StepKeys, Stepper, Step } from '@equinor/fusion-react-stepper';

import { Button } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';

const meta: Meta<typeof Stepper> = {
  title: 'ui/Stepper',
  component: Stepper,
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const basicUncontrolled: Story = {
  args: {
    initialStepKey: '0',
    onChange: (e, k) => console.log('active: ', e, ' keys: ', k),
  },
  render: (props) => {
    faker.seed(1);
    return (
      <Stepper {...props}>
        {[...Array(5)].map((_, index) => (
          <Step key={index} title={faker.lorem.word()} description={faker.lorem.words()} stepKey={String(index)}>
            <div style={{ padding: 10 }}>
              <p>{faker.lorem.paragraphs()}</p>
            </div>
          </Step>
        ))}
      </Stepper>
    );
  },
};

export const verticalUncontrolled: Story = {
  ...basicUncontrolled,
  args: {
    initialStepKey: '0',
    verticalSteps: true,
  },
};

export const controlled: Story = {
  args: {
    initialStepKey: '0',
  },
  render: (props) => {
    const [activeStep, setActiveStep] = useState<string>('0');
    const onChangeStep = (stepKey: string, allSteps: StepKeys) => {
      console.log('active: ', stepKey, ' keys: ', allSteps);
      if (activeStep !== stepKey) {
        setActiveStep(String(stepKey));
      }
    };
    faker.seed(1);
    return (
      <Stepper {...props} stepKey={activeStep} onChange={onChangeStep}>
        {[...Array(5)].map((_, index) => (
          <Step key={index} title={faker.lorem.word()} description={faker.lorem.words()} stepKey={String(index)}>
            <div style={{ padding: 10 }}>
              <p>{faker.lorem.paragraphs()}</p>
            </div>
          </Step>
        ))}
      </Stepper>
    );
  },
};

export const controlledWithExternalButtons: Story = {
  args: {
    initialStepKey: '0',
    hideNavButtons: true,
    forceOrder: true,
  },
  render: (props) => {
    faker.seed(2);
    const [activeStep, setActiveStep] = useState<number>(0);
    const steps = 5;
    return (
      <Stepper {...props} stepKey={String(activeStep)}>
        {[...Array(steps)].map((_, index) => (
          <Step key={index} title={faker.lorem.word()} description={faker.lorem.words()} stepKey={String(index)}>
            <div style={{ padding: 10 }}>
              <p>{faker.lorem.paragraphs()}</p>
              <div style={{ display: 'flex' }}>
                {index > 0 && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setActiveStep(index - 1);
                    }}
                  >
                    <span>Previous page</span>
                  </Button>
                )}
                {index < steps - 1 && (
                  <Button
                    onClick={() => {
                      setActiveStep(index + 1);
                    }}
                    style={{ marginLeft: 'auto' }}
                  >
                    <span>Next page</span>
                  </Button>
                )}
              </div>
            </div>
          </Step>
        ))}
      </Stepper>
    );
  },
};
