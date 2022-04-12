import { createComponent } from '@equinor/fusion-react-utils';
import { MenuElement as HTMLMenuCustomElement, tag } from '@equinor/fusion-wc-menu';

export { HTMLMenuCustomElement };

type ElementAttributes = React.PropsWithChildren<
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
      | 'defaultFocus'
      | 'fullwidth'
      | 'menuCorner'
      | 'stayOpenOnBodyClick'
    >
  >
>;

export type ElementEvents = {
  onOpen?: React.EventHandler<React.SyntheticEvent<HTMLMenuElement, CustomEvent>>;
  onClosed?: React.EventHandler<React.SyntheticEvent<HTMLMenuElement, CustomEvent>>;
  onClosing?: React.EventHandler<React.SyntheticEvent<HTMLMenuElement, CustomEvent>>;
  onSelected?: React.EventHandler<React.SyntheticEvent<HTMLMenuElement, CustomEvent<{ index: number }>>>;
  onAction?: React.EventHandler<React.SyntheticEvent<HTMLMenuElement, CustomEvent>>;
};

export type ElementProps = ElementAttributes & ElementEvents;

export const Menu = createComponent<HTMLMenuCustomElement, ElementProps>(HTMLMenuCustomElement, tag, {
  events: { onOpen: 'opened', onClosed: 'closed', onClosing: 'closing', onSelected: 'selected', onAction: 'action' },
});

// const gg = () => <Menu onOp

export type MenuProps = React.ComponentProps<typeof Menu>;

export default Menu;
