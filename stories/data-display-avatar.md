# Data Display/Avatar

> **Package:** `@equinor/eds-core-react` — `import { Avatar } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|

| `src` | `string` | No | null | Image source |
| `size` | `16 24 32 40 48` | No | 24 | Avatar size |
| `disabled` | `boolean` | No | false |  |

## Examples

### Context

```tsx
() => <>
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h4">ALL</Typography>
        </Card.HeaderTitle>
      </Card.Header>
      <Card.Header>
        <Avatar alt="Kitten" src="https://i.imgur.com/UM3mrju.jpg" size={40} />
        <Card.HeaderTitle>
          <Typography variant="h5">Title goes here</Typography>
          <Typography variant="body_short">
            Ut enim ad minim veniam, quis nostrud exercitation.
          </Typography>
          <Divider style={{
          width: '100%'
        }} variant="small" />
        </Card.HeaderTitle>
      </Card.Header>
      <Card.Header>
        <Avatar alt="Kitten" src="https://i.imgur.com/UM3mrju.jpg" size={40} />
        <Card.HeaderTitle>
          <Typography variant="h5">Title goes here</Typography>
          <Typography variant="body_short">
            Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim
            veniam, quis nostrud exercitation.
          </Typography>
          <Divider style={{
          width: '100%'
        }} variant="small" />
        </Card.HeaderTitle>
      </Card.Header>
      <Card.Header>
        <Avatar alt="Kitten" src="https://i.imgur.com/UM3mrju.jpg" size={40} />
        <Card.HeaderTitle>
          <Typography variant="h5">Title goes here</Typography>
          <Typography variant="body_short">
            Ut enim ad minim veniam, quis nostrud exercitation. Ut enim ad minim
            veniam, quis nostrud exercitation. Ut enim ad minim veniam, quis
            nostrud exercitation.
          </Typography>
        </Card.HeaderTitle>
      </Card.Header>
    </Card>
    <Card variant="info">
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h5">Title goes here</Typography>
          <Typography variant="body_short">Body short</Typography>
        </Card.HeaderTitle>
        <Avatar alt="Kitten" src="https://i.imgur.com/UM3mrju.jpg" size={40} />
      </Card.Header>
    </Card>
    <Card variant="warning">
      <Card.Header>
        <Avatar alt="Kitten" src="https://i.imgur.com/UM3mrju.jpg" size={40} />
        <Card.HeaderTitle>
          <Typography variant="h5">Title goes here</Typography>
          <Typography variant="caption">Caption</Typography>
        </Card.HeaderTitle>
      </Card.Header>
    </Card>
    <Card variant="danger">
      <Card.Header>
        <Avatar alt="Kitten" src="https://i.imgur.com/UM3mrju.jpg" size={40} />
        <Card.HeaderTitle>
          <Typography variant="h5">Title goes here</Typography>
          <Typography variant="caption">Caption</Typography>
        </Card.HeaderTitle>
        <Button variant="ghost_icon">
          <Icon name="more_vertical" title="more action" size={iconSize}></Icon>
        </Button>
      </Card.Header>
    </Card>
  </>
```

### Disabled

```tsx
() => <Avatar src={'https://i.imgur.com/UM3mrju.jpg'} disabled size={48} alt="avatar" />
```

### Introduction

```tsx
args => {
  return <Avatar src={'https://i.imgur.com/UM3mrju.jpg'} {...args} />;
}
```

### Size

```tsx
() => <>
    <Avatar src={'https://i.imgur.com/UM3mrju.jpg'} size={16} alt="avatar" />
    <Avatar src={'https://i.imgur.com/UM3mrju.jpg'} size={24} alt="avatar" />
    <Avatar src={'https://i.imgur.com/UM3mrju.jpg'} size={32} alt="avatar" />
    <Avatar src={'https://i.imgur.com/UM3mrju.jpg'} size={40} alt="avatar" />
    <Avatar src={'https://i.imgur.com/UM3mrju.jpg'} size={48} alt="avatar" />
  </>
```

### T
