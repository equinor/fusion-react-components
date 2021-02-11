import Arrow from './Arrow';
import styled from 'styled-components';
import { FC } from 'react';

const Container = styled.div`
.popoverContainer {
  top: 100%;
  left: 50%;
  padding: calc(var(--grid-unit) * 2px);
  background: white;
  border: 1px solid var(--color-black-alt4);
  border-radius: 4px;
  position: absolute;
  pointer-events: all;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.12), 0px 0px 2px rgba(0, 0, 0, 0.14);
  transform: translateX(-50%);
  margin-top: calc(var(--grid-unit) * 1px);`;

const PopoverContainer: FC = ({ children }) => {
  return (
    <Container>
      <Arrow />
      <div>{children}</div>
    </Container>
  );
};

export default PopoverContainer;
