# Change Log

## 4.2.10

### Patch Changes

- 6158e18: ## Fusion React Tabs

  Add new `@equinor/fusion-react-tabs` component to:

  - Fusion React Components
  - Storybook with examples

  ### Features

  - The ability to float the tabs to the right or left of the screen
  - The ability to set a specific height for the tabs and provide a scroll bar if the tabs exceed the height
  - Default behavior of line under the tabs, and can be disabled. This is just a visual design change, and does not affect the functionality of the tabs
  - Exposed internal hook for use in custom tabs

- ca2debc: - Fixed display of URL when tab id contains symbols like `&`
  - Storybook alignment
- Updated dependencies [6158e18]
- Updated dependencies [ca2debc]
  - @equinor/fusion-react-tabs@1.0.0

## 4.2.9

### Patch Changes

- Updated dependencies [0a46182]
  - @equinor/fusion-react-stepper@2.0.3

## 4.2.8

### Patch Changes

- Updated dependencies [63b7e92]
  - @equinor/fusion-react-ag-grid-person-cell@2.0.5
  - @equinor/fusion-react-searchable-dropdown@1.0.5
  - @equinor/fusion-react-context-selector@1.0.5
  - @equinor/fusion-react-ag-grid-utils@32.0.1
  - @equinor/fusion-react-errorboundary@1.0.7
  - @equinor/fusion-react-side-sheet@1.3.9
  - @equinor/fusion-react-markdown@0.3.5
  - @equinor/fusion-react-skeleton@0.3.3
  - @equinor/fusion-react-textarea@0.6.5
  - @equinor/fusion-react-stepper@2.0.2
  - @equinor/fusion-react-filter@1.8.7
  - @equinor/fusion-react-person@0.10.5
  - @equinor/fusion-react-ripple@0.4.5
  - @equinor/fusion-react-styles@0.6.5
  - @equinor/fusion-react-date@0.5.4
  - @equinor/fusion-react-list@0.3.5
  - @equinor/fusion-react-hanging-garden@1.7.8

## 4.2.7

### Patch Changes

- bb8d6ca: Updates person provider story

## 4.2.6

### Patch Changes

- 7893f55: Example story for PersonProvider

## 4.2.5

### Patch Changes

- 87e1f2c: Fixes storybook build issues with @react-aria

## 4.2.4

### Patch Changes

- Updated dependencies [0ed5abc]
- Updated dependencies [2123709]
  - @equinor/fusion-react-errorboundary@1.0.6
  - @equinor/fusion-react-side-sheet@1.3.8

## 4.2.3

### Patch Changes

- Updated dependencies [dcaa3e6]
  - @equinor/fusion-react-person@0.10.4
  - @equinor/fusion-react-ag-grid-person-cell@2.0.4

## 4.2.2

### Patch Changes

- Updated dependencies [eab8811]
  - @equinor/fusion-react-side-sheet@1.3.7

## 4.2.1

### Patch Changes

- Updated dependencies [267dd50]
  - @equinor/fusion-react-side-sheet@1.3.6

## 4.2.0

### Minor Changes

- 8a5ddb6: Update 'ag-grid-utils' to AG-Grid 33

### Patch Changes

- Updated dependencies [c4c7db2]
- Updated dependencies [8a5ddb6]
  - @equinor/fusion-react-searchable-dropdown@1.0.4
  - @equinor/fusion-react-context-selector@1.0.4
  - @equinor/fusion-react-ag-grid-utils@32.0.0

## 4.1.15

### Patch Changes

- f989cb4: re-release, no changes
- Updated dependencies [f989cb4]
  - @equinor/fusion-react-ag-grid-person-cell@2.0.3
  - @equinor/fusion-react-ag-grid-utils@31.2.4
  - @equinor/fusion-react-context-selector@1.0.3
  - @equinor/fusion-react-date@0.5.3
  - @equinor/fusion-react-errorboundary@1.0.5
  - @equinor/fusion-react-filter@1.8.6
  - @equinor/fusion-react-hanging-garden@1.7.7
  - @equinor/fusion-react-list@0.3.4
  - @equinor/fusion-react-markdown@0.3.4
  - @equinor/fusion-react-person@0.10.3
  - @equinor/fusion-react-ripple@0.4.4
  - @equinor/fusion-react-searchable-dropdown@1.0.3
  - @equinor/fusion-react-side-sheet@1.3.5
  - @equinor/fusion-react-skeleton@0.3.2
  - @equinor/fusion-react-stepper@2.0.1
  - @equinor/fusion-react-styles@0.6.4
  - @equinor/fusion-react-textarea@0.6.4

## 4.1.14

### Patch Changes

- 167c674: removed `@equinor/fusion-react-ag-grid-styles`
- a1c95c3: fixed deps for ag-grid
- 0d6c000: fix deps of ag-grid
- Updated dependencies [a1c95c3]
- Updated dependencies [0d6c000]
  - @equinor/fusion-react-ag-grid-person-cell@2.0.2
  - @equinor/fusion-react-searchable-dropdown@1.0.2
  - @equinor/fusion-react-context-selector@1.0.2
  - @equinor/fusion-react-markdown@0.3.3
  - @equinor/fusion-react-skeleton@0.3.1
  - @equinor/fusion-react-textarea@0.6.3
  - @equinor/fusion-react-filter@1.8.5
  - @equinor/fusion-react-person@0.10.2
  - @equinor/fusion-react-ripple@0.4.3
  - @equinor/fusion-react-styles@0.6.3
  - @equinor/fusion-react-date@0.5.2
  - @equinor/fusion-react-list@0.3.3
  - @equinor/fusion-react-hanging-garden@1.7.6

## 4.1.13

### Patch Changes

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

- Updated dependencies [eba9cf6]
  - @equinor/fusion-react-stepper@2.0.0

## 4.1.12

### Patch Changes

- 2606cc9: Update eds-core-react deps
- Updated dependencies [2606cc9]
  - @equinor/fusion-react-ag-grid-person-cell@2.0.1
  - @equinor/fusion-react-ag-grid-utils@31.2.3
  - @equinor/fusion-react-errorboundary@1.0.4

## 4.1.11

### Patch Changes

- Updated dependencies [1e9192e]
  - @equinor/fusion-react-searchable-dropdown@1.0.1
  - @equinor/fusion-react-context-selector@1.0.1
  - @equinor/fusion-react-textarea@0.6.2

## 4.1.10

### Patch Changes

- 3262b56: Updating PersonAvatar story with dataSource
- Updated dependencies [80f579c]
  - @equinor/fusion-react-ag-grid-person-cell@2.0.0

## 4.1.9

### Patch Changes

