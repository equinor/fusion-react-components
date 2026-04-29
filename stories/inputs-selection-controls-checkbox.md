# Inputs/Selection Controls/Checkbox

> **Package:** `@equinor/eds-core-react` — `import { Checkbox } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | No |  | Label for the checkbox |
| `disabled` | `boolean` | No | false | If true, the checkbox will be disabled |
| `indeterminate` | `boolean` | No |  | If true, the checkbox appears indeterminate. Important! You'll have to set the native element to indeterminate yourself. |

## Examples

### Alternative to label

```tsx
() => <Checkbox aria-label="This label is invisible, but read by screen-readers" />
```

### Compact

```tsx
() => {
  const [density, setDensity] = useState<Density>('comfortable');
  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);
  return <EdsProvider density={density}>
      <Checkbox label="I am compact" />
    </EdsProvider>;
}
```

### Grouped checkboxes

```tsx
() => {
  return <fieldset>
      <legend>
        We are in this together!
        <span role="img" aria-label="raising hands emoji">
          🙌
        </span>
      </legend>
      <UnstyledList>
        <li>
          <Checkbox label="Check me first" name="multiple" value="first" />
        </li>
        <li>
          <Checkbox label="Check me second" name="multiple" value="second" />
        </li>
        <li>
          <Checkbox label="Check me third" name="multiple" value="third" />
        </li>
      </UnstyledList>
    </fieldset>;
}
```

### Introduction

```tsx
args => {
  return <Checkbox label="Play with me" {...args} />;
}
```

### Single checkbox

```tsx
() => {
  // Use this to set the input to indeterminate = true as this must be done via JavaScript
  // (cannot use an HTML attribute for this)
  const indeterminateRef = useRef<HTMLElement | null>(null);
  // State for controlled example
  const [checked, updateChecked] = useState(false);
  return <UnstyledList>
      <li>
        <Checkbox label="Check me" />
      </li>
      <li>
        <Checkbox label="You can't check me!" disabled />
      </li>
      <li>
        <Checkbox label="I'm preselected" defaultChecked />
      </li>
      <li>
        <Checkbox label="You can't uncheck me!" disabled defaultChecked />
      </li>
      <li>
        <Checkbox label="I'm in indeterminate state" indeterminate ref={indeterminateRef} />
      </li>
      <li>
        <Checkbox label="I'm a controlled component" onChange={(e: ChangeEvent<HTMLInputElement>) => {
        updateChecked(e.target.checked);
      }} checked={checked} />
      </li>
    </UnstyledList>;
}
```

### Table checkbox

```tsx
() => <Table>
    <Table.Head>
      <Table.Row>
        <Table.Cell>Selected</Table.Cell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {data.map(data => <Table.Row key={data.number}>
          <Table.Cell>
            <Checkbox aria-label={`Select ${data.description}`} />
          </Table.Cell>
        </Table.Row>)}
    </Table.Body>
  </Table>
```

### Example with React Hook Form

```tsx
() => {
  // Example with external forms library, react-hook-form

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FormData>();
  const [isSubmitted, updateIsSubmitted] = useState(false);
  const [formData, updateFormData] = useState<FormData>(null);
  const onSubmit = (data: FormData) => {
    updateFormData(data);
    updateIsSubmitted(true);
    action('onSubmit')(data);
  };
  return <div>
      <Typography variant="body_short" style={{
      marginBottom: '1rem'
    }}>
        Real life example with an external{' '}
        <a href="https://react-hook-form.com/" rel="noreferrer noopener" target="blank">
          form library
        </a>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSubmitted ? <>
            <span>Submitted data:</span>
            <p>{JSON.stringify(formData)}</p>
            <Button variant="outlined" onClick={() => {
          updateIsSubmitted(false);
          updateFormData(null);
        }}>
              Reset
            </Button>
          </> : <div>
            <fieldset>
              <legend>What‘s your favourites?</legend>
              {/* Just to demonstrate style addons, a list would have been better for semantic */}
              <Wrapper name="favourites" value="pineapple" label="Pineapple" {...register('favourites')} />
              <Wrapper name="favourites" value="strawberry" label="Strawberries" {...register('favourites')} />
              <Wrapper name="favourites" value="honeyMelon" label="Honey melon" {...register('favourites')} />
              <Wrapper name="favourites" value="apples" label="Apples" {...register('favourites')} />
            </fieldset>
            <Checkbox name="agree" label="I understand that these preferences will not be saved*" id="agree" aria-invalid={errors.agree ? 'true' : 'false'} aria-describedby="error-name-required" aria-required {...register('agree', {
          required: true
        })} />
            <span role="alert" id="error-name-required" style={{
          color: 'red',
          paddingLeft: '3rem',
          fontSize: '0.75rem',
          display: errors.agree && errors.agree.type === 'required' ? 'block' : 'none'
        }}>
              Hey you! This field is required
            </span>
            <div style={{
          padding: '1rem'
        }}>
              <Button type="submit">I‘m done</Button>
            </div>
          </div>}
      </form>
    </div>;
}
```

### T
