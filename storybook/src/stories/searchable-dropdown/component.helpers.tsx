import {
  SearchableDropdownResultItem,
  SearchableDropdownResult,
  SearchableDropdownResolver,
} from '@equinor/fusion-react-searchable-dropdown';
import { eqOneIcon, orgIcon, reviewIcon } from './component.icons';

import { faker } from '@faker-js/faker';
faker.seed(321456987);

/**
 * Faker data generator for SearchableDropdownResultItem.
 */
const getItems = (len: number, merge?: Partial<SearchableDropdownResultItem>) => {
  return new Array(len).fill(undefined).map((_) => {
    return Object.assign(
      {
        id: faker.string.uuid(),
        title: faker.company.name(),
        subTitle: faker.company.catchPhrase(),
      },
      merge ?? {},
    );
  });
};

/**
 * Faker data generator for section with children.
 */
const getSections = (len: number, kids: number) => {
  return new Array(len).fill(undefined).map((_, i) => {
    const opts: Partial<SearchableDropdownResultItem> = { graphic: 'list' };
    if ((i + 1) % 2 === 0) {
      opts.graphic = orgIcon;
      opts.graphicType = 'inline-svg';
    } else if ((i + 1) % 3 === 0) {
      opts.graphic = eqOneIcon;
      opts.graphicType = 'inline-svg';
    } else if ((i + 1) % 4 === 0) {
      opts.graphic = reviewIcon;
      opts.graphicType = 'inline-svg';
    }

    return {
      id: faker.string.uuid(),
      title: `Section ${faker.company.buzzVerb()}`,
      type: 'section',
      children: getItems(kids, opts),
    } satisfies SearchableDropdownResultItem;
  });
};

/**
 * Example api handler
 * Takes the query string to search for and return matching example projects.
 * Query string min length to start "http request" is 2 chars.
 */
const apiItems = (query: string): SearchableDropdownResult => {
  /* min length of query string */
  const min = 2;
  if (!query || query.length < 2) {
    return [{ id: faker.string.uuid(), title: `Need ${min - query.length} more chars`, isDisabled: true }];
  }

  return getSections(3, 5);
};

/* Example resolver for lit controller task */
export const _exampleResolver: SearchableDropdownResolver = {
  searchQuery: async (query: string) => {
    try {
      return apiItems(query);
    } catch (e) {
      return [{ id: faker.string.uuid(), title: 'API Error', isDisabled: true, isError: true }];
    }
  },
  initialResult: getSections(1, 10),
  closeHandler: (e: Event) => {
    console.log('UI closed dropdown list.', e);
  },
};

/* Listen to Select event */
export const _handleSelect = (e: Event) => {
  /* no need to bubble further up the dom */
  e.stopPropagation();
  console.log('Event', e.type, 'fired. Object:', e);
};
