# Inputs/Search

> **Package:** `@equinor/eds-core-react` — `import { Search } from '@equinor/eds-core-react'`

## Examples

### Accessibility

```tsx
() => <form action="/">
    <Search placeholder="Search" aria-label="Search for example items" onChange={handleOnChange} />
  </form>
```

### Compact

```tsx
() => {
  const [density, setDensity] = useState<Density>('comfortable');
  useEffect(() => {
    // Simulate user change
    setDensity('compact');
  }, [density]);
  return <EdsProvider density={density}>
      <Search aria-label="compact search example" id="search-compact" placeholder="Search" onChange={handleOnChange} />
    </EdsProvider>;
}
```

### Controlled

```tsx
() => {
  const [searchValue, setSearchValue] = useState('Initial value');
  const handleOnSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleOnChange();
    setSearchValue(value);
  };
  return <>
      <Search id="search-external" aria-label="Search for Hello!" placeholder="Say hello! 🙋" onChange={handleOnSearchValueChange} value={searchValue} />
      <Button onClick={() => {
      setSearchValue('Hello search! 👋');
      action('Set search value')();
    }}>
        Say hello to search!
      </Button>
    </>;
}
```

### Disabled

```tsx
() => <Search aria-label="disabled" id="search-disabled" placeholder="Search" disabled />
```

### Introduction

```tsx
() => {
  // This story is not interactive, because Search has no props beyond the default HTML ones.
  return <Search aria-label="sitewide" id="search-normal" placeholder="Search" onChange={handleOnChange} />;
}
```

### T
