<!--prettier-ignore-start-->
# @equinor/fusion-react-button 

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-button.svg)](https://www.npmjs.com/package/@equinor/fusion-react-button)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/input-button)

[Fusion Web Component](https://github.com/equinor/fusion-web-components/tree/main/packages/button)

## Installation

```sh
npm install @equinor/fusion-react-button
```

## Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `icon` | `string` | `''` | Icon to display, and `aria-label` value when `label` is not defined.
| `label` | `string` | `''` | Label to display for the button, and `aria-label`.
| `variant` | `ButtonVariant` | `'contained'` | Button variant to render, defaults to `contained` if no variant is defined.
| `color` | `ButtonColor` | `'primary'` | Button color to render, defaults to `primary` if no color is defined.
| `dense` | `boolean` | `false` | Makes the button text and container slightly smaller.
| `disabled` | `boolean` | `false` | Disabled buttons cannot be interacted with and have no visual interaction effect.
| `trailingIcon` | `boolean` | `false` | When `true`, `icon` will be displayed _after_ `label`.
| 'expandContent' | `boolean` | `false` | When `true`, the space after the label and before any trailing icon, where default slotted content is rendered, is expanded to fit the available space inside the button.

<!--prettier-ignore-end-->
