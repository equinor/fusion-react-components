/* eslint-disable prettier/prettier */
import { SearchableDropdownResultItem, SearchableDropdownResult } from '@equinor/fusion-react-context-selector';

const allItems: SearchableDropdownResult = [
	{"id":"section-001","title":"Apps prod","type":"section","children":[
		{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c13c","title":"Johan prod","subTitle":"An App from Fusion","graphic":"settings"},
		{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c13d","title":"Johan2 prod","subTitle":"An App from Fusion","graphic":"settings"},
		{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c13e","title":"Johan3 prod","subTitle":"An App from Fusion","graphic":"settings"},
		{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c13f","title":"Johan4 prod","subTitle":"An App from Fusion","graphic":"settings"}]
	},
	{"id":"section-002","title":"Projects prod","type":"section","children":[
		{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c14a","title":"Project1 prod","subTitle":"A Fusion context","graphic":"settings"},
		{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c14b","title":"Project2 prod","subTitle":"A Fusion context","graphic":"settings"},
		{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c14c","title":"Project3 prod","subTitle":"A Fusion context","graphic":"settings"},
		{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c14d","title":"Project4 prod","subTitle":"A Fusion context","graphic":"settings"}]
	},
	{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c15a","title":"Unsectioned prod","subTitle":"Some random item"},
	{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c15b","title":"Unsectioned2 prod","subTitle":"Some random item"},
	{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c15c","title":"Unsectioned3 prod","subTitle":"Some random item"},
	{"id":"8aa0d62f-21d4-4933-a1e1-823a8de7c15d","title":"Unsectioned4 prod","subTitle":"Some random item"}
];

/* generates a single SearchableDropdownResult item with required propeterties  */
const singleItem = (props: unknown): SearchableDropdownResultItem => {
  return Object.assign({ id: '0', title: 'Dummy title' }, props);
};

/**
 * contextQueryIsh: Example resolver for contextSearch
 * Takes the query string to search for and returns a promise with matching projects by title.
 */
export const _ContextQeuryResolver = {
  searchQuery: async (query: string): Promise<SearchableDropdownResult> => {
    try {
      /* min length of query string */
      const min = 3;
      const matched = [];
      if (!query || query.length < min) {
        matched.push(singleItem({ title: `Need ${min - query.length} more chars`, isDisabled: true }));
        return matched;
      }

      for (const item of allItems) {
        const entry = { ...item };
        /* Get sectioned children  */
        if (entry.type === 'section' && entry.children?.length) {
          entry.children = entry.children.filter((i) => i.title && i.title.toLowerCase().indexOf(query) > -1);
          if (entry.children.length) {
            matched.push(entry);
          }
        } else if (entry.title && entry.title.toLowerCase().indexOf(query) > -1) {
          matched.push(entry);
        }
      }

      if (!matched.length) {
        matched.push(singleItem({ title: 'No matches...', isDisabled: true }));
      }

      return matched;
    } catch (e) {
      return [singleItem({ item: 'API Error', subTitle: e, isDisabled: true, isError: true })];
    }
  },
};

/* Listen to select event from ContextSelector */
export const _handleSelect = (e: Event) => {
  /* no need to bubble further up the dom */
  e.stopPropagation();
  console.log('Event', e.type, 'fired. Object:', e);
};
