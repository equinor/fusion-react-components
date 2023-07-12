<!--prettier-ignore-start-->
# @equinor/fusion-react-stepper 

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-stepper.svg)](https://www.npmjs.com/package/@equinor/fusion-react-stepper)

# Stepper

## Properties/Attributes

### for stepper

Name                      | Type                            | Default                         | Description
------------------------- | -----------------------------   | -----------------------------   | -----------
`activeStepKey`           | `string`                        | `/`                             | Select/change active stepp, use *** stepKey ***. `required`
`forceOrder`              | `boolean`                       | `false`                         | Can't skip steps. Steps will have specific order.
`verticalSteps`           | `boolean`                       | `false`                         | Change stepper layout to vertical. Vertical positioning of steps.
`hideNavButtons`          | `boolean`                       | `false`                         | Show/hide next and previous navigation buttons for stepper.
`onChange`                | `(stepKey: string) => void`     |                                 | onChange event for active step.

### for step

Name                      | Type                            | Default                         | Description
------------------------- | -----------------------------   | -----------------------------   | -----------
`stepKey`                 | `string`                        | `/`                             | Step key of step. Used for *** activeStepKey ***. `required`
`title`                   | `string`                        | `/`                             | Title of step
`description`             | `string`                        | `/`                             | Description of step 
`disabled`                | `boolean`                       | `false`                         | Disable step. Can't be clicked, but can manually navigate to it


## Example Usage

```tsx
import { Stepper } from '@equinor/fusion-react-stepper';

<Stepper activeStepKey="step1" onChange={(e) => console.log('active: ', e)} props>
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

<!--prettier-ignore-end-->
