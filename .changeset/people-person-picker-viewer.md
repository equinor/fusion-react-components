---
"@equinor/fusion-react-person": major
---

- Add PeoplePicker, PersonPicker, and PeopleViewer components to the person package, including React event helpers and updated exports for people selection flows.
- Update properties for `PersonAvatar`, `PersonCard`, `PersonCell` and `PersonLitItem` to include `resolveId` which can be either an azureId or upn. This also deprecates the `azureId` and `upn` property which are marked for removal in next major release
- Improve storybook documentation for all affected person components.

This change integrates [@equinor/fusion-wc-people](https://github.com/equinor/fusion-web-components) and [@equinor/fusion-wc-person](https://github.com/equinor/fusion-web-components) web components.
