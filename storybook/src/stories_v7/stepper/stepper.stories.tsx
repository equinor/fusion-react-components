/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Stepper, type StepperProps } from '@equinor/fusion-react-stepper/src/Stepper';
import { Step } from '@equinor/fusion-react-stepper/src/Step';

import { Button } from '@equinor/eds-core-react';
import { faker } from '@faker-js/faker';

const meta: Meta<StepperProps> = {
  title: 'ui/Stepper',
  component: Stepper,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const basic: Story = {
  args: {
    activeStepKey: '0',
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

export const vertical: Story = {
  ...basic,
  args: {
    activeStepKey: '0',
    verticalSteps: true,
  },
};

export const controlled: Story = {
  args: {
    activeStepKey: '0',
    hideNavButtons: true,
    forceOrder: true,
  },
  render: (props) => {
    faker.seed(2);
    const [activeStep, setActiveStep] = useState<number>(0);
    const steps = 5;
    return (
      <Stepper {...props} activeStepKey={String(activeStep)}>
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
