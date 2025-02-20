---
'@equinor/fusion-react-stepper': major
'@equinor/fusion-react-components-stories': patch
---

Changed implementation of the Stepper component from being uncontrolled to having a both an uncontrolled and controlled mode.

- Required 'activeStepKey' prop removed. Replaced with 'initialStepKey' and 'stepKey' (both optional)
- If 'stepKey' is set, then the component becomes controlled by that prop.
- If 'stepKey' is set and 'initialStepKey' is set, then the initial step will be that prop, but otherwise be uncontrolled.
- If none of these props are set then it will be uncontrolled, and default to the first step of the steps provided as the initial step.
- Updated 'Stepper' README and Storybook with examples of usage.

This is a breaking change since the 'activeStepKey' was required, and now needs to be either removed or replaced with one of the two new optional props.

## Migration guide:

### Uncontrolled usage:
```tsx
import { Stepper } from '@equinor/fusion-react-stepper';

/** initialStepKey here is optional. If not set it defaults to the first step ('step1') */
<Stepper initialStepKey="step1" onChange={(e, k) => console.log('active: ', e, ' keys: ', k)} props>
  <Step title="Title 1" stepKey="step1" props>
    Step content 1
  </Step>
  <Step title="Title 2" stepKey="step2" props>
    Step content 2
  </Step>
  <Step title="Title 3" stepKey="step3" props>
    Step content 3
  </Step>
</Stepper>
```

### Controlled usage:
```tsx
import { Stepper } from '@equinor/fusion-react-stepper';

const [activeStep, setActiveStep] = useState<string>('step1');
const onChangeStep = (stepKey: string, allSteps: StepKey[]) => {
    console.log('active: ', stepKey, ' keys: ', allSteps)
    if (activeStep !== stepKey) {
        setActiveStep(String(stepKey));
    }
};

return (
    <Stepper stepKey={activeStep} onChange={onChangeStep} props>
      <Step title="Title 1" stepKey="step1" props>
        Step content 1
      </Step>
      <Step title="Title 2" stepKey="step2" props>
        Step content 2
      </Step>
      <Step title="Title 3" stepKey="step3" props>
        Step content 3
      </Step>
    </Stepper>
);
```
