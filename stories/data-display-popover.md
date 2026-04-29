# Data Display/Popover

> **Package:** `@equinor/eds-core-react` — `import { Popover } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `placement` | `"bottom" "top" "left" "right" "bottom-start" "bottom-end" "top-start" "top-end" "left-start" "left-end" "right-start" "right-end"` | No | bottom | Popover placement relative to anchor |
| `onClose` | `() => void` | No |  | On Close callback |
| `anchorEl` | `HTMLElement` | No |  | Anchor element reference |
| `open` | `boolean` | Yes |  | Is Popover open |

| `trapFocus` | `boolean` | No |  | Determines whether focus should be trapped within dropdown, default to false. |

## Examples

### Activate onClick

```tsx
() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);
  return <>
      <Button aria-haspopup aria-expanded={isOpen} ref={setAnchorEl} onClick={openPopover}>
        Click to activate
      </Button>

      <Popover anchorEl={anchorEl} onClose={closePopover} open={isOpen} placement="top">
        <Popover.Header>
          <Popover.Title>Title</Popover.Title>
        </Popover.Header>
        <Popover.Content>
          <Typography variant="body_short">Popover content</Typography>
        </Popover.Content>
      </Popover>
    </>;
}
```

### Activate onHover

```tsx
() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  let timer: ReturnType<typeof setTimeout> = null;
  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);
  const handleHover = () => {
    timer = setTimeout(() => {
      openPopover();
    }, 300);
  };
  const handleClose = () => {
    clearTimeout(timer);
    closePopover();
  };
  return <>
      <Button aria-haspopup aria-expanded={isOpen} ref={setAnchorEl} onMouseOver={handleHover} onFocus={openPopover} onBlur={handleClose}>
        Hover to activate
      </Button>

      <Popover anchorEl={anchorEl} onClose={handleClose} open={isOpen} placement="top">
        <Popover.Header>
          <Popover.Title>Title</Popover.Title>
        </Popover.Header>
        <Popover.Content>
          <Typography variant="body_short">Popover content</Typography>
        </Popover.Content>
      </Popover>
    </>;
}
```

### App launcher

```tsx
() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);
  return <>
      <Button aria-haspopup aria-expanded={isOpen} aria-label="app launcher" ref={setAnchorEl} variant="ghost_icon" onClick={openPopover}>
        <Icon data={apps} />
      </Button>
      <Popover anchorEl={anchorEl} open={isOpen} onClose={closePopover} placement="top" trapFocus>
        <Popover.Content>
          <Wrapper>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={home} />
                <Label label="Home" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={calendar} />
                <Label label="Calendar" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={settings} />
                <Label label="Settings" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={platform} />
                <Label label="Platforms" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={instrument} />
                <Label label="Instruments" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={pipe_support} />
                <Label label="Pipes" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={sun} />
                <Label label="Solar" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={waves} />
                <Label label="Wave" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={turbine} />
                <Label label="Wind" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={email} />
                <Label label="Email" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={contacts} />
                <Label label="Contacts" />
              </IconWrapper>
            </StyledButton>
            <StyledButton onClick={closePopover} variant="ghost_icon">
              <IconWrapper>
                <Icon data={support} />
                <Label label="Support" />
              </IconWrapper>
            </StyledButton>
          </Wrapper>
        </Popover.Content>
      </Popover>
    </>;
}
```

### Introduction

```tsx
args => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    setIsOpen(args.open);
    // eslint-disable-next-line react/destructuring-assignment
  }, [args.open]);
  return <>
      <Button aria-haspopup aria-expanded={isOpen} ref={setAnchorEl} onClick={handleOpen}>
        Open popover
      </Button>

      <Popover open={isOpen} {...args} anchorEl={anchorEl} onClose={handleClose}>
        <Popover.Header>
          <Popover.Title>Title</Popover.Title>
          <Button style={{
          height: '32px',
          width: '32px'
        }} variant="ghost_icon" aria-label="Close popover" onClick={handleClose}>
            <Icon name="close" data={close} size={24} />
          </Button>
        </Popover.Header>
        <Popover.Content>
          <Typography variant="body_short">Popover content</Typography>
        </Popover.Content>
      </Popover>
    </>;
}
```

### Persistent popover

```tsx
() => {
  const counties = ['Oslo', 'Rogaland', 'Møre og Romsdal', 'Nordland', 'Viken', 'Innlandet', 'Vestfold og Telemark', 'Agder', 'Vestland', 'Trøndelag', 'Troms og Finnmark'];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);
  return <>
      <Button aria-haspopup aria-expanded={isOpen} ref={setAnchorEl} onClick={openPopover}>
        Open popover
      </Button>

      <Popover aria-expanded={isOpen} anchorEl={anchorEl} open={isOpen} placement="top" trapFocus>
        <Popover.Header>
          <Popover.Title>With Autocomplete</Popover.Title>
        </Popover.Header>
        <Popover.Content>
          <Autocomplete label="Select a county" options={counties} />
        </Popover.Content>
        <Popover.Actions>
          <Button onClick={closePopover}>OK</Button>
        </Popover.Actions>
      </Popover>
    </>;
}
```

### With close button

```tsx
() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openPopover = () => setIsOpen(true);
  const closePopover = () => setIsOpen(false);
  return <>
      <Button aria-haspopup aria-expanded={isOpen} ref={setAnchorEl} onClick={openPopover}>
        Open popover
      </Button>

      <Popover anchorEl={anchorEl} onClose={closePopover} open={isOpen} placement="top" trapFocus>
        <Popover.Header>
          <Popover.Title>Title</Popover.Title>
          <Button style={{
          height: '32px',
          width: '32px'
        }} variant="ghost_icon" aria-label="Close popover" onClick={closePopover}>
            <Icon name="close" data={close} size={24} />
          </Button>
        </Popover.Header>
        <Popover.Content>
          <Typography variant="body_short">Popover content</Typography>
        </Popover.Content>
      </Popover>
    </>;
}
```

### T
