import {
  useRef,
  useState,
  useEffect,
  useCallback,
  type PropsWithChildren,
  type ReactElement,
} from 'react';
import { Popover } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { PersonCard, type PersonCellData, type PersonItemSize } from '@equinor/fusion-react-person';
import styled from 'styled-components';

const Styled = {
  Popover: styled(Popover)`
    border-radius: ${tokens.spacings.comfortable.small};
    div:last-child > div {
      padding: 0;
    }
  `,
  Container: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  `,
  HoverArea: styled.div`
    display: flex;
  `,
};

type PersonPopoverProps = {
  azureId?: string;
  upn?: string;
  dataSource?: PersonCellData;
  size?: PersonItemSize;
  showAvatar?: boolean;
};

export const PersonPopover = ({
  azureId,
  upn,
  dataSource,
  children,
}: PropsWithChildren<PersonPopoverProps>): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const openTimeout = useRef<number | null>(null);
  const closeTimeout = useRef<number | null>(null);

  const clearTimeouts = useCallback(() => {
    if (openTimeout.current) {
      clearTimeout(openTimeout.current);
      openTimeout.current = null;
    }
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const handleOpen = useCallback(() => {
    clearTimeouts();
    openTimeout.current = window.setTimeout(() => setIsOpen(true), 200);
  }, [clearTimeouts]);

  const handleClose = useCallback(() => {
    clearTimeouts();
    closeTimeout.current = window.setTimeout(() => setIsOpen(false), 200);
  }, [clearTimeouts]);

  useEffect(() => {
    return clearTimeouts;
  }, [clearTimeouts]);

  return (
    <Styled.Container onMouseEnter={handleOpen} onMouseLeave={handleClose}>
      <Styled.Popover
        anchorEl={anchorRef.current}
        open={isOpen}
        placement="top"
        onClose={() => setIsOpen(false)}
      >
        <Popover.Content>
          <PersonCard size="medium" azureId={azureId} upn={upn} dataSource={dataSource} />
        </Popover.Content>
      </Styled.Popover>

      <Styled.HoverArea ref={anchorRef} aria-haspopup="true" aria-expanded={isOpen}>
        {children}
      </Styled.HoverArea>
    </Styled.Container>
  );
};
