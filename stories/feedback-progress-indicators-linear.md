# Feedback/Progress Indicators/Linear

> **Package:** `@equinor/eds-core-react` — `import { Progress } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `"indeterminate" "determinate"` | No | indeterminate | Variant Use indeterminate when there is no progress value |
| `value` | `number` | No | null | The value of the progress indicator for determinate variant Value between 0 and 100 |

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
  const resetProgress = () => {
    setIsLoading(true);
    timer.current = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  };
  return <div aria-live="assertive" style={{
    display: 'contents'
  }}>
      {isLoading ? <Progress.Linear aria-label="Loading linear accessibility test" /> : <Button ref={buttonRef} onClick={resetProgress} aria-disabled={isLoading}>
          Click to load
        </Button>}
    </div>;
}
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
  return <div aria-busy={isLoading} aria-live="polite" style={{
    display: 'contents'
  }}>
      {isLoading ? <Progress.Linear variant="determinate" aria-label="loading determinate linear progress test" value={progress} /> : <Button ref={buttonRef} onClick={resetProgress}>
          Trigger progress
        </Button>}
    </div>;
}
```

### Indeterminate

```tsx
() => <Progress.Linear aria-label="Progress bar label" />
```

### Introduction

```tsx
args => {
  const {
    value = 0,
    variant
  } = args;
  const progress = useMockProgress(variant === 'indeterminate' ? null : value);
  return <Progress.Linear value={progress} {...args} aria-label="Progress bar label" />;
}
```

### T
