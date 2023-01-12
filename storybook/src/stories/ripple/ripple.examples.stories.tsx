import React, { createRef } from 'react';
import { Meta, Story } from '@storybook/react';
import { Ripple, RippleProps, RippleHandlers, RippleElement } from '@equinor/fusion-react-ripple/src';

export default {
  title: 'Examples/Ripple',
  component: Ripple,
} as Meta;

export const Component: Story<RippleProps> = ({ children, ...props }: RippleProps) => {
  const rippleRef = createRef<RippleElement>();

  const rippleHandlers = new RippleHandlers(async () => {
    return rippleRef.current;
  });

  const handleRippleActivate = (evt: Event) => {
    const onUp = () => {
      window.removeEventListener('mouseup', onUp);

      handleRippleDeactivate();
    };

    window.addEventListener('mouseup', onUp);
    rippleHandlers.startPress(evt);
  };

  const handleRippleDeactivate = () => {
    rippleHandlers.endPress();
  };

  const handleRippleMouseEnter = () => {
    rippleHandlers.startHover();
  };

  const handleRippleMouseLeave = () => {
    rippleHandlers.endHover();
  };

  const handleRippleFocus = () => {
    rippleHandlers.startFocus();
  };

  const handleRippleBlur = () => {
    rippleHandlers.endFocus();
  };

  return (
    <div
      style={{
        width: '5rem',
        height: props.unbounded ? '2.5rem' : '5rem',
        border: '1px solid gray',
        background: '#ddd',
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        padding: '0.5rem',
      }}
      onMouseEnter={handleRippleMouseEnter}
      onMouseLeave={handleRippleMouseLeave}
      onFocus={handleRippleFocus}
      onBlur={handleRippleBlur}
      onMouseDown={(e) => handleRippleActivate(e.nativeEvent)}
      onTouchStart={(e) => handleRippleActivate(e.nativeEvent)}
      onTouchEnd={handleRippleDeactivate}
      onTouchCancel={handleRippleDeactivate}
    >
      <Ripple ref={rippleRef} {...props}>
        {children}
      </Ripple>
    </div>
  );
};

const Container = (props: React.PropsWithChildren<{ title: string }>) => (
  <section>
    <h4>{props.title}</h4>
    <div>{props.children}</div>
  </section>
);

const Template = (props: RippleProps) => (
  <div>
    <Container title="default">
      <Component {...props} />
    </Container>
    <Container title="activated">
      <Component activated={true} {...props} />
    </Container>
    <Container title="selected">
      <Component selected={true} {...props} />
    </Container>
  </div>
);

export const Bounded: Story = () => <Template></Template>;

export const Unbounded: Story = () => <Template unbounded></Template>;
