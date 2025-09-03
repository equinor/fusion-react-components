import { useRef, useState, useEffect, useCallback } from 'react';
import { Popover } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import {
  PersonAvatar,
  PersonCard,
  type PersonCellData,
  type PersonItemSize,
} from '@equinor/fusion-react-person';
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
};

type PersonnelAvatarProps = {
  azureId?: string;
  upn?: string;
  dataSource?: PersonCellData;
  size?: PersonItemSize;
  showAvatar?: boolean;
};

export const PersonnelAvatar = ({
  azureId,
  upn,
  dataSource,
  size,
  showAvatar,
}: PersonnelAvatarProps): JSX.Element => {
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

      <div ref={anchorRef} aria-haspopup="true" aria-expanded={isOpen}>
        <PersonAvatar
          azureId={azureId}
          upn={upn}
          dataSource={dataSource}
          showLetter={!showAvatar}
          size={size ?? 'small'}
          trigger="none"
        />
      </div>
    </Styled.Container>
  );
};
