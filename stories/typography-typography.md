# Typography/Typography

> **Package:** `@equinor/eds-core-react` — `import { Typography } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `"button" "tooltip" "text" "label" "h1" "h2" "h3" "h4" "h5" "h6" "caption" "meta" "h1_bold" "body_short_italic" "body_short" "body_short_bold_italic" "body_short_bold" "body_short_link" "overline" "ingress" "body_long" "body_long_link" "body_long_italic" "body_long_bold" "body_long_bold_italic" "menu_title" "menu_tabs" "drawer_active" "drawer_inactive" "breadcrumb" "breadcrumb_hover" "menu_title_hover" "text_monospaced" "helper" "snackbar" "accordion_header" "chip__badge" "chart" "cell_header" "cell_text" "cell_text_bold" "cell_text_link" "cell_numeric_monospaced"` | No | body_short | Typography variants, specifies which variant to use. |
| `group` | `"heading" "navigation" "table" "input" "ui" "paragraph" "_modes"` | No |  | Typography groups, specifies which group to use. |
| `bold` | `boolean` | No |  | Bold text. |
| `italic` | `boolean` | No |  | Italic text. |
| `link` | `boolean` | No |  | Link. |
| `color` | `string` | No |  | Typography colors. |
| `token` | `Partial<Typography>` | No |  | Token. |
| `lines` | `number` | No |  | Number of lines. |

## Examples

### As

```tsx
() => <Typography variant="h2" as="h4">
    I am a &lt;h4&gt; styled as a &lt;h2&gt;
  </Typography>
```

### Colors

```tsx
() => <>
    <Typography color="primary"> Primary</Typography>
    <Typography color="secondary">Secondary</Typography>
    <Typography color="danger">Danger</Typography>
    <Typography color="warning">Warning</Typography>
    <Typography color="success">Success</Typography>
    <Typography color="disabled">Disabled</Typography>
    <Typography color="currentColor">CSS currentColor</Typography>
    <Typography color="pink">CSS pink</Typography>
  </>
```

### Groups overview

```tsx
() => {
  return Object.entries(typography).filter(([key]) => key !== '_modes').map(([key, group]) => <SBCard key={key} elevation="raised">
        <Card.Header>
          <Card.HeaderTitle>
            <Typography variant="h5">{key}</Typography>
          </Card.HeaderTitle>
        </Card.Header>
        <Divider />
        {Object.entries(group).map(([key, token]) => <Card.Content key={key}>
            <Typography token={token as TypographyType}>{key}</Typography>
          </Card.Content>)}
      </SBCard>);
}
```

### Introduction

```tsx
args => {
  return <Typography {...args}>Sample text</Typography>;
}
```

### Lines

```tsx
() => <>
    <Typography variant="body_long" lines={2}>
      Cupcake ipsum dolor sit amet caramels powder. Chocolate powder donut
      bonbon candy canes brownie donut wafer. Cake topping oat cake cheesecake.
      Candy canes tiramisu apple pie cookie. Pastry marshmallow candy canes.
      Cookie jelly-o fruitcake caramels sweet. Brownie pastry sweet roll.
      Caramels tiramisu cotton candy carrot cake jujubes cheesecake bear claw.
      Candy caramels dessert caramels. Lollipop marshmallow wafer marzipan.
      Sesame snaps wafer apple pie sweet roll chocolate bar fruitcake. Bear claw
      lollipop cake. Jelly-o bonbon marshmallow powder carrot cake icing carrot
      cake. Cheesecake brownie jelly beans soufflé icing.
    </Typography>
  </>
```

### Link

```tsx
() => <>
    <Typography link href="#">
      Link
    </Typography>
    <Typography variant="body_long">
      Cupcake ipsum dolor sit amet caramels powder. Chocolate powder donut
      bonbon candy canes brownie donut wafer.{' '}
      <Typography link href="#">
        Cake
      </Typography>{' '}
      topping oat{' '}
      <Typography link href="#">
        cake
      </Typography>{' '}
      cheesecake. Candy canes tiramisu apple pie cookie. Pastry marshmallow
      candy canes. Cookie jelly-o fruitcake caramels sweet. Brownie pastry sweet
      roll. Caramels tiramisu cotton candy carrot{' '}
      <Typography link href="#">
        cake
      </Typography>{' '}
      jujubes cheesecake bear claw. Candy caramels dessert caramels. Lollipop
      marshmallow wafer marzipan. Sesame snaps wafer apple pie sweet roll
      chocolate bar fruitcake.
    </Typography>
  </>
```

### Token property

```tsx
() => <>
    <div>
      <Typography group="navigation" variant="label" token={{
      textAlign: 'center',
      lineHeight: '2em'
    }}>
        Navigation / Label / Text Align
      </Typography>
      <Typography group="navigation" variant="menu_title" token={{
      textDecoration: 'line-through',
      lineHeight: '2em'
    }}>
        Navigation / Menu Title / Text Decoration
      </Typography>
      <Typography group="navigation" variant="label" token={{
      textTransform: 'uppercase',
      lineHeight: '2em'
    }}>
        Navigation / Label / Text Transform
      </Typography>
    </div>
    <div>
      <Typography group="table" variant="cell_header" token={{
      fontFamily: 'Arial'
    }}>
        Table / Cell Hearder / Font Family
      </Typography>
      <Typography group="table" variant="cell_text" token={{
      fontSize: '1.5rem'
    }}>
        Table / Cell Text / Font Size
      </Typography>
      <Typography group="table" variant="cell_text_bold" token={{
      fontStyle: 'italic'
    }}>
        Table / Cell Text Bold / Font Style
      </Typography>
      <Typography group="table" variant="cell_numeric_monospaced" token={{
      fontWeight: 300
    }}>
        Table / Cell Numeric / Font Weight
      </Typography>
    </div>
    <div>
      <Typography token={{
      color: 'purple'
    }}>Color</Typography>
      <Typography token={{
      lineHeight: '400%'
    }}>Line Hight</Typography>
      <Typography token={{
      letterSpacing: '4px'
    }}>Letter Spacing</Typography>
      <Typography token={{
      color: 'purple',
      fontFamily: 'Arial',
      fontSize: '1.875rem',
      fontWeight: 300,
      lineHeight: '1.714em',
      textTransform: 'uppercase'
    }}>
        Custom token
      </Typography>
    </div>
  </>
```

### T
