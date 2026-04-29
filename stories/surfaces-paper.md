# Surfaces/Paper

> **Package:** `@equinor/eds-core-react` — `import { Paper } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `elevation` | `"none" "sticky" "raised" "overlay" "temporary_nav" "above_scrim"` | No | none |  |

## Examples

### Elevation overview

```tsx
() => {
  return <>
      <WrapperOverview elevation="none">
        <Typography variant="overline">none</Typography>
        <Paper elevation="none" />
      </WrapperOverview>
      <WrapperOverview elevation="raised">
        <Typography variant="overline">raised</Typography>
        <Paper elevation="raised" />
      </WrapperOverview>
      <WrapperOverview elevation="overlay">
        <Typography variant="overline">overlay</Typography>
        <Paper elevation="overlay" />
      </WrapperOverview>
      <WrapperOverview elevation="sticky">
        <Typography variant="overline">sticky</Typography>
        <Paper elevation="sticky" />
      </WrapperOverview>
      <WrapperOverview elevation="temporary_nav">
        <Typography variant="overline">temporary_nav</Typography>
        <Paper elevation="temporary_nav" />
      </WrapperOverview>
      <WrapperOverview elevation="above_scrim">
        <Typography variant="overline">above_scrim</Typography>
        <Paper elevation="above_scrim" />
      </WrapperOverview>
    </>;
}
```

### Introduction

```tsx
args => {
  return <Paper style={{
    height: '150px',
    width: '150px'
  }} {...args} />;
}
```

### T
