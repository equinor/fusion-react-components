# Surfaces/Card

> **Package:** `@equinor/eds-core-react` — `import { Card } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `"default" "danger" "warning" "info"` | No | default | Variant |
| `elevation` | `"none" "raised" "overlay"` | No | none | Elevation |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `fullWidth` | `boolean` | No | false | Should the media be full width or not |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `alignRight` | `boolean` | No | false | Should the actions be right aligned |
| `meta` | `string` | No |  | Meta information |

## Examples

### Header variants

```tsx
() => <>
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h4">Title goes here</Typography>
          <Typography variant="body_short">Body short</Typography>
        </Card.HeaderTitle>
      </Card.Header>
    </Card>
    <Card variant="info">
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h5">Title goes here</Typography>
          <Typography variant="body_short">Body short</Typography>
        </Card.HeaderTitle>
      </Card.Header>
    </Card>
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h4">Title goes here</Typography>
          <Typography variant="body_short">Body short</Typography>
        </Card.HeaderTitle>
        <Avatar alt="Kitten" src="https://i.imgur.com/UM3mrju.jpg" size={40} />
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
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h4">Title goes here</Typography>
          <Typography variant="body_short">Body short</Typography>
        </Card.HeaderTitle>
        <Button variant="ghost_icon">
          <Icon name="more_vertical" title="more action" size={iconSize}></Icon>
        </Button>
      </Card.Header>
    </Card>
    <Card variant="info">
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h5">Title goes here</Typography>
          <Typography variant="body_short">Body short</Typography>
        </Card.HeaderTitle>
        <Button variant="ghost_icon">
          <Icon name="more_vertical" title="more action" size={iconSize}></Icon>
        </Button>
      </Card.Header>
    </Card>
    <Card variant="warning">
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="overline">Overline</Typography>
          <Typography variant="h6">Title goes here</Typography>
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
      </Card.Header>
    </Card>
    <Card variant="warning">
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="overline">Overline</Typography>
          <Typography variant="h6">Title goes here</Typography>
        </Card.HeaderTitle>
        <Avatar alt="Kitten" src="https://i.imgur.com/UM3mrju.jpg" size={40} />
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
    <Card variant="warning">
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="overline">Overline</Typography>
          <Typography variant="h6">Title goes here</Typography>
        </Card.HeaderTitle>
        <Button variant="ghost_icon">
          <Icon name="more_vertical" title="more action" size={iconSize}></Icon>
        </Button>
      </Card.Header>
    </Card>
  </>
```

### Introduction

```tsx
args => {
  return <>
      <Card {...args}>
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="h5">An interactive example</Typography>
            <Typography variant="body_short">
              With some short content.
            </Typography>
          </Card.HeaderTitle>
          <Button variant="ghost_icon">
            <Icon name="more_vertical" title="more action" size={iconSize}></Icon>
          </Button>
        </Card.Header>
      </Card>
      <Card {...args}>
        <Card.Media fullWidth>
          <img src="https://i.imgur.com/UM3mrju.jpg" alt="cat" />
        </Card.Media>
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="h5">Another interactive example</Typography>
            <Typography variant="body_short">
              Unfortunately you cannot control children in storybook yet
            </Typography>
          </Card.HeaderTitle>
        </Card.Header>
        <Card.Content>
          <Typography variant="body_short">
            Leading images are full width, and go straight to the top - ignoring
            spacings
          </Typography>
        </Card.Content>
      </Card>
    </>;
}
```

### Container variants

```tsx
() => <>
    <Card>
      <Card.Header>
        <Typography variant="h5">Default</Typography>
      </Card.Header>
    </Card>
    <Card variant="info">
      <Card.Header>
        <Typography variant="h5">Info</Typography>
      </Card.Header>
    </Card>
    <Card variant="warning">
      <Card.Header>
        <Typography variant="h5">Warning</Typography>
      </Card.Header>
    </Card>
    <Card variant="danger">
      <Card.Header>
        <Typography variant="h5">Danger</Typography>
      </Card.Header>
    </Card>
  </>
