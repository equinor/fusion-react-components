<!--prettier-ignore-start-->
# @equinor/fusion-react-components [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-components.svg)](https://www.npmjs.com/package/@equinor/fusion-react-components)

A convenient collection package providing unified access to Fusion react components. This package aggregates and re-exports components from individual Fusion react component packages, making it easier to import and use multiple components in your application.

## [Storybook](https://equinor.github.io/fusion-react-components/)

## Installation

```sh
npm install @equinor/fusion-react-components
```

Or using pnpm:

```sh
pnpm install @equinor/fusion-react-components
```

## Usage

### Import from main entry point

Import components from the main entry point:

```ts
import {
  PeoplePicker,
  PeopleViewer,
  type PersonInfo,
  type PeoplePickerProps,
  type PeopleViewerProps
} from '@equinor/fusion-react-components';
```

### Import from subpath exports

Import components from specific subpaths:

```ts
import { 
  PeoplePicker, 
  PeopleViewer,
  type PersonInfo 
} from '@equinor/fusion-react-components/person';
```

## Benefits

- **Simplified imports**: Import multiple components from a single package
- **Consistent versioning**: All components are versioned together
- **TypeScript support**: Full TypeScript definitions included
- **Tree-shakeable**: Only includes what you import
- **Subpath exports**: Import specific component groups for optimized bundling

## Included Components

This package aggregates components from:

- [@equinor/fusion-react-person](https://www.npmjs.com/package/@equinor/fusion-react-person)

For more granular control or to use individual components independently, you can install the individual packages directly.

## Contributing

See the [main repository](https://github.com/equinor/fusion-react-components) for contribution guidelines.

<!--prettier-ignore-end-->
