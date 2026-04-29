# Data Display/Lists

> **Package:** `@equinor/eds-core-react` — `import { List } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `"bullet" "numbered"` | No | bullet | Is the list an ordered or unordered list |
| `start` | `string` | No |  | Start number if other than 1 for ordered lists |

## Examples

### Introduction

```tsx
args => {
  return <List {...args}>
      <List.Item>List item</List.Item>
      <List.Item>List item</List.Item>
      <List.Item>
        List item
        <List {...args}>
          <List.Item>List item</List.Item>
          <List.Item>List item</List.Item>
          <List.Item>List item</List.Item>
        </List>
      </List.Item>
    </List>;
}
```

### Ordered

```tsx
() => <List variant="numbered">
    <List.Item>List item</List.Item>
    <List.Item>
      List item
      <List variant="numbered">
        <List.Item>List item</List.Item>
        <List.Item>List item</List.Item>
        <List.Item>
          List item
          <List variant="numbered">
            <List.Item>List item</List.Item>
            <List.Item>List item</List.Item>
            <List.Item>List item</List.Item>
          </List>
        </List.Item>
      </List>
    </List.Item>
    <List.Item>List item</List.Item>
  </List>
```

### Unordered

```tsx
() => <List variant="bullet">
    <List.Item>List item</List.Item>
    <List.Item>List item</List.Item>
    <List.Item>
      List item
      <List>
        <List.Item>List item</List.Item>
        <List.Item>List item</List.Item>
        <List.Item>List item</List.Item>
      </List>
    </List.Item>
  </List>
```

### With start option

```tsx
() => <List variant="numbered" start={start}>
    <List.Item>List item</List.Item>
    <List.Item>List item</List.Item>
    <List.Item>List item</List.Item>
    <List.Item>List item</List.Item>
    <List.Item>List item</List.Item>
    <List.Item>List item</List.Item>
    <List.Item>List item</List.Item>
    <List.Item>List item</List.Item>
  </List>
```

### T
