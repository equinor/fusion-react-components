# Inputs/InputWrapper

> **Package:** `@equinor/eds-core-react` — `import { InputWrapper } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | No |  | Label |
| `disabled` | `boolean` | No |  | Disabled state |
| `readOnly` | `boolean` | No |  | Read Only |
| `color` | `"error" "warning" "success"` | No |  | Highlight color |
| `labelProps` | `LabelProps` | No | {} | Label props |
| `helperProps` | `HelperTextProps` | No | {} | Helpertext props |
| `helperIcon` | `ReactNode` | No |  | Helper Icon |

## Examples

### Introduction

```tsx
args => {
  const helperProps = {
    text: 'helperText'
  };
  return <InputWrapper helperProps={helperProps} labelProps={{
    label: "I'm a label, play with me!"
  }} {...args}>
      <Input />
    </InputWrapper>;
}
```
