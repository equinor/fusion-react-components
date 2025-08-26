<!--prettier-ignore-start-->
# @equinor/fusion-react-markdown

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-markdown.svg)](https://www.npmjs.com/package/@equinor/fusion-react-markdown)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/input-markdown-editor--page)

[Fusion Web Component](https://equinor.github.io/fusion-web-components/?path=/docs/input-markdown-editor--basic)

### Installation
```sh
npm install @equinor/fusion-react-markdown
```

### Markdown Editor

#### Example

```tsx
import { MarkdownEditor } from '@equinor/fusion-react-markdown';

<MarkdownEditor props>
  **some** markdown *text*
</MarkdownEditor>
```

#### Usage
```tsx
import { MarkdownEditor } from '@equinor/fusion-react-markdown';

const markdown = "# my heading here";
<MarkdownEditor value={markdown} onInput={(e)=>{console.log(e.target._value)}} change={console.log} />
```

#### Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `menuItems` | `Array<MdMenuItemType>*` | `['strong', 'em', 'bullet_list', 'ordered_list']` | List of visible menu buttons
| `minHeight` | `string` | `''` | Markdown Editor minimum height
| `value` | `string` | `''` | Markdown editors value
| `menuSize` | `MenuSizes**` | `'medium'` | Size of the menu buttons

\*  `Array<MdMenuItemType>` is list of showing visible menu buttons available as `MdMenuItemType`.
```ts
type MdMenuItemType =
  | 'strong'
  | 'em'
  | 'link'
  | 'ordered_list'
  | 'bullet_list'
  | 'paragraph'
  | 'blockquote'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'tx';
```

\*  `MenuSizes` type imported from markdown component.
```ts
type MenuSizes = 'small' | 'medium' | 'large';
```

<!--prettier-ignore-end-->
