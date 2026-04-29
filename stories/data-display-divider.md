# Data Display/Divider

> **Package:** `@equinor/eds-core-react` — `import { Divider } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `color` | `"lighter" "light" "medium"` | No | medium | Color variants |
| `variant` | `"small" "medium"` | No | medium | Vertical spacings |
| `size` | `"1" "2"` | No | 1 | Divider thickness in px |

## Examples

### Full bleed

```tsx
() => <>
    <Card style={{
    width: '50%'
  }}>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h4">NEWS</Typography>
        </Card.HeaderTitle>
      </Card.Header>
      <Card.Content>
        <Typography variant="overline">Today</Typography>
        <br />
        <Typography variant="h5">News title</Typography>
        <Typography variant="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Card.Content>
      <Divider style={{
      width: '100%'
    }} variant="small" />
      <Card.Content>
        <Typography variant="h5">News title</Typography>
        <Typography variant="caption">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Card.Content>
      <Divider style={{
      width: '100%'
    }} variant="small" />
      <Card.Content>
        <Typography variant="h5">News title</Typography>
        <Typography variant="caption">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </Typography>
      </Card.Content>
    </Card>
  </>
```

### Inset

```tsx
() => <>
    <Card style={{
    width: '50%'
  }}>
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
            Ut enim ad minim veniam, quis nostrud exercitation.
          </Typography>
        </Card.HeaderTitle>
      </Card.Header>
    </Card>
  </>
```

### Introduction

```tsx
args => <>
    <Divider {...args} />
    <Divider {...args} />
    <Divider {...args} />
  </>
```

### Middle

```tsx
() => <>
    <Card style={{
    width: '50%'
  }}>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h4">TICKET</Typography>
        </Card.HeaderTitle>
        <Typography variant="h6">20.02.2020</Typography>
      </Card.Header>
      <Card.Content>
        <Typography variant="h5">Description</Typography>
        <Typography variant="body_short">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore.
        </Typography>
        <Divider style={{
        width: '100%'
      }} />
      </Card.Content>
      <Card.Content>
        <Typography variant="caption">Choose option</Typography>
      </Card.Content>
      <Card.Actions>
        <Chip>active</Chip>
        <Chip variant="active">pause</Chip>
        <Chip>disable</Chip>
        <Chip variant="error">stop</Chip>
      </Card.Actions>
      <Card.Actions>
        <Button style={{
        marginTop: '16px'
      }} variant="outlined">
          SUBMIT TICKET
        </Button>
      </Card.Actions>
    </Card>
  </>
```

### T
