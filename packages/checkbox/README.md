<!--prettier-ignore-start-->
## `@equinor/fusion-react-checkbox` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-checkbox.svg)](https://www.npmjs.com/package/@equinor/fusion-react-checkbox)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/input-checkbox)

[Fusion Web Component](https://github.com/equinor/fusion-web-components/tree/main/packages/checkbox)

### Installation
```sh
npm install @equinor/fusion-react-checkbox
```

### Properties/Attributes

Name            | Type      | Default | Description
-------------------- | --------- | ------- | -----------
`checked`            | `boolean` | `false` | Whether the checkbox is checked.
`indeterminate`      | `boolean` | `false` | When a checkbox is the parent of a set of child checkboxes, the *indeterminate* state is used on the parent to indicate that some but not all of its children are checked.
`disabled`           | `boolean` | `false` | When `true`, the checkbox cannot be interacted with, and renders in muted colors.
`value`              | `string`  | `''`    | The value that will be included if the checkbox is submitted in a form.
`reducedTouchTarget` | `boolean` | `false` | When `true`, the checkbox remove padding for touchscreens and increase density. Note, the checkbox will no longer meet accessibility guidelines for touch.


### Methods

*None*

### Events

| Event Name | Target         | Detail | Description
| ---------- | -------------- | ------ | -----------
| `change`   | `fwc-checkbox` | `{}`   | Fired when the user modifies the checkbox `checked` or `indeterminate` states from an input device interaction. Note that, like [native `<input>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event), the `change` event is *not* fired when the `checked` or `indeterminate` properties are set from JavaScript.
<!--prettier-ignore-end-->
