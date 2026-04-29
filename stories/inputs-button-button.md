# Inputs/Button/Button

> **Package:** `@equinor/eds-core-react` — `import { Button } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `color` | `"primary" "secondary" "danger"` | No | primary | Specifies color |
| `variant` | `"ghost" "outlined" "contained" "contained_icon" "ghost_icon"` | No | contained | Specifies which variant to use |
| `href` | `string` | No |  | URL link destination If defined, an 'a' element is used as root instead of 'button' |
| `disabled` | `boolean` | No | false | Is the button disabled |
| `type` | `"button" "reset" "submit"` | No | 'button' | Type of button |
| `fullWidth` | `boolean` | No | false | Floats icon to the side if button is stretched beyond its intrinsic width |

## Examples

### Accessibility

```tsx
() => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  return <>
      <Checkbox label="I agree to the Terms & Conditions (required)" onChange={(e: ChangeEvent<HTMLInputElement>) => {
      setCanSubmit(e.target.checked);
    }} checked={canSubmit} />
      <Tooltip title={canSubmit ? '' : 'Terms & Conditions must be checked'}>
        <Button aria-disabled={!canSubmit} onClick={() => {
        canSubmit && setOpen(true);
      }}>
          Submit
        </Button>
      </Tooltip>
      <Snackbar open={open} onClose={() => setOpen(false)} autoHideDuration={3000}>
        Submitted
      </Snackbar>
    </>;
}
```

### All

```tsx
() => <>
    <Button>Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="danger">Danger</Button>
    <Button disabled>Disabled</Button>
    <Button variant="outlined">Primary</Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" color="danger">
      Danger
    </Button>
    <Button variant="outlined" disabled>
      Disabled
    </Button>
    <Button variant="ghost">Primary</Button>
    <Button variant="ghost" color="secondary">
      Secondary
    </Button>
    <Button variant="ghost" color="danger">
      Danger
    </Button>
    <Button variant="ghost" disabled>
      Disabled
    </Button>
    <Button variant="ghost_icon" aria-label="save action">
      <Icon data={save} title="save action"></Icon>
    </Button>
    <Button variant="ghost_icon" color="secondary" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" color="danger" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" disabled aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" color="secondary" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" color="danger" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" disabled aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
  </>
```

### Basic

```tsx
() => <>
    <Button>Contained</Button>
    <Button variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="ghost_icon" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
  </>
```

### Color

```tsx
() => <>
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="danger">Danger</Button>
  </>
```

### Compact

```tsx
() => {
  const [compact, setComfortable] = useState<boolean>(true);
  return <EdsProvider density={compact ? 'compact' : 'comfortable'}>
      <Checkbox label="Compact" onChange={() => {
      setComfortable(!compact);
    }} checked={compact} />
      <Stack direction="row">
        <Button>Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost_icon" aria-label="menu action">
          <Icon data={menu} title="Ghost icon menu"></Icon>
        </Button>
      </Stack>
    </EdsProvider>;
}
```

### Full width

```tsx
() => <>
    <Button fullWidth>
      <Icon data={refresh} size={16}></Icon>
      Fullwidth
    </Button>
    <Button fullWidth>
      Fullwidth
      <Icon data={refresh} size={16}></Icon>
    </Button>
    <Button>
      <Icon data={refresh} size={16}></Icon>
      not Fullwidth
    </Button>
  </>
```

### Hierarchy

```tsx
() => <>
    <Button>Contained</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="ghost">Ghost</Button>
  </>
```

### Icon button

```tsx
() => <>
    <Button variant="ghost_icon" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" color="secondary" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" color="danger" aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="ghost_icon" disabled aria-label="save action">
      <Icon data={save}></Icon>
    </Button>
    <Button variant="contained_icon" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" color="secondary" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" color="danger" aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
    <Button variant="contained_icon" disabled aria-label="add action">
      <Icon data={add}></Icon>
    </Button>
  </>
```

### Introduction

```tsx
args => {
  return <Button {...args}>You can control me</Button>;
}
```

### Progress button

```tsx
() => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit = () => {
    setIsSubmitting(true);
  };
  return <>
      <Button aria-disabled={isSubmitting ? true : false} aria-label={isSubmitting ? 'loading data' : null} onClick={!isSubmitting ? onSubmit : undefined}>
        {isSubmitting ? <Progress.Dots color={'primary'} /> : 'Fetch data'}
      </Button>
      <Button aria-disabled={isSubmitting ? true : false} aria-label={isSubmitting ? 'loading data' : null} color="secondary" onClick={!isSubmitting ? onSubmit : undefined}>
        {isSubmitting ? <Progress.Circular size={16} color="primary" /> : <>
            Send
            <Icon data={send} size={16}></Icon>
          </>}
      </Button>
      <Button onClick={() => setIsSubmitting(false)}>
        <>
          <Icon data={refresh} size={16}></Icon>
          Reset
        </>
      </Button>
    </>;
}
```

### Disabled buttons and tooltip

```tsx
() => <>
    <Tooltip title="This is what a tooltip looks like">
      <Button>Hover me</Button>
    </Tooltip>
    <Tooltip title="This tooltip only shows for people using firefox and using mouse. Don't do this!">
      <Button disabled>Disabled button</Button>
    </Tooltip>
    <Tooltip title="Tooltip works in all browsers and with keyboard navigation when using aria-disabled">
      <Button aria-disabled>Aria-disabled button</Button>
    </Tooltip>
  </>
```

### T
