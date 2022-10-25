import * as faker from 'faker';
import { Meta, Story } from '@storybook/react';
import {
  PersonProvider,
  PersonAvatar,
  PersonAvailability,
  PersonAccountType,
  PersonCard,
} from '@equinor/fusion-react-person/src';
import { useEffect, useState } from 'react';

export default {
  title: 'Examples/Person',
  component: PersonAvatar,
} as Meta;

const createResolve = (availability: PersonAvailability) => ({
  getPresence: async (azureId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      azureId,
      availability: availability,
    };
  },
  getDetails: async (azureId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      azureId,
      pictureSrc: 'https://prod-images.tcm.com/Master-Profile-Images/BurtReynolds.jpg?w=824',
      accountType: PersonAccountType.Employee,
      company: faker.company.companyName(),
      mail: faker.internet.email(),
      department: faker.commerce.department(),
      jobTitle: faker.name.jobTitle(),
      mobilePhone: faker.phone.phoneNumber('+48 ## ## ## ##'),
      name: [faker.name.firstName(), faker.name.middleName(), faker.name.lastName()].join(' '),
      officeLocation: faker.address.cityName(),
    };
  },
});

export const Avatar: Story = () => (
  <PersonProvider resolve={createResolve(PersonAvailability.Available)}>
    <PersonAvatar azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
  </PersonProvider>
);

export const Card: Story = () => (
  <PersonProvider resolve={createResolve(PersonAvailability.Available)}>
    <PersonCard azureId="c9edd02c-c9f3-41de-b9d9-22a146bf8550" />
  </PersonProvider>
);

export const WithExistingData = () => {
  const [resolver] = useState(() => createResolve(PersonAvailability.Available));
  const [person, setPerson] = useState<any>(null);
  useEffect(() => {
    resolver.getDetails('c9edd02c-c9f3-41de-b9d9-22a146bf8550').then((x) => {
      x.name = 'bob the builder';
      setPerson(x);
    });
  }, [resolver]);

  if (person) {
    return <PersonCard details={person} />;
  }
  return null;
};

// type ComponentProps = AvatarProps & { initial: string };
// export const Component: Story<ComponentProps> = ({ initial, ...props }: ComponentProps) => (
//   <Avatar {...props}>{initial}</Avatar>
// );
// Component.args = {
//   initial: 'A',
//   color: 'primary',
//   size: 'medium',
//   clickable: false,
//   border: true,
// };

// export const Simple: Story = () => <Avatar value="A" />;

// export const Photo: Story<{ src: string }> = (props) => <Avatar {...props} />;
// Photo.args = { src: 'https://i.imgur.com/GcZeeXX.jpeg' };

// export const Size: Story<{ sizes: Array<ComponentProps['size']> }> = (props: {
//   sizes: Array<ComponentProps['size']>;
// }) => (
//   <>
//     {props.sizes.map((size) => (
//       <Avatar key={size} size={size} value="A" />
//     ))}
//   </>
// );
// Size.args ??= { sizes: ['large', 'medium', 'small', 'x-small'] };
