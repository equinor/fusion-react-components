<!--prettier-ignore-start-->
# @equinor/fusion-react-side-sheet 

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-side-sheet.svg)](https://www.npmjs.com/package/@equinor/fusion-react-side-sheet)

## Storybook

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/examples-side-sheet--component)


## Installation

```sh
npm install @equinor/fusion-react-side-sheet
```

## Children
| Name | Props  | Description
| ---- | ---- | -----------
| `Title` | title |  Required child for displaying side sheet title.
| `SubTile` | subTitle |  ...
| `Actions`| sideSheetRef | ...
| `Indicator` | color | ...
| `Content` | ReactChildElements| ...

## Properties/Attributes
| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `enableFullScreen` | `boolean` | `true` | prop for disabling fullScreen action.
| `defaultWidth` | `number \| \`${number}${'%' \| 'vw' \| 'px' \| 'em'}\`` | `minWidth` | Initial width of the side-sheet as pixels or a supported CSS width (`%`, `vw`, `px`, or `em`).
| `minWidth` | `number` | `480` | Minimum width of the side-sheet.
| `disableResize` | `boolean` | `false` | Hides the full-height resize strip and disables resizing. When resizing is available, its 2 px subtle gray outer border stays visible. On hover or drag, the strip background uses the same subtle gray as the border. There is no inner border or shadow. At maximum width, the side sheet stops short by the strip's width so the strip remains outside it, with its outer border at the left viewport edge. The strip can also be focused and resized with Left/Right arrow keys (Home sets minimum width; End sets maximum width).
| `onClose` | `function` | - | Callback function triggered onClose button clicked.

## Keyboard resizing

The focusable resize strip follows the [WAI-ARIA Window Splitter keyboard convention](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/), treating the SideSheet as the primary pane. Home sets its smallest allowed width; End sets its largest allowed width. These keys target the pane's size, not the separator's leftmost or rightmost position. Left Arrow widens the right-hand sheet and Right Arrow narrows it.


<!--prettier-ignore-end-->
