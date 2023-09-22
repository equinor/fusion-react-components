import { PropsWithChildren, useEffect, useRef } from 'react';
import { ComponentProps, createComponent } from '@equinor/fusion-react-utils';
import HTMLPersonSelectCustomElement, { tag } from '@equinor/fusion-wc-person/select';
import extractProps from './extract-props';

export type ElementProps = PropsWithChildren<
  Partial<Pick<HTMLPersonSelectCustomElement, "autofocus" | "disabled" | "dropdownHeight" | "graphic" | "initialText" | "label" | "leadingIcon" | "meta" | "multiple" | "placeholder" | "selectedId" | "value" | "variant">>
>;

export type PersonSelectProps = ComponentProps<HTMLPersonSelectCustomElement, ElementProps>;
export const PersonSelectComponent = createComponent<HTMLPersonSelectCustomElement, ElementProps>(
  HTMLPersonSelectCustomElement,
  tag,
);

export const PersonSelect = ({ children, ...props }: PropsWithChildren<PersonSelectProps>) => {
  const searchRef = useRef<HTMLPersonSelectCustomElement>(null);

  useEffect(() => {
    for (const [name, value] of Object.entries(extractProps<ElementProps>(props))) {
      if (searchRef.current) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchRef.current[name] = value;
      }
    }
  }, []);

  return <PersonSelectComponent ref={searchRef}>{children}</PersonSelectComponent>;
};

export default PersonSelect;
