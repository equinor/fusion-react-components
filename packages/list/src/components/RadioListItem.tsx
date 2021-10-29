import { createComponent } from '@equinor/fusion-react-utils';
import HTMLRadioListItemCustomElement, { tag } from '@equinor/fusion-wc-list/lib/radio-list-item';

export { HTMLRadioListItemCustomElement };

export type RadioListItemElementProps = React.PropsWithChildren<
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

export const RadioListItem = createComponent<HTMLRadioListItemCustomElement, RadioListItemElementProps>(
  HTMLRadioListItemCustomElement,
  tag
);
export type RadioListItemProps = React.ComponentProps<typeof RadioListItem>;

export default RadioListItem;
