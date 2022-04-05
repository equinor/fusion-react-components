import { createComponent } from '@equinor/fusion-react-utils';
import { MenuElement as HTMLMenuCustomElement, tag } from '@equinor/fusion-wc-menu';

export { HTMLMenuCustomElement };

type ElementProps = React.PropsWithChildren<
  Partial<
    Pick<
      HTMLMenuCustomElement,
      | 'anchor'
      | 'open'
      | 'quick'
      | 'wrapFocus'
      | 'innerRole'
      | 'innerAriaLabel'
      | 'corner'
      | 'x'
      | 'y'
      | 'absolute'
      | 'multi'
      | 'activatable'
      | 'fixed'
      | 'forceGroupSelection'
      | 'fullwidth'
      | 'menuCorner'
      | 'stayOpenOnBodyClick'
    >
  >
>;

export const Menu = createComponent<HTMLMenuCustomElement, ElementProps>(HTMLMenuCustomElement, tag, {
  events: { onOpened: 'opened', onClosed: 'closed' },
});

export type MenuProps = React.ComponentProps<typeof Menu>;

export default Menu;
