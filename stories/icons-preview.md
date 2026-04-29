# Icons/Preview

> **Package:** `@equinor/eds-core-react` — `import { Icon } from '@equinor/eds-core-react'`

## Examples

### Preview

```tsx
() => {
  const [searchValue, setSearchValue] = useState<string>('');
  const iconsByGroup = useMemo(() => {
    return systemIcons.reduce((acc, val) => {
      if (val.name.includes(searchValue)) {
        const group = typeof acc[val.group] !== 'undefined' ? acc[val.group] : [];
        return {
          ...acc,
          [val.group]: [...group, val as unknown as IconType]
        };
      } else {
        return acc;
      }
    }, {} as Record<string, IconType[]>);
  }, [searchValue]);
  return <>
      <StyledSearch aria-label="Search for icons" id="search-normal" placeholder="Search" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)} />
      {Object.keys(iconsByGroup).map(key => {
      return <div key={key}>
            <HeaderMdx id={key} as="h2">
              {key}
            </HeaderMdx>
            <Group>
              {iconsByGroup[key].map((icon: IconType) => {
            const {
              name
            } = icon;
            return <IconItem key={name}>
                    <Icon data={icon} />
                    <IconLabel>{name}</IconLabel>
                    <DownloadLabel variant="outlined" onClick={() => downloadAsSvg(icon.value, name)}>
                      <Icon data={download} />
                      SVG
                    </DownloadLabel>
                  </IconItem>;
          })}
            </Group>
          </div>;
    })}
    </>;
}
```

### T
