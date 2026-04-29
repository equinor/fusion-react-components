# Inputs/Button/Group

> **Package:** `@equinor/eds-core-react` — `import { Button } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `vertical` | `boolean` | No |  | Display ButtonGroup vertically. |

## Examples

### Compact

```tsx
() => {
  const [density, setDensity] = useState<Density>('comfortable');
  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);
  return <EdsProvider density={density}>
      <Button.Group aria-label="compact actions">
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </Button.Group>
    </EdsProvider>;
}
```

### Horizontal

```tsx
() => <Button.Group aria-label="primary actions">
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Button.Group>
```

### Introduction

```tsx
args => {
  return <Button.Group {...args} aria-label="primary actions">
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
    </Button.Group>;
}
```

### Split

```tsx
() => {
  const options = ['Create task', 'Update task', 'Delete task'];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    action('click')(event);
    event.stopPropagation();
    setSelectedIndex(index);
  };
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return <Button.Group aria-label="split buttons" style={{
    gap: '1px'
  }}>
      <Button>{options[selectedIndex]}</Button>
      <Button ref={setAnchorEl} aria-label="select task action" aria-haspopup="true" aria-controls="menu-default" id="anchor-split" onClick={() => isOpen ? closeMenu() : openMenu()} style={{
      padding: '0 4px'
    }}>
        <Icon data={arrow_drop_down} title="arrow_down"></Icon>
      </Button>
      <Menu open={isOpen} id="menu-split" aria-labelledby="anchor-split" onClose={closeMenu} anchorEl={anchorEl}>
        {options.map((option, index) => <Menu.Item key={option} disabled={index === 2} onClick={(event: React.MouseEvent) => handleMenuItemClick(event, index)}>
            {option}
          </Menu.Item>)}
      </Menu>
    </Button.Group>;
}
```

### Vertical

```tsx
() => <Button.Group aria-label="vertical actions" vertical>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
    <Button>Button</Button>
  </Button.Group>
```

### T
