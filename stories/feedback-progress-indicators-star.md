# Feedback/Progress Indicators/Star

> **Package:** `@equinor/eds-core-react` — `import { Progress } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `size` | `16 24 32 40 48` | No | 48 | Size |
| `value` | `number` | No | null | The value of the progress indicator for determinate variant Value between 0 and 100 |
| `variant` | `"indeterminate" "determinate"` | No | indeterminate | Use indeterminate when there is no progress value |

## Examples

### Accessibility

```tsx
() => {
  const [isLoading, setIsLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (!isLoading && buttonRef.current && timer.current) {
      buttonRef.current.focus();
    }
  }, [isLoading]);
  const resetProgress = () => {
    setIsLoading(true);
    timer.current = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  };
  return <div aria-live="assertive">
      {isLoading ? <Progress.Star size={48} aria-label="Loading star accessibility test" /> : <Button ref={buttonRef} onClick={resetProgress} aria-disabled={isLoading}>
          Click to load
        </Button>}
    </div>;
}
```

### Determinate

```tsx
() => {
  const progress = useMockProgress(0);
  return <Progress.Star value={progress} variant="determinate" />;
}
```

### Indeterminate

```tsx
() => <Progress.Star />
```

### Introduction

```tsx
args => {
  const {
    value = 0,
    variant
  } = args;
  const progress = useMockProgress(variant === 'indeterminate' ? null : value);
  return <Progress.Star value={progress} {...args} />;
}
```

### Sizes

```tsx
() => <>
    <Progress.Star size={16} />
    <Progress.Star size={24} />
    <Progress.Star size={32} />
    <Progress.Star size={40} />
    <Progress.Star size={48} />
  </>
```

### T
