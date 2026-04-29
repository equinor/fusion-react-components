# Inputs/Label

> **Package:** `@equinor/eds-core-react` — `import { Label } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|

## Examples

### Accessiblity

```tsx
() => {
  // To wrap the input component inside the label element is not yet supported
  return <>
      <Label label="I use the htmlFor prop" htmlFor="speed" />
      <Input type="text" id="speed" />
    </>;
}
```

### Disabled

```tsx
() => <Label label="I'm disabled, that means I belong to a disabled input field" disabled />
```

### Introduction

```tsx
args => <Label label="I'm a label, play with me!" {...args} />
```

### With meta text

```tsx
() => <Label label="Speed" meta="km/h" />
```

### T
