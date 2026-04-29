# Navigation/TopBar

> **Package:** `@equinor/eds-core-react` — `import { TopBar } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `elevation` | `"none" "raised"` | No | none |  |
| `sticky` | `boolean` | No | true | Topbar will stick to top when scrolling. |

## Examples

### Introduction

```tsx
(props): JSX.Element => {
  return <Wrapper>
      <TopBar {...props}>
        <TopBar.Header>
          <>
            <Icon name="apps" />
            Application name - subtitle
          </>
        </TopBar.Header>
      </TopBar>
      <BodyWrapper>
        <Typography group="input" variant="text">
          Top of page
        </Typography>
        <Typography group="input" variant="text">
          Middle of page
        </Typography>
        <Typography group="input" variant="text">
          Bottom of page
        </Typography>
      </BodyWrapper>
    </Wrapper>;
}
```

### With search and icons

```tsx
(): JSX.Element => {
  const Icons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    > * {
      margin-left: 40px;
    }
  `;
  return <TopBar>
      <TopBar.Header>
        <Icon name="apps" />
        Application name - subtitle
      </TopBar.Header>
      <TopBar.CustomContent>
        <Search aria-label="sitewide" id="search-normal" placeholder="Search" />
      </TopBar.CustomContent>
      <TopBar.Actions>
        <Icons>
          <Icon name="account_circle" size={16} title="user" />
          <Icon name="accessible" size={16} />
          <Icon name="notifications" size={16} />
          <Icon name="fullscreen" size={16} />
        </Icons>
      </TopBar.Actions>
    </TopBar>;
}
```

### T
