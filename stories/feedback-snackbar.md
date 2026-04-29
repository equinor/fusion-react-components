# Feedback/Snackbar

> **Package:** `@equinor/eds-core-react` — `import { Snackbar } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | No | false | Controls the visibility of the snackbar |
| `autoHideDuration` | `number` | No | 7000 | How long will the message be visible in milliseconds |
| `onClose` | `() => void` | No |  | Callback fired when the snackbar is closed by auto hide duration timeout |
| `placement` | `"bottom" "top" "left" "right" "top-left" "bottom-left" "top-right" "bottom-right"` | No | bottom | Placement of the snackbar relative to the viewport |

## Examples

### Introduction

```tsx
args => {
  const {
    open
  } = args;
  const [visible, setVisible] = useState(open);
  return <>
      <Button type="button" onClick={() => setVisible(true)}>
        Show a simple snackbar with default options
      </Button>
      <Snackbar {...args} open={visible} onClose={() => setVisible(false)}>
        Play with me
      </Snackbar>
    </>;
}
```

### Simple

```tsx
() => {
  const [open, setOpen] = useState(false);
  return <>
      <Button type="button" onClick={() => setOpen(true)}>
        Show a simple snackbar for 5 seconds
      </Button>
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={5000}>
        Message goes here
      </Snackbar>
    </>;
}
```

### Test to ensure timer stays consistent across rerenders

```tsx
() => {
  const [message, setMessage] = useState({
    open: false,
    text: ''
  });
  const [data, setData] = useState(0);
  const handleClick = () => {
    setMessage({
      open: !message.open,
      text: 'Hello, World!'
    });
  };
  const handleDataClick = () => {
    setData(data + 1);
  };
  return <>
      <div>
        <Button onClick={() => handleClick()}>Show Snackbar</Button>
        <Button style={{
        marginLeft: '10px'
      }} onClick={() => handleDataClick()}>
          Data + {data}
        </Button>
      </div>

      <Snackbar open={message.open} onClose={() => setMessage({
      open: false,
      text: ''
    })} autoHideDuration={2000}>
        {message.text}
      </Snackbar>
    </>;
}
```

### With action

```tsx
() => {
  const [withActionOpen, setWithActionOpen] = useState(false);
  return <>
      <Button type="button" onClick={() => setWithActionOpen(true)}>
        Show a snackbar with action for the default 7 seconds
      </Button>
      <Snackbar open={withActionOpen} onClose={() => setWithActionOpen(false)}>
        Your changes was saved
        <Snackbar.Action>
          <Button variant="ghost">Undo</Button>
        </Snackbar.Action>
      </Snackbar>
    </>;
}
```

### T
