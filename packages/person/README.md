<!--prettier-ignore-start-->
# @equinor/fusion-react-person

[![Published on npm](https://img.shields.io/npm/v/@equinor/fusion-react-person.svg)](https://www.npmjs.com/package/@equinor/fusion-react-person)

[Storybook](https://equinor.github.io/fusion-react-components/?path=/docs/data-person)

[Fusion Web Component](https://equinor.github.com/equinor/fusion-web-components/tree/main/packages/person)

### Installation

```sh
npm install @equinor/fusion-react-person
```

## Person Provider

In order to use components such as PersonAvatar or PersonCard you need to have **PersonProvider** wrapper.

### Example Usage

```tsx
import { PersonProvider, PersonAvatar } from '@equinor/fusion-react-person';

  <PersonProvider resolve >
    <PersonAvatar azureId />
  </PersonProvider>
```

### Properties/Attributes

Name                      | Type                            | Description
------------------------- | -----------------------------   | -----------
`resolve`                 | `PersonResolver*`               | Person resolver for a provider. See [`fwc-person-provider`](https://github.com/equinor/fusion-web-components/tree/main/packages/person/src/person-provider) 

### Methods

| Name                          | Return Type                     | Description
| ----------------------------- | -----------------------------   | -----------------------------
| `getPresence(azureId)`        | `PersonPresence**`              | Returns `PersonPresence` for unique AuzureId.
| `getDetails(azureId)`         | `PersonDetails***`              | Returns `PersonDetails` for unique AuzureId.

### Example Usage

```tsx
import { PersonProvider, PersonAvatar } from '@equinor/fusion-react-person';

  <PersonProvider resolve={resolver}>
    <PersonAvatar {...props} />
  </PersonProvider>
```

\*  `PersonResolver` is exported by `fwc-person-provider`.
```ts
interface PersonResolver {
    getPresence: (azureId: string) => Promise<PersonPresence> | PersonPresence;
    getDetails: (azureId: string) => Promise<PersonDetails> | PersonDetails;
}
```

\*\* `PersonPresence` is exported by `fwc-person-provider`.
```ts
type PersonPresence = {
    azureId: string;
    availability: PersonAvailability;
};

```
\*\*\*  `PersonDetails` is exported by `fwc-person-provider`.
```ts
type PersonDetails = {
    azureId: string;
    name?: string;
    pictureSrc?: string;
    jobTitle?: string;
    department?: string;
    mail?: string;
    company?: string;
    mobilePhone?: string;
    accountType?: PersonAccountType;
    officeLocation?: string;
}
```

## Avatar

### Example Usage

```tsx
import { PersonAvatar } from '@equinor/fusion-react-person';

<PersonAvatar azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
```

### Properties/Attributes

Name                      | Type                            | Default                         | Description
------------------------- | -----------------------------   | -----------------------------   | -----------
`azureId`                 | `string`                        | `/`                             | Unique Azure ID for every person `required`
`size`                    | `AvatarSize*`                   | `medium`                        | Size of the avatar. See [`fusion-wc-avatar`](https://github.com/equinor/fusion-web-components/tree/main/packages/avatar).
`clickable`               | `boolean`                       | `false`                         | Set to true to activate visual ripple effects to indicate that the avatar is clickable.
`disabled`                | `boolean`                       | `false`                         | Set to true to display the avatar as disabled.

## Card

### Example Usage Card

```tsx
import { PersonCard } from '@equinor/fusion-react-person';

<PersonCard azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
```

### Properties/Attributes

Name                      | Type                            | Default                         | Description
------------------------- | -----------------------------   | -----------------------------   | -----------
`azureId`                 | `string`                        | `/`                             | Unique Azure ID for every person `required`
`size`                    | `AvatarSize*`                   | `medium`                        | Size of elements of the card. See [`fusion-wc-avatar`](https://github.com/equinor/fusion-web-components/tree/main/packages/avatar).


---


\*  `AvatarSize` is exported by `fwc-avatar`.
```ts
type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large';
```

<!--prettier-ignore-end-->
