<!--prettier-ignore-start-->
# @equinor/fusion-react-select 

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-select.svg)](https://www.npmjs.com/package/@equinor/fusion-react-select)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/input-select)

[Fusion Web Component](https://github.com/equinor/fusion-web-components/tree/main/packages/select)

### Installation

```sh
npm install @equinor/fusion-react-select
```

### Example Usage

```tsx
import { Select } from '@equinor/fusion-react-select';
const Component = ({value}: ComponentProps) => {
  const [sel, setSel] = useState(value);
  return (
    <div>
      <Select onAction={(e) => setSel(e.details)} />
      <span>Value: {sel}</span>
    </div>
  );
};
```
