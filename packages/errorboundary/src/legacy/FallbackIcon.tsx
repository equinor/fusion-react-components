import { type ReactElement, useMemo } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { block, warning_outlined, sync_off, type IconName } from '@equinor/eds-icons';

import type { ErrorType } from './types';
import { styled } from 'styled-components';

Icon.add({ block, warning_outlined, sync_off });

const Styled = {
  icon: styled(Icon)`
    height: 5rem;
    width: 5rem;
    color: ${tokens.colors.infographic.primary__energy_red_55.rgba};
  `,
};

export const FallbackIcon = (props: { readonly errorType?: ErrorType }): ReactElement => {
  const name = useMemo((): IconName => {
    switch (props.errorType) {
      case 'accessDenied':
        return 'block';
      case 'noData':
      case 'failedDependency':
      case 'throttle':
        return 'sync_off';
      default:
        return 'warning_outlined';
    }
  }, [props.errorType]);
  return <Styled.icon name={name} />;
};

export default FallbackIcon;
