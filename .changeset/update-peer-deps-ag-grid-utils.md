---
"@equinor/fusion-react-tabs": patch
---

Fix tab change handler parameter type to accept string | number

Updated the handleOnChange callback in Tabs component to properly handle both string and number types for the tab parameter, ensuring compatibility with the EdsTabs.
