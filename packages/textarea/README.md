<!--prettier-ignore-start-->
## `@equinor/fusion-react-textarea` [![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-textarea.svg)](https://www.npmjs.com/package/@equinor/fusion-react-textarea)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/input-textarea)

[Fusion Web Component](https://github.com/equinor/fusion-web-components/tree/main/packages/textarea)

### Installation
```sh
npm install @equinor/fusion-react-textarea
```

### Properties/Attributes

| Name                | Type             | Description
| ------------------- | ---------------- |------------
| `rows`              | `number`         | Sets number of visible text lines.
| `cols`              | `number`         | Sets the visible width of the TextArea.
| `value`             | `string`         | The input control's value.
| `type`              | `TextFieldType*` | A string specifying the type of control to render.
| `label`             | `string`         | Sets floating label value.
| `placeholder`       | `string`         | Sets disappearing input placeholder.
| `disabled`          | `boolean`        | Whether or not the input should be disabled.
| `charCounter`       | `boolean`\|`TextAreaCharCounter**` | **Note: requires `maxLength` to be set.** Display character counter with max length. Textareas may display an `"external"` or `"internal"` `charCounter`. When `true`, textareas display an external character counter by default.
| `helper`            | `string`         | Helper text to display below the input. Display default only when focused.
| `helperPersistent`  | `boolean`        | Always show the helper text despite focus.
| `required`          | `boolean`        | Displays error state if value is empty and input is blurred.
| `maxLength`         | `number`         | Maximum length input to accept.
| `validationMessage` | `string`         | Message to show in the error color when the TextArea is invalid. (Helper text will not be visible)
| `validity`          | `ValidityState` (readonly) | The [`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) of the TextArea.
| `willValidate`      | `boolean` (readonly)       | [`HTMLInputElement.prototype.willValidate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#Properties)
| `validityTransform` | `ValidityTransform***`\|`null` | Callback called before each validation check. See the [validation section](#Validation) for more details.
| `validateOnInitialRender` | `boolean`            | Runs validation check on initial render.
`name`                | `string`         | Sets the `name` attribute on the internal TextArea.\*\*\*

\*  `TextFieldType` is exported by [`fusion-react-textfield`](https://github.com/equinor/fusion-react-components/tree/master/packages/textfield).
```ts
type TextFieldType = 'text'|'search'|'tel'|'url'|'email'|'password'|
    'date'|'month'|'week'|'time'|'datetime-local'|'number'|'color';
```
\*\*  `TextAreaCharCounter` is exported by `TextArea`.
```ts
type TextAreaCharCounter = 'external'|'internal';
```

\*\*  `ValidityTransform` is exported by `TextArea`.
```ts
type ValidityTransform = (value: string, nativeValidity: ValidityState) => Partial<ValidityState>
```

\*\*\* The `name` property should only be used for browser autofill as webcomponent form participation does not currently consider the `name` attribute. See [#289](https://github.com/material-components/material-components-web-components/issues/289).

### Methods

| Name     | Description
| -------- | -------------
| `checkValidity() => boolean`   | Returns `true` if the TextArea passes validity checks. Returns `false` and fires an [`invalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) event on the TextArea otherwise.
| `reportValidity() => boolean`   | Runs `checkValidity()` method, and if it returns false, then it reports to the user that the input is invalid.
| `setCustomValidity(message:string) => void`   | Sets a custom validity message (also overwrites `validationMessage`). If this message is not the empty string, then the element is suffering from a  custom validity error and does not validate.
| `layout() => Promise<void>`   | Re-calculate layout. If a TextArea is styled with `display:none` before it is first rendered, and it has a label that is floating, then you must call `layout()` the first time you remove `display:none`, or else the notch surrounding the label will not render correctly.

### Validation

`<TextArea>` follows the basic `<input>` [constraint validation model](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).
It exposes:

* `required`
* `maxLength`
* `validity`
* `willValidate`
* `checkValidity()`
* `reportValidity()`
* `setCustomValidity(message)`

Additionally, it implements more features such as:
* `validationMessage`
* `validateOnInitialRender`
* and `validityTransform`

By default, `<TextArea>` will report validation on `blur`.
<!--prettier-ignore-end-->
