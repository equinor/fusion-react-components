import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLRadioListItemCustomElement, { tag } from '@equinor/fusion-wc-list/lib/radio-list-item';

type ElementProps = React.PropsWithChildren<
  Partial<
    Pick<
      HTMLRadioListItemCustomElement,
      | 'left'
      | 'value'
      | 'group'
      | 'tabindex'
      | 'disabled'
      | 'twoline'
      | 'activated'
      | 'graphic'
      | 'hasMeta'
      | 'noninteractive'
      | 'selected'
      | 'text'
    >
  >
>;

export const RadioListItem = createComponent<HTMLRadioListItemCustomElement, ElementProps>(
  HTMLRadioListItemCustomElement,
  tag
);
export type RadioListItemProps = ComponentProps<HTMLRadioListItemCustomElement, ElementProps>;

export { HTMLRadioListItemCustomElement };

export default RadioListItem;
