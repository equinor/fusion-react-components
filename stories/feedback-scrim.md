# Feedback/Scrim

> **Package:** `@equinor/eds-core-react` — `import { Scrim } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isDismissable` | `boolean` | No | false | Whether scrim can be dismissed with esc key and outside click |
| `open` | `boolean` | Yes |  | programmatically toggle scrim |
| `onClose` | `() => void` | No |  | function to handle closing scrim |

## Examples

### Dismissable

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  return <div style={{
    minHeight: '30vh'
  }}>
      <Button onClick={() => setIsOpen(true)}>Open SideSheet</Button>
      <Scrim open={isOpen} onClose={() => setIsOpen(false)} isDismissable>
        <SideSheet open={isOpen} onClose={() => setIsOpen(false)}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora,
          esse labore. Asperiores tempore ex amet veniam consequatur dolorum
          perferendis, nihil non, culpa, modi sed nisi. Repellat, labore? Error,
          accusantium sed?
        </SideSheet>
      </Scrim>
    </div>;
}
```

### Introduction

```tsx
args => {
  const {
    open
  } = args;
  const [, updateArgs] = useArgs();
  const handleOpen = () => {
    updateArgs({
      open: true
    });
  };
  const handleClose = () => {
    updateArgs({
      open: false
    });
  };
  return <>
      <Button onClick={handleOpen}>SHOW SCRIM</Button>
      <Scrim {...args} open={open} onClose={handleClose}>
        <Button onClick={handleClose}>HIDE SCRIM</Button>
      </Scrim>
    </>;
}
```

### T
