# Navigation/Menu

> **Package:** `@equinor/eds-core-react` — `import { Menu } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `anchorEl` | `HTMLElement` | No |  | Anchor element for Menu |
| `open` | `boolean` | Yes |  | Is Menu open |
| `onClose` | `() => void` | No |  | onClose handler |
| `placement` | `"bottom" "top" "left" "right" "bottom-start" "bottom-end" "top-start" "top-end" "left-start" "left-end" "right-start" "right-end"` | No | bottom | Menu placement relative to anchorEl |
| `matchAnchorWidth` | `boolean` | No | false | Match the width of the menu with the width of the anchorEl |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `index` | `number` | No | 0 |  |
| `active` | `boolean` | No |  | Is active |
| `disabled` | `boolean` | No |  | Is disabled |
| `onClick` | `((e: MouseEvent<Element, MouseEvent>) => void) & MouseEventHandler<HTMLButtonElement>` | No |  | onClick handler |
| `closeMenuOnClick` | `boolean` | No | true | Close menu when item is clicked |
| `as` | `ElementType` | No | button | Override element type |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|

| `title` | `string` | No |  | Section title |

## Examples

### As Link

```tsx
() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return <>
      <Button ref={setAnchorEl} id="anchor-as" aria-haspopup="true" aria-expanded={isOpen} aria-controls="menu-as" onClick={() => isOpen ? closeMenu() : openMenu()}>
        Open menu
      </Button>
      <Menu open={isOpen} id="menu-as" aria-labelledby="anchor-as" onClose={closeMenu} anchorEl={anchorEl}>
        <Menu.Item as="a" onClick={closeMenu} href="https://eds.equinor.com/" target="_blank" style={{
        justifyContent: 'space-between'
      }}>
          <Typography group="navigation" variant="menu_title" as="span">
            EDS homepage
          </Typography>
          <Icon data={external_link} size={16} color={colors.text.static_icons__tertiary.hex} />
        </Menu.Item>
        <Menu.Item as="a" onClick={closeMenu} href="https://equinor.com/" target="_blank" style={{
        justifyContent: 'space-between'
      }}>
          <Typography group="navigation" variant="menu_title" as="span">
            Equinor.com
          </Typography>
          <Icon data={external_link} size={16} color={colors.text.static_icons__tertiary.hex} />
        </Menu.Item>
      </Menu>
    </>;
}
```

### Compact

```tsx
() => {
  const [density, setDensity] = useState<Density>('comfortable');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);
  return <EdsProvider density={density}>
      <Button ref={setAnchorEl} id="anchor-compact" aria-haspopup="true" aria-expanded={isOpen} aria-controls="menu-compact" onClick={() => isOpen ? closeMenu() : openMenu()}>
        Click to open Menu!
      </Button>
      <EdsProvider density="compact">
        <Menu open={isOpen} id="menu-compact" aria-labelledby="anchor-compact" onClose={closeMenu} anchorEl={anchorEl}>
          <Menu.Item onClick={onClick}>Pressure</Menu.Item>
          <Menu.Item onClick={onClick}>Bearing</Menu.Item>
          <Menu.Item onClick={onClick}>Cable</Menu.Item>
        </Menu>
      </EdsProvider>
    </EdsProvider>;
}
```

### Complex

```tsx
() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return <>
      <Button ref={setAnchorEl} id="anchor-complex" aria-controls="menu-complex" aria-haspopup="true" aria-expanded={isOpen} onClick={() => isOpen ? closeMenu() : openMenu()}>
        Click to open Menu!
      </Button>

      <Menu id="menu-complex" aria-labelledby="anchor-complex" open={isOpen} anchorEl={anchorEl} onClose={closeMenu} placement="right">
        <Menu.Item onClick={onClick}>
          <Icon data={folder} size={16} color={colors.text.static_icons__tertiary.hex} />
          <Typography group="navigation" variant="menu_title" as="span">
            Open
          </Typography>
          <Typography color={colors.text.static_icons__tertiary.hex} group="navigation" variant="label" as="span">
            CTRL+O
          </Typography>
        </Menu.Item>
        <Menu.Item active onClick={onClick}>
          <Icon data={copy} size={16} color={colors.text.static_icons__tertiary.hex} />
          <Typography group="navigation" variant="menu_title" as="span">
            Copy
          </Typography>
          <Typography color={colors.text.static_icons__tertiary.hex} group="navigation" variant="label" as="span">
            CTRL+C
          </Typography>
        </Menu.Item>
        <Menu.Item disabled onClick={onClick}>
          <Icon data={paste} size={16} color={colors.text.static_icons__tertiary.hex} />
          <Typography group="navigation" variant="menu_title" as="span">
            Paste
          </Typography>
          <Typography color={colors.text.static_icons__tertiary.hex} group="navigation" variant="label" as="span">
            CTRL+V
          </Typography>
        </Menu.Item>
        <Menu.Item onClick={onClick}>
          <Icon data={edit} size={16} color={colors.text.static_icons__tertiary.hex} />
          <Typography group="navigation" variant="menu_title" as="span">
            Rename
          </Typography>
          <Typography color={colors.text.static_icons__tertiary.hex} group="navigation" variant="label" as="span">
            CTRL+R
          </Typography>
        </Menu.Item>
        <Menu.Item onClick={onClick}>
          <Icon data={delete_to_trash} size={16} color={colors.text.static_icons__tertiary.hex} />
          <Typography group="navigation" variant="menu_title" as="span">
            Delete
          </Typography>
          <Typography color={colors.text.static_icons__tertiary.hex} group="navigation" variant="label" as="span">
            DEL
          </Typography>
        </Menu.Item>
        <Menu.Section title="Section">
          <Menu.Item onClick={onClick}>
            <Icon data={settings} size={16} color={colors.text.static_icons__tertiary.hex} />
            <Typography group="navigation" variant="menu_title" as="span">
              Settings
            </Typography>
          </Menu.Item>
        </Menu.Section>
      </Menu>
    </>;
}
```

### Introduction

```tsx
args => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    setIsOpen(args.open);
    // eslint-disable-next-line react/destructuring-assignment
  }, [args.open]);
  return <>
      <Button ref={setAnchorEl} id="anchor-default" aria-haspopup="true" aria-expanded={isOpen} aria-controls="menu-default" onClick={() => isOpen ? closeMenu() : openMenu()}>
        Click to open Menu!
      </Button>
      <Menu open={isOpen} {...args} id="menu-default" aria-labelledby="anchor-default" onClose={closeMenu} anchorEl={anchorEl}>
        <Menu.Item onClick={onClick}>Pressure</Menu.Item>
        <Menu.Item onClick={onClick}>Bearing</Menu.Item>
        <Menu.Item onClick={onClick}>Cable</Menu.Item>
      </Menu>
    </>;
}
```

### Match Width

```tsx
() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return <>
      <Button ref={setAnchorEl} style={{
      width: 300
    }} id="anchor-match" aria-haspopup="true" aria-expanded={isOpen} aria-controls="menu-match" onClick={() => isOpen ? closeMenu() : openMenu()}>
        Click to open Menu!
      </Button>
      <EdsProvider density="compact">
        <Menu open={isOpen} id="menu-match" aria-labelledby="anchor-match" onClose={closeMenu} anchorEl={anchorEl} matchAnchorWidth>
          <Menu.Item onClick={onClick}>Pressure</Menu.Item>
          <Menu.Item onClick={onClick}>Bearing</Menu.Item>
          <Menu.Item onClick={onClick}>Cable</Menu.Item>
        </Menu>
      </EdsProvider>
    </>;
}
```

### Stays Open

```tsx
args => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [optionOne, setOptionOne] = useState<boolean>(false);
  const [optionTwo, setOptionTwo] = useState<boolean>(false);
  const [optionThree, setOptionThree] = useState<boolean>(false);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return <>
      <Button ref={setAnchorEl} id="anchor-stays-open" aria-haspopup="true" aria-expanded={isOpen} aria-controls="menu-stays-open" onClick={() => isOpen ? closeMenu() : openMenu()}>
        Open Menu
      </Button>
      <Menu open={isOpen} {...args} id="menu-stays-open" aria-labelledby="anchor-stays-open" onClose={closeMenu} anchorEl={anchorEl}>
        <Menu.Section title="Select options">
          <Menu.Item onClick={() => setOptionOne(!optionOne)} closeMenuOnClick={false} active={optionOne}>
            <Checkbox checked={optionOne} readOnly={true} style={{
            padding: 0
          }} />
            Option 1
            <Icon data={error_outlined} size={24} color={colors.interactive.danger__resting.hex} />
          </Menu.Item>
          <Menu.Item onClick={() => setOptionTwo(!optionTwo)} closeMenuOnClick={false} active={optionTwo}>
            <Checkbox checked={optionTwo} readOnly={true} style={{
            padding: 0
          }} />
            Option 2
            <Icon data={warning_outlined} size={24} color={colors.interactive.warning__resting.hex} />
          </Menu.Item>
          <Menu.Item onClick={() => setOptionThree(!optionThree)} closeMenuOnClick={false} active={optionThree}>
            <Checkbox checked={optionThree} readOnly={true} style={{
            padding: 0
          }} />
            Option 3
            <Icon data={check_circle_outlined} size={24} color={colors.interactive.success__resting.hex} />
          </Menu.Item>
        </Menu.Section>
      </Menu>
    </>;
}
```

### T
