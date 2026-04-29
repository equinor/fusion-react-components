# Navigation/Breadcrumbs

> **Package:** `@equinor/eds-core-react` — `import { Breadcrumbs } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `collapse` | `boolean` | No | false | Collapses the list of breadcrumbs so that only the first and last breadcrumb will be shown, with an ellipsis in between |
| `separator` | `ReactNode` | No | / | Custom separator can be a character or an Icon |
| `wrap` | `boolean` | No | true | Will not wrap breadcrumbs when set to false, but will instead trunkate each breadcrumb when viewport narrows |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|

| `forceTooltip` | `boolean` | No |  | Always show tooltip |
| `as` | `ElementType` | No |  | Override element type |

## Examples

### Collapsed

```tsx
() => <Breadcrumbs collapse>
    <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
      Store
    </Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
      Fruits
    </Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
      Apple
    </Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb href="#" onClick={handleClick} aria-current="page">
      Apple Juice
    </Breadcrumbs.Breadcrumb>
  </Breadcrumbs>
```

### Custom Seperator

```tsx
() => {
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Breadcrumbs separator={<Icon data={chevron_right}></Icon>}>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          Label One
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          Label Two
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          A really rally long label
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          Label Four
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          Label Five
        </Breadcrumbs.Breadcrumb>
      </Breadcrumbs>
      <Breadcrumbs separator="\">
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          Label One
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          Label Two
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          A really rally long label
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          Label Four
        </Breadcrumbs.Breadcrumb>
        <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
          Label Five
        </Breadcrumbs.Breadcrumb>
      </Breadcrumbs>
    </div>;
}
```

### Introduction

```tsx
args => {
  return <Breadcrumbs {...args}>
      <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
        Label One
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
        Label Two
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
        Label Three
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
        Label Four
      </Breadcrumbs.Breadcrumb>
      <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
        Label Five
      </Breadcrumbs.Breadcrumb>
    </Breadcrumbs>;
}
```

### Normal

```tsx
() => <Breadcrumbs>
    <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
      Store
    </Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb href="#" onClick={handleClick}>
      Fruits
    </Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb href="#" onClick={handleClick} aria-current="page">
      Apple
    </Breadcrumbs.Breadcrumb>
  </Breadcrumbs>
```

### Truncated labels

```tsx
() => <Breadcrumbs>
    <Breadcrumbs.Breadcrumb href="#" maxWidth={30} onClick={handleClick}>
      Store
    </Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb href="#" maxWidth={30} onClick={handleClick}>
      Fruits
    </Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb maxWidth={30} href="#" onClick={handleClick} aria-current="page">
      Apple
    </Breadcrumbs.Breadcrumb>
  </Breadcrumbs>
```

### Wrapped

```tsx
() => {
  const [wrap, setWrap] = useState(true);
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
      <Checkbox label="Wrap" onChange={(e: ChangeEvent<HTMLInputElement>) => {
      setWrap(e.target.checked);
    }} checked={wrap} />
      <Resizable>
        <Breadcrumbs wrap={wrap}>
          <Breadcrumbs.Breadcrumb forceTooltip href="#" onClick={handleClick}>
            Label One
          </Breadcrumbs.Breadcrumb>
          <Breadcrumbs.Breadcrumb forceTooltip href="#" onClick={handleClick}>
            Label Two
          </Breadcrumbs.Breadcrumb>
          <Breadcrumbs.Breadcrumb forceTooltip href="#" onClick={handleClick}>
            A really rally long label
          </Breadcrumbs.Breadcrumb>
          <Breadcrumbs.Breadcrumb forceTooltip href="#" onClick={handleClick}>
            Label Four
          </Breadcrumbs.Breadcrumb>
          <Breadcrumbs.Breadcrumb forceTooltip href="#" onClick={handleClick}>
            Label Five
          </Breadcrumbs.Breadcrumb>
        </Breadcrumbs>
      </Resizable>
    </div>;
}
```

### T
