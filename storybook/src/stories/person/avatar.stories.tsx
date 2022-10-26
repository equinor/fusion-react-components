import { Meta, Story } from '@storybook/react';
import {
  PersonProvider,
  PersonAvatar,
  PersonAvailability,
  AvatarSize,
  PersonAvatarProps,
} from '@equinor/fusion-react-person/src';

export default {
  title: 'Examples/Person/Person Avatar',
  component: PersonAvatar,
  argTypes: {
    azureId: {
      description: 'Unique person Azure ID',
      type: { name: 'string', required: true },
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      description: 'Size of avatar',
      control: 'radio',
      options: AvatarSize,
      table: {
        type: { summary: 'AvatarSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    clickable: {
      description: 'Is avatar clickable?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disabled: {
      description: 'Is avatar disabled?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    availability: {
      description: 'Availability of the person',
      control: 'select',
      options: PersonAvailability,
      table: {
        type: { summary: 'PersonAvailability' },
      },
    },
  },
} as Meta;

export type AvatarProps = PersonAvatarProps & {
  availability?: PersonAvailability;
};

const createResolve = (availability?: PersonAvailability) => ({
  getPresence: async (azureId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      azureId,
      availability: availability ?? PersonAvailability.Offline,
    };
  },
  getDetails: async (azureId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      azureId,
      pictureSrc: 'https://prod-images.tcm.com/Master-Profile-Images/BurtReynolds.jpg',
    };
  },
});

export const Component: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(availability)}>
    <PersonAvatar {...props} />
  </PersonProvider>
);
Component.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  size: AvatarSize.Medium,
  clickable: false,
  disabled: false,
  availability: PersonAvailability.Available,
};

export const Size: Story<{ sizes: Array<AvatarProps['size']> }> = (props: { sizes: Array<AvatarProps['size']> }) => (
  <PersonProvider resolve={createResolve(PersonAvailability.DoNotDisturb)}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      {props.sizes.map((size) => (
        <PersonAvatar key={size} size={size} azureId="8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc" />
      ))}
    </div>
  </PersonProvider>
);
Size.args = { sizes: [AvatarSize.Large, AvatarSize.Medium, AvatarSize.Small, AvatarSize.XSmall] };

export const Clickable: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(availability)}>
    <PersonAvatar {...props} />
  </PersonProvider>
);
Clickable.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  clickable: true,
  availability: PersonAvailability.Away,
};

export const Disabled: Story<AvatarProps> = ({ availability, ...props }: AvatarProps) => (
  <PersonProvider resolve={createResolve(availability)}>
    <PersonAvatar {...props} />
  </PersonProvider>
);
Disabled.args = {
  azureId: '8a5f03ff-1875-4bf3-a3f4-aef1264e3bcc',
  disabled: true,
  availability: PersonAvailability.DoNotDisturb,
};

// export const WithExistingData = () => {
//   const [resolver] = useState(() => createResolve(PersonAvailability.Available));
//   const [person, setPerson] = useState<any>(null);
//   useEffect(() => {
//     resolver.getDetails('c9edd02c-c9f3-41de-b9d9-22a146bf8550').then((x) => {
//       x.name = 'bob the builder';
//       setPerson(x);
//     });
//   }, [resolver]);

//   if (person) {
//     return <PersonCard details={person} />;
//   }
//   return null;
// };

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
