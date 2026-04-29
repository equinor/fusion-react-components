# Typography/Heading

> **Package:** `@equinor/eds-core-react` — `import { Typography } from '@equinor/eds-core-react'`

Semantic heading component (h1-h6) that always uses the header font family for visual distinction.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `as` | `"h1" "h2" "h3" "h4" "h5" "h6"` | Yes |  | HTML heading element to render |
| `lineHeight` | `"default" "squished"` | No | squished | Line height variant |
| `weight` | `"lighter" "normal" "bolder"` | No | normal | Font weight |
| `tracking` | `"normal" "tight" "wide"` | No | normal | Letter spacing (tracking) |
| `debug` | `boolean` | No |  | Enable debug mode to visualize text box |

## Examples

### All Variants

A comprehensive comparison of all heading levels, font weights, and letter spacing options. Use this to understand the visual hierarchy and styling options available.

```tsx
() => <div>
    <ComparisonSection title="Heading Level">
      <HeadingLevelComparison />
    </ComparisonSection>

    <ComparisonSection title="Font Weight" marginTop="48px">
      <WeightComparison component={Heading} as="h2" />
    </ComparisonSection>

    <ComparisonSection title="Letter Spacing (Tracking)" marginTop="48px">
      <TrackingComparison component={Heading} as="h2" />
    </ComparisonSection>
  </div>
```

### Playground

```tsx
({
  debug,
  ...args
}) => {
  const content = <Heading {...args} debug={debug}>
      {SAMPLE_TEXT}
    </Heading>;
  return debug ? <GridBackground>{content}</GridBackground> : content;
}
```
