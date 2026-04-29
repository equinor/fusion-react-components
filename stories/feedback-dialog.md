# Feedback/Dialog

> **Package:** `@equinor/eds-core-react` — `import { Dialog } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isDismissable` | `boolean` | No | false | Whether Dialog can be dismissed with esc key and outside click |
| `open` | `boolean` | Yes |  | programmatically toggle dialog |
| `onClose` | `() => void` | No |  | callback to handle closing |
| `dialogRef` | `ForwardedRef<HTMLDialogElement>` | No |  | access the dialog element. use ref to access the inner Paper element |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `scrollable` | `boolean` | No | false | Control if the content should be scrollable |

## Examples

### Dismissable

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Snackbar open={snackbar} onClose={() => setSnackbar(false)} autoHideDuration={2000}>
        Snackbar in front of scrim!
      </Snackbar>
      <Dialog open={isOpen} isDismissable onClose={handleClose}>
        <Dialog.Header>
          <Dialog.Title>Dismissable dialog</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography variant="body_short">
            Closes dialog on click outside and escape key.
          </Typography>
          <Button variant="outlined" onClick={() => setSnackbar(true)}>
            Show a snackbar
          </Button>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Tooltip title="A tooltip inside dialog" placement="top">
              <Button onClick={handleClose}>OK</Button>
            </Tooltip>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>;
}
```

### Introduction

```tsx
args => {
  const {
    open,
    isDismissable
  } = args;
  const [, updateArgs] = useArgs();
  const handleClose = () => {
    updateArgs({
      open: false
    });
  };
  const handleOpen = () => {
    updateArgs({
      open: true
    });
  };
  return <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={open} onClose={handleClose} isDismissable={isDismissable}>
        <Dialog.Header>
          <Dialog.Title>Title</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography variant="body_short">Small description here.</Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>;
}
```

### No title

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen}>
        <Dialog.CustomContent>
          <Typography variant="body_short">Small description here.</Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button onClick={handleClose} variant="ghost">
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>;
}
```

### Placeholder only

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen} isDismissable onClose={handleClose}>
        <Dialog.Header>
          <Dialog.Title>View options</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent scrollable>
          <RadioWrapper label="Down" name="first" />
          <RadioWrapper label="Up" defaultChecked name="second" />
        </Dialog.CustomContent>
      </Dialog>
    </>;
}
```

### Placeholder plus action

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen}>
        <Dialog.Header>
          <Dialog.Title>Placeholder + actions</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Placeholder>Custom content</Placeholder>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button onClick={handleClose} variant="ghost">
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>;
}
```

### Scrollable plus actions

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen}>
        <Dialog.Header>
          <Dialog.Title>Scrollable + actions</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent scrollable>
          <Typography>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Accusantium architecto suscipit laboriosam, nisi quas omnis iusto
            nam incidunt. Mollitia aliquid alias explicabo dolorum molestias
            nostrum il
          </Typography>
          <Typography>
            lum vel rem assumenda ea! Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Quo repellendus at eligendi voluptas, eos omnis
            sunt consequatur nam facilis velit veritatis quibusdam dicta
            voluptate, labore soluta deserunt, odio enim alias.
          </Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button onClick={handleClose} variant="ghost">
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>;
}
```

### Text plus action

```tsx
() => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return <>
      <Button aria-haspopup="dialog" onClick={handleOpen}>
        Trigger Dialog
      </Button>
      <Dialog open={isOpen}>
        <Dialog.Header>
          <Dialog.Title>Text + actions</Dialog.Title>
        </Dialog.Header>
        <Dialog.CustomContent>
          <Typography variant="body_short">Small description here.</Typography>
        </Dialog.CustomContent>
        <Dialog.Actions>
          <Wrapper>
            <Button onClick={handleClose}>OK</Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </Wrapper>
        </Dialog.Actions>
      </Dialog>
    </>;
}
```

### T
