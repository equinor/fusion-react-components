# Inputs/NativeSelect

> **Package:** `@equinor/eds-core-react` — `import { NativeSelect } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | No |  | Input unique id |
| `label` | `string` | Yes |  | Label for the select element |
| `meta` | `ReactNode` | No |  | Meta text, for instance unit |
| `disabled` | `boolean` | No | false | Disabled state |
| `multiple` | `boolean` | No | false | The user can choose multiple items |
| `selectRef` | `Ref<HTMLSelectElement>` | No |  | Ref for the select element |

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
      <NativeSelect label="This is compact" id="compact-select">
        <option>First option with a really really long text</option>
        <option>Second</option>
        <option>Third</option>
        <option>Another</option>
        <option>Even another</option>
      </NativeSelect>
    </EdsProvider>;
}
```

### Disabled

```tsx
() => <NativeSelect label="Label text" disabled id="disabled-select">
    <option>Pick one</option>
  </NativeSelect>
```

### Introduction

```tsx
args => {
  return <NativeSelect label="Label text" meta="m2" id="default-select" {...args}>
      <option>First option with a really really long text</option>
      <option>Second</option>
    </NativeSelect>;
}
```

### Multiple

```tsx
() => <NativeSelect label="Label text" id="multiple-select" multiple>
    <option>First option with a really really long text</option>
    <option>Second</option>
    <option>Third</option>
    <option>Another</option>
    <option>Even another</option>
  </NativeSelect>
```

### T
