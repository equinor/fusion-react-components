import { BaseSyntheticEvent, PropsWithChildren, useEffect, useRef } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonSelectCustomElement, {
  tag,
  PersonSelectEvent as HTMLPersonSelectEvent,
} from '@equinor/fusion-wc-person/select';
import extractProps from './extract-props';

type ElementAtts = PropsWithChildren<
  Partial<
    Pick<
      HTMLPersonSelectCustomElement,
      | 'autofocus'
      | 'disabled'
      | 'dropdownHeight'
      | 'graphic'
      | 'initialText'
      | 'label'
      | 'leadingIcon'
      | 'meta'
      | 'multiple'
      | 'placeholder'
      | 'selectedId'
      | 'value'
      | 'variant'
    >
  >
>;

export type PersonSelectEvent = BaseSyntheticEvent<HTMLPersonSelectEvent>;

type ElementEvents = {
  onSelect?: (e: PersonSelectEvent) => void;
  onDropdownClosed?: (e: CustomEvent) => void;
};

type ElementProps = ElementAtts & ElementEvents;

export type PersonSelectProps = ComponentProps<HTMLPersonSelectCustomElement, ElementProps>;

export const PersonSelectComponent = createComponent<HTMLPersonSelectCustomElement, ElementProps>(
  HTMLPersonSelectCustomElement,
  tag,
  { events: { onSelect: 'select', onDropdownClosed: 'dropdownClosed' } },
);

export const PersonSelect: React.FC<PersonSelectProps> = ({
  children,
  ...props
}: PropsWithChildren<PersonSelectProps>) => {
  const searchRef = useRef<HTMLPersonSelectCustomElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<ElementProps>(props))) {
      if (searchRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchRef.current[name] = value;
      }
    }
  }, [props]);

  return <PersonSelectComponent ref={searchRef}>{children}</PersonSelectComponent>;
};

export default PersonSelect;
