import { ContextResultItem, ContextResult, ContextResolver } from '@equinor/fusion-react-context-selector';

/**
 * Helper for generating a single ContextResultItem
 */
const singleItem = (props: Partial<ContextResultItem>): ContextResultItem => {
  return Object.assign({ id: '0', title: 'Dummy title' }, props);
};

/**
 * Example contextResult with sections
 */
const contextResultSectioned = [
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

/**
 * Callback for resolvers searchQuery method.
 * Takes the query string to search for and return matching ContextResult.
 * @param query 
 * @returns ContextResult
 */
const apiItems = (query: string) => {
  /* min length */
  const min = 2;
  const matched = [];

  /* Query string is to short */
  if (!query || query.length < min) {
    matched.push(singleItem({ title: `Need ${min - query.length} more chars`, isDisabled: true }));
    return matched;
  }

  /* find matching items  */
  for (const item of contextResultSectioned as ContextResult) {
    const entry = { ...item };
    /* Match against children in sections */
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
};

/**
 * Example resolver passed to provider.
 * @type ContextResolver
 * */
export const _exampleResolver: ContextResolver = {
  searchQuery: async (query: string) => {
    try {
      return apiItems(query);
    } catch (e) {
      return [singleItem({ title: 'API Error', isDisabled: true, isError: true })];
    }
  },
  initialResult: [
    singleItem({
      id: '123',
      title: 'Initial Items',
      type: 'section',
      children: [
        singleItem({ id: '456', title: 'Initial Item 1', graphic: 'list' }),
        singleItem({ id: '654', title: 'Initial Item 2', graphic: 'list' }),
        singleItem({ id: '789', title: 'Initial Item 3', graphic: 'list' }),
        singleItem({ id: '321', title: 'Initial Item 4', graphic: 'list' }),
      ],
    }),
  ],
  closeHandler: (e: MouseEvent) => {
    console.log('UI closed dropdown list.', e);
  },
};

/* Listen to Select events on list items */
export const _handleSelect = (e: Event) => {
  /* no need to bubble further up the dom */
  e.stopPropagation();
  console.log('Event', e.type, 'fired. Object:', e);
};
