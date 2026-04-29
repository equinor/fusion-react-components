# Inputs/Input

> **Package:** `@equinor/eds-core-react` — `import { Input } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `placeholder` | `string` | No |  | Placeholder |
| `variant` | `"error" "warning" "success"` | No |  | Variant |
| `disabled` | `boolean` | No | false | Disabled state |
| `type` | `string` | No | text | Type |
| `readOnly` | `boolean` | No |  | Read Only |
| `leftAdornments` | `ReactNode` | No |  | Left adornments |
| `rightAdornments` | `ReactNode` | No |  | Right adornments |
| `leftAdornmentsProps` | `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">` | No |  | Left adornments props |
| `rightAdornmentsProps` | `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">` | No |  | Right adornments props |
| `leftAdornmentsWidth` | `number` | No |  | Manually specify left adornments width. The width will be the dom element width if not defined |
| `rightAdornmentsWidth` | `number` | No |  | Manually specify right adornments width. The width will be the dom element width if not defined |
| `as` | `ElementType` | No |  | Cast the input to another element |

## Examples

### Accessiblity

```tsx
() => {
  // To wrap the input component inside the label element is not yet supported
  return <>
      <Label htmlFor="a11yExample" label="I use the htmlFor prop" />
      <Input type="text" id="a11yExample" />
    </>;
}
```

### Casted

```tsx
args => {
  return <Input as="textarea" {...args} />;
}
```

### Compact

```tsx
() => {
  // To wrap the input component inside the label element is not yet supported
  const [density, setDensity] = useState<Density>('comfortable');
  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);
  return <EdsProvider density={density}>
      <Label htmlFor="compact" label="Compact" />
      <Input type="text" id="compact" />
    </EdsProvider>;
}
```

### Disabled

```tsx
() => <>
    <Label htmlFor="textfield-disabled" label="Disabled" />
    <Input id="textfield-disabled" placeholder="Placeholder text" disabled />
  </>
```

### Introduction

```tsx
args => {
  return <Input {...args} />;
}
```

### Override Background

```tsx
args => {
  return <Input style={{
    '--eds-input-background': '#fff'
  } as React.CSSProperties} {...args} />;
}
```

### Read only

```tsx
() => <>
    <Label htmlFor="textfield-readOnly" label="Read only" />
    <Input id="textfield-readOnly" placeholder="Placeholder text" readOnly />
  </>
```

### Types

```tsx
() => <>
    <div>
      <Label htmlFor="textfield-normal" label="Text" />
      <Input id="textfield-normal" autoComplete="off" />
    </div>
    <div>
      <Label htmlFor="textfield-number" label="Number" />
      <Input type="number" id="textfield-number" />
    </div>
    <div>
      <Label htmlFor="textfield-password" label="Password" />
      <Input type="password" id="textfield-password" />
    </div>
  </>
```

### Variants

```tsx
() => <>
    <div>
      <Label htmlFor="textfield-default" label="Default" />
      <Input id="textfield-default" placeholder="Placeholder text" autoComplete="off" />
    </div>
    <div>
      <Label htmlFor="textfield-success" label="Success" />
      <Input id="textfield-success" placeholder="Placeholder text" autoComplete="off" variant="success" />
    </div>
    <div>
      <Label htmlFor="textfield-warning" label="Warning" />
      <Input id="textfield-warning" placeholder="Placeholder text" autoComplete="off" variant="warning" />
    </div>
    <div>
      <Label htmlFor="textfield-error" label="Error" />
      <Input id="textfield-error" placeholder="Placeholder text" autoComplete="off" variant="error" />
    </div>
  </>
```

### With Adornments

```tsx
() => {
  return <EdsProvider>
      <Label htmlFor="adornments-default" label="Default" />
      <Input type="text" id="adornments-default" placeholder="Placeholder text Placeholder text" leftAdornments={<SmallButton variant="ghost_icon">IT</SmallButton>} rightAdornments={<>
            unit
            <Icon data={anchor} size={18}></Icon>
          </>} />
      <Label htmlFor="adornments-error" label="Error" />
      <Input type="text" id="adornments-error" variant="error" leftAdornments={<SmallButton variant="ghost_icon">IT</SmallButton>} rightAdornments={<>
            unit
            <Icon data={anchor} size={18}></Icon>
          </>} />
      <Label htmlFor="adornments-warning" label="Warning" />
      <Input type="text" id="adornments-warning" variant="warning" leftAdornments={<SmallButton variant="ghost_icon">IT</SmallButton>} rightAdornments={<>
            unit
            <Icon data={anchor} size={18}></Icon>
          </>} />
      <Label htmlFor="adornments-success" label="Success" />
      <Input type="text" id="adornments-success" variant="success" leftAdornments={<SmallButton variant="ghost_icon">IT</SmallButton>} rightAdornments={<>
            unit
            <Icon data={anchor} size={18}></Icon>
          </>} />
      <Label htmlFor="adornments-disabled" label="Disabled" />
      <Input type="text" id="adornments-disabled" disabled placeholder="Placeholder text Placeholder text" value="Some text Some textSome textSome text" leftAdornments={<SmallButton disabled variant="ghost_icon">
            IT
          </SmallButton>} rightAdornments={<>
            unit
            <Icon data={anchor} size={18}></Icon>
          </>} />
      <Label htmlFor="adornments-readonly" label="Readonly" />
      <Input type="text" id="adornments-readonly" readOnly leftAdornments={<SmallButton variant="ghost_icon">IT</SmallButton>} rightAdornments={<>
            unit
            <Icon data={anchor} size={18}></Icon>
          </>} />
    </EdsProvider>;
}
```

### With icons

```tsx
() => {
  const [icon, setIcon] = useState(true);
  return <>
      <div>
        <Button variant="outlined" onClick={() => setIcon(!icon)} style={{
        marginBottom: '16px'
      }}>
          Toggle Icon
        </Button>
        <Input id="icons-text" type="date" defaultValue="Input text" label="Label text" meta="Meta" helperText="Helper Text" leftAdornments={icon && <Icon name="done" title="Done" />} />
        <Input id="icons-text" type="date" defaultValue="Input text" label="Label text" meta="Meta" helperText="Helper Text" rightAdornments={icon && <Icon name="done" title="Done" />} />
        <Input id="icons-text" type="date" defaultValue="Input text" label="Label text" meta="Meta" helperText="Helper Text" rightAdornments={icon && <Icon name="done" title="Done" />} leftAdornments={icon && <Icon name="done" title="Done" />} />
      </div>
    </>;
}
```

### T
