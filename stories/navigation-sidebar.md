# Navigation/SideBar

> **Package:** `@equinor/eds-core-react` — `import { SideBar } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `open` | `boolean` | No | false |  |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `icon` | `IconData` | Yes |  | Icon |
| `label` | `string` | Yes |  | Label text |
| `active` | `boolean` | No |  | Active/current url |

| `as` | `ElementType` | No | a |  |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|

| `disabled` | `boolean` | No |  | Is the button disabled |
| `color` | `"primary" "secondary" "danger"` | No |  | Specifies color |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes |  | Label text |
| `icon` | `IconData` | Yes |  | Icon |
| `id` | `string` | No |  | Optional unique id for Accordion |
| `active` | `boolean` | No |  | Active/current url |
| `isExpanded` | `boolean` | No |  | Is the accordion expanded - use it if the accordion is controlled |
| `toggleExpand` | `() => void` | No |  | Toggle accordion expanded - use it if you want to make the accordion controlled |
| `onClick` | `(() => void) & MouseEventHandler<HTMLButtonElement>` | No |  | Optional callback when accordion is clicked - called after toggleExpand if it exists |
| `disabled` | `boolean` | No |  | Optionally disable component |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `label` | `string` | Yes |  | Label text |
| `active` | `boolean` | No |  | Active/current url |

| `as` | `ElementType` | No | a |  |

## Examples

### Active Path

```tsx
() => {
  type LinkProps = SidebarLinkProps & {
    href: string;
  };
  const menuItems: LinkProps[] = [{
    label: 'Dashboard',
    icon: dashboard,
    href: '#',
    active: true
  }, {
    label: 'history',
    icon: history,
    href: '#',
    active: false
  }, {
    label: 'favourites',
    icon: favorite_outlined,
    href: '#',
    active: false
  }];
  return <SidebarContainer>
      <SideBar>
        <SideBar.Content>
          {menuItems.map(m => <SideBar.Link key={m.label} {...m} />)}
        </SideBar.Content>
        <SideBar.Footer>
          <SideBar.Toggle />
        </SideBar.Footer>
      </SideBar>
    </SidebarContainer>;
}
```

### Controlled Active State

```tsx
() => {
  const [selected, setSelected] = useState<string>('');
  const hasActiveItem = (subItems: {
    label: string;
    name: string;
  }[]) => {
    for (const item of subItems) {
      if (selected === item.name) {
        return true;
      }
    }
    return false;
  };
  return <Container>
      <SideBar>
        <SideBar.Content>
          <SideBar.Toggle />
          {sidebarLinks.map(linkItem => <SideBar.Link key={linkItem.name} label={linkItem.label} icon={linkItem.icon} active={selected === linkItem.name} onClick={() => {
          setSelected(linkItem.name);
        }} />)}
          {sidebarAccordions.map(accordionItem => <SideBar.Accordion key={accordionItem.label} label={accordionItem.label} icon={accordionItem.icon} active={hasActiveItem(accordionItem.children)}>
              {accordionItem.children.map(accordionItemChild => <SideBar.AccordionItem key={accordionItemChild.name} label={accordionItemChild.label} active={selected === accordionItemChild.name} onClick={() => {
            setSelected(accordionItemChild.name);
          }} />)}
            </SideBar.Accordion>)}
        </SideBar.Content>
      </SideBar>
      {selectPage(selected)}
    </Container>;
}
```

### Custom Content

```tsx
() => {
  const menuItems: SidebarLinkProps[] = [{
    label: 'Dashboard',
    icon: dashboard
  }, {
    label: 'history',
    icon: history
  }, {
    label: 'favourites',
    icon: favorite_outlined
  }];
  const Logo = () => {
    const {
      isOpen
    } = useSideBar();
    return <LogoContainer>{isOpen ? <LogoOpen /> : <LogoClosed />}</LogoContainer>;
  };
  return <SidebarContainer>
      <SideBar onToggle={toggle => console.log('SideBar expanded ', toggle)}>
        <SideBar.Content>
          {menuItems.map(m => <SideBar.Link key={m.label} {...m} />)}
        </SideBar.Content>
        <SideBar.Footer>
          <SideBar.Toggle />
          <Divider size="2" color="light" style={{
          marginBlock: 0
        }} />
          <Logo />
        </SideBar.Footer>
      </SideBar>
    </SidebarContainer>;
}
```

### Primary

```tsx
args => {
  const menuItems: SidebarLinkProps[] = [{
    label: 'home',
    icon: home
  }, {
    label: 'history',
    icon: history
  }, {
    label: 'favourites',
    icon: favorite_outlined
  }];
  return <Container>
      <SideBar {...args}>
        <SideBar.Content>
          <SideBar.Toggle />
          {menuItems.map(m => <SideBar.Link key={m.label} {...m} />)}
        </SideBar.Content>
      </SideBar>
    </Container>;
}
```

### With Accordion

```tsx
() => {
  return <Container>
      <SideBar>
        <SideBar.Content>
          <SideBar.Toggle />
          <SideBar.Link label="Home" icon={home} />
          <SideBar.Link label="Getting started" icon={business} />
          <SideBar.Accordion label="Un-controlled" icon={gas}>
            <SideBar.AccordionItem label={'Tools'} />
            <SideBar.AccordionItem label={'Fields'} />
            <SideBar.AccordionItem label={'Reports'} />
            <SideBar.AccordionItem label={'Archived'} />
          </SideBar.Accordion>
          <SideBar.Accordion label="Controlled" icon={favorite_outlined} isExpanded={true}>
            <SideBar.AccordionItem label={'Saved Items'} />
            <SideBar.AccordionItem label={'Work in progress'} />
            <SideBar.AccordionItem label={'Reports'} />
          </SideBar.Accordion>
          <SideBar.Accordion label="Disabled" icon={lock} disabled></SideBar.Accordion>
        </SideBar.Content>
      </SideBar>
    </Container>;
}
```

### With Button

```tsx
() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  const menuItems: SidebarLinkProps[] = [{
    label: 'Dashboard',
    icon: dashboard
  }, {
    label: 'history',
    icon: history
  }, {
    label: 'favourites',
    icon: favorite_outlined
  }];
  return <SidebarContainer>
      <SideBar>
        <SideBar.Content>
          <SideBar.Button label="Add story" icon={add} onClick={() => isOpen ? closeMenu() : openMenu()} ref={setAnchorEl} />
          <Divider size="2" color="light" style={{
          marginBlockEnd: 0
        }} />
          {menuItems.map(m => <SideBar.Link key={m.label} {...m} />)}
        </SideBar.Content>
        <SideBar.Footer>
          <SideBar.Toggle />
        </SideBar.Footer>
      </SideBar>
      <Menu open={isOpen} onClose={closeMenu} anchorEl={anchorEl} placement="right-start">
        <Menu.Section title="Add story">
          <Menu.Item onClick={closeMenu}>Featured story</Menu.Item>
          <Menu.Item onClick={closeMenu}>News article</Menu.Item>
          <Menu.Item onClick={closeMenu}>Blog post</Menu.Item>
        </Menu.Section>
      </Menu>
    </SidebarContainer>;
}
```

### With Routing

```tsx
() => {
  const [selected, setSelected] = useState<string>('');
  const sidebarLinks = [{
    label: 'Home',
    icon: home,
    name: 'home'
  }, {
    label: 'Getting started',
    icon: business,
    name: 'gettingStarted'
  }];
  const sidebarAccordions = [{
    label: 'Gas',
    icon: gas,
    children: [{
      label: 'Tools',
      name: 'tools'
    }, {
      label: 'Fields',
      name: 'fields'
    }, {
      label: 'Reports',
      name: 'reports'
    }, {
      label: 'Archived',
      name: 'archived'
    }]
  }, {
    label: 'Favorites',
    icon: favorite_outlined,
    children: [{
      label: 'Saved Items',
      name: 'savedItems'
    }, {
      label: 'Work in progress',
      name: 'workInProgress'
    }]
  }];
  const selectPage = (selected: string) => {
    switch (selected) {
      case 'home':
        return homePage;
      case 'gettingStarted':
        return gettingStartedPage;
      case 'tools':
        return toolsPage;
      case 'fields':
        return fieldsPage;
      case 'reports':
        return reportsPage;
      case 'archived':
        return archivedPage;
      case 'savedItems':
        return savedItemsPage;
      case 'workInProgress':
        return workInProgressPage;
      default:
        return homePage;
    }
  };
  return <Container>
      <SideBar>
        <SideBar.Content>
          <SideBar.Toggle />
          {sidebarLinks.map(linkItem => <SideBar.Link key={linkItem.name} label={linkItem.label} icon={linkItem.icon} active={selected === linkItem.name} onClick={() => {
          setSelected(linkItem.name);
        }} />)}
          {sidebarAccordions.map(accordionItem => <SideBar.Accordion key={accordionItem.label} label={accordionItem.label} icon={accordionItem.icon}>
              {accordionItem.children.map(accordionItemChild => <SideBar.AccordionItem key={accordionItemChild.name} label={accordionItemChild.label} active={selected === accordionItemChild.name} onClick={() => {
            setSelected(accordionItemChild.name);
          }} />)}
            </SideBar.Accordion>)}
        </SideBar.Content>
      </SideBar>
      {selectPage(selected)}
    </Container>;
}
```

### With Topbar

```tsx
() => {
  const menuItems: SidebarLinkProps[] = [{
    label: 'Dashboard',
    icon: dashboard
  }, {
    label: 'history',
    icon: history
  }, {
    label: 'favourites',
    icon: favorite_outlined
  }];
  return <SidebarContainerWithTopbar>
      <TopBar sticky={false}>
        <TopBar.Header>
          <LogoClosed /> Application label - subtitle
        </TopBar.Header>
      </TopBar>
      <SideBar>
        <SideBar.Content>
          <SideBar.Button label="Create story" icon={add} onClick={() => console.log('clicked')} />
          <Divider size="2" color="light" style={{
          marginBlockEnd: 0
        }} />
          {menuItems.map(m => <SideBar.Link key={m.label} {...m} />)}
        </SideBar.Content>
        <SideBar.Footer>
          <Divider size="2" color="light" style={{
          marginBlockEnd: 0
        }} />
          <SideBar.Toggle />
        </SideBar.Footer>
      </SideBar>
    </SidebarContainerWithTopbar>;
}
```

### T
