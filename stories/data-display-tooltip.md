# Data Display/Tooltip

> **Package:** `@equinor/eds-core-react` — `import { Tooltip } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `placement` | `"bottom" "top" "left" "right" "bottom-start" "bottom-end" "top-start" "top-end" "left-start" "left-end" "right-start" "right-end"` | No | bottom | Tooltip placement relative to anchor |
| `title` | `ReactNode` | No |  | Tooltip title |
| `disabled` | `boolean` | No | false | Disable the tooltip |
| `enterDelay` | `number` | No | 100 | Delay in ms, default 100 |
| `portalContainer` | `HTMLElement` | No | document.body | Portal container |

## Examples

### Custom portal element

```tsx
() => {
  const [element, setElement] = useState<null | HTMLElement>(null);
  return <>
      <div ref={el => {
      setElement(el);
    }}>
        #root
      </div>
      <EdsProvider rootElement={element}>
        <Tooltip title={'This tooltip renders within the #root div, set from EdsProvider'}>
          <Icon data={explore} />
        </Tooltip>
      </EdsProvider>
      <Tooltip title={'This tooltip renders within the #root div, but from portalContainer prop'} portalContainer={element}>
        <Icon data={explore} />
      </Tooltip>
    </>;
}
```

### Introduction

```tsx
args => <Tooltip {...args}>
    <Button variant="ghost_icon">
      <Icon data={explore} title="explore"></Icon>
    </Button>
  </Tooltip>
```

### Long list with toolstips

```tsx
() => {
  const items = Array(100).fill(1);
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    height: '200px'
  }}>
      {items.map((_, i) =>
    // eslint-disable-next-line react/no-array-index-key
    <span key={i}>
          <Tooltip title={`Icon ${i}`} placement="right">
            <Icon data={explore} />
          </Tooltip>
        </span>)}
    </div>;
}
```

### On table cells

```tsx
() => {
  const cellValues = toCellValues(data, columns);
  return <Table>
      <Table.Caption>
        <Typography variant="h2">Fruits cost price</Typography>
      </Table.Caption>
      <Table.Head>
        <Table.Row>
          {columns.map(col => <Table.Cell key={`head-${col.accessor}`}>{col.name}</Table.Cell>)}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {cellValues?.map(row => <Table.Row key={row.toString()}>
            {row.map(cellValue => {
          return <Tooltip key={cellValue} placement="top" title={`Tooltip title for ` + cellValue}>
                  <Table.Cell key={cellValue}>{cellValue}</Table.Cell>
                </Tooltip>;
        })}
          </Table.Row>)}
      </Table.Body>
    </Table>;
}
```

### Radio and checkboxes

```tsx
() => <>
    <Tooltip placement="top" title="tooltip on an input">
      <Checkbox label="Checkbox with tooltip" />
    </Tooltip>
    <br />
    <Tooltip title="Tooltip on a span around input">
      <span>
        <Checkbox label="Checkbox in span with tooltip" />
      </span>
    </Tooltip>
  </>
```

### Tooltip on disabled Button

```tsx
() => <>
    <Tooltip title="This is what a tooltip looks like">
      <Button>Hover me</Button>
    </Tooltip>
    <Tooltip title="This tooltip only shows for people using mouse. Don't do this!">
      <Button disabled>Disabled button</Button>
    </Tooltip>
    <Tooltip title="Tooltip works with keyboard navigation when using aria-disabled">
      <Button aria-disabled>Aria-disabled button</Button>
    </Tooltip>
  </>
```

### With delay

```tsx
() => {
  return <Tooltip enterDelay={300} title="Tooltip with delay">
      <Typography link href="#">
        Hover me!
      </Typography>
    </Tooltip>;
}
```

### T
