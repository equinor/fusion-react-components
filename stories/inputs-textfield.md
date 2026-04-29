# Inputs/TextField

> **Package:** `@equinor/eds-core-react` — `import { TextField } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `"error" "warning" "success"` | No |  | Variants |
| `id` | `string` | No |  | Input unique id. If this is not provided, one will be generated |
| `label` | `ReactNode` | No |  | Label text |
| `meta` | `ReactNode` | No |  | Meta text |
| `helperText` | `string` | No |  | Helper text |
| `inputIcon` | `ReactNode` | No |  | InputIcon |
| `helperIcon` | `ReactNode` | No |  | HelperIcon |
| `unit` | `string` | No |  | Unit text |
| `inputRef` | `ForwardedRef<HTMLInputElement>` | No |  | Input ref |

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
      <div style={{
      width: '200px'
    }}>
        <TextField id="compact-textfield" defaultValue="150" label="Single line" meta="Meta" unit="km/h" helperIcon={<Icon data={info_circle} title="Info" size={16} />} helperText="Helper information text over several lines so that it breaks" />
      </div>
    </EdsProvider>;
}
```

### Datepicker

```tsx
() => <>
    <TextField id="date" label="Select date" type="date" />
    <TextField id="time" label="Select time" type="time" />
    <TextField id="datetime" label="Select date and time" type="datetime-local" />
  </>
```

### Disabled

```tsx
() => <TextField id="storybook-unit-four" placeholder="500" label="Disabled price" unit="$" meta="Meta" disabled helperText="Helper Text" />
```

### Introduction

```tsx
args => {
  return <TextField {...args} />;
}
```

### Read only

```tsx
() => <>
    <TextField id="storybook-readonly" placeholder="Placeholder text" label="Read only" readOnly />
    <TextField id="storybook-readonly-two" defaultValue="500" label="Read only" unit="$" meta="Meta" readOnly />
    <TextField id="storybook-unit-readonly-three" defaultValue="Input value" label="Read only icon" variant="success" readOnly helperText="helper text" inputIcon={<Icon name="thumbs_up" title="Success" />} />
  </>
```

### Types

```tsx
() => <>
    <TextField id="textfield-normal" placeholder="Placeholder text" label="Text" autoComplete="off" />
    <TextField type="number" id="textfield-number" placeholder="Placeholder text" label="Number" helperText="Helper text" />
    <TextField type="search" id="textfield-search" placeholder="Placeholder text" label="Search" helperText="Helper text" />
    <TextField type="email" id="textfield-email" placeholder="Placeholder text" label="Email" helperText="Helper Text" />
    <TextField type="password" id="textfield-password" placeholder="Placeholder text" label="Password" helperText="Helper Text" inputIcon={<Icon name="thumbs_up" key="thumbs" size={16} />} />
    <TextField type="text" id="textfield-datalist" placeholder="Select browser" label="With datalist" list="browsers" />
    <datalist id="browsers">
      <option value="Chrome"></option>
      <option value="Firefox"></option>
      <option value="Opera"></option>
      <option value="Safari"></option>
      <option value="Microsoft Edge"></option>
    </datalist>
  </>
```

### Validation

```tsx
() => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const handleSumbmit = (e: FormEvent) => {
    e.preventDefault();
    console.log((e.target[0] as HTMLInputElement).value);
  };
  return <form onSubmit={handleSumbmit}>
      <TextField id="number-validation" label="positive numbers only" required pattern="^\d+(\.\d+)?([eE][-+]?\d+)?$" variant={isValid ? undefined : 'error'} helperText={isValid ? undefined : 'Only positive numbers allowed'} inputIcon={isValid ? undefined : <Icon data={error_filled} title="error" />} onChange={event => {
      // TypeScript automatically infers event type - no manual annotation needed!
      setIsValid(event.target.checkValidity() && !isNaN(Number(event.target.value)));
    }} />
      <Button type="submit" style={{
      marginTop: '14px'
    }}>
        Submit
      </Button>
    </form>;
}
```

### Validation with React Hook Form

```tsx
() => {
  const {
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      data: ''
    }
  });
  return <form onSubmit={handleSubmit(data => console.log(data))}>
      <Controller name="data" control={control} rules={{
      required: 'Required',
      pattern: {
        value: /^[0-9]+$/g,
        message: 'Only digits allowed'
      }
    }} render={({
      field: {
        ref,
        ...props
      },
      fieldState: {
        error
      }
    }) => <TextField {...props} id={props.name} label="Digits only" inputRef={ref} inputIcon={error ? <Icon data={error_filled} title="error" /> : undefined} helperText={error?.message} variant={error ? 'error' : undefined} />} />
      <Button type="submit" style={{
      marginTop: '14px'
    }}>
        Submit
      </Button>
    </form>;
}
```

### Variants

```tsx
() => <>
    <TextField id="storybook-error" placeholder="Placeholder text" label="Single line" meta="Meta" helperText="Validation error" variant="error" helperIcon={<Icon name="error_filled" title="Error" size={16} />} />
    <TextField id="storybook-error-two" placeholder="Placeholder text " label="Error" unit="Unit" helperText="Validation error" variant="error" inputIcon={<Icon name="error_filled" title="Error" />} />
    <TextField id="storybook-warning" placeholder="Placeholder text" label="Single line" meta="Meta" helperText="Helper/warning text" variant="warning" helperIcon={<Icon name="warning_filled" title="Warning" size={16} />} />
    <TextField id="storybook-warning-two" placeholder="Placeholder text" label="Warning" meta="Meta" helperText="Helper/warning text" variant="warning" inputIcon={<Icon name="warning_filled" title="Warning" />} />
    <TextField id="storybook-success" placeholder="Placeholder text" label="Single line" meta="Meta" helperText="Helper text" variant="success" helperIcon={<Icon name="thumbs_up" title="Success" size={16} />} />
    <TextField id="storybook-success-two" placeholder="Placeholder text" label="Success" meta="Meta" helperText="Helper text" variant="success" inputIcon={<Icon name="thumbs_up" title="Success" />} />
  </>
```

### With Icons

```tsx
() => {
  const [icon, setIcon] = useState(true);
  return <div>
      <Button variant="outlined" onClick={() => setIcon(!icon)} style={{
      marginBottom: '16px'
    }}>
        Toggle Icon
      </Button>
      <TextField id="icons-text" type="date" defaultValue="Input text" label="Label text" meta="Meta" helperText="Helper Text" inputIcon={icon && <Icon name="done" title="Done" />} />
    </div>;
}
```

### With units

```tsx
() => <>
    <TextField id="storybook-unit" placeholder="Placeholder text" label="Price" unit="$" type="number" />
    <TextField id="storybook-unit-two" defaultValue="150" label="Speed" unit="km/h" type="number" />
  </>
```

### T
