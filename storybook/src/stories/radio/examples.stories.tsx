import { Meta, Story } from '@storybook/react';
import { Radio, RadioElementProps } from '@equinor/fusion-react-radio/src';

export default {
  title: 'Examples/Radio',
  component: Radio,
} as Meta;

export const Component: Story = (props: Omit<RadioElementProps, 'ref'>) => {
  const label = props.label ?? props.name;

  return (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      {[...Array(10)].map((_, i) => (
        <Radio {...props} key={i} label={`${label}-${i}`} checked={i === 5} />
      ))}
    </div>
  );
};

Component.args = {
  name: 'test',
  label: 'radio',
};