```

### With actions

```tsx
() => <>
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h5">Default</Typography>
          <Typography variant="body_short">Left aligned buttons</Typography>
        </Card.HeaderTitle>
      </Card.Header>
      <Card.Content>
        <Typography variant="body_short">
          Action elements are aligned left in this example
        </Typography>
      </Card.Content>

      <Card.Actions>
        <Button>Cancel</Button>
        <Button variant="ghost">OK</Button>
      </Card.Actions>
    </Card>
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h5">Right</Typography>
          <Typography variant="body_short">Right aligned buttons</Typography>
        </Card.HeaderTitle>
      </Card.Header>
      <Card.Content>
        <Typography variant="body_short">
          Action elements are aligned right in this example
        </Typography>
      </Card.Content>
      <Card.Actions alignRight>
        <Button variant="ghost_icon">
          <Icon name="person_add" title="add person action" size={iconSize}></Icon>
        </Button>
        <Button variant="ghost_icon">
          <Icon name="settings" title="settings action" size={iconSize}></Icon>
        </Button>
        <Button variant="ghost_icon">
          <Icon name="save" title="save action" size={iconSize}></Icon>
        </Button>
      </Card.Actions>
    </Card>
    <Card>
      <Card.Header>
        <Card.HeaderTitle>
          <Typography variant="h5">Meta</Typography>
          <Typography variant="body_short">
            Use as supporting text for icons
          </Typography>
        </Card.HeaderTitle>
      </Card.Header>
      <Card.Content>
        <Typography variant="body_short">
          Action elements with metadata
        </Typography>
      </Card.Content>
      <Card.Actions meta="Share">
        <Button variant="ghost_icon">
          <Icon name="share" title="share action" size={iconSize}></Icon>
        </Button>
      </Card.Actions>
    </Card>
  </>
```

### With divider

```tsx
() => {
  return <>
      <Card>
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="h4">TICKET</Typography>
          </Card.HeaderTitle>
          <Typography variant="h6">20.02.2020</Typography>
        </Card.Header>
        <Card.Content>
          <Typography variant="body_short">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Divider style={{
          width: '100%'
        }} />
          <Typography variant="body_short">
            Donec eget pulvinar ipsum. Phasellus dictum turpis at metus
            malesuada sollicitudin. Sed sollicitudin mauris dolor, vel tincidunt
            dolor mollis vitae
          </Typography>
        </Card.Content>
        <Card.Actions>
          <Button style={{
          marginTop: '16px'
        }} variant="outlined">
            SUBMIT TICKET
          </Button>
        </Card.Actions>
      </Card>
    </>;
}
```

### With media

```tsx
() => {
  const CardMediafullWidth = () => <Card.Media fullWidth>
      <img src="https://i.imgur.com/UM3mrju.jpg" alt="cat" />
    </Card.Media>;
  return <>
      <Card>
        <CardMediafullWidth />
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="h5">Full width</Typography>
            <Typography variant="body_short">
              Full width as leading block
            </Typography>
          </Card.HeaderTitle>
        </Card.Header>
        <Card.Content>
          <Typography variant="body_short">
            Leading images are full width, and go straight to the top - ignoring
            spacings
          </Typography>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="h5">Full width</Typography>
            <Typography variant="body_short">
              Full width as last block
            </Typography>
          </Card.HeaderTitle>
        </Card.Header>
        <Card.Content>
          <Typography variant="body_short">
            Last blocks with fullWidth ignores left and right spacings but keep
            24px bottom spacing
          </Typography>
        </Card.Content>
        <CardMediafullWidth />
      </Card>
      <Card>
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="h5">Middle</Typography>
            <Typography variant="body_short">
              To be used between blocks
            </Typography>
          </Card.HeaderTitle>
        </Card.Header>
        <Card.Media>
          <img src="https://i.imgur.com/UM3mrju.jpg" alt="cat" />
        </Card.Media>
        <Card.Content>
          <Typography variant="body_short">
            Default spacing is 16px between middle blocks
          </Typography>
        </Card.Content>
      </Card>
    </>;
}
```

### T
