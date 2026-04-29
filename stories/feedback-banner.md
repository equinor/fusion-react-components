# Feedback/Banner

> **Package:** `@equinor/eds-core-react` — `import { Banner } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `elevation` | `"none" "raised" "overlay"` | No | none |  |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `color` | `string` | No |  | Typography colors. |
| `group` | `"heading" "navigation" "table" "input" "ui" "paragraph" "_modes"` | No |  | Typography groups, specifies which group to use. |
| `link` | `boolean` | No |  | Link. |
| `variant` | `"button" "tooltip" "text" "label" "h1" "h2" "h3" "h4" "h5" "h6" "caption" "meta" "h1_bold" "body_short_italic" "body_short" "body_short_bold_italic" "body_short_bold" "body_short_link" "overline" "ingress" "body_long" "body_long_link" "body_long_italic" "body_long_bold" "body_long_bold_italic" "menu_title" "menu_tabs" "drawer_active" "drawer_inactive" "breadcrumb" "breadcrumb_hover" "menu_title_hover" "text_monospaced" "helper" "snackbar" "accordion_header" "chip__badge" "chart" "cell_header" "cell_text" "cell_text_bold" "cell_text_link" "cell_numeric_monospaced"` | No |  | Typography variants, specifies which variant to use. |
| `bold` | `boolean` | No |  | Bold text. |
| `italic` | `boolean` | No |  | Italic text. |
| `token` | `Partial<Typography>` | No |  | Token. |
| `lines` | `number` | No |  | Number of lines. |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `"warning" "info"` | No | info | Which icon background and fill color to use. Info = green, warning = red |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `placement` | `"bottom" "left"` | No | left |  |

## Examples

### Complex Banner Content

```tsx
() => <>
    <Banner>
      <Banner.Icon variant="warning">
        <Icon name="thumbs_down" />
      </Banner.Icon>
      <div>
        <Typography variant="body_short" style={{
        fontWeight: 'bold'
      }}>
          Important update required
        </Typography>
        <Typography variant="body_long" style={{
        margin: '4px 0'
      }}>
          Your project contains{' '}
          <a href="#deprecated">3 deprecated components</a> that need to be
          updated before June 2025.
        </Typography>
        <Typography variant="caption" style={{
        background: '#f5f5f5',
        padding: '2px 4px',
        borderRadius: '2px',
        display: 'inline-block',
        fontFamily: 'monospace'
      }}>
          ComponentA, ComponentB, ComponentC
        </Typography>
      </div>
      <Banner.Actions>
        <Button>View details</Button>
      </Banner.Actions>
    </Banner>

    <Banner>
      <Banner.Icon>
        <Icon name="thumbs_up" />
      </Banner.Icon>
      <div>
        <Typography variant="body_long">
          Project status:{' '}
          <Typography variant="body_long" as="span" style={{
          color: 'green',
          fontWeight: 'bold'
        }}>
            Active
          </Typography>
        </Typography>
        <Typography variant="body_long" as="ul" style={{
        margin: '4px 0',
        paddingLeft: '20px'
      }}>
          <Typography variant="body_long" as="li">
            Last updated: May 15, 2025
          </Typography>
          <Typography variant="body_long" as="li">
            Contributors: 8
          </Typography>
          <Typography variant="body_long" as="li">
            Health check:{' '}
            <Typography variant="body_long" as="span" style={{
            color: 'green'
          }}>
              Passing
            </Typography>
          </Typography>
        </Typography>
      </div>
      <Banner.Actions>
        <Button>View dashboard</Button>
        <Button variant="outlined">Export report</Button>
      </Banner.Actions>
    </Banner>
  </>
```

### Introduction

```tsx
args => {
  //  Note: This example is not interactive, as Storybook
  // doesn't yet support to manipulate subcomponents via Storybook Args
  return <Banner {...args}>
      <Banner.Message>
        This tag is not being preserved yet. Click start preservation to enable
        writing preservation records.
      </Banner.Message>
    </Banner>;
}
```

### Text and action

```tsx
() => <>
    <Banner>
      <Banner.Message>
        Please confirm that you want do this action.
      </Banner.Message>
      <Banner.Actions>
        <Button>OK</Button>
        <Button variant="outlined">Cancel</Button>
      </Banner.Actions>
    </Banner>
    <Banner>
      <Banner.Message>
        Please confirm that you want do this other action.
      </Banner.Message>
      <Banner.Actions placement="bottom">
        <Button>OK</Button>
        <Button variant="outlined">Sign out</Button>
      </Banner.Actions>
    </Banner>
  </>
```

### Text and icon

```tsx
() => <>
    <Banner>
      <Banner.Icon>
        <Icon name="thumbs_up" />
      </Banner.Icon>
      <Banner.Message>
        We are in the making of a new design for this page.
      </Banner.Message>
    </Banner>
    <Banner>
      <Banner.Icon variant="warning">
        <Icon name="thumbs_down" />
      </Banner.Icon>
      <Banner.Message>Some warning information.</Banner.Message>
    </Banner>
  </>
```

### Text and icon and actions

```tsx
() => <>
    <Banner>
      <Banner.Icon variant="warning">
        <Icon name="mood_sad" />
      </Banner.Icon>
      <Banner.Message>
        This tag is not being preserved yet. Click start preservation to enable
        writing preservation records.
      </Banner.Message>
      <Banner.Actions>
        <Button>Action</Button>
      </Banner.Actions>
    </Banner>
    <Banner>
      <Banner.Icon>
        <Icon name="save" />
      </Banner.Icon>
      <Banner.Message>
        I&apos;m such a really really long message about some sad saving news
        that there is not enough space for the actions on my left. That&apos;s
        why the actions have been located at the bottom using the placement prop
        instead.
      </Banner.Message>
      <Banner.Actions placement="bottom">
        <Button>First action</Button>
        <Button variant="outlined">Second action</Button>
      </Banner.Actions>
    </Banner>
  </>
```

### T
