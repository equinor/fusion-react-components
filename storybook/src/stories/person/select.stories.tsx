/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useState, useMemo, useReducer } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { delete_to_trash } from '@equinor/eds-icons';
Icon.add({ delete_to_trash });

import { PersonSelect, PersonSelectEvent } from '@equinor/fusion-react-person/src/PersonSelect';
import { PersonListItem } from '@equinor/fusion-react-person/src/PersonListItem';
import { PersonProvider } from '@equinor/fusion-react-person/src/PersonProvider';
import { Theme } from '../../components/Theme';

import { resolver } from './person-provider';
import { PersonInfo } from '@equinor/fusion-react-person';

import { createReducer, createAction } from '@equinor/fusion-observable';

const meta: Meta<typeof PersonSelect> = {
  title: 'person/Select',
  component: PersonSelect,
};

export default meta;

type Story = StoryObj<typeof PersonSelect>;

export const basic: Story = {
  decorators: [
    (Story) => (
      <Theme>
        <PersonProvider resolve={resolver}>
          <Story />
        </PersonProvider>
      </Theme>
    ),
  ],
  args: {
    placeholder: 'Start to type to search...',
    initialText: 'The initial text result',
    variant: 'page',
    dropdownHeight: '300px',
    leadingIcon: 'search',
    onSelect: (w) => console.log('onSelect', w),
    onDropdownClosed: (w) => console.log('onDropdownClosed', w),
  },
};

export const controlled: Story = {
  ...basic,
  name: 'selectedPerson',
  render: (props) => {
    const [selected, setSelected] = useState<string | null>('winny@pooh.net');

    const onSelect = useCallback((e: PersonSelectEvent) => {
      setSelected(e.nativeEvent.detail.selected?.upn ?? null);
    }, []);

    return <PersonSelect {...props} selectedPerson={selected} onSelect={onSelect} />;
  },
};

export const custom: Story = {
  ...basic,
  render: (props) => {
    /** this is only for demo purpose, should be outside component */
    const actions = useMemo(
      () => ({
        add: createAction('add_selected', (person: PersonInfo) => ({ payload: person })),
        remove: createAction('remove_person', (id: string) => ({ payload: id })),
        clear: createAction('clear_selected'),
      }),
      [],
    );

    /** this is only for demo purpose, should be outside component */
    const reducer = useMemo(() => {
      const initial: Record<string, PersonInfo> = {};
      return createReducer(initial, (builder) => {
        builder.addCase(actions.add, (state, action) => {
          state[action.payload.azureId] = action.payload;
        });
        builder.addCase(actions.remove, (state, action) => {
          delete state[action.payload];
        });
        builder.addCase(actions.clear, () => initial);
      });
    }, []);

    const [selected, dispatch] = useReducer(reducer, reducer.getInitialState());

    const onSelect = useCallback(
      (e: PersonSelectEvent) => {
        const { selected } = e.nativeEvent.detail;
        if (selected) {
          dispatch(actions.add(selected));
        }
      },
      [actions],
    );

    const SelectedPerson = useMemo(() => {
      const items = Object.values(selected);
      if (items.length) {
        return items.map((person) => {
          return (
            <PersonListItem key={person.azureId} dataSource={person}>
              <Button variant="ghost_icon" onClick={() => dispatch(actions.remove(person.azureId))}>
                <Icon name="delete_to_trash" />
              </Button>
            </PersonListItem>
          );
        });
      }
      return <p>please select some peeps</p>;
    }, [actions, selected]);

    return (
      <>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <PersonSelect {...props} selectedPerson={null} onSelect={onSelect} />
          <Button onClick={() => dispatch(actions.clear())}>Clear</Button>
        </div>
        <br />
        <Typography variant="h2">Selected Person</Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>{SelectedPerson}</div>
      </>
    );
  },
};
