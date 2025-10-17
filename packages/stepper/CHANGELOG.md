# Change Log

## 3.0.0

### Major Changes

- fbc8188: React 19 compatibility fixes
  - Fixed TypeScript errors related to React 19 type changes
  - Updated `useRef` calls to provide initial values when type is explicitly specified
  - Fixed `HTMLDivElement` type usage to use `Partial<HTMLAttributes<HTMLDivElement>>`
  - Fixed `useFilterSelection` observable type handling for `Set<T>` return type
  - Added proper type annotations for web components
  - Updated component prop types to be compatible with React 19's stricter type checking

  Reference https://github.com/equinor/fusion/issues/696

  Devops: AB#65644

  Thanks to @AndreasPrestHammer for reporting this issue!

## 2.0.4

### Patch Changes

- 65d1b87: Refactor for Biome linter compliance
  - Update Biome configuration to version 2.2.5
  - Fix useEffect dependencies in Stepper component
  - Refactor SideSheet Top component to fix linter warnings
  - Add proper biome-ignore comments for necessary `any` types

## 2.0.3

### Patch Changes

- 0a46182: - Updated workflows `actions/upload-artifact` version
  - Updated `useEffect` dependencies and logic for step change and scroll handling.

## 2.0.2

### Patch Changes

- 63b7e92: Change to biome linting rules

## 2.0.1

### Patch Changes

- f989cb4: re-release, no changes

## 2.0.0

### Major Changes

- eba9cf6: Changed implementation of the Stepper component from being uncontrolled to having a both an uncontrolled and controlled mode.
  - Required 'activeStepKey' prop removed. Replaced with 'initialStepKey' and 'stepKey' (both optional)
  - If 'stepKey' is set, then the component becomes controlled by that prop.
  - If 'stepKey' is set and 'initialStepKey' is set, then the initial step will be that prop, but otherwise be uncontrolled.
  - If none of these props are set then it will be uncontrolled, and default to the first step of the steps provided as the initial step.
  - Updated 'Stepper' README and Storybook with examples of usage.

  This is a breaking change since the 'activeStepKey' was required, and now needs to be either removed or replaced with one of the two new optional props.

  ## Migration guide:

  ### Uncontrolled usage:

  ```tsx
  import { Stepper } from "@equinor/fusion-react-stepper";

  /** initialStepKey here is optional. If not set it defaults to the first step ('step1') */
  <Stepper
    initialStepKey="step1"
    onChange={(e, k) => console.log("active: ", e, " keys: ", k)}
    props
  >
    <Step title="Title 1" stepKey="step1" props>
      Step content 1
    </Step>
    <Step title="Title 2" stepKey="step2" props>
      Step content 2
    </Step>
    <Step title="Title 3" stepKey="step3" props>
      Step content 3
    </Step>
  </Stepper>;
  ```

  ### Controlled usage:

  ```tsx
  import { Stepper } from "@equinor/fusion-react-stepper";

  const [activeStep, setActiveStep] = useState<string>("step1");
  const onChangeStep = (stepKey: string, allSteps: StepKey[]) => {
    console.log("active: ", stepKey, " keys: ", allSteps);
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

## 1.0.1

### Patch Changes

- cd87cca: Updating @equinor/eds-core-react to 0.37.0

## 1.0.0

### Major Changes

- e090af2: ### Stepper major update
  - Swap old style with styled-components
  - Usage of EDS tokens
  - Rework of stepper to use context for better passing of data
  - **New feature:** Divider on stepper can be added/removed

## 0.4.4

### Patch Changes

- 13c0ca4: deprecated `@equinor/fusion-react-button`
- 5e10a53: removed `@equinor/fusion-react-icon`

## 0.4.3

### Patch Changes

- 2fee8065: Stepper height

## 0.4.2

### Patch Changes

- 2b4e9e1e: Remove unused property

## 0.4.1

### Patch Changes

- cc41a1a9: build(deps): bump @equinor/eds-core-react from 0.30.0 to 0.34.0

## 0.4.0

### Minor Changes

- 6698455c: **New Feature** - Horizontal Title available in Stepper

## 0.3.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- 60e68683: fixed missing dependencies
- Updated dependencies [60e68683]
  - @equinor/fusion-react-styles@0.6.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 0.2.2 (2023-09-21)

**Note:** Version bump only for package @equinor/fusion-react-stepper

## 0.2.1 (2023-09-18)

### Bug Fixes

- **react-components:** lint warnings ([959adb4](https://github.com/equinor/fusion-react-components/commit/959adb4f470016f3873733ad60a9317023d3b5a1))

# 0.2.0 (2023-08-25)

### Bug Fixes

- **stepper:** force order ([a12758a](https://github.com/equinor/fusion-react-components/commit/a12758a893d6e6e670f0f452866c9a68dcd968c2))

### Features

- **stepper:** button and icon from EDS ([5d11aec](https://github.com/equinor/fusion-react-components/commit/5d11aec43c5fbfe9e6a589792bf03a469271d069))
- **stepper:** stepper update ([e2029cc](https://github.com/equinor/fusion-react-components/commit/e2029cc7248c712b98c7d9c6b5e8efc2aca9343d))

## [0.1.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-stepper@0.1.2...@equinor/fusion-react-stepper@0.1.3) (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-stepper

## 0.1.2 (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-stepper

## [0.1.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-stepper@0.1.0...@equinor/fusion-react-stepper@0.1.1) (2023-07-13)

**Note:** Version bump only for package @equinor/fusion-react-stepper

# 0.1.0 (2023-07-12)

### Features

- **stepper:** stepper component ([7030995](https://github.com/equinor/fusion-react-components/commit/7030995566b62cc7244f05767f25eea12a2978d2))
