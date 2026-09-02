---
'@equinor/fusion-react-layout': patch
---

Forward props from `Page` and its compound slot components to their underlying elements.

Update the underlying layout and page web components to constrain content to the available height, preventing nested content from expanding the viewport and allowing main content to scroll correctly.