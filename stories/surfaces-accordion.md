# Surfaces/Accordion

> **Package:** `@equinor/eds-core-react` — `import { Accordion } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headerLevel` | `"h1" "h2" "h3" "h4" "h5" "h6"` | No | h2 | The header level, i.e. h1, h2, h3 etc. Note: This only changes the element type, the style is the same for all headerlevels |
| `chevronPosition` | `"left" "right"` | No | left | Which side the chevron should be on |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `index` | `number` | No | 0 |  |

| `isExpanded` | `boolean` | No | false | Is AccordionItem expanded |
| `onExpandedChange` | `(isExpanded: boolean) => void` | No |  | Callback fired with expanded state change. When this prop is present, the accordion is in controlled state |
| `disabled` | `boolean` | No |  | Accordion item is disabled |
| `headerLevel` | `"h1" "h2" "h3" "h4" "h5" "h6"` | No |  | The header level, i.e. h1, h2, h3 etc. Note: This only changes the element type, the style is the same for all headerlevels |
| `chevronPosition` | `"left" "right"` | No |  | Which side the chevron should be on |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `id` | `string` | No |  | The id of the button that toggles expansion |
| `isExpanded` | `boolean` | No | false | Is AccordionItem expanded |
| `panelId` | `string` | No |  | The panel that is controlled by the HeaderButton |
| `parentIndex` | `number` | No |  | The index of the parent AccordionItem |
| `disabled` | `boolean` | No |  | Accordion item is disabled |

| `onToggle` | `(() => void) & ToggleEventHandler<HTMLButtonElement>` | No |  | Accordion item toggle callback |
| `headerLevel` | `"h1" "h2" "h3" "h4" "h5" "h6"` | No |  | The header level, i.e. h1, h2, h3 etc. Note: This only changes the element type, the style is the same for all headerlevels |
| `chevronPosition` | `"left" "right"` | No |  | Which side the chevron should be on |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isExpanded` | `boolean` | No |  | Is AccordionItem expanded |
| `disabled` | `boolean` | No |  | Accordion item is disabled |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isExpanded` | `boolean` | No |  | Is AccordionItem expanded |
| `disabled` | `boolean` | No |  | Accordion item is disabled |

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headerId` | `string` | No |  | The ID of the element that controls the panel |
| `id` | `string` | No |  | The ID of the panel |
| `hidden` | `boolean` | No |  | If `true`, the panel will be hidden. |

## Examples

### Controlled

```tsx
() => {
  const [expanded, setExpanded] = useState(false);
  const toggleAccordion = (state: boolean) => {
    console.log(state);
    setExpanded(state);
  };
  return <>
      <Button onClick={() => toggleAccordion(!expanded)} style={{
      width: 'fit-content'
    }}>
        {expanded ? 'Collapse ' : 'Expand '} accordion
      </Button>
      <Accordion>
        <Accordion.Item isExpanded={expanded} onExpandedChange={toggleAccordion}>
          <Accordion.Header>Controlled Accordion</Accordion.Header>
          <Accordion.Panel>Content</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>;
}
```

### Header

```tsx
() => {
  return <>
      <Accordion headerLevel="h3" chevronPosition="left">
        <Accordion.Item>
          <Accordion.Header>Chevron left</Accordion.Header>
        </Accordion.Item>
      </Accordion>

      <Accordion headerLevel="h3" chevronPosition="right">
        <Accordion.Item>
          <Accordion.Header>Chevron right</Accordion.Header>
        </Accordion.Item>
      </Accordion>

      <Accordion headerLevel="h3" chevronPosition="left">
        <Accordion.Item isExpanded>
          <Accordion.Header>Chevron left expanded</Accordion.Header>
        </Accordion.Item>
      </Accordion>

      <Accordion headerLevel="h3" chevronPosition="right">
        <Accordion.Item disabled>
          <Accordion.Header>Disabled</Accordion.Header>
        </Accordion.Item>
      </Accordion>

      <Accordion headerLevel="h3" chevronPosition="right">
        <Accordion.Item disabled isExpanded>
          <Accordion.Header>Disabled expanded</Accordion.Header>
        </Accordion.Item>
      </Accordion>

      <Accordion headerLevel="h3" chevronPosition="left">
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              Chevron left – custom icons right
            </Accordion.HeaderTitle>
            <Accordion.HeaderActions>
              <Icon name="warning_outlined" title="Warning" size={16} color="currentColor" style={{
              marginRight: '16px'
            }} />
              <Icon name="error_outlined" title="Error" size={16} color="currentColor" />
            </Accordion.HeaderActions>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>

      <Accordion headerLevel="h3" chevronPosition="left">
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              Chevron left – interactive options right
            </Accordion.HeaderTitle>
            <Accordion.HeaderActions>
              <Button variant="ghost_icon" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              action('clicked edit button')(event);
              event.stopPropagation();
            }}>
                <Icon name="edit" title="Edit" />
              </Button>
              <Button variant="ghost_icon" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              action('clicked delete button')(event);
              event.stopPropagation();
            }}>
                <Icon name="delete_to_trash" title="Delete" />
              </Button>
            </Accordion.HeaderActions>
          </Accordion.Header>
        </Accordion.Item>
      </Accordion>

      <Accordion headerLevel="h3" chevronPosition="left">
        <Accordion.Item>
          <Accordion.Header>
            <Accordion.HeaderTitle>
              Very long summary that will get truncated if the width of the
              header is narrower than the length of the text
            </Accordion.HeaderTitle>
            <Accordion.HeaderActions>
              <Button variant="ghost_icon" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              action('clicked edit button')(event);
              event.stopPropagation();
            }}>
                <Icon name="edit" title="Edit" />
              </Button>
              <Button variant="ghost_icon" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              action('clicked delete button')(event);
              event.stopPropagation();
            }}>
                <Icon name="delete_to_trash" title="Delete" />
              </Button>
              <Button variant="ghost_icon" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              action('clicked attach button')(event);
              event.stopPropagation();
            }}>
                <Icon name="attach_file" title="attach file" />
              </Button>
            </Accordion.HeaderActions>
          </Accordion.Header>
          <Accordion.Panel>Content</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>;
}
```

### Introduction

```tsx
args => {
  return <Accordion {...args}>
      <Accordion.Item isExpanded>
        <Accordion.Header>Header 1</Accordion.Header>
        <Accordion.Panel>Content 1</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Header 2</Accordion.Header>
        <Accordion.Panel>Content 2</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Header 3</Accordion.Header>
        <Accordion.Panel>Content 3</Accordion.Panel>
      </Accordion.Item>
    </Accordion>;
}
```

### T