- e277474: Implementing fixes from searchable-dropdown web component release [44aa0a8](https://github.com/equinor/fusion-web-components/commit/44aa0a8b744e873e19ee6fa9e92da0bd8c3031d8)

  This fixes multiple selections in searchable-dropdown and adding support for using html as meta icons in the result set.

  also fixes using attribute `selectedId` as preselected id, works best with initialItems from resolver.

  Updating to major version to make sure nothing in production brakes.

- Updated dependencies [e277474]
  - @equinor/fusion-react-searchable-dropdown@1.0.0
  - @equinor/fusion-react-context-selector@1.0.0

## 4.1.8

### Patch Changes

- f461f22: Person component dependencies update
- Updated dependencies [f461f22]
  - @equinor/fusion-react-person@0.10.1
  - @equinor/fusion-react-ag-grid-person-cell@1.0.7

## 4.1.7

### Patch Changes

- Updated dependencies [f449132]
  - @equinor/fusion-react-side-sheet@1.3.4

## 4.1.6

### Patch Changes

- 0a37ed6: AgGrid person cell update of:

  - Storybook
  - Dependencies

  Person update deps

- Updated dependencies [b3c5d1a]
- Updated dependencies [0a37ed6]
  - @equinor/fusion-react-person@0.10.0
  - @equinor/fusion-react-ag-grid-person-cell@1.0.6
  - @equinor/fusion-react-context-selector@0.6.8

## 4.1.5

### Patch Changes

- Updated dependencies [51067ef]
  - @equinor/fusion-react-person@0.9.5
  - @equinor/fusion-react-ag-grid-person-cell@1.0.5

## 4.1.4

### Patch Changes

- c7315b8: ### Package `@equinor/fusion-react-ag-grid-styles`

  Changed export statement

  - `export { useStyles, useStyles as default } from './agGridStyles';`
  - Renamed `useAgGridStyles.ts` to `index.ts` in `ag-grid-styles` package.

  ### Storybook

  Updated import paths and usage of `useAgGridStyles` to `useStyles` in `storybook` stories.

- Updated dependencies [9bb2fde]
- Updated dependencies [c7315b8]
- Updated dependencies [b20f7ec]
  - @equinor/fusion-react-errorboundary@1.0.3
  - @equinor/fusion-react-ag-grid-styles@31.2.5
  - @equinor/fusion-react-person@0.9.4
  - @equinor/fusion-react-ag-grid-person-cell@1.0.4

## 4.1.3

### Patch Changes

- Updated dependencies [6af9c2c]
  - @equinor/fusion-react-hanging-garden@1.7.5
  - @equinor/fusion-react-ag-grid-person-cell@1.0.3
  - @equinor/fusion-react-context-selector@0.6.7
  - @equinor/fusion-react-person@0.9.3

## 4.1.2

### Patch Changes

- 49389d4: AgGrid person cell update of:

  - Storybook
  - Dependencies

- Updated dependencies [49389d4]
  - @equinor/fusion-react-ag-grid-person-cell@1.0.2
  - @equinor/fusion-react-person@0.9.2

## 4.1.1

### Patch Changes

- f66e689: - Update fwc-person to v3.0.1
  - Ads example in storybook for using person-select as controlled component
- Updated dependencies [f66e689]
  - @equinor/fusion-react-person@0.9.1
  - @equinor/fusion-react-ag-grid-person-cell@1.0.1

## 4.1.0

### Minor Changes

- bb95029: ### New component: `agGridPersonCell`

  React component for displaying person details in AgGrid cell and PersonCard on cell hover.

  - Introduced `agGridPersonCell` for integrating person details into AgGrid cells.
  - Customizable `heading`, `subHeading`, `size`, and `showAvatar` options.
  - Allows mapping complex data structures for fields like `azureId`, `upn`, and `dataSource`.
  - Supports custom HTML for `heading` and `subHeading` to enable rich content in cells.
  - Added support for custom sorting logic with `dataToSort`. **_!Note_** Allows only usage of cell's data, not provider data.

### Patch Changes

- Updated dependencies [bb95029]
- Updated dependencies [bb95029]
  - @equinor/fusion-react-person@0.9.0
  - @equinor/fusion-react-ag-grid-person-cell@1.0.0

## 4.0.9

### Patch Changes

- Updated dependencies [8516c49]
  - @equinor/fusion-react-context-selector@0.6.6

## 4.0.8

### Patch Changes

- b76ff35: build(deps-dev): bump the ag-grid group across 1 directory with 4 updates

  Updating ag-grid to 32.0.2

- Updated dependencies [b76ff35]
  - @equinor/fusion-react-ag-grid-styles@31.2.4
  - @equinor/fusion-react-ag-grid-utils@31.2.2

## 4.0.7

### Patch Changes

- Updated dependencies [b44a91b]
- Updated dependencies [e63b6a5]
  - @equinor/fusion-react-side-sheet@1.3.3
  - @equinor/fusion-react-person@0.8.8

## 4.0.6

### Patch Changes

- Updated dependencies [c1b0c41]
  - @equinor/fusion-react-person@0.8.7

## 4.0.5

### Patch Changes

- e0ef826: Updating to storybook 8.1.5

## 4.0.4

### Patch Changes

- Updated dependencies [c8c33c2]
  - @equinor/fusion-react-ag-grid-styles@31.2.3

## 4.0.3

### Patch Changes

- 5399cea: Updating aggrid to latest licenced version
- Updated dependencies [5399cea]
  - @equinor/fusion-react-ag-grid-styles@31.2.2
  - @equinor/fusion-react-ag-grid-utils@31.2.1

## 4.0.2

### Patch Changes

- cd87cca: Updating @equinor/eds-core-react to 0.37.0
- 24c0c16: Searchabledropdown uses faker data in provider
- 9b060db: Return type of PersonProvider and PersonSelect, Person story cleanup of user data.
- Updated dependencies [cd87cca]
- Updated dependencies [9b060db]
  - @equinor/fusion-react-side-sheet@1.3.2
  - @equinor/fusion-react-stepper@1.0.1
  - @equinor/fusion-react-filter@1.8.4
  - @equinor/fusion-react-person@0.8.6

## 4.0.1

### Patch Changes

- Updated dependencies [aff7950]
  - @equinor/fusion-react-ag-grid-styles@31.2.1

## 4.0.0

### Major Changes

- f63ddce: Update to storybook v8 and align all stories with the new version.

## 3.0.8

### Patch Changes

- 43978ba: Aligning aggrid version with framework
- Updated dependencies [f6f1697]
- Updated dependencies [5e6301d]
- Updated dependencies [43978ba]
  - @equinor/fusion-react-list@0.3.2
  - @equinor/fusion-react-ag-grid-styles@31.2.0
  - @equinor/fusion-react-ag-grid-utils@31.2.0

## 3.0.7

### Patch Changes

- Updated dependencies [cb48ef2]
  - @equinor/fusion-react-person@0.8.5

## 3.0.6

### Patch Changes

- Updated dependencies [1d3cff3]
  - @equinor/fusion-react-styles@0.6.2
  - @equinor/fusion-react-context-selector@0.6.5
  - @equinor/fusion-react-hanging-garden@1.7.4

## 3.0.5

### Patch Changes

- Updated dependencies [944be6b]
  - @equinor/fusion-react-context-selector@0.6.4

## 3.0.4

### Patch Changes

- Updated dependencies [f0edb6e]
  - @equinor/fusion-react-context-selector@0.6.3

## 3.0.3

### Patch Changes

- 498d186: Maintenace, update of web component and other dependencies, to make disabled and error list item visible again
- Updated dependencies [498d186]
  - @equinor/fusion-react-searchable-dropdown@0.5.2
  - @equinor/fusion-react-context-selector@0.6.2

## 3.0.2

### Patch Changes

- Updated dependencies [3931c44]
  - @equinor/fusion-react-person@0.8.4

## 3.0.1

### Patch Changes

- 549832a: Storybook PersonProvider support for searching by upn and azureId
- Updated dependencies [498d0a9]
  - @equinor/fusion-react-person@0.8.3

## 3.0.0

### Major Changes

- d07f10a: updated all stories to Storybook 7.

  > [!NOTE]
  > Since multiple PR has been submitted and merged since the start of upgrade, new stories are under the folder `stories_v7`
  >
  > Developers that has contributed and altered existing stories **must** refactor to the new storybook.
  >
  > When all stories has been migrated, the `stories` folder, must be deleted, and `stories_v7` have the suffix removed.

  > [!IMPORTANT]
  > Some stories might take too much effort to migrate _(like `Hanging garden`)_, these should be move to `__TODO__` folder, so it can be triage for later

### Patch Changes

- Updated dependencies [d07f10a]
- Updated dependencies [d07f10a]
  - @equinor/fusion-react-side-sheet@1.3.1
  - @equinor/fusion-react-searchable-dropdown@0.5.1
  - @equinor/fusion-react-context-selector@0.6.1
  - @equinor/fusion-react-markdown@0.3.2
  - @equinor/fusion-react-filter@1.8.3
  - @equinor/fusion-react-person@0.8.2
  - @equinor/fusion-react-ripple@0.4.2

## 2.21.6

### Patch Changes

- Updated dependencies [3c7521e]
  - @equinor/fusion-react-person@0.8.1

## 2.21.5

### Patch Changes

- 3f20acf: Docs for PersonSelect attribute `selectedPerson`
- e090af2: ### Stepper major update
  - Swap old style with styled-components
  - Usage of EDS tokens
  - Rework of stepper to use context for better passing of data
  - **New feature:** Divider on stepper can be added/removed
- Updated dependencies [e090af2]
  - @equinor/fusion-react-stepper@1.0.0

## 2.21.4

### Patch Changes

- Updated dependencies [947df08]
  - @equinor/fusion-react-person@0.8.0

## 2.21.3

### Patch Changes

- Updated dependencies [1445e4e]
  - @equinor/fusion-react-person@0.7.0

## 2.21.2

### Patch Changes

- Updated dependencies [bc05316]
  - @equinor/fusion-react-list@0.3.1

## 2.21.1

### Patch Changes

- Updated dependencies [97ff612]
  - @equinor/fusion-react-person@0.6.6

## 2.21.0

### Minor Changes

- 388302a: bump @equinor/fusion-wc-searchable-dropdown to 3.7.0 + update storybook

### Patch Changes

- 5e10a53: - In the `packages/errorboundary/package.json` file:
  - The dependency `@equinor/fusion-react-icon` with version `^0.3.0` has been removed.
  - In the `packages/icon/README.md` file:
    - The entire content has been replaced with a deprecation notice.
  - In the `storybook/package.json` file:
    - The dependency `@equinor/fusion-react-icon` with version `^0.3.0` has been removed.
  - In the `storybook/src/stories/button/button-link.stories.mdx` file:
    - The line mentioning `@equinor/fusion-react-icon` has been replaced with a reference to using EDS (Equinor Design System) for icons.
  - In the `storybook/src/stories/button/button-link.stories.tsx` file:
    - The import statement for `@equinor/fusion-react-icon` has been replaced with an import statement for `@equinor/fusion-wc-icon`.
  - In the `storybook/src/stories/button/button.stories.tsx` file:
    - The import statement for `@equinor/fusion-react-icon` has been replaced with an import statement for `@equinor/fusion-wc-icon`.
- 13c0ca4: deprecated `@equinor/fusion-react-button`
- Updated dependencies [5e10a53]
- Updated dependencies [388302a]
- Updated dependencies [13c0ca4]
- Updated dependencies [5e10a53]
  - @equinor/fusion-react-errorboundary@1.0.2
  - @equinor/fusion-react-searchable-dropdown@0.5.0
  - @equinor/fusion-react-context-selector@0.6.0
  - @equinor/fusion-react-stepper@0.4.4
  - @equinor/fusion-react-filter@1.8.2
  - @equinor/fusion-react-person@0.6.5
  - @equinor/fusion-react-ag-grid-utils@30.2.2

## 2.20.1

### Patch Changes

- 8f4b910: - In the `packages/errorboundary/package.json` file:
  - The dependency `@equinor/fusion-react-icon` with version `^0.3.0` has been removed.
  - In the `packages/icon/README.md` file:
    - The entire content has been replaced with a deprecation notice.
  - In the `storybook/package.json` file:
    - The dependency `@equinor/fusion-react-icon` with version `^0.3.0` has been removed.
  - In the `storybook/src/stories/button/button-link.stories.mdx` file:
    - The line mentioning `@equinor/fusion-react-icon` has been replaced with a reference to using EDS (Equinor Design System) for icons.
  - In the `storybook/src/stories/button/button-link.stories.tsx` file:
    - The import statement for `@equinor/fusion-react-icon` has been replaced with an import statement for `@equinor/fusion-wc-icon`.
  - In the `storybook/src/stories/button/button.stories.tsx` file:
    - The import statement for `@equinor/fusion-react-icon` has been replaced with an import statement for `@equinor/fusion-wc-icon`.
- cb99230: **@equinor/fusion-react-ag-grid-utils:**

  - Updated README
  - updated Ag Grid to `~30.2.0`
  - refactor compare function (lifted resolve of comparer)
  - fixed value getter for status field (triggers change check)
  - changed styling from fusion-style to styled components
  - replaced fusion icon with EDS icon

  **@equinor/fusion-react-storybook:**

  - added example for using change-handler and status component
  - cleaned up deps

- Updated dependencies [2a0cbfd]
- Updated dependencies [8f4b910]
- Updated dependencies [cb99230]
  - @equinor/fusion-react-context-selector@0.5.5
  - @equinor/fusion-react-errorboundary@1.0.1
  - @equinor/fusion-react-ag-grid-utils@30.2.1

## 2.20.0

### Minor Changes

- a0a521d: Adding the ability to toggle the side-sheet animation, by passing `boolean` to the `animate` prop
  - Fixing the full-screen button
  - Updating eds packages
  - Fixing indicator size according to ux request now 8px

### Patch Changes

- Updated dependencies [a0a521d]
  - @equinor/fusion-react-side-sheet@1.3.0

## 2.19.11

### Patch Changes

- 9b7ef80: Change to component.stories.mdx:

  - Modified the imports.
  - Updated the StoryExample calls.

  Change to examples.stories.tsx:

  - Modified the imports.
  - Updated the Component story to use SkeletonSize.Medium.
  - Added new stories for different variations of the Skeleton component:
    - WithText: Displays the skeleton with text.
    - WithCustomColor: Displays the skeleton with a custom fill color and ink color.
    - Sizes: Displays the skeleton in different sizes.
    - Variants: Displays the skeleton with different variants.
    - Variants: Displays the skeleton with different variants.

- Updated dependencies [fbf66eb]
  - @equinor/fusion-react-hanging-garden@1.7.3
  - @equinor/fusion-react-context-selector@0.5.4

## 2.19.10

### Patch Changes

- Updated dependencies [c719c248]
  - @equinor/fusion-react-side-sheet@1.2.5

## 2.19.9

### Patch Changes

- c6f9fb71: Fixing props not working on person-select component
- Updated dependencies [c6f9fb71]
  - @equinor/fusion-react-person@0.6.4

## 2.19.8

### Patch Changes

- Updated dependencies [56dd4331]
- Updated dependencies [56dd4331]
  - @equinor/fusion-react-context-selector@0.5.3

## 2.19.7

### Patch Changes

- Updated dependencies [2fee8065]
- Updated dependencies [0baac88f]
- Updated dependencies [2fee8065]
  - @equinor/fusion-react-stepper@0.4.3
  - @equinor/fusion-react-person@0.6.3
  - @equinor/fusion-react-side-sheet@1.2.4

## 2.19.6

### Patch Changes

- Updated dependencies [2b4e9e1e]
- Updated dependencies [38ba120f]
  - @equinor/fusion-react-stepper@0.4.2
  - @equinor/fusion-react-filter@1.8.1

## 2.19.5

### Patch Changes

- Updated dependencies [402ba2a8]
  - @equinor/fusion-react-errorboundary@1.0.0

## 2.19.4

### Patch Changes

- cc41a1a9: build(deps): bump @equinor/eds-core-react from 0.30.0 to 0.34.0
- Updated dependencies [cc41a1a9]
- Updated dependencies [8a503fcc]
  - @equinor/fusion-react-side-sheet@1.2.3
  - @equinor/fusion-react-stepper@0.4.1
  - @equinor/fusion-react-menu@0.3.0

## 2.19.3

### Patch Changes

- Updated dependencies [f11bc7ad]
  - @equinor/fusion-react-popover@0.3.0

## 2.19.2

### Patch Changes

- Updated dependencies [974e5315]
  - @equinor/fusion-react-table@0.7.0

## 2.19.1

### Patch Changes

- Updated dependencies [82e8cb02]
- Updated dependencies [b0758ca7]
  - @equinor/fusion-react-radio@0.6.0
  - @equinor/fusion-react-filter@1.8.0

## 2.19.0

### Minor Changes

- eb2def65: deprecated

### Patch Changes

- Updated dependencies [9fb0891c]
  - @equinor/fusion-react-textinput@0.8.0
  - @equinor/fusion-react-filter@1.7.1

## 2.18.3

### Patch Changes

- Updated dependencies [5395610f]
  - @equinor/fusion-react-switch@0.6.0

## 2.18.2

### Patch Changes

- Updated dependencies [aabee34f]
  - @equinor/fusion-react-select@0.3.0

## 2.18.1

### Patch Changes

- Updated dependencies [e7568ae1]
  - @equinor/fusion-react-progress-indicator@0.3.0

## 2.18.0

### Minor Changes

- 5854d91a: deprecate @equinor/fusion-react-checkbox

### Patch Changes

- Updated dependencies [5854d91a]
  - @equinor/fusion-react-checkbox@0.7.0
  - @equinor/fusion-react-filter@1.7.0

## 2.17.7

### Patch Changes

- f3e50576: expose `trigger` attribute from avatar
- 6698455c: **New Feature** - Horizontal Title available in Stepper
- Updated dependencies [6698455c]
  - @equinor/fusion-react-stepper@0.4.0

## 2.17.6

### Patch Changes

- b762221a: removed `@equinor/fusion-react-chip`
- 69654898: deprecated @equinor/fusion-react-observable
- Updated dependencies [b762221a]
- Updated dependencies [69654898]
  - @equinor/fusion-react-filter@1.6.0

## 2.17.5

### Patch Changes

- 35ae000b: deprecated chip
- Updated dependencies [35ae000b]
  - @equinor/fusion-react-chip@0.5.0

## 2.17.4

### Patch Changes

- e1671b1d: remove badge

## 2.17.3

### Patch Changes

- 8f06ece9: removed divider component
- Updated dependencies [f3a758bf]
  - @equinor/fusion-react-badge@0.5.0

## 2.17.2

### Patch Changes

- f5f6371b: removed avatar
- Updated dependencies [811bc4ea]
  - @equinor/fusion-react-divider@0.4.0

## 2.17.1

### Patch Changes

- Updated dependencies [c2faab01]
  - @equinor/fusion-react-avatar@0.5.0

## 2.17.0

### Minor Changes

- 60e68683: change package manager from NPM to PNPM

  only code refactor, but deps and peer-deps might change and cause unexpected changes

### Patch Changes

- Updated dependencies [60e68683]
- Updated dependencies [60e68683]
  - @equinor/fusion-react-context-selector@0.5.0
  - @equinor/fusion-react-markdown@0.3.0
  - @equinor/fusion-react-stepper@0.3.0
  - @equinor/fusion-react-button@0.9.0
  - @equinor/fusion-react-filter@1.5.0
  - @equinor/fusion-react-searchable-dropdown@0.4.0
  - @equinor/fusion-react-progress-indicator@0.2.0
  - @equinor/fusion-react-ag-grid-styles@30.0.0
  - @equinor/fusion-react-hanging-garden@1.7.0
  - @equinor/fusion-react-errorboundary@0.2.0
  - @equinor/fusion-react-breadcrumb@0.2.0
  - @equinor/fusion-react-datepicker@0.12.0
  - @equinor/fusion-react-observable@1.2.0
  - @equinor/fusion-react-side-sheet@1.1.0
  - @equinor/fusion-react-typography@0.2.0
  - @equinor/fusion-react-textinput@0.7.0
  - @equinor/fusion-react-checkbox@0.6.0
  - @equinor/fusion-react-skeleton@0.3.0
  - @equinor/fusion-react-textarea@0.6.0
  - @equinor/fusion-react-divider@0.3.0
  - @equinor/fusion-react-popover@0.2.0
  - @equinor/fusion-react-tooltip@1.2.0
  - @equinor/fusion-react-avatar@0.4.0
  - @equinor/fusion-react-person@0.6.0
  - @equinor/fusion-react-ripple@0.4.0
  - @equinor/fusion-react-select@0.2.0
  - @equinor/fusion-react-styles@0.6.0
  - @equinor/fusion-react-switch@0.5.0
  - @equinor/fusion-react-badge@0.4.0
  - @equinor/fusion-react-radio@0.5.0
  - @equinor/fusion-react-table@0.6.0
  - @equinor/fusion-react-chip@0.4.0
  - @equinor/fusion-react-date@0.5.0
  - @equinor/fusion-react-icon@0.3.0
  - @equinor/fusion-react-list@0.3.0
  - @equinor/fusion-react-menu@0.2.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.16.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.16.1...@equinor/fusion-react-components-stories@2.16.2) (2023-10-03)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.16.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.16.0...@equinor/fusion-react-components-stories@2.16.1) (2023-09-29)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [2.16.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.15.0...@equinor/fusion-react-components-stories@2.16.0) (2023-09-28)

