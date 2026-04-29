# Feedback/Progress Indicators/Dots

> **Package:** `@equinor/eds-core-react` — `import { Progress } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `color` | `"primary" "neutral" "tertiary"` | No | neutral | Color |
| `size` | `32 48 64` | No | 32 | Size |

## Examples

### Accessibility

```tsx
() => {
  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  const resetProgress = () => {
    setIsLoading(true);
    timer.current = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  };
  return <div aria-busy={isLoading} aria-live="assertive">
      <Button onClick={resetProgress} aria-disabled={isLoading}>
        {isLoading ? <Progress.Dots id="progress-bar-dots-accessibility" aria-label="Loading dots accessibility test" /> : <span>Click to load</span>}
      </Button>
    </div>;
}
```

### Colors

```tsx
() => <>
    <div>
      <Typography variant="h4" as="h2">
        Primary
      </Typography>
      <Progress.Dots color="primary" />
    </div>
    <div>
      <Typography variant="h4" as="h2">
        Tertiary
      </Typography>
      <Progress.Dots color="tertiary" />
    </div>
    <div>
      <Typography variant="h4" as="h2">
        Neutral
      </Typography>
      <Progress.Dots color="neutral" />
    </div>
  </>
```

### Inside Button

```tsx
() => <>
    <Button>
      <Progress.Dots />
    </Button>
    <Button variant="ghost_icon">
      <Progress.Dots color="primary" />
    </Button>
  </>
```

### Introduction

```tsx
args => {
  return <Progress.Dots {...args} />;
}
```

### Sizes

```tsx
() => <>
    <Progress.Dots color="primary" size={32} />
    <Progress.Dots color="primary" size={48} />
    <Progress.Dots color="primary" size={64} />
  </>
```

### T
