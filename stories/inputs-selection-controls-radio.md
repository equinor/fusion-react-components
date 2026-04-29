# Inputs/Selection Controls/Radio

> **Package:** `@equinor/eds-core-react` — `import { Radio } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | No |  | Label for the radio |
| `disabled` | `boolean` | No | false | If true, the radio button will be disabled |

## Examples

### Alternative to label

```tsx
() => <Radio aria-label="This label is invisible, but read by screen-readers" />
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
      <Radio label="I am compact" />
    </EdsProvider>;
}
```

### Custom label

```tsx
() => {
  const [selectedValue, setSelectedValue] = useState('');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => setSelectedValue(event.target.value);
  return <>
      <Typography variant="h3" id="radiogroup-label">
        Select one
      </Typography>
      <div role="radiogroup" aria-labelledby="radiogroup-label">
        <Control>
          <FilledLabel htmlFor="radio-1" label="Label 1" />
          <Radio id="radio-1" value="1" checked={selectedValue === '1'} onChange={onChange} />
        </Control>
        <Control>
          <FilledLabel htmlFor="radio-2" label="Label 2" />
          <Radio id="radio-2" value="2" checked={selectedValue === '2'} onChange={onChange} />
        </Control>
        <Control>
          <FilledLabel htmlFor="radio-3" label="Label 3" />
          <Radio id="radio-3" value="3" checked={selectedValue === '3'} onChange={onChange} />
        </Control>
      </div>
    </>;
}
```

### Multiple radio buttons in a group

```tsx
() => {
  const [checked, updateChecked] = useState('one');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateChecked(event.target.value);
  };
  return <fieldset>
      <legend>
        We are in this together!
        <span role="img" aria-label="raising hands emoji">
          🙌
        </span>
      </legend>
      <UnstyledList>
        <li>
          <Radio label="I'm number one and preselected" name="group" value="one" checked={checked === 'one'} onChange={onChange} />
        </li>
        <li>
          <Radio label="I'm number two" name="group" value="two" checked={checked === 'two'} onChange={onChange} />
        </li>
        <li>
          <Radio label="I'm number three" name="group" value="three" checked={checked === 'three'} onChange={onChange} />
        </li>
      </UnstyledList>
    </fieldset>;
}
```

### Introduction

```tsx
args => {
  return <Radio label="Play with me" {...args} />;
}
```

### Single radio buttons

```tsx
() => {
  return <UnstyledList>
      <li>
        <Radio label="Check me" name="first" />
      </li>
      <li>
        <Radio label="You can't check me!" disabled name="second" />
      </li>
      <li>
        <Radio label="I'm preselected" defaultChecked name="third" />
      </li>
      <li>
        <Radio label="You can't uncheck me!" disabled defaultChecked name="fourth" />
      </li>
    </UnstyledList>;
}
```

### Table radio

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
            <Radio aria-label={`Select ${data.description}`} />
          </Table.Cell>
        </Table.Row>)}
    </Table.Body>
  </Table>
```

### T
