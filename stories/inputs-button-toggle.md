# Inputs/Button/Toggle

> **Package:** `@equinor/eds-core-react` — `import { Button } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `multiple` | `boolean` | No |  | Multiple |
| `selectedIndexes` | `number[]` | No |  | Array of selected indexses. |
| `onChange` | `(indexes: number[]) => void` | No |  | OnChange |
| `vertical` | `boolean` | No |  | Display ButtonGroup vertically. |

## Examples

### Controlled

```tsx
() => {
  const [selectedButtons, setSelectedButtons] = useState([0, 1]);
  const handleChange = (indexes: number[]) => {
    setSelectedButtons(indexes);
  };
  return <Button.Toggle multiple selectedIndexes={selectedButtons} onChange={handleChange} aria-label="date and time actions">
      <Button aria-label="calendar">
        <Icon data={calendar} title="Ghost icon calendar"></Icon>
      </Button>
      <Button aria-label="time">
        <Icon data={time} title="Ghost icon time"></Icon>
      </Button>
      <Button aria-label="alarm">
        <Icon data={alarm} title="Ghost icon alarm"></Icon>
      </Button>
    </Button.Toggle>;
}
```

### Introduction

```tsx
args => {
  return <Button.Toggle {...args} aria-label="file actions">
      <Button aria-label="save action">
        <Icon data={save} title="Ghost icon save"></Icon>
      </Button>
      <Button aria-label="edit action">
        <Icon data={edit} title="Ghost icon edit"></Icon>
      </Button>
      <Button aria-label="copy action">
        <Icon data={copy} title="Ghost icon copy"></Icon>
      </Button>
    </Button.Toggle>;
}
```

### Multiple selection

```tsx
() => {
  return <Button.Toggle multiple aria-label="date and time actions">
      <Button aria-label="calendar">
        <Icon data={calendar} title="Ghost icon calendar"></Icon>
      </Button>
      <Button aria-label="time">
        <Icon data={time} title="Ghost icon time"></Icon>
      </Button>
      <Button aria-label="alarm">
        <Icon data={alarm} title="Ghost icon alarm"></Icon>
      </Button>
      <Button aria-label="timer">
        <Icon data={timer} title="Ghost icon timer"></Icon>
      </Button>
    </Button.Toggle>;
}
```

### Single selection

```tsx
() => {
  const tooltipDelay = 500;
  return <Button.Toggle aria-label="file actions">
      <Tooltip title="Save" enterDelay={tooltipDelay}>
        <Button>
          <Icon data={save} title="Ghost icon save"></Icon>
        </Button>
      </Tooltip>
      <Tooltip title="Edit" enterDelay={tooltipDelay}>
        <Button>
          <Icon data={edit} title="Ghost icon edit"></Icon>
        </Button>
      </Tooltip>
      <Tooltip title="Copy" enterDelay={tooltipDelay}>
        <Button>
          <Icon data={copy} title="Ghost icon copy"></Icon>
        </Button>
      </Tooltip>
    </Button.Toggle>;
}
```

### Wrapped

```tsx
() => {
  type ButtonProps = ComponentProps<typeof Button> & JSX.IntrinsicAttributes & {
    title: string;
  };
  const ButtonWrapper = ({
    title,
    ...props
  }: ButtonProps) => {
    return <Button {...props}>{title}</Button>;
  };
  return <Button.Toggle aria-label="wrapper example">
      <ButtonWrapper title="Hello" />
      <ButtonWrapper title="world" />
      <ButtonWrapper title="foo" />
    </Button.Toggle>;
}
```

### T
