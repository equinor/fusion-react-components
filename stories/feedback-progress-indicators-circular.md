# Feedback/Progress Indicators/Circular

> **Package:** `@equinor/eds-core-react` — `import { Progress } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `color` | `"primary" "neutral"` | No | primary | Color |
| `size` | `16 24 32 40 48` | No | 48 | Size |
| `value` | `number` | No | null | The value of the progress indicator for determinate variant. Value between 0 and 100 |
| `variant` | `"indeterminate" "determinate"` | No | indeterminate | Use indeterminate when there is no progress value |

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
        {isLoading ? <>
            <Progress.Circular size={16} color="neutral" aria-label="Loading circular accessibility test" />
            <span aria-hidden="true">Loading...</span>
          </> : <span>Click to load</span>}
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
      <Progress.Circular color="primary" />
    </div>
    <div>
      <Typography variant="h4" as="h2">
        Neutral
      </Typography>
      <Progress.Circular color="neutral" />
    </div>
  </>
```

### Determinate

```tsx
() => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!isLoading && buttonRef.current && timer.current) {
      buttonRef.current.focus();
    }
  }, [isLoading]);
  const resetProgress = () => {
    setProgress(0);
    setIsLoading(true);
    timer.current = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === null) return null;
        if (oldProgress === 100) {
          setIsLoading(false);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1500);
  };
  return <div aria-busy={isLoading} aria-live="polite">
      {isLoading ? <Progress.Circular id="progress-bar-circular" variant="determinate" aria-label="loading determinate progress test" value={progress} /> : <Button ref={buttonRef} onClick={resetProgress}>
          Trigger loader
        </Button>}
    </div>;
}
```

### Indeterminate

```tsx
() => <Progress.Circular />
```

### Inside button

```tsx
() => <>
    <Button>
      <Progress.Circular size={16} color="neutral" />
      Loading...
    </Button>
    <Button variant="ghost_icon">
      <Progress.Circular size={24} />
    </Button>
  </>
```

### Introduction

```tsx
args => {
  const {
    value = 0,
    variant
  } = args;
  const progress = useMockProgress(variant === 'indeterminate' ? null : value);
  return <Progress.Circular {...args} value={progress} />;
}
```

### Sizes

```tsx
() => <>
    <Progress.Circular size={16} />
    <Progress.Circular size={24} />
    <Progress.Circular size={32} />
    <Progress.Circular size={40} />
    <Progress.Circular size={48} />
  </>
```

### T
