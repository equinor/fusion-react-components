import { type ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import {
  RadioListItemElement as HTMLRadioListItemCustomElement,
  radioListItemTag as tag,
} from '@equinor/fusion-wc-list';

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
  tag,
);
export type RadioListItemProps = ComponentProps<HTMLRadioListItemCustomElement, ElementProps>;

export { HTMLRadioListItemCustomElement };

export default RadioListItem;
