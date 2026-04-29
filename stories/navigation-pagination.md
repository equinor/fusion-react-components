# Navigation/Pagination

> **Package:** `@equinor/eds-core-react` — `import { Pagination } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `totalItems` | `number` | Yes |  | Number of total items to be paginated |
| `withItemIndicator` | `boolean` | No |  | To display total item count |
| `itemsPerPage` | `number` | No | 10 | Choose number of items per page |
| `onChange` | `(event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>, page: number) => void` | No |  | Callback fired on page change |
| `defaultPage` | `number` | No | 1 | Default start page |

## Examples

### Dynamic itemsPerPage

```tsx
() => {
  const [currentPageIndex, setCurrentPageIndex] = useState(6);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const changePage = (pageIndex: number) => {
    setCurrentPageIndex(pageIndex);
  };
  const changePageSize = (perPage: number) => {
    setItemsPerPage(perPage);
  };
  const getVariantForPageSizeButton = pageSize => {
    if (pageSize === itemsPerPage) return 'outlined';
    return 'ghost';
  };
  return <>
      <p>
        Current page is: <b>{currentPageIndex}</b>
      </p>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginBottom: '16px'
    }}>
        <p>Items per page:</p>
        <Button onClick={() => changePageSize(10)} variant={getVariantForPageSizeButton(10)}>
          10
        </Button>
        <Button onClick={() => changePageSize(20)} variant={getVariantForPageSizeButton(20)}>
          20
        </Button>
      </div>

      <div>
        <Pagination totalItems={100} itemsPerPage={itemsPerPage} defaultPage={currentPageIndex} onChange={(e, p) => changePage(p)} />
      </div>
    </>;
}
```

### Introduction

```tsx
args => <Pagination {...args} />
```

### Truncated

```tsx
() => <Pagination totalItems={8} itemsPerPage={1} />
```

### With indicator

```tsx
() => <Pagination totalItems={140} itemsPerPage={3} withItemIndicator />
```

### T
