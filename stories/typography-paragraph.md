# Typography/Paragraph

> **Package:** `@equinor/eds-core-react` — `import { Typography } from '@equinor/eds-core-react'`

Block-level paragraph component that always uses the UI font family, optimized for readability.

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `"xs" "sm" "md" "lg" "xl" "2xl" "3xl" "4xl" "5xl" "6xl"` | No | lg | Size of the text |
| `lineHeight` | `"default" "squished"` | No | default | Line height variant |
| `weight` | `"lighter" "normal" "bolder"` | No | normal | Font weight |
| `tracking` | `"normal" "tight" "wide"` | No | normal | Letter spacing (tracking) |
| `debug` | `boolean` | No |  | Enable debug mode to visualize text box |

## Examples

### All Variants

A comprehensive comparison of all paragraph sizes, line heights, font weights, and letter spacing options.

```tsx
() => <div>
    <ComparisonSection title="Size">
      <SizeComparison component={Paragraph} />
    </ComparisonSection>

    <ComparisonSection title="Line Height" marginTop="48px">
      <LineHeightComparison text={SAMPLE_TEXT} />
    </ComparisonSection>

    <ComparisonSection title="Font Weight" marginTop="48px">
      <WeightComparison component={Paragraph} />
    </ComparisonSection>

    <ComparisonSection title="Letter Spacing (Tracking)" marginTop="48px">
      <TrackingComparison component={Paragraph} />
    </ComparisonSection>
  </div>
```

### Playground

```tsx
({
  debug,
  ...args
}) => {
  const content = <Paragraph {...args} debug={debug}>
      {SAMPLE_TEXT}
    </Paragraph>;
  return debug ? <GridBackground>{content}</GridBackground> : content;
}
```
