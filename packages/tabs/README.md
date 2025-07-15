# Fusion React Tabs

This package provides a simple tab router. It handles active tab state, and renders the correct tab components as well as managing the URL state as query parameters. This allows for deep linking to specific tabs, useful for sharing links and state between users.

## Features

- **Tab Management**: Define and manage tabs within a side-sheet.
- **URL State Handling**: Synchronize tab and page state with URL query parameters for deep linking.
- **State Management**: Uses `@equinor/fusion-observable` for state management and actions.
- **Context API**: Provides a context for accessing and manipulating router state.


## Usage

```tsx
import {  TabProvider } from '@equinor/fusion-react-components-tabs';

const MyComponent = () => (
   <TabProvider id="my-component" activeTab="tab-1">
    <TabProvider.Tab id="tab-1" title="Tab 1" > Tab 1 content</TabProvider.Tab>
    <TabProvider.Tab id="tab-2" title="Tab 2" > Tab 2 content</TabProvider.Tab>  
  </TabProvider> 
);
```

