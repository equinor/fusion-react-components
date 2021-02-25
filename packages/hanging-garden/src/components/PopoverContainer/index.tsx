import Arrow from './Arrow';
import styled from 'styled-components';
import { forwardRef, PropsWithChildren, ReactNode, Ref } from 'react';

const Container = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 4px;
  position: absolute;
  pointer-events: all;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14);
  transform: translateX(-50%);
  margin-top: 8px;
`;

const PopoverContainer = forwardRef<HTMLDivElement | null, PropsWithChildren<ReactNode>>(({ children }, ref) => {
  return (
    <Container ref={ref as Ref<HTMLDivElement>}>
      <Arrow />
      <div>{children}</div>
    </Container>
  );
});

PopoverContainer.displayName = 'PopoverContainer';

export default PopoverContainer;
