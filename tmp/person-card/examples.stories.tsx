import { Meta, Story } from '@storybook/react';
import { AvatarSize, PersonCard, PersonCardProps } from '@equinor/fusion-react-person-card/src';
import { PersonDetails } from '@equinor/fusion';
// import { useCurrentUser } from '@equinor/fusion';

export default {
  title: 'Examples/People/PersonCard',
  component: PersonCard,
} as Meta;

type ComponentProps = PersonCardProps & { initial: string };

const person: PersonDetails = {
  azureUniqueId: '1ea5f203-c1ad-4893-bdea-4fadd95455e4',
  name: 'Albert Einstein',
  accountType: 'Consultant',
  jobTitle: 'X-Bouvet ASA (PX)',
  department: 'FOIT CON PDP',
  mail: 'example@bouvet.no',
  officeLocation: 'Stavanger',
  company: {
    id: '996 756 246',
    name: 'Bouvet Norge AS',
  },
  mobilePhone: '+4712345678',
  upn: 'example@email.com',
};

export const Component: Story<ComponentProps> = ({ ...props }: ComponentProps) => <PersonCard {...props} />;
Component.args = {
  azureId: '1ea5f203-c1ad-4893-bdea-4fadd95455e4',
  size: AvatarSize.Medium,
  person: person,
};

export const Simple: Story = () => (
  <PersonCard person={person} azureId="1ea5f203-c1ad-4893-bdea-4fadd95455e4" size={AvatarSize.Medium} />
);

// const user = useCurrentUser();

// export const Simple: Story = () => <PersonCard value="A" />;

// export const Photo: Story<{ src: string }> = (props) => <PersonCard {...props} />;
// Photo.args = { src: 'https://i.imgur.com/GcZeeXX.jpeg' };

// export const Size: Story<{ sizes: Array<ComponentProps['size']> }> = (props: {
//   sizes: Array<ComponentProps['size']>;
// }) => (
//   <>
//     {props.sizes.map((size) => (
//       <PersonCard key={size} size={size} value="A" />
//     ))}
//   </>
// );
// Size.args ??= { sizes: ['large', 'medium', 'small', 'x-small'] };
