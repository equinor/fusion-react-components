# Inputs/Selection Controls/Switch

> **Package:** `@equinor/eds-core-react` — `import { Switch } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | No |  | Label for the switch. Required to make it a11y compliant |
| `size` | `"small" "default"` | No | default | Switch size, use the small version with caution |
| `disabled` | `boolean` | No |  | If true, the switch will be disabled |

## Examples

### Alternative to label

```tsx
() => <Switch aria-label="This label is invisible, but read by screen-readers" />
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
      <UnstyledList>
        <li>
          <Switch label="I'm default off" size="small" />
        </li>
        <li>
          <Switch label="I'm default on" defaultChecked size="small" />
        </li>
        <li>
          <Switch disabled label="You can't turn me on!" size="small" />
        </li>
        <li>
          <Switch disabled defaultChecked label="You can't turn me off!" size="small" />
        </li>
      </UnstyledList>
    </EdsProvider>;
}
```

### Default states

```tsx
() => {
  const [check, setCheck] = useState(false);
  return <UnstyledList>
      <li>
        <Switch label="I'm default off" />
      </li>
      <li>
        <Switch label="I'm default on" defaultChecked />
      </li>
      <li>
        <Switch disabled label="You can't turn me on!" />
      </li>
      <li>
        <Switch disabled defaultChecked label="You can't turn me off!" />
      </li>
      <li>
        <Switch onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.checked);
      }} checked={check} label={`Slider is ${check ? 'checked' : 'unchecked'}`} />
      </li>
    </UnstyledList>;
}
```

### Introduction

```tsx
args => {
  return <Switch label="Play with me" {...args} />;
}
```

### Table switch

```tsx
() => {
  return <Table>
      <Table.Head>
        <Table.Row>
          <Table.Cell>Selected</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(data => <Table.Row key={data.number}>
            <Table.Cell>
              <Switch aria-label={`Select ${data.description}`} />
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>;
}
```

### T
