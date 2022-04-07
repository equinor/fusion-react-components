import { useRef, useCallback, useEffect } from 'react';
import { HTMLTextInputCustomElement, TextInput } from '@equinor/fusion-react-textinput';
import { HTMLMenuCustomElement, Menu } from '@equinor/fusion-react-menu';
import { ListItem, ListItemProps } from '@equinor/fusion-react-list';

export type SearchableSelectProps = {
  data: Array<Pick<ListItemProps, 'text' | 'selected'>>;
};
export const SearchableSelect = (props: SearchableSelectProps): JSX.Element => {
  const menuRef = useRef<HTMLMenuCustomElement>(null);
  const inputRef = useRef<HTMLTextInputCustomElement>(null);
  const { data } = props;
  const onClick = useCallback(() => {
    menuRef.current.open = true;
  }, [menuRef]);
  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.anchor = inputRef.current;
    }
  }, [menuRef, inputRef]);
  return (
    <div onClick={onClick}>
      <TextInput
        ref={inputRef}
        type="search"
        iconTrailing={menuRef.current?.open ? 'arrow_drop_down' : 'arrow_drop_up'}
        value={data.selected}
      ></TextInput>
      <Menu ref={menuRef} corner="BOTTOM_LEFT">
        {data.map((menuItem, index) => (
          <ListItem {...menuItem} key={index}>
            {menuItem.text}
          </ListItem>
        ))}
      </Menu>
    </div>
  );
};
