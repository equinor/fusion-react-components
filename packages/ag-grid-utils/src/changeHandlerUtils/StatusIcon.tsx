import type { FC } from 'react';

import { AGGridDataStatus } from './constants';

import { tokens } from '@equinor/eds-tokens';

import { Icon } from '@equinor/eds-core-react';
import { check, check_circle_outlined, new_label } from '@equinor/eds-icons';
Icon.add({ check, check_circle_outlined, new_label });

type StatusIconProps = { readonly status?: AGGridDataStatus };

/**
 * Renders a status icon based on the provided status.
 * @param status - The status of the icon.
 * @returns The rendered status icon component.
 */
export const StatusIcon: FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case AGGridDataStatus.NEW:
      return <Icon name="new_label" color={tokens.colors.interactive.success__text.hex} />;
    case AGGridDataStatus.PATCHED:
      return (
        <Icon name="check_circle_outlined" color={tokens.colors.interactive.warning__text.hex} />
      );
    case AGGridDataStatus.FETCHED:
      return <Icon name="check" color={tokens.colors.interactive.success__text.hex} />;
  }
  return null;
};

export default StatusIcon;
