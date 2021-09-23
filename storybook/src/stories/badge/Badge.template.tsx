import { PropsWithChildren } from 'react';
import { Badge, BadgeProps } from '@equinor/fusion-react-badge';

type BadgeWrapperProps = {
  circular?: boolean;
};

export const BadgeWrapper = ({ circular, children }: PropsWithChildren<BadgeWrapperProps>): JSX.Element => (
  <div
    style={{
      width: '3.5rem',
      height: '3.5rem',
      backgroundColor: 'lightgray',
      position: 'relative',
      borderRadius: circular ? '50%' : 0,
      margin: '0.5rem',
    }}
  >
    {children}
  </div>
);

export const BadgeTemplate = (props: BadgeProps): JSX.Element => (
  <BadgeWrapper circular={props.circular}>
    <Badge {...props} />
  </BadgeWrapper>
);

export default BadgeTemplate;
