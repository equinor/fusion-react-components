# Data Display/Chips

> **Package:** `@equinor/eds-core-react` — `import { Chip } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `disabled` | `boolean` | No | false | Disabled |
| `onDelete` | `(Event: any) => void` | No |  | Delete callback |
| `variant` | `"default" "error" "active"` | No | default | Variant |

## Examples

### Introduction

```tsx
args => <Chip {...args}>Play with me</Chip>
```

### Text

```tsx
() => <>
    <Chip>Normal</Chip>
    <Chip variant="active">Active</Chip>
    <Chip variant="error">Error</Chip>
    <Chip disabled>Disabled</Chip>
    <Chip onClick={handleClick}>clickable</Chip>
    <Chip variant="active" onClick={handleClick}>
      clickable
    </Chip>
    <Chip variant="error" onClick={handleClick}>
      clickable
    </Chip>
    <Chip onDelete={handleDelete} disabled>
      deletable
    </Chip>
    <Chip onDelete={handleDelete}>deletable</Chip>
    <Chip variant="active" onDelete={handleDelete}>
      deletable
    </Chip>
    <Chip variant="error" onDelete={handleDelete}>
      deletable
    </Chip>
    <div></div>
    <Chip onDelete={handleDelete} onClick={handleClick}>
      deletable + clickable
    </Chip>
    <Chip variant="active" onDelete={handleDelete} onClick={handleClick}>
      deletable + clickable
    </Chip>
    <Chip variant="error" onDelete={handleDelete} onClick={handleClick}>
      deletable + clickable
    </Chip>
  </>
```

### Text and avatar

```tsx
() => <>
    <Chip>
      <CatImage />
      Normal
    </Chip>
    <Chip variant="active">
      <CatImage />
      Active
    </Chip>
    <Chip variant="error">
      <CatImage />
      Error
    </Chip>
    <Chip disabled>
      <CatImage />
      Disabled
    </Chip>
    <Chip onClick={handleClick}>
      <CatImage />
      clickable
    </Chip>
    <Chip variant="active" onClick={handleClick}>
      <CatImage />
      clickable
    </Chip>
    <Chip variant="error" onClick={handleClick}>
      <CatImage />
      clickable
    </Chip>
    <Chip onDelete={handleDelete} disabled>
      <CatImage />
      deletable
    </Chip>
    <Chip onDelete={handleDelete}>
      <CatImage />
      deletable
    </Chip>
    <Chip variant="active" onDelete={handleDelete}>
      <CatImage />
      deletable
    </Chip>
    <Chip variant="error" onDelete={handleDelete}>
      <CatImage />
      deletable
    </Chip>
    <div></div>
    <Chip onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </Chip>
    <Chip variant="active" onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </Chip>
    <Chip variant="error" onDelete={handleDelete} onClick={handleClick}>
      <CatImage />
      deletable + clickable
    </Chip>
  </>
```

### Text and icon

```tsx
() => <>
    <Chip>
      <Icon name="save" />
      Normal
    </Chip>
    <Chip variant="active">
      <Icon name="save" />
      Active
    </Chip>
    <Chip variant="error">
      <Icon name="save" />
      Error
    </Chip>
    <Chip disabled>
      <Icon name="save" />
      Disabled
    </Chip>
    <Chip onClick={handleClick}>
      <Icon name="save" />
      clickable
    </Chip>
    <Chip variant="active" onClick={handleClick}>
      <Icon name="save" />
      clickable
    </Chip>
    <Chip variant="error" onClick={handleClick}>
      <Icon name="save" />
      clickable
    </Chip>
    <Chip onDelete={handleDelete} disabled>
      <Icon name="save" />
      deletable
    </Chip>
    <Chip onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </Chip>
    <Chip variant="active" onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </Chip>
    <Chip variant="error" onDelete={handleDelete}>
      <Icon name="save" />
      deletable
    </Chip>
    <div></div>
    <Chip onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </Chip>
    <Chip variant="active" onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </Chip>
    <Chip variant="error" onDelete={handleDelete} onClick={handleClick}>
      <Icon name="save" />
      deletable + clickable
    </Chip>
  </>
```

### T
