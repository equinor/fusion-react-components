<!--prettier-ignore-start-->
## `@equinor/fusion-react-switch` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-switch.svg)](https://www.npmjs.com/package/@equinor/fusion-react-switch)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/input-switch)

[Fusion Web Component](https://github.com/equinor/fusion-web-components/tree/main/packages/switch)

### Installation
```sh
npm install @equinor/fusion-react-switch
```

### Properties/Attributes
| Name       | Type      | Default | Description
| ---------- | --------- | ------- | -----------
| `checked`  | `boolean` | `false` | Whether or not the switch should be checked / activated.
| `disabled` | `boolean` | `false` | Disables the input and sets the disabled styles.

### Methods

*None*

### Events

| Event Name | Target         | Detail | Description
| ---------- | -------------- | ------ | -----------
| `change`   | `fwc-switch`   | `{}`   | Fired when the user modifies the switch `checked` state from an input device interaction. Note that, like [native `<input>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event), the `change` event is *not* fired when the `checked` property is set from JavaScript.
<!--prettier-ignore-end-->
