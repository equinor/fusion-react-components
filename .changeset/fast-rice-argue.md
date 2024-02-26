---
"@equinor/fusion-react-side-sheet": patch
---

- Added a new dependency: `"react-keyed-flatten-children": "^3.0.0"` to `package.json`.
- Imported the `flattenChildren` function from the `react-keyed-flatten-children` package in `SideSheet.tsx`.
- Replaced the `React.Children.forEach` method with the `flattenChildren(children).reduce` method to iterate over the children of the `SideSheet` component.
- Instead of assigning child components to the `components` object inside the `forEach` callback, you're now doing it inside the `reduce` callback and returning the accumulated object.
- The `components` object is now created by the `reduce` method instead of being predefined.

- The changes improve the way child components are assigned to the `components` object and flatten the children of the `SideSheet` component.
