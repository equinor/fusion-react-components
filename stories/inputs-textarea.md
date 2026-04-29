# Inputs/Textarea

> **Package:** `@equinor/eds-core-react` — `import { Textarea } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `"error" "warning" "success"` | No |  | Variants |
| `id` | `string` | No |  | Input unique id. If this is not provided, one will be generated |
| `label` | `ReactNode` | No |  | Label text |
| `meta` | `ReactNode` | No |  | Meta text |
| `helperText` | `string` | No |  | Helper text |
| `inputIcon` | `ReactNode` | No |  | InputIcon |
| `helperIcon` | `ReactNode` | No |  | HelperIcon |
| `rowsMax` | `number` | No |  | Specifies max rows for multiline |

## Examples

### Compact

```tsx
() => {
  const [density, setDensity] = useState<Density>('comfortable');
  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);
  return <EdsProvider density={density}>
      <Textarea id="compact-textarea" placeholder="Placeholder text that spans multiple lines as much as is possible." label="Multiline" rowsMax={10} variant="warning" inputIcon={<Icon name="warning_filled" title="Warning" />} helperText="Helper information text thats very very very loooonooooooong" />
    </EdsProvider>;
}
```

### Disabled

```tsx
() => <Textarea id="storybook-multiline-disabled" defaultValue="Write a comment that spans multiple lines" label="Comment" disabled rows={3} helperText="helper text" inputIcon={<Icon name="comment_important" title="Comment important" />} />
```

### Introduction

```tsx
args => <Textarea {...args} />
```

### Multiline

```tsx
() => <Textarea id="storybook-multiline" label="Multiline" rows={3} />
```

### Multiline with fixed height

```tsx
() => <Textarea id="storybook-multiline-fixedheight" defaultValue="Lorem Ipsum is simply dummy text of the printing and
    typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown
    printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five centuries,
    but also the leap into electronic typesetting,
    remaining essentially unchanged. It has survived not only five centuries,
    but also the leap into electronic typesetting,
    remaining essentially unchanged. It has survived not only five centuries,
    but also the leap into electronic typesetting,
    remaining essentially unchanged." label="Multiline with fixed height" style={{
  height: '100px'
}} />
```

### Multiline Rows Max

```tsx
() => <Textarea id="storybook-multiline-three" label="Multiline with max 10 rows" rows={1} rowsMax={10} />
```

### Read only

```tsx
() => <>
    <Textarea id="storybook-multi-readonly" label="Read only" placeholder="Placeholder text that spans multiple lines" readOnly rows={3} />
    <Textarea id="storybook-multi-readonly-two" label="Read only" defaultValue="Input value that spans multiple lines" meta="Meta" readOnly rows={3} />
    <Textarea id="storybook-multi-readonly-three" label="Read only icon" defaultValue="Input value that spans multiple lines" variant="error" readOnly rows={3} helperText="helper text" inputIcon={<Icon name="error_filled" title="Error" />} />
  </>
```

### Variants

```tsx
() => <>
    <Textarea id="multi-error" defaultValue="Input value that spans multiple lines" label="Multiline" rows={3} helperText="Validation error" variant="error" helperIcon={<Icon name="error_filled" title="Error" size={16} />} />
    <Textarea id="multi-warning-two" defaultValue="Input value that spans multiple lines" label="Multiline" rows={3} helperText="Helper/warning text" variant="warning" inputIcon={<Icon name="warning_filled" title="Warning" />} />
    <Textarea id="multi-success" defaultValue="Input value that spans multiple lines" label="Multiline" rows={3} helperText="Helper text" variant="success" helperIcon={<Icon name="thumbs_up" title="Success" size={16} />} />
  </>
```

### With icon

```tsx
() => <Textarea id="storybook-multiline-icon" placeholder="Placeholder text that spans multiple lines" label="With icon" rows={3} inputIcon={<Icon name="comment" title="Comment" />} />
```

### T