### Bug Fixes

- **person-components:** azureId and upn ([a6e1936](https://github.com/equinor/fusion-react-components/commit/a6e1936c86f0bfc6b307fb41677daba2974f4c44))
- **person-components:** card args ([f5fea65](https://github.com/equinor/fusion-react-components/commit/f5fea654a38661136e18902d8a8a2a4a020a3a8a))
- **person-components:** provider update ([8b4cd0d](https://github.com/equinor/fusion-react-components/commit/8b4cd0d3bdb3dd1beb68e76baa6088985bb4715b))
- **person-components:** rename mock ([f3d1549](https://github.com/equinor/fusion-react-components/commit/f3d1549ac3a4d52192a9c37de8d6169e3190c18d))
- **person-components:** storybook ([2f66754](https://github.com/equinor/fusion-react-components/commit/2f667543b0d245656bcc4706c6a10d2f4b8ff986))
- **person-components:** storybook select ([0178452](https://github.com/equinor/fusion-react-components/commit/01784529a4de37c074f274e569056c5be9894739))
- **person-provider:** rename ([2700ce2](https://github.com/equinor/fusion-react-components/commit/2700ce2cbe177720e1aed917f879a9d9f8b99aab))

### Features

- **person-components:** person select ([fe23ae7](https://github.com/equinor/fusion-react-components/commit/fe23ae7b626d5b7e50e13e1e7f5a45cdbb8c2808))
- **person-components:** storybook update ([8a9bbaa](https://github.com/equinor/fusion-react-components/commit/8a9bbaab111ea93f4f1f5a951d6ffbd812f5055e))
- **person-select:** custom search ([e0305ac](https://github.com/equinor/fusion-react-components/commit/e0305acedb5c69d9beed239b23d21d2d090694ba))

# [2.15.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.14.2...@equinor/fusion-react-components-stories@2.15.0) (2023-09-26)

### Features

- **markdown:** add markdown-viewer ([bc13da3](https://github.com/equinor/fusion-react-components/commit/bc13da3dff9724bf19d9f7a5956e716914b8154a)), closes [#716](https://github.com/equinor/fusion-react-components/issues/716)

## [2.14.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.14.1...@equinor/fusion-react-components-stories@2.14.2) (2023-09-21)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.14.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.14.0...@equinor/fusion-react-components-stories@2.14.1) (2023-09-20)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [2.14.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.13.0...@equinor/fusion-react-components-stories@2.14.0) (2023-09-18)

### Features

- **storybook:** person details type ([9ae651d](https://github.com/equinor/fusion-react-components/commit/9ae651dedc86d255fcffb21457828074aed64cb6))
- **storybook:** show story url ([854ba34](https://github.com/equinor/fusion-react-components/commit/854ba344eb38c01f23e2af892618b3d3afdd8eef))

# [2.13.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.12.0...@equinor/fusion-react-components-stories@2.13.0) (2023-09-07)

### Bug Fixes

- **storybook:** story pathing ([658d9a3](https://github.com/equinor/fusion-react-components/commit/658d9a34e31b3031e2642cefda0f43101465acd5))

### Features

- **storybook:** person provider page ([c1d205d](https://github.com/equinor/fusion-react-components/commit/c1d205dd687f707cd0551b53497fb503978a8a87))

# [2.12.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.11.0...@equinor/fusion-react-components-stories@2.12.0) (2023-09-07)

### Features

- **person-component:** person card and person list item upgrade ([c139cc4](https://github.com/equinor/fusion-react-components/commit/c139cc471689362d890534d1ba8fc1f00b948f4c))

# [2.11.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.10.0...@equinor/fusion-react-components-stories@2.11.0) (2023-09-07)

### Bug Fixes

- **person-avatar:** remove some provider info ([f8c4af5](https://github.com/equinor/fusion-react-components/commit/f8c4af584d44ab770cdb3ffc029845f54e0ae57c))
- **person-avatar:** resolver for snapshots ([281bcc4](https://github.com/equinor/fusion-react-components/commit/281bcc48c2a5d8af87ddf79167ca41e52845091b))
- **person-avatar:** resolver name ([8635bf4](https://github.com/equinor/fusion-react-components/commit/8635bf49dec181d0b330970d442cf2cdd475c03d))

### Features

- **person-avatar:** snapshots ([e056b90](https://github.com/equinor/fusion-react-components/commit/e056b9015d4e1a736ac5dcd3c1c5bf8ba121d1ce))
- **person-avatar:** storybook rework ([b9b3d90](https://github.com/equinor/fusion-react-components/commit/b9b3d90d4e559400acf408967f82f44ac3a1edb4))
- **person-avatar:** update show card on hover ([9405757](https://github.com/equinor/fusion-react-components/commit/9405757a0228bad48dea62ccc4ba27e6f6af377e))

# [2.10.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.11...@equinor/fusion-react-components-stories@2.10.0) (2023-08-25)

### Bug Fixes

- **stepper:** force order ([a12758a](https://github.com/equinor/fusion-react-components/commit/a12758a893d6e6e670f0f452866c9a68dcd968c2))
- **stepper:** storybook ([de6e4f8](https://github.com/equinor/fusion-react-components/commit/de6e4f89bdc9940662fabe7b82bfd340121a099a))

### Features

- **stepper:** stepper update ([e2029cc](https://github.com/equinor/fusion-react-components/commit/e2029cc7248c712b98c7d9c6b5e8efc2aca9343d))

## [2.9.11](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.10...@equinor/fusion-react-components-stories@2.9.11) (2023-08-24)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.9.10](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.9...@equinor/fusion-react-components-stories@2.9.10) (2023-08-24)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.9.9](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.8...@equinor/fusion-react-components-stories@2.9.9) (2023-08-24)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.9.8](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.7...@equinor/fusion-react-components-stories@2.9.8) (2023-08-24)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.9.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.6...@equinor/fusion-react-components-stories@2.9.7) (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.9.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.5...@equinor/fusion-react-components-stories@2.9.6) (2023-08-15)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## 2.9.5 (2023-08-15)

### Bug Fixes

- **react-components:** package fix ([1301f27](https://github.com/equinor/fusion-react-components/commit/1301f27dfef651e9bf53527b0c6bcacf2c26909f))

## [2.9.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.3...@equinor/fusion-react-components-stories@2.9.4) (2023-08-11)

### Bug Fixes

- **person:** package update adjustments ([5b41d2f](https://github.com/equinor/fusion-react-components/commit/5b41d2fed5d24c1bcf6d05f0723635de5b9c9d19))

## [2.9.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.2...@equinor/fusion-react-components-stories@2.9.3) (2023-07-25)

### Bug Fixes

- **side-sheet:** simplify-style ([d031068](https://github.com/equinor/fusion-react-components/commit/d031068d73aa3d44794ffe4537120557b31ff640))

## [2.9.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.1...@equinor/fusion-react-components-stories@2.9.2) (2023-07-25)

### Bug Fixes

- **storybook:** update dep ([e8a9f91](https://github.com/equinor/fusion-react-components/commit/e8a9f91278219368933261a23790f1f20ea83786))

## [2.9.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.9.0...@equinor/fusion-react-components-stories@2.9.1) (2023-07-13)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [2.9.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.9...@equinor/fusion-react-components-stories@2.9.0) (2023-07-12)

### Features

- **stepper:** stepper component ([7030995](https://github.com/equinor/fusion-react-components/commit/7030995566b62cc7244f05767f25eea12a2978d2))

## [2.8.9](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.8...@equinor/fusion-react-components-stories@2.8.9) (2023-07-12)

### Bug Fixes

- **markdown-editor:** onInput event ([ca641a5](https://github.com/equinor/fusion-react-components/commit/ca641a5b6ddc62cf1b3a3119cfae9d9e7e50f200))

## [2.8.8](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.7...@equinor/fusion-react-components-stories@2.8.8) (2023-07-12)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.8.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.6...@equinor/fusion-react-components-stories@2.8.7) (2023-06-23)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.8.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.5...@equinor/fusion-react-components-stories@2.8.6) (2023-06-19)

### Bug Fixes

- **chip:** removable typo ([c513662](https://github.com/equinor/fusion-react-components/commit/c5136628df743784a52376f0aa32679456800b51))

## [2.8.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.4...@equinor/fusion-react-components-stories@2.8.5) (2023-06-16)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.8.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.3...@equinor/fusion-react-components-stories@2.8.4) (2023-06-12)

### Bug Fixes

- **datepicker:** selected date and range snapshots ([2daa94a](https://github.com/equinor/fusion-react-components/commit/2daa94a6ef12207c4a9f149274a07396b5f9d264))

## [2.8.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.2...@equinor/fusion-react-components-stories@2.8.3) (2023-06-09)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.8.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.1...@equinor/fusion-react-components-stories@2.8.2) (2023-05-25)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.8.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.8.0...@equinor/fusion-react-components-stories@2.8.1) (2023-05-09)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [2.8.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.7.0...@equinor/fusion-react-components-stories@2.8.0) (2023-04-18)

### Features

- **side-sheet:** fusion side sheet component ([f44bdaa](https://github.com/equinor/fusion-react-components/commit/f44bdaa5fa50b0352340624f79722e23b2fe51aa))

# [2.7.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.6.0...@equinor/fusion-react-components-stories@2.7.0) (2023-03-28)

### Bug Fixes

- **react-components:** lint fix ([acff5ae](https://github.com/equinor/fusion-react-components/commit/acff5aeedcff65238dca18197d32ee3b10c87fde))

### Features

- **markdown:** markdown-editor component ([7d700f8](https://github.com/equinor/fusion-react-components/commit/7d700f8f26b92a27e8c2da451f08591b63bb73e9))

# [2.6.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.5.5...@equinor/fusion-react-components-stories@2.6.0) (2023-03-24)

### Bug Fixes

- **person-card:** additional to storybook ([d2c2cee](https://github.com/equinor/fusion-react-components/commit/d2c2cee8a1429ad28e931311c0215aa338f9b040))

### Features

- **person:** person list item ([47482b8](https://github.com/equinor/fusion-react-components/commit/47482b819f15d92e43ca6a0160ae5682cfdacedb))

## [2.5.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.5.4...@equinor/fusion-react-components-stories@2.5.5) (2023-03-08)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.5.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.5.3...@equinor/fusion-react-components-stories@2.5.4) (2023-02-24)

### Bug Fixes

- **storybook:** type on searchable-dd resolver closeHandler ([fa67a2e](https://github.com/equinor/fusion-react-components/commit/fa67a2eb31c3a6c98bbe5d376c37ec923c43b90c))

## [2.5.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.5.2...@equinor/fusion-react-components-stories@2.5.3) (2023-02-14)

### Bug Fixes

- exporting types as type in packages ([f298ce9](https://github.com/equinor/fusion-react-components/commit/f298ce9907894d603e9a401f2b7db6b4cad7814b))

## [2.5.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.5.1...@equinor/fusion-react-components-stories@2.5.2) (2023-02-10)

### Bug Fixes

- :bug: div height ([d8b3c88](https://github.com/equinor/fusion-react-components/commit/d8b3c88744081c6df3d1f8893080ed46af534d2e))
- **ContextSearch:** remembers current context and minor ux fixes ([8afac6a](https://github.com/equinor/fusion-react-components/commit/8afac6ab9ace8f2367a7a16d71a5b24bd69de998))
- **searchable-dropdown:** type exports and stories ([e0f2e92](https://github.com/equinor/fusion-react-components/commit/e0f2e92d4513cc542ce38f1b7ae0eb0f3bbb9636))

## [2.5.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.5.0...@equinor/fusion-react-components-stories@2.5.1) (2023-02-07)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [2.5.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.4.1...@equinor/fusion-react-components-stories@2.5.0) (2023-02-06)

### Features

- :sparkles: icon button toggle ([4acf856](https://github.com/equinor/fusion-react-components/commit/4acf8562c7b5b7a528ed9818527beb3674a8f370))

## [2.4.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.4.0...@equinor/fusion-react-components-stories@2.4.1) (2023-02-06)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [2.4.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.3.1...@equinor/fusion-react-components-stories@2.4.0) (2023-02-03)

### Bug Fixes

- :bug: button import fix snapshots ([450fe7a](https://github.com/equinor/fusion-react-components/commit/450fe7af058be9ef179bcf018f6251f2f81da8b0))
- :bug: div height ([d8b3c88](https://github.com/equinor/fusion-react-components/commit/d8b3c88744081c6df3d1f8893080ed46af534d2e))
- **button:** fwc-button dependency version ([a1073fc](https://github.com/equinor/fusion-react-components/commit/a1073fc67c4a1bfb34d6e7eee6cc2ea3aa9a8034))
- **context-wip:** font styling ([8ad13ac](https://github.com/equinor/fusion-react-components/commit/8ad13ac07175b5877a535ae03c056e7f98627042))
- **contextSelectorHeader:** event logic and no rude console logs ([067297e](https://github.com/equinor/fusion-react-components/commit/067297e6322558d9c648bffd252b73da6953ad8d))
- **contextstory:** types in example ([64838be](https://github.com/equinor/fusion-react-components/commit/64838be53bce5e9000e65090e5631e84dcd56406))
- **icon-button:** content fix ([ac63c5b](https://github.com/equinor/fusion-react-components/commit/ac63c5b623eb6d6a55bcc7dfac85ba9133d196e9))
- **react-components:** main story ([2fb6357](https://github.com/equinor/fusion-react-components/commit/2fb63574175a9782868234e137a71073d4700af0))

### Features

- :rocket: added LinkButton component ([5c84184](https://github.com/equinor/fusion-react-components/commit/5c8418455837e9150b76f98d17739694f603900a))
- :sparkles: icon button ([7672b2a](https://github.com/equinor/fusion-react-components/commit/7672b2a56bd9afc382dd2ba90b162edff8607e89))
- **contextSelector:** component for ContextSelectorHeader ([47a9309](https://github.com/equinor/fusion-react-components/commit/47a9309b37ec48259722e85b64104d108f3503b0))
- **react-components:** icon-button ([df1374d](https://github.com/equinor/fusion-react-components/commit/df1374db022b00f3cb9c7fe688d1bc5368f34232))

## 2.3.1 (2023-01-30)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [2.3.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.2.0...@equinor/fusion-react-components-stories@2.3.0) (2023-01-19)

### Bug Fixes

- **context-wip:** font styling ([2a26d8a](https://github.com/equinor/fusion-react-components/commit/2a26d8ac4bc4083f692d4c132f61887724df5e9f))
- **contextSelectorHeader:** event logic and no rude console logs ([f3874d7](https://github.com/equinor/fusion-react-components/commit/f3874d748767926beb15737d018e162ac3fcf83f))
- **contextstory:** types in example ([d40eb5e](https://github.com/equinor/fusion-react-components/commit/d40eb5ef97009d68e83a2f9c59197111acc6ede3))

### Features

- **contextSelector:** component for ContextSelectorHeader ([985dc50](https://github.com/equinor/fusion-react-components/commit/985dc5018f4caa53d05a4dc14f5717b335b8f9d6))

# [2.2.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.1.2...@equinor/fusion-react-components-stories@2.2.0) (2023-01-18)

### Bug Fixes

- :bug: button import fix snapshots ([02926c5](https://github.com/equinor/fusion-react-components/commit/02926c5006ab0e98ff96505bb30763f6a96aa92d))

### Features

- :rocket: added LinkButton component ([7b994e0](https://github.com/equinor/fusion-react-components/commit/7b994e097b0679496544873ec2c2e711e6e6fc56))

## [2.1.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.1.1...@equinor/fusion-react-components-stories@2.1.2) (2023-01-12)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## 2.1.1 (2023-01-12)

### Bug Fixes

- **button:** fwc-button dependency version ([e6fac6e](https://github.com/equinor/fusion-react-components/commit/e6fac6e5d93699c82c5ad1144bb3bedb1f6d736b))

# [2.1.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.0.4...@equinor/fusion-react-components-stories@2.1.0) (2022-12-13)

### Features

- **contextselector:** better typing for context selector ([941863a](https://github.com/equinor/fusion-react-components/commit/941863ad6259439e90dcd341ff406e782ce3121d))
- **contextselector:** splitting comp to provider an element ([ef5eeca](https://github.com/equinor/fusion-react-components/commit/ef5eeca2dc5fb76c670e1d1fd089c56d36466e82))

## [2.0.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.0.3...@equinor/fusion-react-components-stories@2.0.4) (2022-12-02)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.0.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.0.2...@equinor/fusion-react-components-stories@2.0.3) (2022-11-29)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.0.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.0.1...@equinor/fusion-react-components-stories@2.0.2) (2022-11-25)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [2.0.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@2.0.0...@equinor/fusion-react-components-stories@2.0.1) (2022-11-25)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# 2.0.0 (2022-11-25)

### Bug Fixes

- updated contextselector and sdd to match webcomponent and storybook ([24ae5f4](https://github.com/equinor/fusion-react-components/commit/24ae5f4e7ff6468f9a046a9e3d5ea955a2258c1d))

### Features

- bumping to major release ([07a7861](https://github.com/equinor/fusion-react-components/commit/07a7861296027df897ceb491e36243e188f229cb))

### BREAKING CHANGES

- new resolver and types

## [1.47.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.47.2...@equinor/fusion-react-components-stories@1.47.3) (2022-11-21)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.47.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.47.1...@equinor/fusion-react-components-stories@1.47.2) (2022-11-14)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.47.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.47.0...@equinor/fusion-react-components-stories@1.47.1) (2022-11-09)

### Bug Fixes

- updating webcomponent renaming contextsel type ([5c7bf8d](https://github.com/equinor/fusion-react-components/commit/5c7bf8d19535b4448f5cfc57c8317bc3715699df))

# [1.47.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.46.2...@equinor/fusion-react-components-stories@1.47.0) (2022-11-09)

### Bug Fixes

- **context-selector:** exporting types and using parts from dropdown ([45add70](https://github.com/equinor/fusion-react-components/commit/45add70b6f35e42c625b004de171b08b0eb3bbbc))

### Features

- **context-selector:** adding package to storybook ([b0d65c9](https://github.com/equinor/fusion-react-components/commit/b0d65c969d0b0b97f3b7085a9b90638150a0ea5c))
- **context-selector:** extending component from web-components ([b03b3ee](https://github.com/equinor/fusion-react-components/commit/b03b3eebacf337840c76f5b10718ae263f551afe))

## [1.46.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.46.1...@equinor/fusion-react-components-stories@1.46.2) (2022-11-08)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.46.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.46.0...@equinor/fusion-react-components-stories@1.46.1) (2022-11-07)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.46.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.45.11...@equinor/fusion-react-components-stories@1.46.0) (2022-11-04)

### Bug Fixes

- **person-card:** avatar border ([e85e3ab](https://github.com/equinor/fusion-react-components/commit/e85e3ab31e9aac1de4cfc7fcb241270d2b3f4306))
- **person-card:** component story content ([37e0aa8](https://github.com/equinor/fusion-react-components/commit/37e0aa83cbfb0481684f0979ebb69286731a1ac1))
- **person-card:** remove comment ([10e9dc3](https://github.com/equinor/fusion-react-components/commit/10e9dc354952f2f10153c5b078696bc024341b25))

### Features

- create wrapper for person card ([6df4b41](https://github.com/equinor/fusion-react-components/commit/6df4b415ba52f32234b1674f3b72805d56f6ffb6))
- **person-card:** storybook ([6f6f348](https://github.com/equinor/fusion-react-components/commit/6f6f3488cc5454cee204561bf08341c72332f1d4))
- **person-card:** wrap of the web component ([3c053c9](https://github.com/equinor/fusion-react-components/commit/3c053c9cb6d643ed99538ac16a08fd588b045820))

## 1.45.11 (2022-10-27)

### Bug Fixes

- **searchabledropdown:** fixing wrong version number in storybook import ([fb41d40](https://github.com/equinor/fusion-react-components/commit/fb41d40014118b6d0e44127a0978875cee984dca))
- **storybook:** fixing merge conflict in package.json ([0a3f43a](https://github.com/equinor/fusion-react-components/commit/0a3f43ab1e3af2383926382fe3be89b583e1f6ca))
- **storybook:** fixing merge conflict in storybook tsconfig ([6bc1694](https://github.com/equinor/fusion-react-components/commit/6bc16945799fe5e2b29b3004c851a3a8a46a3659))

## 1.45.10 (2022-10-17)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.45.9](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.45.8...@equinor/fusion-react-components-stories@1.45.9) (2022-09-16)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## 1.45.8 (2022-09-16)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.45.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.45.6...@equinor/fusion-react-components-stories@1.45.7) (2022-06-29)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.45.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.45.5...@equinor/fusion-react-components-stories@1.45.6) (2022-06-15)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.45.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.45.4...@equinor/fusion-react-components-stories@1.45.5) (2022-06-14)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.45.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.45.3...@equinor/fusion-react-components-stories@1.45.4) (2022-05-31)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## 1.45.3 (2022-05-24)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.45.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.45.1...@equinor/fusion-react-components-stories@1.45.2) (2022-04-19)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.45.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.45.0...@equinor/fusion-react-components-stories@1.45.1) (2022-04-13)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.45.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.44.0...@equinor/fusion-react-components-stories@1.45.0) (2022-04-08)

### Features

- **typography:** className option + color example ([910289f](https://github.com/equinor/fusion-react-components/commit/910289fd4853b9072d36e568524eb48f8279c327))
- **typography:** create typography component ([492b959](https://github.com/equinor/fusion-react-components/commit/492b9593546870ec7392f5453dcad28ac4206627))
- **typography:** description ([338ccc0](https://github.com/equinor/fusion-react-components/commit/338ccc0298dba29f7be9083344f660af1fbf0f7a))
- **typography:** disable variant control on stories ([f73e12e](https://github.com/equinor/fusion-react-components/commit/f73e12e644110ab390992412b3fc5be07dda3be3))
- **typography:** heading stories and shapshot ([feaf122](https://github.com/equinor/fusion-react-components/commit/feaf1222da0c6e02fc2b8b5a36d2c0293c3c1373))
- **typography:** input stories and snapshot ([6b223ce](https://github.com/equinor/fusion-react-components/commit/6b223cef4d96adf8bf28fea6f969e586ffe9ff0e))
- **typography:** navigation stories and snapshot ([e6498de](https://github.com/equinor/fusion-react-components/commit/e6498deb424c323e7435644b1dce1c3816a5ec8a))
- **typography:** Paragraph stories and snapshot ([e2a1618](https://github.com/equinor/fusion-react-components/commit/e2a1618600514785a52bc9f1be58559258df8601))
- **typography:** prop types and apply styling ([3790fa8](https://github.com/equinor/fusion-react-components/commit/3790fa891daca8acf6663fe3a326369c1758fe4b))
- **typography:** table stories and snapshot ([691b556](https://github.com/equinor/fusion-react-components/commit/691b556e2e7a20645f6014283f78356deb688ab7))
- **typography:** UI stories and snapshot ([4c99101](https://github.com/equinor/fusion-react-components/commit/4c991018ba529f1224cca7e61e6f382231892592))

# 1.44.0 (2022-04-06)

### Bug Fixes

- **menu:** removed unfinished snapshots ([10e2f9a](https://github.com/equinor/fusion-react-components/commit/10e2f9ad681b931f44f4c1782dc3f0b3233092c5))

### Features

- **menu:** create snapshots ([db3bb13](https://github.com/equinor/fusion-react-components/commit/db3bb1387fc5a974c71598f7112a637d937ca9f1))
- **menu:** initial menu component creation ([b0af597](https://github.com/equinor/fusion-react-components/commit/b0af597068ca5e9466618e85ce9382c8407e0f30))

## [1.43.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.43.0...@equinor/fusion-react-components-stories@1.43.1) (2022-02-28)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.43.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.42.0...@equinor/fusion-react-components-stories@1.43.0) (2022-02-24)

### Bug Fixes

- **breadcrumb:** changed colored story ([b519ea1](https://github.com/equinor/fusion-react-components/commit/b519ea10ba01076212106d6bd110ad63917c2a71))
- **breadcrumb:** enable chromatic snapshot ([3169177](https://github.com/equinor/fusion-react-components/commit/31691771e24ae014eddd6bf42526a4ec10e1c8b3))
- **breadcrumb:** fixed fetching story ([c92d632](https://github.com/equinor/fusion-react-components/commit/c92d632b54abca5898f4cf6df478f66b8c27c3cb))

### Features

- **breadcrumb:** added breadcrumb component ([98bb2c5](https://github.com/equinor/fusion-react-components/commit/98bb2c5ad2d7a1fc33044dd625ffaa7915d7c395))
- **breadcrumb:** hover color ([9ae50ab](https://github.com/equinor/fusion-react-components/commit/9ae50abb026d5dea72d0b4182e411561089e1a68))

# [1.42.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.41.1...@equinor/fusion-react-components-stories@1.42.0) (2022-02-23)

### Bug Fixes

- **circular:** changed story header ([19e824b](https://github.com/equinor/fusion-react-components/commit/19e824b6f3920b78af7542c9b5708bb9d9920851))
- **dots:** changed story header ([0a7bd1e](https://github.com/equinor/fusion-react-components/commit/0a7bd1e4ea49321ee34a2e70ed8f23e2d73c752a))
- **star:** changed story header ([aa1ae3e](https://github.com/equinor/fusion-react-components/commit/aa1ae3ef41746213c75a2e5c41c14feac719d506))

### Features

- **circular:** added circular progress indicator ([10f77b6](https://github.com/equinor/fusion-react-components/commit/10f77b6d4e2b60a9ca04dc9d3393f79975b67cc3))
- **circular:** snapshots for circular and dots ([1d43e11](https://github.com/equinor/fusion-react-components/commit/1d43e116583c588e3cf57bdcc164ee3b42208992))
- **dots:** added dots progress indicator ([93b2a74](https://github.com/equinor/fusion-react-components/commit/93b2a740d7517003276b85d60f0c76939fc51e54))

## [1.41.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.41.0...@equinor/fusion-react-components-stories@1.41.1) (2022-02-21)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.41.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.40.0...@equinor/fusion-react-components-stories@1.41.0) (2022-02-15)

### Features

- **filter:** add sortfn as a prop and capitalized all label ([c364ab3](https://github.com/equinor/fusion-react-components/commit/c364ab39b6b625cf00b973f1eacb52c5b795ae27))

# [1.40.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.39.3...@equinor/fusion-react-components-stories@1.40.0) (2022-02-11)

### Features

- **ripple:** added ripple react component ([9589a43](https://github.com/equinor/fusion-react-components/commit/9589a43be4c5d2ddc0467f3079d6f40f53aa95e6))

## [1.39.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.39.2...@equinor/fusion-react-components-stories@1.39.3) (2022-02-11)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.39.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.39.1...@equinor/fusion-react-components-stories@1.39.2) (2022-02-11)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.39.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.39.0...@equinor/fusion-react-components-stories@1.39.1) (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.39.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.38.2...@equinor/fusion-react-components-stories@1.39.0) (2022-02-08)

### Bug Fixes

- rename component ([8633723](https://github.com/equinor/fusion-react-components/commit/8633723df3d3a6d12acfa1d3a2da1cb1a5d6de71))

### Features

- **loader:** add loader component ([3d7d933](https://github.com/equinor/fusion-react-components/commit/3d7d933c8d3d63f30c75264b6c8ba3829edbbebe))

## [1.38.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.38.1...@equinor/fusion-react-components-stories@1.38.2) (2022-02-08)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.38.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.38.0...@equinor/fusion-react-components-stories@1.38.1) (2022-02-07)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.38.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.37.5...@equinor/fusion-react-components-stories@1.38.0) (2022-02-02)

### Bug Fixes

- **popover:** arrow size and background color ([4eab9cc](https://github.com/equinor/fusion-react-components/commit/4eab9cc5e430d6248aa4f5651c808d89b7dc759a))

### Features

- **popover:** added basic style ([4c90fd2](https://github.com/equinor/fusion-react-components/commit/4c90fd25dd736c02d65417434e08143b4c2c486c))
- **popover:** added props for styling ([88cee1e](https://github.com/equinor/fusion-react-components/commit/88cee1e89156e09b1220c88ebe7d6cca06979bc7))
- **popover:** baseElement and title props ([c7a287f](https://github.com/equinor/fusion-react-components/commit/c7a287f44e008b50a09b5bb11c9ea537c1fd280c))
- **popover:** cleaned snapshot file ([9c4bede](https://github.com/equinor/fusion-react-components/commit/9c4bede787fc398a01c2fd982ea47af649d9f39b))
- **popover:** created popover package ([b59c92d](https://github.com/equinor/fusion-react-components/commit/b59c92d20c0d7f5dd7c4bcfcb95025b8a96d3cf6))
- **popover:** created snaphots ([6d156a6](https://github.com/equinor/fusion-react-components/commit/6d156a631634322ce84053d88cac276cdcce3d83))
- **popover:** default popper popover ([ca556f9](https://github.com/equinor/fusion-react-components/commit/ca556f9fd419024052371dd02a8dff6df8ebe073))
- **popover:** Description and link react-popper ([054cbfb](https://github.com/equinor/fusion-react-components/commit/054cbfbd4c55cf40a22dd42d6fb7e257183fc4f6))
- **popover:** PopoverProps type ([fda7683](https://github.com/equinor/fusion-react-components/commit/fda76830fbce6d5a86a5eca7d5fd0f0e66bdafb6))
- **popover:** visibility controlled from outside ([bfe2234](https://github.com/equinor/fusion-react-components/commit/bfe223433f3e6b82e95c8e1518ff57e87389212b))

## [1.37.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.37.4...@equinor/fusion-react-components-stories@1.37.5) (2022-01-19)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.37.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.37.3...@equinor/fusion-react-components-stories@1.37.4) (2022-01-13)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.37.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.37.2...@equinor/fusion-react-components-stories@1.37.3) (2022-01-05)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.37.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.37.1...@equinor/fusion-react-components-stories@1.37.2) (2022-01-04)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.37.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.37.0...@equinor/fusion-react-components-stories@1.37.1) (2022-01-03)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.37.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.36.1...@equinor/fusion-react-components-stories@1.37.0) (2022-01-03)

### Features

- **tooltip:** Added description ([5d6e09c](https://github.com/equinor/fusion-react-components/commit/5d6e09cf0af94625df15977586662b42605afb9d))
- **tooltip:** create tooltip component ([ba690ec](https://github.com/equinor/fusion-react-components/commit/ba690ecf8e7f68d7970a2848502d2f16de051bfc))
- **tooltip:** end of line in tsconfig file + desc ([6c7fb66](https://github.com/equinor/fusion-react-components/commit/6c7fb66983274868c455df32609b3baa68b832e0))
- **tooltip:** importing tippy.css in index file ([5b9a081](https://github.com/equinor/fusion-react-components/commit/5b9a081cac6a8e752900d1eaea8a74ea9252c5ee))
- **tooltip:** made tooltip headless ([710e532](https://github.com/equinor/fusion-react-components/commit/710e53237434a77e2448cce9f747c38502932b22))
- **tooltip:** Stories for Custom + Styled Tooltip ([db22860](https://github.com/equinor/fusion-react-components/commit/db228600e0722aaa7ce02f11aab5fb9d7978e86e))
- **tooltip:** stories to data ([8349678](https://github.com/equinor/fusion-react-components/commit/8349678c116a75e1f826f4de4e4ca8fa18f98075))
- **tooltip:** tooltip version 1.0.0 used in storybook ([6da91ea](https://github.com/equinor/fusion-react-components/commit/6da91ea8afbf2443ae6d2c9dc509993352817b1d))

## [1.36.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.36.0...@equinor/fusion-react-components-stories@1.36.1) (2021-12-21)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.36.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.35.6...@equinor/fusion-react-components-stories@1.36.0) (2021-12-17)

### Features

- update styling for datepicker label ([c71c7be](https://github.com/equinor/fusion-react-components/commit/c71c7becd5876d4587aae3f777e3ae7618aaf8a2))

## [1.35.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.35.5...@equinor/fusion-react-components-stories@1.35.6) (2021-11-26)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.35.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.35.4...@equinor/fusion-react-components-stories@1.35.5) (2021-11-23)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.35.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.35.3...@equinor/fusion-react-components-stories@1.35.4) (2021-11-23)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.35.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.35.2...@equinor/fusion-react-components-stories@1.35.3) (2021-11-22)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.35.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.35.1...@equinor/fusion-react-components-stories@1.35.2) (2021-11-22)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.35.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.35.0...@equinor/fusion-react-components-stories@1.35.1) (2021-11-15)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.35.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.34.0...@equinor/fusion-react-components-stories@1.35.0) (2021-11-08)

### Features

- expose theme provider ([b5b664d](https://github.com/equinor/fusion-react-components/commit/b5b664dadfcd34bd3f9312bc44bfa21f328a6462))

# [1.34.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.33.0...@equinor/fusion-react-components-stories@1.34.0) (2021-11-08)

### Features

- toolbar and export functionality for table ([840b87f](https://github.com/equinor/fusion-react-components/commit/840b87f790ebbca42d118486c186f0361e39e45f))

# [1.33.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.32.0...@equinor/fusion-react-components-stories@1.33.0) (2021-11-04)

### Features

- **observable:** allow multiple effect ([df77c32](https://github.com/equinor/fusion-react-components/commit/df77c328b2b0555cb50ccaa21df41eca212f5cf8))

# [1.32.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.31.2...@equinor/fusion-react-components-stories@1.32.0) (2021-11-03)

### Features

- added list component ([59358f6](https://github.com/equinor/fusion-react-components/commit/59358f67a35d6919f5655c1fe0f646642ca302e1))
- added list component ([7d192e3](https://github.com/equinor/fusion-react-components/commit/7d192e3fff4f28f0b2c1310d4480f20ffc60f458))
- added list component ([0214bfd](https://github.com/equinor/fusion-react-components/commit/0214bfd98821c75d2f47d073d5c067392ccac5b6))
- added react component ([aa4c933](https://github.com/equinor/fusion-react-components/commit/aa4c933a6c4fc68095f46f89cb3f4b7d15a127bd))
- added react component ([b96ddeb](https://github.com/equinor/fusion-react-components/commit/b96ddeb846eb26bbff1edf8c336aa20d3cb1cbd2))

## [1.31.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.31.1...@equinor/fusion-react-components-stories@1.31.2) (2021-11-02)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.31.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.31.0...@equinor/fusion-react-components-stories@1.31.1) (2021-10-29)

### Bug Fixes

- updated packages ([4298c77](https://github.com/equinor/fusion-react-components/commit/4298c778c4c5385398a92d8b71feee3b17ba64c0))

# [1.31.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.30.1...@equinor/fusion-react-components-stories@1.31.0) (2021-10-29)

### Features

- added divider component ([03a83c2](https://github.com/equinor/fusion-react-components/commit/03a83c2e783ee70998774a8f112712aa42b0118a))
- added divider component ([b634c64](https://github.com/equinor/fusion-react-components/commit/b634c64b16871de8cf17cb32bb11d51f006f6c00))

## [1.30.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.30.0...@equinor/fusion-react-components-stories@1.30.1) (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.30.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.29.0...@equinor/fusion-react-components-stories@1.30.0) (2021-10-29)

### Features

- add new builder ([3a7b239](https://github.com/equinor/fusion-react-components/commit/3a7b239d5e2ecfca05d817f3f99c63ddb4fd1395))

# [1.29.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.28.1...@equinor/fusion-react-components-stories@1.29.0) (2021-10-29)

### Features

- **skeleton:** add new builder ([c900967](https://github.com/equinor/fusion-react-components/commit/c90096718d477eeb3a6948d3fa34422ea0983e1d))

## [1.28.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.28.0...@equinor/fusion-react-components-stories@1.28.1) (2021-10-29)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.28.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.27.0...@equinor/fusion-react-components-stories@1.28.0) (2021-10-28)

### Features

- **date:** use internal element builder ([e0a3ac7](https://github.com/equinor/fusion-react-components/commit/e0a3ac790b143c658e697af8e010be7c417308a5))

# [1.27.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.26.0...@equinor/fusion-react-components-stories@1.27.0) (2021-10-28)

### Features

- **avatar:** use internal element buider ([bd46edf](https://github.com/equinor/fusion-react-components/commit/bd46edfe7ab1116b91ab000c7542c9ae8c5b8f24))
- **badge:** use internal element buider ([0ae7675](https://github.com/equinor/fusion-react-components/commit/0ae7675846bdb815a235bcf4061ee0de12bb2d94))

# [1.26.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.25.2...@equinor/fusion-react-components-stories@1.26.0) (2021-10-28)

### Features

- **avatar:** use internal element buider ([bd46edf](https://github.com/equinor/fusion-react-components/commit/bd46edfe7ab1116b91ab000c7542c9ae8c5b8f24))

## [1.25.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.25.1...@equinor/fusion-react-components-stories@1.25.2) (2021-10-27)

### Bug Fixes

- added skeleton component ([cf9770c](https://github.com/equinor/fusion-react-components/commit/cf9770ccf9916944cd307c9571577b09e1b41fe4))
- fixed exports ([ed8707d](https://github.com/equinor/fusion-react-components/commit/ed8707db66c19f4e715a6978cd68581ab8af35e4))

## [1.25.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.25.0...@equinor/fusion-react-components-stories@1.25.1) (2021-10-27)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.25.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.24.7...@equinor/fusion-react-components-stories@1.25.0) (2021-10-21)

### Features

- added react component ([424a23f](https://github.com/equinor/fusion-react-components/commit/424a23f0f9d5ad8139e1649e818b84893ceed4ee))

## [1.24.7](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.24.6...@equinor/fusion-react-components-stories@1.24.7) (2021-10-21)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.24.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.24.5...@equinor/fusion-react-components-stories@1.24.6) (2021-10-21)

### Bug Fixes

- fixed onBlur and minor refactoring ([eea3e06](https://github.com/equinor/fusion-react-components/commit/eea3e0612660157dc6c2606c8ef70b4550b3b89f))

## [1.24.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.24.4...@equinor/fusion-react-components-stories@1.24.5) (2021-10-20)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.24.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.24.3...@equinor/fusion-react-components-stories@1.24.4) (2021-10-20)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.24.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.24.2...@equinor/fusion-react-components-stories@1.24.3) (2021-10-19)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.24.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.24.1...@equinor/fusion-react-components-stories@1.24.2) (2021-10-13)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.24.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.24.0...@equinor/fusion-react-components-stories@1.24.1) (2021-10-13)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.24.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.23.1...@equinor/fusion-react-components-stories@1.24.0) (2021-10-12)

### Features

- pagination for table ([f578745](https://github.com/equinor/fusion-react-components/commit/f578745abd916a36cdfb9bf618312f1563f18d66))

## [1.23.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.23.0...@equinor/fusion-react-components-stories@1.23.1) (2021-10-11)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.23.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.22.0...@equinor/fusion-react-components-stories@1.23.0) (2021-10-05)

### Features

- add new element creator ([efd2a2a](https://github.com/equinor/fusion-react-components/commit/efd2a2a3bfcf53c8cc640cafb8351bc137ecc677))

# [1.22.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.21.4...@equinor/fusion-react-components-stories@1.22.0) (2021-10-05)

### Features

- **storybook:** add support components ([e4619f3](https://github.com/equinor/fusion-react-components/commit/e4619f38f36c35eb8092c7971057b80512169467))

## [1.21.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.21.3...@equinor/fusion-react-components-stories@1.21.4) (2021-09-30)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.21.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.21.2...@equinor/fusion-react-components-stories@1.21.3) (2021-09-27)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.21.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.21.1...@equinor/fusion-react-components-stories@1.21.2) (2021-09-27)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.21.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.21.0...@equinor/fusion-react-components-stories@1.21.1) (2021-09-27)

### Bug Fixes

- update to lit create element method ([ec68c08](https://github.com/equinor/fusion-react-components/commit/ec68c08d5cbcba43a1b8ca064cccc73662f17421))

# [1.21.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.20.1...@equinor/fusion-react-components-stories@1.21.0) (2021-09-23)

### Bug Fixes

- **storybook:** duplicate insert of custom elements ([8a6f93b](https://github.com/equinor/fusion-react-components/commit/8a6f93b4ef9e4aa473c9e4a7318fe8df2d2dd22a))

### Features

- **docs:** add changelog ([a67464c](https://github.com/equinor/fusion-react-components/commit/a67464c6bf59643ff1d2895975ce396d3010fad9))
- **storybook:** update to webpack 5 ([f8edef9](https://github.com/equinor/fusion-react-components/commit/f8edef9697438e69b5e19282751cfea8e7a0520f))

## 1.20.1 (2021-09-16)

### Bug Fixes

- remove typescript from sub packages ([845115e](https://github.com/equinor/fusion-react-components/commit/845115e1a73687ce75dc3e14ebdebf9463481b28))

# [1.20.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.19.0...@equinor/fusion-react-components-stories@1.20.0) (2021-09-13)

### Features

- created react component ([f8c8846](https://github.com/equinor/fusion-react-components/commit/f8c88469f335ca963d578b3aba364bfa33faa0b2))

# [1.19.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.18.0...@equinor/fusion-react-components-stories@1.19.0) (2021-09-13)

### Features

- created badge react component ([158579d](https://github.com/equinor/fusion-react-components/commit/158579df3d316a26d6f6251da353747e93660944))

# [1.18.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.17.4...@equinor/fusion-react-components-stories@1.18.0) (2021-09-10)

### Bug Fixes

- Added useSelector and reducer from fusion API ([693973e](https://github.com/equinor/fusion-react-components/commit/693973eb1adc1e4b4e97e73b89f23d7c6ce44d85))
- search functionality, css adjustments and description ([e187592](https://github.com/equinor/fusion-react-components/commit/e18759227012eac564d36972d58a6362cdf30d43))

### Features

- Moved over and implemented most of the components used for horizontal filterpanel ([c556396](https://github.com/equinor/fusion-react-components/commit/c5563960610b14a39bd3db72f558e435eb25dd88))
- Moved over and implemented most of the components used for horizontal filterpanel ([c189a96](https://github.com/equinor/fusion-react-components/commit/c189a96f5a150f1774b93913a744987ecc08e2d1))
- Moved over and implemented most of the components used for horizontal filterpanel ([b1a80c1](https://github.com/equinor/fusion-react-components/commit/b1a80c1bf8fb8e1ca4230236083f14da0dd915ac))

## [1.17.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.17.3...@equinor/fusion-react-components-stories@1.17.4) (2021-09-10)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.17.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.17.2...@equinor/fusion-react-components-stories@1.17.3) (2021-09-09)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.17.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.17.1...@equinor/fusion-react-components-stories@1.17.2) (2021-09-08)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.17.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.17.0...@equinor/fusion-react-components-stories@1.17.1) (2021-09-08)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.17.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.16.0...@equinor/fusion-react-components-stories@1.17.0) (2021-09-08)

### Features

- add theme provider ([ad17d8e](https://github.com/equinor/fusion-react-components/commit/ad17d8e4938ae0057e53fe64edbe084406f28c5f))

# [1.16.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.15.2...@equinor/fusion-react-components-stories@1.16.0) (2021-09-07)

### Features

- add react eds icon components ([3847f64](https://github.com/equinor/fusion-react-components/commit/3847f641e0f4eb57bf83bd8610dad6a375bd2a62))

## [1.15.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.15.1...@equinor/fusion-react-components-stories@1.15.2) (2021-09-07)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.15.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.15.0...@equinor/fusion-react-components-stories@1.15.1) (2021-09-07)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.15.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.14.3...@equinor/fusion-react-components-stories@1.15.0) (2021-09-07)

### Bug Fixes

- add label to checkbox ([a752f4f](https://github.com/equinor/fusion-react-components/commit/a752f4f64616d365f8046d9ee213c3373c3964c3))
- add label to radio element ([d8daa78](https://github.com/equinor/fusion-react-components/commit/d8daa789bec2bb27a68713462865eb3bf719f461))

### Features

- add readme ([9c9e81d](https://github.com/equinor/fusion-react-components/commit/9c9e81d5ebdd8f701423c385663ce62b281ec280))

## [1.14.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.14.2...@equinor/fusion-react-components-stories@1.14.3) (2021-09-06)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.14.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.14.1...@equinor/fusion-react-components-stories@1.14.2) (2021-08-27)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.14.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.14.0...@equinor/fusion-react-components-stories@1.14.1) (2021-08-23)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.14.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.13.4...@equinor/fusion-react-components-stories@1.14.0) (2021-08-16)

### Bug Fixes

- add missing dep ([d137429](https://github.com/equinor/fusion-react-components/commit/d137429a49043dd2a5ad6af5c3df522f58de7da9))
- import of react utils ([c9f852a](https://github.com/equinor/fusion-react-components/commit/c9f852a3738bfd902298a6fefd9fa30ee90e8b80))
- title of story ([3334c36](https://github.com/equinor/fusion-react-components/commit/3334c36a3936ea0e5ef485e5a2c0359a8ce18e9b))
- update datepicker story ([fa9162f](https://github.com/equinor/fusion-react-components/commit/fa9162f5d3c3dddc330bf40f8162a07cf8b27ec2))

### Features

- added date component ([b32b637](https://github.com/equinor/fusion-react-components/commit/b32b637bfe0aee74db1b372a28b73dea821e7d35))

## [1.13.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.13.3...@equinor/fusion-react-components-stories@1.13.4) (2021-08-16)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## 1.13.3 (2021-08-16)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.13.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.13.1...@equinor/fusion-react-components-stories@1.13.2) (2021-08-05)

### Bug Fixes

- fixed storybook ([ba1777c](https://github.com/equinor/fusion-react-components/commit/ba1777cfeeda2c4b0a86ac0961a5534bb4f27ea4))
- fixed textinput typing and export ([8d4b005](https://github.com/equinor/fusion-react-components/commit/8d4b00588c00c6247c33e9569a1ef34b870ea1d2))

## [1.13.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.13.0...@equinor/fusion-react-components-stories@1.13.1) (2021-08-03)

### Bug Fixes

- fixed docs ([4eecf3a](https://github.com/equinor/fusion-react-components/commit/4eecf3a26b9ef5240b8465ef28b1f53c71aec02d))
- fixed type definitions and upgraded packages ([5efbbd2](https://github.com/equinor/fusion-react-components/commit/5efbbd2cee688bcefc554c113512f834a91f39fd))

# [1.13.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.12.0...@equinor/fusion-react-components-stories@1.13.0) (2021-07-29)

### Features

- added button react component ([43735da](https://github.com/equinor/fusion-react-components/commit/43735dae952f4d1bc32b8ee97ba87dc289a12122))

# [1.12.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.11.4...@equinor/fusion-react-components-stories@1.12.0) (2021-07-29)

### Features

- allow adjustment to popper ([bef382b](https://github.com/equinor/fusion-react-components/commit/bef382bf2fd2278698621a4ee30aa4a90ab1fb53))

## [1.11.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.11.3...@equinor/fusion-react-components-stories@1.11.4) (2021-07-20)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.11.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.11.2...@equinor/fusion-react-components-stories@1.11.3) (2021-07-14)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.11.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.11.1...@equinor/fusion-react-components-stories@1.11.2) (2021-07-13)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.11.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.11.0...@equinor/fusion-react-components-stories@1.11.1) (2021-07-13)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.11.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.10.1...@equinor/fusion-react-components-stories@1.11.0) (2021-07-07)

### Features

- added text area component ([f245775](https://github.com/equinor/fusion-react-components/commit/f245775348b06a5a5095a719a5b8540411a94567))

## [1.10.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.10.0...@equinor/fusion-react-components-stories@1.10.1) (2021-07-06)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.10.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.9.0...@equinor/fusion-react-components-stories@1.10.0) (2021-07-05)

### Bug Fixes

- fixed types and stories ([287af57](https://github.com/equinor/fusion-react-components/commit/287af578df018f80b3961842fe07cb210ee61f1e))

### Features

- added text input component ([ea356fe](https://github.com/equinor/fusion-react-components/commit/ea356fe0bb454d7a36aaf90e2287e98f0abfd2ce))

# [1.9.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.8.0...@equinor/fusion-react-components-stories@1.9.0) (2021-07-05)

### Features

- added theme provider ([a7e3e3f](https://github.com/equinor/fusion-react-components/commit/a7e3e3f0657ce4d5659bb387ca71d823242df20f))

# [1.8.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.7.5...@equinor/fusion-react-components-stories@1.8.0) (2021-07-02)

### Features

- added radio component ([3e4fb97](https://github.com/equinor/fusion-react-components/commit/3e4fb97d7b4211a28707d9b03c9c5fb03d6bb4bf))

## [1.7.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.7.4...@equinor/fusion-react-components-stories@1.7.5) (2021-07-01)

### Bug Fixes

- **table:** column resize ([f475441](https://github.com/equinor/fusion-react-components/commit/f4754414e6e110218342f7b17a689b91f4040683))

## [1.7.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.7.3...@equinor/fusion-react-components-stories@1.7.4) (2021-06-30)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.7.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.7.2...@equinor/fusion-react-components-stories@1.7.3) (2021-06-28)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.7.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.7.1...@equinor/fusion-react-components-stories@1.7.2) (2021-06-28)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.7.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.7.0...@equinor/fusion-react-components-stories@1.7.1) (2021-06-28)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.7.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.6.0...@equinor/fusion-react-components-stories@1.7.0) (2021-06-24)

### Features

- added switch react component ([4984847](https://github.com/equinor/fusion-react-components/commit/4984847dc99bb0d1c85a74a9bd946a2d79478abc))

# [1.6.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.5.6...@equinor/fusion-react-components-stories@1.6.0) (2021-06-24)

### Features

- added checkbox react component ([5a511a0](https://github.com/equinor/fusion-react-components/commit/5a511a0c7925481629380483149e5f6c90e188a0))

## [1.5.6](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.5.5...@equinor/fusion-react-components-stories@1.5.6) (2021-06-23)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.5.5](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.5.4...@equinor/fusion-react-components-stories@1.5.5) (2021-06-17)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.5.4](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.5.3...@equinor/fusion-react-components-stories@1.5.4) (2021-06-01)

### Bug Fixes

- add equinor default font ([7863a5a](https://github.com/equinor/fusion-react-components/commit/7863a5ad5001a281332c23bf49a42cbc550576f7))
- fixed styling issues ([691736f](https://github.com/equinor/fusion-react-components/commit/691736f4f5aed95497efe2e7098cb1e0fa80860a))
- removed incorrect props from story ([e13349e](https://github.com/equinor/fusion-react-components/commit/e13349eb5b938aad7931c497d169d64cbce5a935))

## [1.5.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.5.2...@equinor/fusion-react-components-stories@1.5.3) (2021-06-01)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.5.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.5.1...@equinor/fusion-react-components-stories@1.5.2) (2021-05-31)

### Bug Fixes

- plugins for table ([5993eed](https://github.com/equinor/fusion-react-components/commit/5993eedabfde8694af269af89ba03ab82dae9050))

## [1.5.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.5.0...@equinor/fusion-react-components-stories@1.5.1) (2021-05-26)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.5.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.4.0...@equinor/fusion-react-components-stories@1.5.0) (2021-05-26)

### Bug Fixes

- fixed height ([5a5cf06](https://github.com/equinor/fusion-react-components/commit/5a5cf06e53b788789785a0ab33f5197356d77083))
- fixed multiple bugs and added label ([676ebc7](https://github.com/equinor/fusion-react-components/commit/676ebc73d65d1e9582d2943e3e74ad74e7d8ae1c))

### Features

- added support for selection of date range ([751abbc](https://github.com/equinor/fusion-react-components/commit/751abbcdb9a4a7aa5478a82158b71b6ca188b1f6))

# [1.4.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.3.1...@equinor/fusion-react-components-stories@1.4.0) (2021-05-25)

### Features

- added support for selection of date range ([751abbc](https://github.com/equinor/fusion-react-components/commit/751abbcdb9a4a7aa5478a82158b71b6ca188b1f6))

## [1.3.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.3.0...@equinor/fusion-react-components-stories@1.3.1) (2021-05-18)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# [1.3.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.2.1...@equinor/fusion-react-components-stories@1.3.0) (2021-05-11)

### Bug Fixes

- fixes to header and icon handling ([babc3bd](https://github.com/equinor/fusion-react-components/commit/babc3bdd70714e02d205aad59e8ecc2d99824c36))

### Features

- added arrow icon to dropdown and other minor fixes ([03a8a84](https://github.com/equinor/fusion-react-components/commit/03a8a84ccf6d080bd65ae325748239d5c967197b))

## [1.2.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.2.0...@equinor/fusion-react-components-stories@1.2.1) (2021-05-04)

### Bug Fixes

- added new variations to datepicker and other small fixes ([d3bbdee](https://github.com/equinor/fusion-react-components/commit/d3bbdee0e80cb059b1340a1efa1e355f0877db5b))

# [1.2.0](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.1.3...@equinor/fusion-react-components-stories@1.2.0) (2021-05-04)

### Bug Fixes

- fixed reference to local yalc package ([ce1d3ee](https://github.com/equinor/fusion-react-components/commit/ce1d3eea22581616c00944d2ce64623ea3f52ebd))

### Features

- new datepicker component ([c06eee4](https://github.com/equinor/fusion-react-components/commit/c06eee4636e43c2f0c2752c1ce37436851dff487))

## [1.1.3](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.1.2...@equinor/fusion-react-components-stories@1.1.3) (2021-04-28)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.1.2](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.1.1...@equinor/fusion-react-components-stories@1.1.2) (2021-04-13)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

## [1.1.1](https://github.com/equinor/fusion-react-components/compare/@equinor/fusion-react-components-stories@1.1.0...@equinor/fusion-react-components-stories@1.1.1) (2021-04-09)

**Note:** Version bump only for package @equinor/fusion-react-components-stories

# 1.1.0 (2021-03-23)

### Bug Fixes

- styles in storybook ([55289a0](https://github.com/equinor/fusion-react-components/commit/55289a0d8f3860c0f6de2f1774115263b97531df))
