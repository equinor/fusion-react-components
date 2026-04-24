import type { ReactElement, PropsWithChildren, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

type SpacingKey = keyof typeof tokens.spacings.comfortable;

const Styled = {
  Root: styled.div<{ $spacing?: SpacingKey }>`
    display: inline-flex;
    flex: auto;
    gap: ${({ $spacing }) => tokens.spacings.comfortable[$spacing || 'medium']};
    & > * {
      flex: 1;
    }
  `,
};

type StyleProps = {
  readonly spacing?: SpacingKey;
};

export type FilterContainerProps = HTMLAttributes<HTMLDivElement> & StyleProps;

/**
 *  Components for displaying filters
 */
export const FilterContainer = (props: PropsWithChildren<FilterContainerProps>): ReactElement => {
  const { children, className, spacing, ...args } = props;
  return (
    <Styled.Root className={className} $spacing={spacing} {...args}>
      {children}
    </Styled.Root>
  );
};

export default FilterContainer;
