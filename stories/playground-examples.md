# Playground/Examples

## Examples


### Test Page

```tsx
() => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
  const [isOpenSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [density, setDensity] = useState<EdsProviderProps['density']>('comfortable');
  const [menuAnchorRef, setMenuAnchorRef] = useState<HTMLButtonElement>(null);
  const [popverAnchorRef, setPopoverAnchorRef] = useState<HTMLButtonElement | null>(null);
  const openMenu = () => {
    setOpenMenu(true);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  return <Container>
      <TopBar>
        <TopBar.Header>
          <Icon name="grid_on" size={16} />
          Examples page
        </TopBar.Header>

        <TopBar.Actions>
          <Button variant="ghost_icon" ref={setMenuAnchorRef} id="anchor-menu" aria-haspopup="true" aria-expanded={isOpenMenu} aria-controls="menu" onClick={() => isOpenMenu ? closeMenu() : openMenu()}>
            <Icon data={accessible} title="Choose density" />
          </Button>
          <Menu open={isOpenMenu} id="menu" aria-labelledby="anchor-menu" onClose={closeMenu} anchorEl={menuAnchorRef}>
            <Menu.Item onClick={() => setDensity('comfortable')}>
              Comfortable
            </Menu.Item>
            <Menu.Item onClick={() => setDensity('compact')}>Compact</Menu.Item>
          </Menu>
        </TopBar.Actions>
      </TopBar>
      <Content>
        <Sidebar>
          <Typography variant="h3">Sidebar</Typography>
          <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
            <li>
              <Checkbox label="Check me first" name="multiple" value="first" />
            </li>
            <li>
              <Checkbox label="Check me second" name="multiple" value="second" />
            </li>
            <li>
              <Checkbox label="Check me third" name="multiple" value="third" />
            </li>
          </ul>
        </Sidebar>
        <Middle>
          <Toolbar>
            <Button type="button" onClick={() => setOpenSnackbar(true)}>
              Show Snackbar
            </Button>
            <Snackbar open={isOpenSnackbar} onClose={() => setOpenSnackbar(false)} autoHideDuration={5000}>
              Message goes here
            </Snackbar>
            <Tooltip title="Tooltip!">
              <Button>Show Tooltip</Button>
            </Tooltip>
            <Button aria-haspopup aria-controls="popover" aria-expanded={isPopoverOpen} ref={setPopoverAnchorRef} onClick={() => setPopoverOpen(true)}>
              Show Popover
            </Button>

            <Popover open={isPopoverOpen} id="popover" anchorEl={popverAnchorRef} onClose={() => setPopoverOpen(false)}>
              <Popover.Header>
                <Popover.Title>Title</Popover.Title>
              </Popover.Header>
              <Popover.Content>
                <Typography variant="body_short">Content</Typography>
              </Popover.Content>
              <Popover.Actions>
                <Button onClick={() => setPopoverOpen(false)}>OK</Button>
              </Popover.Actions>
            </Popover>
          </Toolbar>
          <EdsProvider density={density}>
            <DataTable />
          </EdsProvider>
        </Middle>
      </Content>
    </Container>;
}
```