<!--prettier-ignore-start-->
# @equinor/fusion-react-avatar 

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-avatar.svg)](https://www.npmjs.com/package/@equinor/fusion-react-avatar)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/data-avatar)

[Fusion Web Component](https://github.com/equinor/fusion-web-components/tree/main/packages/avatar)

## Installation

```sh
npm install @equinor/fusion-react-avatar
```

## Properties/Attributes

Name                    | Type                            | Default           | Description
---------------------   | --------------                  | -----------       | -----------------
`size`                  | `AvatarSize*`                   | `medium`          | Size of the avatar.
`presence`              | `PersonPresence**`              | `PresenceUnknown` | The presence of the person, indicated by badge color.
`position`              | `PersonPosition***`             | ``                | The position of the person, indicated by border color.
`initial`               | `string`                        | ``                | Initial letter to render in the avatar circle.
`src`                   | `string`                        | ``                | Image src to render in avatar circle.
`clickable`             | `boolean`                       | `false`           | Set to true to activate visual hover effects to indicate that the avatar is clickable.

\*  `AvatarSize` is exported by `fwc-avatar`.
```ts
type AvatarSize = 'small' | 'medium' | 'large';
```

\*\*  `PersonPresence` is exported by `fwc-avatar`.
```ts
type PersonPresence = 
  | 'Available'
  | 'AvailableIdle'
  | 'Away'
  | 'BeRightBack'
  | 'Busy'
  | 'BusyIdle'
  | 'DoNotDisturb'
  | 'Offline'
  | 'PresenceUnknown';
```

\*\*\*  `PersonPosition` is exported by `fwc-avatar`.
```ts
type PersonPosition = 'Employee' | 'External hire' | 'X-External' | 'Joint venture/Affiliate';
```
<!--prettier-ignore-end-->
