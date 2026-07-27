import { Dropdown } from '@equinor/fusion-react-searchable-dropdown';
import type { ContextSelectorProps } from './types';
import type { ReactElement, PropsWithChildren } from 'react';

export const ContextSelector = ({
  children,
  /**
   * Context selector results are portal-owned UI: they must render above whatever
   * stacking context a hosting Fusion app happens to create, without app teams having
   * to manage z-index themselves. Defaulting `topLayer` to `true` renders the result
   * list in the browser's top layer via the Popover API instead of a shadow-DOM-relative,
   * absolutely positioned box. Pass `topLayer={false}` explicitly to opt back out.
   *
   * Falls back automatically to the previous behavior in browsers without Popover API
   * support, and is a no-op no matter the value until the underlying
   * `@equinor/fusion-wc-searchable-dropdown` dependency ships `topLayer` support.
   *
   * @see https://github.com/equinor/fusion-web-components/pull/2368
   * @see https://github.com/equinor/fusion-core-tasks/issues/1428
   */
  topLayer = true,
  ...props
}: PropsWithChildren<ContextSelectorProps>): ReactElement => {
  return (
    /**
     * `topLayer` is merged into a single spread object (rather than passed as a
     * separate JSX attribute) so TypeScript's excess-property checking for
     * `Dropdown` (whose props intentionally omit `children`) doesn't reject the
     * `children` prop this component always forwards.
     */
    <Dropdown {...{ topLayer, ...props }}>{children}</Dropdown>
  );
};

ContextSelector.displayName = 'ContextSelector';

export default ContextSelector;
